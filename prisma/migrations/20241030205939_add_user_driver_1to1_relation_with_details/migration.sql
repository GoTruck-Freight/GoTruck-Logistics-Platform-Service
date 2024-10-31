/*
  Warnings:

  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DRIVER', 'SHIPPER');

-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_truckCategoryId_fkey";

-- DropTable
DROP TABLE "Driver";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'SHIPPER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverId" INTEGER,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "truckCategoryId" INTEGER NOT NULL,
    "degree" "Degree" NOT NULL DEFAULT 'DEGREE_1',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_driverId_key" ON "accounts"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_phoneNumber_key" ON "drivers"("phoneNumber");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_truckCategoryId_fkey" FOREIGN KEY ("truckCategoryId") REFERENCES "TruckCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
