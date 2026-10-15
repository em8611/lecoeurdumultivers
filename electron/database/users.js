const db = require('./db');

function createTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function addUser(username, email, password) {
  const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
  stmt.run(username, email, password);
}

function getUsers() {
  return db.prepare('SELECT id, username, email, created_at FROM users ORDER BY id').all();
}

module.exports = { createTable, addUser, getUsers };
