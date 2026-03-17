import { useState, useEffect, useCallback } from 'react';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const TOKEN_IDS = {
  ETH: 'ethereum',
  BTC: 'bitcoin',
  MATIC: 'matic-network',
  ARB: 'arbitrum',
  OP: 'optimism',
  SOL: 'solana',
  USDT: 'tether',
  USDC: 'usd-coin',
};

const REFRESH_INTERVAL = 60_000; // 1 minute

export function usePrices(tokens = ['ETH', 'BTC', 'SOL', 'USDT', 'USDC']) {
  const [prices, setPrices] = useState({});
  const [changes24h, setChanges24h] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrices = useCallback(async () => {
    const ids = tokens
      .map(t => TOKEN_IDS[t])
      .filter(Boolean)
      .join(',');

    if (!ids) return;

    try {
      const res = await fetch(
        `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
      const data = await res.json();

      const priceMap = {};
      const changeMap = {};
      for (const [symbol, id] of Object.entries(TOKEN_IDS)) {
        if (data[id]) {
          priceMap[symbol] = data[id].usd;
          changeMap[symbol] = data[id].usd_24h_change;
        }
      }
      setPrices(priceMap);
      setChanges24h(changeMap);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tokens]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { prices, changes24h, loading, lastUpdated, error, refetch: fetchPrices };
}
