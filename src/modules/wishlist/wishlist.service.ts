import { prisma } from "../../lib/prisma";

const createWishListInDB = async (user_id: string, meal_id: string) => {
    const isExistUser = await prisma.user.findUnique({
        where: { id: user_id },
    });
    if (!isExistUser) {
        throw new Error("User not found");
        return;
    }

    const isExistMeal = await prisma.meal.findUnique({
        where: { id: meal_id },
    });
    if (!isExistMeal) {
        throw new Error("Meal not found");
        return;
    }

    let wishList = await prisma.wishlist.findUnique({
        where: {
            user_id: user_id,
        }
    });

    if (!wishList) {
        wishList = await prisma.wishlist.create({
            data: {
                user_id: user_id,
            }
        })
    }

    let wishListItem = await prisma.wishlistItem.findFirst({
        where: {
            meal_id: meal_id,
            wishlist_id: wishList.id,
        }
    });

    if (!wishListItem) {
        wishListItem = await prisma.wishlistItem.create({
            data: {
                meal_id: meal_id,
                wishlist_id: wishList.id,
            }
        })
        return wishListItem;
    }
    else{
        throw new Error("This item already exists in wish list");
        return;
    }
}

export const wishListService = {
    createWishListInDB,
}