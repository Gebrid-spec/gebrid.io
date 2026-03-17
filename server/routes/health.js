export async function healthRoutes(app) {
  app.get('/health', async () => ({
    status: 'ok',
    service: 'gebrid-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));
}
