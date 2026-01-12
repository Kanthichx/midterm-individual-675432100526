const bookService = require('../../business/services/bookService');

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const result = await bookService.getAllBooks(req.query.status);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getBookById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  }

  async createBook(req, res, next) {
    try {
      const book = await bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (e) {
      next(e);
    }
  }

  async updateBook(req, res, next) {
    try {
      const book = await bookService.updateBook(req.params.id, req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  }

  async borrowBook(req, res, next) {
    try {
      const book = await bookService.borrowBook(req.params.id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  }

  async returnBook(req, res, next) {
    try {
      const book = await bookService.returnBook(req.params.id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const result = await bookService.deleteBook(req.params.id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BookController();
