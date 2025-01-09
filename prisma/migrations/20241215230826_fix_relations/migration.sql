-- DropForeignKey
ALTER TABLE `DetailPengiriman` DROP FOREIGN KEY `DetailPengiriman_pengiriman_id_fkey`;

-- AddForeignKey
ALTER TABLE `DetailPengiriman` ADD CONSTRAINT `DetailPengiriman_pengiriman_id_fkey` FOREIGN KEY (`pengiriman_id`) REFERENCES `Pengiriman`(`pengiriman_id`) ON DELETE CASCADE ON UPDATE CASCADE;
