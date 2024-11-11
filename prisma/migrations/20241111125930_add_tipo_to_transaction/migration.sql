/*
  Warnings:

  - Added the required column `Tipo` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Valor" REAL NOT NULL,
    "Tipo" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "transaction_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("Id", "UserId", "Valor") SELECT "Id", "UserId", "Valor" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
CREATE TABLE "new_user" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Username" TEXT
);
INSERT INTO "new_user" ("Email", "Id", "Password", "Username") SELECT "Email", "Id", "Password", "Username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
