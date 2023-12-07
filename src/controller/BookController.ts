import express, { Request, Response, Router } from "express";
import { BookService } from '../service/BookService';
import { AppDataSource } from "../database";

const router: Router = express.Router();
const bookService = new BookService(AppDataSource);

router.get('/', async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        return res.json(books);
      } catch (error) {
        console.error(error);
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
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', status: 500 });
  }
});



export { router as BookController };