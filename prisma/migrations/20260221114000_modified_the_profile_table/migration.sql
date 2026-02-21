/*
  Warnings:

  - You are about to drop the column `address` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "address",
DROP COLUMN "description",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "district" TEXT,
ADD COLUMN     "division" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "thana" TEXT,
ALTER COLUMN "phone" SET DATA TYPE TEXT;
