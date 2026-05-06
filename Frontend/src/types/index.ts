export interface ContentBlock {
  type: 'text' | 'image' | 'video';
  content: string;
  order: number;
  alt?: string;
  caption?: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
  alt: string;
  type: 'banner' | 'gallery' | 'detail';
  order: number;
}

export interface ProductVideo {
  url: string;
  publicId: string;
  thumbnail?: string;
  duration?: number;
  order: number;
}

export interface ProductMetadata {
  material?: string;
  care?: string;
  dimensions?: string;
  weight?: string;
}

export interface ProductManufacturers {
  name?: string;
  origin?: string;
  artisan?: string;
  workshop?: string;
  craftTradition?: string;
}

export interface ProductSeo {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: { content: ContentBlock[] };
  images: ProductImage[];
  videos?: ProductVideo[];
  category: string;
  price?: number;
  originalPrice?: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
  metadata: ProductMetadata;
  manufacturers?: ProductManufacturers;
  seo: ProductSeo;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
