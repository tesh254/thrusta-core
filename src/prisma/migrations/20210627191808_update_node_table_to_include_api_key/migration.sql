/*
  Warnings:

  - You are about to drop the column `access_key` on the `Node` table. All the data in the column will be lost.
  - You are about to drop the column `iv` on the `Node` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Node" DROP COLUMN "access_key",
DROP COLUMN "iv",
ADD COLUMN     "api_key" TEXT,
ADD COLUMN     "api_key_uuid" TEXT;
