import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  productId?: mongoose.Types.ObjectId;
  productName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occasion: string;
  preferredLocation: string;
  date: Date;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: false,
      index: true,
    },
    productName: { type: String, trim: true },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
      index: true,
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    occasion: {
      type: String,
      required: [true, 'Occasion is required'],
      trim: true,
    },
    preferredLocation: {
      type: String,
      required: [true, 'Preferred location is required'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

AppointmentSchema.index({ date: 1, status: 1 });
AppointmentSchema.index({ email: 1 });

export const Appointment = mongoose.model<IAppointment>(
  'Appointment',
  AppointmentSchema
);
