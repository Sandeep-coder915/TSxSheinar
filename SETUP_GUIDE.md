# 🎨 Sheinar - Complete Project Setup Guide

## 📋 Project Overview

**Sheinar** is a luxury e-commerce platform for handcrafted Indian couture featuring:
- Full-stack product management system
- Rich product descriptions (text, images, videos)
- Customer reviews and ratings  
- Appointment booking system
- Image/video compression
- Mobile-responsive design
### Tech Stack
- **Frontend**: React 19, TypeScript, TanStack Router, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, Cloudinary
- **Deployment**: Render, Railway, Heroku, AWS, or self-hosted

---

## 🚀 Quick Start (5 minutes)

### 1. Backend Setup
```bash
cd backend
npm install

# Configure MongoDB (choose one):
# Option A: In-memory database (no setup needed)
# - Already configured, just works!

# Option B: MongoDB Atlas Cloud
# - Update .env with your connection string
# - MongoDB Atlas free tier at https://atlas.mongodb.com

# Option C: Local MongoDB
# - Install MongoDB Community Edition
# - Run: mongod
# - Update .env: MONGODB_FALLBACK_URI=mongodb://localhost:27017/typesheinaar

# Start development server
npm run dev
# Server runs at http://localhost:5000
```

### 2. Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

### 3. Test the Setup
```bash
# Backend health check
curl http://localhost:5000/health

# Should return:
# {"success":true,"message":"Backend is running"}
```

---

## 📁 Project Structure

```
Typesheinaar/
├── backend/                          # Node.js Express API
│   ├── src/
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── Product.ts           # Products with images/videos
│   │   │   ├── Review.ts            # Product reviews (5-star)
│   │   │   └── Appointment.ts       # Booking system
│   │   ├── controllers/             # API logic
│   │   │   ├── productController.ts
│   │   │   ├── reviewController.ts
│   │   │   └── appointmentController.ts
│   │   ├── routes/                  # API endpoints
│   │   │   └── productRoutes.ts     # 20+ endpoints
│   │   ├── middleware/              # Express middleware
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts
│   │   ├── utils/
│   │   │   ├── db.ts                # MongoDB connection
│   │   │   └── cloudinary.ts        # Image/video upload
│   │   └── index.ts                 # Express server
│   ├── dist/                        # Compiled JavaScript
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Template
│   ├── package.json                 # Dependencies
│   ├── tsconfig.json                # TypeScript config
│   ├── DEPLOYMENT_GUIDE.md          # Production setup
│   ├── API_DOCUMENTATION.md         # API reference
│   └── MONGODB_SETUP.md             # DB troubleshooting
│
└── Frontend/                         # React web application
    ├── src/
    │   ├── routes/                  # Page components
    │   │   ├── index.tsx            # Home page
    │   │   ├── product.$slug.tsx    # Product detail page
    │   │   ├── founders-vision.tsx  # Founder's story
    │   │   ├── collections/         # Collection pages
    │   │   └── admin/               # Admin panel
    │   ├── components/              # Reusable components
    │   │   ├── admin/
    │   │   │   └── ProductManager.tsx # Add/edit products
    │   │   ├── site/
    │   │   │   ├── Navbar.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   └── WhatsAppButton.tsx
    │   │   └── ui/                  # Shadcn components
    │   ├── hooks/
    │   │   └── useProducts.ts       # API integration
    │   ├── styles/                  # Tailwind CSS
    │   └── main.tsx                 # App entry
    ├── public/                      # Static assets
    ├── vite.config.ts               # Vite bundler config
    ├── tailwind.config.js           # Tailwind config
    └── package.json                 # Dependencies
```

---

## 🎯 Key Features

### 1. **Product Management** ✅
- Create products with multiple images (up to 6)
- Rich content editor (text, images, videos)
- Product metadata (material, care, dimensions)
- SEO optimization
- Category and tag system

### 2. **Admin Dashboard** ✅
- ProductManager component
- Create/Edit/Delete products
- Bulk image uploads
- Progress tracking
- Real-time validation

### 3. **Product Display** ✅
- Beautiful product pages
- Image zoom feature
- Multiple tabs (description, specs, reviews)
- Responsive design

### 4. **Reviews System** ✅
- 5-star rating system
- Verified reviews
- Average rating calculation
- Review management in admin

### 5. **Appointments** ✅
- Book consultation appointments
- Calendar date picker
- Availability checking
- Status management
- Email notifications (can be added)

### 6. **Image Optimization** ✅
- Automatic WebP conversion
- Smart compression
- Cloudinary CDN delivery
- Thumbnail generation for videos

---

## 🔧 API Endpoints

### Products (7 endpoints)
```
GET    /api/products                 # Get all products
GET    /api/products/featured        # Featured only
GET    /api/products/category/:cat   # By category
GET    /api/products/:slug           # Single product
POST   /api/products                 # Create (with files)
PUT    /api/products/:slug           # Update
DELETE /api/products/:slug           # Delete
```

### Reviews (5 endpoints)
```
GET    /api/products/:slug/reviews   # Get reviews
POST   /api/products/:slug/reviews   # Create review
PUT    /api/products/reviews/:id     # Update review
DELETE /api/products/reviews/:id     # Delete review
PATCH  /api/products/reviews/:id/verify  # Verify
```

### Appointments (6 endpoints)
```
GET    /api/products/appointments/list              # All
GET    /api/products/:slug/appointments              # For product
POST   /api/products/:slug/appointments              # Book
PUT    /api/products/appointments/:id                # Update
PATCH  /api/products/appointments/:id/status         # Change status
DELETE /api/products/appointments/:id                # Cancel
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
# MongoDB (choose one)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority
# OR
MONGODB_FALLBACK_URI=mongodb://localhost:27017/typesheinaar
# OR (development only)
USE_MEMORY_DB=true

# Cloudinary (for images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (auto-configured)
- API_BASE = `http://localhost:5000/api`
- Change to production URL on deploy

---

## 📱 Pages & Routes

### Public Pages
- `/` - Home page with featured products
- `/collections/:category` - Browse by category
- `/product/:slug` - Product detail with reviews
- `/journal` - Blog/articles
- `/philosophy` - Brand philosophy
- `/our-story` - Company history
- `/founders-vision` - Founder's story
- `/legacy` - Heritage information
- `/embroidery` - Embroidery showcase

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/products` - Product manager

---

## 🔍 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/health

# Get products
curl http://localhost:5000/api/products

# Create product (with file)
curl -X POST http://localhost:5000/api/products \
  -F "name=Test" \
  -F "slug=test" \
  -F "category=couture" \
  -F "price=5000" \
  -F "galleryImages=@image.jpg"

# Create review
curl -X POST http://localhost:5000/api/products/test/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John","email":"john@example.com","rating":5,
    "title":"Amazing","comment":"Great product"
  }'

# Book appointment
curl -X POST http://localhost:5000/api/products/test/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John","lastName":"Doe","email":"john@example.com",
    "phone":"+91-9810000000","date":"2024-12-25","time":"14:00"
  }'
```

---

## 🚀 Deployment

### Quick Deploy to Render.com
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect your repo
5. Set build command: `npm install && npm run build`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy!

See `backend/DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🎨 Customization

### Colors
Edit `Frontend/src/styles/index.css`:
```css
:root {
  --gold: #d4af37;
  --maroon: #4a1a1a;
  --ivory: #f5f1ee;
}
```

### Fonts
Already using Google Fonts:
- Display: "Grosvenor"
- Body: "Lora"

### Add New Routes
1. Create file in `Frontend/src/routes/`
2. Use TanStack Router syntax
3. Export as route component

### Customize Product Manager
Edit `Frontend/src/components/admin/ProductManager.tsx`:
- Add/remove tabs
- Change file limits
- Customize validation

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Node version
node --version  # Should be 18+

# Check MongoDB connection
# See MONGODB_SETUP.md

# Check port 5000
# Maybe another app using it
npx kill-port 5000
```

### Frontend can't connect to API
```bash
# Check backend is running
curl http://localhost:5000/health

# Check CORS settings in backend
# Update allowed origins in src/index.ts

# Check API_BASE in useProducts hook
# Should be http://localhost:5000/api
```

### Image upload fails
```bash
# Check Cloudinary credentials
# Check file size (max 100MB)
# Check file format (JPEG, PNG, WebP, GIF)
```

### MongoDB connection issues
See `backend/MONGODB_SETUP.md` for solutions

---

## 📚 Documentation

- `backend/API_DOCUMENTATION.md` - Complete API reference
- `backend/DEPLOYMENT_GUIDE.md` - Production deployment
- `backend/MONGODB_SETUP.md` - Database troubleshooting
- `backend/IMPLEMENTATION_SUMMARY.md` - Feature overview

---

## 🎓 Learning Resources

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://docs.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - ODM
- [React Router](https://tanstack.com/router) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cloudinary](https://cloudinary.com/developers) - Image hosting

---

## 📞 Support

### Common Issues
1. **MongoDB not connecting** → See MONGODB_SETUP.md
2. **Images not uploading** → Check Cloudinary API keys
3. **Build fails** → Run `npm install` in both folders
4. **Port already in use** → Change PORT in .env

### Contact
For issues or questions:
1. Check documentation files
2. Review error messages in console
3. Check browser console for frontend errors
4. Check backend logs for API errors

---

## ✅ Checklist for Launch

- [ ] Backend builds without errors
- [ ] Frontend loads without errors
- [ ] Can create products with images
- [ ] Can write reviews
- [ ] Can book appointments
- [ ] MongoDB connection works
- [ ] Cloudinary uploads working
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Tests pass
- [ ] Deployed to production
- [ ] Domain configured
- [ ] SSL certificate installed

**You're ready to launch! 🚀**
