/*
  Warnings:

  - You are about to drop the column `cpu_details` on the `Status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Status" DROP COLUMN "cpu_details";

-- CreateTable
CREATE TABLE "Cpu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "free" INTEGER NOT NULL,
    "model" TEXT,
    "frequency" TEXT,
    "status_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cpu" ADD FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
