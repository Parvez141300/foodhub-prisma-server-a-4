import { Router } from "express";
import { wishListController } from "./wishlist.controller";

const router = Router();

router.post("/wishlist", wishListController.createWishList);

export const wishListRouter = router;