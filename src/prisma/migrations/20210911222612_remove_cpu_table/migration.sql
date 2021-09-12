/*
  Warnings:

  - You are about to drop the `Cpu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cpus` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cpu" DROP CONSTRAINT "Cpu_status_id_fkey";

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "cpus" JSONB NOT NULL;

-- DropTable
DROP TABLE "Cpu";
