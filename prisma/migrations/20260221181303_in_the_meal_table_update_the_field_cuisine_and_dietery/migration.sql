/*
  Warnings:

  - Added the required column `cuisine_id` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietery_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "cuisine_id" TEXT NOT NULL,
ADD COLUMN     "dietery_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_cuisine_id_fkey" FOREIGN KEY ("cuisine_id") REFERENCES "Cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dietery_id_fkey" FOREIGN KEY ("dietery_id") REFERENCES "Dietery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
