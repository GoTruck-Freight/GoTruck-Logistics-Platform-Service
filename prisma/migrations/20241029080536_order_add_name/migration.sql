/*
  Warnings:

  - Added the required column `dropoffLocationName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocationName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "dropoffLocationName" TEXT NOT NULL,
ADD COLUMN     "pickupLocationName" TEXT NOT NULL;
