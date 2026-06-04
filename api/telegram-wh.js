const N8N_WEBHOOK = 'https://n8n.destresstoys.ru/webhook/tg-client-bot'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Отвечаем Telegram сразу — не ждём n8n
  res.status(200).json({ ok: true })

  try {
    await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    })
  } catch {
    // n8n недоступен — сообщение потеряется, но Telegram не будет ретраить
  }
}
