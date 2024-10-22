/*
  Warnings:

  - Added the required column `truckId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "truckId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "TruckCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
