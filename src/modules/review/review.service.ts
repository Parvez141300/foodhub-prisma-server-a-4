import { prisma } from "../../lib/prisma";
import { Review } from "../../../generated/prisma/client";

const getAllReviewByMealIdFromDB = async (meal_id: string) => {
    const result = await prisma.review.findMany({
        where: {
            meal_id: meal_id,
        }
    });

    return result;
}

const createReviewInDB = async (payload: Review) => {
    const userData = await prisma.user.findUnique({
        where: { id: payload.author_id },
    });
    if (!userData?.id) {
        return { message: "This User not found" };
    }
    const mealData = await prisma.meal.findUnique({
        where: { id: payload.meal_id },
    });
    if (!mealData?.id) {
        return { message: "This Meal not found" };
    }
    const result = await prisma.review.create({
        data: {
            ...payload,
            rating: Number(payload.rating),
        }
    })

    return result;
}

export const reviewService = {
    getAllReviewByMealIdFromDB,
    createReviewInDB,
};