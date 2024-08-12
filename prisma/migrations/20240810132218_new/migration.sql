-- CreateTable
CREATE TABLE "BookCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("id")
);
