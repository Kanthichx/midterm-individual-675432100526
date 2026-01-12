const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  path.join(__dirname, '../../../library.db')
);

db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    isbn TEXT UNIQUE,
    status TEXT DEFAULT 'available'
  )
`);

module.exports = db;
