import { prisma } from "../../lib/prisma"


const getAllProviderFromDB = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: "PROVIDER",
        }
    });
    return result;
}

const getProviderWithMenuFromDB = async (providerId: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: providerId,
        },
        include: {
            meals: true,
        }
    });
    return result;
}

const getAllOrSearchUserFromDB = async (search: string) => {
    const result = await prisma.user.findMany({
        where: {
            AND: {
                OR: [
                    {
                        name: {
                            contains: search as string,
                            mode: "insensitive",
                        }
                    },
                    {
                        email: {
                            contains: search as string
                        }
                    },
                ]
            }
        },
        orderBy: {
            createdAt: "desc"
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

    if (!payload?.is_active) {
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

const updateUserRoleInDB = async ({userId, role}: {userId: string, role: string}) => {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if(!userData?.id){
        return {message: "This user not found!!!!"};
    }
    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role: role
        }
    });

    return result;
}

export const userService = {
    getAllProviderFromDB,
    getProviderWithMenuFromDB,
    getAllOrSearchUserFromDB,
    updateUserStatusInDB,
    updateUserRoleInDB,
}