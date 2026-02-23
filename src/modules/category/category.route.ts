import { Router } from "express";
import { categoryController } from "./category.controller";


const router = Router();

router.post("/categories", categoryController.createCategory);
router.post("/categories/:categoryId", categoryController.deleteCategory);

export const categoryRouter = router;