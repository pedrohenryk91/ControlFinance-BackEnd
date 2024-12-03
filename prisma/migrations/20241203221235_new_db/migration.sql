-- CreateEnum
CREATE TYPE "types" AS ENUM ('Income', 'Outcome');

-- CreateTable
CREATE TABLE "user" (
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Username" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "Id" TEXT NOT NULL,
    "Value" DOUBLE PRECISION NOT NULL,
    "Type" "types" NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_Id_key" ON "user"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "user_Email_key" ON "user"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_Id_key" ON "transaction"("Id");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
