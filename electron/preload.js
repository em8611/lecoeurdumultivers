const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  addUser: (username, email, password) => ipcRenderer.invoke('add-user', username, email, password),
  getUsers: () => ipcRenderer.invoke('get-users')
});
