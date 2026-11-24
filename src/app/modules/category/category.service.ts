import { Category } from "../../../generated/prisma/client";
import { CategoryWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"
import { IgetAllOrQueryCategoryPayload } from "./category.interface";

const getAllOrQueryCategoryFromDB = async (payload: IgetAllOrQueryCategoryPayload) => {
    const { search, page, limit, skip, sort_by, sort_order } = payload;

    const addCondition: CategoryWhereInput[] = [];

    if (search) {
        addCondition.push({
            name: { contains: search, mode: "insensitive" }
        })
    }

    const result = await prisma.category.findMany({
        where: {
            AND: addCondition,
        },
        take: limit,
        skip: skip,
        orderBy: {
            [sort_by]: sort_order,
        },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    role: true,
                }
            }
        },
    });
    const categoryCount = await prisma.category.count({
        where: {
            AND: addCondition,
        }
    })

    return {
        data: result,
        pagination: {
            page: page,
            limit: limit,
            total: categoryCount,
            totalPage: Math.ceil(categoryCount / limit),
        }
    };
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
    if (!isExistCategory) {
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
    getAllOrQueryCategoryFromDB,
    createCategoryIntoDB,
    deleteCategoryFromDb,
}