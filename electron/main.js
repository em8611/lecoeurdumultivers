const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

const { createTable: createUsersTable, addUser, getUsers } = require('./database/users');

createUsersTable();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    const serverUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
    win.loadURL(serverUrl);
  } else {
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('add-user', async (event, username, email, password) => {
  try {
    addUser(username, email, password);
    return getUsers();
  } catch (error) {
    throw new Error('Utilisateur déjà existant');
  }
});

ipcMain.handle('get-users', async () => {
  return getUsers();
});
