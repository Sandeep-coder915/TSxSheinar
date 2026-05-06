import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';
import { connectDatabase } from './utils/db';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow all localhost origins in development
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
  });
});

// Routes
app.use('/api/products', productRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server ONLY after DB connects
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
