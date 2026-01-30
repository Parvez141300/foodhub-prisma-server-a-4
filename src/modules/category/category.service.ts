import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createCategoryIntoDB = async (payload: Category) => {
    console.log(payload);
    const result = await prisma.category.create({
        data: payload,
    });
    return result;
}

export const categoryService = {
    createCategoryIntoDB,
}