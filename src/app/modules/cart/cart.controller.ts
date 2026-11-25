import { RequestHandler } from "express";
import { cartService } from "./cart.service";
import { catchAsync } from "../../middleware/catchAsync";
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";

const getAllOrQueryUserCart: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const search = req.query.search;
    const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);
    const result = await cartService.getAllOrQueryUserCartFromDB(
        userId as string,
        {
            search: search as string,
            page,
            limit,
            skip,
            sort_by,
            sort_order,
        }
    );
    res.status(201).json(result);
});

const createCart: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await cartService.createCartInDB(payload);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

const deleteCartItem: RequestHandler = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { user_id, meal_id } = req.body;

        const result = await cartService.deleteCartItemFromDB({ cartId: cartId as string, user_id, meal_id });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const cartController = {
    getAllOrQueryUserCart,
    createCart,
    deleteCartItem,
}