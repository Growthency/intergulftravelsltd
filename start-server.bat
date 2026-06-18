@echo off
title Inter Gulf Travels - Local Server  (keep this window open)
cd /d "%~dp0"
echo ============================================================
echo   INTER GULF TRAVELS LTD - local website server
echo   URL:  http://localhost:3000
echo   Keep this window open. Press Ctrl+C to stop the server.
echo ============================================================
echo.
call npm run dev
echo.
echo Server stopped. Press any key to close this window...
pause >nul
