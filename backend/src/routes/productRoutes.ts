import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
} from '../controllers/productController';
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markReviewAsVerified,
} from '../controllers/reviewController';
import {
  getAppointments,
  getProductAppointments,
  createAppointment,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'video/mp4',
      'video/webm',
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Product Routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:slug', getProductBySlug);
router.post(
  '/',
  upload.fields([
    { name: 'bannerImages', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 },
    { name: 'videos', maxCount: 3 },
  ]),
  createProduct
);
router.put(
  '/:slug',
  upload.fields([
    { name: 'bannerImages', maxCount: 1 },
    { name: 'galleryImages', maxCount: 5 },
    { name: 'videos', maxCount: 3 },
  ]),
  updateProduct
);
router.delete('/:slug', deleteProduct);

// Review Routes
router.get('/:slug/reviews', getProductReviews);
router.post('/:slug/reviews', createReview);
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);
router.patch('/reviews/:reviewId/verify', markReviewAsVerified);

// Appointment Routes
router.get('/appointments/list', getAppointments);
router.get('/:slug/appointments', getProductAppointments);
router.post('/:slug/appointments', createAppointment);
router.put('/appointments/:appointmentId', updateAppointment);
router.patch('/appointments/:appointmentId/status', updateAppointmentStatus);
router.delete('/appointments/:appointmentId', deleteAppointment);

export default router;
