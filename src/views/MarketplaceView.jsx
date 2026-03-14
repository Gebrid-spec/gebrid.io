import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, Btn, RiskBadge } from '../components/ui';
import { STRATEGIES } from '../data/mockData';

const STRAT_META = {
  1:{deployed:2847,trend:"stable",verified:true,weekly:"+2.1%",equityCurve:[100,103,108,106,112,118,115,122,128,131,138,142,148,145,152],fee:"0.5% mgmt · 10% perf",algo:"TWAP execution across 8 CEX/DEX, slippage-protected, rebalances every 4h"},
  2:{deployed:1420,trend:"up",verified:true,weekly:"+4.8%",equityCurve:[100,105,112,118,124,119,128,135,140,138,148,155,162,158,168],fee:"0.8% mgmt · 15% perf",algo:"Yield rotation engine monitors 24 protocols, auto-compounds every 6h, rebalances on rate delta >0.5%"},
  3:{deployed:891,trend:"stable",verified:true,weekly:"+1.2%",equityCurve:[100,102,104,103,106,108,107,110,112,111,114,116,115,118,120],fee:"0.3% mgmt · 8% perf",algo:"Multi-sig treasury with 48h timelock, automatic rebalancing on 5% deviation from target allocation"},
  4:{deployed:567,trend:"up",verified:true,weekly:"+9.2%",equityCurve:[100,108,118,112,124,138,130,145,155,148,162,172,165,180,188],fee:"1% mgmt · 20% perf",algo:"Momentum scoring on 40+ on-chain signals, long/short positioning, 4-chain execution"},
  5:{deployed:312,trend:"up",verified:true,weekly:"+6.1%",equityCurve:[100,106,114,120,128,122,134,142,148,155,162,158,168,175,182],fee:"1.2% mgmt · 20% perf",algo:"Hyperliquid primary (lowest latency), GMX v2 fallback, pre-sign risk check before every order"},
  6:{deployed:203,trend:"stable",verified:true,weekly:"+2.8%",equityCurve:[100,103,107,110,114,112,117,121,124,122,127,131,129,134,138],fee:"0.6% mgmt · 12% perf",algo:"Ribbon-style covered calls, weekly auto-rollover, strike selected by AI vol model"},
  7:{deployed:891,trend:"up",verified:true,weekly:"+3.4%",equityCurve:[100,104,109,115,120,118,124,130,135,133,139,145,142,148,154],fee:"0.4% mgmt · 8% perf",algo:"Curve/Convex/Pendle rotation, monitors APY every 15min, gas-optimized rebalance batching"},
  8:{deployed:445,trend:"up",verified:true,weekly:"+4.2%",equityCurve:[100,106,113,120,127,122,130,138,145,140,150,158,153,163,170],fee:"0.7% mgmt · 15% perf",algo:"Uniswap v3 concentrated liquidity, auto-rerange on ±2% price move, IL hedging via options"},
  9:{deployed:178,trend:"stable",verified:true,weekly:"+2.6%",equityCurve:[100,103,106,109,112,110,114,118,121,119,123,127,124,128,132],fee:"0.3% mgmt · 6% perf",algo:"veToken delegation to highest bribe pool, weekly harvest via Votium/Hidden Hand, auto-compounding"},
  10:{deployed:312,trend:"up",verified:false,weekly:"+5.8%",equityCurve:[100,108,118,125,135,128,140,152,158,150,165,175,168,180,190],fee:"1.5% mgmt · 25% perf",algo:"On-chain marketplace contract sniping, rarity scoring, automated bidding with max bid limits"},
  11:{deployed:124,trend:"stable",verified:true,weekly:"+1.8%",equityCurve:[100,102,105,107,110,108,112,115,117,115,119,122,120,124,127],fee:"0.2% mgmt · 5% perf",algo:"T-Bill tokenization via compliant pipeline, on-chain yield distribution, audited smart contracts"},
  12:{deployed:567,trend:"up",verified:false,weekly:"+7.4%",equityCurve:[100,109,120,128,138,130,142,155,162,154,168,180,172,185,195],fee:"1.8% mgmt · 25% perf",algo:"Trait-rarity ML model, gas-optimized sniper, instant flip logic on Blur/OpenSea"},
};
function MiniChart({data,color="#A3FF12"}) {
  if(!data||data.length<2) return null;
  const w=120,h=36,min=Math.min(...data),max=Math.max(...data),range=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-(((v-min)/range)*h*0.85+h*0.075)}`).join(" ");
  return <svg width={w} height={h} style={{display:"block"}}>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>;
}
function MarketplaceView({onDeploy}) {
  const [filter,setFilter] = useState("all");
  const [sort,setSort] = useState("popular");
  const [search,setSearch] = useState("");
  const [selectedDetail,setSelectedDetail] = useState(null);
  const [compareList,setCompareList] = useState([]);
  const [showCompare,setShowCompare] = useState(false);
  const [watchlist,setWatchlist] = useState([]);
  const types = ["all","accumulation","yield","treasury","rwa","gamefi","perps","options","stables","mm","gov"];
  const typeLabels = {all:"All",accumulation:"DCA",yield:"Yield",treasury:"Treasury",rwa:"RWA",gamefi:"🎮 GameFi",perps:"📈 Perps",options:"🏛️ Options",stables:"🔒 Stables",mm:"💧 MM",gov:"🗳️ Gov"};
  const enriched = STRATEGIES.map(s=>({...s,...(STRAT_META[s.id]||{})}));
  
  const filtered = enriched
    .filter(s=>filter==="all"||s.type===filter)
    .filter(s=>!search||s.name.toLowerCase().includes(search.toLowerCase())||s.tags.some(t=>t.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b)=>{
      if(sort==="apy") return parseFloat(b.apy)-parseFloat(a.apy);
      if(sort==="popular") return (b.deployed||0)-(a.deployed||0);
      if(sort==="users") return b.users-a.users;
      if(sort==="risk") return ["low","medium","high"].indexOf(a.risk.toLowerCase())-["low","medium","high"].indexOf(b.risk.toLowerCase());
      return 0;
    });
  const toggleCompare = (s) => {
    setCompareList(prev=>prev.find(x=>x.id===s.id)?prev.filter(x=>x.id!==s.id):prev.length<3?[...prev,s]:prev);
  };
  const toggleWatch = (id) => setWatchlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  // DETAIL VIEW
  if(selectedDetail) {
    const s = selectedDetail;
    const m = STRAT_META[s.id]||{};
    return <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <Btn onClick={()=>setSelectedDetail(null)}>← Marketplace</Btn>
        <h2 style={{fontSize:18,fontWeight:700,color:"#fff",margin:0}}>{s.name}</h2>
        {m.verified&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:"#0d2818",color:"#A3FF12",fontWeight:600}}>GEBRID Official ✓</span>}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:12}}>Equity Curve (15d)</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={(m.equityCurve||[]).map((v,i)=>({day:i+1,value:v}))}>
              <defs><linearGradient id="mgc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A3FF12" stopOpacity={0.3}/><stop offset="95%" stopColor="#A3FF12" stopOpacity={0}/>
              </linearGradient></defs>
              <XAxis dataKey="day" stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} axisLine={false}/>
              <YAxis stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} axisLine={false} tickFormatter={v=>`${v}`}/>
              <Tooltip contentStyle={{background:"#1a1a2e",border:"1px solid #333",borderRadius:8,fontSize:12}} formatter={v=>[`${v}`,"%"]}/>
              <Area type="monotone" dataKey="value" stroke="#A3FF12" strokeWidth={2} fill="url(#mgc)"/>
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {[["APY Range",s.apy,"#A3FF12"],["Min AUM",s.minAum,"#fff"],["Active Users",s.users.toLocaleString(),"#fff"],["Deployed",`${(m.deployed||0).toLocaleString()} agents`,"#5BA3E6"],["This Week",m.weekly,"#A3FF12"],["Fee Structure",m.fee,"#FF9800"]].map(([k,v,c],i)=>
            <div key={i} style={{padding:"10px 14px",borderRadius:8,background:"#111827",border:"1px solid #1F2937",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,color:"#888"}}>{k}</span>
              <span style={{fontSize:12,fontWeight:600,color:c}}>{v}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:10}}>Algorithm</div>
          <p style={{fontSize:12,color:"#999",lineHeight:1.6,margin:0}}>{m.algo}</p>
          <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
            {s.tags.map(t=><span key={t} style={{fontSize:10,padding:"3px 8px",borderRadius:4,background:"#1a2332",color:"#5BA3E6",border:"1px solid #5BA3E630"}}>{t}</span>)}
          </div>
        </Card>
        <Card>
          <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:10}}>Risk Profile</div>
          {[["Risk Level",s.risk,s.risk==="Low"?"#A3FF12":s.risk==="Medium"?"#FF9800":"#FF5252"],["Category",s.type,"#888"],["Min Investment",s.minAum,"#fff"],["Verified",m.verified?"GEBRID Official":"Community","#888"]].map(([k,v,c],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #1F2937",fontSize:12}}>
              <span style={{color:"#888"}}>{k}</span><span style={{color:c,fontWeight:600}}>{v}</span>
            </div>
          )}
        </Card>
      </div>
      <div style={{display:"flex",gap:10}}>
        <Btn primary onClick={()=>{setSelectedDetail(null);onDeploy(s);}} style={{flex:2,padding:14,fontSize:14}}>⚡ Deploy Agent</Btn>
        <Btn onClick={()=>toggleWatch(s.id)} style={{flex:1,padding:14,borderColor:watchlist.includes(s.id)?"#A3FF12":"#333",color:watchlist.includes(s.id)?"#A3FF12":"#888"}}>
          {watchlist.includes(s.id)?"★ Watchlisted":"☆ Watchlist"}
        </Btn>
        <Btn onClick={()=>{toggleCompare(s);setSelectedDetail(null);}} style={{flex:1,padding:14}}>⊞ Compare</Btn>
      </div>
    </div>;
  }
  // COMPARE VIEW
  if(showCompare&&compareList.length>=2) {
    const rows = [
      ["APY",s=>s.apy,"#A3FF12"],
      ["Risk",s=>s.risk,s=>s.risk==="Low"?"#A3FF12":s.risk==="Medium"?"#FF9800":"#FF5252"],
      ["Min AUM",s=>s.minAum,"#fff"],
      ["Users",s=>s.users.toLocaleString(),"#fff"],
      ["Deployed",s=>`${(STRAT_META[s.id]?.deployed||0).toLocaleString()}`,"#5BA3E6"],
      ["Weekly",s=>STRAT_META[s.id]?.weekly||"—","#A3FF12"],
      ["Fee",s=>STRAT_META[s.id]?.fee||"—","#FF9800"],
      ["Verified",s=>STRAT_META[s.id]?.verified?"✓ Official":"Community",s=>STRAT_META[s.id]?.verified?"#A3FF12":"#888"],
    ];
    return <div>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
        <Btn onClick={()=>setShowCompare(false)}>← Back</Btn>
        <h2 style={{fontSize:18,fontWeight:700,color:"#fff",margin:0}}>Strategy Comparison</h2>
        <span style={{fontSize:12,color:"#888"}}>({compareList.length} strategies)</span>
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:500}}>
          <thead>
            <tr style={{borderBottom:"1px solid #1F2937"}}>
              <th style={{padding:"10px 14px",textAlign:"left",color:"#666",fontSize:11,textTransform:"uppercase",width:120}}>Metric</th>
              {compareList.map(s=><th key={s.id} style={{padding:"10px 14px",textAlign:"center",minWidth:160}}>
                <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{s.name}</div>
                {STRAT_META[s.id]?.verified&&<div style={{fontSize:10,color:"#A3FF12"}}>GEBRID Official ✓</div>}
              </th>)}
            </tr>
            <tr style={{borderBottom:"2px solid #1F2937"}}>
              <td style={{padding:"8px 14px"}}/>
              {compareList.map(s=><td key={s.id} style={{padding:"8px 14px",textAlign:"center"}}>
                <MiniChart data={STRAT_META[s.id]?.equityCurve} color="#A3FF12"/>
              </td>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label,val,color],ri)=><tr key={ri} style={{borderBottom:"1px solid #1F2937",background:ri%2===0?"#0d0d14":"transparent"}}>
              <td style={{padding:"10px 14px",fontSize:12,color:"#888",fontWeight:500}}>{label}</td>
              {compareList.map(s=>{
                const v=typeof val==="function"?val(s):val;
                const c=typeof color==="function"?color(s):color;
                return <td key={s.id} style={{padding:"10px 14px",textAlign:"center",fontSize:13,fontWeight:600,color:c}}>{v}</td>;
              })}
            </tr>)}
            <tr>
              <td style={{padding:"12px 14px"}}/>
              {compareList.map(s=><td key={s.id} style={{padding:"12px 14px",textAlign:"center"}}>
                <button onClick={()=>{setShowCompare(false);onDeploy(s);}} style={{padding:"8px 16px",borderRadius:7,border:"none",background:"#A3FF12",color:"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",width:"100%"}}>Deploy →</button>
              </td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>;
  }
  // MAIN LIST
  return <div>
    {/* Header */}
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12,marginBottom:12}}>
        <div>
          <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>Strategy Marketplace</h2>
          <p style={{fontSize:12,color:"#888",margin:0}}>{enriched.length} strategies · {enriched.reduce((a,s)=>a+(STRAT_META[s.id]?.deployed||0),0).toLocaleString()} agents deployed</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {compareList.length>=2&&<button onClick={()=>setShowCompare(true)} style={{padding:"8px 14px",borderRadius:7,border:"1px solid #5BA3E6",background:"#5BA3E620",color:"#5BA3E6",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            ⊞ Compare ({compareList.length})
          </button>}
          {watchlist.length>0&&<span style={{fontSize:11,color:"#A3FF12"}}>★ {watchlist.length} watchlisted</span>}
        </div>
      </div>
      {/* Top Performers Banner */}
      <div style={{padding:"12px 16px",borderRadius:10,background:"#0a0f0a",border:"1px solid #A3FF1230",marginBottom:14}}>
        <div style={{fontSize:11,color:"#A3FF12",fontWeight:700,letterSpacing:1,marginBottom:8}}>🏆 TOP PERFORMERS THIS WEEK</div>
        <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
          {enriched.sort((a,b)=>parseFloat(b.weekly||0)-parseFloat(a.weekly||0)).slice(0,3).map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:14,color:"#666",fontWeight:700}}>#{i+1}</span>
            <span style={{fontSize:12,color:"#fff",fontWeight:600}}>{s.name.replace("GEBRID ","")}</span>
            <span style={{fontSize:12,color:"#A3FF12",fontWeight:700}}>{STRAT_META[s.id]?.weekly}</span>
            <MiniChart data={STRAT_META[s.id]?.equityCurve} color="#A3FF12"/>
          </div>)}
        </div>
      </div>
      {/* Search + Sort + Filter */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search strategy or tag..."
          style={{flex:"1 1 200px",padding:"8px 12px",borderRadius:7,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none"}}/>
        <select value={sort} onChange={e=>setSort(e.target.value)}
          style={{padding:"8px 12px",borderRadius:7,border:"1px solid #333",background:"#0A0A0A",color:"#888",fontSize:12,fontFamily:"inherit",cursor:"pointer",outline:"none"}}>
          <option value="popular">Sort: Most Deployed</option>
          <option value="apy">Sort: Highest APY</option>
          <option value="users">Sort: Most Users</option>
          <option value="risk">Sort: Lowest Risk</option>
        </select>
      </div>
      {/* Type filters */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        {types.map(t=><button key={t} onClick={()=>setFilter(t)} style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:11,fontFamily:"inherit",background:filter===t?"#A3FF12":"#1F2937",color:filter===t?"#000":"#888"}}>
          {typeLabels[t]||t}
        </button>)}
        <button onClick={()=>setFilter("vesting_nft")} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${filter==="vesting_nft"?"#FF9800":"transparent"}`,cursor:"pointer",fontSize:11,fontFamily:"inherit",background:filter==="vesting_nft"?"#FF980020":"#1F2937",color:filter==="vesting_nft"?"#FF9800":"#888"}}>
          🔖 Vesting NFT <span style={{fontSize:9,padding:"1px 4px",borderRadius:3,background:"#FF980030",color:"#FF9800",marginLeft:2}}>NEW</span>
        </button>
      </div>
    </div>
    {/* Vesting NFT Marketplace */}
    {filter==="vesting_nft"&&<VestingNFTView/>}
    {/* Cards Grid — hidden for vesting_nft */}
    {filter!=="vesting_nft"&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:14}}>
      {filtered.map(s=>{
        const m=STRAT_META[s.id]||{};
        const inCompare=compareList.find(x=>x.id===s.id);
        const inWatch=watchlist.includes(s.id);
        const tagColor=s.type==="gamefi"?"#E040FB":s.type==="perps"?"#FF9800":s.type==="options"?"#5BA3E6":s.type==="stables"?"#2775CA":s.type==="mm"?"#00E5FF":s.type==="gov"?"#9C27B0":"#5BA3E6";
        return <div key={s.id} style={{background:"#111827",borderRadius:12,border:`1px solid ${inCompare?"#5BA3E6":"#1F2937"}`,padding:16,display:"flex",flexDirection:"column",transition:"border-color 0.2s"}}>
          {/* Card header */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <div style={{flex:1,marginRight:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                {m.verified&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"#0d2818",color:"#A3FF12",fontWeight:700}}>✓ OFFICIAL</span>}
                {m.trend==="up"&&<span style={{fontSize:9,padding:"1px 5px",borderRadius:3,background:"#2a1f00",color:"#FF9800",fontWeight:700}}>🔥 TRENDING</span>}
              </div>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.2,cursor:"pointer"}} onClick={()=>setSelectedDetail(s)}>{s.name}</div>
            </div>
            <RiskBadge l={s.risk.toLowerCase()}/>
          </div>
          {/* Mini chart + weekly */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <MiniChart data={m.equityCurve} color={m.weekly&&m.weekly.startsWith("+")?"#A3FF12":"#FF5252"}/>
            <span style={{fontSize:13,fontWeight:700,color:"#A3FF12"}}>{m.weekly}</span>
          </div>
          <p style={{fontSize:11,color:"#999",lineHeight:1.4,margin:"0 0 8px",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{s.desc}</p>
          {/* Tags */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
            {s.tags.map(t=><span key={t} style={{background:`${tagColor}15`,color:tagColor,padding:"2px 7px",borderRadius:4,fontSize:10,border:`1px solid ${tagColor}30`}}>{t}</span>)}
          </div>
          {/* Metrics row */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:10}}>
            <div style={{padding:"6px 8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",textTransform:"uppercase",marginBottom:2}}>APY</div>
              <div style={{fontSize:12,fontWeight:700,color:"#A3FF12"}}>{s.apy}</div>
            </div>
            <div style={{padding:"6px 8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",textTransform:"uppercase",marginBottom:2}}>Min</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{s.minAum}</div>
            </div>
            <div style={{padding:"6px 8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",textTransform:"uppercase",marginBottom:2}}>Deployed</div>
              <div style={{fontSize:12,fontWeight:700,color:"#5BA3E6"}}>{(m.deployed||0).toLocaleString()}</div>
            </div>
          </div>
          {/* Live deploy counter */}
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:12}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#A3FF12",boxShadow:"0 0 4px #A3FF12"}}/>
            <span style={{fontSize:10,color:"#A3FF12"}}>{(m.deployed||0).toLocaleString()} agents running now</span>
            <span style={{marginLeft:"auto",fontSize:10,color:"#666"}}>{s.users.toLocaleString()} users</span>
          </div>
          {/* Action buttons */}
          <div style={{display:"flex",gap:6,marginTop:"auto"}}>
            <button onClick={()=>setSelectedDetail(s)} style={{flex:1,padding:"7px",borderRadius:6,border:"1px solid #333",background:"transparent",color:"#888",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
              📊 Details
            </button>
            <button onClick={()=>toggleWatch(s.id)} style={{padding:"7px 10px",borderRadius:6,border:`1px solid ${inWatch?"#A3FF12":"#333"}`,background:"transparent",color:inWatch?"#A3FF12":"#666",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
              {inWatch?"★":"☆"}
            </button>
            <button onClick={()=>toggleCompare(s)} style={{padding:"7px 10px",borderRadius:6,border:`1px solid ${inCompare?"#5BA3E6":"#333"}`,background:inCompare?"#5BA3E620":"transparent",color:inCompare?"#5BA3E6":"#666",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
              ⊞
            </button>
            <button onClick={()=>onDeploy(s)} style={{flex:2,padding:"7px",borderRadius:6,border:"none",background:"#A3FF12",color:"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              ⚡ Deploy
            </button>
          </div>
        </div>;
      })}
    </div>}
  </div>;
}

export default MarketplaceView;
