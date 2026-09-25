import { timingSafeEqual } from 'node:crypto'

const METHODS = new Set(['sendMessage', 'getWebhookInfo', 'setWebhook', 'deleteWebhook'])

function validWebhookUrl(value) {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()
    return url.protocol === 'https:' && !url.username && !url.password &&
      (host === 'crm.destresstoys.ru' || host.endsWith('.amocrm.com') || host.endsWith('.amocrm.ru'))
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method not allowed' })

  const secret = process.env.TG_RELAY_SECRET
  if (!secret) return res.status(503).json({ ok: false, error: 'relay unavailable' })
  const incoming = req.headers['x-relay-secret']
  const a = Buffer.from(typeof incoming === 'string' ? incoming : '')
  const b = Buffer.from(secret)
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return res.status(401).json({ ok: false, error: 'unauthorized' })
  }

  const { bot, method, params } = req.body || {}
  if (bot !== 'client' && bot !== 'operator') return res.status(400).json({ ok: false, error: 'invalid bot' })
  if (!METHODS.has(method) || !params || typeof params !== 'object' || Array.isArray(params)) {
    return res.status(400).json({ ok: false, error: 'invalid request' })
  }
  if ((method === 'setWebhook' || method === 'deleteWebhook') && bot !== 'client') {
    return res.status(400).json({ ok: false, error: 'webhook operation forbidden' })
  }
  if (method === 'setWebhook' && !validWebhookUrl(params.url)) {
    return res.status(400).json({ ok: false, error: 'invalid webhook URL' })
  }

  const token = bot === 'client' ? process.env.TELEGRAM_BOT_TOKEN : process.env.TELEGRAM_OPERATOR_BOT_TOKEN
  if (!token) return res.status(503).json({ ok: false, error: 'bot unavailable' })

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: AbortSignal.timeout(10000),
    })
    const data = await response.json()
    return res.status(response.status).json(data)
  } catch {
    return res.status(502).json({ ok: false, error: 'telegram unreachable' })
  }
}
