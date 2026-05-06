import { Request, Response, NextFunction } from 'express';

export function validateProductInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, slug, category } = req.body;

  if (!name || !slug || !category) {
    return res.status(400).json({
      success: false,
      message: 'Name, slug, and category are required',
    });
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Product name must be a non-empty string',
    });
  }

  if (typeof slug !== 'string' || slug.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Product slug must be a non-empty string',
    });
  }

  // Slug format validation
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return res.status(400).json({
      success: false,
      message: 'Slug must be lowercase with hyphens only',
    });
  }

  next();
}

export function validateReviewInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, rating, title, comment } = req.body;

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

  next();
}

export function validateAppointmentInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, phone, date, time } = req.body;

  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be provided',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
  }

  // Phone validation (basic)
  if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number',
    });
  }

  // Date validation
  const appointmentDate = new Date(date);
  if (isNaN(appointmentDate.getTime()) || appointmentDate < new Date()) {
    return res.status(400).json({
      success: false,
      message: 'Invalid date or date must be in the future',
    });
  }

  next();
}
