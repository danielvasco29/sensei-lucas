-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookstoreId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookstore_id_bookstore_fkey" FOREIGN KEY ("id_bookstore") REFERENCES "tokens" ("bookstoreId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bookstore" ("adress", "created_at", "id_bookstore", "name", "updated_at") SELECT "adress", "created_at", "id_bookstore", "name", "updated_at" FROM "bookstore";
DROP TABLE "bookstore";
ALTER TABLE "new_bookstore" RENAME TO "bookstore";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
