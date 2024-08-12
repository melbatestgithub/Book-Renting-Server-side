/*
  Warnings:

  - Made the column `status` on table `UploadedBook` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UploadedBook" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Free';
