## 如何设置electron图标

在 Electron 应用中，你可以通过修改应用的图标来替换默认的 Electron 图标。你需要为不同的操作系统设置不同的图标格式（如 `.ico`、`.icns` 和 `.png`），并在 Electron 的主进程中配置这些图标。

下面是详细的步骤，介绍如何修改 Electron 应用的图标：

### 1. 准备图标文件

你需要准备好不同平台的图标文件：

- **Windows**：`.ico` 格式，建议大小为 256x256 像素。
- **macOS**：`.icns` 格式，建议大小为 512x512 像素。
- **Linux**：可以使用 `.png` 格式，建议大小为 512x512 像素。

你可以使用图标生成工具，如 [RealFaviconGenerator](https://realfavicongenerator.net/) 或 [IconvertIcons](https://iconverticons.com/) 来将图标转换为不同格式。

将这些图标文件放到项目的 `assets` 或 `static` 文件夹下，例如：

```
my-electron-app/
├── src/
├── assets/
│   ├── icon.ico       # Windows 图标
│   ├── icon.icns      # macOS 图标
│   └── icon.png       # Linux 图标
├── main.ts            # 主进程入口文件
└── ...
```

### 2. 在主进程中设置图标

在 Electron 主进程的 `main.ts` 或 `main.js` 文件中设置图标，通常在 `BrowserWindow` 的配置中指定图标路径。

#### 示例代码 (`main.ts`)

```typescript
import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../assets/icon.png'),  // 设置图标
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

#### 解释：
- **`icon: path.join(__dirname, '../assets/icon.png')`**：设置窗口图标，`__dirname` 表示当前文件所在的目录。根据操作系统不同，图标格式也不同：
  - **Windows**：使用 `.ico` 文件，如 `path.join(__dirname, '../assets/icon.ico')`。
  - **macOS**：使用 `.icns` 文件，如 `path.join(__dirname, '../assets/icon.icns')`。
  - **Linux**：使用 `.png` 文件，如 `path.join(__dirname, '../assets/icon.png')`。

Electron 会自动根据操作系统选择合适的图标格式。

### 3. 修改打包时的图标

在你打包应用程序时（使用 Electron Forge、Electron Builder 等），需要在配置中指定打包时的图标。

#### 使用 Electron Forge 打包时设置图标

在 `forge.config.js` 中，配置打包时的图标路径：

```javascript
module.exports = {
  packagerConfig: {
    icon: './assets/icon',  // 不需要扩展名，Electron 会根据平台自动选择 .ico, .icns 或 .png
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: 'https://your-domain.com/path-to-icon.ico',  // Windows 安装器图标
        setupIcon: './assets/icon.ico',                       // Windows 安装程序图标
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './assets/icon.icns',                           // macOS 安装包图标
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        icon: './assets/icon.png',                            // Linux 安装包图标
      },
    },
  ],
};
```

#### 使用 Electron Builder 打包时设置图标

如果你使用的是 [Electron Builder](https://www.electron.build/)，可以在 `package.json` 或 `electron-builder.json` 中配置图标路径。

**`package.json` 配置：**

```json
{
  "build": {
    "appId": "com.yourapp.id",
    "productName": "YourAppName",
    "directories": {
      "buildResources": "assets"
    },
    "win": {
      "icon": "assets/icon.ico"    // Windows 图标
    },
    "mac": {
      "icon": "assets/icon.icns"   // macOS 图标
    },
    "linux": {
      "icon": "assets/icon.png"    // Linux 图标
    }
  }
}
```

### 4. 运行应用查看效果

在完成图标配置后，你可以运行开发环境来查看是否生效：

```bash
npm start
```

如果图标配置正确，你将看到窗口左上角（macOS）、任务栏（Windows 和 Linux）的应用图标已经更新。

### 总结

1. **准备图标**：为不同操作系统准备相应格式的图标文件（`.ico`、`.icns`、`.png`）。
2. **在主进程中设置图标**：通过 `BrowserWindow` 的 `icon` 属性为不同平台指定图标。
3. **打包时设置图标**：确保在打包工具（如 Electron Forge 或 Electron Builder）中配置图标路径，以便生成的可执行文件和安装包有正确的图标。
4. **运行并打包**：确认图标配置生效，打包应用后图标也将生效。

这样你就可以顺利地为不同平台设置自定义的 Electron 应用图标。