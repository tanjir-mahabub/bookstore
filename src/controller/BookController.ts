import express, { Request, Response, Router } from "express";
import { BookService } from '../service/BookService';
import { AppDataSource } from "../database";

const router: Router = express.Router();
const bookService = new BookService(AppDataSource);

router.get('/', async (req: Request, res: Response) => {
  try {
      const page = parseInt(req.query.page as string, 12) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 12) || 12;

      const books = await bookService.getAllBooks(page, pageSize);
      
      (books.length > 0) ? res.json(books) : res.json({ message: "No book found!" });
      
  } catch (error) {      
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a book by ID
router.get('/:id', async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);

  if (isNaN(bookId)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  try {
    const book = await bookService.getBookById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found', status: 404 });
    }

    return res.json(book);
  } catch (error) {    
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});

// Search books
router.get('/search', async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;
    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const books = await bookService.searchBooks(searchQuery);
    res.json(books);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



export { router as BookController };