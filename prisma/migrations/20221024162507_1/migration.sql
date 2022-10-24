/*
  Warnings:

  - You are about to drop the `bookstoreBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bookstoreBooks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "bookstore_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "bookstore_books_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookstore_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rent_user_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rented_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bookstoreBooksId" TEXT NOT NULL,
    CONSTRAINT "rent_user_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rent_user_book_bookstoreBooksId_fkey" FOREIGN KEY ("bookstoreBooksId") REFERENCES "bookstore_books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rent_user_book" ("bookstoreBooksId", "id", "rented_at", "userId") SELECT "bookstoreBooksId", "id", "rented_at", "userId" FROM "rent_user_book";
DROP TABLE "rent_user_book";
ALTER TABLE "new_rent_user_book" RENAME TO "rent_user_book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
