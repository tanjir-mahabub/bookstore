import "reflect-metadata"
import express from 'express';
import './database'; 
import { BookController } from './controller/BookController';
import { AppDataSource } from './database';
import log from './log';
import { ScrapeController } from "./controller/ScrapeController";
import { config as dotenvConfig } from "dotenv";

dotenvConfig(); 

const app = express();

const port = process.env.PORT || 3000;

app.use(ScrapeController);

app.use("/books", BookController);

AppDataSource.initialize()
    .then(() => {
      app.listen(port, () => {
        log.magenta(`Server is running at http://localhost:${port}`);
      });        
    })
    .catch((error) => {
        log.red('Error connecting database!');
    });

