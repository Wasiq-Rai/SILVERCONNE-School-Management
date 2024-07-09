import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

let loadingScreen;
let mainWindow;

function createLoadingScreen() {
  loadingScreen = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  loadingScreen.loadURL('file://' + __dirname + '/loading-screen.html');
  loadingScreen.on('closed', () => (loadingScreen = null));
}

async function createMainWindow() {
  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    if (loadingScreen) {
      setTimeout(function () {
        loadingScreen.close();
        mainWindow.show();
      }, 5000);
    }
  });

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', async () => {
  createLoadingScreen();
  await createMainWindow();
});

app.on('window-all-closed', () => {
  app.quit()
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
});
