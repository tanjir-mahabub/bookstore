import { BookRepository } from '../repository/BookRepository';
import { Book } from '../entity/Book';
import { DataSource } from 'typeorm';

class BookService {
    private bookRepository: BookRepository;

    constructor(private readonly dataSource: DataSource) {
        this.bookRepository = new BookRepository(dataSource);
    }

    async getAllBooks(): Promise<Book[] | undefined> {
        return await this.bookRepository.getAllBooks();
    }

     // Get a book by ID
    async getBookById(bookId: number): Promise<Book | null> {
        return await this.bookRepository.getBookById(bookId);
    }
}

export { BookService };
