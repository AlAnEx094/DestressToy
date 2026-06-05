import { timingSafeEqual } from 'crypto'

function verifySecret(req) {
  const secret = process.env.MAX_RELAY_SECRET
  if (!secret) return false
  const incoming = req.headers['x-relay-secret'] || ''
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

  const token = process.env.MAX_BOT_TOKEN
  if (!token) {
    return res.status(500).json({ error: 'Bot token not configured' })
  }

  const { chat_id, ...messageBody } = req.body || {}
  if (!chat_id) {
    return res.status(400).json({ error: 'chat_id required' })
  }

  // Respond to n8n immediately so it doesn't timeout waiting
  res.status(200).json({ ok: true })

  try {
    await fetch(`https://platform-api.max.ru/messages?chat_id=${chat_id}`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageBody),
    })
  } catch {
    // MAX API unreachable — fire-and-forget, already responded to n8n
  }
}
