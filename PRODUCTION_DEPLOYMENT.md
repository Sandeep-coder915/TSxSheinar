# 🚀 Sheinar - Production Deployment Guide

## 📋 Overview

This guide covers deploying both the **Sheinar Frontend** (React/Vite) and **Sheinar Backend** (Node.js/Express) to production on **Render.com**.

## ✅ Pre-Deployment Checklist

### Backend Ready ✅
- TypeScript compiles to `dist/` folder
- Production environment variables configured
- MongoDB Atlas connection ready
- Cloudinary integration configured
- CORS configured for cross-origin requests

### Frontend Ready ✅
- Vite build creates optimized `dist/` folder
- API calls configured for production
- Environment variables set for production URL

## 🚀 Deployment Steps

### 1. **Prepare Your Code**
```bash
# Ensure you're in the project root
cd d:\Typesheinaar

# Commit all changes
git add .
git commit -m "Production-ready deployment configuration"
git push origin main
```

### 2. **Deploy Backend on Render**

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository (`Typesheinaar`)
4. Render will detect the `render.yaml` configuration
5. Configure environment variables for the backend service:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
6. Click **"Apply"** to deploy both services

### 3. **Update Frontend API URL** (After Backend Deploys)

Once the backend is deployed, note its URL (e.g., `https://sheinar-backend.onrender.com`).

Update the frontend environment variable:
- In Render dashboard → Frontend service → Environment
- Set `VITE_API_URL` to `https://sheinar-backend.onrender.com/api`

### 4. **Redeploy Frontend**

After updating the API URL, redeploy the frontend service from the Render dashboard.

## 🔧 Environment Variables

### Backend Service
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typesheinaar
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Service
```
VITE_API_URL=https://your-backend-service.onrender.com/api
VITE_APP_ENV=production
```

## 🌐 Accessing Your Application

- **Frontend**: `https://sheinar-frontend.onrender.com`
- **Backend API**: `https://sheinar-backend.onrender.com/api`

## 🔍 Troubleshooting

### Build Failures
- Check Render build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation succeeds locally

### Runtime Errors
- Check environment variables are set correctly
- Verify MongoDB connection string
- Confirm Cloudinary credentials

### CORS Issues
- Backend allows all origins by default
- For production security, consider restricting CORS to your frontend domain

## 📊 Monitoring

- Monitor application logs in Render dashboard
- Check MongoDB Atlas for database performance
- Monitor Cloudinary usage and limits

## 🔄 Updates

To deploy updates:
1. Push changes to your Git repository
2. Render will auto-deploy (configured in `render.yaml`)
3. Monitor deployment in Render dashboard

---

**Your application is now production-ready! 🎉**</content>
<parameter name="filePath">d:\Typesheinaar\PRODUCTION_DEPLOYMENT.md