import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

interface UploadOptions {
  folder?: string;
  quality?: 'auto' | number;
  width?: number;
  height?: number;
  crop?: string;
  format?: string;
}

export async function uploadImage(
  fileBuffer: Buffer,
  filename: string,
  options: UploadOptions = {}
) {
  return new Promise((resolve, reject) => {
    const {
      folder = 'sheinar/products',
      quality = 'auto',
      width = 1024,
      format = 'webp',
    } = options;

    const uploadStream = getCloudinary().uploader.upload_stream(
      {
        folder,
        public_id: filename.split('.')[0],
        quality,
        fetch_format: format,
        width,
        crop: 'fill',
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = Readable.from(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
}

export async function uploadVideo(
  fileBuffer: Buffer,
  filename: string,
  folder = 'sheinar/videos'
) {
  return new Promise((resolve, reject) => {
    const uploadStream = getCloudinary().uploader.upload_stream(
      {
        folder,
        public_id: filename.split('.')[0],
        resource_type: 'video',
        quality: 'auto',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const bufferStream = Readable.from(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    return await getCloudinary().uploader.destroy(publicId, {
      resource_type: 'auto',
    });
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

export async function generateThumbnail(videoUrl: string, fileName: string) {
  try {
    const thumbnailUrl = getCloudinary().url(fileName, {
      resource_type: 'video',
      quality: 'auto',
      fetch_format: 'jpg',
      width: 320,
      height: 180,
      crop: 'fill',
    });
    return thumbnailUrl;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return null;
  }
}
