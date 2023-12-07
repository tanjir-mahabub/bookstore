import { DataSource } from "typeorm";
import log from "./log";
import { Book } from "./entity/Book";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Tm900300",
    database: "bookstore",
    synchronize: true,
    logging: true,
    entities: [Book],
    subscribers: [],
    migrations: [],
});