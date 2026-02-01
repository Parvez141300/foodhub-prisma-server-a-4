import { prisma } from "../../lib/prisma"


const getAllProviderFromDB = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "PROVIDER",
        }
    });
    return result;
}

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

const updateUserStatusInDB = async ({ userId, payload }: { userId: string, payload: Record<string, string> }) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
        }
    });

    if (!userData?.id) {
        return { message: "User not found" };
    }

    if(!payload?.is_active) {
        return { message: "user status to update data not found" };
    }

    const result = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            is_active: payload.is_active as string,
        },
        select: {
            name: true,
            email: true,
            is_active: true,
        },
    });
    return result;
}

export const userService = {
    getAllProviderFromDB,
    getAllOrSearchUserFromDB,
    updateUserStatusInDB,
}