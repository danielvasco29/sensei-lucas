/*
  Warnings:

  - The primary key for the `bookstore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bookstore` table. All the data in the column will be lost.
  - The required column `id_bookstore` was added to the `bookstore` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookstoreId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tokens_bookstoreId_fkey" FOREIGN KEY ("bookstoreId") REFERENCES "bookstore" ("id_bookstore") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tokens" ("bookstoreId", "created_at", "id", "token", "updated_at", "userId") SELECT "bookstoreId", "created_at", "id", "token", "updated_at", "userId" FROM "tokens";
DROP TABLE "tokens";
ALTER TABLE "new_tokens" RENAME TO "tokens";
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");
CREATE UNIQUE INDEX "tokens_bookstoreId_key" ON "tokens"("bookstoreId");
CREATE TABLE "new_bookstore" (
    "id_bookstore" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_bookstore" ("adress", "created_at", "name", "updated_at") SELECT "adress", "created_at", "name", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
