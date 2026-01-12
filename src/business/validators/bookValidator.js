class BookValidator {
  validateId(id) {
    const num = parseInt(id);
    if (isNaN(num)) throw new Error('Invalid book ID');
    return num;
  }

  validateBook(data) {
    const { title, author, isbn } = data;
    if (!title || !author || !isbn) {
      throw new Error('Title, author, and ISBN are required');
    }

    const pattern = /^(97[89])?\d{9}[\dXx]$/;
    if (!pattern.test(isbn.replace(/-/g, ''))) {
      throw new Error('Invalid ISBN format');
    }
  }
}

module.exports = new BookValidator();
