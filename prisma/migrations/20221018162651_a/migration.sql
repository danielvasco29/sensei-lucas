-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore_books" (
    "bookstoreId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    PRIMARY KEY ("bookstoreId", "bookId"),
    CONSTRAINT "bookstore_books_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookstore_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_bookstore_books" ("bookId", "bookstoreId") SELECT "bookId", "bookstoreId" FROM "bookstore_books";
DROP TABLE "bookstore_books";
ALTER TABLE "new_bookstore_books" RENAME TO "bookstore_books";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
