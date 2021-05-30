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
    "access_key" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "dev_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.uid_unique" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Node" ADD FOREIGN KEY ("dev_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
