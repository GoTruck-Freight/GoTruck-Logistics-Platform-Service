-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('DEGREE_1', 'DEGREE_2', 'DEGREE_3', 'DEGREE_4', 'DEGREE_5', 'DEGREE_6', 'DEGREE_7');

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "degree" "Degree" NOT NULL DEFAULT 'DEGREE_1';
