import { BookRepository } from '../repository/BookRepository';
import { Book } from '../entity/Book';
import { DataSource } from 'typeorm';

class BookService {
    private bookRepository: BookRepository;

    constructor(private readonly dataSource: DataSource) {
        this.bookRepository = new BookRepository(dataSource);
    }

    // search a book
    async searchBooks(searchQuery: string): Promise<Book[]> {
        return await this.bookRepository.searchBooks(searchQuery);
    }

    // Get all books
    async getAllBooks(page: number = 1, pageSize: number = 10): Promise<Book[]> {
        const skip = (page - 1) * pageSize;
        return await this.bookRepository.getAllBooks(pageSize, skip);
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
