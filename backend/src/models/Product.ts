import mongoose, { Schema, Document } from 'mongoose';

interface ContentBlock {
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
  alt?: string;
  caption?: string;
}

interface ProductImage {
  url: string;
  publicId: string;
  alt: string;
  type: 'banner' | 'gallery' | 'detail';
  order: number;
}

interface ProductVideo {
  url: string;
  publicId: string;
  thumbnail?: string;
  duration?: number;
  order: number;
}

interface ProductMetadata {
  material?: string;
  care?: string;
  dimensions?: string;
  weight?: string;
}

interface ProductSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: {
    content: ContentBlock[];
  };
  images: ProductImage[];
  videos?: ProductVideo[];
  category: string;
  price?: number;
  originalPrice?: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  metadata: ProductMetadata;
  seo: ProductSEO;
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema = new Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'video'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  alt: String,
  caption: String,
}, { _id: false });

const ProductImageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['banner', 'gallery', 'detail'],
    default: 'gallery',
  },
  order: {
    type: Number,
    required: true,
  },
}, { _id: false });

const ProductVideoSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  thumbnail: String,
  duration: Number,
  order: {
    type: Number,
    required: true,
  },
}, { _id: false });

const MetadataSchema = new Schema({
  material: String,
  care: String,
  dimensions: String,
  weight: String,
}, { _id: false });

const SEOSchema = new Schema({
  title: String,
  description: String,
  keywords: [String],
}, { _id: false });

const DescriptionSchema = new Schema({
  content: [ContentBlockSchema],
}, { _id: false });

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: DescriptionSchema,
      required: true,
    },
    images: {
      type: [ProductImageSchema],
      default: [],
    },
    videos: {
      type: [ProductVideoSchema],
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    price: Number,
    originalPrice: Number,
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    metadata: {
      type: MetadataSchema,
      default: {},
    },
    seo: {
      type: SEOSchema,
      default: {},
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: 'Review',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for slug lookups
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ createdAt: -1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
