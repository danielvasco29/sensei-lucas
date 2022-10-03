/*
  Warnings:

  - Added the required column `token` to the `bookstore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookstore_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "tokens" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookstore" ("adress", "bookstoreId", "created_at", "id", "name", "updated_at") SELECT "adress", "bookstoreId", "created_at", "id", "name", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
CREATE UNIQUE INDEX "bookstore_bookstoreId_key" ON "bookstore"("bookstoreId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
