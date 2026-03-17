import React, { useState, useEffect, useCallback } from 'react';
import { SideItem, Card, Btn } from './components/ui';
import { useWallet } from './hooks/useWallet';
import { usePrices } from './hooks/usePrices';
import WalletConnect from './components/WalletConnect';
import WalletBadge from './components/WalletBadge';
import PriceTicker from './components/PriceTicker';
import DashboardView from './views/DashboardView';
import AIConsoleView from './views/AIConsoleView';
import PipelineView from './views/PipelineView';
import ShieldedRoundsView from './views/ShieldedRoundsView';
import VestingNFTView from './views/VestingNFTView';
import MarketplaceView from './views/MarketplaceView';
import RiskView from './views/RiskView';
import AnalyticsView from './views/AnalyticsView';
import GameFiView from './views/GameFiView';
import StakingView from './views/StakingView';
import GuardView from './views/GuardView';
import ZKPrivacyView from './views/ZKPrivacyView';
import DePCView from './views/DePCView';
import TokenomicsView from './views/TokenomicsView';
import BuilderView from './views/BuilderView';

function App() {
  const [view, setView] = useState("dashboard");
  const [selStrat, setSelStrat] = useState(null);
  const [time, setTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const wallet = useWallet();
  const { prices, changes24h, loading: pricesLoading } = usePrices();

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const NAV = [
    { id: "dashboard", icon: "▧", label: "Dashboard" },
    { id: "ai", icon: "🤖", label: "AI Console", badge: "AI" },
    { id: "pipeline", icon: "⚡", label: "Pipeline" },
    { id: "marketplace", icon: "⭐", label: "Marketplace" },
    { id: "vesting", icon: "🔖", label: "Vesting NFT", badge: "NEW" },
    { id: "shielded", icon: "🔒", label: "Shielded Rounds", badge: "ZK" },
    { id: "tokenomics", icon: "📊", label: "Tokenomics", badge: "NEW" },
    { id: "zkprivacy", icon: "🔐", label: "ZK Privacy" },
    { id: "gamefi", icon: "🎮", label: "GameFi", badge: "NEW" },
    { id: "risk", icon: "🛡️", label: "Risk Monitor" },
    { id: "guard", icon: "🔒", label: "Guard Agents", badge: "5" },
    { id: "analytics", icon: "📊", label: "Analytics" },
    { id: "staking", icon: "💎", label: "Staking" },
    { id: "builder", icon: "⚙️", label: "Agent Builder" },
    { id: "depc", icon: "🎵", label: "DePC", badge: "NEW" },
  ];

  if (!wallet.connected) return <WalletConnect wallet={wallet} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0A0A0A", fontFamily: "'Inter',system-ui,sans-serif", color: "#E0E0E0" }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 210 : 56,
        background: "#0d0d14",
        borderRight: "1px solid #1F2937",
        padding: "16px 0",
        display: "flex", flexDirection: "column", flexShrink: 0,
        position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        transition: "width 0.2s ease"
      }}>
        <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #1F2937", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <img
              src="/logo.jpg"
              alt="GEBRID"
              style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }}
            />
            {sidebarOpen && (
              <div style={{ fontSize: 20, fontWeight: 800, color: "#A3FF12", letterSpacing: -0.5 }}>GEBRID</div>
            )}
          </div>
          {sidebarOpen && (
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>Agent OS v2.0</div>
          )}
        </div>

        <div style={{ flex: 1, paddingTop: 4 }}>
          {NAV.map(n => (
            <SideItem
              key={n.id}
              icon={n.icon}
              label={sidebarOpen ? n.label : ""}
              badge={sidebarOpen ? n.badge : null}
              active={view === n.id}
              onClick={() => { if (n.id === "builder") setSelStrat(null); setView(n.id); }}
            />
          ))}
        </div>

        {/* Wallet status in sidebar */}
        <div style={{ padding: "10px 16px", borderTop: "1px solid #1F2937" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#A3FF12", boxShadow: "0 0 6px #A3FF12" }} />
            {sidebarOpen && <span style={{ fontSize: 11, color: "#A3FF12" }}>Connected</span>}
          </div>
          {sidebarOpen && (
            <>
              <div style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>{wallet.shortAddr}</div>
              <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>
                {wallet.chainInfo?.name || 'Unknown Chain'}
              </div>
              {wallet.balance && (
                <div style={{ fontSize: 10, color: "#A3FF12", marginTop: 2, fontFamily: "monospace" }}>
                  {parseFloat(wallet.balance).toFixed(4)} {wallet.chainInfo?.symbol || 'ETH'}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Price ticker */}
        <PriceTicker prices={prices} changes24h={changes24h} loading={pricesLoading} />

        {/* Top bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 24px", borderBottom: "1px solid #1F2937",
          background: "#0d0d14", position: "sticky", top: 0, zIndex: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: "none", border: "none", color: "#666",
                cursor: "pointer", fontSize: 16, padding: 4
              }}
            >
              ☰
            </button>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>
              {NAV.find(n => n.id === view)?.label || ""}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, color: "#666", fontFamily: "monospace" }}>
              {time.toLocaleTimeString()}
            </span>
            <span style={{ padding: "3px 8px", borderRadius: 4, background: "#1a2332", color: "#5BA3E6", fontSize: 11 }}>
              v2.0-beta
            </span>
            <WalletBadge wallet={wallet} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {view === "dashboard" && <DashboardView prices={prices} />}
          {view === "ai" && <AIConsoleView />}
          {view === "pipeline" && <PipelineView />}
          {view === "marketplace" && <MarketplaceView onDeploy={s => { setSelStrat(s); setView("builder"); }} />}
          {view === "vesting" && <VestingNFTView />}
          {view === "shielded" && <ShieldedRoundsView />}
          {view === "tokenomics" && <TokenomicsView />}
          {view === "zkprivacy" && <ZKPrivacyView />}
          {view === "gamefi" && <GameFiView />}
          {view === "risk" && <RiskView />}
          {view === "guard" && <GuardView />}
          {view === "analytics" && <AnalyticsView />}
          {view === "staking" && <StakingView />}
          {view === "builder" && <BuilderView strategy={selStrat} onBack={() => setView("dashboard")} />}
          {view === "depc" && <DePCView />}
        </div>
      </div>
    </div>
  );
}

export default App;
