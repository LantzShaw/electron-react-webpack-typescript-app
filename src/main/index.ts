import { BrowserWindow, app, ipcMain } from "electron"

import { setupStoreHandler } from "./ipcHandlers"
import { createMainWindow } from "./mainWindow"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit()
}

const createWindow = (): void => {
  const mainWindow: BrowserWindow = createMainWindow()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  setupStoreHandler(ipcMain)

  mainWindow.webContents.openDevTools()
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
