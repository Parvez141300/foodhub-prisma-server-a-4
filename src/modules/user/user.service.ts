import { prisma } from "../../lib/prisma"

const getAllOrSearchUserFromDB = async (payload: { id?: string, name?: string, email?: string }) => {
    const result = await prisma.user.findMany({
        where: {
            AND: {
                OR: [
                    {
                        id: {
                            equals: payload.id as string
                        }
                    },
                    {
                        name: {
                            contains: payload.name as string,
                            mode: "insensitive",
                        }
                    },
                    {
                        email: {
                            contains: payload.email as string
                        }
                    },
                ]
            }
        }
    });

    return result;
}

export const userService = {
    getAllOrSearchUserFromDB,
}