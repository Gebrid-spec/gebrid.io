import { GEBRID_SYSTEM } from './systemPrompt.js';

export async function aiRoutes(app) {
  app.post('/ai/chat', async (req, reply) => {
    const { message, history = [], systemPrompt } = req.body || {};
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      reply.code(503);
      return { error: 'AI service not configured. Set ANTHROPIC_API_KEY in server/.env' };
    }

    if (!message) {
      reply.code(400);
      return { error: 'message is required' };
    }

    // Build messages array from history + current message
    const messages = [
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: systemPrompt || GEBRID_SYSTEM,
          messages,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Anthropic API ${res.status}: ${errBody}`);
      }

      const data = await res.json();
      const text = data.content
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('\n');

      return {
        reply: text,
        content: data.content,
        model: data.model,
        usage: data.usage,
      };
    } catch (err) {
      reply.code(502);
      return { error: 'AI request failed', detail: err.message };
    }
  });
}
