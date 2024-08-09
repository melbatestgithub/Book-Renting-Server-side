/*
  Warnings:

  - You are about to drop the `Book_Owner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `book_number` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "book_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "total_upload" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Book_Owner";
