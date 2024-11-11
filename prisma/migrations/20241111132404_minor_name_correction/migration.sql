/*
  Warnings:

  - You are about to drop the column `Valor` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `Value` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Value" REAL NOT NULL,
    "Type" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "transaction_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("Id", "Type", "UserId") SELECT "Id", "Type", "UserId" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
