"""
Video Manager Desktop Application
A modern Python-based GUI for managing the video server and GitHub updates.
"""

import os
import sys
import subprocess
import threading
import webbrowser
import tkinter as tk
from tkinter import ttk, messagebox
from pathlib import Path
import shutil
import json
import time

# Constants
SERVER_URL = "http://localhost:3000/manage-videos.html"
HEALTH_URL = "http://localhost:3000/health"
APP_TITLE = "Video Manager Control Center"
APP_VERSION = "2.0.0"


class Colors:
    """Application color scheme matching the Deep Space website theme."""
    # Base colors
    BACKGROUND = "#030b1d"      # Main dark navy background
    FOREGROUND = "#e1e7ef"      # Primary text color
    CARD_BG = "#0a1628"         # Slightly lighter for cards/panels
    SECONDARY = "#1e293b"       # Secondary backgrounds, borders
    
    # Text colors
    MUTED = "#94a3b8"           # Subtitles, captions
    PRIMARY_TEXT = "#f8fafc"    # Bright white text
    DARK_TEXT = "#0f172a"       # Text on light buttons
    
    # Accent colors
    PRIMARY = "#f8fafc"         # Main highlights, glows
    ACCENT = "#1e293b"          # Hover states
    RING = "#cbd5e1"            # Focus states
    
    # Status colors
    SUCCESS = "#22c55e"         # Green for success
    WARNING = "#f59e0b"         # Amber for warnings
    ERROR = "#ef4444"           # Red for errors
    INFO = "#38bdf8"            # Cyan/sky blue for info
    
    # Button colors (with glow effect feel)
    BUTTON_PRIMARY = "#1e293b"  # Primary button bg
    BUTTON_STOP = "#7f1d1d"     # Dark red for stop
    BUTTON_OPEN = "#0c4a6e"     # Dark blue for open
    BUTTON_HOVER = "#334155"    # Hover state


class VideoManagerApp:
    def __init__(self, root):
        self.root = root
        self.server_process = None
        self.update_status = "checking"
        self.update_message = "Checking for updates..."
        
        # Find repository root
        self.find_repo_root()
        
        # Setup UI
        self.setup_window()
        self.create_widgets()
        
        # Start update check in background
        self.check_updates_async()
    
    def find_repo_root(self):
        """Find the git repository root directory."""
        # Start from the script's directory or executable location
        if getattr(sys, 'frozen', False):
            # Running as compiled EXE
            start_path = Path(sys.executable).parent
        else:
            # Running as script
            start_path = Path(__file__).parent
        
        # Search for .git folder
        current = start_path
        while current != current.parent:
            if (current / '.git').exists():
                self.repo_root = current
                self.pr_path = current / 'pr'
                return
            current = current.parent
        
        # Try parent of start_path
        parent = start_path.parent
        if (parent / '.git').exists():
            self.repo_root = parent
            self.pr_path = parent / 'pr'
            return
        
        # Fallback to parent of start_path
        self.repo_root = start_path.parent
        self.pr_path = self.repo_root / 'pr'
    
    def setup_window(self):
        """Configure the main window."""
        self.root.title(APP_TITLE)
        self.root.geometry("540x450")
        self.root.resizable(False, False)
        self.root.configure(bg=Colors.BACKGROUND)
        
        # Center window on screen
        self.root.update_idletasks()
        x = (self.root.winfo_screenwidth() - 540) // 2
        y = (self.root.winfo_screenheight() - 450) // 2
        self.root.geometry(f"540x450+{x}+{y}")
        
        # Try to set icon
        icon_path = self.pr_path / 'public' / 'icons' / 'favicon.ico'
        if icon_path.exists():
            try:
                self.root.iconbitmap(str(icon_path))
            except:
                pass
        
        # Handle window close
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
    
    def create_widgets(self):
        """Create all UI widgets."""
        # Create gradient background using canvas
        self.canvas = tk.Canvas(self.root, highlightthickness=0)
        self.canvas.pack(fill="both", expand=True)
        
        # Draw gradient (Deep Space dark background)
        self.canvas.configure(bg=Colors.BACKGROUND)
        
        # Main container panel
        container = tk.Frame(
            self.canvas, 
            bg=Colors.CARD_BG,
            width=460,
            height=380,
            highlightbackground=Colors.SECONDARY,
            highlightthickness=1
        )
        container.place(relx=0.5, rely=0.5, anchor="center")
        container.pack_propagate(False)
        
        # Header section with logo and title
        header_frame = tk.Frame(container, bg=Colors.CARD_BG)
        header_frame.pack(fill="x", padx=24, pady=(20, 0))
        
        # Title
        title_label = tk.Label(
            header_frame,
            text="Video Manager",
            font=("Segoe UI Semibold", 20),
            fg=Colors.PRIMARY_TEXT,
            bg=Colors.CARD_BG
        )
        title_label.pack(anchor="w")
        
        # Subtitle
        subtitle_label = tk.Label(
            header_frame,
            text="Launch, monitor, and update your dashboard.",
            font=("Segoe UI", 10),
            fg=Colors.MUTED,
            bg=Colors.CARD_BG
        )
        subtitle_label.pack(anchor="w")
        
        # Buttons frame
        buttons_frame = tk.Frame(container, bg=Colors.CARD_BG)
        buttons_frame.pack(fill="x", padx=24, pady=(20, 10))
        
        # Row 1: Start and Stop buttons
        row1 = tk.Frame(buttons_frame, bg=Colors.CARD_BG)
        row1.pack(fill="x", pady=4)
        
        self.start_btn = self.create_button(
            row1, "▶ Start Server", Colors.SUCCESS, self.start_server
        )
        self.start_btn.pack(side="left", expand=True, fill="x", padx=(0, 4))
        
        self.stop_btn = self.create_button(
            row1, "■ Stop Server", Colors.BUTTON_STOP, self.stop_server
        )
        self.stop_btn.pack(side="left", expand=True, fill="x", padx=(4, 0))
        
        # Row 2: Open Manager UI
        self.open_btn = self.create_button(
            buttons_frame, "🌐 Open Manager UI", Colors.BUTTON_OPEN, self.open_browser
        )
        self.open_btn.pack(fill="x", pady=4)
        
        # Row 3: Check Health
        self.health_btn = self.create_button(
            buttons_frame, "💓 Check Server Health", Colors.BUTTON_PRIMARY, self.check_health
        )
        self.health_btn.pack(fill="x", pady=4)
        
        # Row 4: Update from GitHub
        self.update_btn = self.create_button(
            buttons_frame, "📥 Update from GitHub", Colors.BUTTON_PRIMARY, self.update_from_github
        )
        self.update_btn.pack(fill="x", pady=4)
        
        # Status label
        self.status_var = tk.StringVar(value="Ready")
        self.status_label = tk.Label(
            container,
            textvariable=self.status_var,
            font=("Segoe UI", 9),
            fg=Colors.FOREGROUND,
            bg=Colors.CARD_BG
        )
        self.status_label.pack(fill="x", padx=24, pady=(10, 5))
        
        # Update status panel
        update_panel = tk.Frame(container, bg=Colors.SECONDARY, height=40)
        update_panel.pack(fill="x", padx=24, pady=(5, 20))
        update_panel.pack_propagate(False)
        
        # Update indicator circle
        self.indicator_canvas = tk.Canvas(
            update_panel, 
            width=14, 
            height=14, 
            bg=Colors.SECONDARY,
            highlightthickness=0
        )
        self.indicator_canvas.pack(side="left", padx=(10, 5), pady=13)
        self.draw_indicator(Colors.MUTED)
        
        # Update status text
        self.update_status_var = tk.StringVar(value="Updates: Checking...")
        self.update_label = tk.Label(
            update_panel,
            textvariable=self.update_status_var,
            font=("Segoe UI", 9),
            fg=Colors.MUTED,
            bg=Colors.SECONDARY
        )
        self.update_label.pack(side="left", fill="x", expand=True)
        
        # Version label
        version_label = tk.Label(
            container,
            text=f"v{APP_VERSION}",
            font=("Segoe UI", 8),
            fg=Colors.MUTED,
            bg=Colors.CARD_BG
        )
        version_label.pack(anchor="se", padx=10, pady=(0, 5))
    
    def create_button(self, parent, text, color, command):
        """Create a styled button with border glow effect."""
        btn = tk.Button(
            parent,
            text=text,
            font=("Segoe UI Semibold", 10),
            fg=Colors.PRIMARY_TEXT,
            bg=color,
            activebackground=Colors.BUTTON_HOVER,
            activeforeground=Colors.PRIMARY_TEXT,
            bd=0,
            padx=20,
            pady=12,
            cursor="hand2",
            command=command,
            highlightbackground=Colors.RING,
            highlightthickness=1
        )
        
        # Hover effect
        def on_enter(e):
            btn.configure(bg=self.lighten_color(color))
        
        def on_leave(e):
            btn.configure(bg=color)
        
        btn.bind("<Enter>", on_enter)
        btn.bind("<Leave>", on_leave)
        
        return btn
    
    def lighten_color(self, hex_color):
        """Lighten a hex color by 15%."""
        hex_color = hex_color.lstrip('#')
        r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        r = min(255, int(r * 1.15))
        g = min(255, int(g * 1.15))
        b = min(255, int(b * 1.15))
        return f"#{r:02x}{g:02x}{b:02x}"
    
    def darken_color(self, hex_color):
        """Darken a hex color by 10%."""
        hex_color = hex_color.lstrip('#')
        r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        r = max(0, int(r * 0.9))
        g = max(0, int(g * 0.9))
        b = max(0, int(b * 0.9))
        return f"#{r:02x}{g:02x}{b:02x}"
    
    def draw_indicator(self, color):
        """Draw the update indicator circle."""
        self.indicator_canvas.delete("all")
        self.indicator_canvas.create_oval(0, 0, 12, 12, fill=color, outline=color)
    
    def set_status(self, message, color=None):
        """Update the status label."""
        self.status_var.set(message)
        if color:
            self.status_label.configure(fg=color)
        else:
            self.status_label.configure(fg=Colors.FOREGROUND)
    
    def set_update_indicator(self, state, message):
        """Update the update status indicator."""
        color_map = {
            'checking': Colors.INFO,
            'uptodate': Colors.SUCCESS,
            'available': Colors.WARNING,
            'error': Colors.ERROR,
            'na': Colors.MUTED
        }
        color = color_map.get(state, Colors.MUTED)
        
        self.update_status_var.set(f"Updates: {message}")
        self.update_label.configure(fg=color)
        self.draw_indicator(color)
    
    def check_command(self, name):
        """Check if a command is available."""
        return shutil.which(name) is not None
    
    def ensure_tools(self):
        """Verify required tools are installed."""
        if not self.check_command('node'):
            raise Exception("Node.js is not installed. Please install Node.js 18+ and restart.")
        if not self.check_command('npm'):
            raise Exception("npm is not available. Please verify Node.js installation.")
        if not self.check_command('git'):
            raise Exception("Git is not installed. Please install Git for Windows and restart.")
    
    def ensure_dependencies(self):
        """Ensure npm dependencies are installed."""
        node_modules = self.pr_path / 'node_modules'
        
        if not node_modules.exists():
            self.set_status("Installing npm packages (first run)...", Colors.INFO)
            self.root.update()
            
            result = subprocess.run(
                ['npm', 'install'],
                cwd=str(self.pr_path),
                capture_output=True,
                text=True,
                shell=True
            )
            
            if result.returncode != 0:
                raise Exception(f"npm install failed: {result.stderr}")
    
    def start_server(self):
        """Start the Node.js video server."""
        try:
            self.ensure_tools()
            self.ensure_dependencies()
        except Exception as e:
            messagebox.showerror("Error", str(e))
            return
        
        # Check if already running
        if self.server_process and self.server_process.poll() is None:
            self.set_status("Server already running. Opening browser...", Colors.INFO)
            self.open_browser()
            return
        
        self.set_status("Starting server...", Colors.INFO)
        self.root.update()
        
        try:
            # Start server process
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
            
            # Wait a moment for server to start
            time.sleep(2)
            
            # Open browser
            self.open_browser()
            
            pid = self.server_process.pid
            self.set_status(f"Server running (PID {pid})", Colors.SUCCESS)
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to start server: {e}")
            self.set_status("Ready")
    
    def stop_server(self):
        """Stop the Node.js server."""
        if self.server_process is None or self.server_process.poll() is not None:
            self.set_status("Server is not running.", Colors.MUTED)
            return
        
        try:
            self.server_process.terminate()
            self.server_process.wait(timeout=5)
            self.set_status("Server stopped.", Colors.MUTED)
        except subprocess.TimeoutExpired:
            self.server_process.kill()
            self.set_status("Server force stopped.", Colors.WARNING)
        except Exception as e:
            self.set_status(f"Error stopping server: {e}", Colors.ERROR)
        
        self.server_process = None
    
    def open_browser(self):
        """Open the manager UI in default browser."""
        try:
            webbrowser.open(SERVER_URL)
        except Exception:
            pass
    
    def check_health(self):
        """Check if the server is responding."""
        try:
            import urllib.request
            with urllib.request.urlopen(HEALTH_URL, timeout=2) as response:
                if response.status == 200:
                    messagebox.showinfo("Health Check", "Server responded: OK")
                else:
                    messagebox.showwarning("Health Check", "Server returned unexpected response")
        except Exception:
            messagebox.showwarning("Health Check", "Server is not reachable on localhost:3000")
    
    def run_git_command(self, args):
        """Run a git command and return result."""
        result = subprocess.run(
            ['git'] + args,
            cwd=str(self.repo_root),
            capture_output=True,
            text=True,
            shell=True
        )
        return result
    
    def check_updates_async(self):
        """Check for updates in background thread."""
        def check():
            try:
                self.ensure_tools()
            except Exception as e:
                self.root.after(0, lambda: self.set_update_indicator('error', str(e)[:30]))
                return
            
            git_folder = self.repo_root / '.git'
            if not git_folder.exists():
                self.root.after(0, lambda: self.set_update_indicator('na', 'Not a git repository'))
                return
            
            # Fetch from remote
            fetch = self.run_git_command(['fetch', '--all', '--quiet'])
            if fetch.returncode != 0:
                self.root.after(0, lambda: self.set_update_indicator('error', 'Unable to fetch'))
                return
            
            # Get current branch
            branch = self.run_git_command(['rev-parse', '--abbrev-ref', 'HEAD'])
            if branch.returncode != 0:
                self.root.after(0, lambda: self.set_update_indicator('error', 'Cannot determine branch'))
                return
            
            current_branch = branch.stdout.strip()
            
            # Check sync status
            sync = self.run_git_command([
                'rev-list', '--left-right', '--count',
                f'HEAD...origin/{current_branch}'
            ])
            
            if sync.returncode != 0:
                self.root.after(0, lambda: self.set_update_indicator('na', 'No upstream configured'))
                return
            
            try:
                parts = sync.stdout.strip().split()
                if len(parts) < 2:
                    raise ValueError("Unexpected output")
                behind = int(parts[1])
                ahead = int(parts[0])
            except:
                self.root.after(0, lambda: self.set_update_indicator('error', 'Parse error'))
                return
            
            if behind > 0:
                msg = f"{behind} update{'s' if behind > 1 else ''} available"
                self.root.after(0, lambda: self.set_update_indicator('available', msg))
                self.root.after(100, lambda: self.prompt_update(behind))
            elif ahead > 0:
                msg = f"{ahead} commit{'s' if ahead > 1 else ''} ahead"
                self.root.after(0, lambda: self.set_update_indicator('uptodate', msg))
            else:
                self.root.after(0, lambda: self.set_update_indicator('uptodate', 'Up to date'))
        
        thread = threading.Thread(target=check, daemon=True)
        thread.start()
    
    def prompt_update(self, count):
        """Ask user if they want to update."""
        response = messagebox.askyesno(
            "Updates Available",
            f"{count} update{'s' if count > 1 else ''} available from GitHub.\n\nDo you want to update now?"
        )
        
        if response:
            self.apply_update()
    
    def apply_update(self):
        """Pull updates from GitHub."""
        self.set_status("Pulling updates...", Colors.INFO)
        self.set_update_indicator('checking', 'Pulling updates...')
        self.root.update()
        
        pull = self.run_git_command(['pull', '--quiet'])
        
        if pull.returncode == 0:
            # Update npm dependencies if needed
            self.set_status("Updating dependencies...", Colors.INFO)
            self.root.update()
            
            subprocess.run(
                ['npm', 'install', '--silent'],
                cwd=str(self.pr_path),
                capture_output=True,
                shell=True
            )
            
            self.set_status("Updates applied successfully!", Colors.SUCCESS)
            self.set_update_indicator('uptodate', 'Updated successfully')
            
            messagebox.showinfo("Update Complete", "Updates have been applied successfully!")
        else:
            self.set_status("Update failed", Colors.ERROR)
            self.set_update_indicator('error', 'Update failed')
            messagebox.showerror("Update Failed", f"Failed to pull updates:\n{pull.stderr}")
    
    def update_from_github(self):
        """Manual update from GitHub."""
        try:
            self.ensure_tools()
        except Exception as e:
            messagebox.showerror("Error", str(e))
            return
        
        git_folder = self.repo_root / '.git'
        if not git_folder.exists():
            messagebox.showerror("Error", "This folder is not a git repository.")
            return
        
        self.set_status("Fetching updates from GitHub...", Colors.INFO)
        self.root.update()
        
        # Fetch all
        fetch = self.run_git_command(['fetch', '--all', '--prune'])
        if fetch.returncode != 0:
            messagebox.showerror("Error", f"git fetch failed:\n{fetch.stderr}")
            self.set_status("Ready")
            return
        
        # Pull
        pull = self.run_git_command(['pull'])
        if pull.returncode != 0:
            messagebox.showerror("Error", f"git pull failed:\n{pull.stderr}")
            self.set_status("Ready")
            return
        
        self.set_status("Repository is up to date.", Colors.SUCCESS)
        
        # Refresh update indicator
        self.check_updates_async()
        
        if pull.stdout.strip():
            messagebox.showinfo("Git Output", pull.stdout)
    
    def on_closing(self):
        """Handle window close event."""
        self.stop_server()
        self.root.destroy()


def main():
    """Application entry point."""
    root = tk.Tk()
    app = VideoManagerApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
