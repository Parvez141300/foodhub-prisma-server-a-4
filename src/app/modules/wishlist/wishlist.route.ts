import { Router } from "express";
import { wishListController } from "./wishlist.controller";

const router = Router();

router.get("/wishlist/:userId", wishListController.getUserWishList);
router.post("/wishlist", wishListController.createWishList);
router.delete("/wishlist/:wishListId", wishListController.deleteWishListItem);

export const wishListRouter = router;