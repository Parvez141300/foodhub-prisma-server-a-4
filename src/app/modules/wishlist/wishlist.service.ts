import { prisma } from "../../lib/prisma";

const getUserWishListFromDB = async (userId: string) => {
    const userData = prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    if (!userData) {
        throw new Error("This user not found");
        return;
    }

    const result = await prisma.wishlist.findMany({
        where: {
            user_id: userId
        },
        include: {
            wishlistItems: {
                include: {
                    meal: {
                        include: {
                            category: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            },
                            cuisine: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            },
                            dietery: {
                                select: {
                                    id: true,
                                    name: true,
                                }
                            },
                        }
                    }
                }
            },
        }
    });

    return result;
}

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

const deleteWishListItemFromDB = async ({ wishListId, user_id, meal_id }: { wishListId: string, user_id: string, meal_id: string }) => {
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
    getUserWishListFromDB,
    createWishListInDB,
    deleteWishListItemFromDB,
}