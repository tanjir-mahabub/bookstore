import { DataSource } from "typeorm";
import { Book } from "./entity/Book";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const DB_PORT = process.env.DB_PORT && parseInt(process.env.DB_PORT, 10);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true" || false,
  logging: process.env.DB_LOGGING === "true" || false,
  entities: [Book],
  subscribers: [],
  migrations: [],
});
