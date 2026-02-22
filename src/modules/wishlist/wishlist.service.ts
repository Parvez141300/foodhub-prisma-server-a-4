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
    else {
        throw new Error("This item already exists in wish list");
        return;
    }
}

const deleteWishListItemFromDB = async (wishListId: string, user_id: string, meal_id: string) => {
    const isExistsWishList = await prisma.wishlist.findUnique({
        where: {
            id: wishListId,
        }
    });
    if (!isExistsWishList) {
        throw new Error("Wish list not found");
        return;
    }

    const isExistMeal = await prisma.meal.findUnique({
        where: { id: meal_id },
    });
    if (!isExistMeal) {
        throw new Error("Meal not found");
        return;
    }

    const isExistUser = await prisma.user.findUnique({
        where: { id: user_id },
    });
    if (!isExistUser) {
        throw new Error("User not found");
        return;
    }

    const deleteWishListItem = await prisma.wishlistItem.delete({
        where: {
            wishlist_id_meal_id: {
                meal_id: meal_id,
                wishlist_id: wishListId,
            }
        }
    });

    return deleteWishListItem;
}

export const wishListService = {
    createWishListInDB,
    deleteWishListItemFromDB,
}