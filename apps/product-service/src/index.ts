import { clerkMiddleware, getAuth } from '@clerk/express';
import cors from 'cors';
import express, { Request, Response } from 'express';

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

app.get('/test', (req, res) => {
  const auth = getAuth(req);
  console.log(auth);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).json({ message: 'You are not logged in!' });
  }
  res.json({ message: 'Product service authenticated' });
});

app.listen(8000, () => {
  console.log('Product Service is running 8000');
});
