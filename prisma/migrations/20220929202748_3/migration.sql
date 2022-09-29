/*
  Warnings:

  - The primary key for the `bookstore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `bookstore` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_bookstore" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookstore_id_bookstore_fkey" FOREIGN KEY ("id_bookstore") REFERENCES "tokens" ("bookstoreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bookstore" ("adress", "created_at", "id_bookstore", "name", "updated_at") SELECT "adress", "created_at", "id_bookstore", "name", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
CREATE UNIQUE INDEX "bookstore_id_bookstore_key" ON "bookstore"("id_bookstore");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
