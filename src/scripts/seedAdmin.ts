import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/authMiddleware";

const seedAdmin = async () => {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME as string,
            email: process.env.ADMIN_EMAIL as string,
            password: process.env.ADMIN_PASSWORD as string,
            role: UserRole.ADMIN,
        }
        const userData = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            }
        });
        if (userData?.email) {
            throw new Error("User already exists!!!");
        }

        const signUpAdmin = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: process.env.APP_URL as string,
            },
            body: JSON.stringify(adminData)
        });

        if (signUpAdmin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

seedAdmin();