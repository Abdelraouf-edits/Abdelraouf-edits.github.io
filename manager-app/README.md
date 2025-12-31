# Video Manager Desktop Application

A modern, lightweight Windows desktop application for managing your portfolio video server with automatic GitHub synchronization.

![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?logo=windows)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**Video Manager** is a desktop GUI application built to streamline the workflow of managing a video portfolio website. It provides a one-click interface to:

- Start/stop the local Node.js development server
- Open the video management dashboard in your browser
- Automatically check for and apply updates from GitHub
- Monitor server health status

The application features a **Deep Space** dark theme that matches the portfolio website's aesthetic, creating a cohesive visual experience.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖥️ **Server Control** | Start and stop the Node.js video server with one click |
| 🌐 **Quick Access** | Instantly open the video management UI in your default browser |
| 💓 **Health Monitoring** | Check if the server is responding correctly |
| 📥 **GitHub Sync** | Pull latest updates from the repository manually |
| 🔄 **Auto-Update Check** | Automatically detects available updates on startup |
| 🎨 **Dark Theme** | Deep Space aesthetic matching the website design |

---

## 🚀 Quick Start

### Option 1: Run the Executable (Recommended)

Simply double-click **`VideoManager.exe`** — no installation required!

### Option 2: Run with Python

```bash
python video_manager.py
```

### Option 3: Use the Launcher Script

```bash
start-manager.cmd
```

---

## 📋 Requirements

### For Running the EXE
- **Windows 10/11** (64-bit)
- **Node.js 18+** (for the video server)
- **Git for Windows** (for update functionality)

### For Development/Building
- **Python 3.10+**
- **PyInstaller** (`pip install pyinstaller`)

---

## 🎨 User Interface

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │                                             │   │
│   │   Video Manager                             │   │
│   │   Launch, monitor, and update your          │   │
│   │   dashboard.                                │   │
│   │                                             │   │
│   │   ┌─────────────┐  ┌─────────────┐         │   │
│   │   │ ▶ Start     │  │ ■ Stop      │         │   │
│   │   │   Server    │  │   Server    │         │   │
│   │   └─────────────┘  └─────────────┘         │   │
│   │                                             │   │
│   │   ┌─────────────────────────────┐          │   │
│   │   │ 🌐 Open Manager UI          │          │   │
│   │   └─────────────────────────────┘          │   │
│   │                                             │   │
│   │   ┌─────────────────────────────┐          │   │
│   │   │ 💓 Check Server Health      │          │   │
│   │   └─────────────────────────────┘          │   │
│   │                                             │   │
│   │   ┌─────────────────────────────┐          │   │
│   │   │ 📥 Update from GitHub       │          │   │
│   │   └─────────────────────────────┘          │   │
│   │                                             │   │
│   │   Ready                                     │   │
│   │   ● Updates: Up to date              v2.0.0│   │
│   │                                             │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔨 Building the Executable

### Quick Build

```powershell
# Navigate to manager-app directory
cd manager-app

# Run the build script
.\build-exe.ps1
```

### Manual Build

```powershell
# Install PyInstaller
pip install pyinstaller

# Build the EXE
pyinstaller --onefile --windowed --name VideoManager --icon "..\pr\public\icons\favicon.ico" video_manager.py

# Copy to manager-app folder
copy dist\VideoManager.exe .
```

---

## 📁 Project Structure

```
manager-app/
├── VideoManager.exe     # Standalone Windows executable
├── video_manager.py     # Main Python application source
├── build-exe.ps1        # Build script for creating EXE
├── start-manager.cmd    # Quick launcher script
├── requirements.txt     # Python dependencies
├── README.md            # This documentation
└── PROMPT.md            # AI prompt for replicating project
```

---

## 🔧 How It Works

### Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  VideoManager    │────▶│   Node.js        │────▶│   Browser        │
│  (Python/Tk)     │     │   Server         │     │   (Dashboard)    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        │                                                   
        ▼                                                   
┌──────────────────┐                                        
│   Git (GitHub)   │                                        
│   Updates        │                                        
└──────────────────┘                                        
```

### Key Components

1. **GUI Layer** (`tkinter`)
   - Native Windows look with custom dark theme
   - Event-driven button handlers
   - Status indicators and feedback

2. **Server Management** (`subprocess`)
   - Spawns Node.js process for video server
   - Process lifecycle management (start/stop/kill)
   - Health check via HTTP request

3. **Git Integration** (`subprocess` + `git`)
   - Fetches updates from remote repository
   - Compares local vs remote commits
   - Pulls changes and updates dependencies

4. **Auto-Update System**
   - Background thread checks on startup
   - Prompts user when updates available
   - Automatically runs `npm install` after pull

---

## 🎨 Theme & Colors

The application uses a **Deep Space** dark theme matching the portfolio website:

| Element | Color | Hex |
|---------|-------|-----|
| Background | Dark Navy | `#030b1d` |
| Card/Panel | Navy | `#0a1628` |
| Primary Text | White | `#f8fafc` |
| Muted Text | Gray | `#94a3b8` |
| Borders | Secondary | `#1e293b` |
| Success | Green | `#22c55e` |
| Error | Red | `#ef4444` |
| Info | Cyan | `#38bdf8` |

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Language** | Python 3.10+ | Core application logic |
| **GUI Framework** | tkinter | Native Windows GUI (built-in) |
| **Packaging** | PyInstaller | Creates standalone EXE |
| **Server** | Node.js | Video management backend |
| **Version Control** | Git | Update synchronization |
| **Target Platform** | Windows 10/11 | Desktop OS |

### Why Python + tkinter?

| Advantage | Description |
|-----------|-------------|
| ✅ **Built-in** | tkinter comes with Python, no extra dependencies |
| ✅ **Small EXE** | ~11 MB compiled (vs 50+ MB for PowerShell) |
| ✅ **Fast Startup** | ~1 second launch time |
| ✅ **Simple Code** | Clean, readable, maintainable |
| ✅ **Cross-platform** | Can be adapted for macOS/Linux |

### Previous Stack (Deprecated)

The original implementation used PowerShell with Windows Forms:
- Larger EXE size (~50-70 MB)
- Slower startup (3-5 seconds)
- Complex .NET interop code
- Windows-only

---

## 🐛 Troubleshooting

### "Node.js is not installed"
1. Download Node.js 18+ from [nodejs.org](https://nodejs.org)
2. Ensure "Add to PATH" is selected during installation
3. Restart the Video Manager application

### "Git is not installed"
1. Download Git from [git-scm.com](https://git-scm.com)
2. Select "Git from the command line" during installation
3. Restart the Video Manager application

### Server Won't Start
1. Check if port 3000 is already in use:
   ```powershell
   netstat -ano | findstr :3000
   ```
2. Kill the process using port 3000
3. Try starting the server again

### EXE Won't Run
1. Ensure Windows Defender isn't blocking it
2. Right-click → Properties → Unblock (if needed)
3. Run as Administrator if permission issues occur

---

## 📜 License

MIT License — feel free to modify and distribute!

---

## 🙏 Credits

- **Design Theme**: Deep Space aesthetic from portfolio website
- **Icons**: Favicon from portfolio project
- **Built with**: Python, tkinter, PyInstaller
