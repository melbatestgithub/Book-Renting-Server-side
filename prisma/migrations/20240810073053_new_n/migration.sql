/*
  Warnings:

  - You are about to drop the column `book_cover` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `book_price` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "book_cover",
DROP COLUMN "book_price",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "UploadedBook" (
    "id" SERIAL NOT NULL,
    "book_name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "book_cover" BYTEA,
    "book_owner" TEXT,
    "category" TEXT NOT NULL,
    "book_number" INTEGER NOT NULL,
    "status" TEXT,
    "book_price" TEXT,
    "quantity" INTEGER,

    CONSTRAINT "UploadedBook_pkey" PRIMARY KEY ("id")
);
