import { config as dotenvConfig } from "dotenv";
import path from "path";
dotenvConfig(); 

export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const DB_PORT = process.env.DB_PORT && parseInt(process.env.DB_PORT, 10)  || 5432;

export const DB_HOST = process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_SYNCHRONIZE = process.env.DB_SYNCHRONIZE === "true" || false
export const DB_LOGGING = process.env.DB_LOGGING === "true" || false

export const SCRAPE_URL: string = process.env.SCRAPE_URL || "";
export const SCRAPE_PAGE: number = process.env.SCRAPE_PAGE ? parseInt(process.env.SCRAPE_PAGE, 10) : 5;

export const htmlPath = path.join(__dirname, '../view', 'index.html');
