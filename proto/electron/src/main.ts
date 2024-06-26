import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 350,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../../src/tsx/preload.ts')
    }
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL)
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

  setInterval(() => {
    win.webContents.send('test', 'from main')
    console.log('from main')
  }, 1000)
})

// import { spawn } from 'child_process'
// import { trackSubprocess } from './log'
// const executable = spawn('~/dev/tracker/proto/test/test')
// const tracker = trackSubprocess(executable)

ipcMain.handle('test', (event, message: string) => {
  console.log(message + ' (logged from main)')
})