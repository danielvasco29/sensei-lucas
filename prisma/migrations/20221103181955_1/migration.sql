-- CreateTable
CREATE TABLE "history_rent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "libraryid" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "totalValue" TEXT
);
