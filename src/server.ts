import "reflect-metadata"
import express from 'express';
import './database'; 
import { BookController } from './controller/BookController';
import { AppDataSource } from './database';
import log from './log';

const app = express();
const port = 3000;

app.use(express.json());

app.use("/books", BookController)


AppDataSource.initialize()
    .then(() => {
      app.listen(port, () => {
        log.magenta(`Server is running at http://localhost:${port}`);
      });        
    })
    .catch((error) => {
        log.red('Error connecting database!');
    });

