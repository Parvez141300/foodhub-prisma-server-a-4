import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path

import { prisma } from "./prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: false,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: false,
            },
            phone: {
                type: "string",
                required: false,
            },
            is_active: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false,
            }
        },

    },
    trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
});