import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI || process.env.mongodb_uri || process.env.MONGODB_FALLBACK_URI || process.env.MONGODB_URI_LOCAL;

  // Use in-memory database if explicitly requested
  if (process.env.USE_MEMORY_DB === 'true') {
    console.log('🔄 Starting in-memory MongoDB server...');
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    console.log('✓ In-memory MongoDB started at:', mongoUri);

    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB connected: In-Memory');
    return;
  }

  if (!uri) {
    throw new Error('No MongoDB URI found. Set MONGODB_URI in your .env file or USE_MEMORY_DB=true for in-memory database.');
  }

  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
  console.log('✓ MongoDB connected:', uri.includes('mongodb+srv') ? 'Atlas' : 'Local');
}

export async function disconnectDatabase() {
  if (mongoServer) {
    await mongoServer.stop();
    console.log('✓ In-memory MongoDB stopped');
  }
  await mongoose.disconnect();
}
