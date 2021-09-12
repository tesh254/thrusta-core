-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "ram_available" INTEGER NOT NULL DEFAULT 0,
    "ram_total" INTEGER NOT NULL DEFAULT 0,
    "ram_used" INTEGER NOT NULL DEFAULT 0,
    "server_uptime" INTEGER NOT NULL DEFAULT 0,
    "swap_available" INTEGER NOT NULL DEFAULT 0,
    "swap_total" INTEGER NOT NULL DEFAULT 0,
    "swap_used" INTEGER NOT NULL DEFAULT 0,
    "cpu_total" INTEGER NOT NULL DEFAULT 0,
    "cpu_usage_avg" INTEGER NOT NULL DEFAULT 0,
    "cpu_free_avg" INTEGER NOT NULL DEFAULT 0,
    "cpu_details" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'INFO',
    "posted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Status" ADD FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
