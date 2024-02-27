/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `provinces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cities_name_key` ON `cities`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `countries_name_key` ON `countries`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `provinces_name_key` ON `provinces`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
