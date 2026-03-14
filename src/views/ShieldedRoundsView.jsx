import React, { useState } from 'react';
import { Card, Btn, Metric } from '../components/ui';

const SHIELDED_ROUNDS=[
  {id:"SR-001",name:"Angel Round",status:"closed",raised:"$350K",target:"$350K",pct:100,investors:"🔐",minEntry:"$100K",maxEntry:"$350K",lockup:"18 months",zkProof:"0x9a3f...7b2e",proofStatus:"verified",chain:"Ethereum",tge:"Q3 2026",vesting:"18mo linear after 6mo cliff",color:"#FF5252",price:"$0.007",tokens:"50M",tgeUnlock:"10%",discount:"82.5%"},
  {id:"SR-002",name:"Pre-Seed Round",status:"active",raised:"$300K",target:"$700K",pct:43,investors:"🔐",minEntry:"$50K",maxEntry:"$200K",lockup:"18 months",zkProof:"0x1d4c...e83a",proofStatus:"verified",chain:"Ethereum",tge:"Q3 2026",vesting:"18mo linear after 6mo cliff",color:"#FF9800",price:"$0.01",tokens:"70M",tgeUnlock:"10%",discount:"75%"},
  {id:"SR-003",name:"Seed Round",status:"upcoming",raised:"$0",target:"$1.6M",pct:0,investors:0,minEntry:"$100K",maxEntry:"$500K",lockup:"24 months",zkProof:null,proofStatus:"pending",chain:"Ethereum",tge:"Q3 2026",vesting:"24mo linear after 6mo cliff",color:"#5BA3E6",price:"$0.02",tokens:"80M",tgeUnlock:"0%",discount:"50%"},
  {id:"SR-004",name:"Private Round",status:"upcoming",raised:"$0",target:"$3.6M",pct:0,investors:0,minEntry:"$250K",maxEntry:"$2M",lockup:"12 months",zkProof:null,proofStatus:"pending",chain:"Ethereum",tge:"Q3 2026",vesting:"12mo linear after 3mo cliff",color:"#E040FB",price:"$0.03",tokens:"120M",tgeUnlock:"10%",discount:"25%"},
  {id:"SR-005",name:"Public Round",status:"upcoming",raised:"$0",target:"$4M",pct:0,investors:0,minEntry:"$100",maxEntry:"$50K",lockup:"6 months",zkProof:null,proofStatus:"pending",chain:"Ethereum",tge:"Q3 2026",vesting:"6mo linear after 1mo cliff",color:"#00E5FF",price:"$0.04",tokens:"100M",tgeUnlock:"10%",discount:"—"},
];
function ShieldedRoundsView() {
  const [selected,setSelected]=useState(null);
  const [verifying,setVerifying]=useState(null);
  const [verified,setVerified]=useState({});
  const [commitModal,setCommitModal]=useState(null);
  const [commitAmt,setCommitAmt]=useState("");
  const [commitStep,setCommitStep]=useState(0);
  const runVerify=(id)=>{
    setVerifying(id);
    setTimeout(()=>{setVerifying(null);setVerified(p=>({...p,[id]:true}))},1400);
  };
  const runCommit=()=>{
    setCommitStep(1);
    setTimeout(()=>setCommitStep(2),800);
    setTimeout(()=>setCommitStep(3),1600);
    setTimeout(()=>setCommitStep(4),2400);
  };
  const statusC={active:"#FF9800",upcoming:"#5BA3E6",closed:"#FF5252"};
  const statusL={active:"● RAISING",upcoming:"◐ UPCOMING",closed:"✓ SOLD OUT"};
  return <div>
    <div style={{marginBottom:24}}>
      <h2 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 6px"}}>🔒 Shielded Rounds — <span style={{color:"#A3FF12"}}>ZK-Verified Fundraising</span></h2>
      <p style={{fontSize:13,color:"#888",margin:0,maxWidth:620,lineHeight:1.5}}>Institutional investors participate in funding rounds with zero-knowledge identity verification. Commitment sizes, wallet addresses, and investor identities remain encrypted — only aggregate totals are public.</p>
    </div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      <Metric label="Total Raised" value="$650K" trend={14.2} sub="Angel + Pre-seed"/>
      <Metric label="Target Total" value="$10.25M" sub="across 5 rounds"/>
      <Metric label="Investors" value="🔐" sub="identities shielded"/>
      <Metric label="Next Round" value="Seed $0.02" sub="raising $1.6M"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16,marginBottom:20}}>
      {SHIELDED_ROUNDS.map(r=>{
        const isVer=verified[r.id];
        return <Card key={r.id} onClick={()=>setSelected(selected===r.id?null:r.id)} style={{cursor:"pointer",border:`1px solid ${selected===r.id?r.color:"#1F2937"}`,transition:"border-color 0.2s"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontSize:11,color:r.color,fontWeight:700,fontFamily:"monospace"}}>{r.id}</div>
              <div style={{fontSize:15,fontWeight:700,color:"#fff",marginTop:2}}>{r.name}</div>
            </div>
            <span style={{padding:"3px 10px",borderRadius:4,background:`${statusC[r.status]}20`,color:statusC[r.status],fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{statusL[r.status]}</span>
          </div>
          <div style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4}}>
              <span style={{color:"#aaa"}}>Raised</span>
              <span style={{color:r.color,fontFamily:"monospace",fontWeight:700}}>{r.raised} / {r.target}</span>
            </div>
            <div style={{background:"#1F2937",borderRadius:3,height:6,overflow:"hidden"}}>
              <div style={{width:`${r.pct}%`,height:"100%",background:`linear-gradient(90deg,${r.color},#A3FF12)`,borderRadius:3,transition:"width 0.5s"}}/>
            </div>
            <div style={{fontSize:10,color:"#555",marginTop:3}}>{typeof r.investors==="string"?"identities shielded":r.investors+" participants"} · ZK-encrypted</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div style={{padding:"8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",marginBottom:2}}>MIN ENTRY</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.minEntry}</div>
            </div>
            <div style={{padding:"8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",marginBottom:2}}>LOCKUP</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{r.lockup}</div>
            </div>
          </div>
          {selected===r.id&&<div style={{borderTop:"1px solid #1F2937",paddingTop:12,marginBottom:12}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,fontSize:12}}>
              {[["Price",r.price],["Tokens",r.tokens],["Discount",r.discount],["TGE Unlock",r.tgeUnlock],["Chain",r.chain],["TGE",r.tge],["Max Entry",r.maxEntry],["Vesting",r.vesting]].map(([k,v],i)=>
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0"}}>
                  <span style={{color:"#666"}}>{k}</span><span style={{color:"#ccc",fontFamily:"monospace",fontSize:11}}>{v}</span>
                </div>
              )}
            </div>
          </div>}
          <div style={{padding:"8px 12px",borderRadius:6,background:isVer?"#051a05":"#0a0a14",border:`1px solid ${isVer?"#A3FF1230":"#1F2937"}`,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:11}}>{isVer?"✅":"🔐"}</span>
                <span style={{fontSize:11,color:isVer?"#A3FF12":"#888",fontFamily:"monospace"}}>{isVer?"ZK PROOF VERIFIED":"ZK Proof: "+r.proofStatus}</span>
              </div>
              {r.zkProof&&<span style={{fontSize:10,color:r.status==="closed"||r.status==="active"?"#A3FF1280":"#555",fontFamily:"monospace"}}>{r.status==="closed"||r.status==="active"?"🔐 shielded":r.zkProof}</span>}
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            {r.zkProof&&<button onClick={e=>{e.stopPropagation();runVerify(r.id)}} disabled={verifying===r.id} style={{flex:1,padding:"8px",borderRadius:6,border:`1px solid ${isVer?"#A3FF1240":"#333"}`,background:isVer?"#A3FF1210":"transparent",color:isVer?"#A3FF12":"#888",fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:600}}>
              {verifying===r.id?"VERIFYING...":isVer?"✓ VERIFIED":"Verify Proof"}
            </button>}
            {r.status==="active"&&<button onClick={e=>{e.stopPropagation();setCommitModal(r);setCommitAmt("");setCommitStep(0)}} style={{flex:2,padding:"8px",borderRadius:6,border:"none",background:r.color,color:"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Commit Capital →</button>}
            {r.status==="upcoming"&&<button style={{flex:2,padding:"8px",borderRadius:6,border:`1px solid ${r.color}`,background:"transparent",color:r.color,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Join Waitlist</button>}
            {r.status==="closed"&&<button disabled style={{flex:2,padding:"8px",borderRadius:6,border:"1px solid #333",background:"transparent",color:"#444",fontSize:12,cursor:"default",fontFamily:"inherit"}}>Round Closed</button>}
          </div>
        </Card>;
      })}
    </div>
    <Card style={{background:"#0a0a14",border:"1px solid #1a1a3a"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#5BA3E6",letterSpacing:1,marginBottom:14,fontFamily:"monospace"}}>🛡️ HOW SHIELDED ROUNDS WORK</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
        {[
          {step:"1",icon:"🔐",title:"ZK Identity",desc:"Investor proves KYC + accreditation without revealing name or wallet"},
          {step:"2",icon:"💰",title:"Shielded Commit",desc:"Capital commitment is encrypted — only aggregate totals visible"},
          {step:"3",icon:"✅",title:"Proof Verify",desc:"Anyone can verify proof validity without seeing underlying data"},
          {step:"4",icon:"🔖",title:"NFT Vesting",desc:"Locked tokens minted as tradeable Vesting NFTs"},
        ].map((s,i)=><div key={i} style={{padding:"14px",borderRadius:8,background:"#111827",border:"1px solid #1F293740",textAlign:"center"}}>
          <div style={{fontSize:9,color:"#5BA3E6",fontFamily:"monospace",marginBottom:6}}>STEP {s.step}</div>
          <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
          <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:4}}>{s.title}</div>
          <div style={{fontSize:10,color:"#666",lineHeight:1.4}}>{s.desc}</div>
        </div>)}
      </div>
    </Card>
    {commitModal&&<div style={{position:"fixed",inset:0,background:"#000a",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setCommitModal(null)}>
      <div style={{background:"#111827",borderRadius:16,border:`1px solid ${commitModal.color}`,padding:28,maxWidth:460,width:"90%"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:13,color:commitModal.color,fontWeight:700,fontFamily:"monospace"}}>{commitModal.id}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",marginTop:2}}>Commit to {commitModal.name}</div>
          </div>
          <button onClick={()=>setCommitModal(null)} style={{background:"transparent",border:"none",color:"#666",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        {commitStep===0&&<div>
          <div style={{padding:"12px 16px",borderRadius:8,background:"#0A0A0A",fontSize:12,marginBottom:16}}>
            {[["Round",commitModal.name],["Min",commitModal.minEntry],["Max",commitModal.maxEntry],["Lockup",commitModal.lockup],["Vesting",commitModal.vesting]].map(([k,v],i)=>
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid #111"}}>
                <span style={{color:"#666"}}>{k}</span><span style={{color:"#fff",fontFamily:"monospace"}}>{v}</span>
              </div>
            )}
          </div>
          <label style={{fontSize:12,color:"#888",display:"block",marginBottom:6}}>Commitment Amount (USDC)</label>
          <input type="number" value={commitAmt} onChange={e=>setCommitAmt(e.target.value)} placeholder="250,000" style={{width:"100%",padding:"12px 14px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:16,fontFamily:"monospace",outline:"none",boxSizing:"border-box",marginBottom:16}}/>
          <div style={{padding:"10px 14px",borderRadius:8,background:"#0a0f0a",border:"1px solid #A3FF1230",fontSize:11,color:"#888",marginBottom:16}}>
            🔐 Your identity and commitment size will be encrypted via ZK proof. Only aggregate round totals are publicly visible.
          </div>
          <button onClick={runCommit} disabled={!commitAmt} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:commitAmt?commitModal.color:"#333",color:commitAmt?"#000":"#666",fontSize:14,fontWeight:700,cursor:commitAmt?"pointer":"default",fontFamily:"inherit"}}>
            Generate ZK Proof & Commit →
          </button>
        </div>}
        {commitStep>0&&<div>
          {[
            {label:"Generating ZK identity proof",icon:"🔐"},
            {label:"Encrypting commitment amount",icon:"💰"},
            {label:"Submitting shielded transaction",icon:"⛓️"},
            {label:"Commitment confirmed — identity shielded",icon:"✅"},
          ].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid #111",opacity:commitStep>i?1:commitStep===i?0.9:0.25}}>
            <span style={{fontSize:14,width:22,textAlign:"center"}}>{commitStep>i?"✓":commitStep===i?s.icon:"○"}</span>
            <span style={{fontSize:12,color:commitStep>i?"#A3FF12":commitStep===i?"#fff":"#555",fontWeight:commitStep===i?600:400,fontFamily:"monospace"}}>{s.label}</span>
            {commitStep===i&&i<3&&<div style={{marginLeft:"auto",width:14,height:14,border:"2px solid #1F2937",borderTopColor:commitModal.color,borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>}
          </div>)}
          {commitStep>=4&&<div style={{marginTop:16,padding:"14px",borderRadius:8,background:"#051a05",border:"1px solid #A3FF1240",textAlign:"center"}}>
            <div style={{fontSize:16,fontWeight:700,color:"#A3FF12",marginBottom:4}}>✅ Shielded Commitment Complete</div>
            <div style={{fontSize:12,color:"#888"}}>${Number(commitAmt).toLocaleString()} USDC committed · ZK proof generated</div>
            <div style={{fontSize:10,color:"#A3FF1280",marginTop:4,fontFamily:"monospace"}}>🔐 Proof generated · hash shielded</div>
          </div>}
        </div>}
      </div>
    </div>}
  </div>;
}

export default ShieldedRoundsView;
