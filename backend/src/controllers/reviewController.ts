import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { Product } from '../models/Product';

export async function getProductReviews(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const reviews = await Review.find({ productId: product._id })
      .sort({ createdAt: -1 });

    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      count: reviews.length,
      avgRating,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching reviews',
    });
  }
}

export async function createReview(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const { name, email, rating, title, comment } = req.body;

    // Validate required fields
    if (!name || !email || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const review = new Review({
      productId: product._id,
      name,
      email,
      rating: parseInt(rating),
      title,
      comment,
      verified: false,
    });

    await review.save();

    // Add review to product
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating review',
    });
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const { reviewId } = req.params;
    const { name, email, rating, title, comment } = req.body;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { name, email, rating, title, comment },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating review',
    });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Remove review from product
    await Product.findByIdAndUpdate(review.productId, {
      $pull: { reviews: reviewId },
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting review',
    });
  }
}

export async function markReviewAsVerified(req: Request, res: Response) {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { verified: true },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review marked as verified',
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error verifying review',
    });
  }
}
