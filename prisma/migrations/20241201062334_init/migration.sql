-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kendaraan` (
    `kendaraan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `jenis_kendaraan` VARCHAR(191) NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `status_kendaraan` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kendaraan_plat_nomor_key`(`plat_nomor`),
    PRIMARY KEY (`kendaraan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supir` (
    `supir_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_supir` VARCHAR(191) NOT NULL,
    `no_telepon` VARCHAR(191) NOT NULL,
    `jumlah_antaran` INTEGER NOT NULL,
    `status_supir` VARCHAR(191) NOT NULL,
    `gambar_supir` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Supir_no_telepon_key`(`no_telepon`),
    PRIMARY KEY (`supir_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengiriman` (
    `pengiriman_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal_pengiriman` DATETIME(3) NOT NULL,
    `status_pengiriman` VARCHAR(191) NOT NULL,
    `alamat_tujuan` VARCHAR(191) NOT NULL,
    `pembayaran` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,
    `ongkir` DECIMAL(65, 30) NULL,
    `total` DECIMAL(65, 30) NOT NULL,
    `kendaraan_id` INTEGER NOT NULL,
    `supir_id` INTEGER NOT NULL,
    `pelanggan_id` INTEGER NOT NULL,

    PRIMARY KEY (`pengiriman_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelanggan` (
    `pelanggan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pelanggan` VARCHAR(191) NOT NULL,
    `no_telepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pelanggan_no_telepon_key`(`no_telepon`),
    UNIQUE INDEX `Pelanggan_email_key`(`email`),
    PRIMARY KEY (`pelanggan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailPengiriman` (
    `detail_pengiriman_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_barang` INTEGER NOT NULL,
    `subtotal` DECIMAL(65, 30) NOT NULL,
    `pengiriman_id` INTEGER NOT NULL,
    `barang_id` INTEGER NOT NULL,

    PRIMARY KEY (`detail_pengiriman_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Barang` (
    `barang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_barang` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `berat` DECIMAL(65, 30) NOT NULL,
    `harga` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`barang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `Pengiriman_kendaraan_id_fkey` FOREIGN KEY (`kendaraan_id`) REFERENCES `Kendaraan`(`kendaraan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `Pengiriman_supir_id_fkey` FOREIGN KEY (`supir_id`) REFERENCES `Supir`(`supir_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `Pengiriman_pelanggan_id_fkey` FOREIGN KEY (`pelanggan_id`) REFERENCES `Pelanggan`(`pelanggan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPengiriman` ADD CONSTRAINT `DetailPengiriman_pengiriman_id_fkey` FOREIGN KEY (`pengiriman_id`) REFERENCES `Pengiriman`(`pengiriman_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPengiriman` ADD CONSTRAINT `DetailPengiriman_barang_id_fkey` FOREIGN KEY (`barang_id`) REFERENCES `Barang`(`barang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
