const prisma = require('../prismaClient'); // Prisma client import

// Create Barang
const createBarang = async (req, res) => {
  const { nama_barang, kategori, berat, harga } = req.body;
  
  try {
    const newBarang = await prisma.barang.create({
      data: {
        nama_barang,
        kategori,
        berat,
        harga,
      },
    });
      res.status(201).json({ message: 'Berhasil menambahkan data Barang', data: newBarang });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Barang
const getBarang = async (req, res) => {
  const kategori = req.query.kategori;
  const searchQuery = req.query.q;
  const getAllData = req.query.all_data === 'true';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const skip = (page - 1) * limit;

  try {
    const where = {};

    if (kategori) {
      where.kategori = kategori;
    }

    if (searchQuery) {
      where.nama_barang = {
        contains: searchQuery,
        mode: 'insensitive',
      };
    }

    // Skip pagination if all_data=true
    const barangList = await prisma.barang.findMany({
      where,
      ...(getAllData ? {} : { skip, take: limit }),
    });

    const totalBarang = await prisma.barang.count({ where });

    res.status(200).json({
      message: 'Berhasil Mendapatkan data Barang',
      data: barangList,
      ...(getAllData ? {} : {
        meta: {
          total: totalBarang,
          page,
          limit,
          totalPages: Math.ceil(totalBarang / limit),
        }
      })
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a specific Barang by ID
const getBarangById = async (req, res) => {
  const { id } = req.params;
  try {
    const barang = await prisma.barang.findUnique({
      where: { barang_id: parseInt(id) },
    });
    if (barang) {
      res.status(200).json({ message: 'Berhasil Mendapatkan Detail Barang', data: barang });
    } else {
      res.status(404).json({ message: 'Barang Tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Barang
const updateBarang = async (req, res) => {
  const { id } = req.params;
  const { nama_barang, kategori, berat, harga } = req.body;
  
  try {
    const updatedBarang = await prisma.barang.update({
      where: { barang_id: parseInt(id) },
      data: {
        nama_barang,
        kategori,
        berat,
        harga,
      },
    });
    res.status(200).json({ message: 'Berhasil Mengubah Barang', data: updatedBarang });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Barang
const deleteBarang = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.barang.delete({
      where: { barang_id: parseInt(id) },
    });
    res.status(200).json({ message: 'Barang Berhasil Terhapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBarang, getBarang, getBarangById, updateBarang, deleteBarang };
