import React, { useState } from 'react';
import { Card, Btn } from '../components/ui';

const VESTING_NFTS=[
  {id:"#0042",round:"Seed",tokens:"14,285,714",ticker:"$GEBRID",price:"$0.02",cliff:6,cliffPassed:4,vesting:24,vestingPassed:8,claimed:"2,380,952",marketVal:"$1.42M",askPrice:"$854K",discount:"40%",color:"#5BA3E6"},
  {id:"#0018",round:"Angel",tokens:"8,571,428",ticker:"$GEBRID",price:"$0.007",cliff:6,cliffPassed:6,vesting:18,vestingPassed:12,claimed:"5,714,285",marketVal:"$857K",askPrice:"$550K",discount:"36%",color:"#A3FF12"},
  {id:"#0091",round:"Private",tokens:"25,000,000",ticker:"$GEBRID",price:"$0.03",cliff:3,cliffPassed:2,vesting:12,vestingPassed:2,claimed:"0",marketVal:"$2.5M",askPrice:"$1.6M",discount:"36%",color:"#E040FB"},
  {id:"#0057",round:"Pre-seed",tokens:"7,142,857",ticker:"$GEBRID",price:"$0.01",cliff:6,cliffPassed:6,vesting:18,vestingPassed:14,claimed:"5,357,142",marketVal:"$714K",askPrice:"$475K",discount:"33%",color:"#FF9800"},
];
function VestingNFTView() {
  const [selected,setSelected]=useState(null);
  const [modal,setModal]=useState(null);
  return <div>
    <div style={{padding:"14px 18px",borderRadius:10,background:"#0a0f05",border:"1px solid #A3FF1230",marginBottom:20}}>
      <div style={{fontSize:11,color:"#A3FF12",fontWeight:700,letterSpacing:1,marginBottom:4}}>🔖 VESTING NFT MARKETPLACE</div>
      <p style={{fontSize:12,color:"#888",margin:0}}>Institutional investors can wrap locked token allocations into tradeable NFTs — exit vesting positions early at a discount without breaking the on-chain schedule.</p>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>
      {VESTING_NFTS.map(n=>{
        const cliffPct=Math.min(100,Math.round(n.cliffPassed/n.cliff*100));
        const vestPct=Math.min(100,Math.round(n.vestingPassed/n.vesting*100));
        const cliffDone=n.cliffPassed>=n.cliff;
        return <div key={n.id} style={{background:"#111827",borderRadius:12,border:`1px solid ${selected===n.id?n.color:"#1F2937"}`,padding:18,cursor:"pointer",transition:"border-color 0.2s"}} onClick={()=>setSelected(selected===n.id?null:n.id)}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div>
              <div style={{fontSize:11,color:n.color,fontWeight:700,fontFamily:"monospace"}}>VESTING NFT {n.id}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",marginTop:2}}>{n.round} Round · {n.price}</div>
            </div>
            <span style={{padding:"3px 8px",borderRadius:4,background:`${n.color}20`,color:n.color,fontSize:10,fontWeight:700}}>{n.discount} DISC</span>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{fontSize:11,fontFamily:"monospace",color:"#A3FF12",marginBottom:2}}>{n.tokens} {n.ticker}</div>
          </div>
          <div style={{marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#666",marginBottom:3}}>
              <span>Cliff: {n.cliffPassed}/{n.cliff} mo</span>
              <span style={{color:cliffDone?"#A3FF12":"#FF9800"}}>{cliffDone?"✅ PASSED":"⏳ "+Math.round((n.cliff-n.cliffPassed)/1)*1+"mo remaining"}</span>
            </div>
            <div style={{background:"#1F2937",borderRadius:3,height:5,overflow:"hidden",marginBottom:6}}>
              <div style={{width:`${cliffPct}%`,height:"100%",background:cliffDone?"#A3FF12":"#FF9800",borderRadius:3,transition:"width 0.5s"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#666",marginBottom:3}}>
              <span>Vesting: {n.vestingPassed}/{n.vesting} mo</span>
              <span style={{color:"#5BA3E6"}}>{vestPct}% unlocked</span>
            </div>
            <div style={{background:"#1F2937",borderRadius:3,height:5,overflow:"hidden"}}>
              <div style={{width:`${vestPct}%`,height:"100%",background:"#5BA3E6",borderRadius:3}}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
            <div style={{padding:"8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",marginBottom:2}}>MARKET VALUE</div>
              <div style={{fontSize:12,fontWeight:700,color:"#fff"}}>{n.marketVal}</div>
            </div>
            <div style={{padding:"8px",borderRadius:6,background:"#0A0A0A",textAlign:"center"}}>
              <div style={{fontSize:9,color:"#666",marginBottom:2}}>ASK PRICE</div>
              <div style={{fontSize:12,fontWeight:700,color:n.color}}>{n.askPrice}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={e=>{e.stopPropagation();setModal(n)}} style={{flex:1,padding:"8px",borderRadius:6,border:"1px solid #333",background:"transparent",color:"#888",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>📅 Schedule</button>
            <button onClick={e=>e.stopPropagation()} style={{flex:2,padding:"8px",borderRadius:6,border:"none",background:n.color,color:"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Make Offer →</button>
          </div>
        </div>;
      })}
    </div>
    {modal&&<div style={{position:"fixed",inset:0,background:"#000a",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onClick={()=>setModal(null)}>
      <div style={{background:"#111827",borderRadius:16,border:`1px solid ${modal.color}`,padding:28,maxWidth:460,width:"90%",maxHeight:"80vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{fontSize:13,color:modal.color,fontWeight:700,fontFamily:"monospace"}}>VESTING NFT {modal.id}</div>
            <div style={{fontSize:16,fontWeight:700,color:"#fff",marginTop:2}}>{modal.round} Round Unlock Schedule</div>
          </div>
          <button onClick={()=>setModal(null)} style={{background:"transparent",border:"none",color:"#666",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{marginBottom:16,padding:"12px 16px",borderRadius:8,background:"#0A0A0A",fontSize:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#666"}}>Total tokens</span><span style={{color:"#A3FF12",fontFamily:"monospace",fontWeight:700}}>{modal.tokens} {modal.ticker}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#666"}}>Cliff ends</span><span style={{color:"#fff"}}>{modal.cliff} months from TGE</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#666"}}>Vesting period</span><span style={{color:"#fff"}}>{modal.vesting} months linear</span></div>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#666"}}>Claimed so far</span><span style={{color:"#A3FF12",fontFamily:"monospace"}}>{modal.claimed}</span></div>
        </div>
        <div style={{fontSize:12,fontWeight:700,color:"#888",letterSpacing:1,marginBottom:10,textTransform:"uppercase"}}>Monthly Unlock Preview</div>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {Array.from({length:6},(_,i)=>{
            const month=modal.cliffPassed+i+1;
            const isUnlocked=month<=modal.vestingPassed;
            const isCurrent=month===modal.vestingPassed+1;
            const pctPerMonth=1/modal.vesting;
            const tokensPerMonth=parseInt(modal.tokens.replace(/,/g,""))*pctPerMonth;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",borderRadius:6,background:isUnlocked?"#0d2818":isCurrent?"#0a1a0a":"transparent",border:`1px solid ${isUnlocked?"#A3FF1230":isCurrent?"#A3FF1218":"#1F2937"}`}}>
              <span style={{fontSize:10,color:"#555",fontFamily:"monospace",minWidth:50}}>Mo {month}</span>
              <div style={{flex:1,background:"#1F2937",borderRadius:2,height:4,overflow:"hidden"}}>
                <div style={{width:isUnlocked?"100%":isCurrent?"50%":"0%",height:"100%",background:"#A3FF12",transition:"width 0.5s"}}/>
              </div>
              <span style={{fontSize:10,color:isUnlocked?"#A3FF12":isCurrent?"#fff":"#555",fontFamily:"monospace",minWidth:60,textAlign:"right"}}>{Math.round(tokensPerMonth/1000)}K</span>
              {isUnlocked&&<span style={{fontSize:9,color:"#A3FF12"}}>✓</span>}
              {isCurrent&&<span style={{fontSize:9,color:"#FF9800"}}>NOW</span>}
            </div>;
          })}
        </div>
        <div style={{marginTop:16,padding:"10px 14px",borderRadius:8,background:"#0a0f0a",border:"1px solid #A3FF1230",fontSize:11,color:"#888"}}>
          🔐 ZK-wrapped: buyer sees proof of <span style={{color:"#A3FF12"}}>≥$500K value</span> · vesting <span style={{color:"#A3FF12"}}>≤{modal.vesting}mo</span> · wallet identity hidden
        </div>
      </div>
    </div>}
  </div>;
}

export default VestingNFTView;
