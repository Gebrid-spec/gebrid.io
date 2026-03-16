export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const { message } = await request.json();
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
        }
      );
      const data = await res.json();
      const reply = data.candidates[0].content.parts[0].text;
      return new Response(JSON.stringify({ reply }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
    
    return env.ASSETS.fetch(request);
  }
}
