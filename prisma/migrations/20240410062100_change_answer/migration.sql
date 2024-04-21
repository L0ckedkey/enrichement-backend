/*
  Warnings:

  - You are about to drop the column `answer` on the `answers` table. All the data in the column will be lost.
  - Added the required column `dimensi_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_2` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_3` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_4` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_5` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x1_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x1_2` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x2_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x2_2` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x3_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x3_2` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x3_3` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x3_4` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x4_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x4_2` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x4_3` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x4_4` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x4_5` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x5_1` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_dimensi_x5_2` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answers` DROP COLUMN `answer`,
    ADD COLUMN `dimensi_1` INTEGER NOT NULL,
    ADD COLUMN `dimensi_2` INTEGER NOT NULL,
    ADD COLUMN `dimensi_3` INTEGER NOT NULL,
    ADD COLUMN `dimensi_4` INTEGER NOT NULL,
    ADD COLUMN `dimensi_5` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x1_1` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x1_2` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x2_1` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x2_2` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x3_1` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x3_2` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x3_3` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x3_4` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x4_1` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x4_2` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x4_3` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x4_4` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x4_5` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x5_1` INTEGER NOT NULL,
    ADD COLUMN `sub_dimensi_x5_2` INTEGER NOT NULL;
