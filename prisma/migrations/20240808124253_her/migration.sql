/*
  Warnings:

  - You are about to drop the column `book_title` on the `Book` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `book_cover` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_name` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "book_title",
ADD COLUMN     "book_cover" TEXT NOT NULL,
ADD COLUMN     "book_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
