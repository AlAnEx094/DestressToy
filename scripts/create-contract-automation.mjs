const N8N_BASE_URL = process.env.N8N_BASE_URL || 'https://n8n.destresstoys.ru';
const N8N_API_KEY = process.env.N8N_API_KEY;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appNUVkunRDc2WjS9';

const DEALS_TABLE_ID = 'tblLrNZmEHH4IHllZ';
const DEALS_TABLE_NAME = 'Сделки';
const AIRTABLE_CREDENTIAL_ID = 'DuTmvC8TzXcPy3di';
const TELEGRAM_CREDENTIAL_ID = 'HafebG6am7xpb4EV';
const RESEND_CREDENTIAL_ID = 'X6je07edTGjkxrsp';
const OWNER_TELEGRAM_CHAT_ID = '968916598';

if (!N8N_API_KEY || !AIRTABLE_TOKEN) {
  console.error('Set N8N_API_KEY and AIRTABLE_TOKEN before running this script.');
  process.exit(1);
}

const headersJson = {
  'X-N8N-API-KEY': N8N_API_KEY,
  'Content-Type': 'application/json',
};

const airtableHeaders = {
  Authorization: `Bearer ${AIRTABLE_TOKEN}`,
  'Content-Type': 'application/json',
};

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} ${url} failed ${response.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

async function getAirtableSchema() {
  return requestJson(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
    headers: airtableHeaders,
  });
}

function fieldExists(table, name) {
  return table.fields.some((field) => field.name === name);
}

async function createField(tableId, field) {
  return requestJson(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${tableId}/fields`, {
    method: 'POST',
    headers: airtableHeaders,
    body: JSON.stringify(field),
  });
}

async function patchSingleSelectChoices(tableId, fieldId, fieldName, requiredChoices, existingChoices) {
  const existingNames = new Set(existingChoices.map((choice) => choice.name));
  const missing = requiredChoices.filter((choice) => !existingNames.has(choice.name));
  if (!missing.length) return false;

  const cleanChoices = existingChoices.map((choice) => ({
    name: choice.name,
    color: choice.color || 'grayLight2',
  }));

  await requestJson(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${tableId}/fields/${fieldId}`, {
    method: 'PATCH',
    headers: airtableHeaders,
    body: JSON.stringify({
      name: fieldName,
      options: {
        choices: [...cleanChoices, ...missing],
      },
    }),
  });
  return true;
}

async function seedPipelineChoices() {
  const records = [
    { fields: { 'Название сделки': '__schema_seed__ contract prepare', 'Статус воронки': '📄 Подготовить договор' } },
    { fields: { 'Название сделки': '__schema_seed__ contract sent', 'Статус воронки': '📨 Договор отправлен' } },
    { fields: { 'Название сделки': '__schema_seed__ contract approval', 'Статус воронки': '⏳ Договор на согласовании' } },
    { fields: { 'Название сделки': '__schema_seed__ contract signed', 'Статус воронки': '✍️ Договор подписан' } },
  ];

  const result = await requestJson(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DEALS_TABLE_ID}`, {
    method: 'POST',
    headers: airtableHeaders,
    body: JSON.stringify({ records, typecast: true }),
  });

  for (const record of result.records) {
    await requestJson(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DEALS_TABLE_ID}/${record.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });
  }

  return result.records.length;
}

async function ensureAirtableContractFields() {
  const schema = await getAirtableSchema();
  const deals = schema.tables.find((table) => table.id === DEALS_TABLE_ID || table.name === DEALS_TABLE_NAME);
  if (!deals) throw new Error('Deals table not found');

  const fieldsToCreate = [
    { name: 'Контрагент: наименование', type: 'singleLineText' },
    { name: 'Контрагент: email для договора', type: 'email' },
    { name: 'Контрагент: ИНН', type: 'singleLineText' },
    { name: 'Контрагент: КПП', type: 'singleLineText' },
    { name: 'Контрагент: ОГРН', type: 'singleLineText' },
    { name: 'Контрагент: юридический адрес', type: 'multilineText' },
    { name: 'Контрагент: подписант', type: 'singleLineText' },
    { name: 'Контрагент: должность подписанта', type: 'singleLineText' },
    { name: 'Контрагент: основание подписания', type: 'singleLineText' },
    { name: 'Исполнитель: наименование', type: 'singleLineText' },
    { name: 'Исполнитель: ИНН', type: 'singleLineText' },
    { name: 'Исполнитель: ОГРН/ОГРНИП', type: 'singleLineText' },
    { name: 'Исполнитель: юридический адрес', type: 'multilineText' },
    { name: 'Исполнитель: банковские реквизиты', type: 'multilineText' },
    { name: 'Исполнитель: подписант', type: 'singleLineText' },
    { name: 'Исполнитель: основание подписания', type: 'singleLineText' },
    { name: 'Договор: номер', type: 'singleLineText' },
    {
      name: 'Договор: дата',
      type: 'date',
      options: { dateFormat: { name: 'european', format: 'D/M/YYYY' } },
    },
    { name: 'Договор: спецификация', type: 'multilineText' },
    { name: 'Договор: условия оплаты', type: 'multilineText' },
    { name: 'Договор: срок изготовления', type: 'singleLineText' },
    { name: 'Договор: срок поставки', type: 'singleLineText' },
    { name: 'Договор: адрес поставки', type: 'multilineText' },
    { name: 'Договор: особые условия', type: 'multilineText' },
    {
      name: 'Договор: статус',
      type: 'singleSelect',
      options: {
        choices: [
          { name: 'черновик', color: 'grayLight2' },
          { name: 'готов к отправке', color: 'blueLight2' },
          { name: 'не хватает данных', color: 'yellowLight2' },
          { name: 'отправлен клиенту', color: 'cyanLight2' },
          { name: 'согласован', color: 'greenLight2' },
          { name: 'правки', color: 'orangeLight2' },
          { name: 'подписан', color: 'greenBright' },
        ],
      },
    },
    { name: 'Договор: HTML', type: 'multilineText' },
    { name: 'Договор: текст письма', type: 'multilineText' },
    {
      name: 'Договор: дата отправки',
      type: 'date',
      options: { dateFormat: { name: 'european', format: 'D/M/YYYY' } },
    },
  ];

  const created = [];
  for (const field of fieldsToCreate) {
    if (fieldExists(deals, field.name)) continue;
    await createField(deals.id, field);
    created.push(field.name);
  }

  const seededPipelineChoices = await seedPipelineChoices();

  return { created, seededPipelineChoices };
}

function airtableCredential() {
  return {
    airtableTokenApi: {
      id: AIRTABLE_CREDENTIAL_ID,
      name: 'Airtable Personal Access Token account',
    },
  };
}

function telegramCredential() {
  return {
    telegramApi: {
      id: TELEGRAM_CREDENTIAL_ID,
      name: 'Telegram account',
    },
  };
}

function resendCredential() {
  return {
    httpBearerAuth: {
      id: RESEND_CREDENTIAL_ID,
      name: 'Resend API',
    },
  };
}

function prepareContractNode() {
function value(name, fallback = '') {
  const v = deal[name];
  if (Array.isArray(v)) return v.join(', ');
  return v ?? fallback;
}

function escapeHtml(input) {
  return String(input ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function paragraph(input) {
  return escapeHtml(input || '').replace(/\n/g, '<br>');
}

function formatRub(input) {
  const n = Number(input || 0);
  return n ? new Intl.NumberFormat('ru-RU').format(n) + ' ₽' : 'согласно спецификации';
}

const deal = $input.first().json;
const required = [
  'Название сделки',
  'Контрагент: наименование',
  'Контрагент: email для договора',
  'Контрагент: ИНН',
  'Контрагент: юридический адрес',
  'Контрагент: подписант',
  'Контрагент: должность подписанта',
  'Контрагент: основание подписания',
  'Исполнитель: наименование',
  'Исполнитель: ИНН',
  'Исполнитель: ОГРН/ОГРНИП',
  'Исполнитель: юридический адрес',
  'Исполнитель: банковские реквизиты',
  'Исполнитель: подписант',
  'Исполнитель: основание подписания',
  'Договор: номер',
  'Договор: дата',
  'Договор: спецификация',
  'Договор: условия оплаты',
  'Договор: срок изготовления',
  'Договор: срок поставки',
];

const missing = required.filter((name) => {
  const v = deal[name];
  return v === undefined || v === null || String(v).trim() === '';
});

const dealId = deal.id;
const contractNumber = value('Договор: номер');
const contractDate = value('Договор: дата');
const productTrack = value('Продуктовый трек', 'брендированная игрушка');
const quantity = value('Тираж', '');
const price = formatRub(value('Цена продажи ₽'));
const buyerName = value('Контрагент: наименование');
const buyerEmail = value('Контрагент: email для договора');
const sellerName = value('Исполнитель: наименование');
const subject = value('Тип заказа', productTrack);
const specification = value('Договор: спецификация');
const paymentTerms = value('Договор: условия оплаты');
const productionTerm = value('Договор: срок изготовления');
const deliveryTerm = value('Договор: срок поставки');
const deliveryAddress = value('Договор: адрес поставки', 'уточняется сторонами дополнительно');
const specialTerms = value('Договор: особые условия', 'нет');

const title = 'Договор поставки и изготовления индивидуальной продукции';
const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} № ${escapeHtml(contractNumber)}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #151515; line-height: 1.45; }
    h1 { font-size: 20px; margin-bottom: 4px; }
    h2 { font-size: 15px; margin-top: 22px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0 18px; }
    td, th { border: 1px solid #d8d8d8; padding: 8px; vertical-align: top; }
    .muted { color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)} № ${escapeHtml(contractNumber)}</h1>
  <p>Дата договора: ${escapeHtml(contractDate)}</p>
  <p><b>${escapeHtml(sellerName)}</b>, именуемый далее "Исполнитель", и <b>${escapeHtml(buyerName)}</b>, именуемый далее "Заказчик", согласовали следующие условия.</p>

  <h2>1. Предмет договора</h2>
  <p>Исполнитель обязуется организовать изготовление и поставку индивидуальной продукции: ${escapeHtml(subject)}. Заказчик обязуется принять результат и оплатить его на условиях договора.</p>
  <p>Продуктовый трек: ${escapeHtml(productTrack)}. Тираж: ${escapeHtml(quantity || 'согласно спецификации')}.</p>

  <h2>2. Спецификация</h2>
  <p>${paragraph(specification)}</p>

  <h2>3. Цена и порядок оплаты</h2>
  <p>Ориентировочная стоимость заказа: ${escapeHtml(price)}.</p>
  <p>${paragraph(paymentTerms)}</p>

  <h2>4. Сроки</h2>
  <table>
    <tr><th>Этап</th><th>Условие</th></tr>
    <tr><td>Изготовление</td><td>${escapeHtml(productionTerm)}</td></tr>
    <tr><td>Поставка</td><td>${escapeHtml(deliveryTerm)}</td></tr>
    <tr><td>Адрес поставки</td><td>${paragraph(deliveryAddress)}</td></tr>
  </table>

  <h2>5. Макеты, образцы и согласование</h2>
  <p>Производство запускается после согласования дизайна, спецификации и условий оплаты. Если требуется образец, его стоимость, срок изготовления и порядок утверждения фиксируются в спецификации или дополнительной переписке сторон.</p>

  <h2>6. Права на материалы</h2>
  <p>Заказчик подтверждает, что имеет право использовать переданные логотипы, изображения, фирменные элементы и иные материалы. Исполнитель использует их только для исполнения заказа.</p>

  <h2>7. Приемка</h2>
  <p>Заказчик проверяет продукцию при получении. Замечания по количеству, комплектности и явным дефектам направляются Исполнителю в разумный срок с фото- или видеофиксацией.</p>

  <h2>8. Особые условия</h2>
  <p>${paragraph(specialTerms)}</p>

  <h2>9. Реквизиты сторон</h2>
  <table>
    <tr><th>Исполнитель</th><th>Заказчик</th></tr>
    <tr>
      <td>
        <b>${escapeHtml(value('Исполнитель: наименование'))}</b><br>
        ИНН: ${escapeHtml(value('Исполнитель: ИНН'))}<br>
        ОГРН/ОГРНИП: ${escapeHtml(value('Исполнитель: ОГРН/ОГРНИП'))}<br>
        Адрес: ${paragraph(value('Исполнитель: юридический адрес'))}<br>
        Банковские реквизиты:<br>${paragraph(value('Исполнитель: банковские реквизиты'))}<br>
        Подписант: ${escapeHtml(value('Исполнитель: подписант'))}<br>
        Основание: ${escapeHtml(value('Исполнитель: основание подписания'))}
      </td>
      <td>
        <b>${escapeHtml(buyerName)}</b><br>
        ИНН: ${escapeHtml(value('Контрагент: ИНН'))}<br>
        КПП: ${escapeHtml(value('Контрагент: КПП'))}<br>
        ОГРН: ${escapeHtml(value('Контрагент: ОГРН'))}<br>
        Адрес: ${paragraph(value('Контрагент: юридический адрес'))}<br>
        Подписант: ${escapeHtml(value('Контрагент: подписант'))}<br>
        Должность: ${escapeHtml(value('Контрагент: должность подписанта'))}<br>
        Основание: ${escapeHtml(value('Контрагент: основание подписания'))}
      </td>
    </tr>
  </table>
  <p class="muted">Черновик сформирован автоматически. Перед подписанием условия нужно проверить вручную.</p>
</body>
</html>`;

const emailText = `Здравствуйте!

Направляем договор № ${contractNumber} от ${contractDate} по заказу "${value('Название сделки')}" на согласование.

Пожалуйста, проверьте реквизиты, спецификацию, сроки, условия оплаты и сообщите, можно ли готовить финальную версию к подписанию.

С уважением,
${sellerName}`;

return [{
  json: {
    dealId,
    isReady: missing.length === 0,
    missing,
    buyerEmail,
    buyerName,
    sellerName,
    contractNumber,
    contractDate,
    html,
    emailText,
    emailSubject: `Договор № ${contractNumber} на согласование`,
  },
}];
}

const prepareContractCode = `return (${prepareContractNode.toString()})();`;

function buildContractWorkflow() {
  const nodes = [
    {
      id: 'sched-contract',
      name: 'Каждые 30 минут',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [40, 300],
      parameters: {
        rule: {
          interval: [{ field: 'minutes', minutesInterval: 30 }],
        },
      },
    },
    {
      id: 'at-search-contract',
      name: 'Airtable: Найти сделки для договора',
      type: 'n8n-nodes-base.airtable',
      typeVersion: 2,
      position: [260, 300],
      parameters: {
        operation: 'search',
        base: { __rl: true, value: AIRTABLE_BASE_ID, mode: 'id' },
        table: { __rl: true, value: DEALS_TABLE_ID, mode: 'id' },
        filterByFormula: "OR({Статус воронки} = '📄 Подготовить договор', {Договор: статус} = 'готов к отправке')",
        returnAll: false,
        limit: 1,
        options: {
          fields: [
            'Название сделки',
            'Статус воронки',
            'Продуктовый трек',
            'Тип заказа',
            'Тираж',
            'Цена продажи ₽',
            'Контрагент: наименование',
            'Контрагент: email для договора',
            'Контрагент: ИНН',
            'Контрагент: КПП',
            'Контрагент: ОГРН',
            'Контрагент: юридический адрес',
            'Контрагент: подписант',
            'Контрагент: должность подписанта',
            'Контрагент: основание подписания',
            'Исполнитель: наименование',
            'Исполнитель: ИНН',
            'Исполнитель: ОГРН/ОГРНИП',
            'Исполнитель: юридический адрес',
            'Исполнитель: банковские реквизиты',
            'Исполнитель: подписант',
            'Исполнитель: основание подписания',
            'Договор: номер',
            'Договор: дата',
            'Договор: спецификация',
            'Договор: условия оплаты',
            'Договор: срок изготовления',
            'Договор: срок поставки',
            'Договор: адрес поставки',
            'Договор: особые условия',
            'Договор: статус',
          ],
        },
      },
      credentials: airtableCredential(),
    },
    {
      id: 'code-contract',
      name: 'Подготовить договор',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [500, 300],
      parameters: {
        jsCode: prepareContractCode,
      },
    },
    {
      id: 'if-contract-ready',
      name: 'Данные заполнены?',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [740, 300],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
          conditions: [
            {
              id: 'ready-bool',
              leftValue: '={{ $json.isReady }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'equals' },
            },
          ],
          combinator: 'and',
        },
        options: {},
      },
    },
    {
      id: 'email-contract',
      name: 'Resend: Отправить договор клиенту',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [980, 180],
      parameters: {
        method: 'POST',
        url: 'https://api.resend.com/emails',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpBearerAuth',
        sendBody: true,
        contentType: 'json',
        body: "={{ JSON.stringify({ from: 'DeStressToys <noreply@destresstoys.ru>', to: [$json.buyerEmail], subject: $json.emailSubject, text: $json.emailText, html: '<p>' + $json.emailText.replace(/\\n/g, '<br>') + '</p><hr>' + $json.html }) }}",
        options: { timeout: 15000 },
      },
      credentials: resendCredential(),
    },
    {
      id: 'at-update-sent',
      name: 'Airtable: Договор отправлен',
      type: 'n8n-nodes-base.airtable',
      typeVersion: 2,
      position: [1220, 180],
      parameters: {
        operation: 'update',
        application: { __rl: true, value: AIRTABLE_BASE_ID, mode: 'id' },
        table: { __rl: true, value: DEALS_TABLE_ID, mode: 'id' },
        id: "={{ $('Подготовить договор').first().json.dealId }}",
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Статус воронки': '⏳ Договор на согласовании',
            'Договор: статус': 'отправлен клиенту',
            'Договор: HTML': "={{ $('Подготовить договор').first().json.html }}",
            'Договор: текст письма': "={{ $('Подготовить договор').first().json.emailText }}",
            'Договор: дата отправки': '={{ new Date().toISOString().slice(0,10) }}',
            'Последнее сообщение клиенту': "={{ $('Подготовить договор').first().json.emailText }}",
          },
          schema: [],
          attemptToConvertTypes: false,
          ignoreTypeMismatchErrors: false,
        },
        base: { __rl: true, value: AIRTABLE_BASE_ID, mode: 'id' },
      },
      credentials: airtableCredential(),
    },
    {
      id: 'tg-contract-sent',
      name: 'Telegram: Договор отправлен',
      type: 'n8n-nodes-base.telegram',
      typeVersion: 1.2,
      position: [1460, 180],
      parameters: {
        chatId: OWNER_TELEGRAM_CHAT_ID,
        text: "=📨 *Договор отправлен клиенту*\n\nСделка: {{ $('Подготовить договор').first().json.dealId }}\nКлиент: {{ $('Подготовить договор').first().json.buyerName }}\nEmail: {{ $('Подготовить договор').first().json.buyerEmail }}\nДоговор: № {{ $('Подготовить договор').first().json.contractNumber }} от {{ $('Подготовить договор').first().json.contractDate }}\n\nСтатус → Договор на согласовании",
        additionalFields: { parse_mode: 'Markdown' },
      },
      credentials: telegramCredential(),
    },
    {
      id: 'at-update-missing',
      name: 'Airtable: Не хватает данных',
      type: 'n8n-nodes-base.airtable',
      typeVersion: 2,
      position: [980, 430],
      parameters: {
        operation: 'update',
        application: { __rl: true, value: AIRTABLE_BASE_ID, mode: 'id' },
        table: { __rl: true, value: DEALS_TABLE_ID, mode: 'id' },
        id: "={{ $('Подготовить договор').first().json.dealId }}",
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Договор: статус': 'не хватает данных',
            'Договор: текст письма': "={{ 'Не хватает данных для договора: ' + $('Подготовить договор').first().json.missing.join(', ') }}",
          },
          schema: [],
          attemptToConvertTypes: false,
          ignoreTypeMismatchErrors: false,
        },
        base: { __rl: true, value: AIRTABLE_BASE_ID, mode: 'id' },
      },
      credentials: airtableCredential(),
    },
    {
      id: 'tg-contract-missing',
      name: 'Telegram: Заполнить договор',
      type: 'n8n-nodes-base.telegram',
      typeVersion: 1.2,
      position: [1220, 430],
      parameters: {
        chatId: OWNER_TELEGRAM_CHAT_ID,
        text: "=📄 *Договор не отправлен: не хватает данных*\n\nСделка: {{ $('Подготовить договор').first().json.dealId }}\nЗаполни поля:\n{{ $('Подготовить договор').first().json.missing.map((x) => '• ' + x).join('\\n') }}",
        additionalFields: { parse_mode: 'Markdown' },
      },
      credentials: telegramCredential(),
    },
  ];

  return {
    name: '09 — Договор на согласование',
    nodes,
    connections: {
      'Каждые 30 минут': {
        main: [[{ node: 'Airtable: Найти сделки для договора', type: 'main', index: 0 }]],
      },
      'Airtable: Найти сделки для договора': {
        main: [[{ node: 'Подготовить договор', type: 'main', index: 0 }]],
      },
      'Подготовить договор': {
        main: [[{ node: 'Данные заполнены?', type: 'main', index: 0 }]],
      },
      'Данные заполнены?': {
        main: [
          [{ node: 'Resend: Отправить договор клиенту', type: 'main', index: 0 }],
          [{ node: 'Airtable: Не хватает данных', type: 'main', index: 0 }],
        ],
      },
      'Resend: Отправить договор клиенту': {
        main: [[{ node: 'Airtable: Договор отправлен', type: 'main', index: 0 }]],
      },
      'Airtable: Договор отправлен': {
        main: [[{ node: 'Telegram: Договор отправлен', type: 'main', index: 0 }]],
      },
      'Airtable: Не хватает данных': {
        main: [[{ node: 'Telegram: Заполнить договор', type: 'main', index: 0 }]],
      },
    },
    settings: {
      executionOrder: 'v1',
      timezone: 'Europe/Moscow',
    },
  };
}

async function getWorkflows() {
  const response = await requestJson(`${N8N_BASE_URL}/api/v1/workflows`, {
    headers: headersJson,
  });
  return Array.isArray(response.data) ? response.data : response;
}

function sanitizeWorkflowForUpdate(workflow) {
  return {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings || {},
  };
}

async function upsertWorkflow() {
  const workflows = await getWorkflows();
  const existing = workflows.find((workflow) => workflow.name === '09 — Договор на согласование');
  const workflow = buildContractWorkflow();

  if (existing) {
    const updated = await requestJson(`${N8N_BASE_URL}/api/v1/workflows/${existing.id}`, {
      method: 'PUT',
      headers: headersJson,
      body: JSON.stringify(sanitizeWorkflowForUpdate({ ...existing, ...workflow })),
    });
    return { action: 'updated', id: updated.id || existing.id };
  }

  const created = await requestJson(`${N8N_BASE_URL}/api/v1/workflows`, {
    method: 'POST',
    headers: headersJson,
    body: JSON.stringify(workflow),
  });
  return { action: 'created', id: created.id };
}

async function main() {
  const airtable = await ensureAirtableContractFields();
  const workflow = await upsertWorkflow();
  console.log(JSON.stringify({ airtable, workflow }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
