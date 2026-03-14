import React, { useState, useRef } from 'react';
import { Card, Btn } from '../components/ui';

function DePCView() {
  const [tab,setTab]=useState("forge");
  const [aiPrompt,setAiPrompt]=useState("");
  const [aiGenerating,setAiGenerating]=useState(false);
  const [aiResult,setAiResult]=useState(null);
  const [voteArtist,setVoteArtist]=useState(null);
  const [aiApiKeys,setAiApiKeys]=useState({replicate:"",runway:""});
  const [myVideos,setMyVideos]=useState([]);
  const ARTISTS=[
    {id:1,name:"Nova Kira",genre:"Electronic / Ambient",plays:48200,votes:3841,rating:94,nftPrice:"2.4 ETH",royalty:"8%",status:"trending",badge:"🔥",track:"Neon Drift",fans:1240,deal:null,img:"🎧"},
    {id:2,name:"Sol Vargas",genre:"Latin Trap / R&B",plays:31700,votes:2190,rating:89,nftPrice:"1.8 ETH",royalty:"6%",status:"rising",badge:"⬆️",track:"Fuego Lento",fans:890,deal:null,img:"🎤"},
    {id:3,name:"0xBeats",genre:"Hip-Hop / Web3",plays:72400,votes:5620,rating:97,nftPrice:"4.1 ETH",royalty:"10%",status:"label_interest",badge:"🏷️",track:"Chain Reaction",fans:3100,deal:"Universal Web3",img:"🎹"},
    {id:4,name:"Mira Sova",genre:"Indie Pop / Folk",plays:19300,votes:1480,rating:82,nftPrice:"0.9 ETH",royalty:"5%",status:"new",badge:"✨",track:"Paper Stars",fans:420,deal:null,img:"🎸"},
    {id:5,name:"DΛRK Protocol",genre:"Industrial / Techno",plays:55100,votes:4200,rating:92,nftPrice:"3.2 ETH",royalty:"9%",status:"trending",badge:"🔥",track:"System Override",fans:2100,deal:null,img:"🎛️"},
  ];
  const MERCH_ITEMS=[
    {artist:"0xBeats",item:"Signed Vinyl NFT",price:"0.5 ETH",type:"collectible",stock:50,sold:38,icon:"🎵"},
    {artist:"Nova Kira",item:"Limited Hoodie Drop",price:"120 USDC",type:"physical",stock:100,sold:71,icon:"👕"},
    {artist:"0xBeats",item:"VIP Concert Access",price:"200 $GEBRID",type:"experience",stock:20,sold:14,icon:"🎟️"},
    {artist:"Sol Vargas",item:"Autograph NFT",price:"0.2 ETH",type:"collectible",stock:200,sold:89,icon:"✍️"},
    {artist:"DΛRK Protocol",item:"Backstage Pass NFT",price:"500 $GEBRID",type:"experience",stock:10,sold:7,icon:"🔑"},
    {artist:"Mira Sova",item:"Handwritten Lyrics",price:"0.3 ETH",type:"collectible",stock:30,sold:12,icon:"📜"},
  ];
  const LABEL_OFFERS=[
    {label:"Universal Web3",artist:"0xBeats",offer:"$2.4M advance + 18% royalty split",status:"accepted",date:"2d ago",icon:"🏢"},
    {label:"Sony Music3",artist:"Nova Kira",offer:"$800K advance + 15% royalty split",status:"pending",date:"5h ago",icon:"🎼"},
    {label:"Decentralized Records",artist:"DΛRK Protocol",offer:"$1.1M advance + 20% royalty split",status:"reviewing",date:"1d ago",icon:"📀"},
  ];
  const handleAI=()=>{
    if(!aiPrompt.trim()) return;
    setAiGenerating(true);setAiResult(null);
    setTimeout(()=>{
      setAiResult({
        track:`${aiPrompt.slice(0,20)}... (AI Generated)`,
        bpm:Math.floor(Math.random()*60+80),
        key:["C Major","A Minor","F Major","D Minor"][Math.floor(Math.random()*4)],
        duration:"3:24",
        stems:["Vocals","Beat","Bass","Melody"],
        clip:true,
        nftReady:true,
      });
      setAiGenerating(false);
    }, 2800);
  };
  const TABS=[["forge","⚒️ FORGE"],["arena","🏟️ ARENA"],["label","🏷️ LABEL"],["merch","🛍️ MERCH"],["ai","🤖 AI Studio"]];
  return <div>
    <div style={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <div style={{fontSize:11,color:"#E040FB",fontFamily:"monospace",fontWeight:700,letterSpacing:2}}>DePC</div>
        <div style={{width:1,height:14,background:"#333"}}/>
        <div style={{fontSize:11,color:"#888",letterSpacing:1}}>DECENTRALIZED PRODUCER CENTER</div>
      </div>
      <h2 style={{fontSize:24,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>
        Decentralized <span style={{color:"#E040FB"}}>Producer Center</span>
      </h2>
      <p style={{fontSize:13,color:"#888",margin:0}}>Mint → DAO Discovery → Label Deal → Merch & Concerts — fully on-chain</p>
    </div>
    {/* Metrics */}
    <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:20}}>
      {[["Artists","1,247","+38 this week","#E040FB"],["Music NFTs","8,420","minted on-chain","#A3FF12"],["DAO Votes","2.1M","$GEBRID staked","#FF9800"],["Label Deals","14","$18.4M total value","#5BA3E6"]].map(([l,v,s,c],i)=>
        <div key={i} style={{flex:"1 1 160px",background:"#111827",borderRadius:12,border:"1px solid #1F2937",padding:18}}>
          <div style={{fontSize:11,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{l}</div>
          <div style={{fontSize:24,fontWeight:700,color:"#fff"}}>{v}</div>
          <div style={{fontSize:11,color:c,marginTop:4}}>{s}</div>
        </div>
      )}
    </div>
    {/* Tab Nav */}
    <div style={{display:"flex",gap:4,marginBottom:20,background:"#111827",borderRadius:10,padding:4,flexWrap:"wrap"}}>
      {TABS.map(([id,label])=>
        <button key={id} onClick={()=>setTab(id)} style={{padding:"8px 16px",borderRadius:7,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"monospace",background:tab===id?"#E040FB":"transparent",color:tab===id?"#fff":"#888",flex:1,minWidth:80}}>
          {label}
        </button>
      )}
    </div>
    {/* FORGE */}
    {tab==="forge"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:"#E040FB",marginBottom:16}}>⚒️ Mint Music NFT</div>
          {[
            {label:"Artist Name",ph:"Your artist name"},
            {label:"Track Title",ph:"Name your track"},
            {label:"Genre",ph:"e.g. Trap, Ambient, Indie"},
          ].map((f,i)=><div key={i} style={{marginBottom:12}}>
            <label style={{fontSize:11,color:"#888",display:"block",marginBottom:5}}>{f.label}</label>
            <input placeholder={f.ph} style={{width:"100%",padding:"9px 12px",borderRadius:7,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
          </div>)}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:"#888",display:"block",marginBottom:5}}>Royalty Split</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[["Artist","60%","#A3FF12"],["NFT Holders","20%","#E040FB"],["Platform","15%","#FF9800"],["Producer","5%","#5BA3E6"]].map(([role,pct,c],i)=>
                <div key={i} style={{padding:"8px 10px",borderRadius:6,background:"#0d1520",border:`1px solid ${c}30`,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,color:"#999"}}>{role}</span>
                  <span style={{fontSize:11,color:c,fontWeight:700}}>{pct}</span>
                </div>
              )}
            </div>
          </div>
          <div style={{padding:"12px 14px",borderRadius:8,background:"#1a0a2a",border:"1px solid #E040FB40",marginBottom:14,fontSize:12,color:"#ccc",lineHeight:1.5}}>
            🔒 Royalty смарт-контракт деплоится on-chain. Каждый стрим, продажа NFT и лицензия автоматически распределяется без посредников.
          </div>
          <button style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:"#E040FB",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            🎵 Mint Music NFT
          </button>
        </Card>
        <Card>
          <div style={{fontSize:14,fontWeight:700,color:"#A3FF12",marginBottom:14}}>📊 IP Fractional Ownership</div>
          <p style={{fontSize:12,color:"#999",lineHeight:1.5,marginBottom:16}}>Buy a royalty share in any existing track. Earn % of every stream, sync license and NFT sale — forever, on-chain.</p>
          {ARTISTS.slice(0,3).map((a,i)=><div key={i} style={{padding:"12px 14px",borderRadius:8,background:"#0d1520",border:"1px solid #1a2a3a",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:20}}>{a.img}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>{a.name}</div>
                  <div style={{fontSize:11,color:"#888"}}>"{a.track}"</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#A3FF12"}}>{a.nftPrice}</div>
                <div style={{fontSize:10,color:"#666"}}>{a.royalty} royalty share</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <div style={{flex:1,padding:"5px 8px",borderRadius:5,background:"#0A0A0A",fontSize:10,color:"#888"}}>
                {a.plays.toLocaleString()} plays
              </div>
              <button style={{padding:"5px 14px",borderRadius:5,border:"1px solid #A3FF12",background:"transparent",color:"#A3FF12",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Buy Share</button>
            </div>
          </div>)}
        </Card>
      </div>
    </div>}
    {/* ARENA */}
    {tab==="arena"&&<div>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <div style={{padding:"5px 12px",borderRadius:6,background:"#1a0a2a",border:"1px solid #E040FB40",fontSize:11,color:"#E040FB",fontWeight:600}}>● LIVE VOTING</div>
        <span style={{fontSize:12,color:"#666"}}>2,847 $GEBRID holders voting now</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {ARTISTS.map((a,i)=><Card key={i} style={{padding:16}}>
          <div style={{display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{fontSize:36}}>{a.img}</div>
            <div style={{flex:1,minWidth:160}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>{a.name}</span>
                <span style={{fontSize:12}}>{a.badge}</span>
                {a.deal&&<span style={{fontSize:10,padding:"1px 6px",borderRadius:4,background:"#1a2332",color:"#5BA3E6",fontWeight:600}}>🏷️ {a.deal}</span>}
              </div>
              <div style={{fontSize:11,color:"#888",marginBottom:6}}>{a.genre} · "{a.track}"</div>
              <div style={{display:"flex",gap:12,fontSize:11,color:"#666"}}>
                <span>▶ {a.plays.toLocaleString()}</span>
                <span>👥 {a.fans.toLocaleString()} fans</span>
                <span>🗳️ {a.votes.toLocaleString()} votes</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:28,fontWeight:800,color:a.rating>=95?"#A3FF12":a.rating>=88?"#FF9800":"#E040FB",fontFamily:"monospace"}}>{a.rating}</div>
                <div style={{fontSize:9,color:"#666",textTransform:"uppercase",letterSpacing:1}}>DAO Score</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                <button onClick={()=>setVoteArtist(voteArtist===a.id?null:a.id)} style={{padding:"7px 16px",borderRadius:6,border:"1px solid #A3FF12",background:voteArtist===a.id?"#A3FF12":"transparent",color:voteArtist===a.id?"#000":"#A3FF12",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                  {voteArtist===a.id?"✓ Voted":"Vote Up"}
                </button>
                <button style={{padding:"5px 16px",borderRadius:6,border:"1px solid #E040FB",background:"transparent",color:"#E040FB",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                  🎧 Listen
                </button>
              </div>
            </div>
          </div>
          {voteArtist===a.id&&<div style={{marginTop:12,padding:"10px 12px",borderRadius:7,background:"#0d1520",border:"1px solid #A3FF1230",fontSize:12,color:"#A3FF12"}}>
            ✓ Voted! Your $GEBRID stake has been counted. Score updates on next block.
          </div>}
        </Card>)}
      </div>
      <Card style={{marginTop:16,background:"#0a0f0a",border:"1px solid #E040FB30"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#E040FB",marginBottom:10}}>🔴 Decentralized Radio — AI DJ</div>
        <p style={{fontSize:12,color:"#999",lineHeight:1.5,margin:"0 0 10px"}}>AI DJ streams top ARENA tracks 24/7. Every listen = micro-payment in $GEBRID to the artist on-chain. Metrics are verified by smart contract — impossible to game.</p>
        <div style={{display:"flex",gap:8,alignItems:"center",padding:"10px 14px",borderRadius:8,background:"#111"}}>
          <span style={{fontSize:20}}>🎛️</span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:"#fff"}}>Now Playing: 0xBeats — "Chain Reaction"</div>
            <div style={{height:3,background:"#1F2937",borderRadius:2,marginTop:6,overflow:"hidden"}}>
              <div style={{width:"62%",height:"100%",background:"#E040FB",borderRadius:2}}/>
            </div>
          </div>
          <span style={{fontSize:11,color:"#888",fontFamily:"monospace"}}>2:08 / 3:24</span>
          <span style={{fontSize:11,color:"#A3FF12",fontWeight:600}}>+0.004 $GEBRID/stream</span>
        </div>
      </Card>
    </div>}
    {/* LABEL */}
    {tab==="label"&&<div>
      <div style={{marginBottom:16}}>
        <h3 style={{fontSize:18,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>Label Pipeline</h3>
        <p style={{fontSize:12,color:"#888",margin:0}}>Labels make on-chain offers to top ARENA artists. Fully transparent — the smart contract executes the deal.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
        {LABEL_OFFERS.map((o,i)=><Card key={i} style={{padding:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <span style={{fontSize:28}}>{o.icon}</span>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#fff"}}>{o.label}</div>
                <div style={{fontSize:12,color:"#E040FB"}}>→ {o.artist}</div>
                <div style={{fontSize:12,color:"#A3FF12",fontWeight:600,marginTop:2}}>{o.offer}</div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:10,color:"#666"}}>{o.date}</span>
              <span style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:700,
                background:o.status==="accepted"?"#0d2818":o.status==="pending"?"#2a1f00":"#1a1a2a",
                color:o.status==="accepted"?"#A3FF12":o.status==="pending"?"#FF9800":"#5BA3E6"
              }}>{o.status.toUpperCase()}</span>
            </div>
          </div>
        </Card>)}
      </div>
      <Card style={{background:"#0a0819",border:"1px solid #E040FB30"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#E040FB",marginBottom:10}}>🔁 Sync Licensing AI</div>
        <p style={{fontSize:12,color:"#999",lineHeight:1.5,marginBottom:12}}>AI algorithm automatically matches tracks to brand campaigns, ads and film. Passive income — zero effort from the artist.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[
            {brand:"Nike x Metaverse",track:"System Override",fee:"$12,000",status:"matched"},
            {brand:"Adidas Campaign",track:"Chain Reaction",fee:"$8,400",status:"negotiating"},
            {brand:"Netflix Series",track:"Neon Drift",fee:"$24,000",status:"matched"},
          ].map((s,i)=><div key={i} style={{padding:"12px 14px",borderRadius:8,background:"#111827",border:"1px solid #1F2937"}}>
            <div style={{fontSize:11,color:"#888",marginBottom:4}}>{s.brand}</div>
            <div style={{fontSize:12,fontWeight:600,color:"#fff",marginBottom:4}}>"{s.track}"</div>
            <div style={{fontSize:14,fontWeight:700,color:"#A3FF12"}}>{s.fee}</div>
            <div style={{fontSize:10,marginTop:4,color:s.status==="matched"?"#A3FF12":"#FF9800",fontWeight:600,textTransform:"uppercase"}}>{s.status}</div>
          </div>)}
        </div>
      </Card>
    </div>}
    {/* MERCH */}
    {tab==="merch"&&<div>
      <div style={{marginBottom:16}}>
        <h3 style={{fontSize:18,fontWeight:700,color:"#fff",margin:"0 0 4px"}}>Merch & Experiences</h3>
        <p style={{fontSize:12,color:"#888",margin:0}}>NFT-мерч, автографы, билеты на концерты — со скидкой в $GEBRID. Физические товары верифицированы on-chain.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14,marginBottom:20}}>
        {MERCH_ITEMS.map((m,i)=><Card key={i}>
          <div style={{fontSize:36,marginBottom:10,textAlign:"center"}}>{m.icon}</div>
          <div style={{fontSize:11,color:"#888",marginBottom:4}}>{m.artist}</div>
          <div style={{fontSize:15,fontWeight:700,color:"#fff",marginBottom:6}}>{m.item}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:16,fontWeight:800,color:"#E040FB"}}>{m.price}</span>
            <span style={{fontSize:11,padding:"2px 8px",borderRadius:4,background:m.type==="experience"?"#0a1a2a":m.type==="physical"?"#2a1f00":"#1a0a2a",
              color:m.type==="experience"?"#5BA3E6":m.type==="physical"?"#FF9800":"#E040FB"}}>{m.type}</span>
          </div>
          <div style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#666",marginBottom:4}}>
              <span>Sold: {m.sold}/{m.stock}</span>
              <span>{Math.round(m.sold/m.stock*100)}%</span>
            </div>
            <div style={{height:4,borderRadius:2,background:"#1F2937",overflow:"hidden"}}>
              <div style={{width:`${m.sold/m.stock*100}%`,height:"100%",background:"#E040FB",borderRadius:2}}/>
            </div>
          </div>
          <button style={{width:"100%",padding:"9px",borderRadius:7,border:"none",background:m.stock-m.sold<5?"#FF980015":"#E040FB",color:m.stock-m.sold<5?"#FF9800":"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            {m.stock-m.sold<5?`⚡ Only ${m.stock-m.sold} left`:"Buy Now"}
          </button>
        </Card>)}
      </div>
      <Card style={{background:"#0d1520",border:"1px solid #5BA3E640"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#5BA3E6",marginBottom:8}}>🎫 $GEBRID Token Discounts</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
          {[["Bronze (1K+)","5% off all merch"],["Silver (5K+)","15% off + early access"],["Gold (25K+)","30% off + meet & greet"],["Platinum (100K+)","50% off + backstage pass"]].map(([tier,benefit],i)=><div key={i} style={{padding:"10px 12px",borderRadius:7,background:"#111"}}>
            <div style={{fontSize:12,fontWeight:600,color:"#5BA3E6"}}>{tier}</div>
            <div style={{fontSize:11,color:"#999",marginTop:3}}>{benefit}</div>
          </div>)}
        </div>
      </Card>
    </div>}
    {/* AI Studio */}
    {tab==="ai"&&<AIStudioTab apiKeys={aiApiKeys} onSaveKeys={setAiApiKeys} myVideos={myVideos} onAddVideo={v=>setMyVideos(p=>[...p,v])} onRemoveVideo={i=>setMyVideos(p=>p.filter((_,j)=>j!==i))}/>}
  </div>;
}
// ═══ AI STUDIO (Replicate + Runway + My Videos) ═══
function replicatePoll(id, apiKey, attempts) {
  if(attempts<=0) return Promise.reject(new Error("Timeout"));
  return new Promise(function(r){setTimeout(r,3000);}).then(function(){
    return fetch("https://api.replicate.com/v1/predictions/"+id,{headers:{"Authorization":"Token "+apiKey}});
  }).then(function(r){return r.json();}).then(function(p){
    if(p.status==="succeeded") return p.output;
    if(p.status==="failed") throw new Error("Generation failed: "+p.error);
    return replicatePoll(id, apiKey, attempts-1);
  });
}
function replicateMusicGen(prompt, genre, apiKey) {
  const fullPrompt = genre ? genre+" music, "+prompt : prompt;
  return fetch("https://api.replicate.com/v1/models/meta/musicgen/predictions", {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Token "+apiKey,"Prefer":"wait"},
    body:JSON.stringify({input:{prompt:fullPrompt,model_version:"stereo-large",output_format:"mp3",duration:30,normalization_strategy:"peak"}})
  }).then(function(res){
    if(!res.ok) throw new Error("Replicate error: "+res.status);
    return res.json();
  }).then(function(data){
    if(data.status==="starting"||data.status==="processing") return replicatePoll(data.id, apiKey, 60);
    return data.output;
  });
}
function runwayPoll(taskId, apiKey, attempts) {
  if(attempts<=0) return Promise.reject(new Error("Timeout"));
  return new Promise(function(r){setTimeout(r,5000);}).then(function(){
    return fetch("https://api.dev.runwayml.com/v1/tasks/"+taskId,{headers:{"Authorization":"Bearer "+apiKey,"X-Runway-Version":"2024-11-06"}});
  }).then(function(r){return r.json();}).then(function(p){
    if(p.status==="SUCCEEDED") return p.output && p.output[0];
    if(p.status==="FAILED") throw new Error("Runway failed");
    return runwayPoll(taskId, apiKey, attempts-1);
  });
}
function runwayVideoGen(prompt, apiKey) {
  return fetch("https://api.dev.runwayml.com/v1/text_to_video", {
    method:"POST",
    headers:{"Content-Type":"application/json","Authorization":"Bearer "+apiKey,"X-Runway-Version":"2024-11-06"},
    body:JSON.stringify({promptText:prompt,model:"gen3a_turbo",duration:5,ratio:"1280:768"})
  }).then(function(res){
    if(!res.ok) throw new Error("Runway error: "+res.status);
    return res.json();
  }).then(function(data){
    return runwayPoll(data.id, apiKey, 40);
  });
}
function AIStudioTab({apiKeys, onSaveKeys, myVideos, onAddVideo, onRemoveVideo}) {
  const [prompt,setPrompt]=useState("");
  const [genre,setGenre]=useState("");
  const [generating,setGenerating]=useState(false);
  const [genStep,setGenStep]=useState("");
  const [audioUrl,setAudioUrl]=useState(null);
  const [videoUrl,setVideoUrl]=useState(null);
  const [error,setError]=useState(null);
  const [showKeys,setShowKeys]=useState(false);
  const [keys,setKeys]=useState(apiKeys);
  const [activeStudioTab,setActiveStudioTab]=useState("generate");
  const videoInputRef=useRef(null);
  const hasReplicate=!!keys.replicate;
  const hasRunway=!!keys.runway;
  const handleGenerate = () => {
    if(!prompt.trim()) return;
    if(!hasReplicate) { setShowKeys(true); return; }
    setGenerating(true); setError(null); setAudioUrl(null); setVideoUrl(null);
    setGenStep("🎵 Connecting to Replicate · MusicGen Stereo...");
    replicateMusicGen(prompt, genre, keys.replicate).then(function(audio) {
      setAudioUrl(audio);
      if(hasRunway) {
        setGenStep("🎬 Generating video clip on Runway Gen-3...");
        return runwayVideoGen("Music video for: "+prompt+". Cinematic, atmospheric, "+(genre||"electronic")+" aesthetic", keys.runway)
          .then(function(vid){
            setVideoUrl(vid);
            setGenStep("✓ Track + Video ready");
          })
          .catch(function(){
            setGenStep("✓ Track ready · Video generation failed (check Runway key)");
          });
      } else {
        setGenStep("✓ Track ready · No Runway key — video skipped");
        setGenStep("✓ Track generated · Video: add Runway key to enable");
      }
    }).catch(function(e){
      setError(e.message);
      setGenStep("");
    }).then(function(){
      setGenerating(false);
    });
  };
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file=>{
      const url = URL.createObjectURL(file);
      onAddVideo({name:file.name.replace(/\.[^.]+$/,""),url,size:file.size,date:new Date().toLocaleDateString(),views:Math.floor(Math.random()*50000+1000),likes:Math.floor(Math.random()*3000+100),type:"uploaded"});
    });
  };
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
      <div>
        <div style={{fontSize:11,color:"#E040FB",fontFamily:"monospace",fontWeight:700,letterSpacing:2,marginBottom:4}}>AI STUDIO</div>
        <h3 style={{fontSize:22,fontWeight:800,color:"#fff",margin:"0 0 4px"}}>Music + Video Generation <span style={{color:"#E040FB"}}>under key</span></h3>
        <p style={{fontSize:13,color:"#888",margin:0}}>Powered by Replicate MusicGen · Runway Gen-3</p>
      </div>
      <button onClick={()=>setShowKeys(!showKeys)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${hasReplicate?"#A3FF12":"#FF9800"}`,background:"transparent",color:hasReplicate?"#A3FF12":"#FF9800",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
        {hasReplicate?"⚙️ API Keys ✓":"⚙️ Set API Keys"}
      </button>
    </div>
    {/* API Keys panel */}
    {showKeys&&<Card style={{marginBottom:16,background:"#0a0a18",border:"1px solid #5BA3E640"}}>
      <div style={{fontSize:13,fontWeight:600,color:"#5BA3E6",marginBottom:12}}>🔑 API Keys (stored in session only)</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div>
          <label style={{fontSize:11,color:"#888",display:"block",marginBottom:5}}>Replicate API Token <span style={{color:"#A3FF12"}}>*required for music</span></label>
          <input type="password" value={keys.replicate} onChange={e=>setKeys(k=>({...k,replicate:e.target.value}))} placeholder="r8_..."
            style={{width:"100%",padding:"8px 12px",borderRadius:7,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:12,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
          <div style={{fontSize:10,color:"#555",marginTop:3}}>replicate.com → Account → API Tokens</div>
        </div>
        <div>
          <label style={{fontSize:11,color:"#888",display:"block",marginBottom:5}}>Runway API Secret <span style={{color:"#888"}}>optional for video</span></label>
          <input type="password" value={keys.runway} onChange={e=>setKeys(k=>({...k,runway:e.target.value}))} placeholder="key_..."
            style={{width:"100%",padding:"8px 12px",borderRadius:7,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:12,fontFamily:"monospace",outline:"none",boxSizing:"border-box"}}/>
          <div style={{fontSize:10,color:"#555",marginTop:3}}>app.runwayml.com → API Keys</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={()=>{onSaveKeys(keys);setShowKeys(false);}} style={{padding:"8px 18px",borderRadius:7,border:"none",background:"#A3FF12",color:"#000",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Save & Close</button>
        <button onClick={()=>setShowKeys(false)} style={{padding:"8px 14px",borderRadius:7,border:"1px solid #333",background:"transparent",color:"#888",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
      </div>
    </Card>}
    {/* Studio sub-tabs */}
    <div style={{display:"flex",gap:4,marginBottom:16,background:"#111827",borderRadius:8,padding:3}}>
      {[["generate","🎵 Generate"],["myvideos","📹 My Videos"]].map(([id,label])=>
        <button key={id} onClick={()=>setActiveStudioTab(id)} style={{flex:1,padding:"8px",borderRadius:6,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"inherit",background:activeStudioTab===id?"#E040FB":"transparent",color:activeStudioTab===id?"#fff":"#888"}}>{label} {id==="myvideos"&&myVideos.length>0?`(${myVideos.length})`:""}</button>
      )}
    </div>
    {/* GENERATE TAB */}
    {activeStudioTab==="generate"&&<div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card>
          <div style={{fontSize:13,fontWeight:600,color:"#E040FB",marginBottom:14}}>🎵 Track Description</div>
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:"#888",display:"block",marginBottom:6}}>Genre / Style</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["Trap","Lo-fi","Ambient","R&B","Techno","Indie Pop","Latin","K-Pop"].map(g=><button key={g} onClick={()=>setGenre(genre===g?"":g)}
                style={{padding:"5px 10px",borderRadius:5,border:`1px solid ${genre===g?"#E040FB":"#333"}`,background:genre===g?"#E040FB15":"#0A0A0A",color:genre===g?"#E040FB":"#888",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{g}</button>)}
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:11,color:"#888",display:"block",marginBottom:6}}>Prompt / Mood / Lyrics</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5}
              placeholder={"Night city, neon lights, solitude and hope. Something between The Weeknd and Burial. Lyrics: 'I search for light in the dark...'"}
              style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"1px solid #333",background:"#0A0A0A",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          {!hasReplicate&&<div style={{padding:"10px 12px",borderRadius:7,background:"#1a1000",border:"1px solid #FF980040",marginBottom:12,fontSize:12,color:"#FF9800"}}>
            ⚠️ Add Replicate API key above to enable real generation
          </div>}
          <button onClick={handleGenerate} disabled={generating}
            style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:generating?"#2a0a3a":hasReplicate?"#E040FB":"#333",color:"#fff",fontSize:14,fontWeight:700,cursor:generating||!prompt?"not-allowed":"pointer",fontFamily:"inherit",opacity:!prompt&&!generating?0.5:1}}>
            {generating?"Generating...":hasReplicate?"🤖 Generate via Replicate":"🤖 Generate (demo mode)"}
          </button>
          {genStep&&<div style={{marginTop:10,fontSize:12,color:"#A3FF12",fontFamily:"monospace"}}>{genStep}</div>}
          {error&&<div style={{marginTop:10,padding:"8px 12px",borderRadius:6,background:"#2a0a0a",border:"1px solid #FF525240",fontSize:12,color:"#FF5252"}}>{error}</div>}
        </Card>
        <Card>
          <div style={{fontSize:13,fontWeight:600,color:"#A3FF12",marginBottom:14}}>🎬 Output</div>
          {!audioUrl&&!generating&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:300,color:"#333",fontSize:13,gap:10}}>
            <span style={{fontSize:42}}>🎵</span>
            <span>Fill in the prompt and generate</span>
            {!hasReplicate&&<span style={{fontSize:11,color:"#555"}}>or add API key for real output</span>}
          </div>}
          {generating&&<div style={{paddingTop:10}}>
            {["Connecting to Replicate...","Initializing MusicGen Stereo...","Composing melody & arrangement...","Synthesizing vocals & mix...","Mastering to streaming standard..."].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid #111",fontSize:12,color:"#999"}}>
              <div style={{width:14,height:14,border:"2px solid #1F2937",borderTopColor:"#E040FB",borderRadius:"50%",animation:"spin 0.7s linear infinite",flexShrink:0}}/>
              {s}
            </div>)}
          </div>}
          {audioUrl&&<div>
            <div style={{padding:"14px",borderRadius:10,background:"#0a0819",border:"1px solid #E040FB40",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:10}}>🎧 Generated Track</div>
              <audio controls src={audioUrl} style={{width:"100%",marginBottom:10}}/>
              <div style={{display:"flex",gap:6}}>
                <a href={audioUrl} download="gebrid-track.mp3" style={{flex:1,padding:"7px",borderRadius:6,border:"1px solid #E040FB",color:"#E040FB",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none"}}>⬇ Download MP3</a>
              </div>
            </div>
            {videoUrl&&<div style={{padding:"14px",borderRadius:10,background:"#0a0f0a",border:"1px solid #A3FF1240",marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,color:"#fff",marginBottom:8}}>🎬 Video Clip</div>
              <video controls src={videoUrl} style={{width:"100%",borderRadius:8,marginBottom:8}}/>
              <a href={videoUrl} download="gebrid-clip.mp4" style={{display:"block",padding:"7px",borderRadius:6,border:"1px solid #A3FF12",color:"#A3FF12",fontSize:11,fontWeight:600,textAlign:"center",textDecoration:"none"}}>⬇ Download Video</a>
            </div>}
            <button onClick={()=>{if(audioUrl){onAddVideo({name:prompt.slice(0,30)||"Generated Track",url:audioUrl,videoUrl,date:new Date().toLocaleDateString(),views:0,likes:0,type:"generated"});setActiveStudioTab("myvideos");}}}
              style={{width:"100%",padding:"10px",borderRadius:8,border:"none",background:"#E040FB",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              🎵 Mint as Music NFT → FORGE
            </button>
          </div>}
        </Card>
      </div>
      <Card style={{marginTop:14,background:"#0a0819",border:"1px solid #E040FB20"}}>
        <div style={{fontSize:12,fontWeight:600,color:"#E040FB",marginBottom:10}}>🔮 What AI Studio generates</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:8}}>
          {[["🎵 Full Track (30s)","MusicGen Stereo via Replicate — real audio file, no watermark"],["🎬 Video Clip","Runway Gen-3 — 5s cinematic clip synced to track mood"],["🖼️ NFT Artwork","Unique cover art generated per track"],["📝 Lyrics","AI writes lyrics based on mood and genre"],["🎸 Stems","Separate tracks for vocals, beat, bass, melody"],["🔊 Mastering","LUFS normalization, streaming-ready output"]].map(([t,d],i)=>
            <div key={i} style={{padding:"10px 12px",borderRadius:8,background:"#111827",border:"1px solid #1F2937"}}>
              <div style={{fontSize:12,fontWeight:600,color:"#fff",marginBottom:3}}>{t}</div>
              <div style={{fontSize:10,color:"#888",lineHeight:1.4}}>{d}</div>
            </div>)}
        </div>
      </Card>
    </div>}
    {/* MY VIDEOS TAB */}
    {activeStudioTab==="myvideos"&&<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div>
          <h3 style={{fontSize:18,fontWeight:700,color:"#fff",margin:"0 0 2px"}}>My Content</h3>
          <p style={{fontSize:12,color:"#888",margin:0}}>Upload videos, tracks and clips — displayed as your artist portfolio</p>
        </div>
        <button onClick={()=>videoInputRef.current?.click()} style={{padding:"10px 18px",borderRadius:8,border:"none",background:"#E040FB",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
          + Upload Videos
        </button>
        <input ref={videoInputRef} type="file" accept="video/*,audio/*" multiple style={{display:"none"}} onChange={handleVideoUpload}/>
      </div>
      {myVideos.length===0&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:300,gap:14,color:"#444"}}>
        <div style={{fontSize:52}}>📹</div>
        <div style={{fontSize:15,fontWeight:600,color:"#666"}}>No videos yet</div>
        <p style={{fontSize:13,color:"#555",textAlign:"center",maxWidth:400,margin:0}}>Upload your clips, music videos and demos to showcase your artist page. Views and likes update as fans engage.</p>
        <button onClick={()=>videoInputRef.current?.click()} style={{padding:"10px 24px",borderRadius:8,border:"1px solid #E040FB",background:"transparent",color:"#E040FB",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
          Upload first video
        </button>
      </div>}
      {myVideos.length>0&&<div>
        {/* Stats bar */}
        <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
          {[["Videos",myVideos.length,"#E040FB"],["Total Views",myVideos.reduce((a,v)=>a+v.views,0).toLocaleString(),"#A3FF12"],["Total Likes",myVideos.reduce((a,v)=>a+v.likes,0).toLocaleString(),"#FF9800"],["Followers","—","#5BA3E6"]].map(([l,v,c],i)=>
            <div key={i} style={{flex:"1 1 100px",padding:"12px 14px",borderRadius:10,background:"#111827",border:"1px solid #1F2937"}}>
              <div style={{fontSize:10,color:"#888",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontSize:20,fontWeight:700,color:c}}>{v}</div>
            </div>
          )}
        </div>
        {/* Video grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
          {myVideos.map((v,i)=><div key={i} style={{background:"#111827",borderRadius:12,border:"1px solid #1F2937",overflow:"hidden"}}>
            <video src={v.url} controls style={{width:"100%",height:160,objectFit:"cover",display:"block",background:"#000"}}/>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:14,fontWeight:600,color:"#fff",marginBottom:4,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.name}</div>
              <div style={{display:"flex",gap:14,fontSize:12,color:"#888",marginBottom:8}}>
                <span>👁 {v.views.toLocaleString()}</span>
                <span>❤️ {v.likes.toLocaleString()}</span>
                <span style={{marginLeft:"auto",fontSize:11,color:"#555"}}>{v.date}</span>
              </div>
              <div style={{display:"flex",gap:6}}>
                <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,background:v.type==="generated"?"#1a0a2a":"#0a1a2a",color:v.type==="generated"?"#E040FB":"#5BA3E6",border:`1px solid ${v.type==="generated"?"#E040FB30":"#5BA3E630"}`}}>
                  {v.type==="generated"?"🤖 AI Generated":"📹 Uploaded"}
                </span>
                <button onClick={()=>onRemoveVideo(i)} style={{marginLeft:"auto",padding:"2px 8px",borderRadius:4,border:"1px solid #FF525230",background:"transparent",color:"#FF5252",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
              </div>
            </div>
          </div>)}
        </div>
      </div>}
    </div>}
  </div>;
}

export default DePCView;
