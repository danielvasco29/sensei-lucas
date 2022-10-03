/*
  Warnings:

  - You are about to drop the column `token` on the `bookstore` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookstore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_bookstore" ("adress", "created_at", "id", "name", "updated_at") SELECT "adress", "created_at", "id", "name", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
