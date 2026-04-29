**Overview**
- **Repo Root:** Top-level repository contains two related projects: a desktop "manager" app in `manager-app/` and the website frontend in `pr/`.
- **Purpose:** The manager app (Python) is a local desktop tool that controls the Node.js server for the site, performs Git pulls/pushes and npm installs, and opens the browser to the dashboard. The Node.js server (in `pr/`) exposes endpoints used by the manager UI and the web-based manager pages to add/delete/reorder videos, which are stored directly inside the React source file `Work.tsx`.

**How to read this file**
- Start with **Manager App** to understand how the desktop app controls the site.
- Read **Server (pr/video-manager-server.js)** for the API and file-write logic.
- Read **Frontend (pr/)** section to see how the website consumes the server API and how `Work.tsx` is structured.

**Files referenced in this document**
- Manager app: [manager-app/video_manager.py](manager-app/video_manager.py)
- Manager README: [manager-app/README.md](manager-app/README.md)
- Node server: [pr/video-manager-server.js](pr/video-manager-server.js)
- Web manager page: [pr/video-manager.html](pr/video-manager.html)
- Website main README: [pr/README.md](pr/README.md)
- Work component: [pr/src/components/Work.tsx](pr/src/components/Work.tsx)
- Custom players: [pr/src/components/ui/CustomStreamablePlayer.tsx](pr/src/components/ui/CustomStreamablePlayer.tsx), [pr/src/components/ui/CustomVideoPlayer.tsx](pr/src/components/ui/CustomVideoPlayer.tsx)

**1) Manager App (desktop) — manager-app/video_manager.py**
- Role: Desktop control center that can start/stop the Node.js server, open the manager UI in a browser, run health checks, run `npm install` if needed, and pull/push Git updates.
- Key behaviors:
  - Repository discovery: searches upward from the script or executable for a `.git` folder and sets `self.repo_root` and `self.pr_path` (the `pr/` folder) accordingly.
  - Tool checks: `ensure_tools()` validates presence of `node`, `npm`, and `git` (using `shutil.which`).
  - Dependency install: `ensure_dependencies()` runs `npm install` in the `pr` folder if `node_modules` is missing, using the found `npm` executable and safe `shell=False` subprocess calls.
  - Start/Stop server: `start_server()` launches `node video-manager-server.js` with `cwd` set to `pr/`. `stop_server()` terminates the process stored in `self.server_process`.
  - Browser: `open_browser()` opens `http://localhost:3000/manage-videos.html` (constant `SERVER_URL`).
  - Health check: `check_health()` hits `http://localhost:3000/health` and reports success/failure.
  - Git checks & auto-update: `check_updates_async()` runs `git fetch`, compares HEAD vs origin, and sets UI indicators. `apply_update()` runs `git pull` and optionally runs `npm install`. All Git work uses subprocess (`git` via `run_git_command`).
- UI: implemented with `tkinter` and a color scheme; buttons map directly to the functions above.
- Packaging: `requirements.txt` includes `pyinstaller` to produce an EXE for Windows per [manager-app/README.md](manager-app/README.md).

**Security & robustness notes (manager-app)**
- Subprocess calls use `shell=False` and `shutil.which` where possible — good practice.
- Windows-specific subprocess kwargs are applied only when `os.name == 'nt'`.
- If `npm` or `git` is missing the app surfaces errors via message boxes.

**2) Node server in `pr/` — pr/video-manager-server.js**
- Role: lightweight management server (Express) that:
  - Serves static site files and manager HTML pages.
  - Exposes APIs to list videos and to add/remove/reorder videos by editing `Work.tsx` directly.
- Main endpoints:
  - GET `/` → serves [pr/video-manager.html](pr/video-manager.html) (web UI to add videos).
  - GET `/videos` → returns parsed arrays from `Work.tsx` as JSON: `{ projects, reels, entertainmentReels }`.
  - POST `/add-video` → accepts JSON payload to add a video to `projects`/`reels`/`entertainmentReels` and updates `Work.tsx`.
  - POST `/delete-video` → removes an entry by `embedId`.
  - POST `/update-order` → reorders a section given an array of `embedId`s.
  - GET `/health` → returns JSON health check.
- How the server edits `Work.tsx`:
  - `readWorkFile()` reads the source file `src/components/Work.tsx`.
  - `parseWorkArray(workContent, arrayName)` finds the textual array using a regex like `const projects = [ ... ];` and uses `new Function` to evaluate the inner array literal to JS objects. (This lets the server treat the JS array as data.)
  - `updateWorkArray()` uses a modifier function to change the in-memory array and then rebuilds a sanitized array string and writes it back to `Work.tsx`.
  - After file changes, `stageCommitPush()` runs `git add`, `git commit -m`, and `git push`. It ensures basic `user.name` and `user.email` config if missing.
- Implementation notes and risks:
  - The server uses `execFileSync('git', args)`. Outputs and errors are captured and converted into API errors.
  - `new Function` and dynamic code generation are powerful but must be used carefully. The server sanitizes string fields when serializing back to `Work.tsx` (escaping quotes and backticks) but editing source code textually can be brittle if `Work.tsx` formatting changes drastically.
  - `WORK_FILE_PATH` is a fixed path to `src/components/Work.tsx`. If that file moves the server will fail to locate arrays.

**3) Web manager pages and workflows**
- [pr/video-manager.html](pr/video-manager.html): A standalone HTML page used to add videos in bulk. It:
  - Provides a form to add multiple video entries (title, Streamable URL, optional project type).
  - Extracts `embedId` from Streamable URLs with a regex.
  - Submits each video via POST `/add-video` to the Node server. The Node server applies changes and commits/pushes to GitHub.
  - Shows progress, success and failed videos, and resets the form after successful adds. See the in-page script in the file.
- [pr/manage-videos.html](pr/manage-videos.html): (served statically from `pr/`) likely contains UI for deleting or reordering videos. The server also exposes `/videos` to get current arrays.

**4) Frontend website (`pr/`) — code structure & `Work.tsx`**
- Purpose: public-facing React + Vite website that displays featured projects and reels. The `Work` component contains in-file arrays that act as the authoritative data source for the site (not a separate JSON file).
- Key paths:
  - [pr/src/components/Work.tsx](pr/src/components/Work.tsx) — contains `projects`, `reels`, and `entertainmentReels` arrays and UI that renders them. This file is read/modified by the server when videos are added/removed.
  - [pr/src/components/ui/CustomStreamablePlayer.tsx](pr/src/components/ui/CustomStreamablePlayer.tsx) — a custom player that attempts to load a direct mp4 URL and falls back to a Streamable iframe if necessary. It adds the portfolio branding overlay and custom controls.
  - [pr/src/components/ui/CustomVideoPlayer.tsx](pr/src/components/ui/CustomVideoPlayer.tsx) — a YouTube-focused player using the YouTube IFrame API and custom controls/branding.
- `Work.tsx` behavior summary:
  - Defines arrays `projects`, `reels`, `entertainmentReels` at file top. Each item includes `title`, `videoUrl`, `embedId`, `thumbnail`, `platform`, and `category` for projects.
  - Renders two main sections: Featured Projects and Featured Reels; uses GSAP `ScrollTrigger` for pinned horizontal carousels and animated entrance of cards.
  - Clicking thumbnails toggles the embedded player for that card (uses `CustomStreamablePlayer` for Streamable content and `CustomVideoPlayer` for YouTube/other platforms).
  - The file is the single source of truth for video listings; the Node server edits this source programmatically.

**5) Typical workflow (what the manager does end-to-end)**
1. Developer starts the manager app (`manager-app/video_manager.py` or the EXE).
2. Manager ensures `node`, `npm`, `git` are available and `pr/node_modules` is installed (runs `npm install` if missing).
3. User presses “Start Server”: manager runs `node video-manager-server.js` (cwd `pr/`) and opens `http://localhost:3000/manage-videos.html` in the browser.
4. User uses the web manager UI to add videos (or uses the desktop UI to pull updates). The web manager posts `POST /add-video` for each video.
5. The Node server updates `pr/src/components/Work.tsx` by editing the arrays, commits, and pushes changes to the remote repo.
6. GitHub Pages (if configured) rebuilds the site and publishes updated content.

**6) Where the site displays content**
- The static website (React app built with Vite) reads data embedded in `Work.tsx` during build time. Because the arrays are stored in source code, updating `Work.tsx` and pushing triggers the normal GitHub Pages build/deploy pipeline.

**7) Extending or modifying the system**
- Add a separate JSON or markdown data file: consider moving the video arrays out of `Work.tsx` into a `data/videos.json` that both the site and server can use. This would make the add/delete/reorder logic easier and less fragile.
- Harden parsing: current server parsing relies on regex + `new Function`. If you keep arrays in JS source, keep a predictable, simple format. Alternatively, use an AST parser (e.g., Babel) for more robust edits.
- Authentication: the management server is only intended for local use. If you expose it to a network, add authentication and CSRF protections.

**8) Quick navigation (important files)**
- Manager app: [manager-app/video_manager.py](manager-app/video_manager.py)
- Server: [pr/video-manager-server.js](pr/video-manager-server.js)
- Web manager UI: [pr/video-manager.html](pr/video-manager.html)
- Main site work data: [pr/src/components/Work.tsx](pr/src/components/Work.tsx)
- Streamable player: [pr/src/components/ui/CustomStreamablePlayer.tsx](pr/src/components/ui/CustomStreamablePlayer.tsx)
- YouTube player: [pr/src/components/ui/CustomVideoPlayer.tsx](pr/src/components/ui/CustomVideoPlayer.tsx)
- Frontend README: [pr/README.md](pr/README.md)

**9) Debugging tips**
- If `/add-video` returns an error, check server console (the running `node` process) for stack traces and the exact `git` error.
- If changes do not appear on the live site, verify the repo push succeeded and that GitHub Pages workflow completed.
- If `npm install` fails, run it manually inside `pr/` and inspect `npm` output.
- If the manager app cannot find the repo, run the manager from the repo root or ensure `.git` exists above the app/script location.

---
If you want, I can:
- Extract `projects`/`reels` arrays into a JSON file and update server+site to use it.
- Harden `video-manager-server.js` to use an AST-based editor instead of regex + eval.
- Add simple local auth to the manager server.

(Generated from the repository files: manager-app and pr.)