const prisma = require('../prismaClient'); // Prisma client import

// Create Pelanggan
const createPelanggan = async (req, res) => {
  const { nama_pelanggan, no_telepon } = req.body;
  const no_telepon_cleaned = no_telepon.replace(/\D/g, ''); // Remove all non-numeric characters

  try {
    const newPelanggan = await prisma.pelanggan.create({
      data: {
        nama_pelanggan,
        no_telepon: no_telepon_cleaned,
      },
    });
    res.status(201).json({ message: 'Pelanggan berhasil ditambahkan', data: newPelanggan });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ message: 'Gagal menambahkan pelanggan', error: error.message });
  }
};

// Get all Pelanggan
const getPelanggan = async (req, res) => {
  try {
    const pelangganList = await prisma.pelanggan.findMany();
    res.status(200).json({ message: 'Berhasil mendapatkan data pelanggan', data: pelangganList });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data pelanggan', error: error.message });
  }
};

// Get a specific Pelanggan by ID
const getPelangganById = async (req, res) => {
  const { id } = req.params;
  try {
    const pelanggan = await prisma.pelanggan.findUnique({
      where: { pelanggan_id: parseInt(id) },
    });
    if (pelanggan) {
      res.status(200).json({ message: 'Berhasil mendapatkan detail pelanggan', data: pelanggan });
    } else {
      res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan detail pelanggan', error: error.message });
  }
};

// Update Pelanggan
const updatePelanggan = async (req, res) => {
  const { id } = req.params;
  const { nama_pelanggan, no_telepon } = req.body;

  try {
    const updatedPelanggan = await prisma.pelanggan.update({
      where: { pelanggan_id: parseInt(id) },
      data: {
        nama_pelanggan,
        no_telepon,
      },
    });
    res.status(200).json({ message: 'Berhasil mengubah data pelanggan', data: updatedPelanggan });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah data pelanggan', error: error.message });
  }
};

// Delete Pelanggan
const deletePelanggan = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.pelanggan.delete({
      where: { pelanggan_id: parseInt(id) },
    });
    res.status(200).json({ message: 'Pelanggan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus pelanggan', error: error.message });
  }
};

module.exports = { createPelanggan, getPelanggan, getPelangganById, updatePelanggan, deletePelanggan };
