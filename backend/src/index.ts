import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase, disconnectDatabase } from './utils/db';

// In production (Render), env vars are injected by the platform — skip dotenv
// In development, load from .env.development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

console.log(`✓ Server starting (NODE_ENV=${process.env.NODE_ENV})`);

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// CORS — must be first, before any routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running' });
});

// Routes
app.use('/api/products', productRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    console.log('✓ MongoDB connected successfully');
    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      server.close(async () => {
        await disconnectDatabase();
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      server.close(async () => {
        await disconnectDatabase();
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
