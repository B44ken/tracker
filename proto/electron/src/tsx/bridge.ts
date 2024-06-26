import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: {
        send: ipcRenderer.send,
        on: ipcRenderer.on,
        once: ipcRenderer.once,
        removeListener: ipcRenderer.removeListener,
        removeAllListeners: ipcRenderer.removeAllListeners,
    },
})

console.log("Bridge loaded")