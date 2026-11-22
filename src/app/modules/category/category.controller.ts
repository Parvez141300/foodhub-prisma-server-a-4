
import { RequestHandler } from "express";
import { categoryService } from "./category.service";

const getAllCategory: RequestHandler = async (req, res) => {
    try {
        const result = await categoryService.getAllCategoryFromDB();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const createCategory: RequestHandler = async (req, res) => {
    try {
        const payload = req.body;
        const result = await categoryService.createCategoryIntoDB(payload);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

const deleteCategory: RequestHandler = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category_id = categoryId as string;
        const result = await categoryService.deleteCategoryFromDb(category_id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export const categoryController = {
    getAllCategory,
    createCategory,
    deleteCategory,
}