# GEBRID AI Proxy — Cloudflare Worker Deploy Guide

## Пошаговая инструкция

### 1. Установи Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Залогинься в Cloudflare

```bash
wrangler login
```
Откроется браузер → авторизуйся в Cloudflare dashboard.

### 3. Установи зависимости Worker'а

```bash
cd mvp-app/worker
npm install
```

### 4. Добавь API ключ Anthropic как secret

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```
Вставь свой ключ `sk-ant-api03-...` когда попросит.

> Ключ хранится зашифрованным в Cloudflare, НЕ в коде.

### 5. Задеплой Worker

```bash
npm run deploy
```

Получишь URL вида:
```
https://gebrid-ai-proxy.YOUR_SUBDOMAIN.workers.dev
```

### 6. Привяжи к своему домену (опционально)

В Cloudflare Dashboard:
1. Workers & Pages → gebrid-ai-proxy → Settings → Triggers
2. Add Custom Domain → `api.gebrid.io`
3. Или используй Route: `gebrid.io/api/*`

### 7. Обнови ALLOWED_ORIGIN

В `wrangler.toml` поменяй:
```toml
[vars]
ALLOWED_ORIGIN = "https://gebrid.io"
```

Передеплой: `npm run deploy`

---

## Локальная разработка

**Терминал 1 — Worker:**
```bash
cd mvp-app/worker
npx wrangler secret put ANTHROPIC_API_KEY  # один раз
npm run dev                                 # запускает на :8787
```

**Терминал 2 — Frontend:**
```bash
cd mvp-app
npm run dev                                 # запускает на :5173, проксирует /api → :8787
```

Vite автоматически проксирует `/api/agent/chat` → `localhost:8787` (настроено в `vite.config.js`).

---

## Архитектура

```
Browser (gebrid.io)
    │
    │ POST /api/agent/chat
    │ { system, messages, model, max_tokens }
    │
    ▼
Cloudflare Worker (gebrid-ai-proxy)
    │
    │ + Rate limiting (20 req/min per IP)
    │ + CORS whitelist (gebrid.io only)
    │ + Input validation
    │ + API key injection (from secrets)
    │ + History truncation (last 10 messages)
    │
    ▼
Anthropic API (api.anthropic.com/v1/messages)
    │
    │ Claude response
    │
    ▼
Browser ← JSON response
```

## Security

- API ключ **никогда** не попадает в браузер
- CORS разрешает только `gebrid.io` (и localhost в dev)
- Rate limit: 20 запросов в минуту на IP
- max_tokens ограничен 2048
- History обрезается до 10 сообщений
- Ошибки Anthropic не пробрасываются полностью (no key leak)
