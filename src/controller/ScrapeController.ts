import express, { Request, Response, Router } from "express";
import { ScrapeService } from "../service/ScrapeService";
import { AppDataSource } from "../database";
import { BookService } from "../service/BookService";
import log from "../log";
import { SCRAPE_PAGE, SCRAPE_URL } from "../config/constant";

const router: Router = express.Router();

const bookService = new BookService(AppDataSource);

// Check if the books table has any records
async function hasRecords(): Promise<boolean> {
  const count = (await bookService.getAllBooks()).length;  
  return count > 0;
}

// Express route for scraping data
router.get('/', async (req: Request, res: Response) => {
  try {
    const recordsExist = await hasRecords();

    if (!recordsExist) {
      const scraper = new ScrapeService(SCRAPE_URL);
      const totalPages = SCRAPE_PAGE; // Set the number of pages to scrape

      for (let page = 1; page <= totalPages; page++) {
        const scrapedData: any[] | undefined = await scraper.getData(page);

        // Save the scraped data to the database
        if (scrapedData) {
          let dataSaved = await bookService.saveBooks(scrapedData);

          if (!dataSaved) return false;

          log.magenta(`Data scraped and saved for page ${page}.`);
        } else {
          log.red(`Error: Failed to scrape data for page ${page}.`);
        }
      }

      res.status(200).json({ message: 'Data scraped and saved to the database.', status: 200 });

    } else {

      res.status(403).json({ message: 'Database already has data. Skipping scraping.', status: 403 });

    }
  } catch (error) {

    console.error('Error during scraping:', error);

    res.status(500).json({ error: 'Internal Server Error' });

  }
});

export { router as ScrapeController };
