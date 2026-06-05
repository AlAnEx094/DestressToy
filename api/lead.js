import nodemailer from 'nodemailer'

const AIRTABLE_BASE = 'appNUVkunRDc2WjS9'
const AIRTABLE_TABLE = 'tbl1NgZx7QCp0fu5J'

async function saveToAirtable(body) {
  const pat = process.env.AIRTABLE_PAT
  if (!pat) return

  const fields = {
    'Имя / Компания': body.company || body.name || '',
    'Email': body.email || '',
    'Телефон': body.phone || '',
    'Описание': body.description || '',
    'Тираж': body.quantity || '',
    'UTM Source': body.utm_source || '',
    'UTM Campaign': body.utm_campaign || '',
    'lead_id': body.lead_id || '',
    'Дата': body.submitted_at || new Date().toISOString(),
    'Статус': 'Новая',
  }

  await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })
}

async function notifyMax(body) {
  const token = process.env.MAX_BOT_TOKEN
  const chatId = process.env.MAX_OPERATOR_CHAT_ID
  if (!token || !chatId) return

  const name = body.company || body.name || '—'
  const phone = body.phone || '—'
  const email = body.email || '—'
  const quantity = body.quantity || '—'
  const description = body.description || '—'
  const source = body.utm_source ? ` (${body.utm_source})` : ''

  const text = `🔔 Новая заявка с сайта${source}\n\n` +
    `👤 Компания/Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `✉️ Email: ${email}\n` +
    `📦 Тираж: ${quantity}\n` +
    `💬 Описание: ${description}`

  await fetch(`https://platform-api.max.ru/messages?chat_id=${chatId}`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type: 'text', text }),
  })
}

async function notifyTelegram(body) {
  const token = process.env.TELEGRAM_OPERATOR_BOT_TOKEN
  const chatId = process.env.TELEGRAM_OPERATOR_CHAT_ID
  if (!token || !chatId) return

  const name = body.company || body.name || '—'
  const phone = body.phone || '—'
  const email = body.email || '—'
  const quantity = body.quantity || '—'
  const description = body.description || '—'
  const source = body.utm_source ? ` (${body.utm_source})` : ''

  const text = `🔔 *Новая заявка с сайта${source}*\n\n` +
    `👤 *Компания/Имя:* ${name}\n` +
    `📞 *Телефон:* ${phone}\n` +
    `✉️ *Email:* ${email}\n` +
    `📦 *Тираж:* ${quantity}\n` +
    `💬 *Описание:* ${description}`

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  })
}

const EMAIL_RE = /^[^\s@<>()\[\]\\,;:]+@[^\s@<>()\[\]\\,;:]+\.[^\s@<>()\[\]\\,;:]{2,}$/

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function makeTransport(smtpPassword) {
  return nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: { user: 'info@destresstoys.ru', pass: smtpPassword },
  })
}

async function sendOperatorEmail(body) {
  const smtpPassword = process.env.YANDEX_SMTP_PASSWORD
  if (!smtpPassword) return

  const name = body.company || body.name || '—'
  const phone = body.phone || '—'
  const email = body.email || '—'
  const quantity = body.quantity || '—'
  const description = body.description || '—'
  const source = body.utm_source || '—'

  await makeTransport(smtpPassword).sendMail({
    from: '"DeStressToys" <info@destresstoys.ru>',
    to: 'info@destresstoys.ru',
    subject: `Новая заявка: ${name}`,
    text: `Имя/Компания: ${name}\nТелефон: ${phone}\nEmail: ${email}\nТираж: ${quantity}\nОписание: ${description}\nИсточник: ${source}`,
  })
}

async function sendConfirmationEmail(body) {
  const smtpPassword = process.env.YANDEX_SMTP_PASSWORD
  if (!smtpPassword) return

  const toEmail = (body.email || '').trim()
  if (!EMAIL_RE.test(toEmail)) return

  const transport = makeTransport(smtpPassword)

  const rawName = body.company || body.name || ''
  const safeName = rawName.trim().slice(0, 200) || 'Добрый день'
  const safeNameHtml = escapeHtml(safeName)

  await transport.sendMail({
    from: '"DeStressToys" <info@destresstoys.ru>',
    to: toEmail,
    subject: 'Заявка принята — DeStressToys',
    text: `${safeName},\n\nВаша заявка принята. Мы свяжемся с вами в течение 1 рабочего дня.\n\nС уважением,\nКоманда DeStressToys\ninfo@destresstoys.ru`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
        <div style="background:#ff6a3d;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="margin:0;font-size:22px;color:#fff">DeStressToys</h1>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 8px 8px">
          <p style="font-size:16px;margin-top:0">${safeNameHtml},</p>
          <p style="font-size:16px">Ваша заявка принята. Мы изучим детали и свяжемся с вами в течение <strong>1 рабочего дня</strong>.</p>
          <p style="font-size:14px;color:#555;margin-bottom:0">С уважением,<br>Команда DeStressToys<br>
          <a href="mailto:info@destresstoys.ru" style="color:#ff6a3d">info@destresstoys.ru</a></p>
        </div>
      </div>
    `,
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}

  // Save to Airtable — independent of notification channel
  try {
    await saveToAirtable(body)
  } catch {
    // Non-blocking
  }

  // MAX notification — primary channel (push works reliably)
  try {
    await notifyMax(body)
  } catch {
    // Non-blocking
  }

  // Telegram — secondary duplicate channel
  try {
    await notifyTelegram(body)
  } catch {
    // Non-blocking
  }

  // Notification email to operator
  try {
    await sendOperatorEmail(body)
  } catch {
    // Non-blocking
  }

  // Confirmation email to the lead
  try {
    await sendConfirmationEmail(body)
  } catch {
    // Non-blocking
  }

  // Forward to n8n — secondary channel for CRM automation
  try {
    const response = await fetch('https://n8n.destresstoys.ru/webhook/new-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return res.status(response.status).json(data)
  } catch {
    return res.status(200).json({ status: 'ok', message: 'Заявка сохранена' })
  }
}
