import React, { useState } from 'react';
import { Card, Btn } from '../components/ui';

function ZKPrivacyView() {
  const [kycMode,setKycMode]=useState("Regulator");
  const [verifying,setVerifying]=useState(false);
  const [verified,setVerified]=useState(false);
  const [proofHash]=useState("0x7a3f9b2c...e84d1f");
  const runVerify=()=>{
    setVerifying(true);setVerified(false);
    setTimeout(()=>{setVerifying(false);setVerified(true)},1600);
  };
  const DISCLOSURE={
    "Public":    {fields:["KYC Status","Jurisdiction","Accredited"],values:["✅ VERIFIED","✅ PERMITTED","✅ YES"],hidden:["Name","Wallet","Amount","Institution"]},
    "Auditor":   {fields:["KYC Status","Jurisdiction","Accredited","Institution type"],values:["✅ VERIFIED","✅ PERMITTED","✅ YES","Family Office"],hidden:["Name","Wallet","Amount"]},
    "Regulator": {fields:["KYC Status","Jurisdiction","Accredited","Institution","Amount range"],values:["✅ VERIFIED","✅ PERMITTED","✅ YES","[REDACTED]","$1M–$10M"],hidden:["Name","Wallet","Exact amount"]},
  };
  const disc=DISCLOSURE[kycMode]||DISCLOSURE["Regulator"];
  return <div>
    <div style={{marginBottom:24}}>
      <h3 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 6px"}}>ZK Privacy Layer — <span style={{color:"#A3FF12"}}>Investor Identity Shield</span></h3>
      <p style={{fontSize:13,color:"#888",margin:0,maxWidth:620,lineHeight:1.5}}>Institutional investors prove KYC compliance and accreditation without revealing identity, wallet, or exact amounts. Regulators receive selective disclosure — only what's required by law.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      {/* ZK KYC Card */}
      <Card style={{background:"#0a0f0a",border:"1px solid #1a3a1a"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:16,fontFamily:"monospace"}}>🔐 ZK-KYC VERIFICATION</div>
        <div style={{padding:"14px 16px",borderRadius:8,background:"#0A0A0A",border:"1px solid #1F2937",marginBottom:16}}>
          <div style={{fontSize:11,color:"#555",fontFamily:"monospace",marginBottom:10}}>INVESTOR PROOF PACKET</div>
          {[["Investor","██████████ (hidden)","#888"],["KYC Status","✅ VERIFIED (zk-proof)","#A3FF12"],["Jurisdiction","✅ PERMITTED","#A3FF12"],["Accredited","✅ YES","#A3FF12"],["Proof hash",proofHash,"#5BA3E6"]].map(([k,v,c],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #111",fontSize:12}}>
              <span style={{color:"#666"}}>{k}</span>
              <span style={{color:c,fontFamily:"monospace",fontWeight:600}}>{v}</span>
            </div>
          )}
        </div>
        <button onClick={runVerify} disabled={verifying} style={{width:"100%",padding:"10px",borderRadius:7,border:"none",background:verified?"#0d2818":"#A3FF12",color:verified?"#A3FF12":"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"monospace",marginBottom:10}}>
          {verifying?"VERIFYING PROOF...":verified?"✅ PROOF VERIFIED — VALID":"VERIFY ZK PROOF"}
        </button>
        {verified&&<div style={{padding:"10px 14px",borderRadius:8,background:"#051a05",border:"1px solid #A3FF1230",fontSize:11,color:"#A3FF12",fontFamily:"monospace"}}>
          ✓ Proof valid · KYC: compliant · Jurisdiction: permitted<br/>
          <span style={{color:"#555"}}>Public sees: 0 personal data</span>
        </div>}
      </Card>
      {/* Selective Disclosure Card */}
      <Card style={{background:"#0a0f0a",border:"1px solid #1a3a1a"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:16,fontFamily:"monospace"}}>📋 SELECTIVE DISCLOSURE</div>
        <div style={{display:"flex",gap:6,marginBottom:16}}>
          {["Public","Auditor","Regulator"].map(m=><button key={m} onClick={()=>setKycMode(m)} style={{flex:1,padding:"7px",borderRadius:6,border:`1px solid ${kycMode===m?"#A3FF12":"#333"}`,background:kycMode===m?"#A3FF1215":"#0A0A0A",color:kycMode===m?"#A3FF12":"#666",fontSize:11,cursor:"pointer",fontFamily:"monospace",fontWeight:600}}>{m}</button>)}
        </div>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:10,color:"#A3FF12",fontFamily:"monospace",marginBottom:8}}>✅ VISIBLE TO {kycMode.toUpperCase()}</div>
          {disc.fields.map((f,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #111",fontSize:12}}>
            <span style={{color:"#999"}}>{f}</span><span style={{color:"#A3FF12",fontFamily:"monospace"}}>{disc.values[i]}</span>
          </div>)}
        </div>
        <div>
          <div style={{fontSize:10,color:"#FF5252",fontFamily:"monospace",marginBottom:8}}>🔒 HIDDEN FROM {kycMode.toUpperCase()}</div>
          {disc.hidden.map((f,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #111",fontSize:12}}>
            <span style={{color:"#666"}}>{f}</span><span style={{color:"#333",fontFamily:"monospace"}}>██████ encrypted</span>
          </div>)}
        </div>
      </Card>
    </div>
    {/* ZK Privacy Tiers — Monetization */}
    <Card style={{background:"#0a0a14",border:"1px solid #1a1a3a"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div>
          <div style={{fontSize:12,fontWeight:700,color:"#5BA3E6",letterSpacing:1,fontFamily:"monospace"}}>🔐 PRIVACY TIERS</div>
          <div style={{fontSize:11,color:"#666",marginTop:2}}>Pay with subscription or hold $GEBRID for permanent access</div>
        </div>
        <div style={{padding:"4px 10px",borderRadius:4,background:"#A3FF1215",border:"1px solid #A3FF1230"}}>
          <span style={{fontSize:10,color:"#A3FF12",fontFamily:"monospace",fontWeight:700}}>TOKEN PRICE: $0.04</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {[
          {mode:"Standard",icon:"👁️",color:"#888",price:"Free",tokenReq:null,stakeReq:null,
           features:["Full on-chain transparency","Wallet visible","Position sizes public","Strategy visible","Basic analytics"],
           cta:"Current Plan",ctaStyle:{background:"#1F2937",color:"#888",cursor:"default"}},
          {mode:"ZK-Shielded",icon:"🔵",color:"#5BA3E6",price:"$99/mo",tokenReq:"Hold 50K $GEBRID",stakeReq:"Stake 10K $GEBRID",
           features:["Position sizes hidden","Aggregate data only public","Wallet visible to counterparties","Selective disclosure to auditors","Priority proof generation"],
           cta:"Upgrade →",ctaStyle:{background:"#5BA3E6",color:"#000",cursor:"pointer"},popular:true},
          {mode:"Full ZK",icon:"🔐",color:"#A3FF12",price:"$299/mo",tokenReq:"Hold 200K $GEBRID",stakeReq:"Stake 100K $GEBRID",
           features:["Wallet + size + strategy encrypted","Zero public data exposure","Regulatory selective disclosure","Institutional compliance proofs","Dedicated proof relayer","Custom disclosure templates"],
           cta:"Upgrade →",ctaStyle:{background:"#A3FF12",color:"#000",cursor:"pointer"}},
        ].map((t,i)=><div key={i} style={{padding:"20px",borderRadius:12,background:"#111827",border:`1px solid ${t.color}40`,position:"relative",display:"flex",flexDirection:"column"}}>
          {t.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",padding:"2px 12px",borderRadius:4,background:"#5BA3E6",color:"#000",fontSize:10,fontWeight:700,letterSpacing:1}}>POPULAR</div>}
          <div style={{textAlign:"center",marginBottom:16,paddingTop:t.popular?6:0}}>
            <div style={{fontSize:28,marginBottom:6}}>{t.icon}</div>
            <div style={{fontSize:16,fontWeight:800,color:t.color,marginBottom:2}}>{t.mode}</div>
            <div style={{fontSize:24,fontWeight:800,color:"#fff",marginBottom:2}}>{t.price}</div>
            {t.tokenReq&&<div style={{fontSize:10,color:"#A3FF12",fontFamily:"monospace",lineHeight:1.6}}>
              or {t.tokenReq} <span style={{color:"#555"}}>(permanent)</span><br/>
              or {t.stakeReq} <span style={{color:"#555"}}>(while staked)</span>
            </div>}
          </div>
          <div style={{flex:1,marginBottom:14}}>
            {t.features.map((f,j)=><div key={j} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11,color:"#999"}}>
              <span style={{color:t.color,fontSize:10}}>✓</span>{f}
            </div>)}
          </div>
          <button style={{width:"100%",padding:"10px",borderRadius:8,border:"none",fontSize:13,fontWeight:700,fontFamily:"inherit",...t.ctaStyle}}>{t.cta}</button>
        </div>)}
      </div>
    </Card>
    {/* Token Sink Explainer */}
    <Card style={{background:"#0a0f0a",border:"1px solid #1a3a1a",marginTop:16}}>
      <div style={{fontSize:12,fontWeight:700,color:"#A3FF12",letterSpacing:1,marginBottom:14,fontFamily:"monospace"}}>💎 WHY HOLD $GEBRID</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
        {[
          {icon:"🔐",title:"Permanent Privacy",desc:"Hold threshold → lifetime access to ZK tiers. No monthly payments, no expiry.",color:"#A3FF12"},
          {icon:"💰",title:"Staking Discount",desc:"Stake less tokens for the same tier. Earn staking rewards while maintaining privacy access.",color:"#5BA3E6"},
          {icon:"🔥",title:"Token Sink",desc:"Tokens held for privacy = reduced circulating supply. More users → more demand → natural price floor.",color:"#FF9800"},
        ].map((s,i)=><div key={i} style={{padding:"14px",borderRadius:8,background:"#111827",border:`1px solid ${s.color}20`}}>
          <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
          <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{s.title}</div>
          <div style={{fontSize:11,color:"#888",lineHeight:1.5}}>{s.desc}</div>
        </div>)}
      </div>
      <div style={{marginTop:14,padding:"10px 14px",borderRadius:8,background:"#0A0A0A",border:"1px solid #1F2937",fontSize:11,color:"#666",lineHeight:1.5}}>
        📊 <span style={{color:"#A3FF12",fontWeight:600}}>Economics:</span> At $0.04/token — ZK-Shielded via hold costs $2,000 once (50K tokens) vs $1,188/year subscription. Break-even: <span style={{color:"#fff",fontWeight:600}}>~20 months</span>. Full ZK via hold: $8,000 once vs $3,588/year. Break-even: <span style={{color:"#fff",fontWeight:600}}>~27 months</span>. Staking path costs 5x less upfront.
      </div>
    </Card>
  </div>;
}

export default ZKPrivacyView;
