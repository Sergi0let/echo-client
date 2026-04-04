import { clerkMiddleware } from '@hono/clerk-auth';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { shouldBeUser } from './middleware/authMiddleware.js';
import stripe from './utils/stripe.js';

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

// app.post('/create-stripe-product', shouldBeUser, async (c) => {
//   const res = await stripe.products.create({
//     id: '123',
//     name: 'Test Product',
//     default_price_data: {
//       currency: 'usd',
//       unit_amount: 100,
//     },
//   });

//   return c.json({
//     status: 'ok',
//     message: 'Stripe product created',
//     product: res,
//   });
// });

// app.get('/stripe-product-price', shouldBeUser, async (c) => {
//   const res = await stripe.prices.list({ product: '123' });
//   console.log(res);

//   return c.json({
//     status: 'ok',
//     message: 'Stripe product price list',
//     product: res,
//   });
// });

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
