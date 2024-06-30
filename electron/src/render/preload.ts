const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('ipc', {
    onTrack: cb =>
        ipcRenderer.on('track', (event, message) => cb(message)),
    teardownTrack: () =>
        ipcRenderer.removeAllListeners('track')
})