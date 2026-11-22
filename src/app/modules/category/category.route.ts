import { Router } from "express";
import { categoryController } from "./category.controller";


const router = Router();

router.get("/categories", categoryController.getAllCategory);
router.post("/categories", categoryController.createCategory);
router.delete("/categories/:categoryId", categoryController.deleteCategory);

export const categoryRouter = router;