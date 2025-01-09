const prisma = require('../prismaClient');

// Create DetailPengiriman
const createDetailPengiriman = async (req, res) => {
  // Accept an array of detail pengiriman
  const detailPengirimanArray = Array.isArray(req.body) ? req.body : [req.body];

  try {
    // get Barang before creating detail pengiriman to calculate subtotal
    const barangIds = detailPengirimanArray.map(detail => parseInt(detail.barang_id));

    const barangs = await prisma.barang.findMany({
      where: { barang_id: { in: barangIds } },
    });

    // Use createMany to insert multiple records
    const newDetailPengiriman = await prisma.detailPengiriman.createMany({
      data: detailPengirimanArray.map(detail => ({
        jumlah_barang: detail.jumlah_barang,
        subtotal: detail.jumlah_barang * barangs.find(barang => barang.barang_id == detail.barang_id).harga,
        pengiriman_id: detail.pengiriman_id,
        barang_id: parseInt(detail.barang_id),
      })),
    });

    // update pengiriman total harga
    const pengiriman = await prisma.pengiriman.findUnique({
      where: { pengiriman_id: detailPengirimanArray[0].pengiriman_id },
      include: {
        DetailPengiriman: true,
      },
    });


    const totalHarga = parseInt(pengiriman.total) + pengiriman.DetailPengiriman.reduce((acc, detail) => acc + parseInt(detail.subtotal), 0);

    await prisma.pengiriman.update({
      where: { pengiriman_id: detailPengirimanArray[0].pengiriman_id },
      data: { total: totalHarga },
    });

    res.status(201).json({
      message: 'Detail pengiriman berhasil ditambahkan',
      count: newDetailPengiriman.count
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Gagal menambahkan detail pengiriman',
      error: error.message
    });
  }
};

// Get all DetailPengiriman
const getAllDetailPengiriman = async (req, res) => {
  try {
    const detailPengirimanList = await prisma.detailPengiriman.findMany({
      include: {
        Pengiriman: true,
        Barang: true,
      },
    });
    res.status(200).json({ message: 'Berhasil mendapatkan data detail pengiriman', data: detailPengirimanList });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan data detail pengiriman', error: error.message });
  }
};

// Get a specific DetailPengiriman by ID
const getDetailPengirimanById = async (req, res) => {
  const { id } = req.params;

  try {
    const detailPengiriman = await prisma.detailPengiriman.findUnique({
      where: { detail_pengiriman_id: parseInt(id) },
      include: {
        Pengiriman: true,
        Barang: true,
      },
    });

    if (detailPengiriman) {
      res.status(200).json({ message: 'Berhasil mendapatkan detail pengiriman', data: detailPengiriman });
    } else {
      res.status(404).json({ message: 'Detail pengiriman tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mendapatkan detail pengiriman', error: error.message });
  }
};

// Update DetailPengiriman
const updateDetailPengiriman = async (req, res) => {
  const { id } = req.params;
  const { jumlah_barang, pengiriman_id, barang_id } = req.body;

  try {
    // get Barang before updating detail pengiriman to calculate subtotal
    const barang = await prisma.barang.findUnique({
      where: { barang_id },
    });

    const updatedDetailPengiriman = await prisma.detailPengiriman.update({
      where: { detail_pengiriman_id: parseInt(id) },
      data: {
        jumlah_barang,
        subtotal: jumlah_barang * barang.harga,
        pengiriman_id,
        barang_id,
      },
    });
    res.status(200).json({ message: 'Berhasil mengubah data detail pengiriman', data: updatedDetailPengiriman });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengubah data detail pengiriman', error: error.message });
  }
};

// Delete DetailPengiriman
const deleteDetailPengiriman = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.detailPengiriman.delete({
      where: { detail_pengiriman_id: parseInt(id) },
    });
    res.status(200).json({ message: 'Detail pengiriman berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus detail pengiriman', error: error.message });
  }
};

module.exports = {
  createDetailPengiriman,
  getAllDetailPengiriman,
  getDetailPengirimanById,
  updateDetailPengiriman,
  deleteDetailPengiriman,
};
