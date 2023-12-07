import { DataSource, getRepository, Repository } from 'typeorm';
import { Book } from '../entity/Book';

class BookRepository {
    private bookRepository: Repository<Book>;

    constructor(private readonly dataSource: DataSource) {
        this.bookRepository = dataSource.getRepository(Book);
    }

    // Get all books
  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  // Get a book by ID
  async getBookById(bookId: number): Promise<Book | null> {
    return await this.bookRepository.findOne({ where: { id: bookId } });
  }
}

export { BookRepository };