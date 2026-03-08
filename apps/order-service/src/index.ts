import { clerkPlugin } from '@clerk/fastify';
import Fastify from 'fastify';
import { shouldBeUser } from './middleware/authMiddleware.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(clerkPlugin);

fastify.get('/health', (request, reply) => {
  return reply
    .status(200)
    .send({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

fastify.get('/test', { preHandler: shouldBeUser }, async (request, reply) => {
  return reply.status(200).send({
    status: 'ok',
    message: 'Order service is authenticated',
    
    timestamp: Date.now(),
  });
});
/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log('Order Service is running on port 8001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
