import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
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
