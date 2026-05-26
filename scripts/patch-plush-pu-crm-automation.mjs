import fs from 'node:fs/promises';
import path from 'node:path';

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const N8N_API_KEY = process.env.N8N_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appNUVkunRDc2WjS9';
const N8N_BASE_URL = (process.env.N8N_BASE_URL || 'https://n8n.destresstoys.ru').replace(/\/$/, '');
const DEALS_TABLE_ID = 'tblLrNZmEHH4IHllZ';

if (!AIRTABLE_TOKEN || !N8N_API_KEY) {
  throw new Error('Set AIRTABLE_TOKEN and N8N_API_KEY environment variables before running this script.');
}

const auditDir = path.resolve('docs/automation-audit');

async function requestJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    throw new Error(`${options.method || 'GET'} ${url} failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data;
}

function airtableHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

function n8nHeaders() {
  return {
    'X-N8N-API-KEY': N8N_API_KEY,
    'Content-Type': 'application/json',
  };
}

async function getAirtableSchema() {
  return requestJson(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`, {
    headers: airtableHeaders(),
  });
}

async function addMissingFields() {
  const schema = await getAirtableSchema();
  const deals = schema.tables.find((table) => table.id === DEALS_TABLE_ID);
  const existing = new Set(deals.fields.map((field) => field.name));
  const fields = [
    {
      name: 'Продуктовый трек',
      type: 'singleSelect',
      options: {
        choices: [
          { name: '🧸 Плюш / мягкая игрушка' },
          { name: '🟠 PU foam / антистресс' },
          { name: '❓ Не определён' },
        ],
      },
    },
    { name: 'Материал / формат', type: 'singleLineText' },
    {
      name: 'Сложность изделия',
      type: 'singleSelect',
      options: { choices: [{ name: 'простая' }, { name: 'средняя' }, { name: 'сложная' }, { name: 'не определена' }] },
    },
    { name: 'Размер изделия см', type: 'singleLineText' },
    {
      name: 'Тип нанесения логотипа',
      type: 'singleSelect',
      options: {
        choices: [
          { name: 'вышивка' },
          { name: 'принт' },
          { name: 'бирка' },
          { name: 'surface print' },
          { name: 'без логотипа' },
          { name: 'не определено' },
        ],
      },
    },
    { name: 'Одежда / аксессуары', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
    {
      name: 'Статус образца',
      type: 'singleSelect',
      options: { choices: [{ name: 'не нужен' }, { name: 'нужен' }, { name: 'в работе' }, { name: 'одобрен' }, { name: 'правки' }] },
    },
    { name: 'Стоимость sample ₽', type: 'number', options: { precision: 2 } },
    { name: 'MOQ поставщика', type: 'number', options: { precision: 0 } },
    { name: 'Срок sample дней', type: 'number', options: { precision: 0 } },
    { name: 'Срок тиража дней', type: 'number', options: { precision: 0 } },
  ];

  const added = [];
  const failed = [];
  for (const field of fields.filter((item) => !existing.has(item.name))) {
    try {
      await requestJson(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables/${DEALS_TABLE_ID}/fields`, {
        method: 'POST',
        headers: airtableHeaders(),
        body: JSON.stringify(field),
      });
      added.push(field.name);
    } catch (error) {
      failed.push({ name: field.name, error: error.message });
    }
  }

  return { added, failed };
}

async function seedChoices() {
  const records = [
    {
      fields: {
        'Название сделки': '__schema_seed__ product choices',
        'Статус воронки': '🆕 Новая заявка',
        'Канал связи': 'max',
        'Продуктовый трек': '🧸 Плюш / мягкая игрушка',
        'Сложность изделия': 'не определена',
        'Тип нанесения логотипа': 'не определено',
        'Статус образца': 'не нужен',
      },
    },
    {
      fields: {
        'Название сделки': '__schema_seed__ pu choices',
        'Статус воронки': '🏭 RFQ: PU foam',
        'Канал связи': 'telegram',
        'Продуктовый трек': '🟠 PU foam / антистресс',
      },
    },
    {
      fields: {
        'Название сделки': '__schema_seed__ unknown choices',
        'Статус воронки': '🧵 RFQ: плюш/пошив',
        'Канал связи': 'manual',
        'Продуктовый трек': '❓ Не определён',
      },
    },
  ];

  const result = await requestJson(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DEALS_TABLE_ID}`, {
    method: 'POST',
    headers: airtableHeaders(),
    body: JSON.stringify({ records, typecast: true }),
  });

  for (const record of result.records) {
    await requestJson(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${DEALS_TABLE_ID}/${record.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
    });
  }

  return { seededRecordsDeleted: result.records.length };
}

function findNode(workflow, name) {
  const node = workflow.nodes.find((item) => item.name === name);
  if (!node) throw new Error(`Node not found in "${workflow.name}": ${name}`);
  return node;
}

async function getWorkflow(id) {
  return requestJson(`${N8N_BASE_URL}/api/v1/workflows/${id}`, {
    headers: n8nHeaders(),
  });
}

async function updateWorkflow(workflow) {
  const settings = {};
  for (const key of ['executionOrder', 'timezone']) {
    if (workflow.settings?.[key]) settings[key] = workflow.settings[key];
  }
  const payload = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings,
  };
  return requestJson(`${N8N_BASE_URL}/api/v1/workflows/${workflow.id}`, {
    method: 'PUT',
    headers: n8nHeaders(),
    body: JSON.stringify(payload),
  });
}

const conceptSystemPrompt = String.raw`Ты — промышленный дизайнер корпоративных бренд-игрушек и production engineer.

Теперь есть 2 продуктовых трека:
1. "🧸 Плюш / мягкая игрушка" — классическая мягкая игрушка с тканью, ворсом, набивкой, швами, вышивкой/принтом/биркой.
2. "🟠 PU foam / антистресс" — литое/формованное PU foam изделие с округлой цельной формой и surface print.

Цель: не красивая фантазийная картинка, а реалистичный, производимый корпоративный продукт.

Верни ТОЛЬКО валидный JSON с ключами A, B, C. У каждого варианта должны быть поля:
- name
- product_track: один из "🧸 Плюш / мягкая игрушка", "🟠 PU foam / антистресс"
- production_analysis
- shape
- material
- logo_application
- details
- manufacturability
- emotion
- image_prompt

Правила выбора трека:
- Если в заявке явно указаны плюш, мягкая игрушка, пошив, ткань, медведь, заяц, маскот из плюша — приоритет у "🧸 Плюш / мягкая игрушка".
- Если явно указаны PU, антистресс, пенополиуретан, foam, сжимается — приоритет у "🟠 PU foam / антистресс".
- Если формат неясен, предложи минимум 2 плюшевых варианта и 1 PU foam вариант.

Правила для плюша:
- Игрушка должна выглядеть как реальный factory sample: мягкий ворс/ткань, набивка, безопасные округлые формы.
- Допускаются видимые швы как часть пошива, но не как дефект.
- Логотип: вышивка, тканевая бирка, небольшой принт или патч.
- Не делай слишком тонкие детали, сложные мелкие элементы, невозможную одежду или хрупкие аксессуары.
- В image_prompt обязательно пиши: "realistic plush toy factory sample, soft fabric pile, visible sewn seams where natural, stuffed volume, embroidered or printed logo, neutral studio lighting".

Правила для PU foam:
- Цельная объёмная форма 6-10 см, округлые края, стабильная толщина.
- Матовая/сатиновая PU foam поверхность, microtexture.
- Логотип: surface print на крупной читаемой зоне.
- Обязательно добавить: "subtle but visible manufacturing seam / mold parting line along the body, realistic for molded PU foam, not a crack, not stitching, not a zipper".
- Без тонких деталей, острых элементов и глубоких поднутрений.`;

function patchLeadWorkflow(workflow) {
  findNode(workflow, 'Подготовить поля').parameters.jsCode = `const body = $input.first().json.body || $input.first().json;
const today = new Date();
const nextContact = new Date(Date.now() + 24 * 60 * 60 * 1000);
const quantityText = String(body.quantity || '').trim();
const estimatedQuantity = Number((quantityText.match(/\\d+/) || [])[0] || 0) || null;
const description = String(body.description || body.message || '').toLowerCase();
const explicitTrack = String(body.product_track || body.productType || body.product_type || '').toLowerCase();

function inferProductTrack() {
  const text = [description, explicitTrack].join(' ');
  if (/плюш|мягк|пошив|сшить|ткан|ворс|набив|холлофайбер|мишка|медвед|заяц|кролик/.test(text)) {
    return '🧸 Плюш / мягкая игрушка';
  }
  if (/pu|foam|антистресс|пенополиуретан|полиуретан|сжим/.test(text)) {
    return '🟠 PU foam / антистресс';
  }
  return '❓ Не определён';
}

const maxContact = body.max || body.max_contact || body.maxUsername || body.max_username || '';
const productTrack = inferProductTrack();

return [{
  json: {
    companyName: body.company || body.name || 'Не указано',
    email: body.email || '',
    phone: body.phone || '',
    telegram: body.telegram || '',
    max: maxContact,
    contactChannel: body.telegram ? 'telegram' : (maxContact ? 'max' : (body.email ? 'email' : (body.phone ? 'phone' : 'manual'))),
    productTrack,
    initialStatus: productTrack === '❓ Не определён' ? '🧭 Определить продуктовый трек' : '🎨 Концепты готовятся',
    orderDescription: body.description || body.message || '',
    quantityText,
    estimatedQuantity,
    utmSource: body.utm_source || '',
    utmMedium: body.utm_medium || '',
    utmCampaign: body.utm_campaign || '',
    fileReference: body.file_url || '',
    assetDelivery: body.asset_delivery || '',
    hasAssets: body.has_assets || false,
    referenceUrl: body.reference || '',
    submittedAt: today.toISOString(),
    dealDate: today.toISOString().split('T')[0],
    nextContactDate: nextContact.toISOString().split('T')[0],
  }
}];`;

  const create = findNode(workflow, 'Airtable: Создать сделку');
  create.parameters.columns.value = {
    ...create.parameters.columns.value,
    'Статус воронки': '={{ $json.initialStatus }}',
    'Тираж': '={{ $json.estimatedQuantity }}',
    'Клиент': '={{ [$json.clientRecordId] }}',
    'Канал связи': '={{ $json.contactChannel }}',
    'Продуктовый трек': '={{ $json.productTrack }}',
    'Дата последнего контакта': '={{ $json.dealDate }}',
    'Следующий контакт': '={{ $json.nextContactDate }}',
    'Количество follow-up': 0,
    'Последнее сообщение клиенту': 'Новая заявка получена, определён продуктовый трек или требуется уточнение',
  };
}

function patchConceptWorkflow(workflow) {
  findNode(workflow, 'Подготовить запрос GPT').parameters.jsCode = `const deal = $input.first().json;
const systemPrompt = ${JSON.stringify(conceptSystemPrompt)};
const productTrack = deal['Продуктовый трек'] || deal.productTrack || '❓ Не определён';

const requestBody = JSON.stringify({
  model: 'gpt-4.1',
  response_format: { type: 'json_object' },
  messages: [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content:
        'Продуктовый трек CRM: ' + productTrack +
        '\\nОписание заказа: ' + (deal.orderDesc || deal['Тип заказа'] || '') +
        '\\nРеференс: ' + (deal.referenceUrl || deal['Ссылка на референс'] || 'не предоставлен')
    }
  ],
  max_tokens: 2400
});

return [{ json: { ...deal, productTrack, requestBody } }];`;

  const save = findNode(workflow, 'Airtable: Сохранить концепты');
  save.parameters.columns.value = {
    ...save.parameters.columns.value,
    'Статус воронки': '⏳ Ожидает выбора концепта',
    'Дата последнего контакта': "={{ new Date().toISOString().split('T')[0] }}",
    'Следующий контакт': "={{ new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }}",
    'Количество follow-up': 0,
    'Последнее сообщение клиенту': 'Концепты подготовлены с учётом продуктового трека, ожидается выбор владельцем',
  };
}

function patchImageWorkflow(workflow) {
  findNode(workflow, 'Составить промпт').parameters.jsCode = `const parsed = $('Разобрать выбор').first().json;
const variant = parsed.variant;
const dealId = parsed.dealId;
const chatId = parsed.chatId;

const record = $input.first().json;
const fields = record.fields || record;
if ((fields['Превью 1'] || []).length || fields['Одобренный prompt']) {
  return [];
}
const conceptsRaw = fields['Концепты JSON'] || '{}';
const orderDesc = fields['Тип заказа'] || '';

let concepts = {};
try { concepts = JSON.parse(conceptsRaw); } catch(e) {}

const chosen = concepts[variant] || {};
const productTrack = chosen.product_track || fields['Продуктовый трек'] || '❓ Не определён';
const plushFallback = \`Realistic commercial product photo of a custom plush toy factory sample. Design based on: \${orderDesc}. Soft fabric pile, stuffed volume, rounded safe shape, visible sewn seams where natural, embroidered or printed logo, neutral studio lighting, hand or size reference, not CGI, not plastic.\`;
const puFallback = \`Realistic commercial product photo of a manufacturable custom polyurethane foam stress toy, handheld 6-10 cm. Design based on: \${orderDesc}. Unified solid 3D form, rounded edges, matte soft-touch PU foam with subtle microtexture. Simple surface print/logo on the largest readable area. Include a subtle but visible manufacturing seam / mold parting line along the body, realistic for molded PU foam, not a crack, not stitching, not a zipper. Neutral studio background, soft shadows, factory-made sample.\`;
let imagePrompt = chosen.image_prompt || (productTrack.includes('Плюш') ? plushFallback : puFallback);

if (productTrack.includes('Плюш') && !/plush|fabric|sewn seams/i.test(imagePrompt)) {
  imagePrompt += ' Realistic plush toy factory sample, soft fabric pile, visible sewn seams where natural, stuffed volume, embroidered or printed logo.';
}
if (productTrack.includes('PU') && !/manufacturing seam|mold parting line/i.test(imagePrompt)) {
  imagePrompt += ' Include a subtle but visible manufacturing seam / mold parting line along the body, realistic for molded PU foam, not a crack, not stitching, not a zipper.';
}
imagePrompt += ' The final image must look like a real factory-made product sample, not a fantasy object.';
const conceptName = chosen.name || \`Вариант \${variant}\`;

return [{ json: { dealId, variant, conceptName, productTrack, material: chosen.material || '', imagePrompt, chatId, orderDesc } }];`;

  const save = findNode(workflow, 'Airtable: Записать превью');
  save.parameters.columns.value = {
    ...save.parameters.columns.value,
    'Статус воронки': '🖼 Превью готово',
    'Продуктовый трек': "={{ $('Составить промпт').first().json.productTrack }}",
    'Материал / формат': "={{ $('Составить промпт').first().json.material }}",
    'Одобренный вариант': "={{ $('Составить промпт').first().json.variant }}",
    'Одобренный prompt': "={{ $('Составить промпт').first().json.imagePrompt }}",
    'Дата последнего контакта': "={{ new Date().toISOString().split('T')[0] }}",
    'Следующий контакт': "={{ new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }}",
    'Количество follow-up': 0,
    'Последнее сообщение клиенту': 'Превью готово, требуется отправка/согласование с клиентом',
  };
}

function patchApprovedWorkflow(workflow) {
  const update = workflow.nodes.find((item) =>
    item.name === 'Airtable: Статус → КП выставлен' || item.name === 'Airtable: Статус → RFQ поставщикам'
  );
  if (!update) throw new Error(`Approval status node not found in "${workflow.name}"`);
  update.name = 'Airtable: Статус → RFQ по продуктовому треку';
  delete update.parameters.id;
  update.parameters.columns.matchingColumns = ['id'];
  update.parameters.columns.value = {
    ...update.parameters.columns.value,
    id: '={{ $json.dealId }}',
    'Статус воронки': "={{ String($json.productTrack || '').includes('Плюш') ? '🧵 RFQ: плюш/пошив' : (String($json.productTrack || '').includes('PU') ? '🏭 RFQ: PU foam' : '🧭 Определить продуктовый трек') }}",
    'Дата RFQ': "={{ new Date().toISOString().split('T')[0] }}",
    'Дата последнего контакта': "={{ new Date().toISOString().split('T')[0] }}",
    'Следующий контакт': "={{ new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] }}",
    'Последнее сообщение клиенту': 'Дизайн одобрен, требуется RFQ по выбранному продуктовому треку',
  };

  const prepare = workflow.nodes.find((node) => node.name === 'Подготовить уведомление');
  if (prepare?.parameters?.jsCode) {
    prepare.parameters.jsCode = prepare.parameters.jsCode
      .replace(/const orderDesc = deal\['Тип заказа'\] \|\| '';/, "const orderDesc = deal['Тип заказа'] || '';\\nconst productTrack = deal['Продуктовый трек'] || '❓ Не определён';")
      .replace(/return \[\{ json: \{ dealId, client, orderDesc, quantity, preview \} \}\];/, "return [{ json: { dealId, client, orderDesc, quantity, preview, productTrack } }];");
  }
}

function patchReminderWorkflow(workflow) {
  const search = findNode(workflow, 'Airtable: Найти ждущие сделки');
  search.parameters.filterByFormula = "AND(OR({Статус воронки}='🖼 Превью готово',{Статус воронки}='⏳ Ожидает ответа',{Статус воронки}='⏳ Ожидает ответа по дизайну',{Статус воронки}='📋 КП выставлено',{Статус воронки}='⏳ Ожидает решения по КП',{Статус воронки}='🧪 Образец в работе'),OR({Следующий контакт}=BLANK(),IS_BEFORE({Следующий контакт},DATEADD(TODAY(),1,'day'))))";
}

async function patchWorkflows() {
  const patches = [
    ['ggNviZOTGvyrqcHV', patchLeadWorkflow],
    ['bAmHSgOgEq5QUoRY', patchConceptWorkflow],
    ['ucsAVekXkhHglEqx', patchImageWorkflow],
    ['mR66dXHgfhZDl6zn', patchApprovedWorkflow],
    ['XXVEEBKGjTeJIOmz', patchReminderWorkflow],
  ];
  const results = [];
  await fs.mkdir(auditDir, { recursive: true });
  for (const [id, patcher] of patches) {
    const workflow = await getWorkflow(id);
    await fs.writeFile(path.join(auditDir, `${id}-before-plush-pu-patch.json`), JSON.stringify(workflow, null, 2));
    patcher(workflow);
    await fs.writeFile(path.join(auditDir, `${id}-after-plush-pu-patch.json`), JSON.stringify(workflow, null, 2));
    const updated = await updateWorkflow(workflow);
    results.push({ id, name: workflow.name, updatedAt: updated.updatedAt || null });
  }
  return results;
}

const result = {
  timestamp: new Date().toISOString(),
  airtable: {
    fields: await addMissingFields(),
    choices: await seedChoices(),
  },
  n8n: {
    workflows: await patchWorkflows(),
  },
};

const schemaAfter = await getAirtableSchema();
await fs.writeFile(path.join(auditDir, 'airtable-schema-after-plush-pu-patch.json'), JSON.stringify(schemaAfter, null, 2));
await fs.writeFile(path.join(auditDir, 'plush-pu-automation-patch-result.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
