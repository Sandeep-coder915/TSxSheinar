# Sheinar Backend API Documentation

## Overview
This is a fully functional backend for the Sheinar e-commerce platform with support for:
- Product management (CRUD operations)
- Product reviews
- Appointment booking
- Image and video uploads with automatic compression via Cloudinary
- Multiple content types (text, images, videos) in product descriptions

## Base URL
```
http://localhost:5000/api
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account

### Installation
```bash
cd backend
npm install
```

### Environment Variables
Ensure your `.env` file contains:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/typesheinaar?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

### Running the Server
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

---

## API Endpoints

### Products

#### Get All Products
```http
GET /api/products
```
Query Parameters:
- `category` - Filter by category
- `featured` - Get featured products (true/false)
- `inStock` - Filter by stock status (true/false)

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### Get Featured Products
```http
GET /api/products/featured
```

#### Get Products by Category
```http
GET /api/products/category/:category
```

#### Get Product by Slug
```http
GET /api/products/:slug
```

#### Create Product
```http
POST /api/products
Content-Type: multipart/form-data
```

Form Data:
```
name: string (required)
slug: string (required, unique)
category: string (required)
price: number
originalPrice: number
inStock: boolean
featured: boolean
tags: JSON array
description: JSON object with content blocks
metadata: JSON object {material, care, dimensions, weight}
seo: JSON object {title, description, keywords}
bannerImages: file (1)
galleryImages: files (up to 5)
videos: files (up to 3)
```

Example Request:
```javascript
const formData = new FormData();
formData.append('name', 'Embroidered Saree');
formData.append('slug', 'embroidered-saree');
formData.append('category', 'couture');
formData.append('price', '15000');
formData.append('description', JSON.stringify({
  content: [
    { type: 'text', content: 'Description...', order: 0 },
    { type: 'image', content: 'image-url', order: 1, alt: 'Image' }
  ]
}));
formData.append('metadata', JSON.stringify({
  material: 'Silk',
  care: 'Dry clean only'
}));
formData.append('bannerImages', file);
formData.append('galleryImages', file1, file2);

await fetch('/api/products', { method: 'POST', body: formData });
```

#### Update Product
```http
PUT /api/products/:slug
Content-Type: multipart/form-data
```
Same parameters as Create Product. Only provided fields will be updated.

#### Delete Product
```http
DELETE /api/products/:slug
```
Deletes product and all associated reviews, appointments, and media from Cloudinary.

---

### Reviews

#### Get Product Reviews
```http
GET /api/products/:slug/reviews
```

Response:
```json
{
  "success": true,
  "count": 10,
  "avgRating": 4.5,
  "data": [...]
}
```

#### Create Review
```http
POST /api/products/:slug/reviews
Content-Type: application/json
```

Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 5,
  "title": "Amazing product",
  "comment": "Excellent quality and fit"
}
```

#### Update Review
```http
PUT /api/products/reviews/:reviewId
Content-Type: application/json
```

Body: Same as create review

#### Delete Review
```http
DELETE /api/products/reviews/:reviewId
```

#### Verify Review
```http
PATCH /api/products/reviews/:reviewId/verify
```

---

### Appointments

#### Get All Appointments
```http
GET /api/products/appointments/list
```
Query Parameters:
- `status` - Filter by status (pending, confirmed, completed, cancelled)
- `date` - Filter by date (YYYY-MM-DD)

#### Get Product Appointments
```http
GET /api/products/:slug/appointments
```

#### Book Appointment
```http
POST /api/products/:slug/appointments
Content-Type: application/json
```

Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91-9810000000",
  "date": "2024-12-25",
  "time": "14:00",
  "message": "Optional message"
}
```

#### Update Appointment
```http
PUT /api/products/appointments/:appointmentId
Content-Type: application/json
```

Body: Same as book appointment

#### Update Appointment Status
```http
PATCH /api/products/appointments/:appointmentId/status
Content-Type: application/json
```

Body:
```json
{
  "status": "confirmed"
}
```

Valid statuses: `pending`, `confirmed`, `completed`, `cancelled`

#### Delete Appointment
```http
DELETE /api/products/appointments/:appointmentId
```

---

## Database Models

### Product
- `_id`: ObjectId
- `name`: String (required)
- `slug`: String (required, unique)
- `description`: Object with content blocks
- `images`: Array of image objects (max 6)
- `videos`: Array of video objects
- `category`: String (required)
- `price`: Number
- `originalPrice`: Number
- `inStock`: Boolean
- `featured`: Boolean
- `tags`: Array of strings
- `metadata`: Object {material, care, dimensions, weight}
- `seo`: Object {title, description, keywords}
- `reviews`: Array of Review IDs
- `createdAt`: Date
- `updatedAt`: Date

### Review
- `_id`: ObjectId
- `productId`: ObjectId (reference to Product)
- `name`: String (required)
- `email`: String (required)
- `rating`: Number 1-5 (required)
- `title`: String (required)
- `comment`: String (required)
- `verified`: Boolean (default: false)
- `helpfulCount`: Number (default: 0)
- `createdAt`: Date
- `updatedAt`: Date

### Appointment
- `_id`: ObjectId
- `productId`: ObjectId (reference to Product)
- `firstName`: String (required)
- `lastName`: String (required)
- `email`: String (required)
- `phone`: String (required)
- `date`: Date (required)
- `time`: String (required)
- `message`: String (optional)
- `status`: String (pending, confirmed, completed, cancelled)
- `createdAt`: Date
- `updatedAt`: Date

---

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `413` - File Too Large
- `500` - Server Error

---

## Features

### Image Compression
- Images are automatically compressed and optimized via Cloudinary
- Supported formats: JPEG, PNG, WebP, GIF
- Maximum 6 images per product
- Format conversion to WebP for better performance

### Video Support
- Multiple videos per product (up to 3)
- Automatic thumbnail generation
- Supported formats: MP4, WebM

### Content Blocks
Products support flexible content blocks:
```javascript
{
  type: 'text' | 'image' | 'video',
  content: string,
  order: number,
  alt?: string,
  caption?: string
}
```

### Validation
- Email validation on reviews and appointments
- Phone number validation on appointments
- Date validation (must be in future)
- Slug format validation (lowercase with hyphens)
- File type and size validation

---

## Frontend Integration Example

```typescript
// Using useProducts hook from frontend
const { createProduct, updateProduct, deleteProduct } = useProducts();

// Create product
const formData = new FormData();
formData.append('name', 'New Product');
formData.append('slug', 'new-product');
formData.append('category', 'couture');
// ... append other fields
formData.append('galleryImages', file1, file2);

await createProduct(formData);

// Create review
const response = await fetch('/api/products/product-slug/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com',
    rating: 5,
    title: 'Great!',
    comment: 'Loved it'
  })
});

// Book appointment
const response = await fetch('/api/products/product-slug/appointments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+91-9810000000',
    date: '2024-12-25',
    time: '14:00'
  })
});
```

---

## Performance Notes

- Products are indexed by slug, category, and tags for fast queries
- Reviews are indexed by productId and creation date
- Appointments are indexed by date and status
- Images and videos are stored in Cloudinary CDN for global distribution
- MongoDB indexing ensures fast retrieval even with large datasets

---

## Support

For issues or questions, check the error message in the response for details on what went wrong.
