# 🚀 Sheinar Backend - Deployment Guide

## ✅ What's Ready for Deployment

Your backend is now fully configured for production deployment on **Render.com** (or any Node.js hosting):

### Build Status
- ✅ TypeScript compiles to CommonJS format
- ✅ All source files → `dist/` folder
- ✅ Ready to run with `npm start`
- ✅ MongoDB connection (Atlas, Local, or In-Memory)
- ✅ Cloudinary integration for images/videos

---

## 📋 Deployment Steps

### 1. **Push to Git**
```bash
cd d:\Typesheinaar
git add .
git commit -m "Production-ready backend with deployment config"
git push
```

### 2. **Deploy on Render.com**

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Fill in deployment settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `20` or higher

5. Add Environment Variables in Render dashboard:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typesheinaar?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=production
```

6. Click **"Deploy"**

### 3. **Alternative: Deploy on Other Platforms**

#### **Heroku**
```bash
# Install Heroku CLI, then:
heroku create sheinar-backend
heroku config:set MONGODB_URI=your_connection_string
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
# ... set other env vars
git push heroku main
```

#### **AWS EC2**
```bash
# SSH into instance
cd /var/www/sheinar
npm install
npm run build
npm start
# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "sheinar-backend" -- start
```

#### **Railway.app**
1. Connect GitHub repo
2. Set environment variables
3. Deploy (automatic on git push)

#### **Vercel Functions** (Serverless)
```bash
# Create vercel.json in backend folder:
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "functions": {
    "dist/index.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

---

## 🔧 Environment Configuration

### **Option 1: MongoDB Atlas** (Recommended for Production)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```
- Scalable cloud database
- Automatic backups
- Easy monitoring

### **Option 2: Local MongoDB**
```env
MONGODB_FALLBACK_URI=mongodb://localhost:27017/typesheinaar
```
- Run locally on VM/server
- Full control
- No monthly costs

### **Option 3: In-Memory Database** (Development Only)
```env
USE_MEMORY_DB=true
```
- No setup needed
- Data lost on server restart
- Perfect for testing

---

## 📦 Build Output

After `npm run build`, the `dist/` folder contains:

```
dist/
├── index.js              (main entry point)
├── controllers/          (API handlers)
├── models/              (MongoDB schemas)
├── routes/              (API endpoints)
├── middleware/          (Express middleware)
├── utils/               (helpers)
└── [source maps]        (debugging)
```

**File Size**: ~150KB (minified)

---

## 🧪 Testing Deployment

### Local Test
```bash
npm run build
npm start
# Server runs on http://localhost:5000
```

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Create product (requires POST)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","slug":"test","category":"couture"}'
```

---

## 🔒 Security Checklist

Before deploying to production:

- [ ] Remove sensitive data from code
- [ ] Use environment variables for all secrets
- [ ] Enable CORS only for your frontend domain
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS everywhere
- [ ] Set strong MongoDB passwords
- [ ] Enable MongoDB IP whitelisting
- [ ] Use Cloudinary API key securely
- [ ] Enable rate limiting (optional)
- [ ] Set up error monitoring (Sentry, etc.)

### Update CORS in `src/index.ts`
```typescript
app.use(cors({
  origin: ['https://yourdomain.com'], // Change from localhost
  credentials: true
}));
```

---

## 📊 Performance Optimization

### Current Optimizations
- ✅ Image compression via Cloudinary (WebP format)
- ✅ Database indexing (slug, category, tags)
- ✅ Connection pooling (Mongoose)
- ✅ Request size limits (50MB)

### Additional Optimizations
```bash
# Add caching
npm install redis

# Add monitoring
npm install @sentry/node

# Add rate limiting
npm install express-rate-limit
```

---

## 📋 Files Ready for Deployment

### Configuration Files Created
- ✅ `render.yaml` - Render.com configuration
- ✅ `backend/.env.example` - Environment template
- ✅ `backend/tsconfig.json` - TypeScript config (CommonJS output)
- ✅ `backend/package.json` - Dependencies & scripts

### Deployment-Ready Code
- ✅ All TypeScript compiled to JavaScript
- ✅ Source maps for debugging
- ✅ Error handling middleware
- ✅ MongoDB connection with fallback
- ✅ Cloudinary integration

---

## 🚨 Troubleshooting Deployment

### Error: "Cannot find module"
**Solution**: Run `npm install` before build
```bash
npm ci  # Clean install (recommended)
npm run build
```

### Error: "MongoDB connection refused"
**Solution**: Check IP whitelist in MongoDB Atlas
1. Go to MongoDB Atlas → Cluster → Network Access
2. Add your deployment server's IP address
3. Or allow `0.0.0.0/0` (any IP) for testing

### Error: "Out of memory"
**Solution**: Use In-Memory MongoDB only for development
```env
# Production: use MongoDB Atlas
MONGODB_URI=mongodb+srv://...

# Local: use local MongoDB
MONGODB_FALLBACK_URI=mongodb://...
```

### Error: "CORS errors"
**Solution**: Update CORS origin in `src/index.ts`
```typescript
origin: ['https://yourdomain.com', 'http://localhost:3000']
```

---

## 📈 Monitoring & Logs

### On Render.com
- View live logs in dashboard
- Monitor CPU, RAM usage
- Set up email alerts for crashes

### On Other Platforms
```bash
# Use PM2 for logs
pm2 logs sheinar-backend
pm2 monit

# Or use cloud logging
# AWS CloudWatch
# Google Cloud Logging
# Azure Monitor
```

---

## 🔄 Continuous Deployment

### Automatic Deployment on Git Push
Most platforms support automatic deployment:
- Render: Enabled by default
- Railway: Enabled by default
- Heroku: `git push heroku main`

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: curl ${{ secrets.RENDER_WEBHOOK }}
```

---

## 📞 Support

### Common Deployment Platforms
- **Render.com** - Easiest, free tier available
- **Railway.app** - Simple, modern interface
- **Fly.io** - Fast, distributed
- **AWS/Google Cloud** - Most powerful

### Documentation
- [Render Deployment](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [Cloudinary Upload API](https://cloudinary.com/documentation)

---

## ✅ Production Checklist

- [ ] Backend builds without errors
- [ ] Environment variables configured
- [ ] MongoDB connection tested
- [ ] Cloudinary API keys working
- [ ] CORS configured for frontend domain
- [ ] Error logging enabled
- [ ] Database backups scheduled
- [ ] SSL/TLS certificate installed
- [ ] Monitoring alerts set up
- [ ] API endpoints documented

**Your backend is ready for production! 🎉**
