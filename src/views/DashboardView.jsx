import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { Card, Metric, StatusDot, RiskBadge, fmt } from '../components/ui';
import { PORT_HIST, DRAWDOWN, MONTHLY_RET, AGENTS, RISK_EVENTS, ALLOC } from '../data/mockData';

function DashboardView() {
  return <div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      <Metric label="Total AUM" value="$450M" trend={12.4} sub="30d growth"/>
      <Metric label="Active Agents" value="17,800" sub="across all strategies"/>
      <Metric label="24h P&L" value="+$3.82M" trend={0.85}/>
      <Metric label="Risk Score" value="78/100" sub="institutional"/>
      <Card style={{flex:"1 1 210px",background:"#0a0f1a",border:"1px solid #1a2a4a"}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{fontSize:13}}>🔒</span>
          <span style={{fontSize:11,color:"#5BA3E6",textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Private Rounds</span>
        </div>
        {[{label:"Angel Round",raised:"$350K",target:"$350K",pct:100,status:"SOLD OUT"},{label:"Pre-Seed Round",raised:"$300K",target:"$700K",pct:43,status:"RAISING"},{label:"Seed Round",raised:"—",target:"$1.6M",pct:0,status:"UPCOMING"}].map((r,i)=><div key={i} style={{marginBottom:i<2?8:0}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3}}>
            <span style={{color:"#aaa",fontWeight:600}}>{r.label}</span>
            <span style={{color:r.pct===100?"#FF5252":r.pct>0?"#FF9800":"#5BA3E6",fontFamily:"monospace",fontSize:10,fontWeight:700}}>{r.status}</span>
          </div>
          <div style={{background:"#1F2937",borderRadius:3,height:5,overflow:"hidden",marginBottom:3}}>
            <div style={{width:`${r.pct}%`,height:"100%",background:r.pct===100?"#FF5252":r.pct>0?"linear-gradient(90deg,#FF9800,#FFB74D)":"transparent",borderRadius:3}}/>
          </div>
          <div style={{fontSize:10,color:"#555"}}>{r.raised} / {r.target} · <span style={{color:"#5BA3E630"}}>identities shielded</span></div>
        </div>)}
        <div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
          <span style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:"#5BA3E620",color:"#5BA3E6",fontWeight:700,fontFamily:"monospace"}}>🔐 ZK-ENCRYPTED</span>
          <span style={{fontSize:10,color:"#555"}}>Aggregate only: public</span>
        </div>
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 260px",gap:16,marginBottom:16}}>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Portfolio Value (30d)</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={PORT_HIST}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A3FF12" stopOpacity={0.3}/><stop offset="95%" stopColor="#A3FF12" stopOpacity={0}/>
            </linearGradient></defs>
            <XAxis dataKey="day" stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} axisLine={false}/>
            <YAxis stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} axisLine={false} tickFormatter={v=>`$${(v/1e6).toFixed(0)}M`} domain={[380000000,510000000]}/>
            <Tooltip contentStyle={{background:"#1a1a2e",border:"1px solid #333",borderRadius:8,fontSize:12}} formatter={v=>[fmt(v),"Value"]}/>
            <Area type="monotone" dataKey="value" stroke="#A3FF12" strokeWidth={2} fill="url(#g1)"/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:"#fff"}}>Allocation</div>
        <ResponsiveContainer width="100%" height={140}>
          <PieChart><Pie data={ALLOC} cx="50%" cy="50%" innerRadius={40} outerRadius={62} dataKey="value" stroke="none">
            {ALLOC.map((a,i)=><Cell key={i} fill={a.color}/>)}
          </Pie></PieChart>
        </ResponsiveContainer>
        <div style={{display:"flex",flexWrap:"wrap",gap:"3px 10px",justifyContent:"center"}}>
          {ALLOC.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#999"}}>
            <div style={{width:7,height:7,borderRadius:2,background:a.color}}/>{a.name} {a.value}%
          </div>)}
        </div>
      </Card>
    </div>
    <Card>
      <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Active Agents</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
            {["Agent","Strategy","Status","AUM","P&L","Risk","Chain"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:"#666",fontWeight:500,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
          </tr></thead>
          <tbody>{AGENTS.map(a=><tr key={a.id} style={{borderBottom:"1px solid #1F2937"}}>
            <td style={{padding:"9px 10px",fontWeight:600,color:"#fff"}}>{a.name}</td>
            <td style={{padding:"9px 10px",color:"#999"}}>{a.strategy}</td>
            <td style={{padding:"9px 10px"}}><StatusDot s={a.status}/><span style={{color:"#A3FF12",fontSize:12}}>{a.status}</span></td>
            <td style={{padding:"9px 10px",color:"#fff"}}>{fmt(a.aum)}</td>
            <td style={{padding:"9px 10px",color:a.pnl>=0?"#A3FF12":"#FF5252",fontWeight:600}}>{a.pnl>=0?"+":""}{a.pnl}%</td>
            <td style={{padding:"9px 10px"}}><RiskBadge l={a.risk}/></td>
            <td style={{padding:"9px 10px",color:"#999"}}>{a.chain}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </Card>
    <Card style={{marginTop:16}}>
      <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>GEBRID Strategy Trading Returns (YTD)</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
        {AGENTS.map(a=><div key={a.id} style={{padding:"14px 16px",borderRadius:8,background:"#0d1520",border:"1px solid #1a2a3a"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:4}}>{a.name}</div>
          <div style={{fontSize:24,fontWeight:800,color:a.pnl>=0?"#A3FF12":"#FF5252",fontFamily:"monospace"}}>{a.pnl>=0?"+":""}{a.pnl}%</div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
            <span style={{fontSize:11,color:"#666"}}>AUM</span><span style={{fontSize:11,color:"#999",fontWeight:600}}>{fmt(a.aum)}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:11,color:"#666"}}>Trades</span><span style={{fontSize:11,color:"#999"}}>{a.trades.toLocaleString()}</span>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:11,color:"#666"}}>Uptime</span><span style={{fontSize:11,color:"#A3FF12"}}>{a.uptime}</span>
          </div>
          <div style={{marginTop:6}}><RiskBadge l={a.risk}/><span style={{fontSize:10,color:"#666",marginLeft:6}}>{a.chain}</span></div>
        </div>)}
      </div>
    </Card>
    <Card style={{marginTop:16,background:"#0a0f0a",border:"1px solid #1a3a1a"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div><div style={{fontSize:14,fontWeight:600,color:"#fff"}}>Revenue Streams <span style={{fontSize:11,fontWeight:400,color:"#888"}}>(≠ AUM)</span></div><div style={{fontSize:11,color:"#666"}}>Platform revenue · Y3 forecast · not AUM</div></div>
        <div style={{padding:"8px 16px",borderRadius:8,border:"1px solid #A3FF1240",background:"#A3FF1210"}}>
          <span style={{fontSize:24,fontWeight:800,color:"#A3FF12",fontFamily:"monospace"}}>$500M+</span>
          <div style={{fontSize:10,color:"#666",textAlign:"center"}}>Platform Revenue Y3</div>
          <div style={{fontSize:9,color:"#444",textAlign:"center",marginTop:1}}>AUM today: $450M</div>
        </div>
      </div>
      {[
        {name:"AI Constructor (SaaS)",rev:"$150M+",pct:30,color:"#A3FF12",desc:"Zero-code agent builder, 50+ templates, subscription model"},
        {name:"DePC Contracts & Royalties",rev:"$100M+",pct:20,color:"#FF3388",desc:"Talent launchpad: FORGE→ARENA→LABEL, on-chain royalty splits"},
        {name:"DeFi Platform (2-5%)",rev:"$80M+",pct:16,color:"#00E5FF",desc:"Staking, liquidity pools, RWA tokenization fees"},
        {name:"NFT Marketplace (1.5%)",rev:"$60M+",pct:12,color:"#FF9800",desc:"Trading commissions on GEBRID NFT marketplace"},
        {name:"AI Debit Cards (0.5-1%)",rev:"$50M+",pct:10,color:"#E040FB",desc:"Web3 debit cards, crypto→fiat bridge, booking integration"},
        {name:"GameFi Agents",rev:"$35M+",pct:7,color:"#627EEA",desc:"On-chain land/NFT trading bots, yield harvesting, P2E DeFi layer"},
        {name:"Boost & Premium",rev:"$25M+",pct:5,color:"#2775CA",desc:"Priority execution, advanced analytics, white-label features"},
      ].map((r,i)=><div key={i} style={{marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:8,height:8,borderRadius:2,background:r.color,flexShrink:0}}/>
            <span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{r.name}</span>
          </div>
          <span style={{fontSize:14,fontWeight:700,color:r.color,fontFamily:"monospace"}}>{r.rev}</span>
        </div>
        <div style={{height:6,borderRadius:3,background:"#1F2937",overflow:"hidden",marginBottom:3}}>
          <div style={{height:"100%",width:`${r.pct}%`,background:r.color,borderRadius:3}}/>
        </div>
        <div style={{fontSize:10,color:"#555",marginLeft:16}}>{r.desc}</div>
      </div>)}
    </Card>
  </div>;
}

export default DashboardView;
