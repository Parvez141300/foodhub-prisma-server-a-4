/*
  Warnings:

  - Made the column `area` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `district` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `division` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thana` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "area" SET NOT NULL,
ALTER COLUMN "district" SET NOT NULL,
ALTER COLUMN "division" SET NOT NULL,
ALTER COLUMN "thana" SET NOT NULL;
