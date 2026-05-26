import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const logisticOptions = {
  cargo: {
    label: 'Карго',
    hint: '~$3.5/кг',
    pricePerKg: 3.5,
    localDeliveryRub: 50,
    brokerRub: 0,
    customsPct: 0,
    vatPct: 0,
  },
  white: {
    label: 'Белая',
    hint: 'НДС + брокер',
    pricePerKg: 2.2,
    localDeliveryRub: 80,
    brokerRub: 20000,
    customsPct: 0.05,
    vatPct: 0.2,
  },
}

const defaults = {
  exwUsd: 1.5,
  quantity: 200,
  weightGram: 80,
  packUsd: 0.2,
  moldUsd: 600,
  printSetupUsd: 120,
  chinaDeliveryUsd: 80,
  sampleUsd: 80,
  bankPct: 3,
  defectPct: 4,
  rateRub: 95,
  markup: 3,
  logistic: 'cargo',
}

function formatRub(value) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`
}

function formatUsd(value) {
  return `$${Number(value).toFixed(2)}`
}

function getNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function Field({ label, value, suffix, min, max, step, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm text-neutral-400">{label}</span>
        <span className="font-mono text-sm font-semibold text-lime-300">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(getNumber(event.target.value))}
        className="w-full accent-lime-300"
      />
    </label>
  )
}

function NumberInput({ label, value, suffix, step = 1, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-neutral-400">{label}</span>
      <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-950/70 px-3">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full bg-transparent font-mono text-sm text-white outline-none"
        />
        <span className="ml-3 shrink-0 text-xs text-neutral-500">{suffix}</span>
      </div>
    </label>
  )
}

function Metric({ label, value, sub, accent = false }) {
  return (
    <div className={`rounded-lg border p-4 ${accent ? 'border-lime-300/80 bg-lime-300/10' : 'border-neutral-800 bg-neutral-900'}`}>
      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-neutral-500">{label}</div>
      <div className={`mt-2 font-mono text-2xl font-semibold ${accent ? 'text-lime-300' : 'text-white'}`}>{value}</div>
      {sub ? <div className="mt-1 text-xs text-neutral-500">{sub}</div> : null}
    </div>
  )
}

export default function CostCalculatorPage() {
  const [searchParams] = useSearchParams()
  const dealId = searchParams.get('dealId') || ''
  const [values, setValues] = useState(defaults)
  const [moneyInputs, setMoneyInputs] = useState({
    moldUsd: String(defaults.moldUsd),
    printSetupUsd: String(defaults.printSetupUsd),
    chinaDeliveryUsd: String(defaults.chinaDeliveryUsd),
    sampleUsd: String(defaults.sampleUsd),
  })
  const [copied, setCopied] = useState('')

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setCopied('')
  }

  const updateMoneyInput = (key, value) => {
    const normalized = value.replace(',', '.')
    if (!/^\d*\.?\d*$/.test(normalized)) return

    setMoneyInputs((current) => ({ ...current, [key]: normalized }))
    update(key, normalized === '' ? 0 : getNumber(normalized))
  }

  const result = useMemo(() => {
    const logistic = logisticOptions[values.logistic]
    const quantity = Math.max(values.quantity, 1)
    const totalKg = (quantity * values.weightGram) / 1000
    const chargedKg = totalKg * 1.15

    const productionUsd = values.exwUsd + values.packUsd
    const oneTimeUsd = values.moldUsd + values.printSetupUsd + values.chinaDeliveryUsd + values.sampleUsd
    const oneTimePerUnitUsd = oneTimeUsd / quantity
    const logisticsUsd = (chargedKg * logistic.pricePerKg) / quantity
    const customsUsd = (productionUsd + oneTimePerUnitUsd) * logistic.customsPct
    const vatUsd = (productionUsd + oneTimePerUnitUsd + logisticsUsd + customsUsd) * logistic.vatPct
    const defectUsd = productionUsd * (values.defectPct / 100)
    const bankUsd = (productionUsd + oneTimePerUnitUsd + logisticsUsd + customsUsd + vatUsd + defectUsd) * (values.bankPct / 100)
    const brokerRubPerUnit = logistic.brokerRub / quantity
    const localRub = logistic.localDeliveryRub + brokerRubPerUnit

    const costUsd = productionUsd + oneTimePerUnitUsd + logisticsUsd + customsUsd + vatUsd + defectUsd + bankUsd
    const costRub = costUsd * values.rateRub + localRub
    const priceRub = costRub * values.markup
    const profitRub = priceRub - costRub
    const marginPct = priceRub > 0 ? (profitRub / priceRub) * 100 : 0

    const breakdown = [
      ['Производство EXW', values.exwUsd * values.rateRub],
      ['Упаковка', values.packUsd * values.rateRub],
      ['Форма / оснастка', (values.moldUsd / quantity) * values.rateRub],
      ['Печать / подготовка', (values.printSetupUsd / quantity) * values.rateRub],
      ['Доставка по Китаю', (values.chinaDeliveryUsd / quantity) * values.rateRub],
      ['Образец', (values.sampleUsd / quantity) * values.rateRub],
      ['Логистика до РФ', logisticsUsd * values.rateRub],
      ['Таможня', customsUsd * values.rateRub],
      ['НДС', vatUsd * values.rateRub],
      ['Брак / риск', defectUsd * values.rateRub],
      ['Банк / конвертация', bankUsd * values.rateRub],
      ['Доставка по РФ / брокер', localRub],
    ].filter(([, amount]) => amount > 0.01)

    return {
      chargedKg,
      costUsd,
      costRub,
      priceRub,
      profitRub,
      marginPct,
      totalCostRub: costRub * quantity,
      totalPriceRub: priceRub * quantity,
      totalProfitRub: profitRub * quantity,
      breakdown,
    }
  }, [values])

  const crmText = [
    dealId ? `Сделка: ${dealId}` : null,
    `Тираж: ${values.quantity} шт.`,
    `EXW: ${formatUsd(values.exwUsd)} / шт.`,
    `Вес: ${values.weightGram} г / шт. (${Math.round(result.chargedKg)} кг расчётный вес)`,
    `Логистика: ${logisticOptions[values.logistic].label}`,
    `Себестоимость: ${formatRub(result.costRub)} / шт.`,
    `Цена клиенту: ${formatRub(result.priceRub)} / шт.`,
    `Сумма КП: ${formatRub(result.totalPriceRub)}`,
    `Ожидаемая прибыль: ${formatRub(result.totalProfitRub)}`,
    `Маржа: ${Math.round(result.marginPct)}%`,
  ].filter(Boolean).join('\n')

  const clientText = [
    'Добрый день!',
    '',
    'Подготовили предварительный расчёт по вашей брендированной игрушке.',
    '',
    `Тираж: ${values.quantity} шт.`,
    `Ориентировочная стоимость: ${formatRub(result.priceRub)} / шт.`,
    `Итого за партию: ${formatRub(result.totalPriceRub)}.`,
    '',
    'В стоимость включены производство, базовая упаковка, логистика и подготовка партии к передаче.',
    'Финальная цена может уточняться после утверждения макета, материала, способа нанесения и точных параметров поставщика.',
    '',
    'Если такой порядок цены подходит, следующим шагом зафиксируем детали: форму, размер, цвет, нанесение логотипа, упаковку и сроки производства.',
  ].join('\n')

  const copyText = async (type, text) => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
  }

  const marginColor = result.marginPct >= 50 ? 'bg-emerald-400' : result.marginPct >= 35 ? 'bg-lime-300' : result.marginPct >= 25 ? 'bg-amber-400' : 'bg-red-400'
  const maxBreakdown = Math.max(...result.breakdown.map(([, amount]) => amount), 1)

  return (
    <main className="min-h-screen bg-[#0f0f0f] px-4 py-8 text-white md:px-6 md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-lime-300">DeStressToys / internal tools</div>
            <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Калькулятор себестоимости</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">
              Расчёт после ответа поставщика: производство, форма, печать, логистика, риски, наценка и итоговая цена для клиента.
            </p>
            {dealId ? <p className="mt-3 font-mono text-xs text-neutral-500">dealId: {dealId}</p> : null}
          </div>
          <Link to="/" className="inline-flex min-h-10 items-center justify-center rounded-md border border-neutral-800 px-4 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white">
            На сайт
          </Link>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Партия и производство</div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="EXW цена" value={values.exwUsd} suffix=" $/шт" min={0.3} max={8} step={0.1} onChange={(value) => update('exwUsd', value)} />
              <Field label="Тираж" value={values.quantity} suffix=" шт" min={50} max={5000} step={50} onChange={(value) => update('quantity', value)} />
              <Field label="Вес 1 шт" value={values.weightGram} suffix=" г" min={20} max={500} step={10} onChange={(value) => update('weightGram', value)} />
              <Field label="Упаковка" value={values.packUsd} suffix=" $/шт" min={0} max={2} step={0.05} onChange={(value) => update('packUsd', value)} />
              <NumberInput label="Форма / оснастка" value={moneyInputs.moldUsd} suffix="$" onChange={(value) => updateMoneyInput('moldUsd', value)} />
              <NumberInput label="Печать / подготовка" value={moneyInputs.printSetupUsd} suffix="$" onChange={(value) => updateMoneyInput('printSetupUsd', value)} />
              <NumberInput label="Доставка по Китаю" value={moneyInputs.chinaDeliveryUsd} suffix="$" onChange={(value) => updateMoneyInput('chinaDeliveryUsd', value)} />
              <NumberInput label="Образец / sample" value={moneyInputs.sampleUsd} suffix="$" onChange={(value) => updateMoneyInput('sampleUsd', value)} />
            </div>
          </div>

          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Логистика и продажа</div>
            <div className="mb-5 grid grid-cols-2 gap-2">
              {Object.entries(logisticOptions).map(([key, option]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update('logistic', key)}
                  className={`rounded-md border px-3 py-3 text-left transition-colors ${values.logistic === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                >
                  <span className="block text-sm font-medium">{option.label}</span>
                  <span className="mt-1 block font-mono text-xs opacity-70">{option.hint}</span>
                </button>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Курс USD" value={values.rateRub} suffix=" ₽" min={80} max={130} step={1} onChange={(value) => update('rateRub', value)} />
              <Field label="Наценка" value={values.markup} suffix="×" min={1.3} max={6} step={0.1} onChange={(value) => update('markup', value)} />
              <Field label="Брак / риски" value={values.defectPct} suffix="%" min={0} max={15} step={1} onChange={(value) => update('defectPct', value)} />
              <Field label="Банк / конвертация" value={values.bankPct} suffix="%" min={0} max={8} step={0.5} onChange={(value) => update('bankPct', value)} />
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Себестоимость / шт" value={formatRub(result.costRub)} sub={`${formatUsd(result.costUsd)} / шт`} />
          <Metric label="Цена клиенту / шт" value={formatRub(result.priceRub)} sub={`наценка ×${values.markup.toFixed(1)}`} accent />
          <Metric label="Сумма КП" value={formatRub(result.totalPriceRub)} sub={`${values.quantity} шт.`} />
          <Metric label="Прибыль партии" value={formatRub(result.totalProfitRub)} sub={`${Math.round(result.marginPct)}% маржа`} />
        </section>

        <section className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm text-neutral-400">Чистая маржа</span>
            <span className="font-mono text-sm font-semibold text-white">{Math.round(result.marginPct)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-neutral-800">
            <div className={`h-full rounded-full ${marginColor}`} style={{ width: `${Math.min(result.marginPct, 100)}%` }} />
          </div>
          {result.marginPct < 30 ? (
            <p className="mt-3 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">
              Маржа ниже 30%. Лучше пересмотреть EXW, наценку, тираж или схему логистики.
            </p>
          ) : null}
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <div className="border-b border-neutral-800 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Структура себестоимости / шт</div>
            <div>
              {result.breakdown.map(([label, amount]) => (
                <div key={label} className="grid grid-cols-[minmax(0,1fr)_120px_92px] items-center gap-3 border-b border-neutral-800 px-5 py-3 last:border-b-0 max-[560px]:grid-cols-[minmax(0,1fr)_82px]">
                  <span className="min-w-0 text-sm text-neutral-300">{label}</span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-neutral-800 max-[560px]:hidden">
                    <span className="block h-full rounded-full bg-lime-300/70" style={{ width: `${Math.round((amount / maxBreakdown) * 100)}%` }} />
                  </span>
                  <span className="text-right font-mono text-sm text-white">{formatRub(amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Текст для CRM</div>
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-neutral-950 p-4 font-mono text-xs leading-5 text-neutral-300">{crmText}</pre>
              <button
                type="button"
                onClick={() => copyText('crm', crmText)}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-neutral-700 px-5 text-sm font-semibold text-white transition-colors hover:border-neutral-500 hover:bg-neutral-800"
              >
                {copied === 'crm' ? 'CRM-текст скопирован' : 'Скопировать для CRM'}
              </button>
              <p className="mt-3 text-xs leading-5 text-neutral-500">
                Внутренний текст содержит себестоимость, прибыль и маржу. Клиенту его отправлять не нужно.
              </p>
            </div>

            <div className="rounded-lg border border-lime-300/60 bg-lime-300/10 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-lime-300">Текст для клиента</div>
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-neutral-950 p-4 text-sm leading-6 text-neutral-200">{clientText}</pre>
              <button
                type="button"
                onClick={() => copyText('client', clientText)}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-lime-300 px-5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-lime-200"
              >
                {copied === 'client' ? 'Клиентский текст скопирован' : 'Скопировать для клиента'}
              </button>
              <p className="mt-3 text-xs leading-5 text-neutral-500">
                Этот текст не раскрывает маржу и внутреннюю себестоимость.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
