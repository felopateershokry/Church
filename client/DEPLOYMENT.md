# Deployment Guide

This guide explains how to deploy your application to GitHub Pages (frontend) and a free hosting service (backend).

## 🎯 Overview

- **Frontend (React)**: Hosted on GitHub Pages ✅ (FREE)
- **Backend (Express)**: Must be hosted on a Node.js hosting service (FREE options available)

## 📦 Step 1: Deploy Backend

The backend **cannot** run on GitHub Pages. You need a Node.js hosting service. Here are free options:

### Option A: Railway (Recommended - Easiest)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will detect it's a Node.js app
6. Set the root directory to: `client`
7. Add start command: `npm run server`
8. Deploy! Railway will give you a URL like: `https://your-app.railway.app`
9. Copy this URL - you'll need it for Step 2

### Option B: Render

1. Go to [render.com](https://render.com)
2. Sign up
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - **Root Directory**: `client`
   - **Build Command**: (leave empty or `npm install`)
   - **Start Command**: `npm run server`
6. Deploy! You'll get a URL like: `https://your-app.onrender.com`

### Option C: Fly.io

1. Install Fly CLI: `npm install -g @fly/cli`
2. Run: `fly launch` in the `client` directory
3. Follow the prompts
4. Deploy with: `fly deploy`

### Option D: Render or Railway (Simplest for beginners)

After deploying, note your backend URL (e.g., `https://your-app.railway.app`)

## 🌐 Step 2: Update Frontend API URL

1. In your GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click "New repository secret"
3. Name: `VITE_API_URL`
4. Value: Your backend URL (e.g., `https://your-app.railway.app`)
5. Click "Add secret"

## 🚀 Step 3: Deploy Frontend to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. In your GitHub repository, go to **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Push your code to the `main` branch
4. GitHub Actions will automatically build and deploy!

### Method 2: Manual Deployment

1. Install gh-pages: `npm install --save-dev gh-pages` (already in package.json)
2. Build and deploy:
   ```bash
   cd client
   npm run deploy
   ```
3. GitHub Pages will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## ⚙️ Step 4: Configure GitHub Pages Base Path

If your site is at `https://username.github.io/repo-name/` (not root):

1. In `vite.config.js`, update the `base` variable:
   ```js
   const base = "/REPO_NAME/";
   ```
2. Or set it as an environment variable before building

## 🔧 Important Notes

### Backend CORS Configuration

Make sure your backend allows requests from your GitHub Pages domain. Update `backend/server.js`:

```js
app.use(
  cors({
    origin: ["http://localhost:5173", "https://YOUR_USERNAME.github.io"],
  })
);
```

### Environment Variables

- **Development**: Frontend uses `/api` which proxies to `localhost:3001`
- **Production**: Frontend uses `VITE_API_URL` environment variable
- The backend URL must be publicly accessible (not `localhost`)

## 🧪 Testing

1. **Test backend**: Visit `https://your-backend.railway.app/api/attendance` - should return `{"success":true,"data":{}}`
2. **Test frontend**: Visit your GitHub Pages URL
3. **Test attendance**: Click + button on a card, check if it appears in another browser/tab

## 📝 Troubleshooting

### Frontend can't connect to backend

- Check CORS settings in `backend/server.js`
- Verify `VITE_API_URL` secret is set correctly
- Check browser console for errors

### Routes not working on GitHub Pages

- Make sure `base` path in `vite.config.js` matches your repo name
- Verify `BrowserRouter basename` in `main.jsx`

### Backend not accessible

- Check if backend is running: visit the URL directly
- Verify deployment logs on your hosting service
- Check if port is configured correctly (most hosting services auto-detect)

## 🎉 You're Done!

Your app should now be live:

- Frontend: `https://YOUR_USERNAME.github.io/REPO_NAME/`
- Backend: `https://your-app.railway.app` (or your chosen host)

All users can now see shared attendance counts!
