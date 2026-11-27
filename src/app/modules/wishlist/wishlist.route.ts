import { Router } from "express";
import { wishListController } from "./wishlist.controller";
import authMiddleware from "../../middleware/authMiddleware";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
    "/wishlist",
    authMiddleware(UserRole.CUSTOMER),
    wishListController.getAllOrQueryUserWishlist
);
router.post(
    "/wishlist",
    authMiddleware(UserRole.CUSTOMER),
    wishListController.createWishList
);
router.delete(
    "/wishlist/:wishListId",
    authMiddleware(UserRole.CUSTOMER),
    wishListController.deleteWishListItem
);

export const wishListRouter = router;