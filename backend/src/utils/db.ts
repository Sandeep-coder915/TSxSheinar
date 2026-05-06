import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || process.env.mongodb_uri || process.env.MONGODB_FALLBACK_URI || process.env.MONGODB_URI_LOCAL;

  if (!uri) {
    throw new Error('No MongoDB URI found. Set MONGODB_URI in your .env file.');
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('✓ MongoDB connected:', uri.includes('mongodb+srv') ? 'Atlas' : 'Local');
}
