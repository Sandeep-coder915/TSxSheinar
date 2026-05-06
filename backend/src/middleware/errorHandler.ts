import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('Error:', err);

  // Multer errors
  if (err.message && err.message.includes('File too large')) {
    return res.status(413).json({
      success: false,
      message: 'File too large',
    });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid file type. Only images and videos are allowed.',
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors)
      .map((e: any) => e.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message: messages,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}
