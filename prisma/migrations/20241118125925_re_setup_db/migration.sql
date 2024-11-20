/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Value" REAL NOT NULL,
    "Type" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    CONSTRAINT "transaction_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("Id", "Type", "UserId", "Value") SELECT "Id", "Type", "UserId", "Value" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
CREATE UNIQUE INDEX "transaction_Id_key" ON "transaction"("Id");
CREATE TABLE "new_user" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Username" TEXT
);
INSERT INTO "new_user" ("Date", "Email", "Id", "Password", "Username") SELECT "Date", "Email", "Id", "Password", "Username" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_Id_key" ON "user"("Id");
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
