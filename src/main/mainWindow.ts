import { BrowserWindow } from "electron";

export const createMainWindow = (): BrowserWindow => {
  return new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
};
