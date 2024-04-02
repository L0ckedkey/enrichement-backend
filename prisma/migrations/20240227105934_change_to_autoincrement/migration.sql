/*
  Warnings:

  - You are about to alter the column `user_id` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `city_id` on the `answers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `cities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `province_id` on the `cities` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `countries` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `countries` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `provinces` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `provinces` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `country_id` on the `provinces` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_province_id_fkey`;

-- DropForeignKey
ALTER TABLE `provinces` DROP FOREIGN KEY `provinces_country_id_fkey`;

-- AlterTable
ALTER TABLE `answers` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `city_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cities` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `province_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `countries` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `provinces` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `country_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `provinces` ADD CONSTRAINT `provinces_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_province_id_fkey` FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answers` ADD CONSTRAINT `answers_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
