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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
  },
});

// Accept bannerImages, galleryImages, videos + any contentImage_* fields
const uploadFields = upload.fields([
  { name: 'bannerImages', maxCount: 5 },
  { name: 'galleryImages', maxCount: 20 },
  { name: 'videos', maxCount: 3 },
  ...Array.from({ length: 20 }, (_, i) => ({ name: `contentImage_${i}`, maxCount: 1 })),
]);

// ── Static routes FIRST (before any /:slug) ──────────────────────────────────

// Product statics
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.post('/', uploadFields, createProduct);

// Review statics
router.put('/reviews/:reviewId', updateReview);
router.delete('/reviews/:reviewId', deleteReview);
router.patch('/reviews/:reviewId/verify', markReviewAsVerified);

// Appointment statics
router.get('/appointments/list', getAppointments);
router.post('/appointments/general', createAppointment);
router.put('/appointments/:appointmentId', updateAppointment);
router.patch('/appointments/:appointmentId/status', updateAppointmentStatus);
router.delete('/appointments/:appointmentId', deleteAppointment);

// ── Dynamic /:slug routes AFTER ──────────────────────────────────────────────

router.get('/:slug', getProductBySlug);
router.put('/:slug', uploadFields, updateProduct);
router.delete('/:slug', deleteProduct);

router.get('/:slug/reviews', getProductReviews);
router.post('/:slug/reviews', createReview);

router.get('/:slug/appointments', getProductAppointments);
router.post('/:slug/appointments', createAppointment);

export default router;
