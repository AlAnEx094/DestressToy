import { timingSafeEqual } from 'crypto'

const N8N_WEBHOOK = 'https://n8n.destresstoys.ru/webhook/tg-client-bot'

function verifySecret(req) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!secret) return false
  const incoming = req.headers['x-telegram-bot-api-secret-token'] || ''
  try {
    const a = Buffer.from(incoming)
    const b = Buffer.from(secret)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!verifySecret(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
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
