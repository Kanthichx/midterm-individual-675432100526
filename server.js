const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===== Mock Database =====
let books = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    status: 'available'
  }
];

// ===== Helpers =====
const getStats = () => ({
  total: books.length,
  available: books.filter(b => b.status === 'available').length,
  borrowed: books.filter(b => b.status === 'borrowed').length
});

// ===== APIs =====

// GET /api/books
app.get('/api/books', (req, res) => {
  const { status } = req.query;
  const filtered = status
    ? books.filter(b => b.status === status)
    : books;

  res.json({
    books: filtered,
    statistics: getStats()
  });
});

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
});

// POST /api/books
app.post('/api/books', (req, res) => {
  const { title, author, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    isbn,
    status: 'available'
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /api/books/:id
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const { title, author, isbn } = req.body;
  book.title = title;
  book.author = author;
  book.isbn = isbn;

  res.json(book);
});

// PATCH /api/books/:id/borrow
app.patch('/api/books/:id/borrow', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  if (book.status === 'borrowed') {
    return res.status(409).json({ error: 'Book already borrowed' });
  }

  book.status = 'borrowed';
  res.json(book);
});

// PATCH /api/books/:id/return
app.patch('/api/books/:id/return', (req, res) => {
  const book = books.find(b => b.id === Number(req.params.id));
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  book.status = 'available';
  res.json(book);
});

// DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
