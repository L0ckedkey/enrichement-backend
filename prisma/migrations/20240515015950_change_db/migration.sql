/*
  Warnings:

  - You are about to drop the column `sub_dimensi_x4_3` on the `answers` table. All the data in the column will be lost.
  - Added the required column `sub_dimensi_x3_3` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answers` DROP COLUMN `sub_dimensi_x4_3`,
    ADD COLUMN `sub_dimensi_x3_3` INTEGER NOT NULL;
