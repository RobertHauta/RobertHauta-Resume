






# HTTPS Development Setup Guide

## Overview
Your development environment is now configured to run at `https://dev.roberthauta.com` with SSL encryption, matching your production setup.

## Setup Steps

### 1. Update Your Hosts File

You need to add an entry to your Windows hosts file to point `dev.roberthauta.com` to localhost.

**Option A: Automatic (Requires Administrator)**
Run this in PowerShell **as Administrator**:

```powershell
Add-Content -Path C:\Windows\System32\drivers\etc\hosts -Value "`n127.0.0.1 dev.roberthauta.com"
```

**Option B: Manual**
1. Open Notepad **as Administrator**
2. Open file: `C:\Windows\System32\drivers\etc\hosts`
3. Add this line at the end:
   ```
   127.0.0.1 dev.roberthauta.com
   ```
4. Save the file

### 2. Trust the Self-Signed Certificate (Optional but Recommended)

To avoid browser security warnings:

1. Open the certificate file: `docker/ssl/dev.roberthauta.com.crt`
2. Double-click to install
3. Select "Install Certificate"
4. Choose "Local Machine"
5. Select "Place all certificates in the following store"
6. Browse and select "Trusted Root Certification Authorities"
7. Click "Next" and "Finish"

**OR** you can just accept the browser warning when you first visit the site (click "Advanced" → "Proceed to dev.roberthauta.com")

### 3. Start the Development Environment

```bash
cd docker
docker compose -f docker-compose.dev.yml up
```

### 4. Access Your Application

- **Frontend**: https://dev.roberthauta.com/app
- **Backend API**: https://dev.roberthauta.com/api/v1/docs
- **Health Check**: https://dev.roberthauta.com/health

## What Changed?

### Before (localhost)
- Frontend: http://localhost:6969
- Backend: http://localhost:8000
- No SSL/HTTPS

### After (dev domain)
- Everything goes through: https://dev.roberthauta.com
- Frontend served at: /app
- Backend API at: /api
- SSL encryption enabled
- Matches production routing structure

## Architecture

```
Browser (https://dev.roberthauta.com)
         ↓
    Nginx Proxy (SSL termination)
         ↓
    ├─→ /app  → Frontend (React + Vite)
    └─→ /api  → Backend (FastAPI)
```

## Troubleshooting

### Can't access dev.roberthauta.com
- Verify hosts file entry: `ping dev.roberthauta.com` should resolve to 127.0.0.1
- Check if nginx is running: `docker ps | grep nginx`

### SSL Certificate Warning
- Either install the certificate (see step 2 above)
- Or click "Advanced" → "Proceed" in your browser
- This is normal for self-signed certificates

### Port 80 or 443 Already in Use
- Check what's using the ports: `netstat -ano | findstr :443`
- Stop the conflicting service
- Or change the ports in docker-compose.dev.yml

### CORS Errors
- Make sure you're accessing via https://dev.roberthauta.com (not localhost)
- Check browser console for exact error
- Verify CORS settings in backend/app/core/config.py

## Notes

- The SSL certificate is valid for 365 days
- This setup mimics your production environment
- All environment variables are configured for dev.roberthauta.com
- The frontend automatically proxies API calls through nginx