const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_default_refresh_secret_key';

const loginSupir = async (req, res) => {
    const { no_telepon, password } = req.body;

    if (!no_telepon || !password) {
        return res.status(400).json({ error: 'Nomor telepon dan password wajib diisi' });
    }

    try {
        const supir = await prisma.supir.findUnique({ where: { no_telepon } });
        if (!supir) {
            return res.status(400).json({ error: 'Nomor telepon atau password tidak valid' });
        }

        const isPasswordValid = await bcrypt.compare(password, supir.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Nomor telepon atau password tidak valid' });
        }

        const token = jwt.sign(
            {
                supirId: supir.supir_id,
                no_telepon: supir.no_telepon,
                role: 'supir'
            },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            {
                supirId: supir.supir_id,
                no_telepon: supir.no_telepon,
                role: 'supir'
            },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        await prisma.supir.update({
            where: { supir_id: supir.supir_id },
            data: { refreshToken },
        });

        res.json({
            message: 'Login berhasil',
            token,
            refreshToken,
            supir: {
                supir_id: supir.supir_id,
                nama_supir: supir.nama_supir,
                no_telepon: supir.no_telepon,
                status_supir: supir.status_supir,
                jumlah_antaran: supir.jumlah_antaran
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat login' });
    }
};

const logoutSupir = async (req, res) => {
    try {
        await prisma.supir.update({
            where: { supir_id: req.user.supirId },
            data: { refreshToken: null }
        });

        res.json({ message: 'Logout berhasil' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat logout' });
    }
};

const refreshSupirToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token wajib diisi' });
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const supir = await prisma.supir.findFirst({
            where: {
                supir_id: decoded.supirId,
                refreshToken
            }
        });

        if (!supir) {
            return res.status(401).json({ error: 'Refresh token tidak valid' });
        }

        const newAccessToken = jwt.sign(
            {
                supirId: supir.supir_id,
                no_telepon: supir.no_telepon,
                role: 'supir'
            },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ token: newAccessToken });
    } catch (error) {
        res.status(401).json({ error: 'Refresh token tidak valid atau sudah kadaluarsa' });
    }
};

module.exports = { loginSupir, logoutSupir, refreshSupirToken };