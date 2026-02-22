import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

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

export const categoryService = {
    createCategoryIntoDB,
}