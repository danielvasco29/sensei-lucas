/*
  Warnings:

  - You are about to drop the column `created_at` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `book` table. All the data in the column will be lost.
  - The primary key for the `bookstore_books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `hourValue` to the `book` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `bookstore_books` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateTable
CREATE TABLE "rent_user_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rented_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bookstoreBooks" TEXT NOT NULL,
    CONSTRAINT "rent_user_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rent_user_book_bookstoreBooks_fkey" FOREIGN KEY ("bookstoreBooks") REFERENCES "bookstore_books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "hourValue" REAL NOT NULL
);
INSERT INTO "new_book" ("author", "id", "name") SELECT "author", "id", "name" FROM "book";
DROP TABLE "book";
ALTER TABLE "new_book" RENAME TO "book";
CREATE TABLE "new_bookstore_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "bookstore_books_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookstore_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookstore_books" ("bookId", "bookstoreId") SELECT "bookId", "bookstoreId" FROM "bookstore_books";
DROP TABLE "bookstore_books";
ALTER TABLE "new_bookstore_books" RENAME TO "bookstore_books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
