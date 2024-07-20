import { app, BrowserWindow, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}



let mainWindow

(async () => {
  await app.whenReady()

  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})


let schools = [
  { id: 1, name: 'Springfield Elementary', type: 'public', students: 500, staff: 50, performance: 75 },
  { id: 2, name: 'Shelbyville High', type: 'public', students: 1000, staff: 100, performance: 80 },
  { id: 3, name: 'Capital City Prep', type: 'private', students: 300, staff: 40, performance: 90 }
];

ipcMain.handle('fetch-schools', async (event) => {
  console.log('Main process: Received fetch-schools request');
  return schools;
});

ipcMain.handle('add-school', async (event, schoolData) => {
  console.log('Main process: Received add-school request');
  const newSchool = {
    id: schools.length + 1,
    ...schoolData
  };
  schools.push(newSchool);
  return newSchool;
});

ipcMain.handle('update-school', async (event, updatedSchool) => {
  console.log('Main process: Received update-school request');
  const index = schools.findIndex(school => school.id === updatedSchool.id);
  if (index !== -1) {
    schools[index] = updatedSchool;
    return updatedSchool;
  }
  throw new Error('School not found');
});

ipcMain.handle('delete-school', async (event, id) => {
  console.log('Main process: Received delete-school request');
  const index = schools.findIndex(school => school.id === id);
  if (index !== -1) {
    schools.splice(index, 1);
    return id;
  }
  throw new Error('School not found');
});