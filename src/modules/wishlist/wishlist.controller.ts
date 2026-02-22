import { RequestHandler } from "express";
import { wishListService } from "./wishlist.service";

const createWishList: RequestHandler = async (req, res) => {
    try {
        const { user_id, meal_id } = req.body;
        const result = await wishListService.createWishListInDB(user_id, meal_id);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

const deleteWishListItem: RequestHandler = async (req, res) => {
    try {
        const { wishListId } = req.params;
        const { user_id, meal_id } = req.body;
        const result = await wishListService.deleteWishListItemFromDB({ wishListId: wishListId as string, user_id, meal_id });
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const wishListController = {
    createWishList,
    deleteWishListItem,
}