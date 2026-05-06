import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { Product } from '../models/Product';

export async function getAppointments(req: Request, res: Response) {
  try {
    const { status, date } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (date) {
      const startDate = new Date(date as string);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const appointments = await Appointment.find(filter)
      .populate('productId')
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching appointments',
    });
  }
}

export async function getProductAppointments(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const appointments = await Appointment.find({ productId: product._id })
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error fetching appointments',
    });
  }
}

export async function createAppointment(req: Request, res: Response) {
  try {
    const { slug } = req.params;
    const { firstName, lastName, email, phone, date, time, message, occasion, preferredLocation } = req.body;

    if (!firstName || !lastName || !email || !phone || !date || !time || !occasion || !preferredLocation) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    let productId = undefined;
    let productName = undefined;

    if (slug && slug !== 'general') {
      const product = await Product.findOne({ slug });
      if (product) {
        productId = product._id;
        productName = product.name;
      }
    }

    const appointment = new Appointment({
      productId,
      productName,
      firstName,
      lastName,
      email,
      phone,
      occasion,
      preferredLocation,
      date: new Date(date),
      time,
      message: message || '',
      status: 'pending',
    });

    await appointment.save();

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error creating appointment' });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment status updated',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating appointment',
    });
  }
}

export async function updateAppointment(req: Request, res: Response) {
  try {
    const { appointmentId } = req.params;
    const { firstName, lastName, email, phone, date, time, message } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        firstName,
        lastName,
        email,
        phone,
        date: date ? new Date(date) : undefined,
        time,
        message,
      },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating appointment',
    });
  }
}

export async function deleteAppointment(req: Request, res: Response) {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting appointment',
    });
  }
}
