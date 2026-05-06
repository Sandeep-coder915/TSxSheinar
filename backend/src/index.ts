import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase } from './utils/db';

dotenv.config();

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
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
