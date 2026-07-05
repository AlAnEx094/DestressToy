import { timingSafeEqual } from 'crypto'

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appNUVkunRDc2WjS9'
const CALCULATIONS_TABLE = process.env.AIRTABLE_CALCULATIONS_TABLE || 'Расчёты поставщиков'
const AMO_BASE = 'https://leshaantipovmailru.amocrm.ru'

function verifyAccess(req) {
  const token = process.env.CALCULATOR_ACCESS_TOKEN || ''
  const legacyToken = process.env.CALCULATOR_LEGACY_TOKEN || ''
  const incoming = req.headers['x-calculator-access'] || req.query?.access || ''
  if (!incoming) return false
  try {
    const left = Buffer.from(String(incoming))
    const candidates = [token, legacyToken].filter(Boolean)
    return candidates.some((candidate) => {
      const right = Buffer.from(String(candidate))
      return left.length === right.length && timingSafeEqual(left, right)
    })
  } catch {
    return false
  }
}

function airtableHeaders() {
  return {
    Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
    'Content-Type': 'application/json',
  }
}

function tableUrl(path = '') {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(CALCULATIONS_TABLE)}${path}`
}

async function requestJson(url, options = {}) {
  const res = await fetch(url, options)
  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = { raw: text }
  }
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${url} failed ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

function escapeFormulaString(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function getFields(record) {
  return record?.fields || {}
}

function mapRecord(record) {
  const fields = getFields(record)
  let inputs = {}
  try {
    inputs = fields['inputsJson'] ? JSON.parse(fields['inputsJson']) : {}
  } catch {
    inputs = {}
  }
  return {
    id: record.id,
    dealId: fields['Сделка ID'] || '',
    supplierName: fields['Поставщик'] || '',
    supplierUrl: fields['Ссылка поставщика'] || '',
    variantName: fields['Название варианта'] || '',
    status: fields['Статус'] || 'черновик',
    material: fields['Тип изделия'] || '',
    logistic: fields['Логистика'] || '',
    currency: fields['Валюта'] || '',
    quantity: fields['Тираж'] || 0,
    exw: fields['EXW'] || 0,
    costRub: fields['Себестоимость ₽/шт'] || 0,
    priceRub: fields['Цена клиенту ₽/шт'] || 0,
    totalPriceRub: fields['Сумма КП ₽'] || 0,
    totalProfitRub: fields['Прибыль партии ₽'] || 0,
    marginPct: fields['Маржа %'] || 0,
    leadTimeDays: fields['Срок дней'] || 0,
    comment: fields['Комментарий'] || '',
    createdAt: fields['Дата расчёта'] || record.createdTime || '',
    inputs,
  }
}

async function listCalculations(dealId) {
  const formula = `{Сделка ID}='${escapeFormulaString(dealId)}'`
  const params = new URLSearchParams({
    filterByFormula: formula,
  })
  params.set('sort[0][field]', 'Дата расчёта')
  params.set('sort[0][direction]', 'desc')
  const data = await requestJson(`${tableUrl()}?${params.toString()}`, {
    headers: airtableHeaders(),
  })
  return (data.records || []).map(mapRecord)
}

async function createCalculation(body) {
  const now = new Date().toISOString()
  const result = body.result || {}
  const values = body.values || {}
  const supplier = body.supplier || {}

  const namePrefix = body.dealId || body.clientName || 'no-deal'
  const fields = {
    'Название': `${namePrefix} · ${supplier.name || 'Поставщик'} · ${now.slice(0, 10)}`,
    'Сделка ID': body.dealId || '',
    'Поставщик': supplier.name || '',
    'Ссылка поставщика': supplier.url || '',
    'Название варианта': supplier.variantName || '',
    'Срок дней': Number(supplier.leadTimeDays || 0),
    'Комментарий': supplier.comment || '',
    'Статус': 'черновик',
    'Тип изделия': body.materialLabel || '',
    'Логистика': values.logistic || '',
    'Валюта': result.currency || values.supplierCurrency || '',
    'Тираж': Number(values.quantity || 0),
    'EXW': Number(values.exwUsd || 0),
    'Вес г': Number(values.weightGram || 0),
    'Форма': Number(values.moldUsd || 0),
    'Упаковка': Number(values.packUsd || 0),
    'Себестоимость ₽/шт': Number(result.costRub || 0),
    'Цена клиенту ₽/шт': Number(result.priceRub || 0),
    'Сумма КП ₽': Number(result.totalPriceRub || 0),
    'Прибыль партии ₽': Number(result.totalProfitRub || 0),
    'Маржа %': Number(result.marginPct || 0),
    'Дата расчёта': now,
    'inputsJson': JSON.stringify({
      values,
      whiteParams: body.whiteParams || {},
      ruParams: body.ruParams || {},
      supplier,
      supplierOrigin: body.supplierOrigin || 'china',
      deliveryDays: Number(body.deliveryDays || 0),
      material: body.material || '',
    }, null, 2),
    'resultJson': JSON.stringify(result, null, 2),
    'crmText': body.crmText || '',
    'clientText': body.clientText || '',
  }

  const data = await requestJson(tableUrl(), {
    method: 'POST',
    headers: airtableHeaders(),
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  })
  return mapRecord(data.records?.[0])
}

async function updateCalculationStatus(recordId, status) {
  const data = await requestJson(tableUrl(`/${recordId}`), {
    method: 'PATCH',
    headers: airtableHeaders(),
    body: JSON.stringify({ fields: { Статус: status }, typecast: true }),
  })
  return mapRecord(data)
}

async function clearSelectedCalculations(dealId, exceptRecordId) {
  if (!dealId) return
  const records = await listCalculations(dealId)
  const selectedRecords = records.filter((record) => record.status === 'выбран' && record.id !== exceptRecordId)
  await Promise.all(selectedRecords.map((record) => updateCalculationStatus(record.id, 'черновик')))
}

async function searchAmoCRMContact(name) {
  const token = process.env.AMOCRM_TOKEN
  if (!token || !name) return null
  try {
    const query = name.replace(/^@/, '')
    const res = await fetch(
      `${AMO_BASE}/api/v4/contacts?query=${encodeURIComponent(query)}&limit=1&with=leads`,
      { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(8000) }
    )
    const data = await res.json().catch(() => null)
    const contact = data?._embedded?.contacts?.[0]
    if (!contact) return null
    const leads = contact._embedded?.leads
    if (leads?.length) {
      const sorted = [...leads].sort((a, b) => (b.id || 0) - (a.id || 0))
      return sorted[0]?.id ? String(sorted[0].id) : null
    }
    return null
  } catch {
    return null
  }
}

// status_id 86170994 = "В проработке"
async function updateAmoDeal(dealId, price) {
  const token = process.env.AMOCRM_TOKEN
  if (!token || !dealId || !/^\d+$/.test(String(dealId))) return { skipped: true }
  try {
    await requestJson(`${AMO_BASE}/api/v4/leads/${dealId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: Math.round(price || 0), status_id: 86170994 }),
    })
    return { skipped: false }
  } catch (e) {
    return { skipped: true, error: e.message }
  }
}

async function createAmoFollowUpTask(dealId, daysFromNow = 3) {
  const token = process.env.AMOCRM_TOKEN
  if (!token || !dealId || !/^\d+$/.test(String(dealId))) return { skipped: true }
  try {
    const date = new Date()
    date.setDate(date.getDate() + daysFromNow)
    date.setHours(10, 0, 0, 0)
    await requestJson(`${AMO_BASE}/api/v4/tasks`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([{
        task_type_id: 1,
        text: 'Уточнить решение по расчёту — клиент не ответил',
        complete_till: Math.floor(date.getTime() / 1000),
        entity_type: 'leads',
        entity_id: Number(dealId),
      }]),
    })
    return { skipped: false }
  } catch (e) {
    return { skipped: true, error: e.message }
  }
}

async function addAmoNote(dealId, calculation) {
  const token = process.env.AMOCRM_TOKEN
  if (!token || !dealId || !/^\d+$/.test(String(dealId))) return { skipped: true }

  const siteBase = process.env.SITE_URL || 'https://destresstoys.ru'
  const calcUrl = `${siteBase}/calc?t=dt26calc&dealId=${dealId}`

  const text = [
    '🧮 Выбран расчёт поставщика',
    `Поставщик: ${calculation.supplierName || '—'}`,
    `Вариант: ${calculation.variantName || '—'}`,
    `Себестоимость: ${Math.round(calculation.costRub).toLocaleString('ru-RU')} ₽/шт`,
    `Цена клиенту: ${Math.round(calculation.priceRub).toLocaleString('ru-RU')} ₽/шт`,
    `Сумма КП: ${Math.round(calculation.totalPriceRub).toLocaleString('ru-RU')} ₽`,
    `Прибыль: ${Math.round(calculation.totalProfitRub).toLocaleString('ru-RU')} ₽`,
    `Маржа: ${Math.round(calculation.marginPct)}%`,
    calculation.supplierUrl ? `Ссылка поставщика: ${calculation.supplierUrl}` : null,
    '',
    `📊 Калькулятор сделки: ${calcUrl}`,
  ].filter((line) => line !== null).join('\n')

  await requestJson(`${AMO_BASE}/api/v4/leads/${dealId}/notes`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ note_type: 'common', params: { text } }]),
  })
  return { skipped: false }
}

export default async function handler(req, res) {
  if (!['GET', 'POST', 'PATCH'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!verifyAccess(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (!process.env.AIRTABLE_PAT) return res.status(500).json({ error: 'AIRTABLE_PAT is not configured' })

  try {
    if (req.method === 'GET') {
      const dealId = req.query?.dealId || ''
      if (!dealId) return res.status(400).json({ error: 'dealId is required' })
      return res.status(200).json({ ok: true, records: await listCalculations(dealId) })
    }

    if (req.method === 'POST') {
      const body = req.body || {}
      if (!body.dealId && !body.clientName) return res.status(400).json({ error: 'dealId or clientName is required' })
      let resolvedDealId = body.dealId || ''
      if (!resolvedDealId && body.clientName) {
        resolvedDealId = await searchAmoCRMContact(body.clientName) || ''
      }
      const record = await createCalculation({ ...body, dealId: resolvedDealId })
      return res.status(200).json({ ok: true, record })
    }

    const { recordId, dealId } = req.body || {}
    if (!recordId) return res.status(400).json({ error: 'recordId is required' })
    const record = await updateCalculationStatus(recordId, 'выбран')
    const resolvedDealId = dealId || record.dealId
    await clearSelectedCalculations(resolvedDealId, record.id)
    const [amo, dealUpdate, followUp] = await Promise.all([
      addAmoNote(resolvedDealId, record),
      updateAmoDeal(resolvedDealId, record.totalPriceRub),
      createAmoFollowUpTask(resolvedDealId, 3),
    ])
    return res.status(200).json({ ok: true, record, amo, dealUpdate, followUp })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Unknown error' })
  }
}
