import "reflect-metadata"
import express, { Request, Response } from 'express';
import './database'; 
import { BookController } from './controller/BookController';
import { AppDataSource } from './database';
import log from './log';
import { ScrapeController } from "./controller/ScrapeController";
import cors from 'cors';
import { PORT } from "./config/constant";
import { UserController } from "./controller/UserController";
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './config/swaggerConfig';

const app = express();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors());

const port = PORT;


app.use(ScrapeController);
app.use(UserController)

app.get("/", (req: Request, res: Response) => {
  res.send('Welcome')
})

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

