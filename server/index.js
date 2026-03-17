import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from 'dotenv';
import { pricesRoutes } from './routes/prices.js';
import { aiRoutes } from './routes/ai.js';
import { healthRoutes } from './routes/health.js';

config();

const PORT = process.env.PORT || 3001;

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: ['http://localhost:5173', 'https://gebrid.io'],
  methods: ['GET', 'POST'],
});

// Routes
await app.register(healthRoutes, { prefix: '/api' });
await app.register(pricesRoutes, { prefix: '/api' });
await app.register(aiRoutes, { prefix: '/api' });

try {
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`GEBRID API running on port ${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
