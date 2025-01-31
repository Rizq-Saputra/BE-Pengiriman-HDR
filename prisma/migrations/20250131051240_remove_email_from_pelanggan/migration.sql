/*
  Warnings:

  - You are about to drop the column `email` on the `pelanggan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nama_pelanggan]` on the table `Pelanggan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Pelanggan_email_key` ON `pelanggan`;

-- AlterTable
ALTER TABLE `pelanggan` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `Pelanggan_nama_pelanggan_key` ON `Pelanggan`(`nama_pelanggan`);
