import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      trim: true,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ productId: 1, createdAt: -1 });
ReviewSchema.index({ email: 1 });

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
