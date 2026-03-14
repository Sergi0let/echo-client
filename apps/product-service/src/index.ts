import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { shouldBeUser } from './middleware/authMiddleware.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';

const app = express();
const port = Number(process.env.PORT ?? 8004);

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3003'],
    credentials: true,
  })
);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use(express.json());
app.get('/test', clerkMiddleware(), shouldBeUser, (req, res) => {
  res.json({
    status: 'ok',
    message: 'Product service is authenticated',
    userId: req.userId,
    timestamp: Date.now(),
  });
});

app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || 'Inter Server Error' });
});

app.listen(port, () => {
  console.log(`Product Service is running on port ${port}`);
});
