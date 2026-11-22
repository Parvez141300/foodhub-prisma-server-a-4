import { RequestHandler } from "express";
import { wishListService } from "./wishlist.service";


const getUserWishList: RequestHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await wishListService.getUserWishListFromDB(userId as string);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

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
    getUserWishList,
    createWishList,
    deleteWishListItem,
}