import express, { Request, Response, Router } from "express";
import { ScrapeService } from "../service/ScrapeService";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const router: Router = express.Router();
const ScrapeURL: string | undefined = process.env.SCRAPE_URL;
const scrapeService = new ScrapeService(ScrapeURL);

router.get('/', async (req: Request, res: Response) => {
    try {
        const data = await scrapeService.getData();
        return res.json(data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
});


export { router as ScrapeController };