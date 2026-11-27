import { MealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { IGetAllOrQueryUserWishlistPayload } from "./wishlist.interface";

const getAllOrQueryUserWishlistFromDB = async (userId: string, payload: IGetAllOrQueryUserWishlistPayload) => {
    const { search, page, limit, skip, sort_by, sort_order } = payload;

    const userData = prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    if (!userData) {
        throw new Error("This user not found");
        return;
    }

    const mealSearch: MealWhereInput = search ?
        { title: { contains: search, mode: "insensitive" } } :
        {};

    const result = await prisma.wishlist.findFirst({
        where: {
            user_id: userId
        },
        include: {
            wishlistItems: {
                where: {
                    meal: mealSearch,
                },
                take: limit,
                skip: skip,
                orderBy: {
                    [sort_by] : sort_order,
                },
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

    const cartItemCount = await prisma.cartItem.count({
        where: {
            cart: {
                user_id: userId,
            }
        }
    });

    return {
        data: result,
        pagination: {
            page: page,
            limit: limit,
            total: cartItemCount,
            totalPage: Math.ceil(cartItemCount / limit),
        }
    };
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
    getAllOrQueryUserWishlistFromDB,
    createWishListInDB,
    deleteWishListItemFromDB,
}