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
}