/*
  Warnings:

  - The `ram_available` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ram_used` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ram_cached` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `server_uptime` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `swap_available` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `swap_total` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `swap_used` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cpu_total` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cpu_usage_avg` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cpu_free_avg` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cpu_count` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `storage_used` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `storage_total` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `storage_free` column on the `Status` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `ram_total` on the `Status` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Status" DROP COLUMN "ram_available",
ADD COLUMN     "ram_available" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "ram_total",
ADD COLUMN     "ram_total" INTEGER NOT NULL,
DROP COLUMN "ram_used",
ADD COLUMN     "ram_used" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "ram_cached",
ADD COLUMN     "ram_cached" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "server_uptime",
ADD COLUMN     "server_uptime" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "swap_available",
ADD COLUMN     "swap_available" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "swap_total",
ADD COLUMN     "swap_total" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "swap_used",
ADD COLUMN     "swap_used" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "cpu_total",
ADD COLUMN     "cpu_total" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "cpu_usage_avg",
ADD COLUMN     "cpu_usage_avg" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "cpu_free_avg",
ADD COLUMN     "cpu_free_avg" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "cpu_count",
ADD COLUMN     "cpu_count" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "storage_used",
ADD COLUMN     "storage_used" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "storage_total",
ADD COLUMN     "storage_total" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "storage_free",
ADD COLUMN     "storage_free" INTEGER NOT NULL DEFAULT 0;
