-- AlterTable
ALTER TABLE `cities` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `countries` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `provinces` ADD COLUMN `deletedAt` DATETIME(3) NULL;
