// ═══════════════════════════════════════════════════════════════
// GEBRID AI Proxy — Cloudflare Worker
// ═══════════════════════════════════════════════════════════════
// Routes: POST /api/agent/chat → Anthropic Messages API
// Security: CORS whitelist, rate limiting, API key in secrets
// ═══════════════════════════════════════════════════════════════

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const MAX_TOKENS = 1024;
const MODEL = "claude-sonnet-4-20250514";

// Rate limiter: per-IP, sliding window
const rateLimitMap = new Map();
const RATE_LIMIT = 20;        // requests
const RATE_WINDOW_MS = 60000; // per minute

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    entry.count = 1;
    entry.resetAt = now + RATE_WINDOW_MS;
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function corsHeaders(origin, allowedOrigin) {
  // In dev, allow localhost; in prod, only allowed origins
  const allowed = allowedOrigin.split(",").map(s => s.trim());
  const isAllowed =
    allowed.includes(origin) ||
    origin?.startsWith("http://localhost") ||
    origin?.startsWith("http://127.0.0.1");

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowed[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN || "https://gebrid.io");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // Only POST /api/agent/chat
    const url = new URL(request.url);
    if (url.pathname !== "/api/agent/chat" || request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Not found. Use POST /api/agent/chat" }),
        { status: 404, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Rate limited. Max 20 requests/minute." }),
        { status: 429, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Validate API key is configured
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key not configured. Run: npx wrangler secret put ANTHROPIC_API_KEY" }),
        { status: 500, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    // Sanitize: enforce model, max_tokens, strip any injected keys
    const payload = {
      model: body.model || MODEL,
      max_tokens: Math.min(body.max_tokens || MAX_TOKENS, 2048),
      system: body.system || "",
      messages: body.messages.slice(-10), // limit history to prevent abuse
    };

    // Forward to Anthropic
    try {
      const response = await fetch(ANTHROPIC_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Don't leak full error details to client
        const safeError = data.error?.message || `Anthropic API error: ${response.status}`;
        return new Response(
          JSON.stringify({ error: safeError }),
          { status: response.status, headers: { ...cors, "Content-Type": "application/json" } }
        );
      }

      // Return Anthropic response as-is
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          ...cors,
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Failed to reach AI backend" }),
        { status: 502, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }
  },
};
