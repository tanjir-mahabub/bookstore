import { BookRepository } from '../repository/BookRepository';
import { Book } from '../entity/Book';
import { DataSource } from 'typeorm';

class BookService {
    private bookRepository: BookRepository;

    constructor(private readonly dataSource: DataSource) {
        this.bookRepository = new BookRepository(dataSource);
    }

    // Get all books
    async getAllBooks(): Promise<Book[]> {
        return await this.bookRepository.getAllBooks();
    }

    // Get a book by ID
    async getBookById(bookId: number): Promise<Book | null> {
        return await this.bookRepository.getBookById(bookId);
    }

    // Add a new book
    async addBook(bookData: Partial<Book>): Promise<Book> {
        return await this.bookRepository.addBook(bookData);
    }

    // Save multiple books
    async saveBooks(booksData: Partial<Book>[]): Promise<Book[]> {
        return await this.bookRepository.saveBooks(booksData);
    }

    // Update a book
    async updateBook(bookId: number, bookData: Partial<Book>): Promise<Book | null> {
        return await this.bookRepository.updateBook(bookId, bookData);
    }

    // Delete a book
    async deleteBook(bookId: number): Promise<Book | null> {
        return await this.bookRepository.deleteBook(bookId);
    }
}

export { BookService };
