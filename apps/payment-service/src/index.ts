import { clerkMiddleware } from '@hono/clerk-auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { shouldBeUser } from './middleware/authMiddleware.js';

const app = new Hono();

app.use('*', clerkMiddleware());

app.get('/test', shouldBeUser, (c) => {
  return c.json({
    status: 'ok',
    message: 'Payment service is authenticated',
    userId: c.get('userId'),
    timestamp: Date.now(),
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const start = async () => {
  try {
    serve(
      {
        fetch: app.fetch,
        port: 8002,
      },
      (info) => {
        console.log(`Payment Service is running on port 8002`);
      }
    );
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

start();
