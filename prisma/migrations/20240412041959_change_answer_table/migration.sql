/*
  Warnings:

  - Added the required column `dimensi_10` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_11` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_12` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_13` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_14` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_6` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_7` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_8` to the `answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dimensi_9` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `answers` ADD COLUMN `dimensi_10` INTEGER NOT NULL,
    ADD COLUMN `dimensi_11` INTEGER NOT NULL,
    ADD COLUMN `dimensi_12` INTEGER NOT NULL,
    ADD COLUMN `dimensi_13` INTEGER NOT NULL,
    ADD COLUMN `dimensi_14` INTEGER NOT NULL,
    ADD COLUMN `dimensi_6` INTEGER NOT NULL,
    ADD COLUMN `dimensi_7` INTEGER NOT NULL,
    ADD COLUMN `dimensi_8` INTEGER NOT NULL,
    ADD COLUMN `dimensi_9` INTEGER NOT NULL;
