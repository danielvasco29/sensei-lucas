/*
  Warnings:

  - You are about to drop the column `bookstoreBooks` on the `rent_user_book` table. All the data in the column will be lost.
  - Added the required column `bookstoreBooksId` to the `rent_user_book` table without a default value. This is not possible if the table is not empty.

*/
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
INSERT INTO "new_rent_user_book" ("id", "rented_at", "userId") SELECT "id", "rented_at", "userId" FROM "rent_user_book";
DROP TABLE "rent_user_book";
ALTER TABLE "new_rent_user_book" RENAME TO "rent_user_book";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
