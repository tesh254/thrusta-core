-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "auth_type" TEXT NOT NULL,
    "last_logged_in" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "api_key" TEXT,
    "api_key_uuid" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "dev_id" TEXT NOT NULL,
    "activated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "ram_available" INTEGER NOT NULL DEFAULT 0,
    "ram_total" INTEGER NOT NULL DEFAULT 0,
    "ram_used" INTEGER NOT NULL DEFAULT 0,
    "ram_cached" INTEGER NOT NULL DEFAULT 0,
    "server_uptime" INTEGER NOT NULL DEFAULT 0,
    "swap_available" INTEGER NOT NULL DEFAULT 0,
    "swap_total" INTEGER NOT NULL DEFAULT 0,
    "swap_used" INTEGER NOT NULL DEFAULT 0,
    "cpu_total" INTEGER NOT NULL DEFAULT 0,
    "cpu_usage_avg" INTEGER NOT NULL DEFAULT 0,
    "cpu_free_avg" INTEGER NOT NULL DEFAULT 0,
    "cpu_count" INTEGER NOT NULL DEFAULT 0,
    "storage_used" INTEGER NOT NULL DEFAULT 0,
    "storage_total" INTEGER NOT NULL DEFAULT 0,
    "storage_free" INTEGER NOT NULL DEFAULT 0,
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

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.uid_unique" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Node" ADD FOREIGN KEY ("dev_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD FOREIGN KEY ("node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
