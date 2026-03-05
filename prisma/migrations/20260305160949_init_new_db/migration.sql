/*
  Warnings:

  - The values [hostelOwner] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `role` ENUM('student', 'superadmin') NOT NULL DEFAULT 'student';

-- DropTable
DROP TABLE `admins`;

-- CreateTable
CREATE TABLE `EmailOtp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `otp_code` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EmailOtp_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
