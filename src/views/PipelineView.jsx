import React from 'react';
import { Card, Metric } from '../components/ui';
import { TX_PIPELINE } from '../data/mockData';

function PipelineView() {
  const sc={completed:"#A3FF12",screening:"#FF9800",approved:"#2196F3",blocked:"#FF5252"};
  return <div>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:0}}>Live Transaction Pipeline</h2><p style={{fontSize:13,color:"#888",margin:"4px 0 0"}}>Real-time pre-sign screening flow</p></div>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      <Metric label="In Pipeline" value="5"/><Metric label="Avg Screening" value="1.2s"/><Metric label="Approval Rate" value="82%"/><Metric label="24h Volume" value="$28.4M" trend={12.4}/>
    </div>
    {TX_PIPELINE.map(tx=><Card key={tx.id} style={{padding:16,marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div><span style={{fontWeight:600,color:"#fff",fontSize:14}}>{tx.agent}</span><span style={{color:"#888",fontSize:13,marginLeft:8}}>→ {tx.action}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:"#A3FF12",fontWeight:600}}>{tx.amount}</span>
          <span style={{padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:600,textTransform:"uppercase",background:tx.status==="completed"?"#0d2818":tx.status==="blocked"?"#2a0a0a":tx.status==="screening"?"#2a1f00":"#0a1a2a",color:sc[tx.status]||"#888"}}>{tx.status}</span>
        </div>
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center"}}>
        {tx.steps.map((step,i)=><React.Fragment key={i}>
          <div style={{flex:1,padding:"8px 12px",borderRadius:6,background:step?(tx.status==="blocked"&&i===2?"#2a0a0a":"#0d1520"):"#0A0A0A",border:`1px solid ${step?(tx.status==="blocked"&&i===2?"#FF5252":"#1F2937"):"#111"}`,textAlign:"center"}}>
            <div style={{fontSize:11,color:step?(tx.status==="blocked"&&i===2?"#FF5252":step.includes("...")?"#FF9800":"#A3FF12"):"#333",fontWeight:step?600:400}}>{step||"—"}</div>
          </div>
          {i<3&&<div style={{color:"#333",fontSize:14}}>→</div>}
        </React.Fragment>)}
      </div>
    </Card>)}
  </div>;
}

export default PipelineView;
