/*
  Warnings:

  - You are about to drop the column `bookstoreId` on the `bookstore` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "tokens2" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tokens2_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "token" TEXT,
    "adress" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_bookstore" ("adress", "created_at", "id", "name", "token", "updated_at") SELECT "adress", "created_at", "id", "name", "token", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "tokens2_bookstoreId_key" ON "tokens2"("bookstoreId");
