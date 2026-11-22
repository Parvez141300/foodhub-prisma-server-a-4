import dotenv from "dotenv";

dotenv.config();

interface IEnvVarialbleConfig {
    NODE_ENV: string;
    FRONTEND_URL: string;
    BACKEND_URL: string;
    PORT: string;
    DATABASE_URL: string;
}