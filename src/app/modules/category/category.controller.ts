
import { RequestHandler } from "express";
import { categoryService } from "./category.service";
import { catchAsync } from "../../middleware/catchAsync";
import { paginationAndSortingHelper } from "../../helpers/paginationAndSortingHelper";

const getAllOrQueryCategory: RequestHandler = catchAsync(async (req, res) => {
    const search = req.query.search ? req.query.search as string : "";

    const { page, limit, skip, sort_by, sort_order } = paginationAndSortingHelper(req.query);

    const result = await categoryService.getAllOrQueryCategoryFromDB({
        search,
        page,
        limit,
        skip,
        sort_by,
        sort_order
    });
    res.status(200).json(result);
});

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
    getAllOrQueryCategory,
    createCategory,
    deleteCategory,
}