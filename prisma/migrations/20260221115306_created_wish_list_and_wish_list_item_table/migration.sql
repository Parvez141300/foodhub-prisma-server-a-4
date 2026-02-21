-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "wishlist_id" TEXT NOT NULL,
    "meal_id" TEXT NOT NULL,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_user_id_key" ON "Wishlist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_wishlist_id_meal_id_key" ON "WishlistItem"("wishlist_id", "meal_id");

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
