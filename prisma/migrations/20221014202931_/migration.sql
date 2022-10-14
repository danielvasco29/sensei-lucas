/*
  Warnings:

  - You are about to drop the column `bookstoreId` on the `book` table. All the data in the column will be lost.
  - Added the required column `ookstore_Id` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ookstore_Id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "book_ookstore_Id_fkey" FOREIGN KEY ("ookstore_Id") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_book" ("author", "created_at", "id", "name", "updated_at") SELECT "author", "created_at", "id", "name", "updated_at" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
