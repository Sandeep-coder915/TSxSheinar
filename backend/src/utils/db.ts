import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to your environment variables.');
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('✓ MongoDB Atlas connected');
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log('✓ MongoDB disconnected');
}
