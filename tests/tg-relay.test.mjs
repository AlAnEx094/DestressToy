import test from 'node:test'
import assert from 'node:assert/strict'
import handler from '../api/tg-relay.js'

async function invoke(body, { method = 'POST', secret = 'shared' } = {}) {
  const response = { status(code) { this.code = code; return this }, json(data) { this.data = data; return this } }
  await handler({ method, headers: { 'x-relay-secret': secret }, body }, response)
  return response
}

test('auth, allowlist, and webhook restrictions reject without fetching', async () => {
  const oldFetch = globalThis.fetch
  const oldSecret = process.env.TG_RELAY_SECRET
  globalThis.fetch = () => { throw Error('unexpected fetch') }
  try {
    delete process.env.TG_RELAY_SECRET
    assert.equal((await invoke({})).code, 503)
    process.env.TG_RELAY_SECRET = 'shared'
    assert.equal((await invoke({}, { method: 'GET' })).code, 405)
    assert.equal((await invoke({}, { secret: 'wrong' })).code, 401)
    for (const body of [
      { bot: 'other', method: 'sendMessage', params: {} },
      { bot: 'client', method: 'getUpdates', params: {} },
      { bot: 'operator', method: 'deleteWebhook', params: {} },
      { bot: 'operator', method: 'setWebhook', params: { url: 'https://crm.destresstoys.ru/hooks/telegram' } },
      { bot: 'client', method: 'setWebhook', params: { url: 'https://crm.destresstoys.ru.evil.test' } },
      { bot: 'client', method: 'setWebhook', params: { url: 'http://prx.amocrm.com/hook' } },
    ]) assert.equal((await invoke(body)).code, 400)
  } finally {
    globalThis.fetch = oldFetch
    if (oldSecret === undefined) delete process.env.TG_RELAY_SECRET
    else process.env.TG_RELAY_SECRET = oldSecret
  }
})

test('forwards only selected bot and returns Telegram status and JSON', async () => {
  const previous = Object.fromEntries(['TG_RELAY_SECRET', 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_OPERATOR_BOT_TOKEN'].map(k => [k, process.env[k]]))
  const oldFetch = globalThis.fetch
  process.env.TG_RELAY_SECRET = 'shared'
  process.env.TELEGRAM_BOT_TOKEN = 'client-token'
  process.env.TELEGRAM_OPERATOR_BOT_TOKEN = 'operator-token'
  const calls = []
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options })
    return { status: 429, json: async () => ({ ok: false, error_code: 429 }) }
  }
  try {
    const response = await invoke({ bot: 'operator', method: 'sendMessage', params: { chat_id: 1, text: 'hi' } })
    assert.equal(response.code, 429)
    assert.deepEqual(response.data, { ok: false, error_code: 429 })
    assert.equal(calls[0].url, 'https://api.telegram.org/botoperator-token/sendMessage')
    assert.deepEqual(JSON.parse(calls[0].options.body), { chat_id: 1, text: 'hi' })
    await invoke({ bot: 'client', method: 'setWebhook', params: { url: 'https://prx.amocrm.com/hook' } })
    assert.equal(calls[1].url, 'https://api.telegram.org/botclient-token/setWebhook')
    globalThis.fetch = async () => { throw Error('contains-secret') }
    assert.deepEqual((await invoke({ bot: 'client', method: 'getWebhookInfo', params: {} })).data,
      { ok: false, error: 'telegram unreachable' })
  } finally {
    globalThis.fetch = oldFetch
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
})
