import axios from "axios";
import { JSDOM } from "jsdom";
import puppeteer, { Page } from "puppeteer";

class ScrapeService {
  private targetSelector: string | undefined;

  constructor(private readonly scrapeUrl: string | undefined) {
    this.targetSelector = "#gridItemRoot";
  }

  async autoScroll(page: Page) {
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const scrollInterval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          // Adjust the condition based on your requirements
          if (totalHeight >= scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 100);
      });
    });
  }

  async getData(): Promise<string[] | undefined> {
    try {
      if (this.scrapeUrl && this.targetSelector) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        // Navigate to the desired website
        await page.goto(this.scrapeUrl);

        // Wait for content to load
        await page.waitForSelector(this.targetSelector);

        // Infinite scroll
        for (let i = 0; i < 5; i++) {
          await this.autoScroll(page);
          // Evaluate condition on the page for readiness
          await page.waitForSelector(this.targetSelector);
        }

        // Get rendered HTML
        const html = await page.content();

        // Close browser
        await browser.close();

        const dom = new JSDOM(html);
        const Element = dom.window.document.querySelectorAll(this.targetSelector);
        console.log(Element.length);

        if (Element) {
          const data: any[] = [];
          Element.forEach((elem, index) => {
            let title = elem.querySelector('.a-size-small')?.textContent?.trim();
            let rawImg: any = elem.querySelector('img')?.getAttribute("data-a-dynamic-image");
            rawImg = JSON.parse(rawImg);
            let img = Object.keys(rawImg)[2]
            let rating = elem.querySelector('.a-icon-alt')?.textContent?.trim().split(' ')[0];            

            data.push({
              title: title,
              coverImage: img,
              rating: rating,
              point: 5
            })
          });

          return data;
        } else {
          throw new Error("Data not found on the page");
        }
      }
    } catch (error) {
      console.error("Error from scrape service", error);
      throw error;
    }
  }
}

export { ScrapeService };
