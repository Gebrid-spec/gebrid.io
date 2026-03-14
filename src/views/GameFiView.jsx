import React, { useState } from 'react';
import { Card, StatusDot } from '../components/ui';
import { GAMEFI_WORLDS } from '../data/mockData';

function GameFiView() {
  const [expanded, setExpanded] = useState(null);
  const tierInfo = {
    production:{label:"PRODUCTION",color:"#A3FF12",bg:"#0d2818",desc:"Fully on-chain. Smart contract interaction via ethers.js."},
    beta:{label:"BETA",color:"#FF9800",bg:"#2a1f00",desc:"DeFi-layer automation. No gameplay bots."},
    rd:{label:"R&D",color:"#5BA3E6",bg:"#0a1a2a",desc:"Research phase. Mapping on-chain extractable value."}
  };
  return <div>
    <div style={{marginBottom:20}}>
      <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:0}}>🎮 GameFi & Metaverse Agents</h2>
      <p style={{fontSize:13,color:"#888",margin:"4px 0 0"}}>Autonomous on-chain agents for virtual world asset management</p>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
      <Metric label="Worlds Active" value="5" sub="of 6"/><Metric label="Land Value" value="8,450 ETH" trend={28.4}/><Metric label="DeFi Yield (24h)" value="$84.7K" trend={11.2}/><Metric label="On-chain Agents" value="22" sub="autonomous"/>
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      {Object.entries(tierInfo).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:6,background:v.bg,border:`1px solid ${v.color}30`}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:v.color}}/>
        <span style={{fontSize:11,fontWeight:600,color:v.color}}>{v.label}</span>
        <span style={{fontSize:11,color:"#888"}}>{v.desc}</span>
      </div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16,marginBottom:16}}>
      {GAMEFI_WORLDS.map((w,i)=>{const t=tierInfo[w.tier];return <Card key={i} onClick={()=>setExpanded(expanded===i?null:i)}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:28}}>{w.icon}</span>
            <div><div style={{fontSize:15,fontWeight:700,color:"#fff"}}>{w.name}</div><div style={{fontSize:11,color:"#888"}}>{w.agents} agents</div></div>
          </div>
          <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:t.bg,color:t.color,border:`1px solid ${t.color}40`}}>{t.label}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
          <div><div style={{fontSize:10,color:"#666"}}>VALUE</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{w.value}</div></div>
          <div><div style={{fontSize:10,color:"#666"}}>LANDS</div><div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{w.lands||"—"}</div></div>
          <div><div style={{fontSize:10,color:"#666"}}>P&L</div><div style={{fontSize:13,fontWeight:700,color:"#A3FF12"}}>{w.pnl}</div></div>
        </div>
        <div style={{padding:"8px 10px",borderRadius:6,background:"#0d1520",border:"1px solid #1F2937"}}>
          <div style={{fontSize:10,color:"#666",marginBottom:2}}>CURRENT ACTIVITY</div>
          <div style={{fontSize:12,color:"#E040FB"}}>{w.activity}</div>
        </div>
        {expanded===i&&<div style={{marginTop:10,padding:"10px 12px",borderRadius:6,background:"#0A0A0A",border:`1px solid ${t.color}30`}}>
          <div style={{fontSize:10,color:t.color,fontWeight:600,marginBottom:4}}>HOW IT WORKS</div>
          <div style={{fontSize:12,color:"#ccc",lineHeight:1.5}}>{w.how}</div>
        </div>}
      </Card>;})}
    </div>
    <Card>
      <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Architecture: Three-Layer GameFi Stack</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          {n:"Layer 1: On-Chain Assets",c:"#A3FF12",items:["NFT/Land buy & sell","Marketplace sniping","Floor price monitoring","Automated bidding"],status:"Production"},
          {n:"Layer 2: DeFi Extraction",c:"#FF9800",items:["Reward claiming","Staking optimization","Auto-compounding","Token bridge management"],status:"Beta"},
          {n:"Layer 3: Gameplay AI",c:"#5BA3E6",items:["Battle automation","Quest completion","Resource farming","TOS compliance engine"],status:"R&D / Roadmap"},
        ].map((l,i)=><div key={i} style={{padding:12,borderRadius:8,background:"#111827",border:`1px solid ${l.c}30`}}>
          <div style={{fontSize:12,fontWeight:700,color:l.c,marginBottom:6}}>{l.n}</div>
          {l.items.map((item,j)=><div key={j} style={{fontSize:11,color:"#999",padding:"2px 0",display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:l.c,fontSize:8}}>●</span>{item}
          </div>)}
          <div style={{marginTop:8,fontSize:10,fontWeight:600,color:l.c,padding:"2px 8px",borderRadius:4,background:`${l.c}15`,display:"inline-block"}}>{l.status}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}

export default GameFiView;
