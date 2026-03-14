export const PORT_HIST = [
  {day:"Jan 30",value:395000000},{day:"Feb 2",value:391000000},{day:"Feb 5",value:399000000},
  {day:"Feb 8",value:408000000},{day:"Feb 11",value:403000000},{day:"Feb 14",value:415000000},
  {day:"Feb 17",value:421000000},{day:"Feb 20",value:418000000},{day:"Feb 23",value:429000000},
  {day:"Feb 26",value:436000000},{day:"Feb 28",value:442000000},{day:"Mar 2",value:438000000},
  {day:"Mar 5",value:445000000},{day:"Mar 8",value:451000000},{day:"Mar 11",value:448000000},
  {day:"Mar 14",value:457000000},{day:"Mar 17",value:462000000},{day:"Mar 20",value:458000000},
  {day:"Mar 23",value:467000000},{day:"Mar 26",value:471000000},{day:"Mar 29",value:468000000},
  {day:"Apr 1",value:475000000},{day:"Apr 4",value:472000000},{day:"Apr 7",value:479000000},
  {day:"Apr 10",value:476000000},{day:"Apr 13",value:483000000},{day:"Apr 16",value:488000000},
  {day:"Apr 19",value:485000000},{day:"Apr 22",value:492000000},{day:"Apr 25",value:450000000},
];
export const DRAWDOWN = Array.from({length:30},(_,i)=>({day:i+1,dd:-(Math.abs(Math.sin(i/4)*3.8)+Math.random()*1.2).toFixed(2)}));
export const MONTHLY_RET = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>({month:m,ret:+(Math.sin(i/2)*8+Math.random()*5-2).toFixed(1)}));
export const AGENTS = [
  {id:1,name:"GEBRID DCA Engine",strategy:"Institutional Dollar Cost Avg",status:"active",pnl:14.8,aum:125000000,risk:"low",chain:"Ethereum",trades:4280,uptime:"99.9%"},
  {id:2,name:"GEBRID Yield Core",strategy:"Auto-compound DeFi Yield",status:"active",pnl:22.4,aum:98000000,risk:"medium",chain:"Base",trades:2140,uptime:"99.8%"},
  {id:3,name:"GEBRID Treasury OS",strategy:"DAO & Fund Rebalancing",status:"active",pnl:8.6,aum:142000000,risk:"low",chain:"Arbitrum",trades:890,uptime:"100%"},
  {id:4,name:"GEBRID Alpha Momentum",strategy:"Multi-chain Trend Following",status:"active",pnl:31.2,aum:45000000,risk:"high",chain:"Ethereum",trades:6720,uptime:"98.4%"},
  {id:5,name:"GEBRID RWA Bridge",strategy:"Real World Asset Tokenization",status:"active",pnl:6.9,aum:28000000,risk:"low",chain:"Ethereum",trades:124,uptime:"100%"},
  {id:6,name:"GEBRID GameFi Suite",strategy:"On-chain Land & NFT Trading",status:"active",pnl:38.7,aum:12000000,risk:"high",chain:"Polygon",trades:3450,uptime:"99.5%"},
];
export const STRATEGIES = [
  {id:1,name:"GEBRID Institutional DCA",desc:"Dollar-cost averaging into BTC/ETH with TWAP execution, slippage protection, and multi-exchange routing",apy:"12-18%",risk:"Low",minAum:"$1M",users:342,tags:["BTC/ETH","TWAP"],type:"accumulation"},
  {id:2,name:"GEBRID Yield Pro",desc:"Auto-compound across Aave, Compound, Lido with risk-adjusted position sizing and yield rotation",apy:"18-35%",risk:"Medium",minAum:"$5M",users:187,tags:["Yield","DeFi"],type:"yield"},
  {id:3,name:"GEBRID Treasury OS",desc:"Automated treasury rebalancing for DAOs, funds, and family offices with compliance workflows",apy:"8-14%",risk:"Low",minAum:"$10M",users:56,tags:["DAO","Fund"],type:"treasury"},
  {id:4,name:"GEBRID RWA Bridge",desc:"Tokenize and bridge real-world asset yields on-chain. T-Bills, corporate bonds, RE. Compliant pipeline",apy:"6-9%",risk:"Low",minAum:"$25M",users:28,tags:["RWA","Bonds"],type:"rwa"},
  {id:5,name:"GEBRID Land Trader",desc:"On-chain agent monitors Sandbox, Decentraland & Otherside marketplace contracts via smart contract interaction",apy:"20-60%",risk:"High",minAum:"$500K",users:891,tags:["Land","On-chain"],type:"gamefi"},
  {id:6,name:"GEBRID GameFi Harvester",desc:"Automated claiming, staking & compounding of P2E protocol rewards. DeFi-layer only, no gameplay automation",apy:"12-30%",risk:"Medium",minAum:"$250K",users:1420,tags:["Yield","P2E"],type:"gamefi"},
  {id:7,name:"GEBRID NFT Sniper",desc:"Monitors mints & secondary markets via on-chain events. Trait-rarity valuation models + instant flip logic",apy:"30-120%",risk:"High",minAum:"$1M",users:567,tags:["NFT","Alpha"],type:"gamefi"},
  {id:8,name:"GEBRID Perps Trader",desc:"Autonomous perpetuals trading on Hyperliquid, GMX, dYdX. One-click deploy: configure pair, leverage, strategy — agent trades 24/7 with pre-sign risk controls",apy:"25-80%",risk:"High",minAum:"$500K",users:312,tags:["Hyperliquid","GMX","Perps"],type:"perps"},
  {id:9,name:"GEBRID Options Vault",desc:"Covered calls and protective puts via Ribbon, Lyra, Dopex. TradFi-familiar yield with institutional-grade strike selection and auto-rollover",apy:"10-28%",risk:"Medium",minAum:"$2M",users:94,tags:["Options","Calls","Puts"],type:"options"},
  {id:10,name:"GEBRID Stablecoin Optimizer",desc:"Capital-preserved yield across Curve, Convex, Pendle, AAVE. Compliance-first, no directional exposure. Ideal for family offices and foundations",apy:"8-18%",risk:"Low",minAum:"$5M",users:203,tags:["Stables","Curve","Pendle"],type:"stables"},
  {id:11,name:"GEBRID Market Maker",desc:"Active liquidity provision on Uniswap v3, Balancer, Curve. Concentrated liquidity rebalancing with IL protection and fee APY optimization",apy:"15-40%",risk:"Medium",minAum:"$3M",users:78,tags:["Uniswap v3","LP","MM"],type:"mm"},
  {id:12,name:"GEBRID Governance Farmer",desc:"Institutional vote delegation, Votium/Hidden Hand incentives, veTokenomics optimization. Earn bribe revenue across Curve, Balancer, Aura",apy:"12-22%",risk:"Low",minAum:"$10M",users:41,tags:["Governance","veToken","Bribes"],type:"gov"},
];
export const RISK_EVENTS = [
  {time:"14:32:08",type:"blocked",agent:"GEBRID Alpha",desc:"Transaction exceeds max single-trade limit ($5M). Requires multi-sig approval.",sev:"high"},
  {time:"14:28:45",type:"warning",agent:"GEBRID Yield",desc:"Approaching concentration limit on Aave v3 (78%/80% of $98M position)",sev:"medium"},
  {time:"14:15:22",type:"approved",agent:"GEBRID DCA",desc:"Pre-sign screening passed: Buy 420 ETH @ $3,842 ($1.61M)",sev:"low"},
  {time:"14:10:55",type:"approved",agent:"GEBRID GameFi",desc:"Land purchase approved: Sandbox plot (142,-83) for 12 ETH via marketplace contract",sev:"low"},
  {time:"13:58:11",type:"approved",agent:"GEBRID Treasury",desc:"Rebalance: USDC to USDT rotation $18.4M across 3 chains",sev:"low"},
  {time:"13:42:33",type:"warning",agent:"GEBRID RWA",desc:"T-Bill yield inversion detected: UST-3M < UST-6M. Strategy paused.",sev:"medium"},
];
export const ALLOC = [
  {name:"ETH",value:28,color:"#627EEA"},{name:"USDC",value:20,color:"#2775CA"},
  {name:"BTC",value:18,color:"#F7931A"},{name:"RWA/T-Bills",value:12,color:"#00C853"},
  {name:"USDT",value:8,color:"#26A17B"},{name:"DeFi LP",value:7,color:"#FF9800"},
  {name:"GameFi/NFT",value:4,color:"#E040FB"},{name:"Other",value:3,color:"#888"}
];
export const TX_PIPELINE = [
  {id:1,agent:"GEBRID DCA",action:"Buy 420 ETH (TWAP 4h)",amount:"$1.61M",status:"completed",steps:["Proposed","Screened","Approved","Executed"]},
  {id:2,agent:"GEBRID GameFi",action:"Acquire 8 Sandbox plots (sector 140-160)",amount:"96 ETH",status:"screening",steps:["Proposed","Screening...","",""]},
  {id:3,agent:"GEBRID Yield",action:"Compound Aave + Lido yield",amount:"$2.4M",status:"approved",steps:["Proposed","Screened","Approved","Executing..."]},
  {id:4,agent:"GEBRID Alpha",action:"Sell 120 BTC (momentum exit)",amount:"$11.6M",status:"blocked",steps:["Proposed","Screened","BLOCKED",""]},
  {id:5,agent:"GEBRID RWA",action:"Tokenize T-Bill position",amount:"$8.2M",status:"completed",steps:["Proposed","Screened","Approved","Executed"]},
];
export const GAMEFI_WORLDS = [
  {name:"The Sandbox",icon:"🏜️",tier:"production",agents:8,lands:142,value:"1,840 ETH",status:"active",pnl:"+34.2%",activity:"Scouting sectors (140-220) via marketplace API, 12 bids active",how:"On-chain: marketplace smart contract interaction via ethers.js. Floor price monitoring, automated bidding, listing management across 142 plots."},
  {name:"Decentraland",icon:"🌐",tier:"production",agents:5,lands:89,value:"2,410 ETH",status:"active",pnl:"+18.9%",activity:"Listing 28 plots near Genesis Plaza, monitoring 4 districts",how:"On-chain: MANA/LAND contract calls. Price analytics engine scores parcels by proximity, traffic data, and comparable sales."},
  {name:"Otherside",icon:"🦍",tier:"production",agents:3,lands:24,value:"4,200 ETH",status:"active",pnl:"+52.1%",activity:"Monitoring Koda trait rarity, 6 snipe orders queued",how:"On-chain: OpenSea/Blur API + smart contract sniper. Trait-based valuation model flags underpriced Kodas."},
  {name:"Axie Infinity",icon:"⚔️",tier:"beta",agents:4,lands:0,value:"$842K",status:"active",pnl:"+22.7%",activity:"Auto-claiming SLP/AXS rewards, staking $842K position",how:"DeFi-layer: on-chain reward claiming & staking via Ronin bridge."},
  {name:"Illuvium",icon:"🎮",tier:"beta",agents:2,lands:0,value:"$420K",status:"active",pnl:"+15.3%",activity:"ILV yield farming & staking, revenue pool optimization",how:"DeFi-layer: ILV staking contracts, sILV2 flash pool management."},
  {name:"Big Time",icon:"⏳",tier:"rd",agents:0,lands:0,value:"$210K",status:"paused",pnl:"+8.1%",activity:"R&D: evaluating on-chain asset extraction pipeline",how:"Research phase: mapping on-chain vs. off-chain game economy."},
];
export const STAKING_TIERS = [
  {tier:"Free",min:"0",discount:"0%",color:"#888",benefits:["3 agents","1 category","Basic signals"]},
  {tier:"Bronze",min:"1K",discount:"10%",color:"#CD7F32",benefits:["5 agents","Auto-launch","Priority signals"]},
  {tier:"Silver",min:"5K",discount:"20%",color:"#C0C0C0",benefits:["7 agents","API access","Advanced analytics"]},
  {tier:"Gold",min:"25K",discount:"35%",color:"#FFD700",benefits:["10 agents","Multi-chain","DeFi products"]},
  {tier:"Platinum",min:"100K",discount:"50%",color:"#E5E4E2",benefits:["Unlimited agents","White-label","DAO voting","Profit pool"]},
];
export const PROPOSALS = [
  {id:1,title:"Increase Staking APY to 18%",status:"active",votes:{f:847200,a:123400},end:"3d 14h",author:"0x7a2...f31"},
  {id:2,title:"Add Otherside to approved metaverses",status:"active",votes:{f:623100,a:89200},end:"5d 2h",author:"0xb4e...a82"},
  {id:3,title:"Reduce platform fee to 0.3%",status:"passed",votes:{f:1240000,a:320000},end:"Ended",author:"0x3c1...d47"},
];
export const TEST_TXS = [
  {id:"approve",name:"UNLIMITED APPROVE",fn:"approve(spender, MaxUint256)",risk:92,verdict:"BLOCKED",label:"UNLIMITED APPROVE",
    flags:["UNLIMITED_APPROVAL: MaxUint256 detected","AUTO-BLOCK: rule-001 triggered","DRAIN_RISK: spender unverified"],
    detail:"Unlimited ERC-20 approval (MaxUint256) — AUTO-BLOCK. Used in 94% of approval phishing attacks.",detailColor:"#FF5252"},
  {id:"setApproval",name:"SET APPROVAL FOR ALL",fn:"setApprovalForAll(operator, true)",risk:90,verdict:"BLOCKED",label:"SET APPROVAL FOR ALL",
    flags:["SET_APPROVAL_FOR_ALL: NFT collection","AUTO-BLOCK: rule-002 triggered","OPERATOR: unverified address"],
    detail:"setApprovalForAll grants unlimited NFT transfer rights. HIGH severity.",detailColor:"#FF5252"},
  {id:"swap",name:"SAFE SWAP",fn:"swapExactTokens(500 USDC → ETH)",risk:18,verdict:"APPROVED",label:"SAFE SWAP",
    flags:["SWAP_ROUTE: Uniswap v3 verified","SLIPPAGE: 0.3% within limits","CONTRACT: verified + audited"],
    detail:"Swap within approved parameters. Route verified. APPROVED.",detailColor:"#A3FF12"},
  {id:"transfer",name:"OWNERSHIP TRANSFER",fn:"transferOwnership(newOwner)",risk:95,verdict:"BLOCKED",label:"OWNERSHIP TRANSFER",
    flags:["CRITICAL_FUNCTION: ownership change","MULTI_SIG_REQUIRED: not present","TIMELOCK: 48h required, not set"],
    detail:"Requires multi-sig + 48h timelock. Single-signer — AUTO-BLOCK.",detailColor:"#FF5252"},
];
export const PREFLIGHT_SCENARIOS = [
  {id:"poison",icon:"😈",name:"Address Poisoning",desc:"Lookalike attacker address",color:"#FF5252",
    addr:"0xA1B2C3d4E5f6a7B8c9D0e1F2a3B4c5D6e7F8a9B2",amount:"$50,000,000",
    checks:[{n:"Denylist Check",r:"CLEAR"},{n:"Dust Quarantine Cross-Check",r:"CLEAR"},{n:"Address Poisoning Detection",r:"BLOCK"},{n:"Address Book Verification",r:"SKIP"},{n:"First-Time High Value",r:"SKIP"},{n:"Amount Anomaly Check",r:"SKIP"},{n:"ProtectionAgent Deep Scan",r:"SKIP"}],
    scanMs:284,riskScore:"100/100"},
  {id:"dust",icon:"💨",name:"Dust-Then-Drain",desc:"Recipient sent micro-transactions",color:"#FF9800",
    addr:"0xDEAD9a2cF1b3A4d5E6f7B8c9d0E1f2A3b4C5d6E7",amount:"$5,000,000",
    checks:[{n:"Denylist Check",r:"CLEAR"},{n:"Dust Quarantine Cross-Check",r:"BLOCK"},{n:"Address Poisoning Detection",r:"SKIP"},{n:"Address Book Verification",r:"SKIP"},{n:"First-Time High Value",r:"SKIP"},{n:"Amount Anomaly Check",r:"SKIP"},{n:"ProtectionAgent Deep Scan",r:"SKIP"}],
    scanMs:198,riskScore:"100/100"},
  {id:"firsttime",icon:"⚠️",name:"First-Time Large Transfer",desc:"New address, high value",color:"#FF9800",
    addr:"0x9876FeDcBa5432107654AbCdEf0123456789AaBb",amount:"$1,200,000",
    checks:[{n:"Denylist Check",r:"CLEAR"},{n:"Dust Quarantine Cross-Check",r:"CLEAR"},{n:"Address Poisoning Detection",r:"CLEAR"},{n:"Address Book Verification",r:"WARN"},{n:"First-Time High Value",r:"BLOCK"},{n:"Amount Anomaly Check",r:"SKIP"},{n:"ProtectionAgent Deep Scan",r:"SKIP"}],
    scanMs:312,riskScore:"85/100"},
  {id:"verified",icon:"✅",name:"Verified Counterparty",desc:"Known history, normal amount",color:"#A3FF12",
    addr:"0x1234AbCd5678EfGh9012IjKl3456MnOp7890QrSt",amount:"$25,000",
    checks:[{n:"Denylist Check",r:"CLEAR"},{n:"Dust Quarantine Cross-Check",r:"CLEAR"},{n:"Address Poisoning Detection",r:"CLEAR"},{n:"Address Book Verification",r:"CLEAR"},{n:"First-Time High Value",r:"CLEAR"},{n:"Amount Anomaly Check",r:"CLEAR"},{n:"ProtectionAgent Deep Scan",r:"CLEAR"}],
    scanMs:156,riskScore:"4/100"},
];
// ═══ MOCK AI RESPONSES (replaces live API — no CORS issues) ═══
