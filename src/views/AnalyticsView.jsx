import React from 'react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Card, Metric } from '../components/ui';
import { PORT_HIST, DRAWDOWN, MONTHLY_RET, AGENTS } from '../data/mockData';

function AnalyticsView() {
  return <div>
    <h2 style={{fontSize:20,fontWeight:700,color:"#fff",margin:"0 0 20px"}}>Analytics & Performance</h2>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      <Metric label="Sharpe Ratio" value="2.14" sub="annualized"/><Metric label="Max Drawdown" value="-4.8%" sub="30d"/><Metric label="Win Rate" value="76.2%"/><Metric label="Total Return" value="+18.4%" trend={18.4}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Monthly Returns</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MONTHLY_RET}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937"/>
            <XAxis dataKey="month" stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false}/>
            <YAxis stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{background:"#1a1a2e",border:"1px solid #333",borderRadius:8,fontSize:12}} formatter={v=>[`${v}%`,"Return"]}/>
            <Bar dataKey="ret" radius={[4,4,0,0]}>
              {MONTHLY_RET.map((e,i)=><Cell key={i} fill={e.ret>=0?"#A3FF12":"#FF5252"}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Drawdown Analysis</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={DRAWDOWN}>
            <defs><linearGradient id="gdd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5252" stopOpacity={0.3}/><stop offset="95%" stopColor="#FF5252" stopOpacity={0}/>
            </linearGradient></defs>
            <XAxis dataKey="day" stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false}/>
            <YAxis stroke="#333" tick={{fontSize:10,fill:"#666"}} tickLine={false} tickFormatter={v=>`${v}%`}/>
            <Tooltip contentStyle={{background:"#1a1a2e",border:"1px solid #333",borderRadius:8,fontSize:12}}/>
            <Area type="monotone" dataKey="dd" stroke="#FF5252" strokeWidth={2} fill="url(#gdd)"/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
    <Card>
      <div style={{fontSize:14,fontWeight:600,marginBottom:12,color:"#fff"}}>Agent Performance Attribution</div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr style={{borderBottom:"1px solid #1F2937"}}>
          {["Agent","Return","Sharpe","Win Rate","Max DD","Portfolio %"].map(h=><th key={h} style={{padding:"8px 10px",textAlign:"left",color:"#666",fontSize:11,textTransform:"uppercase"}}>{h}</th>)}
        </tr></thead>
        <tbody>{AGENTS.map(a=><tr key={a.id} style={{borderBottom:"1px solid #1F2937"}}>
          <td style={{padding:"9px 10px",fontWeight:600,color:"#fff"}}>{a.name}</td>
          <td style={{padding:"9px 10px",color:a.pnl>=0?"#A3FF12":"#FF5252",fontWeight:600}}>{a.pnl>=0?"+":""}{a.pnl}%</td>
          <td style={{padding:"9px 10px",color:"#fff"}}>{(1.2+a.pnl/10).toFixed(2)}</td>
          <td style={{padding:"9px 10px",color:"#fff"}}>{(60+a.pnl*1.1).toFixed(1)}%</td>
          <td style={{padding:"9px 10px",color:"#FF5252"}}>-{(2+Math.abs(a.pnl)*0.3).toFixed(1)}%</td>
          <td style={{padding:"9px 10px",color:"#A3FF12"}}>{(a.aum/450000000*100).toFixed(1)}%</td>
        </tr>)}</tbody>
      </table>
    </Card>
  </div>;
}

export default AnalyticsView;
