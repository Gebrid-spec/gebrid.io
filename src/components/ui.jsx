import React from 'react';

export const fmt = n => n>=1e9?`$${(n/1e9).toFixed(2)}B`:n>=1e6?`$${(n/1e6).toFixed(1)}M`:n>=1e3?`$${(n/1e3).toFixed(1)}K`:`$${n}`;
export const StatusDot = ({s}) => <span style={{width:8,height:8,borderRadius:"50%",display:"inline-block",background:s==="active"?"#A3FF12":s==="paused"?"#FF9800":"#FF5252",marginRight:6}}/>;
export const RiskBadge = ({l}) => {
  const c={low:{bg:"#0d2818",fg:"#A3FF12"},medium:{bg:"#2a1f00",fg:"#FF9800"},high:{bg:"#2a0a0a",fg:"#FF5252"}}[l]||{bg:"#1F2937",fg:"#888"};
  return <span style={{background:c.bg,color:c.fg,padding:"2px 10px",borderRadius:12,fontSize:11,fontWeight:600,textTransform:"uppercase"}}>{l}</span>;
};
export const Card = ({children,style,onClick}) =>
  <div onClick={onClick}
    style={{background:"#111827",borderRadius:12,border:"1px solid #1F2937",padding:20,transition:"border-color 0.2s",cursor:onClick?"pointer":"default",...style}}
    onMouseEnter={e=>{if(onClick)e.currentTarget.style.borderColor="#A3FF12"}}
    onMouseLeave={e=>{if(onClick)e.currentTarget.style.borderColor="#1F2937"}}>
    {children}
  </div>;
export const Metric = ({label,value,sub,trend,warn}) =>
  <Card style={{flex:"1 1 170px"}}>
    <div style={{fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
    <div style={{fontSize:24,fontWeight:700,color:warn?"#FF5252":"#fff",lineHeight:1.2}}>{value}</div>
    {(sub||trend!==undefined)&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:4}}>
      {trend!==undefined&&<span style={{fontSize:12,fontWeight:600,color:trend>=0?"#A3FF12":"#FF5252"}}>{trend>=0?"+":""}{trend}%</span>}
      {sub&&<span style={{fontSize:11,color:"#666"}}>{sub}</span>}
    </div>}
  </Card>;
export const SideItem = ({icon,label,active,onClick,badge}) =>
  <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 16px",borderRadius:8,cursor:"pointer",background:active?"#A3FF1215":"transparent",color:active?"#A3FF12":"#888",fontWeight:active?600:400,fontSize:13,transition:"all 0.15s",borderLeft:active?"3px solid #A3FF12":"3px solid transparent"}}>
    <span style={{fontSize:16,width:20,textAlign:"center"}}>{icon}</span>
    <span style={{flex:1}}>{label}</span>
    {badge&&<span style={{background:badge==="AI"?"#A3FF12":"#E040FB",color:"#000",fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:6}}>{badge}</span>}
  </div>;
export const Btn = ({children,primary,onClick,disabled,style:s}) =>
  <button onClick={onClick} disabled={disabled} style={{padding:"10px 20px",borderRadius:8,border:primary?"none":"1px solid #333",background:primary?(disabled?"#555":"#A3FF12"):"transparent",color:primary?"#000":"#fff",fontSize:13,fontWeight:primary?700:400,cursor:disabled?"wait":"pointer",fontFamily:"inherit",transition:"all 0.15s",...s}}>
    {children}
  </button>;
export const RiskRing = ({score,size=80}) => {
  const r=32,circ=2*Math.PI*r,offset=circ*(1-score/100);
  const color=score>=70?"#FF5252":score>=40?"#FF9800":"#A3FF12";
  return <svg width={size} height={size} viewBox="0 0 80 80">
    <circle cx="40" cy="40" r={r} fill="none" stroke="#1F2937" strokeWidth="6"/>
    <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
      strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 40 40)" style={{transition:"stroke-dashoffset 0.8s ease"}}/>
    <text x="40" y="44" textAnchor="middle" fill={color} fontSize="20" fontWeight="800" fontFamily="monospace">{score}</text>
  </svg>;
};
