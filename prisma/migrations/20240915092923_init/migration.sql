/*
  Warnings:

  - Added the required column `capacity` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `TruckCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TruckCategory" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;
