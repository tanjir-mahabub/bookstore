import { JSDOM } from "jsdom";
import puppeteer, { Page } from "puppeteer";

class ScrapeService {
  private scrapeUrl: string;
  private targetSelector: string;

  constructor(private readonly scrapeURL: string) {
    this.scrapeUrl = scrapeURL;
    this.targetSelector = '[data-component-type="s-search-result"]';
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

  async dataExtractor(html: string): Promise<any[] | undefined> {
    try {
        const dom = new JSDOM(html);
        const elements = dom.window.document.querySelectorAll(this.targetSelector);

        if (elements) {
        const data: any[] = [];
        elements.forEach((elem, index) => {
            let title = elem.querySelector('.a-link-normal .a-size-medium')?.textContent?.trim();
            let img = elem.querySelector('[data-component-type="s-product-image"] img')?.getAttribute("src");
            let author = elem.querySelector('.a-size-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style')?.textContent?.trim();
            let rating = elem.querySelector('.a-icon-alt')?.textContent?.trim().split(' ')[0] || "0";

            data.push({
                title: title,
                writer: author,
                coverImage: img,
                rating: rating,
                point: 5,
                tags: ["computer", "science", "book", "windows", "linux", "microsoft"]
            });
        });

        return data;
        }
    } catch(error) {
        throw new Error("Data not found on the page");
    }
  }

  async getData(): Promise<any[] | undefined> {
    try {
      if (this.scrapeUrl && this.targetSelector) {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        // Navigate to the desired website
        await page.goto(this.scrapeUrl);

        // Wait for content to load
        await page.waitForSelector(this.targetSelector);

        // Auto scroll to load more content if needed
        await this.autoScroll(page);

        // Get rendered HTML
        const html = await page.content();

        // Close browser
        await browser.close();

        // Data Extract
        let data = await this.dataExtractor(html);

        return data;
      } else {
        throw new Error("Data not found on the page");
      }
    } catch (error) {
      console.error("Error from scrape service", error);
      throw error;
    }
  }
}

export { ScrapeService };
