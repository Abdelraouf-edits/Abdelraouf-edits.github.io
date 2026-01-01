# Quick Start Guide

## ✅ Working Solutions

You have **3 ways** to use the Video Manager:

### 1. **Python Desktop App (Recommended - Ready Now)**
```powershell
cd manager-app
.\VideoManager.exe
```
- ✅ Works immediately
- ✅ Dark theme matching website
- ✅ Starts server & opens browser automatically

### 2. **PowerShell Launcher (Simplest)**
```powershell
cd manager-app
.\start-manager.ps1
```
- Starts Node.js server
- Opens browser to http://localhost:3000
- Press Ctrl+C to stop

### 3. **Manual (Most Control)**
```powershell
cd pr
node video-manager-server.js
```
Then open: http://localhost:3000

---

## 🔧 Flutter Version (Requires Setup)

The Flutter version needs Flutter SDK installed first.

### Install Flutter:
1. Download: https://docs.flutter.dev/get-started/install/windows
2. Extract to `C:\src\flutter`
3. Add to PATH: `C:\src\flutter\bin`
4. Run: `flutter doctor`

### Then build:
```powershell
cd manager-app\flutter_video_manager
flutter pub get
flutter run -d windows
```

---

## 📝 Summary

| Solution | Status | Best For |
|----------|--------|----------|
| VideoManager.exe | ✅ Ready | Quick use, no setup |
| start-manager.ps1 | ✅ Ready | Browser lovers |
| Flutter app | ⚙️ Needs Flutter | Mobile + Desktop |

**Recommended:** Use `VideoManager.exe` - it works right now!
