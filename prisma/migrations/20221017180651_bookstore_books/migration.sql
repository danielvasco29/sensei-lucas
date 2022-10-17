/*
  Warnings:

  - You are about to drop the column `bookId` on the `book` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "bookstore_books" (
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    PRIMARY KEY ("bookstoreId", "bookId"),
    CONSTRAINT "bookstore_books_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookstore_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_book" ("author", "created_at", "id", "name", "updated_at") SELECT "author", "created_at", "id", "name", "updated_at" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
