/*
  Warnings:

  - You are about to drop the column `sub_dimensi_x3_3` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `sub_dimensi_x3_4` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `sub_dimensi_x4_4` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `sub_dimensi_x4_5` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `answers` DROP COLUMN `sub_dimensi_x3_3`,
    DROP COLUMN `sub_dimensi_x3_4`,
    DROP COLUMN `sub_dimensi_x4_4`,
    DROP COLUMN `sub_dimensi_x4_5`;
