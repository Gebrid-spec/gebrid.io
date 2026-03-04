export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: body.message }] }] })
          }
        );
        const data = await res.json();
        const reply = data.candidates[0].content.parts[0].text;
        return new Response(JSON.stringify({ reply }), {
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
        });
      } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
}
