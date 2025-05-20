/*
  Warnings:

  - Added the required column `updatedAt` to the `contact_log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact_log" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "contact_log_history" (
    "id" SERIAL NOT NULL,
    "contactLogID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "userID" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_log_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contact_log_history" ADD CONSTRAINT "contact_log_history_contactLogID_fkey" FOREIGN KEY ("contactLogID") REFERENCES "contact_log"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_log_history" ADD CONSTRAINT "contact_log_history_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
