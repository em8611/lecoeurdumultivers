const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');
const fs = require('fs');

const userDataDir = app.getPath('userData');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const dbPath = path.join(userDataDir, 'lecoeurdumultivers.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

module.exports = db;
