-- CreateTable
CREATE TABLE "Pricing" (
    "id" SERIAL NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "truckId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pricing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "TruckCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
