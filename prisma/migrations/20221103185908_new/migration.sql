/*
  Warnings:

  - You are about to drop the column `clienteId` on the `history_rent` table. All the data in the column will be lost.
  - You are about to drop the column `libraryid` on the `history_rent` table. All the data in the column will be lost.
  - Added the required column `bookstoreId` to the `history_rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `history_rent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_history_rent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "totalValue" TEXT
);
INSERT INTO "new_history_rent" ("bookId", "endDate", "id", "startDate", "totalValue") SELECT "bookId", "endDate", "id", "startDate", "totalValue" FROM "history_rent";
DROP TABLE "history_rent";
ALTER TABLE "new_history_rent" RENAME TO "history_rent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
