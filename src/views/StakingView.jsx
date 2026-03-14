import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, Btn } from '../components/ui';
import { STAKING_TIERS, PROPOSALS } from '../data/mockData';

function StakingView() {
  const WALLET = "0x9a5a...fb13";
  const NETWORK = "Sepolia Testnet";
  // My position
  const myStaked = 47500;
  const myLockEnd = "Sep 14, 2025";
  const myTier = "Gold";
  const myTierColor = "#FFD700";
  const earned = 2847;
  const pendingReward = 312.4;
  const [stakeAmt,setStakeAmt]=useState("10000");
  const [lockDays,setLockDays]=useState(90);
  const [voted,setVoted]=useState({});
  const [justStaked,setJustStaked]=useState(false);
  const [claimed,setClaimed]=useState(false);
  const tier=Number(stakeAmt)>=100000?"Platinum":Number(stakeAmt)>=25000?"Gold":Number(stakeAmt)>=5000?"Silver":Number(stakeAmt)>=1000?"Bronze":"Free";
  const tierColor={"Platinum":"#E5E4E2","Gold":"#FFD700","Silver":"#C0C0C0","Bronze":"#CD7F32","Free":"#666"}[tier];
  const apy=lockDays>=365?22:lockDays>=180?18:lockDays>=90?15:12;
  // Live stakers feed
  const LIVE_FEED = [
    {addr:"0x3f2a...c891",action:"staked",amount:"250,000",tier:"Platinum",ago:"12s"},
    {addr:"0x7d1b...4a22",action:"staked",amount:"8,500",tier:"Silver",ago:"34s"},
    {addr:"0x1e9c...77ff",action:"claimed",amount:"1,247",tier:"Gold",ago:"1m"},
    {addr:"0xab4d...0312",action:"unstaked",amount:"15,000",tier:"Bronze",ago:"2m"},
    {addr:"0x5512...e9ac",action:"staked",amount:"100,000",tier:"Platinum",ago:"3m"},
    {addr:"0xc83a...2b10",action:"voted",amount:"GIP-04",tier:"Silver",ago:"4m"},
    {addr:"0x9a5a...fb13",action:"staked",amount:"47,500",tier:"Gold",ago:"6m",isMe:true},
    {addr:"0x44fa...9d01",action:"claimed",amount:"892",tier:"Bronze",ago:"8m"},
  ];
  const actionColor={staked:"#A3FF12",claimed:"#5BA3E6",unstaked:"#FF5252",voted:"#E040FB"};
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:0}}>$GEBRID Staking & Governance</h2>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderRadius:8,background:"#111827",border:"1px solid #1F2937"}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:"#A3FF12",boxShadow:"0 0 6px #A3FF12"}}/>
        <span style={{fontSize:12,color:"#A3FF12",fontWeight:600,fontFamily:"monospace"}}>{WALLET}</span>
        <span style={{width:1,height:14,background:"#333"}}/>
        <span style={{fontSize:11,color:"#666"}}>{NETWORK}</span>
      </div>
    </div>
    {/* Global metrics */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
      <Metric label="Total Staked" value="423M" sub="$GEBRID · 42.3% supply"/>
      <Metric label="Stakers" value="18,420" sub="unique wallets"/>
      <Metric label="Avg APY" value="16.8%" sub="weighted average"/>
      <Metric label="Your Tier" value={myTier} sub={`${myStaked.toLocaleString()} $GEBRID staked`}/>
    </div>
    {/* MY POSITION CARD */}
    <div style={{padding:"16px 20px",borderRadius:12,background:"linear-gradient(135deg,#0d1a0d,#111827)",border:`1px solid ${myTierColor}40`,marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>My Active Position</div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
            <span style={{fontSize:28,fontWeight:900,color:"#fff",fontFamily:"monospace"}}>{myStaked.toLocaleString()}</span>
            <span style={{fontSize:16,color:"#A3FF12",fontWeight:700}}>$GEBRID</span>
            <span style={{padding:"3px 10px",borderRadius:6,background:`${myTierColor}20`,color:myTierColor,fontSize:12,fontWeight:700,border:`1px solid ${myTierColor}40`}}>🥇 {myTier}</span>
          </div>
          <div style={{display:"flex",gap:16,fontSize:12}}>
            <span style={{color:"#888"}}>Lock ends: <span style={{color:"#fff",fontWeight:600}}>{myLockEnd}</span></span>
            <span style={{color:"#888"}}>APY: <span style={{color:"#A3FF12",fontWeight:600}}>18%</span></span>
            <span style={{color:"#888"}}>Earned total: <span style={{color:"#A3FF12",fontWeight:600}}>{earned.toLocaleString()} $GEBRID</span></span>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:"#888",marginBottom:4}}>Pending Rewards</div>
          <div style={{fontSize:32,fontWeight:900,color:"#A3FF12",fontFamily:"monospace",lineHeight:1}}>{pendingReward}</div>
          <div style={{fontSize:11,color:"#666",marginBottom:10}}>$GEBRID unclaimed</div>
          <button onClick={()=>setClaimed(true)} style={{padding:"8px 20px",borderRadius:7,border:"none",background:claimed?"#1F2937":"#A3FF12",color:claimed?"#888":"#000",fontSize:13,fontWeight:700,cursor:claimed?"default":"pointer",fontFamily:"inherit"}}>
            {claimed?"✓ Claimed":"Claim Rewards"}
          </button>
        </div>
      </div>
      {/* Position progress bar */}
      <div style={{marginTop:14}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#666",marginBottom:4}}>
          <span>Lock progress</span>
          <span>62 days remaining</span>
        </div>
        <div style={{height:5,borderRadius:3,background:"#1F2937",overflow:"hidden"}}>
          <div style={{width:"79%",height:"100%",background:`linear-gradient(90deg,${myTierColor},#A3FF12)`,borderRadius:3}}/>
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      {/* Stake form */}
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:14,color:"#fff"}}>Stake More $GEBRID</div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,color:"#888",display:"block",marginBottom:6}}>Amount</label>
          <input type="number" value={stakeAmt} onChange={e=>setStakeAmt(e.target.value)}
            style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:6,marginTop:6}}>
            {[1000,5000,25000,100000].map(v=><button key={v} onClick={()=>setStakeAmt(String(v))} style={{flex:1,padding:"4px",borderRadius:5,border:"1px solid #333",background:"#0A0A0A",color:"#666",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>{v>=1000?`${v/1000}K`:v}</button>)}
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <label style={{fontSize:11,color:"#888",display:"block",marginBottom:6}}>Lock period</label>
          <div style={{display:"flex",gap:6}}>
            {[{d:30,label:"30d",a:12},{d:90,label:"90d",a:15},{d:180,label:"180d",a:18},{d:365,label:"1yr",a:22}].map(o=><button key={o.d} onClick={()=>setLockDays(o.d)}
              style={{flex:1,padding:"8px 4px",borderRadius:6,border:lockDays===o.d?"1px solid #A3FF12":"1px solid #333",background:lockDays===o.d?"#A3FF1215":"#0A0A0A",color:lockDays===o.d?"#A3FF12":"#888",fontSize:11,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}}>
              <div style={{fontWeight:700}}>{o.label}</div>
              <div style={{fontSize:9,color:lockDays===o.d?"#A3FF12":"#555",marginTop:1}}>{o.a}% APY</div>
            </button>)}
          </div>
        </div>
        <div style={{padding:"12px 14px",borderRadius:8,background:"#0d1520",border:"1px solid #1F2937",marginBottom:12}}>
          {[
            ["You stake",`${Number(stakeAmt).toLocaleString()} $GEBRID`,"#fff"],
            ["APY",`${apy}%`,"#A3FF12"],
            ["Annual reward",`${Math.round(Number(stakeAmt)*apy/100).toLocaleString()} $GEBRID`,"#A3FF12"],
            ["New tier",tier,tierColor],
            ["Wallet",WALLET,"#888"],
          ].map(([k,v,c],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12,padding:"4px 0",borderBottom:i<4?"1px solid #1a2a3a":"none"}}>
            <span style={{color:"#888"}}>{k}</span>
            <span style={{color:c,fontWeight:600,fontFamily:k==="Wallet"?"monospace":"inherit"}}>{v}</span>
          </div>)}
        </div>
        <button onClick={()=>setJustStaked(true)} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:justStaked?"#1F2937":"#A3FF12",color:justStaked?"#888":"#000",fontSize:14,fontWeight:700,cursor:justStaked?"default":"pointer",fontFamily:"inherit"}}>
          {justStaked?"✓ Transaction Submitted":"⚡ Stake $GEBRID"}
        </button>
        {justStaked&&<div style={{marginTop:8,fontSize:11,color:"#A3FF12",textAlign:"center",fontFamily:"monospace"}}>
          TX: 0x7f3a...e912 · Sepolia · Confirming...
        </div>}
      </Card>
      {/* Tier benefits */}
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Tier Benefits</div>
        {STAKING_TIERS.map((t,i)=>{
          const isActive = t.tier===myTier;
          return <div key={i} style={{padding:"10px 12px",borderRadius:8,marginBottom:6,background:isActive?"#111827":"#0A0A0A",border:isActive?`1px solid ${t.color}`:"1px solid #1F2937",position:"relative"}}>
            {isActive&&<div style={{position:"absolute",right:8,top:8,fontSize:9,padding:"1px 6px",borderRadius:3,background:`${t.color}20`,color:t.color,fontWeight:700}}>YOUR TIER</div>}
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
              <span style={{fontWeight:700,color:t.color,fontSize:13}}>{t.tier}</span>
              <span style={{fontSize:11,color:"#888"}}>{t.min}+ $GEBRID</span>
            </div>
            <div style={{fontSize:11,color:"#888"}}>APY up to <span style={{color:t.color,fontWeight:600}}>{t.tier==="Platinum"?"22%":t.tier==="Gold"?"18%":t.tier==="Silver"?"15%":"12%"}</span> · {t.discount} fee discount</div>
            <div style={{fontSize:10,color:"#555",marginTop:3}}>{t.benefits.join(" · ")}</div>
          </div>;
        })}
      </Card>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      {/* Live stakers feed */}
      <Card>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{fontSize:14,fontWeight:600,color:"#fff"}}>Live Activity</div>
          <div style={{display:"flex",alignItems:"center",gap:5}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#A3FF12",boxShadow:"0 0 4px #A3FF12"}}/>
            <span style={{fontSize:10,color:"#A3FF12"}}>LIVE</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:1}}>
          {LIVE_FEED.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",borderRadius:6,background:f.isMe?"#0d2818":"transparent",border:f.isMe?"1px solid #A3FF1230":"1px solid transparent"}}>
            <span style={{fontSize:11,color:"#666",fontFamily:"monospace",minWidth:90}}>{f.addr}</span>
            <span style={{fontSize:11,fontWeight:600,color:actionColor[f.action],minWidth:52}}>{f.action}</span>
            <span style={{fontSize:11,color:"#fff",fontFamily:"monospace",flex:1}}>{f.amount}</span>
            <span style={{fontSize:10,color:"#555"}}>{f.ago}</span>
            {f.isMe&&<span style={{fontSize:9,color:"#A3FF12",fontWeight:700}}>YOU</span>}
          </div>)}
        </div>
      </Card>
      {/* Governance */}
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Governance Proposals</div>
        {PROPOSALS.map(p=>{
          const total=p.votes.f+p.votes.a;
          const pct=((p.votes.f/total)*100).toFixed(1);
          const myVote=voted[p.id];
          return <div key={p.id} style={{marginBottom:14,paddingBottom:14,borderBottom:"1px solid #1F2937"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,gap:8,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{p.title}</div>
                <div style={{fontSize:10,color:"#666",marginTop:1}}>by {p.author}</div>
              </div>
              <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:600,background:p.status==="active"?"#0d2818":"#1F2937",color:p.status==="active"?"#A3FF12":"#888",height:"fit-content"}}>{p.status}</span>
            </div>
            <div style={{background:"#0A0A0A",borderRadius:4,height:6,overflow:"hidden",marginBottom:4}}><div style={{width:`${pct}%`,height:"100%",background:"#A3FF12",borderRadius:4}}/></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:8}}>
              <span style={{color:"#A3FF12"}}>For {pct}%</span>
              <span style={{color:"#FF5252"}}>Against {(100-Number(pct)).toFixed(1)}%</span>
            </div>
            {p.status==="active"&&!myVote&&<div style={{display:"flex",gap:6}}>
              <button onClick={()=>setVoted(v=>({...v,[p.id]:"for"}))} style={{flex:1,padding:"6px",borderRadius:5,border:"1px solid #A3FF12",background:"transparent",color:"#A3FF12",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✓ Vote For</button>
              <button onClick={()=>setVoted(v=>({...v,[p.id]:"against"}))} style={{flex:1,padding:"6px",borderRadius:5,border:"1px solid #FF5252",background:"transparent",color:"#FF5252",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✗ Against</button>
            </div>}
            {myVote&&<div style={{padding:"5px 10px",borderRadius:5,background:myVote==="for"?"#0d2818":"#2a0a0a",fontSize:11,color:myVote==="for"?"#A3FF12":"#FF5252",fontWeight:600}}>
              {myVote==="for"?"✓ You voted FOR":"✗ You voted AGAINST"} · {(myStaked/1000).toFixed(1)}K voting power used
            </div>}
          </div>;
        })}
      </Card>
    </div>
  </div>;
}

export default StakingView;
