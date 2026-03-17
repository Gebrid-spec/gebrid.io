import React from 'react';

const ICONS = {
  ETH: '⟠', BTC: '₿', SOL: '◎', USDT: '₮', USDC: '$',
  MATIC: '⬡', ARB: 'A', OP: 'O',
};

export default function PriceTicker({ prices, changes24h, loading }) {
  if (loading) {
    return (
      <div style={{
        display: "flex", gap: 16, padding: "6px 16px",
        background: "#0d0d14", borderBottom: "1px solid #1F2937",
        fontSize: 11, color: "#555"
      }}>
        Loading prices...
      </div>
    );
  }

  const tokens = Object.keys(prices);
  if (tokens.length === 0) return null;

  return (
    <div style={{
      display: "flex", gap: 16, padding: "6px 16px",
      background: "#0d0d14", borderBottom: "1px solid #1F2937",
      overflowX: "auto", flexShrink: 0
    }}>
      <span style={{ fontSize: 10, color: "#555", alignSelf: "center", whiteSpace: "nowrap" }}>
        LIVE
      </span>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: "#A3FF12",
        alignSelf: "center", animation: "pulse 2s infinite"
      }} />

      {tokens.map(symbol => {
        const price = prices[symbol];
        const change = changes24h[symbol];
        const isUp = change >= 0;

        return (
          <div key={symbol} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, whiteSpace: "nowrap"
          }}>
            <span style={{ color: "#666" }}>{ICONS[symbol] || ''}</span>
            <span style={{ color: "#ccc", fontWeight: 600 }}>{symbol}</span>
            <span style={{ color: "#fff", fontFamily: "monospace" }}>
              ${price >= 1 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                : price.toFixed(4)}
            </span>
            {change !== undefined && (
              <span style={{
                color: isUp ? "#A3FF12" : "#FF5252",
                fontSize: 10, fontWeight: 600
              }}>
                {isUp ? "+" : ""}{change.toFixed(1)}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
