const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
    on: ipcRenderer.on,
})

console.log('preload.ts loaded')