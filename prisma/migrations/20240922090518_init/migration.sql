/*
  Warnings:

  - Added the required column `payment` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment" INTEGER NOT NULL;
