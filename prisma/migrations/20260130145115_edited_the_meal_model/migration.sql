-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
