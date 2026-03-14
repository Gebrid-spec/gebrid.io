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
        const contents = [];

        // Add system instruction as first user turn if provided
        if (body.systemPrompt) {
          contents.push({ role: "user", parts: [{ text: "System instruction: " + body.systemPrompt }] });
          contents.push({ role: "model", parts: [{ text: "Understood. I will follow these instructions." }] });
        }

        // Add conversation history
        if (body.history && body.history.length > 0) {
          for (const msg of body.history) {
            contents.push({
              role: msg.role === "user" ? "user" : "model",
              parts: [{ text: msg.content }]
            });
          }
        }

        // Add current message
        contents.push({ role: "user", parts: [{ text: body.message }] });

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7
              }
            })
          }
        );
        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (!reply) {
          return new Response(JSON.stringify({ error: "Empty response from AI", raw: data }), {
            status: 502,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
          });
        }
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
