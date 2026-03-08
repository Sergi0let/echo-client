import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3003'],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get('/test', shouldBeUser, (req, res) => {
  res.json({
    status: 'ok',
    message: 'Product service is authenticated',
    userId: req.userId,
    timestamp: Date.now(),
  });
});

app.listen(8000, () => {
  console.log('Product Service is running 8000');
});
