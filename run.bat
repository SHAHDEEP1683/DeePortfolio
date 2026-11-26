@echo off
title DeePortfolio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js is not installed or not in PATH. Get it from https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies, first run only...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo Starting dev server at http://localhost:9002
start "" cmd /c "timeout /t 8 >nul && start http://localhost:9002"
call npm run dev

pause
