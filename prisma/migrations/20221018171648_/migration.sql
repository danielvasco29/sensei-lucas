/*
  Warnings:

  - The primary key for the `bookstore_books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `bookstore_books` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "bookstore_books_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookstore_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookstore_books" ("bookId", "bookstoreId") SELECT "bookId", "bookstoreId" FROM "bookstore_books";
DROP TABLE "bookstore_books";
ALTER TABLE "new_bookstore_books" RENAME TO "bookstore_books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
