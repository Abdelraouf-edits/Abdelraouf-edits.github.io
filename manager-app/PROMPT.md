# AI Prompt: Recreate Video Manager Desktop Application

Use this prompt to recreate the Video Manager application from scratch with an AI assistant.

---

## 🎯 Project Goal

Create a Windows desktop application that manages a local Node.js video server and syncs with GitHub.

---

## 📋 Full Prompt

```
Create a Python desktop application for Windows with the following specifications:

## Purpose
Build a GUI application called "Video Manager" that:
1. Starts/stops a Node.js server (video-manager-server.js) located in a ../pr folder
2. Opens a browser to http://localhost:3000/manage-videos.html
3. Checks for GitHub updates and pulls them automatically
4. Shows server health status

## Technical Requirements

### Stack
- Python 3.10+ with tkinter for GUI
- subprocess for running Node.js and Git commands
- threading for background update checks
- PyInstaller for creating standalone EXE

### GUI Design
- Window size: 540x450 pixels, non-resizable
- Dark theme with these colors:
  - Background: #030b1d (dark navy)
  - Card/Panel: #0a1628 (lighter navy)
  - Primary text: #f8fafc (white)
  - Muted text: #94a3b8 (gray)
  - Borders: #1e293b (secondary)
  - Success button: #22c55e (green)
  - Stop button: #7f1d1d (dark red)
  - Other buttons: #1e293b (navy)

### Layout
1. Title: "Video Manager" (20pt, Segoe UI Semibold)
2. Subtitle: "Launch, monitor, and update your dashboard." (10pt, muted)
3. Buttons (stacked):
   - Row 1: "▶ Start Server" (green) | "■ Stop Server" (red)
   - Row 2: "🌐 Open Manager UI" (full width)
   - Row 3: "💓 Check Server Health" (full width)
   - Row 4: "📥 Update from GitHub" (full width)
4. Status label showing current state
5. Update indicator panel with colored circle

### Features
1. **Start Server**: 
   - Check for node/npm/git availability
   - Run `npm install` if node_modules missing
   - Start Node.js server as subprocess
   - Open browser after 2 seconds

2. **Stop Server**:
   - Terminate the server subprocess
   - Handle already-stopped state gracefully

3. **Open Manager UI**:
   - Open http://localhost:3000/manage-videos.html in default browser

4. **Check Health**:
   - HTTP GET to http://localhost:3000/health
   - Show success/failure message box

5. **Update from GitHub**:
   - Run `git fetch --all --prune`
   - Run `git pull`
   - Show result in message box

6. **Auto-Update Check** (on startup):
   - Background thread runs git fetch
   - Compare HEAD with origin using `git rev-list --left-right --count`
   - If behind, prompt user to update
   - If user agrees, pull and run npm install

### Repository Detection
- Start from script/exe location
- Walk up directories looking for .git folder
- Set repo_root and pr_path (repo_root/pr)

### Button Hover Effects
- Lighten color by 15% on mouse enter
- Restore original color on mouse leave

### Window Close
- Stop server if running
- Destroy window

## File Structure
manager-app/
├── video_manager.py      # Main application
├── VideoManager.exe      # Compiled executable  
├── build-exe.ps1         # Build script
├── start-manager.cmd     # Launcher
├── requirements.txt      # Dependencies
└── README.md             # Documentation

## Build Command
pyinstaller --onefile --windowed --name VideoManager --icon "../pr/public/icons/favicon.ico" video_manager.py
```

---

## 🎨 Color Theme Reference

```python
class Colors:
    # Base colors (Deep Space theme)
    BACKGROUND = "#030b1d"      # Main dark navy background
    FOREGROUND = "#e1e7ef"      # Primary text color
    CARD_BG = "#0a1628"         # Slightly lighter for cards/panels
    SECONDARY = "#1e293b"       # Secondary backgrounds, borders
    
    # Text colors
    MUTED = "#94a3b8"           # Subtitles, captions
    PRIMARY_TEXT = "#f8fafc"    # Bright white text
    DARK_TEXT = "#0f172a"       # Text on light buttons
    
    # Accent colors
    PRIMARY = "#f8fafc"         # Main highlights
    ACCENT = "#1e293b"          # Hover states
    RING = "#cbd5e1"            # Focus states
    
    # Status colors
    SUCCESS = "#22c55e"         # Green
    WARNING = "#f59e0b"         # Amber
    ERROR = "#ef4444"           # Red
    INFO = "#38bdf8"            # Cyan
    
    # Button colors
    BUTTON_PRIMARY = "#1e293b"
    BUTTON_STOP = "#7f1d1d"
    BUTTON_OPEN = "#0c4a6e"
    BUTTON_HOVER = "#334155"
```

---

## 📦 Dependencies

```txt
# requirements.txt
pyinstaller>=6.0.0
```

Note: tkinter, subprocess, threading, webbrowser are all part of Python's standard library.

---

## 🔨 Build Script (PowerShell)

```powershell
# build-exe.ps1
Write-Host "Building Video Manager EXE..." -ForegroundColor Cyan

# Check Python
python --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python not found" -ForegroundColor Red
    exit 1
}

# Install PyInstaller if needed
pip show pyinstaller
if ($LASTEXITCODE -ne 0) {
    pip install pyinstaller
}

# Build
pyinstaller --onefile --windowed --name VideoManager --clean --noconfirm --icon "..\pr\public\icons\favicon.ico" video_manager.py

# Copy result
Copy-Item "dist\VideoManager.exe" "VideoManager.exe" -Force

Write-Host "Build complete!" -ForegroundColor Green
```

---

## 🚀 Quick Launcher (CMD)

```batch
@echo off
REM start-manager.cmd
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    python "%~dp0video_manager.py"
) else (
    echo Python not found!
    pause
)
```

---

## 📐 Key Code Patterns

### 1. Find Repository Root
```python
def find_repo_root(self):
    if getattr(sys, 'frozen', False):
        start_path = Path(sys.executable).parent
    else:
        start_path = Path(__file__).parent
    
    current = start_path
    while current != current.parent:
        if (current / '.git').exists():
            self.repo_root = current
            self.pr_path = current / 'pr'
            return
        current = current.parent
```

### 2. Run Git Command
```python
def run_git_command(self, args):
    result = subprocess.run(
        ['git'] + args,
        cwd=str(self.repo_root),
        capture_output=True,
        text=True,
        shell=True
    )
    return result
```

### 3. Start Server (Hidden Window)
```python
startupinfo = subprocess.STARTUPINFO()
startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
startupinfo.wShowWindow = subprocess.SW_HIDE

self.server_process = subprocess.Popen(
    ['node', 'video-manager-server.js'],
    cwd=str(self.pr_path),
    startupinfo=startupinfo,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    creationflags=subprocess.CREATE_NO_WINDOW
)
```

### 4. Background Update Check
```python
def check_updates_async(self):
    def check():
        # Git operations here
        # Use self.root.after(0, callback) to update UI from thread
        pass
    
    thread = threading.Thread(target=check, daemon=True)
    thread.start()
```

### 5. Button with Hover Effect
```python
def create_button(self, parent, text, color, command):
    btn = tk.Button(
        parent, text=text, bg=color, fg="#f8fafc",
        font=("Segoe UI Semibold", 10), bd=0,
        padx=20, pady=12, cursor="hand2", command=command
    )
    
    def on_enter(e):
        btn.configure(bg=self.lighten_color(color))
    def on_leave(e):
        btn.configure(bg=color)
    
    btn.bind("<Enter>", on_enter)
    btn.bind("<Leave>", on_leave)
    return btn
```

---

## ✅ Checklist for Recreation

- [ ] Create Python file with tkinter GUI
- [ ] Implement dark theme colors
- [ ] Add Start/Stop server functionality
- [ ] Add Open browser functionality
- [ ] Add Health check functionality
- [ ] Add Manual GitHub update
- [ ] Add Auto-update check on startup
- [ ] Add status labels and indicators
- [ ] Add hover effects on buttons
- [ ] Test all features
- [ ] Build EXE with PyInstaller
- [ ] Test standalone EXE

---

## 🔗 Related Files

This application manages:
- `../pr/video-manager-server.js` - Node.js backend server
- `../pr/manage-videos.html` - Video management dashboard
- `../.git` - Git repository for updates
