import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

const connectToMongo = async (uri: string) => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

export async function connectDatabase() {
  const atlasUri = process.env.MONGODB_URI || process.env.mongodb_uri;
  const localUri = process.env.MONGODB_FALLBACK_URI || process.env.MONGODB_URI_LOCAL;

  // Try Atlas connection
  if (atlasUri && process.env.USE_MEMORY_DB !== 'true') {
    try {
      await connectToMongo(atlasUri);
      console.log('✓ MongoDB Atlas connected');
      return;
    } catch (error) {
      console.error('Failed to connect to MongoDB Atlas:', error instanceof Error ? error.message : error);
      console.log('Falling back to next available option...');
    }
  }

  // Try local MongoDB
  if (localUri) {
    try {
      await connectToMongo(localUri);
      console.log('✓ Local MongoDB connected');
      return;
    } catch (error) {
      console.error('Failed to connect to local MongoDB:', error instanceof Error ? error.message : error);
    }
  }

  // Fallback to in-memory MongoDB
  try {
    console.log('Starting in-memory MongoDB (fallback)...');
    mongoServer = await MongoMemoryServer.create();
    const memoryUri = mongoServer.getUri();
    await connectToMongo(memoryUri);
    console.log('✓ In-Memory MongoDB connected (data will not persist)');
  } catch (error) {
    throw new Error('Could not connect to any MongoDB instance.');
  }
}
