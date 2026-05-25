const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_BASE_URL = (process.env.N8N_BASE_URL || 'https://n8n.destresstoys.ru').replace(/\/$/, '');
const CALCULATOR_ACCESS_TOKEN = process.env.CALCULATOR_ACCESS_TOKEN;
const CALCULATOR_BASE_URL = process.env.CALCULATOR_BASE_URL || 'https://destresstoys.ru/tools/cost-calculator';

if (!N8N_API_KEY || !CALCULATOR_ACCESS_TOKEN) {
  throw new Error('Set N8N_API_KEY and CALCULATOR_ACCESS_TOKEN environment variables.');
}

function n8nHeaders() {
  return {
    'X-N8N-API-KEY': N8N_API_KEY,
    'Content-Type': 'application/json',
  };
}

async function requestJson(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${url} failed ${res.status}: ${JSON.stringify(data)}`);
  return data;
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

  return requestJson(`${N8N_BASE_URL}/api/v1/workflows/${workflow.id}`, {
    method: 'PUT',
    headers: n8nHeaders(),
    body: JSON.stringify({
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings,
    }),
  });
}

function findNode(workflow, name) {
  const node = workflow.nodes.find((item) => item.name === name);
  if (!node) throw new Error(`Node not found in "${workflow.name}": ${name}`);
  return node;
}

function calculatorUrlExpression(dealExpression, html = false) {
  const separator = html ? '&amp;' : '&';
  return `${CALCULATOR_BASE_URL}?dealId=${dealExpression}${separator}access=${encodeURIComponent(CALCULATOR_ACCESS_TOKEN)}`;
}

function patchPreviewReady(workflow) {
  const node = findNode(workflow, 'Telegram: Превью готово');
  const url = calculatorUrlExpression("{{ $('Составить промпт').first().json.dealId }}", true);
  node.parameters.additionalFields.caption =
    `=🖼 <b>Превью готово!</b>\n\n<b>Вариант {{ $('Составить промпт').first().json.variant }} — {{ $('Составить промпт').first().json.conceptName }}</b>\n\n<b>Заказ:</b> {{ $('Составить промпт').first().json.orderDesc }}\n\n<a href="https://airtable.com/appNUVkunRDc2WjS9">Открыть сделку</a>\n<a href="${url}">Открыть калькулятор</a>`;
}

function patchDesignApproved(workflow) {
  const node = findNode(workflow, 'Telegram: Найти поставщика');
  const url = calculatorUrlExpression("{{ $('Подготовить уведомление').first().json.dealId }}");
  node.parameters.text =
    `=✅ *Дизайн одобрен — нужен поставщик*\n\n*Сделка:* {{ $('Подготовить уведомление').first().json.dealId }}\n*Клиент:* {{ $('Подготовить уведомление').first().json.client }}\n*Заказ:* {{ $('Подготовить уведомление').first().json.orderDesc }}\n*Тираж:* {{ $('Подготовить уведомление').first().json.quantity }} шт.\n{{ $('Подготовить уведомление').first().json.preview ? '\\n🖼 Превью: ' + $('Подготовить уведомление').first().json.preview : '' }}\n\n🔍 Найти поставщика на Alibaba / 1688 и добавить в CRM.\n\n🧮 Калькулятор себестоимости:\n${url}`;
}

const patches = [
  ['ucsAVekXkhHglEqx', patchPreviewReady],
  ['mR66dXHgfhZDl6zn', patchDesignApproved],
];

const result = [];
for (const [id, patcher] of patches) {
  const workflow = await getWorkflow(id);
  patcher(workflow);
  const updated = await updateWorkflow(workflow);
  result.push({ id, name: workflow.name, updatedAt: updated.updatedAt });
}

console.log(JSON.stringify({ result }, null, 2));
