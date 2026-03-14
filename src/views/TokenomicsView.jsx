import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, Metric } from '../components/ui';

function TokenomicsView() {
  const [tab,setTab]=useState("overview");
  const ALLOC_DATA=[
    {name:"Community & Staking",pct:17,tokens:"170M",color:"#A3FF12",cliff:"6mo",vest:"54mo",tge:"0%"},
    {name:"Treasury",pct:15,tokens:"150M",color:"#00E5FF",cliff:"12mo",vest:"24mo",tge:"0%"},
    {name:"Private",pct:12,tokens:"120M",color:"#E040FB",cliff:"3mo",vest:"12mo",tge:"10%"},
    {name:"Team & Advisors",pct:10,tokens:"100M",color:"#FF9800",cliff:"12mo",vest:"24mo",tge:"0%"},
    {name:"Public",pct:10,tokens:"100M",color:"#2196F3",cliff:"1mo",vest:"6mo",tge:"10%"},
    {name:"Marketing",pct:8,tokens:"80M",color:"#FF3388",cliff:"—",vest:"12mo",tge:"0%"},
    {name:"Seed",pct:8,tokens:"80M",color:"#5BA3E6",cliff:"6mo",vest:"24mo",tge:"0%"},
    {name:"Pre-seed",pct:7,tokens:"70M",color:"#627EEA",cliff:"6mo",vest:"18mo",tge:"10%"},
    {name:"Liquidity",pct:5,tokens:"50M",color:"#2775CA",cliff:"—",vest:"—",tge:"100%"},
    {name:"Angel",pct:5,tokens:"50M",color:"#FFD700",cliff:"6mo",vest:"18mo",tge:"10%"},
    {name:"Airdrop",pct:3,tokens:"30M",color:"#FF5252",cliff:"—",vest:"6mo",tge:"~83%"},
  ];
  const ROUNDS=[
    {round:"Angel",val:"$7M",raise:"$350K",price:"$0.007",disc:"82.5%",alloc:"5%",tokens:"50M",cliff:"6mo",vest:"18mo",tge:"10%",status:"SOLD",statusColor:"#FF5252"},
    {round:"Pre-seed",val:"$10M",raise:"$700K",price:"$0.01",disc:"75%",alloc:"7%",tokens:"70M",cliff:"6mo",vest:"18mo",tge:"10%",status:"43%",statusColor:"#FF9800"},
    {round:"Seed",val:"$20M",raise:"$1.6M",price:"$0.02",disc:"50%",alloc:"8%",tokens:"80M",cliff:"6mo",vest:"24mo",tge:"0%",status:"NEXT",statusColor:"#5BA3E6"},
    {round:"Private",val:"$30M",raise:"$3.6M",price:"$0.03",disc:"25%",alloc:"12%",tokens:"120M",cliff:"3mo",vest:"12mo",tge:"10%",status:"—",statusColor:"#666"},
    {round:"Public",val:"$40M",raise:"$4M",price:"$0.04",disc:"—",alloc:"10%",tokens:"100M",cliff:"1mo",vest:"6mo",tge:"10%",status:"—",statusColor:"#666"},
  ];
  const ROI=[
    {round:"Angel",price:0.007,x25:35,x100:142,x350:500},
    {round:"Pre-seed",price:0.01,x25:25,x100:100,x350:350},
    {round:"Seed",price:0.02,x25:12.5,x100:50,x350:175},
    {round:"Private",price:0.03,x25:8.3,x100:33,x350:116},
    {round:"Public",price:0.04,x25:6.2,x100:25,x350:87.5},
  ];
  const PRICE_POINTS=[
    {mcap:"$40M",price:0.04,label:"TGE"},
    {mcap:"$100M",price:0.10,label:""},
    {mcap:"$250M",price:0.25,label:""},
    {mcap:"$500M",price:0.50,label:""},
    {mcap:"$1B",price:1.00,label:""},
    {mcap:"$2.5B",price:2.50,label:""},
    {mcap:"$3.5B",price:3.50,label:"Target"},
  ];
  const pieData=ALLOC_DATA.map(a=>({name:a.name,value:a.pct,color:a.color}));
  return <div>
    <div style={{marginBottom:20}}>
      <h2 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 6px"}}>$GEBRID <span style={{color:"#A3FF12"}}>Tokenomics</span></h2>
      <p style={{fontSize:13,color:"#888",margin:0}}>1,000,000,000 total supply · $0.04 listing price · $40M FDV · TGE circulating: 109M (10.9%)</p>
    </div>
    <div style={{display:"flex",gap:4,background:"#111827",borderRadius:8,padding:3,marginBottom:20,flexWrap:"wrap"}}>
      {[["overview","📊 Overview"],["rounds","💰 Sale Rounds"],["roi","🚀 ROI & Price"],["vesting","📅 Vesting"],["staking","💎 Staking Tiers"]].map(([id,label])=>
        <button key={id} onClick={()=>setTab(id)} style={{padding:"8px 14px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"monospace",background:tab===id?"#A3FF12":"transparent",color:tab===id?"#000":"#888"}}>{label}</button>
      )}
    </div>
    {tab==="overview"&&<div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
        <Metric label="Total Supply" value="1B" sub="$GEBRID tokens"/>
        <Metric label="FDV at TGE" value="$40M" sub="fully diluted"/>
        <Metric label="Listing Price" value="$0.04" sub="public round"/>
        <Metric label="TGE Circulating" value="109M" sub="10.9% of supply"/>
        <Metric label="Init. Market Cap" value="$4.36M" sub="at TGE"/>
        <Metric label="Total Raise" value="$10.25M" sub="all rounds"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:"#fff"}}>Token Allocation</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
              {pieData.map((a,i)=><Cell key={i} fill={a.color}/>)}
            </Pie></PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexWrap:"wrap",gap:"3px 8px",justifyContent:"center"}}>
            {ALLOC_DATA.map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:3,fontSize:9,color:"#999"}}>
              <div style={{width:6,height:6,borderRadius:2,background:a.color}}/>{a.name} {a.pct}%
            </div>)}
          </div>
        </Card>
        <Card>
          <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Allocation Breakdown</div>
          {ALLOC_DATA.map((a,i)=><div key={i} style={{marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:8,height:8,borderRadius:2,background:a.color,flexShrink:0}}/>
                <span style={{fontSize:12,fontWeight:600,color:"#fff"}}>{a.name}</span>
              </div>
              <div style={{display:"flex",gap:12,fontSize:11}}>
                <span style={{color:"#888"}}>{a.tokens}</span>
                <span style={{color:a.color,fontWeight:700,fontFamily:"monospace",minWidth:30,textAlign:"right"}}>{a.pct}%</span>
              </div>
            </div>
            <div style={{height:4,borderRadius:2,background:"#1F2937",overflow:"hidden"}}>
              <div style={{height:"100%",width:`${a.pct}%`,background:a.color,borderRadius:2}}/>
            </div>
          </div>)}
        </Card>
      </div>
      <Card style={{background:"#0a0f0a",border:"1px solid #1a3a1a"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:12,fontFamily:"monospace"}}>🏦 USE OF FUNDS ($10.25M RAISE)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
          {[
            {name:"Product Development",pct:40,color:"#A3FF12",val:"$4.1M"},
            {name:"Marketing & Growth",pct:25,color:"#5BA3E6",val:"$2.56M"},
            {name:"Liquidity & Listings",pct:20,color:"#FF9800",val:"$2.05M"},
            {name:"Operations & Legal",pct:15,color:"#E040FB",val:"$1.54M"},
          ].map((f,i)=><div key={i} style={{padding:"14px",borderRadius:8,background:"#111827",border:`1px solid ${f.color}20`,textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:800,color:f.color,fontFamily:"monospace"}}>{f.pct}%</div>
            <div style={{fontSize:12,fontWeight:600,color:"#fff",marginTop:4}}>{f.name}</div>
            <div style={{fontSize:11,color:"#666",marginTop:2}}>{f.val}</div>
          </div>)}
        </div>
      </Card>
    </div>}
    {tab==="rounds"&&<div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #1F2937"}}>
          <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>Investment Rounds</span>
          <span style={{fontSize:11,color:"#666",marginLeft:8}}>Total raise: $10.25M</span>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
              {["Round","Valuation","Raise","Price","Discount","Alloc","Tokens","Cliff","Vesting","TGE","Status"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:"#666",fontWeight:500,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{ROUNDS.map((r,i)=><tr key={i} style={{borderBottom:"1px solid #1F2937"}}>
              <td style={{padding:"9px 10px",fontWeight:700,color:"#fff"}}>{r.round}</td>
              <td style={{padding:"9px 10px",color:"#999",fontFamily:"monospace"}}>{r.val}</td>
              <td style={{padding:"9px 10px",color:"#fff",fontFamily:"monospace"}}>{r.raise}</td>
              <td style={{padding:"9px 10px",color:"#A3FF12",fontFamily:"monospace",fontWeight:700}}>{r.price}</td>
              <td style={{padding:"9px 10px",color:"#FF9800"}}>{r.disc}</td>
              <td style={{padding:"9px 10px",color:"#999"}}>{r.alloc}</td>
              <td style={{padding:"9px 10px",color:"#999",fontFamily:"monospace"}}>{r.tokens}</td>
              <td style={{padding:"9px 10px",color:"#888"}}>{r.cliff}</td>
              <td style={{padding:"9px 10px",color:"#888"}}>{r.vest}</td>
              <td style={{padding:"9px 10px",color:"#888"}}>{r.tge}</td>
              <td style={{padding:"9px 10px"}}><span style={{padding:"2px 8px",borderRadius:4,background:`${r.statusColor}20`,color:r.statusColor,fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{r.status}</span></td>
            </tr>)}</tbody>
          </table>
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
        <Card style={{background:"#0a0f0a",border:"1px solid #1a3a1a"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:12,fontFamily:"monospace"}}>✅ INVESTMENT HIGHLIGHTS</div>
          {["Angel round SOLD ($0.007)","Pre-seed: $300K raised of $700K","Working MVP / demo live","US entity (FL) incorporated","3 liquidity pools planned (USDC, ETH, AERO)","$40M FDV at TGE","Low TGE float: 10.9%","Community-first: 40% allocation"].map((h,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:12,color:"#ccc"}}>
              <span style={{color:"#A3FF12",fontSize:11}}>✓</span>{h}
            </div>
          )}
        </Card>
        <Card style={{background:"#0a0a14",border:"1px solid #1a1a3a"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#5BA3E6",letterSpacing:1,marginBottom:12,fontFamily:"monospace"}}>🛡️ PROTECTION MECHANISMS</div>
          {["Vesting prevents early sell pressure","Multi-pool reduces manipulation risk","Audited smart contracts (Certik-ready)","Market making reserve: 2% allocation","Treasury reserve: 15% for stability","On-chain transparency for all pools","ZK-shielded investor identities","Time-locked critical actions"].map((h,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:12,color:"#ccc"}}>
              <span style={{color:"#5BA3E6",fontSize:11}}>🛡</span>{h}
            </div>
          )}
        </Card>
      </div>
    </div>}
    {tab==="roi"&&<div>
      <Card style={{marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:14,color:"#fff"}}>$GEBRID Price Forecast by Market Cap</div>
        <div style={{display:"flex",alignItems:"end",gap:8,height:200,padding:"0 10px",marginBottom:16}}>
          {PRICE_POINTS.map((p,i)=>{
            const maxH=180;const h=Math.max(20,(p.price/3.5)*maxH);
            return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
              <div style={{fontSize:11,fontWeight:700,color:"#A3FF12",fontFamily:"monospace"}}>${p.price.toFixed(2)}</div>
              <div style={{width:"100%",height:h,borderRadius:"6px 6px 0 0",background:i===0?`linear-gradient(180deg,#FF9800,#FF980040)`:`linear-gradient(180deg,#A3FF12,#A3FF1240)`,transition:"height 0.3s"}}/>
              <div style={{fontSize:10,color:"#888",textAlign:"center"}}>{p.mcap}</div>
              {p.label&&<div style={{fontSize:9,color:i===0?"#FF9800":"#A3FF12",fontWeight:700}}>{p.label}</div>}
            </div>;
          })}
        </div>
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>ROI by Round</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
              {["Round","Entry Price","@$0.25","@$1.00","@$3.50"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",color:"#666",fontWeight:500,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{ROI.map((r,i)=><tr key={i} style={{borderBottom:"1px solid #1F2937"}}>
              <td style={{padding:"10px 14px",fontWeight:700,color:"#fff"}}>{r.round}</td>
              <td style={{padding:"10px 14px",color:"#A3FF12",fontFamily:"monospace",fontWeight:700}}>${r.price}</td>
              <td style={{padding:"10px 14px",color:"#5BA3E6",fontFamily:"monospace",fontWeight:700}}>{r.x25}x</td>
              <td style={{padding:"10px 14px",color:"#FF9800",fontFamily:"monospace",fontWeight:700}}>{r.x100}x</td>
              <td style={{padding:"10px 14px",color:"#A3FF12",fontFamily:"monospace",fontWeight:800,fontSize:14}}>{r.x350}x</td>
            </tr>)}</tbody>
          </table>
        </div>
        <div style={{marginTop:12,padding:"10px 14px",borderRadius:8,background:"#0a0f0a",border:"1px solid #A3FF1230",fontSize:11,color:"#888"}}>
          💡 At $3.5B market cap ($3.50/token): Angel investors see <span style={{color:"#A3FF12",fontWeight:700}}>500x</span> return · Seed investors see <span style={{color:"#A3FF12",fontWeight:700}}>175x</span> · Public sees <span style={{color:"#A3FF12",fontWeight:700}}>87.5x</span>
        </div>
      </Card>
    </div>}
    {tab==="vesting"&&<div>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:14,color:"#fff"}}>Vesting Schedule — All Categories</div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
              {["Category","Allocation","Tokens","Cliff","Vesting","TGE Unlock"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:"#666",fontWeight:500,fontSize:10,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{ALLOC_DATA.map((a,i)=><tr key={i} style={{borderBottom:"1px solid #1F2937"}}>
              <td style={{padding:"9px 10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{width:8,height:8,borderRadius:2,background:a.color}}/><span style={{fontWeight:600,color:"#fff"}}>{a.name}</span>
              </div></td>
              <td style={{padding:"9px 10px",color:a.color,fontFamily:"monospace",fontWeight:700}}>{a.pct}%</td>
              <td style={{padding:"9px 10px",color:"#999",fontFamily:"monospace"}}>{a.tokens}</td>
              <td style={{padding:"9px 10px",color:"#888"}}>{a.cliff}</td>
              <td style={{padding:"9px 10px",color:"#888"}}>{a.vest}</td>
              <td style={{padding:"9px 10px",color:a.tge!=="0%"?"#A3FF12":"#666",fontWeight:a.tge!=="0%"?700:400}}>{a.tge}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:16}}>
        {[
          {title:"TGE Day",month:"Month 0",circ:"109M",pct:"10.9%",color:"#FF9800"},
          {title:"Month 12",month:"All sale rounds unlocking",circ:"~458M",pct:"~45.8%",color:"#5BA3E6"},
          {title:"Month 60",month:"Full emission complete",circ:"1,000M",pct:"100%",color:"#A3FF12"},
        ].map((m,i)=><Card key={i} style={{background:"#0a0a14",border:`1px solid ${m.color}30`,textAlign:"center"}}>
          <div style={{fontSize:10,color:m.color,fontFamily:"monospace",fontWeight:700,marginBottom:6}}>{m.title}</div>
          <div style={{fontSize:24,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>{m.circ}</div>
          <div style={{fontSize:12,color:m.color,fontWeight:600}}>{m.pct} circulating</div>
          <div style={{fontSize:10,color:"#555",marginTop:4}}>{m.month}</div>
        </Card>)}
      </div>
    </div>}
    {tab==="staking"&&<div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"1px solid #1F2937"}}>
          <span style={{fontSize:13,fontWeight:700,color:"#fff"}}>$GEBRID Staking Tiers</span>
          <span style={{fontSize:11,color:"#666",marginLeft:8}}>Stake more → unlock more features</span>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
              {["Tier","$GEBRID Staked","Agents","Key Perks"].map(h=><th key={h} style={{padding:"10px 14px",textAlign:"left",color:"#666",fontWeight:500,fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{[
              {tier:"Free",staked:"0",agents:"3",perks:"1 category, basic signals",color:"#666"},
              {tier:"Bronze",staked:"1,000",agents:"5",perks:"Auto-launch, priority signals",color:"#CD7F32"},
              {tier:"Silver",staked:"5,000",agents:"7",perks:"API access, advanced analytics",color:"#C0C0C0"},
              {tier:"Gold",staked:"25,000",agents:"10",perks:"Multi-chain, DeFi products",color:"#FFD700"},
              {tier:"Platinum",staked:"100,000",agents:"Unlimited",perks:"White-label, DAO voting, profit pool",color:"#A3FF12"},
            ].map((t,i)=><tr key={i} style={{borderBottom:"1px solid #1F2937"}}>
              <td style={{padding:"10px 14px"}}><span style={{fontWeight:700,color:t.color}}>{t.tier}</span></td>
              <td style={{padding:"10px 14px",color:"#fff",fontFamily:"monospace",fontWeight:600}}>{t.staked}</td>
              <td style={{padding:"10px 14px",color:"#A3FF12",fontWeight:600}}>{t.agents}</td>
              <td style={{padding:"10px 14px",color:"#999"}}>{t.perks}</td>
            </tr>)}</tbody>
          </table>
        </div>
      </Card>
      <Card style={{marginTop:16,background:"#0a0f0a",border:"1px solid #A3FF1230"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:10,fontFamily:"monospace"}}>💰 PLATFORM PROFIT POOL</div>
        <p style={{fontSize:12,color:"#888",margin:0,lineHeight:1.6}}>Active Platinum holders share revenue from AI services, marketplace commissions, and RWA/NFT licensing fees. Revenue distributed proportionally to staked amount.</p>
      </Card>
      <Card style={{marginTop:16,background:"#0a0a14",border:"1px solid #5BA3E630"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#5BA3E6",letterSpacing:1,marginBottom:10,fontFamily:"monospace"}}>🔗 LIQUIDITY POOLS</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
          {[
            {pair:"GEBRID / USDC",desc:"Stable price reference. Primary pair for institutional capital.",color:"#2775CA"},
            {pair:"GEBRID / ETH",desc:"Access to native crypto traders. Deep Ethereum ecosystem liquidity.",color:"#627EEA"},
            {pair:"GEBRID / AERO",desc:"Aerodrome ecosystem exposure. Base chain growth + gauge voting.",color:"#A3FF12"},
          ].map((p,i)=><div key={i} style={{padding:"12px",borderRadius:8,background:"#111827",border:`1px solid ${p.color}20`}}>
            <div style={{fontSize:13,fontWeight:700,color:p.color,marginBottom:4}}>{p.pair}</div>
            <div style={{fontSize:10,color:"#888",lineHeight:1.4}}>{p.desc}</div>
          </div>)}
        </div>
      </Card>
    </div>}
  </div>;
}

export default TokenomicsView;
