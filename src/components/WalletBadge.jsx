import React, { useState } from 'react';

export default function WalletBadge({ wallet }) {
  const [open, setOpen] = useState(false);
  const { shortAddr, balance, chainInfo, disconnect } = wallet;

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "6px 12px", borderRadius: 8,
          background: "#1F2937", cursor: "pointer",
          border: "1px solid #374151", fontSize: 12,
          transition: "border-color 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "#A3FF12"}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = "#374151"; }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#A3FF12"
        }} />
        <span style={{ color: "#fff", fontWeight: 600, fontFamily: "monospace" }}>
          {shortAddr}
        </span>
        {chainInfo && (
          <span style={{
            fontSize: 10, color: "#A3FF12", background: "#A3FF1215",
            padding: "1px 6px", borderRadius: 4, fontWeight: 600
          }}>
            {chainInfo.name}
          </span>
        )}
      </div>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0,
          background: "#111827", border: "1px solid #374151", borderRadius: 12,
          padding: 16, minWidth: 220, zIndex: 100,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
        }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Balance</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            {balance ? `${parseFloat(balance).toFixed(4)} ${chainInfo?.symbol || 'ETH'}` : '—'}
          </div>

          <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>Address</div>
          <div style={{
            fontSize: 11, fontFamily: "monospace", color: "#ccc",
            wordBreak: "break-all", marginBottom: 16
          }}>
            {wallet.address}
          </div>

          <button
            onClick={() => { disconnect(); setOpen(false); }}
            style={{
              width: "100%", padding: "8px 0", borderRadius: 8,
              background: "transparent", border: "1px solid #FF5252",
              color: "#FF5252", fontSize: 12, cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
