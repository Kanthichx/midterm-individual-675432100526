const db = require('../database/connection');

class BookRepository {
  findAll(status) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM books';
      let params = [];
      if (status) {
        sql += ' WHERE status = ?';
        params.push(status);
      }
      db.all(sql, params, (e, r) => e ? reject(e) : resolve(r));
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM books WHERE id = ?', [id], (e, r) =>
        e ? reject(e) : resolve(r)
      );
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      const { title, author, isbn } = data;
      db.run(
        'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
        [title, author, isbn],
        function (e) {
          if (e) reject(e);
          else db.get(
            'SELECT * FROM books WHERE id = ?',
            [this.lastID],
            (e2, r) => e2 ? reject(e2) : resolve(r)
          );
        }
      );
    });
  }

  update(id, data) {
    const { title, author, isbn } = data;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE books SET title=?, author=?, isbn=? WHERE id=?',
        [title, author, isbn, id],
        function (e) {
          if (e) reject(e);
          else resolve({ id, title, author, isbn });
        }
      );
    });
  }

  updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE books SET status=? WHERE id=?',
        [status, id],
        function (e) {
          if (e) reject(e);
          else resolve({ id, status });
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM books WHERE id=?',
        [id],
        e => e ? reject(e) : resolve({ message: 'Book deleted' })
      );
    });
  }
}

module.exports = new BookRepository();
