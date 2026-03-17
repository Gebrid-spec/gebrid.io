const SYSTEM_PROMPT = `You are GEBRID Agent OS — an AI assistant for the GEBRID institutional on-chain capital management platform. 

GEBRID is an AI-native operating system for institutional DeFi, built on Base chain. It enables autonomous AI agents to execute trading, RWA, treasury, and yield strategies under institutional-grade risk controls.

Key facts:
- 13 strategies: DCA Engine, Yield Core, Treasury OS, Stablecoin Optimizer, Alpha Momentum, Perps Trader, Options Vault, Market Maker, GameFi Suite, NFT Sniper, Governance Farmer, RWA Bridge, Prediction Trader
- 12 smart contracts on Base chain including AgentNFT (ERC-721), AgentAccountRegistry (ERC-6551), RiskEngine (final authority), GuardPipeline (7 modular guards)
- Token: $GEBRID, 1B supply, listing at $0.04, $40M FDV
- ZK Privacy tiers, ERC-8183 integration, patent portfolio of 76 claims
- Key principle: identity ≠ wallet ≠ permission ≠ risk authority

Answer questions about GEBRID's platform, strategies, architecture, tokenomics, and vision. Be concise, technical, and confident. Respond in the same language the user writes in.`;

export async function onRequestPost(context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const { message } = await context.request.json();

    if (!context.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not found" }), 
        { status: 500, headers }
      );
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${context.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await res.json();

    if (data.error) {
      return new Response(
        JSON.stringify({ error: "Gemini API error", details: data.error.message }), 
        { status: 400, headers }
      );
    }

    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      return new Response(JSON.stringify({ reply }), { headers });
    } else {
      return new Response(
        JSON.stringify({ error: "Unexpected response format", rawData: data }), 
        { status: 500, headers }
      );
    }

  } catch(e) {
    return new Response(
      JSON.stringify({ error: "Server error: " + e.message }), 
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
