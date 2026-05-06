import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { Review } from '../models/Review';
import {
  uploadImage,
  uploadVideo,
  deleteFromCloudinary,
} from '../utils/cloudinary';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const { category, featured, inStock } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (inStock === 'true') filter.inStock = true;

    const products = await Product.find(filter)
      .populate('reviews')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching products',
    });
  }
}

export async function getProductBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .populate({
        path: 'reviews',
        options: { sort: { createdAt: -1 } },
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching product',
    });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const {
      name,
      slug,
      category,
      price,
      originalPrice,
      inStock,
      featured,
      description,
      metadata,
      manufacturers,
      seo,
      tags,
    } = req.body;

    // Validate required fields
    if (!name || !slug || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, slug, and category are required',
      });
    }

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this slug already exists',
      });
    }

    const files = req.files as {
      bannerImages?: Express.Multer.File[];
      galleryImages?: Express.Multer.File[];
      videos?: Express.Multer.File[];
      [key: string]: Express.Multer.File[] | undefined;
    };

    const images: any[] = [];
    const videos: any[] = [];

    // Upload banner images
    if (files?.bannerImages) {
      for (let i = 0; i < files.bannerImages.length; i++) {
        const file = files.bannerImages[i];
        console.log('Uploading banner image:', file.originalname, file.size);
        const uploaded: any = await uploadImage(file.buffer, `${slug}-banner-${i}`);
        images.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          alt: name,
          type: 'banner',
          order: i,
        });
      }
    }

    // Upload gallery images (max 6 total)
    if (files?.galleryImages) {
      for (let i = 0; i < files.galleryImages.length && images.length < 6; i++) {
        const file = files.galleryImages[i];
        console.log('Uploading gallery image:', file.originalname, file.size);
        const uploaded: any = await uploadImage(file.buffer, `${slug}-gallery-${i}`);
        images.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          alt: name,
          type: 'gallery',
          order: images.length - 1,
        });
      }
    }

    // Upload videos
    if (files?.videos) {
      for (let i = 0; i < files.videos.length; i++) {
        const file = files.videos[i];
        const uploaded: any = await uploadVideo(file.buffer, `${slug}-video-${i}`);
        videos.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          order: i,
        });
      }
    }

    // Parse description and replace contentImage_* file references with uploaded URLs
    let parsedDescription = description ? JSON.parse(description) : { content: [] };
    for (let i = 0; i < parsedDescription.content.length; i++) {
      const block = parsedDescription.content[i];
      if (block.type === 'image' && files?.[`contentImage_${i}`]?.[0]) {
        const file = files[`contentImage_${i}`]![0];
        const uploaded: any = await uploadImage(file.buffer, `${slug}-content-${i}`);
        parsedDescription.content[i].content = uploaded.secure_url;
      }
    }

    const product = new Product({
      name,
      slug,
      category,
      price: price ? parseFloat(price) : undefined,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      inStock: inStock !== undefined ? inStock === 'true' : true,
      featured: featured !== undefined ? featured === 'true' : false,
      description: parsedDescription,
      metadata: metadata ? JSON.parse(metadata) : {},
      manufacturers: manufacturers ? JSON.parse(manufacturers) : {},
      seo: seo ? JSON.parse(seo) : {},
      tags: tags ? JSON.parse(tags).filter((t: string) => t.trim() !== '') : [],
      images,
      videos,
      reviews: [],
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating product',
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const {
      name,
      category,
      price,
      originalPrice,
      inStock,
      featured,
      description,
      metadata,
      manufacturers,
      seo,
      tags,
    } = req.body;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Update basic fields
    if (name) product.name = name;
    if (category) product.category = category;
    if (price !== undefined && price !== '') product.price = parseFloat(price);
    if (originalPrice !== undefined && originalPrice !== '') product.originalPrice = parseFloat(originalPrice);
    if (inStock !== undefined) product.inStock = inStock === 'true';
    if (featured !== undefined) product.featured = featured === 'true';
    if (metadata) product.metadata = JSON.parse(metadata);
    if (manufacturers) (product as any).manufacturers = JSON.parse(manufacturers);
    if (seo) product.seo = JSON.parse(seo);
    if (tags) product.tags = JSON.parse(tags);

    const files = req.files as {
      bannerImages?: Express.Multer.File[];
      galleryImages?: Express.Multer.File[];
      videos?: Express.Multer.File[];
      [key: string]: Express.Multer.File[] | undefined;
    };

    // Handle content block image uploads
    if (description) {
      let parsedDescription = JSON.parse(description);
      for (let i = 0; i < parsedDescription.content.length; i++) {
        const block = parsedDescription.content[i];
        if (block.type === 'image' && files?.[`contentImage_${i}`]?.[0]) {
          const file = files[`contentImage_${i}`]![0];
          const uploaded: any = await uploadImage(file.buffer, `${slug}-content-${i}`);
          parsedDescription.content[i].content = uploaded.secure_url;
        }
      }
      product.description = parsedDescription;
    }

    // Handle new images
    if (files?.bannerImages || files?.galleryImages) {
      // Delete old images
      for (const image of product.images) {
        await deleteFromCloudinary(image.publicId);
      }
      product.images = [];

      // Upload banner images
      if (files?.bannerImages) {
        for (let i = 0; i < files.bannerImages.length; i++) {
          const file = files.bannerImages[i];
          const uploaded: any = await uploadImage(file.buffer, `${slug}-banner-${i}`);
          product.images.push({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            alt: name || product.name,
            type: 'banner',
            order: i,
          });
        }
      }

      // Upload gallery images
      if (files?.galleryImages) {
        for (let i = 0; i < files.galleryImages.length && product.images.length < 6; i++) {
          const file = files.galleryImages[i];
          const uploaded: any = await uploadImage(file.buffer, `${slug}-gallery-${i}`);
          product.images.push({
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            alt: name || product.name,
            type: 'gallery',
            order: product.images.length - 1,
          });
        }
      }
    }

    // Handle new videos
    if (files?.videos) {
      // Delete old videos
      for (const video of product.videos || []) {
        await deleteFromCloudinary(video.publicId);
      }
      product.videos = [];

      // Upload new videos
      for (let i = 0; i < files.videos.length; i++) {
        const file = files.videos[i];
        const uploaded: any = await uploadVideo(file.buffer, `${slug}-video-${i}`);
        product.videos!.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          order: i,
        });
      }
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating product',
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete all images from Cloudinary
    for (const image of product.images) {
      await deleteFromCloudinary(image.publicId);
    }

    // Delete all videos from Cloudinary
    for (const video of product.videos || []) {
      await deleteFromCloudinary(video.publicId);
    }

    // Delete all reviews
    await Review.deleteMany({ productId: product._id });

    // Delete product
    await Product.findByIdAndDelete(product._id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting product',
    });
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const { category } = req.params;

    const products = await Product.find({ category })
      .populate('reviews')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching products',
    });
  }
}

export async function getFeaturedProducts(req: Request, res: Response) {
  try {
    const products = await Product.find({ featured: true })
      .populate('reviews')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching products',
    });
  }
}
