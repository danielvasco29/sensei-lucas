/*
  Warnings:

  - Added the required column `historyId` to the `rent_user_book` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rent_user_book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rented_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bookstoreBooksId" TEXT NOT NULL,
    "historyId" TEXT NOT NULL,
    CONSTRAINT "rent_user_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "rent_user_book_bookstoreBooksId_fkey" FOREIGN KEY ("bookstoreBooksId") REFERENCES "bookstore_books" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_rent_user_book" ("bookstoreBooksId", "id", "rented_at", "userId") SELECT "bookstoreBooksId", "id", "rented_at", "userId" FROM "rent_user_book";
DROP TABLE "rent_user_book";
ALTER TABLE "new_rent_user_book" RENAME TO "rent_user_book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
