const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API error ${res.status}`);
  }

  return data;
}

export const api = {
  health: () => request('/health'),

  prices: () => request('/prices'),

  priceHistory: (token, days = 30) =>
    request(`/prices/history/${token}?days=${days}`),

  chat: (messages) =>
    request('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages }),
    }),
};
