import { prisma } from "../../lib/prisma";
import { Review } from "../../../generated/prisma/client";

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
            ...payload
        }
    })

    return result;
}

export const reviewService = {
    createReviewInDB,
};