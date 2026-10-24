# BAWAAL Downloader
Ad-free website for downloading public Instagram videos where you have permission.

## Run locally
1. Install Node.js 18+ and Python 3.
2. Install yt-dlp: `python -m pip install -U yt-dlp` (ensure `yt-dlp` is on PATH).
3. Run `npm install` then `npm start`.
4. Open `http://localhost:3000`.

## Deploy
Deploy as a Node web service with `npm install` as build command and `npm start` as start command. Ensure the server has the yt-dlp binary installed and available on PATH, and enough ephemeral disk space. Free hosting platforms may block Instagram extraction or limit bandwidth. Download functionality depends on Instagram restrictions and may break when they change. No credentials are collected.
