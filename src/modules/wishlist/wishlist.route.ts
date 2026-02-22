import { Router } from "express";
import { wishListController } from "./wishlist.controller";

const router = Router();

router.post("/wishlist", wishListController.createWishList);
router.delete("/wishlist/:wishListId", wishListController.deleteWishListItem);

export const wishListRouter = router;