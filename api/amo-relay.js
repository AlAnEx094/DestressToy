import { timingSafeEqual } from 'crypto'

const AMO_BASE = 'https://leshaantipovmailru.amocrm.ru'
const PIPELINE_ID = 9702630
const STATUS_ID = 77344742
const RESPONSIBLE_USER_ID = 12591990

function verifySecret(req) {
  const secret = process.env.AMO_RELAY_SECRET
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

async function amoPost(path, body, token) {
  const res = await fetch(`${AMO_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  })
  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  return { ok: res.ok, status: res.status, data }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!verifySecret(req)) return res.status(401).json({ error: 'Unauthorized' })

  const token = process.env.AMOCRM_TOKEN
  if (!token) return res.status(500).json({ error: 'amoCRM token not configured' })

  const d = req.body || {}

  // 1. Contact
  const customFields = []
  if (d.email) customFields.push({ field_code: 'EMAIL', values: [{ value: d.email, enum_code: 'WORK' }] })
  if (d.phone) customFields.push({ field_code: 'PHONE', values: [{ value: d.phone, enum_code: 'WORK' }] })
  const contactPayload = [{ name: d.companyName || 'Не указано', ...(customFields.length ? { custom_fields_values: customFields } : {}) }]

  const contactRes = await amoPost('/api/v4/contacts', contactPayload, token)
  if (!contactRes.ok) {
    return res.status(200).json({ ok: false, step: 'contact', amoStatus: contactRes.status })
  }
  const contactId = contactRes.data._embedded?.contacts?.[0]?.id

  // 2. Deal
  const leadPayload = [{
    name: d.companyName || 'Не указано',
    pipeline_id: PIPELINE_ID,
    status_id: STATUS_ID,
    _embedded: { contacts: [{ id: contactId }] },
  }]
  const leadRes = await amoPost('/api/v4/leads', leadPayload, token)
  if (!leadRes.ok) {
    return res.status(200).json({ ok: false, step: 'lead', amoStatus: leadRes.status })
  }
  const dealId = leadRes.data._embedded?.leads?.[0]?.id

  // 3. Task — next business day 10:00 MSK (07:00 UTC)
  const deadline = new Date()
  deadline.setUTCDate(deadline.getUTCDate() + 1)
  deadline.setUTCHours(7, 0, 0, 0)
  const dow = deadline.getUTCDay()
  if (dow === 6) deadline.setUTCDate(deadline.getUTCDate() + 2)
  if (dow === 0) deadline.setUTCDate(deadline.getUTCDate() + 1)

  await amoPost('/api/v4/tasks', [{
    text: `📞 Позвонить / написать клиенту\n\n👤 ${d.companyName || '—'}\n📦 Тираж: ${d.quantityText || '—'}\n💬 ${d.orderDescription || '—'}`,
    complete_till: Math.floor(deadline.getTime() / 1000),
    task_type_id: 1,
    entity_id: dealId,
    entity_type: 'leads',
    responsible_user_id: RESPONSIBLE_USER_ID,
  }], token)

  // 4. Note
  const noteLines = [
    `📦 Трек: ${d.productTrack || '—'}`,
    `📝 Описание: ${d.orderDescription || '—'}`,
    `📱 Telegram: ${d.telegram || '—'}`,
    `📲 MAX: ${d.max || '—'}`,
    `🔗 UTM source: ${d.utmSource || '—'}`,
    `📊 UTM medium: ${d.utmMedium || '—'}`,
    `📣 UTM campaign: ${d.utmCampaign || '—'}`,
    `🎯 yclid: ${d.yclid || '—'}`,
    `🆔 lead_id: ${d.leadId || '—'}`,
    `🛒 Тираж: ${d.quantityText || '—'}`,
    `📦 Материалы: ${d.hasAssets ? 'есть' : 'нет'}`,
    `🔗 Референс: ${d.referenceUrl || '—'}`,
  ]
  await amoPost(`/api/v4/leads/${dealId}/notes`, [{
    note_type: 'common',
    params: { text: noteLines.join('\n') },
  }], token)

  return res.status(200).json({ ok: true, dealId, contactId })
}
