import React, { useState } from 'react';
import { Card, Btn } from '../components/ui';

function BuilderView({strategy,onBack}) {
  const [step,setStep]=useState(1);
  const [deploying,setDeploying]=useState(false);
  const [deployed,setDeployed]=useState(false);
  const [deployStep,setDeployStep]=useState(0);
  const [showGallery,setShowGallery]=useState(!strategy);
  const [cfg,setCfg]=useState({name:strategy?`${strategy.name} Agent`:"My Agent",aum:"100000",chain:"ethereum",maxTrade:"50000",stopLoss:"5",type:"standard",protocol:"hyperliquid",leverage:"5",pair:"ETH-PERP"});
  const [backtest,setBacktest]=useState(null);
  const [backtesting,setBacktesting]=useState(false);
  const [guardRules,setGuardRules]=useState({dustFilter:true,addressPoison:true,maxSlippage:true,sanctionsCheck:true,flashloanGuard:false,mevProtect:false});
  const [aiRec,setAiRec]=useState(null);
  const [aiLoading,setAiLoading]=useState(false);
  const runBacktest=()=>{
    setBacktesting(true);setBacktest(null);
    setTimeout(()=>{
      const base=cfg.type==="perps"?[100,108,118,112,124,138,130,145,155,148,162,172]:[100,103,108,106,112,118,115,122,128,131,138,142];
      const noise=base.map(v=>v+(Math.random()-0.45)*8);
      setBacktest({curve:noise,sharpe:(1.2+Math.random()*0.8).toFixed(2),maxDD:(-5-Math.random()*12).toFixed(1),winRate:(54+Math.random()*16).toFixed(1),totalReturn:((noise[noise.length-1]-100)).toFixed(1),trades:Math.floor(200+Math.random()*600),avgHold:cfg.type==="perps"?"2.4h":"18h"});
      setBacktesting(false);
    },1200);
  };
  const runAiRec=()=>{
    setAiLoading(true);
    setTimeout(()=>{
      const recs=[
        {title:"Optimize Stop Loss",desc:`Based on historical volatility, ${cfg.stopLoss}% stop loss is ${Number(cfg.stopLoss)>8?"aggressive":"optimal"}. Consider ${Math.max(3,Number(cfg.stopLoss)-1)}% for this strategy type.`,impact:"+2.1% annual return",type:"risk"},
        {title:"Add Gas Optimization",desc:"Enable batch execution to reduce gas costs by ~40%. Recommended for strategies with >10 trades/day.",impact:"-$12K/year gas",type:"cost"},
        {title:"Enable MEV Protection",desc:"Front-running risk detected on "+cfg.chain+". GEBRID MEV shield routes through Flashbots Protect.",impact:"Prevent ~$3K/mo losses",type:"security"},
      ];
      setAiRec(recs);setAiLoading(false);
    },900);
  };
  const handleDeploy=()=>{
    setDeploying(true);setDeployStep(0);
    setTimeout(()=>setDeployStep(1),600);
    setTimeout(()=>setDeployStep(2),1200);
    setTimeout(()=>setDeployStep(3),1800);
    setTimeout(()=>setDeployStep(4),2400);
    setTimeout(()=>{setDeploying(false);setDeployed(true)},3000);
  };
  const TEMPLATES=[
    {icon:"💰",name:"DCA Engine",desc:"Dollar-cost averaging with TWAP",risk:"Low",apy:"12-18%",preset:{name:"GEBRID DCA Agent",aum:"1000000",maxTrade:"50000",stopLoss:"5",chain:"ethereum",type:"standard"}},
    {icon:"🌱",name:"Yield Optimizer",desc:"Auto-compound Aave/Lido",risk:"Medium",apy:"18-35%",preset:{name:"GEBRID Yield Agent",aum:"5000000",maxTrade:"200000",stopLoss:"8",chain:"base",type:"standard"}},
    {icon:"🏦",name:"Treasury OS",desc:"DAO & fund rebalancing",risk:"Low",apy:"8-14%",preset:{name:"GEBRID Treasury Agent",aum:"10000000",maxTrade:"500000",stopLoss:"3",chain:"arbitrum",type:"standard"}},
    {icon:"📈",name:"Perps Trader",desc:"Hyperliquid / GMX / dYdX perps",risk:"High",apy:"25-80%",preset:{name:"GEBRID Perps Agent",aum:"500000",maxTrade:"100000",stopLoss:"5",chain:"arbitrum",type:"perps",protocol:"hyperliquid",leverage:"5",pair:"ETH-PERP"}},
    {icon:"🏛️",name:"Options Vault",desc:"Covered calls & protective puts",risk:"Medium",apy:"10-28%",preset:{name:"GEBRID Options Agent",aum:"2000000",maxTrade:"100000",stopLoss:"5",chain:"arbitrum",type:"standard"}},
    {icon:"🔒",name:"Stablecoin Optimizer",desc:"Curve, Convex, Pendle yield",risk:"Low",apy:"8-18%",preset:{name:"GEBRID Stables Agent",aum:"5000000",maxTrade:"500000",stopLoss:"2",chain:"ethereum",type:"standard"}},
    {icon:"💧",name:"Market Maker",desc:"Uniswap v3 concentrated LP",risk:"Medium",apy:"15-40%",preset:{name:"GEBRID MM Agent",aum:"3000000",maxTrade:"200000",stopLoss:"5",chain:"ethereum",type:"standard"}},
    {icon:"🗳️",name:"Governance Farmer",desc:"veToken bribes & vote incentives",risk:"Low",apy:"12-22%",preset:{name:"GEBRID Gov Agent",aum:"10000000",maxTrade:"500000",stopLoss:"3",chain:"ethereum",type:"standard"}},
    {icon:"🏜️",name:"Land Trader",desc:"On-chain land sniping",risk:"High",apy:"20-60%",preset:{name:"GEBRID Land Agent",aum:"250000",maxTrade:"50000",stopLoss:"15",chain:"polygon",type:"standard"}},
    {icon:"📜",name:"RWA Bridge",desc:"T-Bill tokenization",risk:"Low",apy:"6-9%",preset:{name:"GEBRID RWA Agent",aum:"25000000",maxTrade:"1000000",stopLoss:"2",chain:"ethereum",type:"standard"}},
  ];
  if(showGallery&&!deployed)return <div>
    <div style={{textAlign:"center",marginBottom:40,paddingTop:20}}>
      <h2 style={{fontSize:32,fontWeight:800,color:"#fff",margin:"0 0 8px"}}>Deploy an AI Agent <span style={{color:"#A3FF12"}}>in Minutes</span></h2>
      <p style={{fontSize:15,color:"#888",margin:"0 auto",maxWidth:520}}>Choose a template or start from scratch. Institutional-grade security built in.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:16,marginBottom:24}}>
      {TEMPLATES.map((t,i)=><Card key={i} onClick={()=>{setCfg(t.preset);setShowGallery(false);setStep(1);}} style={{cursor:"pointer"}}>
        <div style={{fontSize:32,marginBottom:10}}>{t.icon}</div>
        <h3 style={{fontSize:16,fontWeight:700,color:"#fff",margin:"0 0 6px"}}>{t.name}</h3>
        <p style={{fontSize:12,color:"#999",margin:"0 0 12px"}}>{t.desc}</p>
        <div style={{display:"flex",gap:8}}>
          <span style={{fontSize:11,color:"#A3FF12",fontWeight:600,padding:"2px 8px",borderRadius:4,background:"#A3FF1215"}}>{t.apy} APY</span>
          <RiskBadge l={t.risk.toLowerCase()}/>
        </div>
      </Card>)}
    </div>
  </div>;
  if(deployed)return <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,gap:16}}>
    <div style={{fontSize:56}}>✅</div>
    <h2 style={{fontSize:28,fontWeight:800,color:"#A3FF12",margin:0}}>Agent Live</h2>
    <div style={{padding:"16px 28px",borderRadius:12,background:"#0a0f0a",border:"1px solid #A3FF1240",textAlign:"center"}}>
      <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>{cfg.name}</div>
      {cfg.type==="perps"
        ?<div style={{fontSize:13,color:"#A3FF12"}}>🌊 {cfg.protocol.toUpperCase()} · {cfg.pair} · {cfg.leverage}x · Stop {cfg.stopLoss}%</div>
        :<div style={{fontSize:13,color:"#A3FF12"}}>⛓️ {cfg.chain} · ${Number(cfg.aum).toLocaleString()} USDC · Stop {cfg.stopLoss}%</div>
      }
      <div style={{display:"flex",gap:20,marginTop:12,justifyContent:"center"}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Status</div><div style={{fontSize:12,color:"#A3FF12",fontWeight:700}}>● ACTIVE</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Screening</div><div style={{fontSize:12,color:"#A3FF12",fontWeight:700}}>ON</div></div>
        <div style={{textAlign:"center"}}><div style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Network</div><div style={{fontSize:12,color:"#fff",fontWeight:700}}>{cfg.chain}</div></div>
      </div>
    </div>
    <div style={{display:"flex",gap:12}}><Btn onClick={()=>{setDeployed(false);setDeployStep(0);setStep(1);setShowGallery(!strategy);onBack()}}>Dashboard</Btn><Btn primary onClick={()=>{setDeployed(false);setDeployStep(0);setStep(1);setShowGallery(true)}}>Deploy Another</Btn></div>
  </div>;
  return <div>
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Btn onClick={()=>setShowGallery(true)}>← Templates</Btn><h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:0}}>Agent Builder</h2></div>
    <div style={{display:"flex",gap:8,marginBottom:24}}>
      {["Configure","Risk & Guard","Deploy"].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
        <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:step>i?"#A3FF12":step===i+1?"#A3FF1230":"#1F2937",color:step>i?"#000":step===i+1?"#A3FF12":"#666"}}>{i+1}</div>
        <span style={{fontSize:13,color:step===i+1?"#fff":"#666"}}>{s}</span>
        {i<2&&<div style={{width:30,height:1,background:step>i+1?"#A3FF12":"#333",margin:"0 4px"}}/>}
      </div>)}
    </div>
    <Card style={{maxWidth:640}}>
      {step===1&&<div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Agent Name</label>
          <input value={cfg.name} onChange={e=>setCfg(p=>({...p,name:e.target.value}))} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Capital (USDC)</label>
          <input type="number" value={cfg.aum} onChange={e=>setCfg(p=>({...p,aum:e.target.value}))} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Network</label>
          <div style={{display:"flex",gap:8}}>
            {["ethereum","base","arbitrum","polygon"].map(c=><button key={c} onClick={()=>setCfg(p=>({...p,chain:c}))} style={{flex:1,padding:"8px",borderRadius:6,border:cfg.chain===c?"1px solid #A3FF12":"1px solid #333",background:cfg.chain===c?"#A3FF1215":"#0A0A0A",color:cfg.chain===c?"#A3FF12":"#888",fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{c}</button>)}
          </div></div>
        {cfg.type==="perps"&&<div>
          <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Protocol</label>
            <div style={{display:"flex",gap:8}}>
              {[{id:"hyperliquid",label:"Hyperliquid"},{id:"gmx",label:"GMX"},{id:"dydx",label:"dYdX"}].map(p=><button key={p.id} onClick={()=>setCfg(c=>({...c,protocol:p.id}))} style={{flex:1,padding:"8px",borderRadius:6,border:cfg.protocol===p.id?"1px solid #A3FF12":"1px solid #333",background:cfg.protocol===p.id?"#A3FF1215":"#0A0A0A",color:cfg.protocol===p.id?"#A3FF12":"#888",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{p.label}</button>)}
            </div></div>
          <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Trading Pair</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {["ETH-PERP","BTC-PERP","SOL-PERP","ARB-PERP"].map(p=><button key={p} onClick={()=>setCfg(c=>({...c,pair:p}))} style={{padding:"6px 12px",borderRadius:6,border:cfg.pair===p?"1px solid #A3FF12":"1px solid #333",background:cfg.pair===p?"#A3FF1215":"#0A0A0A",color:cfg.pair===p?"#A3FF12":"#888",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{p}</button>)}
            </div></div>
          <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Leverage: {cfg.leverage}x</label>
            <input type="range" min="1" max="20" value={cfg.leverage} onChange={e=>setCfg(c=>({...c,leverage:e.target.value}))} style={{width:"100%",accentColor:"#A3FF12"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#555",marginTop:2}}><span>1x</span><span style={{color:"#FF9800",fontWeight:600}}>{cfg.leverage}x</span><span>20x</span></div>
          </div>
        </div>}
        <Btn primary onClick={()=>setStep(2)} style={{width:"100%"}}>Next</Btn>
      </div>}
      {step===2&&<div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Max Trade (USDC)</label>
          <input type="number" value={cfg.maxTrade} onChange={e=>setCfg(p=>({...p,maxTrade:e.target.value}))} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
        <div style={{marginBottom:14}}><label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Stop Loss (%)</label>
          <input type="number" value={cfg.stopLoss} onChange={e=>setCfg(p=>({...p,stopLoss:e.target.value}))} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/></div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:12,color:"#888",display:"block",marginBottom:8}}>Privacy Mode</label>
          <div style={{display:"flex",gap:6}}>
            {[["off","🌐 Off","#666"],["zk","🔵 ZK-Shielded","#5BA3E6"],["full","🔐 Full Privacy","#A3FF12"]].map(([id,label,c])=><button key={id} onClick={()=>setCfg(p=>({...p,privacy:id}))} style={{flex:1,padding:"8px 4px",borderRadius:6,border:`1px solid ${cfg.privacy===id?c:"#333"}`,background:cfg.privacy===id?`${c}15`:"#0A0A0A",color:cfg.privacy===id?c:"#666",fontSize:10,cursor:"pointer",fontFamily:"monospace",fontWeight:600}}>{label}</button>)}
          </div>
          <div style={{marginTop:8,padding:"8px 12px",borderRadius:6,background:"#0a0f0a",border:"1px solid #1F2937",fontSize:11,color:"#777",fontFamily:"monospace",minHeight:34}}>
            {!cfg.privacy||cfg.privacy==="off"?"Positions visible on-chain · Standard transparency":cfg.privacy==="zk"?"Position sizes hidden · Only aggregate data public · Wallet visible":"Full ZK: wallet, size & strategy encrypted · Only zk-proof public"}
          </div>
        </div>
        {/* Guard Rules */}
        <div style={{marginBottom:18}}>
          <label style={{fontSize:12,color:"#888",display:"block",marginBottom:8}}>🛡️ Guard Rules</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[["dustFilter","Dust Filter","Auto-quarantine micro-txs"],["addressPoison","Address Poisoning","Block lookalike addrs"],["maxSlippage","Max Slippage 2%","Reject high-slip trades"],["sanctionsCheck","Sanctions Check","OFAC/Chainalysis screen"],["flashloanGuard","Flashloan Guard","Block flashloan vectors"],["mevProtect","MEV Protection","Flashbots Protect routing"]].map(([id,label,desc])=>
              <div key={id} onClick={()=>setGuardRules(p=>({...p,[id]:!p[id]}))} style={{padding:"8px 10px",borderRadius:6,border:`1px solid ${guardRules[id]?"#A3FF1240":"#1F2937"}`,background:guardRules[id]?"#0d2818":"#0A0A0A",cursor:"pointer",transition:"all 0.2s"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:12,color:guardRules[id]?"#A3FF12":"#555"}}>{guardRules[id]?"☑":"☐"}</span>
                  <span style={{fontSize:11,fontWeight:600,color:guardRules[id]?"#fff":"#888"}}>{label}</span>
                </div>
                <div style={{fontSize:9,color:"#555",marginTop:2,marginLeft:18}}>{desc}</div>
              </div>
            )}
          </div>
        </div>
        {/* Backtest */}
        <div style={{marginBottom:14}}>
          <button onClick={runBacktest} disabled={backtesting} style={{width:"100%",padding:"10px",borderRadius:8,border:"1px dashed #5BA3E640",background:"#0a0a14",color:backtesting?"#555":"#5BA3E6",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"monospace"}}>
            {backtesting?"RUNNING BACKTEST...":"📊 Run 12-Month Backtest Simulation"}
          </button>
          {backtest&&<div style={{marginTop:10,padding:"14px",borderRadius:8,background:"#0d1520",border:"1px solid #1a2a3a"}}>
            <div style={{fontSize:10,color:"#5BA3E6",fontFamily:"monospace",marginBottom:8,fontWeight:700}}>BACKTEST RESULTS (12 MONTHS)</div>
            <svg width="100%" height="60" viewBox="0 0 240 60" style={{display:"block",marginBottom:10}}>
              <polyline points={backtest.curve.map((v,i)=>`${(i/(backtest.curve.length-1))*240},${60-((v-Math.min(...backtest.curve))/(Math.max(...backtest.curve)-Math.min(...backtest.curve)))*55}`).join(" ")} fill="none" stroke="#A3FF12" strokeWidth="1.5"/>
            </svg>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {[["Return",`${backtest.totalReturn>0?"+":""}${backtest.totalReturn}%`,backtest.totalReturn>0?"#A3FF12":"#FF5252"],["Sharpe",backtest.sharpe,"#5BA3E6"],["Max DD",`${backtest.maxDD}%`,"#FF9800"],["Win Rate",`${backtest.winRate}%`,"#A3FF12"],["Trades",backtest.trades,"#888"],["Avg Hold",backtest.avgHold,"#888"]].map(([l,v,c],i)=>
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontSize:14,fontWeight:700,color:c,fontFamily:"monospace"}}>{v}</div>
                  <div style={{fontSize:9,color:"#555"}}>{l}</div>
                </div>
              )}
            </div>
          </div>}
        </div>
        {/* AI Recommendations */}
        <div style={{marginBottom:14}}>
          <button onClick={runAiRec} disabled={aiLoading} style={{width:"100%",padding:"10px",borderRadius:8,border:"1px dashed #FF980040",background:"#0f0a05",color:aiLoading?"#555":"#FF9800",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"monospace"}}>
            {aiLoading?"ANALYZING...":"🤖 AI Strategy Recommendations"}
          </button>
          {aiRec&&<div style={{marginTop:10}}>
            {aiRec.map((r,i)=><div key={i} style={{padding:"10px 12px",borderRadius:8,background:"#111827",border:"1px solid #1F2937",marginBottom:6}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.title}</span>
                <span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:r.type==="risk"?"#FF980020":r.type==="cost"?"#A3FF1220":"#FF525220",color:r.type==="risk"?"#FF9800":r.type==="cost"?"#A3FF12":"#FF5252",fontWeight:600}}>{r.impact}</span>
              </div>
              <div style={{fontSize:11,color:"#888",lineHeight:1.4}}>{r.desc}</div>
            </div>)}
          </div>}
        </div>
        <div style={{display:"flex",gap:8}}><Btn onClick={()=>setStep(1)} style={{flex:1}}>Back</Btn><Btn primary onClick={()=>setStep(3)} style={{flex:2}}>Review</Btn></div>
      </div>}
      {step===3&&<div>
        {[["Agent",cfg.name],["Capital",`${Number(cfg.aum).toLocaleString()} USDC`],["Network",cfg.chain],...(cfg.type==="perps"?[["Protocol",cfg.protocol.toUpperCase()],["Pair",cfg.pair],["Leverage",`${cfg.leverage}x`]]:[[]]),...[["Max Trade",`$${Number(cfg.maxTrade).toLocaleString()}`],["Stop Loss",`${cfg.stopLoss}%`],["Guard Rules",`${Object.values(guardRules).filter(Boolean).length}/6 active`],["Protection","ON"],["Privacy Mode",!cfg.privacy||cfg.privacy==="off"?"Standard":cfg.privacy==="zk"?"ZK-Shielded":"Full ZK"]]].map(([k,v],i)=>
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #1F2937",fontSize:13}}>
            <span style={{color:"#888"}}>{k}</span><span style={{color:"#fff"}}>{v}</span>
          </div>
        )}
        {!deploying&&<div style={{display:"flex",gap:8,marginTop:18}}><Btn onClick={()=>setStep(2)} style={{flex:1}}>Back</Btn><Btn primary onClick={handleDeploy} style={{flex:2}}>⚡ Deploy Agent</Btn></div>}
        {deploying&&<div style={{marginTop:20,padding:"20px 0"}}>
          {/* Protocol target banner */}
          <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderRadius:10,background:"#0a0f0a",border:"1px solid #A3FF1240",marginBottom:20}}>
            <div style={{width:36,height:36,borderRadius:8,background:"#A3FF1215",border:"1px solid #A3FF1240",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>
              {cfg.type==="perps"?(cfg.protocol==="hyperliquid"?"🌊":cfg.protocol==="gmx"?"📊":"🔵"):"🤖"}
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{cfg.name}</div>
              <div style={{fontSize:11,color:"#A3FF12"}}>
                {cfg.type==="perps"?`Deploying to ${cfg.protocol.toUpperCase()} · ${cfg.pair} · ${cfg.leverage}x leverage`:`Deploying to ${cfg.chain} network`}
              </div>
            </div>
            <div style={{width:18,height:18,border:"2px solid #1F2937",borderTopColor:"#A3FF12",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>
          </div>
          {/* Deploy steps */}
          {[
            {label: cfg.type==="perps"?`Connecting to ${cfg.protocol.toUpperCase()} API`:"Initializing agent runtime", icon:"🔌"},
            {label: cfg.type==="perps"?`Funding wallet on ${cfg.chain} (${Number(cfg.aum).toLocaleString()} USDC)`:"Allocating capital", icon:"💰"},
            {label: cfg.type==="perps"?`Setting risk limits: max ${cfg.leverage}x · stop ${cfg.stopLoss}%`:"Applying risk policy", icon:"🛡️"},
            {label: cfg.type==="perps"?`Registering ${cfg.pair} strategy on-chain`:"Registering agent on-chain", icon:"⛓️"},
            {label: "Agent live — pre-sign screening active", icon:"✅"},
          ].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #111",opacity:deployStep>i?1:deployStep===i?0.9:0.25,transition:"opacity 0.3s"}}>
            <span style={{fontSize:14,width:22,textAlign:"center"}}>{deployStep>i?"✓":deployStep===i?s.icon:"○"}</span>
            <span style={{fontSize:12,color:deployStep>i?"#A3FF12":deployStep===i?"#fff":"#555",fontWeight:deployStep===i?600:400,fontFamily:"monospace"}}>{s.label}</span>
            {deployStep===i&&<div style={{marginLeft:"auto",width:14,height:14,border:"2px solid #1F2937",borderTopColor:"#A3FF12",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>}
          </div>)}
        </div>}
      </div>}
    </Card>
  </div>;
}

export default BuilderView;
