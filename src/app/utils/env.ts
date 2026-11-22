import dotenv from "dotenv";

dotenv.config();

interface IEnvVarialbleConfig {
    NODE_ENV: string;
    PORT: string;
    FRONTEND_URL: string;
    BACKEND_URL: string;
    DATABASE_URL: string;
    ADMIN_NAME: string;
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;
    BETTER_AUTH_BASE_URL: string;
    BETTER_AUTH_SECRET: string;
}

const loadEnvVariables = (): IEnvVarialbleConfig => {
    const requiredEnvVariables = [
        "NODE_ENV",
        "PORT",
        "FRONTEND_URL",
        "BACKEND_URL",
        "DATABASE_URL",
        "ADMIN_NAME",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD",
        "BETTER_AUTH_BASE_URL",
        "BETTER_AUTH_SECRET",
    ];

    requiredEnvVariables.forEach((envVariable) => {
        if (!process.env[envVariable]) {
            throw new Error(`Missing env variable ${envVariable}`);
        }
    });

    return {
        NODE_ENV: process.env.NODE_ENV as string,
        PORT: process.env.PORT as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        BACKEND_URL: process.env.BACKEND_URL as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        ADMIN_NAME: process.env.ADMIN_NAME as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
        BETTER_AUTH_BASE_URL: process.env.BETTER_AUTH_BASE_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
    }
}

export const envVars = loadEnvVariables();