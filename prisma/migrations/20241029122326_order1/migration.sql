/*
  Warnings:

  - Made the column `pickupDate` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "pickupDate" SET NOT NULL,
ALTER COLUMN "dropoffDate" DROP NOT NULL;
