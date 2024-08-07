-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "book_title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "book_owner" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book_Owner" (
    "id" SERIAL NOT NULL,
    "owner_name" TEXT NOT NULL,
    "total_upload" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Book_Owner_pkey" PRIMARY KEY ("id")
);
