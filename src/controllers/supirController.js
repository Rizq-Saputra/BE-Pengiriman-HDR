const prisma = require("../prismaClient"); // Prisma client import
const bcrypt = require("bcryptjs");

const checkAdmin = (req, res) => {
  if (!req.user.adminId) {
    return res
      .status(403)
      .json({ error: "Akses ditolak. Hanya admin yang diizinkan." });
  }
  return null;
};

const checkAdminOrSupir = (req, res) => {
  if (!req.user.adminId && !req.user.supirId) {
    return res
      .status(403)
      .json({ error: "Akses ditolak. Hanya admin atau supir yang diizinkan." });
  }
  return null;
};

// Create Supir
const createSupir = async (req, res) => {
  const adminCheck = checkAdmin(req, res);
  if (adminCheck) return adminCheck;

  const {
    nama_supir,
    no_telepon,
    jumlah_antaran,
    status_supir = "Tersedia",
    password,
    gambar_supir,
  } = req.body;

  const jumlahAntaranInt = parseInt(jumlah_antaran, 10);
  try {
    const newSupir = await prisma.supir.create({
      data: {
        nama_supir,
        no_telepon: no_telepon.replace(/\D/g, ""),
        jumlah_antaran: jumlahAntaranInt,
        status_supir,
        gambar_supir,
        password: bcrypt.hashSync(password, 10),
      },
    });
    res
      .status(201)
      .json({ message: "Supir berhasil ditambahkan", data: newSupir });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan supir", error: error.message });
  }
};

// Get all Supir
const getSupir = async (req, res) => {
  const adminCheck = checkAdmin(req, res);
  if (adminCheck) return adminCheck;

  try {
    const supirList = await prisma.supir.findMany();
    res
      .status(200)
      .json({ message: "Berhasil mendapatkan data supir", data: supirList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mendapatkan data supir", error: error.message });
  }
};

// Get a specific Supir by ID
const getSupirById = async (req, res) => {
  const checkRole = checkAdminOrSupir(req, res);
  if (checkRole) return checkRole;
  const { id } = req.params;
  try {
    const supir = await prisma.supir.findUnique({
      where: { supir_id: parseInt(id) },
      include: {
        Pengiriman: {
          include: {
            Pelanggan: true,
          },
        },
      },
    });
    if (supir) {
      res
        .status(200)
        .json({ message: "Berhasil mendapatkan detail supir", data: supir });
    } else {
      res.status(404).json({ message: "Supir tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal mendapatkan detail supir",
        error: error.message,
      });
  }
};

// Update Supir
const updateSupir = async (req, res) => {
  const adminCheck = checkAdmin(req, res);
  if (adminCheck) return adminCheck;

  const { id } = req.params;
  const {
    nama_supir,
    no_telepon,
    jumlah_antaran,
    status_supir,
    password,
    gambar_supir,
  } = req.body;
  // const gambar_supir = req.file ? req.file.path : null;

  try {
    const updatedSupir = await prisma.supir.update({
      where: { supir_id: parseInt(id) },
      data: {
        nama_supir,
        no_telepon,
        jumlah_antaran,
        status_supir,
        gambar_supir,
        password: password ? bcrypt.hashSync(password, 10) : undefined,
      },
    });
    res
      .status(200)
      .json({ message: "Berhasil mengubah data supir", data: updatedSupir });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengubah data supir", error: error.message });
  }
};

// Delete Supir
const deleteSupir = async (req, res) => {
  const adminCheck = checkAdmin(req, res);
  if (adminCheck) return adminCheck;

  const { id } = req.params;
  try {
    await prisma.supir.delete({
      where: { supir_id: parseInt(id) },
    });
    res.status(200).json({ message: "Supir berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus supir", error: error.message });
  }
};

module.exports = {
  createSupir,
  getSupir,
  getSupirById,
  updateSupir,
  deleteSupir,
};
