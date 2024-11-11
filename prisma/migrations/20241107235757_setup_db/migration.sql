-- CreateTable
CREATE TABLE "user" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Username" TEXT
);

-- CreateTable
CREATE TABLE "transaction" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Valor" REAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "transaction_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");
