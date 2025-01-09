const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_default_refresh_secret_key';

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username dan password wajib diisi' });
  }

  try {
    const existingadmin = await prisma.admin.findUnique({ where: { username } });
    if (existingadmin) {
      return res.status(400).json({ error: 'Pengguna sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newadmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Pendaftaran pengguna berhasil' });
  } catch (error) {
    console.error('Error saat mendaftarkan pengguna:', error); // Logging tambahan
    res.status(500).json({ error: 'Terjadi kesalahan saat mendaftarkan pengguna' });
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'username dan password wajib diisi' });
  }

  try {
    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return res.status(400).json({ error: 'username atau password tidak valid' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'username atau password tidak valid' });
    }

    const token = jwt.sign({ adminId: admin.admin_id, username: admin.username }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ adminId: admin.admin_id, username: admin.username }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await prisma.admin.update({
      where: { username },
      data: { refreshToken },
    });

    res.json({ message: 'Login berhasil', token, refreshToken });
  } catch (error) {
    console.error(error); // Logging tambahan

    res.status(500).json({ error: 'Terjadi kesalahan saat login' });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token wajib diisi' });
  }



  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const admin = await prisma.admin.findUnique({ where: { username: decoded.username, admin_id: decoded.adminId } });



    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(400).json({ error: 'Refresh token tidak valid' });
    }

    const newAccessToken = jwt.sign({ adminId: admin.admin_id, username: admin.username }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ token: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token tidak valid atau sudah kadaluarsa' });
  }
};

const logout = async (req, res) => {
  try {
    await prisma.admin.update({
      where: { username: req.user.username },
      data: { refreshToken: null }
    });

    res.json({ message: 'Logout berhasil' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat logout' });
  }
};

module.exports = { register, login, refreshToken, logout };
