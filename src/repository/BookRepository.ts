import { DataSource, Repository } from 'typeorm';
import { Book } from '../entity/Book';

class BookRepository {
    private bookRepository: Repository<Book>;

    constructor(private readonly dataSource: DataSource) {
        this.bookRepository = dataSource.getRepository(Book);
    }

   // Get all books
   async getAllBooks(pageSize: number, skip: number): Promise<Book[]> {
    return await this.bookRepository.find({
        take: pageSize,
        skip: skip,
    });
   }

  // Get a book by ID
  async getBookById(bookId: number): Promise<Book | null> {
    return await this.bookRepository.findOne({ where: { id: bookId } });
  }

  // Add a new book
  async addBook(bookData: Partial<Book>): Promise<Book> {
    const newBook = this.bookRepository.create(bookData);
    return await this.bookRepository.save(newBook);
  }

  // Save multiple books
  async saveBooks(booksData: Partial<Book>[]): Promise<Book[]> {
    const newBooks = this.bookRepository.create(booksData);
    return await this.bookRepository.save(newBooks);
  }

  // Update a book
  async updateBook(bookId: number, bookData: Partial<Book>): Promise<Book | null> {
    const existingBook = await this.getBookById(bookId);

    if (existingBook) {
      const updatedBook = Object.assign(existingBook, bookData);
      return await this.bookRepository.save(updatedBook);
    }

    return null;
  }

  // Delete a book
  async deleteBook(bookId: number): Promise<Book | null> {
    const existingBook = await this.getBookById(bookId);

    if (existingBook) {
      await this.bookRepository.remove(existingBook);
      return existingBook;
    }

    return null;
  }
}

export { BookRepository };