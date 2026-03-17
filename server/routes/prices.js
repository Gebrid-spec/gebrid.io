const COINGECKO = 'https://api.coingecko.com/api/v3';

let cache = { data: null, ts: 0 };
const TTL = 30_000; // 30s cache

export async function pricesRoutes(app) {
  app.get('/prices', async (req, reply) => {
    const now = Date.now();

    if (cache.data && now - cache.ts < TTL) {
      return cache.data;
    }

    try {
      const ids = 'ethereum,bitcoin,solana,tether,usd-coin,matic-network,arbitrum,optimism';
      const res = await fetch(
        `${COINGECKO}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
      );
      if (!res.ok) throw new Error(`CoinGecko: ${res.status}`);
      const data = await res.json();

      cache = { data, ts: now };
      return data;
    } catch (err) {
      reply.code(502);
      return { error: 'Failed to fetch prices', detail: err.message };
    }
  });

  app.get('/prices/history/:token', async (req, reply) => {
    const { token } = req.params;
    const days = req.query.days || 30;

    try {
      const res = await fetch(
        `${COINGECKO}/coins/${token}/market_chart?vs_currency=usd&days=${days}`
      );
      if (!res.ok) throw new Error(`CoinGecko: ${res.status}`);
      return await res.json();
    } catch (err) {
      reply.code(502);
      return { error: 'Failed to fetch history', detail: err.message };
    }
  });
}
