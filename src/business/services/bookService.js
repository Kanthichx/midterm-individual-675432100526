const repo = require('../../data/repositories/bookRepository');
const validator = require('../validators/bookValidator');

class BookService {
  async getAllBooks(status) {
    const books = await repo.findAll(status);
    return {
      books,
      statistics: {
        total: books.length,
        available: books.filter(b => b.status === 'available').length,
        borrowed: books.filter(b => b.status === 'borrowed').length
      }
    };
  }

  async getBookById(id) {
    const book = await repo.findById(validator.validateId(id));
    if (!book) throw new Error('Book not found');
    return book;
  }

  async createBook(data) {
    validator.validateBook(data);
    return await repo.create(data);
  }

  async updateBook(id, data) {
    validator.validateBook(data);
    const book = await repo.update(validator.validateId(id), data);
    if (!book) throw new Error('Book not found');
    return book;
  }

  async borrowBook(id) {
    const book = await this.getBookById(id);
    if (book.status === 'borrowed') throw new Error('Book already borrowed');
    return await repo.updateStatus(id, 'borrowed');
  }

  async returnBook(id) {
    const book = await this.getBookById(id);
    if (book.status !== 'borrowed') throw new Error('Book not borrowed');
    return await repo.updateStatus(id, 'available');
  }

  async deleteBook(id) {
    const book = await this.getBookById(id);
    if (book.status === 'borrowed') {
      throw new Error('Cannot delete borrowed book');
    }
    return await repo.delete(id);
  }
}

module.exports = new BookService();
