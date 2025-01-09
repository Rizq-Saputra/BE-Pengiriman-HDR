/*
  Warnings:

  - A unique constraint covering the columns `[resi]` on the table `Pengiriman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resi` to the `Pengiriman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Pengiriman` ADD COLUMN `resi` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pengiriman_resi_key` ON `Pengiriman`(`resi`);
