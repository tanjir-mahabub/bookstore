import express, { Request, Response, Router } from "express";
import { ScrapeService } from "../service/ScrapeService";
import { config as dotenvConfig } from "dotenv";
import { Book } from "../entity/Book";
import { AppDataSource } from "../database";
import { BookService } from "../service/BookService";
import log from "../log";

dotenvConfig();

const router: Router = express.Router();
const ScrapeURL: string = process.env.SCRAPE_URL || "";

const bookService = new BookService(AppDataSource);

// Check if the books table has any records
async function hasRecords(): Promise<boolean> {
  const count = (await bookService.getAllBooks()).length;  
  return count > 0;
}

// Express route for scraping data
router.get('/', async (req, res) => {
  try {
    const recordsExist = await hasRecords();

    if (!recordsExist) {
      const scraper = new ScrapeService(ScrapeURL);
      const scrapedData: any[] | undefined = await scraper.getData();
      
      // Save the scraped data to the database
      if(scrapedData) {

        let dataSaved = await bookService.saveBooks(scrapedData);
        
        if(!dataSaved) return false;

        log.magenta('Data scraped and saved to the database.');

        res.status(200).json({ message: 'Data scraped and saved to the database.', status: 200 });

      } else {

        res.status(500).json({ message: 'Something wrong! Data saving failed', status: 500 });

      }

    } else {

      res.status(403).json({ message: 'Database already has data. Skipping scraping.', status: 403 });

    }
  } catch (error) {

    console.error('Error during scraping:', error);

    res.status(500).json({ error: 'Internal Server Error' });

  }
});


export { router as ScrapeController };