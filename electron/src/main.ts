import { app, BrowserWindow } from 'electron';
import { spawn } from 'child_process'
import { trackSubprocess } from './log'
import path from 'path';

const TEST_PATH = '/home/brad/dev/tracker/test/PI'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 350,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../../src/preload.ts')
    }
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL)
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  else
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))

  // const executable = spawn(path.join(__dirname, '../../../test/PI'))
  const executable = spawn(TEST_PATH)
  const tracker = trackSubprocess(executable)

  setInterval(() => {
    win.webContents.send('track', tracker.asList())
  }, 50)
})