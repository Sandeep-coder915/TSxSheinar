import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI.replace(/:([^:@]{4})[^:@]*@/, ':****@'));

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');

    // Test database access
    const db = mongoose.connection.db;
    const collections = await db.collections();
    console.log('Available collections:', collections.map(c => c.collectionName));

    await mongoose.disconnect();
    console.log('✅ Connection test completed');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check your password in MongoDB Atlas');
    console.log('2. Add your IP address to the whitelist (0.0.0.0/0 for testing)');
    console.log('3. Verify database user permissions');
    console.log('4. Check if cluster is paused');
  }
};

testConnection();