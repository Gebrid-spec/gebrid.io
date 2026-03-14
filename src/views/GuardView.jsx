import React, { useState } from 'react';
import { Card, RiskRing } from '../components/ui';
import { TEST_TXS, PREFLIGHT_SCENARIOS } from '../data/mockData';

function GuardView() {
  const [tab,setTab]=useState("simulator");
  const [selectedTx,setSelectedTx]=useState(null);
  const [evalResult,setEvalResult]=useState(null);
  const [animating,setAnimating]=useState(false);
  const [blockedToday,setBlockedToday]=useState(4220);
  const [approvedToday,setApprovedToday]=useState(18947);
  const [selectedScenario,setSelectedScenario]=useState(null);
  const [preflightRunning,setPreflightRunning]=useState(false);
  const [preflightChecks,setPreflightChecks]=useState([]);
  const [preflightDone,setPreflightDone]=useState(false);
  const [scanTime,setScanTime]=useState(0);
  const rColors={CLEAR:"#A3FF12",BLOCK:"#FF5252",WARN:"#FF9800",SKIP:"#444"};
  const runEval=(tx)=>{
    setSelectedTx(tx.id);setEvalResult(null);setAnimating(true);
    setTimeout(()=>{setEvalResult(tx);setAnimating(false);if(tx.verdict==="BLOCKED")setBlockedToday(p=>p+1);else setApprovedToday(p=>p+1)},800);
  };
  const runPreflight=(scenario)=>{
    setSelectedScenario(scenario);setPreflightRunning(true);setPreflightDone(false);setPreflightChecks([]);
    const start=Date.now();
    scenario.checks.forEach((check,i)=>{
      setTimeout(()=>{
        setPreflightChecks(p=>[...p,check]);
        if(check.r==="BLOCK"||i===scenario.checks.length-1)
          setTimeout(()=>{setPreflightRunning(false);setPreflightDone(true);setScanTime(Date.now()-start)},200);
      },(i+1)*280);
    });
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <div>
        <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:0}}>🛡️ Guard Agents — Protection Layer</h2>
        <p style={{fontSize:13,color:"#888",margin:"4px 0 0"}}>Interactive security simulators</p>
      </div>
      <div style={{display:"flex",gap:4,background:"#111827",borderRadius:8,padding:3,flexWrap:"wrap"}}>
        {[["simulator","⚡ Protection Agent"],["preflight","🔒 Payment Guard"],["quarantine","🧪 Dust Quarantine"],["zkprivacy","🔐 ZK Privacy"]].map(([id,label])=>
          <button key={id} onClick={()=>setTab(id)} style={{padding:"8px 16px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"monospace",background:tab===id?"#A3FF12":"transparent",color:tab===id?"#000":"#888"}}>{label}</button>
        )}
      </div>
    </div>
    {tab==="simulator"&&<Card style={{background:"#0a0f0a",border:"1px solid #1a2a1a",padding:0,overflow:"hidden"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:"1px solid #1a2a1a"}}>
        <span style={{fontSize:13,fontWeight:700,color:"#999",fontFamily:"monospace",letterSpacing:1}}>⚡ PROTECTION AGENT · LIVE SIMULATOR</span>
        <div style={{display:"flex",gap:8}}>
          <span style={{padding:"3px 10px",borderRadius:4,background:"#A3FF1220",color:"#A3FF12",fontSize:11,fontWeight:700,fontFamily:"monospace"}}>DEMO</span>
          <span style={{fontSize:11,color:"#FF5252"}}>● INTERCEPTING</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:340}}>
        <div style={{padding:20,borderRight:"1px solid #1a2a1a"}}>
          <div style={{fontSize:11,color:"#666",fontFamily:"monospace",marginBottom:12}}>TEST TRANSACTION</div>
          {TEST_TXS.map(tx=><div key={tx.id} onClick={()=>runEval(tx)} style={{padding:"12px 16px",borderRadius:8,marginBottom:8,cursor:"pointer",border:`1px solid ${selectedTx===tx.id?(tx.verdict==="APPROVED"?"#A3FF12":"#FF5252"):"#1F2937"}`,background:selectedTx===tx.id?"#111":"#0A0A0A"}}>
            <div style={{fontSize:13,fontWeight:700,color:tx.verdict==="APPROVED"?"#A3FF12":"#FF5252",fontFamily:"monospace"}}>{tx.name}</div>
            <div style={{fontSize:11,color:"#666",fontFamily:"monospace",marginTop:2}}>{tx.fn}</div>
          </div>)}
        </div>
        <div style={{padding:20}}>
          <div style={{fontSize:11,color:"#666",fontFamily:"monospace",marginBottom:12}}>EVALUATION RESULT</div>
          {animating&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:250,color:"#888",fontFamily:"monospace"}}>Scanning transaction...</div>}
          {!animating&&!evalResult&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:250,color:"#333",fontSize:13}}>Select a transaction to evaluate</div>}
          {!animating&&evalResult&&<div>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
              <RiskRing score={evalResult.risk}/>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:evalResult.verdict==="BLOCKED"?"#FF5252":"#A3FF12",fontFamily:"monospace"}}>{evalResult.verdict}</div>
                <div style={{fontSize:11,color:"#666",fontFamily:"monospace"}}>risk score {evalResult.risk}/100</div>
              </div>
            </div>
            {evalResult.flags.map((f,i)=><div key={i} style={{fontSize:12,color:"#999",fontFamily:"monospace",padding:"3px 0"}}>→ {f}</div>)}
            <div style={{marginTop:14,padding:"12px 16px",borderRadius:8,background:evalResult.verdict==="BLOCKED"?"#1a0505":"#051a05",border:`1px solid ${evalResult.detailColor}30`}}>
              <span style={{fontSize:12,color:evalResult.detailColor,lineHeight:1.5}}>{evalResult.detail}</span>
            </div>
          </div>}
        </div>
      </div>
      <div style={{display:"flex",gap:20,padding:"12px 20px",borderTop:"1px solid #1a2a1a",fontFamily:"monospace",fontSize:12}}>
        <span style={{color:"#666"}}>BLOCKED TODAY <span style={{color:"#FF5252",fontWeight:700}}>{blockedToday.toLocaleString()}</span></span>
        <span style={{color:"#666"}}>APPROVED <span style={{color:"#A3FF12",fontWeight:700}}>{approvedToday.toLocaleString()}</span></span>
      </div>
    </Card>}
    {tab==="preflight"&&<div>
      <div style={{marginBottom:24}}>
        <h3 style={{fontSize:28,fontWeight:800,color:"#fff",margin:"0 0 8px",lineHeight:1.2}}>$50M almost left to the wrong wallet. <span style={{color:"#A3FF12"}}>7 layers caught it.</span></h3>
        <p style={{fontSize:14,color:"#888",margin:0,maxWidth:600,lineHeight:1.5}}>Before any outgoing transaction is signed, the system runs a pre-flight scan — address poisoning detection, dust quarantine cross-reference, anomaly analysis. Try it below.</p>
      </div>
      <Card style={{background:"#0a0f0a",border:"1px solid #1a2a1a",padding:0}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:440}}>
          <div style={{padding:24,borderRight:"1px solid #1a2a1a"}}>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:11,color:"#555",fontFamily:"monospace",marginBottom:6}}>RECIPIENT ADDRESS</div>
              <div style={{padding:"12px 14px",borderRadius:8,background:"#111",border:"1px solid #1F2937",fontFamily:"monospace",fontSize:12,color:"#888"}}>
                {selectedScenario?.addr||"Select a scenario below"}
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <div style={{fontSize:11,color:"#555",fontFamily:"monospace",marginBottom:6}}>TRANSFER AMOUNT</div>
              <div style={{padding:"12px 14px",borderRadius:8,background:"#111",border:"1px solid #1F2937",fontFamily:"monospace",fontSize:16,fontWeight:700,color:"#fff"}}>{selectedScenario?.amount||"$0"}</div>
            </div>
            <div style={{fontSize:11,color:"#555",fontFamily:"monospace",marginBottom:10}}>SCENARIO</div>
            {PREFLIGHT_SCENARIOS.map(s=><div key={s.id} onClick={()=>!preflightRunning&&runPreflight(s)} style={{padding:"10px 14px",borderRadius:8,marginBottom:8,cursor:preflightRunning?"wait":"pointer",border:`1px solid ${selectedScenario?.id===s.id?s.color:"#1F2937"}`,background:selectedScenario?.id===s.id?"#111":"#0A0A0A"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span>{s.icon}</span><span style={{fontSize:13,fontWeight:700,color:s.color}}>{s.name}</span></div>
              <div style={{fontSize:11,color:"#666",marginTop:2}}>{s.desc}</div>
            </div>)}
            {selectedScenario&&!preflightRunning&&preflightDone&&<button onClick={()=>runPreflight(selectedScenario)} style={{width:"100%",padding:"14px",borderRadius:8,border:"none",background:"#A3FF12",color:"#000",fontSize:14,fontWeight:800,fontFamily:"monospace",cursor:"pointer",marginTop:8}}>RUN AGAIN →</button>}
          </div>
          <div style={{padding:24}}>
            {!selectedScenario&&<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#333",fontSize:13}}>Select a scenario to run preflight scan</div>}
            {selectedScenario&&<div>
              {preflightDone&&<div style={{padding:"16px 20px",borderRadius:12,marginBottom:20,background:preflightChecks.some(c=>c.r==="BLOCK")?"#1a0505":"#051a05",border:`1px solid ${preflightChecks.some(c=>c.r==="BLOCK")?"#FF525240":"#A3FF1240"}`}}>
                <div style={{fontSize:18,fontWeight:800,fontFamily:"monospace",color:preflightChecks.some(c=>c.r==="BLOCK")?"#FF5252":"#A3FF12"}}>
                  {preflightChecks.some(c=>c.r==="BLOCK")?"🚫 TRANSACTION BLOCKED":"✅ TRANSACTION APPROVED"}
                </div>
              </div>}
              {selectedScenario.checks.map((check,i)=>{
                const ran=preflightChecks.length>i;
                const result=ran?preflightChecks[i]:null;
                const isRunning=preflightRunning&&preflightChecks.length===i;
                return <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #1a1a2a",opacity:ran||isRunning?1:0.3}}>
                  <span style={{fontSize:13,color:ran?"#ddd":"#555",fontFamily:"monospace"}}>{check.n}</span>
                  <span style={{fontSize:11,fontWeight:700,fontFamily:"monospace",color:result?rColors[result.r]:"#333"}}>
                    {isRunning?"SCANNING...":result?.r||"SKIP"}
                  </span>
                </div>;
              })}
              {preflightDone&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:16}}>
                {[[preflightChecks.length,"CHECKS","#00E5FF"],[`${scanTime||selectedScenario.scanMs}ms`,"SCAN TIME","#A3FF12"],[selectedScenario.riskScore,"RISK SCORE",preflightChecks.some(c=>c.r==="BLOCK")?"#FF5252":"#A3FF12"]].map(([v,l,c],i)=>
                  <div key={i} style={{padding:12,borderRadius:8,background:"#0d1520",border:"1px solid #1a2a3a",textAlign:"center"}}>
                    <div style={{fontSize:20,fontWeight:800,fontFamily:"monospace",color:c}}>{v}</div>
                    <div style={{fontSize:10,color:"#666",fontFamily:"monospace",marginTop:2}}>{l}</div>
                  </div>
                )}
              </div>}
            </div>}
          </div>
        </div>
      </Card>
    </div>}
    {tab==="quarantine"&&<div>
      <div style={{marginBottom:24}}>
        <h3 style={{fontSize:28,fontWeight:800,color:"#fff",margin:"0 0 8px"}}>Dust attacks caught <span style={{color:"#FF9800"}}>before they touch your wallet.</span></h3>
        <p style={{fontSize:14,color:"#888",margin:0,maxWidth:650,lineHeight:1.5}}>Every incoming transaction under the dust threshold is auto-quarantined. Poisoned addresses never enter your transaction history — preventing copy-paste attacks.</p>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:16}}>
        <Metric label="Quarantined" value="1,847" warn={true}/><Metric label="Drain Prevented" value="$4.2M"/><Metric label="Auto-Purged" value="1,203"/>
      </div>
      <Card style={{background:"#0a0f0a",border:"1px solid #1a2a1a",padding:0,overflow:"hidden",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:"1px solid #1a2a1a"}}>
          <span style={{fontSize:13,fontWeight:700,color:"#999",fontFamily:"monospace"}}>🧪 QUARANTINE ZONE · LIVE MONITOR</span>
          <span style={{fontSize:11,color:"#FF9800"}}>● SCANNING INBOUND</span>
        </div>
        <div style={{padding:"16px 20px"}}>
          {[
            {time:"14:42:18",from:"0xA1B2...9B2f",amount:"0.00001 ETH",reason:"Address poisoning",status:"quarantined",detail:"Sender mimics your vault address. Classic address poisoning — designed to trick copy-paste."},
            {time:"14:38:05",from:"0x8f3a...a21c",amount:"0.00042 ETH",reason:"Denylisted sender",status:"quarantined",detail:"Address on Chainalysis denylist. Connected to 14 known phishing campaigns."},
            {time:"14:21:33",from:"0xDEAD...d6E7",amount:"0.0001 USDT",reason:"Sequential dust (4th in 48h)",status:"quarantined",detail:"4th micro-tx from this address in 48h. Pattern matches dust-then-drain sequence."},
            {time:"13:30:44",from:"0x1234...QrSt",amount:"24.5 ETH",reason:"—",status:"accepted",detail:"Known counterparty, address book match, normal amount."},
          ].map((tx,i)=><div key={i}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #1a2a1a",fontSize:12,alignItems:"center",flexWrap:"wrap",gap:8}}>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{color:"#666",fontFamily:"monospace"}}>{tx.time}</span>
                <span style={{color:"#999",fontFamily:"monospace"}}>{tx.from}</span>
                <span style={{color:tx.status==="accepted"?"#A3FF12":"#FF9800",fontWeight:600}}>{tx.amount}</span>
              </div>
              <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,background:tx.status==="accepted"?"#0d2818":"#2a1f00",color:tx.status==="accepted"?"#A3FF12":"#FF9800",fontFamily:"monospace"}}>{tx.status.toUpperCase()}</span>
            </div>
            {tx.status==="quarantined"&&<div style={{padding:"8px 12px 8px 16px",fontSize:11,color:"#888",lineHeight:1.4}}>
              {tx.detail}
              <div style={{display:"flex",gap:6,marginTop:6}}>
                <button style={{padding:"3px 10px",borderRadius:4,border:"1px solid #FF5252",background:"transparent",color:"#FF5252",fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"monospace"}}>DESTROY TX</button>
                <button style={{padding:"3px 10px",borderRadius:4,border:"1px solid #333",background:"transparent",color:"#666",fontSize:10,cursor:"pointer",fontFamily:"monospace"}}>RELEASE (RISK)</button>
              </div>
            </div>}
          </div>)}
        </div>
        <div style={{display:"flex",gap:20,padding:"12px 20px",borderTop:"1px solid #1a2a1a",fontFamily:"monospace",fontSize:12}}>
          <span style={{color:"#666"}}>IN QUARANTINE <span style={{color:"#FF9800",fontWeight:700}}>644</span></span>
          <span style={{color:"#666"}}>PURGED (72H) <span style={{color:"#888",fontWeight:700}}>1,203</span></span>
          <span style={{color:"#666"}}>ACCEPTED <span style={{color:"#A3FF12",fontWeight:700}}>342</span></span>
        </div>
      </Card>
    </div>}
    {tab==="zkprivacy"&&<ZKPrivacyView/>}
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
  </div>;
}

export default GuardView;
