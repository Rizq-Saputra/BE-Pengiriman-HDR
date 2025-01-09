const prisma = require("../prismaClient");
const rupiah = require("../utils/formatRupiah");
const generateReceiptNumber = require("../utils/receipt-number");

const checkAdminOrSupir = (req, res) => {
  if (!req.user.adminId && !req.user.supirId) {
    return res
      .status(403)
      .json({ error: "Akses ditolak. Hanya admin atau supir yang diizinkan." });
  }
  if (req.user.supirId) {
    return { 'supir_id': req.user.supirId };
  }
  if (req.user.adminId) {
    return { 'admin_id': req.user.adminId };
  }
  return null;
};

// Create Pengiriman
const createPengiriman = async (req, res) => {
  const {
    tanggal_pengiriman,
    status_pengiriman = "Belum Dikirim",
    alamat_tujuan,
    deskripsi,
    ongkir,
    total,
    pembayaran,
    kendaraan_id,
    supir_id,
    pelanggan_id,
  } = req.body;

  try {
    const newPengiriman = await prisma.pengiriman.create({
      data: {
        tanggal_pengiriman: new Date(tanggal_pengiriman),
        status_pengiriman,
        alamat_tujuan,
        deskripsi,
        ongkir,
        total: ongkir,
        pembayaran,
        kendaraan_id,
        supir_id,
        pelanggan_id,
      },
    });

    const resi = generateReceiptNumber(newPengiriman.pengiriman_id);
    // update pengiriman add resi
    const updatedNewPengiriman = await prisma.pengiriman.update({
      where: { pengiriman_id: newPengiriman.pengiriman_id },
      data: {
        resi,
      },
    });

    res
      .status(201)
      .json({ message: "Pengiriman berhasil dibuat", data: updatedNewPengiriman });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal membuat pengiriman", error: error.message });
  }
};

// Get all Pengiriman
const getAllPengiriman = async (req, res) => {
  const status = req.query.status_pengiriman;
  const searchQuery = req.query.q;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const skip = (page - 1) * limit;

  try {
    const where = {};

    if (status) {
      where.status_pengiriman = status;
    }

    if (searchQuery) {
      where.OR = [
        { nama: { contains: searchQuery, mode: "insensitive" } },
        { deskripsi: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const pengirimanList = await prisma.pengiriman.findMany({
      where,
      include: {
        Kendaraan: true,
        Supir: true,
        Pelanggan: true,
        DetailPengiriman: true,
      },
      skip, // Pagination: offset
      take: limit, // Pagination: limit
    });

    // Optionally: Get total count for pagination info
    const totalPengiriman = await prisma.pengiriman.count({ where });

    res.status(200).json({
      message: "Berhasil mendapatkan data pengiriman",
      data: pengirimanList,
      meta: {
        total: totalPengiriman,
        page,
        limit,
        totalPages: Math.ceil(totalPengiriman / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan data pengiriman",
      error: error.message,
    });
  }
};

// Get a specific Pengiriman by ID
const getPengirimanById = async (req, res) => {
  const { id } = req.params;

  const adminOrSupirError = checkAdminOrSupir(req, res);


  try {
    const pengiriman = await prisma.pengiriman.findUnique({
      where: {
        pengiriman_id: parseInt(id),
        supir_id: req.user.supirId || undefined,
      },
      include: {
        Kendaraan: true,
        Supir: true,
        Pelanggan: true,
        DetailPengiriman: {
          include: {
            Barang: true,
          },
        },
      },
    });


    if (pengiriman) {
      res.status(200).json({
        message: "Berhasil mendapatkan detail pengiriman",
        data: pengiriman,
      });
    } else {
      res.status(404).json({ message: "Pengiriman tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan detail pengiriman",
      error: error.message,
    });
  }
};

// Get a specific Pengiriman by ID
const getPengirimanByPhone = async (req, res) => {
  const { nomor_telepon } = req.body;

  let cleanedPhone = nomor_telepon?.replace(/\D/g, "");
  try {
    const pengiriman = await prisma.pengiriman.findMany({
      where: {
        Pelanggan: {
          no_telepon: {
            equals: cleanedPhone,
          }
        }
      },
      include: {
        Kendaraan: true,
        Supir: true,
        Pelanggan: true,
        DetailPengiriman: true,
      },
    });

    if (pengiriman) {
      res.status(200).json({
        message: "Berhasil mendapatkan detail pengiriman",
        data: pengiriman,
      });
    } else {
      res.status(404).json({ message: "Pengiriman tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan detail pengiriman",
      error: error.message,
    });
  }
};

// Get a specific Pengiriman by resi column
const getPengirimanByResi = async (req, res) => {
  const { resi } = req.body;

  try {
    const pengiriman = await prisma.pengiriman.findUnique({
      where: {
        resi: resi,
      },
      include: {
        Kendaraan: true,
        Supir: true,
        Pelanggan: true,
        DetailPengiriman: {
          include: {
            Barang: true,
          },
        }
      },
    });

    if (pengiriman) {
      res.status(200).json({
        message: "Berhasil mendapatkan detail pengiriman",
        data: pengiriman,
      });
    } else {
      res.status(404).json({ message: "Pengiriman tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan detail pengiriman",
      error: error.message,
    });
  }
}

// get pengiriman stats
const getPengirimanStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get stats for "Selesai" status only for today
    const selesaiStats = await prisma.pengiriman.groupBy({
      by: ["status_pengiriman"],
      _count: { status_pengiriman: true },
      where: {
        AND: [
          { status_pengiriman: "Selesai" },
          {
            tanggal_pengiriman: {
              gte: today,
              lt: tomorrow,
            },
          },
        ],
      },
    });

    // Get stats for other statuses without date filter
    const otherStats = await prisma.pengiriman.groupBy({
      by: ["status_pengiriman"],
      _count: { status_pengiriman: true },
      where: {
        status_pengiriman: {
          in: ["Dalam Pengiriman", "Belum Dikirim"],
        },
      },
    });

    // Combine the stats
    const stats = [...selesaiStats, ...otherStats];

    // Convert stats to include all required statuses with count 0 if not present
    const requiredStatuses = ["Dalam Pengiriman", "Selesai", "Belum Dikirim"];
    const formattedStats = requiredStatuses.map((status) => {
      const found = stats.find((s) => s.status_pengiriman === status);
      return {
        status_pengiriman: status,
        _count: {
          status_pengiriman: found ? found._count.status_pengiriman : 0,
        },
      };
    });

    res.status(200).json({
      message: "Berhasil mendapatkan stats pengiriman",
      data: formattedStats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan stats pengiriman",
      error: error.message,
    });
  }
};

// get weekly pengiriman stats
const getWeeklyPengirimanStats = async (req, res) => {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust when day is Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const pengirimanCount = await prisma.pengiriman.groupBy({
      by: ['tanggal_pengiriman'],
      _count: {
        tanggal_pengiriman: true,
      },
      where: {
        tanggal_pengiriman: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });

    res.status(200).json({
      message: "Berhasil mendapatkan jumlah pengiriman minggu ini",
      data: pengirimanCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan jumlah pengiriman minggu ini",
      error: error.message,
    });
  }
};

// Update Pengiriman
const updatePengiriman = async (req, res) => {
  const adminOrSupirError = checkAdminOrSupir(req, res);

  const { id } = req.params;
  const {
    tanggal_pengiriman,
    status_pengiriman,
    alamat_tujuan,
    bukti_pengiriman,
    deskripsi,
    ongkir,
    total,
    kendaraan_id,
    supir_id,
    pelanggan_id,
  } = req.body;

  try {
    const updatedPengiriman = await prisma.pengiriman.update({
      where: { pengiriman_id: parseInt(id) },
      data: {
        tanggal_pengiriman,
        status_pengiriman,
        alamat_tujuan,
        bukti_pengiriman,
        deskripsi,
        ongkir,
        total,
        kendaraan_id,
        supir_id,
        pelanggan_id,
      },
    });

    if (adminOrSupirError.supir_id
      && updatedPengiriman.status_pengiriman === "Selesai"
    ) {
      const updatedSupir = await prisma.supir.update({
        where: { supir_id: adminOrSupirError.supir_id },
        data: {
          status_supir: "Tersedia",
          jumlah_antaran: {
            increment: 1,
          },
        },
      });
    }

    res.status(200).json({
      message: "Berhasil mengubah data pengiriman",
      data: updatedPengiriman,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengubah data pengiriman",
      error: error.message,
    });
  }
};

// Delete Pengiriman
const deletePengiriman = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.pengiriman.delete({
      where: { pengiriman_id: parseInt(id) },
    });
    res.status(200).json({ message: "Pengiriman berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus pengiriman", error: error.message });
  }
};

const exportReport = async (req, res) => {

  try {
    // Fetch data from the database
    const allPengiriman = await prisma.pengiriman.findMany({
      include: {
        Kendaraan: true,
        Supir: true,
        Pelanggan: true,
        DetailPengiriman: true,
      },
    });

    // Create a new PDF document with landscape orientation
    const PDFDocument = require('pdfkit');
    const pdf = new PDFDocument({ layout: 'landscape' });

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');

    // Pipe the PDF to the response
    pdf.pipe(res);

    // Add margins
    const margin = 50;

    // Add content to the PDF
    pdf.fontSize(25).text('Laporan Pengiriman', { align: 'center' });
    pdf.moveDown();
    pdf.fontSize(15).text('Data Pengiriman', { align: 'center' });
    pdf.moveDown();

    // Create a table for the data
    const table = {
      headers: [
        'Tanggal Pengiriman',
        'Status Pengiriman',
        'Alamat Tujuan',
        'Deskripsi',
        'Ongkir',
        'Total',
        'Pembayaran',
      ],
      rows: allPengiriman.map(pengiriman => [
        new Date(pengiriman.tanggal_pengiriman).toLocaleDateString('id-ID'),
        pengiriman.status_pengiriman,
        pengiriman.alamat_tujuan,
        pengiriman.deskripsi,
        rupiah(pengiriman.ongkir),
        rupiah(pengiriman.total),
        pengiriman.pembayaran,
      ]),
    };

    // Calculate column widths based on content
    const pageWidth = pdf.page.width - 2 * margin;
    const columnWidths = [
      pageWidth * 0.12, // Tanggal
      pageWidth * 0.12, // Status
      pageWidth * 0.25, // Alamat
      pageWidth * 0.20, // Deskripsi
      pageWidth * 0.11, // Ongkir
      pageWidth * 0.11, // Total
      pageWidth * 0.09  // Pembayaran
    ];

    // Draw the table
    let startX = margin;
    let startY = pdf.y + 20;

    // Draw headers
    pdf.font('Helvetica-Bold');
    table.headers.forEach((header, i) => {
      pdf.text(header, startX, startY, {
        width: columnWidths[i],
        align: 'left'
      });
      startX += columnWidths[i];
    });

    // Draw rows
    startY += 30;
    pdf.font('Helvetica');
    table.rows.forEach(row => {
      startX = margin;
      row.forEach((cell, i) => {
        pdf.text(cell.toString(), startX, startY, {
          width: columnWidths[i],
          align: 'left'
        });
        startX += columnWidths[i];
      });
      startY += 25;

      // Add new page if content exceeds page height
      if (startY >= pdf.page.height - margin) {
        pdf.addPage({ layout: 'landscape' });
        startY = margin;
      }
    });

    // Finalize the PDF
    pdf.end();

  } catch (error) {
    res.status(500).json({
      message: "Gagal export data pengiriman",
      error: error.message,
    });
  }
};

const exportReportExcel = async (req, res) => {
  try {
    // Fetch data from the DetailPengiriman table
    const allDetailPengiriman = await prisma.detailPengiriman.findMany({
      include: {
        Barang: true, // Relasi ke tabel Barang
        Pengiriman: {
          include: {
            Pelanggan: true, // Relasi ke Pelanggan
            Supir: true, // Relasi ke Supir
            Kendaraan: true, // Relasi ke Kendaraan
          },
        },
      },
    });

    // Create a new Excel workbook and worksheet
    const ExcelJS = require("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Laporan Detail Pengiriman");

    // Define the columns
    worksheet.columns = [
      { header: "Nomor Resi", key: "nomor_resi", width: 15 },
      { header: "Nama Barang", key: "nama_barang", width: 20 },
      { header: "Jumlah Barang", key: "jumlah_barang", width: 15 },
      { header: "Tanggal Pengiriman", key: "tanggal_pengiriman", width: 20, style: { numFmt: "dd/mm/yyyy" } },
      { header: "Status Pengiriman", key: "status_pengiriman", width: 20 },
      { header: "Alamat Tujuan", key: "alamat_tujuan", width: 30 },
      { header: "Nama Pelanggan", key: "nama_pelanggan", width: 20 },
      { header: "Nama Supir", key: "nama_supir", width: 20 },
      { header: "Plat Nomor", key: "plat_nomor", width: 15 },
      { header: "Ongkir", key: "ongkir", width: 15, style: { numFmt: '"Rp"#,##0.00' } },
      { header: "Total", key: "total", width: 15, style: { numFmt: '"Rp"#,##0.00' } },
    ];

    // Add rows to the worksheet
    allDetailPengiriman.forEach((detail) => {
      worksheet.addRow({
        nomor_resi: detail.Pengiriman.resi,
        nama_barang: detail.Barang.nama_barang,
        jumlah_barang: detail.jumlah_barang,
        tanggal_pengiriman: detail.Pengiriman.tanggal_pengiriman,
        status_pengiriman: detail.Pengiriman.status_pengiriman,
        alamat_tujuan: detail.Pengiriman.alamat_tujuan,
        nama_pelanggan: detail.Pengiriman.Pelanggan.nama_pelanggan,
        nama_supir: detail.Pengiriman.Supir.nama_supir,
        plat_nomor: detail.Pengiriman.Kendaraan.plat_nomor,
        ongkir: parseInt(detail.Pengiriman.ongkir),
        total: parseInt(detail.Pengiriman.total),
      });
    });

    // Generate report name
    const date = new Date().toISOString().split("T")[0];
    const reportFileName = `Laporan Detail Pengiriman ${date}.xlsx`;

    // Set response headers for Excel download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="' + reportFileName + '"');

    // Write the workbook to the response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      message: "Gagal mendapatkan data pengiriman",
      error: error.message,
    });
  }
};



module.exports = {
  createPengiriman,
  getAllPengiriman,
  getPengirimanById,
  updatePengiriman,
  deletePengiriman,
  getPengirimanStats,
  getWeeklyPengirimanStats,
  getPengirimanByPhone,
  getPengirimanByResi,
  exportReport,
  exportReportExcel,
};
