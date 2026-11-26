import { RequestHandler } from "express";
import { wishListService } from "./wishlist.service";
import { catchAsync } from "../../middleware/catchAsync";
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";


const getAllOrQueryUserWishlist: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const search = req.query.search ? req.query.search : "";
    const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);
    const result = await wishListService.getAllOrQueryUserWishlistFromDB(
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
    res.status(200).json(result);
});

const createWishList: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const { meal_id } = req.body;
    const result = await wishListService.createWishListInDB(userId as string, meal_id);
    res.status(201).json(result);
});

const deleteWishListItem: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const { wishListId } = req.params;
    const { meal_id } = req.body;
    const result = await wishListService.deleteWishListItemFromDB({ wishListId: wishListId as string, user_id: userId as string, meal_id });
    res.status(201).json(result);
});

export const wishListController = {
    getAllOrQueryUserWishlist,
    createWishList,
    deleteWishListItem,
}