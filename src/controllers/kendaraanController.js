const prisma = require("../prismaClient"); // Prisma client import

// Create Kendaraan
const createKendaraan = async (req, res) => {
  const {
    plat_nomor,
    jenis_kendaraan,
    status_kendaraan = "Tersedia",
  } = req.body;

  try {
    const newKendaraan = await prisma.kendaraan.create({
      data: {
        plat_nomor,
        jenis_kendaraan,
        status_kendaraan: status_kendaraan
          ? status_kendaraan.toLowerCase()
          : "tersedia",
      },
    });
    res
      .status(201)
      .json({ message: "Kendaraan berhasil ditambahkan", data: newKendaraan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan kendaraan", error: error.message });
  }
};

// Get all Kendaraan
const getKendaraan = async (req, res) => {
  try {
    const kendaraanList = await prisma.kendaraan.findMany();
    res
      .status(200)
      .json({
        message: "Berhasil mendapatkan data kendaraan",
        data: kendaraanList,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal mendapatkan data kendaraan",
        error: error.message,
      });
  }
};

// Get a specific Kendaraan by ID
const getKendaraanById = async (req, res) => {
  const { id } = req.params;
  try {
    const kendaraan = await prisma.kendaraan.findUnique({
      where: { kendaraan_id: parseInt(id) },
    });
    if (kendaraan) {
      res
        .status(200)
        .json({
          message: "Berhasil mendapatkan detail kendaraan",
          data: kendaraan,
        });
    } else {
      res.status(404).json({ message: "Kendaraan tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Gagal mendapatkan detail kendaraan",
        error: error.message,
      });
  }
};

// Update Kendaraan
const updateKendaraan = async (req, res) => {
  const { id } = req.params;
  const { plat_nomor, jenis_kendaraan, status_kendaraan } = req.body;

  try {
    const updatedKendaraan = await prisma.kendaraan.update({
      where: { kendaraan_id: parseInt(id) },
      data: {
        plat_nomor,
        jenis_kendaraan,
        status_kendaraan: status_kendaraan
          ? status_kendaraan.toLowerCase()
          : "tersedia",
      },
    });
    res
      .status(200)
      .json({
        message: "Berhasil mengubah data kendaraan",
        data: updatedKendaraan,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengubah data kendaraan", error: error.message });
  }
};

// Delete Kendaraan
const deleteKendaraan = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.kendaraan.delete({
      where: { kendaraan_id: parseInt(id) },
    });
    res.status(200).json({ message: "Kendaraan berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus kendaraan", error: error.message });
  }
};

module.exports = {
  createKendaraan,
  getKendaraan,
  getKendaraanById,
  updateKendaraan,
  deleteKendaraan,
};
