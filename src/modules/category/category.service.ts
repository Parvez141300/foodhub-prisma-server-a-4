import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getAllCategoryFromDB = async () => {
    const result = await prisma.category.findMany();
    return result;
}

const createCategoryIntoDB = async (payload: Category) => {
    
    const categoryData = await prisma.category.findUnique({
        where: {
            name: payload.name,
        },
    });
    if (categoryData) {
        return { message: "Category already exists" };
    }
    const result = await prisma.category.create({
        data: payload,
    });
    return result;
}

const deleteCategoryFromDb = async (category_id: string) => {
    const isExistCategory = await prisma.category.findUnique({
        where: {
            id: category_id,
        }
    });
    if(!isExistCategory){
        throw new Error("This category does not exists");
        return;
    }
    const result = await prisma.category.delete({
        where: {
            id: category_id,
        }
    });

    return result;
}

export const categoryService = {
    getAllCategoryFromDB,
    createCategoryIntoDB,
    deleteCategoryFromDb,
}