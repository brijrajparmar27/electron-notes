import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const apis = {
  getNotes: () => ipcRenderer.invoke('notes:getAll'),
  createNote: () => ipcRenderer.invoke('notes:create'),
  getNoteContent: (name: string) => ipcRenderer.invoke('notes:get', { name }),
  setNoteContent: (name: string, content: string) =>
    ipcRenderer.invoke('notes:set', { name, content })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', apis)
  } catch (error) {
    console.error(error)
  }
} else {
  console.error('Context Isolation must be enabled in BrowserWindow')
}
