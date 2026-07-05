import { timingSafeEqual } from 'crypto'

// See api/cost-calculations.js for why this isn't process.env.AIRTABLE_BASE_ID.
const AIRTABLE_BASE_ID = process.env.AIRTABLE_CALCULATOR_BASE_ID || 'appNUVkunRDc2WjS9'
const CALCULATIONS_TABLE = process.env.AIRTABLE_CALCULATIONS_TABLE || 'Расчёты поставщиков'
const DOCUMENTS_TABLE = process.env.AIRTABLE_DOCUMENTS_TABLE || 'Документы'
const AMO_BASE = 'https://leshaantipovmailru.amocrm.ru'

const DOC_TYPES = ['КП', 'Счёт', 'УПД']
const DOC_PREFIX = { 'КП': 'КП', 'Счёт': 'СЧ', 'УПД': 'УПД' }

// Seller requisites are fixed for this business — not worth a config table for one entity.
const SELLER = {
  name: 'ИП Антипов Алексей Александрович',
  ogrnip: '325710000056557',
  address: 'г. Тула',
  taxNote: 'УСН, НДС не облагается',
}

function verifyAccess(req) {
  const token = process.env.CALCULATOR_ACCESS_TOKEN || ''
  const legacyToken = process.env.CALCULATOR_LEGACY_TOKEN || ''
  // Header only — a query-string token would end up in access logs, proxies, and browser history.
  const incoming = req.headers['x-calculator-access'] || ''
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

function tableUrl(tableName, path = '') {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}${path}`
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

function formatRub(value) {
  return `${Math.round(value || 0).toLocaleString('ru-RU')} ₽`
}

function mapCalcRecord(record) {
  const f = record.fields || {}
  return {
    id: record.id,
    dealId: f['Сделка ID'] || '',
    supplierName: f['Поставщик'] || '',
    variantName: f['Название варианта'] || '',
    material: f['Тип изделия'] || '',
    quantity: f['Тираж'] || 0,
    costRub: f['Себестоимость ₽/шт'] || 0,
    priceRub: f['Цена клиенту ₽/шт'] || 0,
    totalPriceRub: f['Сумма КП ₽'] || 0,
    leadTimeDays: f['Срок дней'] || 0,
    status: f['Статус'] || 'черновик',
  }
}

// Pulls every "выбран" calculation across one or more deals (same client, several
// factories paid together — the rare case where deals are linked manually).
async function listSelectedCalculations(dealIds) {
  const ids = [...new Set(dealIds.filter(Boolean))]
  if (ids.length === 0) return []
  const dealFormula = ids.length === 1
    ? `{Сделка ID}='${escapeFormulaString(ids[0])}'`
    : `OR(${ids.map((id) => `{Сделка ID}='${escapeFormulaString(id)}'`).join(',')})`
  const formula = `AND(${dealFormula}, {Статус}='выбран')`
  const params = new URLSearchParams({ filterByFormula: formula })
  const data = await requestJson(`${tableUrl(CALCULATIONS_TABLE)}?${params.toString()}`, {
    headers: airtableHeaders(),
  })
  return (data.records || []).map(mapCalcRecord)
}

// Separate counter per document type per year — read current max, +1, create.
// Low volume business (a handful of documents a month): the read-then-write race
// window is an accepted risk, not worth a distributed lock for this throughput.
async function nextDocumentNumber(type, year) {
  const formula = `AND({Тип документа}='${escapeFormulaString(type)}', {Год}=${Number(year)})`
  const params = new URLSearchParams({ filterByFormula: formula })
  params.set('sort[0][field]', 'Порядковый номер')
  params.set('sort[0][direction]', 'desc')
  params.set('maxRecords', '1')
  const data = await requestJson(`${tableUrl(DOCUMENTS_TABLE)}?${params.toString()}`, {
    headers: airtableHeaders(),
  })
  const last = Number(data.records?.[0]?.fields?.['Порядковый номер']) || 0
  const seq = last + 1
  const prefix = DOC_PREFIX[type] || type
  return { seq, number: `${prefix}-${String(seq).padStart(3, '0')}/${year}` }
}

function buildLineItems(calculations) {
  return calculations.map((calc, index) => ({
    n: index + 1,
    name: [calc.material, calc.variantName].filter(Boolean).join(' — ') || calc.supplierName || 'Позиция',
    quantity: calc.quantity,
    unitPriceRub: calc.priceRub,
    sumRub: calc.totalPriceRub || calc.priceRub * calc.quantity,
  }))
}

function buildDocumentText(type, number, dateStr, lineItems, buyer) {
  const totalRub = lineItems.reduce((sum, item) => sum + item.sumRub, 0)
  return [
    `${type} № ${number} от ${dateStr}`,
    '',
    `Продавец: ${SELLER.name}, ОГРНИП ${SELLER.ogrnip}, ${SELLER.address} (${SELLER.taxNote})`,
    buyer?.name ? `Покупатель: ${buyer.name}${buyer.inn ? `, ИНН ${buyer.inn}` : ''}${buyer.kpp ? `, КПП ${buyer.kpp}` : ''}` : null,
    buyer?.address ? `Адрес покупателя: ${buyer.address}` : null,
    '',
    '№  Наименование                              Кол-во   Цена за ед.      Сумма',
    ...lineItems.map((item) => `${item.n}. ${item.name} — ${item.quantity} шт × ${formatRub(item.unitPriceRub)} = ${formatRub(item.sumRub)}`),
    '',
    `Итого: ${formatRub(totalRub)}`,
  ].filter((line) => line !== null).join('\n')
}

async function createDocumentRecord({ type, number, seq, year, dealIds, buyer, lineItems, totalRub }) {
  const now = new Date().toISOString()
  const fields = {
    'Номер': number,
    'Тип документа': type,
    'Год': year,
    'Порядковый номер': seq,
    'Сделка ID': dealIds.join(', '),
    'Клиент: наименование': buyer?.name || '',
    'Клиент: ИНН': buyer?.inn || '',
    'Клиент: КПП': buyer?.kpp || '',
    'Клиент: адрес': buyer?.address || '',
    'Позиции': JSON.stringify(lineItems, null, 2),
    'Сумма': Number(totalRub || 0),
    'Статус': 'черновик',
    'Дата создания': now,
  }
  const data = await requestJson(tableUrl(DOCUMENTS_TABLE), {
    method: 'POST',
    headers: airtableHeaders(),
    body: JSON.stringify({ records: [{ fields }], typecast: true }),
  })
  return data.records?.[0]
}

function mapDocumentRecord(record) {
  const f = record.fields || {}
  return {
    id: record.id,
    number: f['Номер'] || '',
    type: f['Тип документа'] || '',
    totalRub: f['Сумма'] || 0,
    status: f['Статус'] || 'черновик',
    createdAt: f['Дата создания'] || record.createdTime || '',
    pdfUrl: f['Ссылка на PDF'] || '',
  }
}

async function listDocuments(dealId) {
  const formula = `FIND('${escapeFormulaString(dealId)}', {Сделка ID})`
  const params = new URLSearchParams({ filterByFormula: formula })
  params.set('sort[0][field]', 'Дата создания')
  params.set('sort[0][direction]', 'desc')
  const data = await requestJson(`${tableUrl(DOCUMENTS_TABLE)}?${params.toString()}`, {
    headers: airtableHeaders(),
  })
  return (data.records || []).map(mapDocumentRecord)
}

async function addAmoDocumentNote(dealId, type, number, totalRub, lineItems) {
  const token = process.env.AMOCRM_TOKEN
  if (!token || !dealId || !/^\d+$/.test(String(dealId))) return { skipped: true }
  const text = [
    `📄 Сформирован документ: ${type} № ${number}`,
    `Сумма: ${formatRub(totalRub)}`,
    `Позиций: ${lineItems.length}`,
  ].join('\n')
  try {
    await requestJson(`${AMO_BASE}/api/v4/leads/${dealId}/notes`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([{ note_type: 'common', params: { text } }]),
    })
    return { skipped: false }
  } catch (e) {
    return { skipped: true, error: e.message }
  }
}

export default async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  if (!verifyAccess(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (!process.env.AIRTABLE_PAT) return res.status(500).json({ error: 'AIRTABLE_PAT is not configured' })

  try {
    if (req.method === 'GET') {
      const dealId = req.query?.dealId || ''
      if (!dealId) return res.status(400).json({ error: 'dealId is required' })
      return res.status(200).json({ ok: true, records: await listDocuments(dealId) })
    }

    const body = req.body || {}
    const { dealId, type, extraDealIds, buyer } = body
    if (!dealId) return res.status(400).json({ error: 'dealId is required' })
    if (!DOC_TYPES.includes(type)) return res.status(400).json({ error: `type must be one of ${DOC_TYPES.join(', ')}` })

    const dealIds = [dealId, ...(Array.isArray(extraDealIds) ? extraDealIds : [])]
    const calculations = await listSelectedCalculations(dealIds)
    if (calculations.length === 0) {
      return res.status(400).json({ error: 'Нет ни одного расчёта со статусом «выбран» по указанной сделке(ам)' })
    }

    const year = new Date().getFullYear()
    const { seq, number } = await nextDocumentNumber(type, year)
    const lineItems = buildLineItems(calculations)
    const totalRub = lineItems.reduce((sum, item) => sum + item.sumRub, 0)
    const dateStr = new Date().toLocaleDateString('ru-RU')
    const text = buildDocumentText(type, number, dateStr, lineItems, buyer)

    const record = await createDocumentRecord({ type, number, seq, year, dealIds, buyer, lineItems, totalRub })
    const amo = await addAmoDocumentNote(dealId, type, number, totalRub, lineItems)

    return res.status(200).json({
      ok: true,
      number,
      type,
      totalRub,
      lineItems,
      text,
      amo,
      record: { id: record.id },
    })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Unknown error' })
  }
}
