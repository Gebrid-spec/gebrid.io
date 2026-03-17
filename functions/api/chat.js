export async function onRequestPost(context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const { message } = await context.request.json();

    // 1. Проверяем, подтянулся ли ключ из настроек Cloudflare
    if (!context.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Ключ GEMINI_API_KEY не найден в переменных окружения" }), 
        { status: 500, headers }
      );
    }

    // 2. ИСПРАВЛЕНО: Используем актуальную модель gemini-2.0-flash
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro-preview:generateContent?key=${context.env.GEMINI_API_KEY}`
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
      }
    );

    const data = await res.json();

    // 3. Проверяем, не вернул ли Google ошибку 
    if (data.error) {
      return new Response(
        JSON.stringify({ 
          error: "Ошибка от API Gemini", 
          details: data.error.message || "Неизвестная ошибка API" 
        }), 
        { status: 400, headers }
      );
    }

    // 4. Безопасно читаем ответ нейросети
    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      return new Response(JSON.stringify({ reply }), { headers });
    } else {
      return new Response(
        JSON.stringify({ error: "Неожиданный формат ответа", rawData: data }), 
        { status: 500, headers }
      );
    }

  } catch(e) {
    // Ловим любые другие сбои в коде
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера: " + e.message }), 
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
