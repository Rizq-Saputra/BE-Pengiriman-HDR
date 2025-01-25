/*
  Warnings:

  - A unique constraint covering the columns `[nama_barang]` on the table `Barang` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Barang_nama_barang_key` ON `Barang`(`nama_barang`);
