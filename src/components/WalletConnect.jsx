import React from 'react';
import { Card, Btn } from './ui';

export default function WalletConnect({ wallet }) {
  const { connect, connecting, error, hasWallet } = wallet;

  return (
    <div style={{
      background: "#0A0A0A", minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter',system-ui,sans-serif", color: "#fff"
    }}>
      <div style={{ textAlign: "center", maxWidth: 440 }}>
        <div style={{ fontSize: 44, fontWeight: 900, color: "#A3FF12", marginBottom: 4, letterSpacing: -2 }}>
          GEBRID
        </div>
        <div style={{ fontSize: 13, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 32 }}>
          AI-Native Infrastructure for Web3 Capital
        </div>

        <Card style={{ padding: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>Connect Wallet</h2>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 24px" }}>
            Institutional AI Capital Management · $450M AUM · Revenue Y3: $500M+
          </p>

          {hasWallet ? (
            <>
              <Btn
                primary
                onClick={connect}
                disabled={connecting}
                style={{ width: "100%", padding: 14, fontSize: 15, marginBottom: 12 }}
              >
                {connecting ? 'Connecting...' : 'Connect MetaMask'}
              </Btn>

              {error && (
                <div style={{
                  fontSize: 12, color: "#FF5252", marginBottom: 12,
                  padding: "8px 12px", background: "#2a0a0a", borderRadius: 8
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                {["MetaMask", "WalletConnect", "Coinbase"].map(w => (
                  <span key={w} style={{
                    fontSize: 11, color: w === "MetaMask" ? "#A3FF12" : "#666",
                    padding: "4px 10px", borderRadius: 4,
                    background: w === "MetaMask" ? "#A3FF1220" : "#1F2937",
                    fontWeight: w === "MetaMask" ? 600 : 400
                  }}>
                    {w} {w === "MetaMask" ? "✓" : "soon"}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{
                padding: 20, background: "#1F2937", borderRadius: 12,
                marginBottom: 16, border: "1px solid #374151"
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🦊</div>
                <p style={{ fontSize: 13, color: "#ccc", margin: "0 0 12px" }}>
                  No Web3 wallet detected
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block", padding: "10px 24px",
                    background: "#A3FF12", color: "#000", borderRadius: 8,
                    fontSize: 13, fontWeight: 700, textDecoration: "none"
                  }}
                >
                  Install MetaMask
                </a>
              </div>

              <Btn
                onClick={() => {
                  // Demo mode fallback
                  wallet.connect();
                }}
                style={{ width: "100%", padding: 12, fontSize: 13, border: "1px solid #333" }}
              >
                Enter Demo Mode
              </Btn>
            </>
          )}
        </Card>

        <p style={{ fontSize: 11, color: "#555", marginTop: 16 }}>
          {hasWallet ? 'Mainnet · Investor Demo' : 'Install a wallet for full experience'}
        </p>
      </div>
    </div>
  );
}
