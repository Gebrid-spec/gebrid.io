import React from 'react';
import { Card, Metric } from '../components/ui';
import { RISK_EVENTS } from '../data/mockData';

function RiskView() {
  const icons={blocked:"⛔",warning:"⚠️",approved:"✅"};
  const sevC={high:"#FF5252",medium:"#FF9800",low:"#A3FF12"};
  return <div>
    <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:"0 0 20px"}}>Risk Authority Monitor</h2>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      <Metric label="Screened (24h)" value="1,247"/><Metric label="Blocked" value="3" warn={true}/><Metric label="Warnings" value="12"/><Metric label="Approval" value="99.4%"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16}}>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:14,color:"#fff"}}>Live Event Feed</div>
        {RISK_EVENTS.map((ev,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<RISK_EVENTS.length-1?"1px solid #1F2937":"none"}}>
          <span style={{fontSize:16}}>{icons[ev.type]}</span>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:600,color:"#fff"}}>{ev.agent}</span><span style={{fontSize:11,color:"#666",fontFamily:"monospace"}}>{ev.time}</span></div>
            <p style={{fontSize:12,color:"#999",margin:"2px 0 0"}}>{ev.desc}</p>
          </div>
          <span style={{width:8,height:8,borderRadius:"50%",background:sevC[ev.sev],marginTop:4,flexShrink:0}}/>
        </div>)}
      </Card>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <Card>
          <div style={{fontSize:14,fontWeight:600,marginBottom:10,color:"#fff"}}>Policy Rules</div>
          {[["Max Trade","$50,000"],["Daily Vol","$500,000"],["Concentration","80%"],["Drawdown","-5%/24h"],["Protocols","12 listed"],["Slippage","0.5%"],["Land Max Bid","5 ETH"],["P2E Limit","200 battles"]].map(([k,v],i)=>
            <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1F2937",fontSize:12}}>
              <span style={{color:"#999"}}>{k}</span><span style={{color:"#A3FF12",fontWeight:600,fontFamily:"monospace"}}>{v}</span>
            </div>
          )}
        </Card>
        <Card style={{background:"#0d1a0d",border:"1px solid #1a3a1a"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{width:10,height:10,borderRadius:"50%",background:"#A3FF12",boxShadow:"0 0 8px #A3FF12"}}/>
            <span style={{fontSize:13,fontWeight:600,color:"#A3FF12"}}>Protection Active</span>
          </div>
          <p style={{fontSize:12,color:"#8a8",margin:0}}>All transactions pass institutional-grade pre-sign screening including GameFi land purchases.</p>
        </Card>
      </div>
    </div>
  </div>;
}

export default RiskView;
