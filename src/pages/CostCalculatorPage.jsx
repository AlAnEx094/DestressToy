import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const logisticOptions = {
  cargo: {
    label: 'Карго',
    hint: 'ставка по плотности',
    localDeliveryRub: 0,
  },
  air: {
    label: 'Авиакарго',
    hint: '$50/кг · 5–6 дней',
    localDeliveryRub: 0,
  },
  white: {
    label: 'Белая',
    hint: 'таможня + пошлина + НДС',
  },
}

const currencyOptions = {
  usd: { label: 'USD', symbol: '$', rateLabel: 'Курс USD', perUnit: '$/шт' },
  cny: { label: 'CNY', symbol: '¥', rateLabel: 'Курс CNY', perUnit: '¥/шт' },
}

const materialPresets = {
  pu: {
    supplierCurrency: 'cny',
    exwUsd: 17,
    weightGram: 80,
    packUsd: 1.3,
    moldUsd: 5000,
    printSetupUsd: 0,
    chinaDeliveryRateCny: 3,
    sampleUsd: 500,
    sampleAirDeliveryUsd: 40,
    cargoRateUsd: 3.1,
    cargoPackUsd: 8,
    dimL: 12, dimW: 10, dimH: 10,
    markup: 2,
    cnyRateRub: 12,
    rateRub: 90,
  },
  plush: {
    supplierCurrency: 'usd',
    exwUsd: 3.5,
    weightGram: 80,
    packUsd: 0.3,
    moldUsd: 0,
    printSetupUsd: 0,
    chinaDeliveryRateCny: 3,
    sampleUsd: 80,
    sampleAirDeliveryUsd: 40,
    cargoRateUsd: 5.5,
    cargoPackUsd: 5,
    dimL: 17, dimW: 14, dimH: 12,
    markup: 2.5,
    cnyRateRub: 12,
    rateRub: 90,
  },
}

const deliveryZones = {
  msk:     { label: 'Москва',          rate: 80,  base: 300 },
  spb:     { label: 'Питер',           rate: 40,  base: 500 },
  ural:    { label: 'Урал / Поволжье', rate: 55,  base: 500 },
  siberia: { label: 'Сибирь',          rate: 70,  base: 500 },
  dv:      { label: 'Дальний Восток',  rate: 110, base: 600 },
}


const defaults = {
  supplierCurrency: 'cny',
  exwUsd: 17,
  quantity: 500,
  weightGram: 80,
  packUsd: 1.3,
  moldUsd: 5000,
  printSetupUsd: 0,
  chinaDeliveryRateCny: 3,
  sampleUsd: 500,
  sampleAirDeliveryUsd: 40,
  cargoRateUsd: 3.1,
  cargoPackUsd: 8,
  dimL: 12, dimW: 10, dimH: 10,
  bankPct: 3,
  defectPct: 4,
  rateRub: 90,
  cnyRateRub: 12,
  markup: 2,
  logistic: 'cargo',
  localDeliveryRub: 0,
}

const whiteDefaults = {
  freightRateUsd: 3.0,
  freightRateType: 'kg',
  currencyCommissionPct: 2,
  customsDutyPct: 0,
  brokerRub: 25000,
  svhRub: 7000,
  rfDeliveryWhiteRub: 15000,
  certRub: 0,
  certVolumeQty: 1000,
  taxMode: 'usn',
}

const ruDefaults = {
  priceRub: 500,
  packRub: 50,
  moldRub: 0,
  printSetupRub: 0,
  sampleRub: 0,
  sampleDeliveryRub: 0,
}

function formatRub(value) {
  return `${Math.round(value).toLocaleString('ru-RU')} ₽`
}

function formatCurrency(value, currency) {
  if (currency === 'rub') return formatRub(value)
  const option = currencyOptions[currency] || currencyOptions.usd
  return `${option.symbol}${Number(value).toFixed(2)}`
}

function getNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function Field({ label, value, suffix, min, max, step, onChange }) {
  const numericValue = getNumber(value)
  const sliderValue = Math.min(Math.max(numericValue, min), max)
  const [inputValue, setInputValue] = useState(String(value))

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const handleInputChange = (event) => {
    const nextValue = event.target.value
    const normalizedValue = nextValue.replace(',', '.')
    setInputValue(nextValue)
    if (nextValue === '') return
    if (!/^\d*\.?\d*$/.test(normalizedValue)) return
    if (normalizedValue === '.' || normalizedValue.endsWith('.')) return
    onChange(getNumber(normalizedValue))
  }

  const handleInputBlur = () => {
    const normalizedValue = inputValue.replace(',', '.')
    if (normalizedValue === '' || normalizedValue === '.' || normalizedValue.endsWith('.')) {
      setInputValue(String(value))
    }
  }

  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm text-neutral-400">{label}</span>
        <span className="flex min-w-0 items-center rounded-md border border-neutral-800 bg-neutral-950/70 px-2">
          <input
            type="number"
            min={min}
            step={step}
            value={inputValue}
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            className="min-h-8 w-24 bg-transparent text-right font-mono text-sm font-semibold text-lime-300 outline-none"
          />
          <span className="ml-2 shrink-0 text-xs text-neutral-500">{suffix}</span>
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={sliderValue}
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

function TextInput({ label, value, placeholder = '', onChange, hasError = false, errorText = '' }) {
  return (
    <label className="block">
      <span className={`mb-2 block text-sm ${hasError ? 'text-red-400' : 'text-neutral-400'}`}>{label}{hasError ? ' *' : ''}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`min-h-11 w-full rounded-md border bg-neutral-950/70 px-3 text-sm text-white outline-none placeholder:text-neutral-700 ${hasError ? 'border-red-500 focus:border-red-400' : 'border-neutral-800'}`}
      />
      {hasError && errorText ? <span className="mt-1 block text-xs text-red-400">{errorText}</span> : null}
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

const CALC_TOKEN = 'dt26calc'

function formatDateTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

// Pure calculation for one quantity (China suppliers)
// sampleUsd is intentionally excluded — paid separately, does not affect unit price
function computeForQuantity(qty, values, whiteParams) {
  const currency = currencyOptions[values.supplierCurrency] ? values.supplierCurrency : 'usd'
  const supplierRateRub = currency === 'cny' ? values.cnyRateRub : values.rateRub
  const quantity = Math.max(qty, 1)
  const totalKg = (quantity * values.weightGram) / 1000

  const productionForeign = values.exwUsd + values.packUsd
  const oneTimeForeign = values.moldUsd + values.printSetupUsd
  const oneTimePerUnitForeign = oneTimeForeign / quantity
  // China domestic delivery: ¥/kg × total weight, always in CNY → RUB
  const chinaDeliveryPerUnitRub = (values.weightGram / 1000) * values.chinaDeliveryRateCny * values.cnyRateRub
  const cargoLogisticsUsd = (totalKg * values.cargoRateUsd) / quantity
  const cargoPackRub = (values.cargoPackUsd / quantity) * values.rateRub
  const productionRub = productionForeign * supplierRateRub
  const oneTimePerUnitRub = oneTimePerUnitForeign * supplierRateRub
  const cargoLogisticsRub = cargoLogisticsUsd * values.rateRub
  const cargoDefectRub = productionRub * (values.defectPct / 100)
  const cargoBankRub = (productionRub + oneTimePerUnitRub + cargoLogisticsRub + cargoPackRub + cargoDefectRub) * (values.bankPct / 100)
  const cargoLocalRub = values.localDeliveryRub
  const cargoCostRub = productionRub + oneTimePerUnitRub + chinaDeliveryPerUnitRub + cargoLogisticsRub + cargoPackRub + cargoDefectRub + cargoBankRub + cargoLocalRub
  const cargoPriceRub = cargoCostRub * values.markup
  const cargoProfitRub = cargoPriceRub - cargoCostRub
  const cargoMarginPct = cargoPriceRub > 0 ? (cargoProfitRub / cargoPriceRub) * 100 : 0

  const cargoBreakdown = [
    ['Производство EXW', values.exwUsd * supplierRateRub],
    ['Упаковка', values.packUsd * supplierRateRub],
    ['Форма / оснастка', (values.moldUsd / quantity) * supplierRateRub],
    ['Печать / подготовка', (values.printSetupUsd / quantity) * supplierRateRub],
    ['Доставка по Китаю', chinaDeliveryPerUnitRub],
    ['Логистика до РФ', cargoLogisticsRub],
    ['Упаковка карго', cargoPackRub],
    ['Брак / риск', cargoDefectRub],
    ['Банк / конвертация', cargoBankRub],
    ['Доставка по РФ / брокер', cargoLocalRub],
  ].filter(([, amount]) => amount > 0.01)

  let freightTotalRub
  if (whiteParams.freightRateType === 'kg') {
    freightTotalRub = totalKg * whiteParams.freightRateUsd * values.rateRub
  } else {
    const volM3 = quantity * (values.dimL * values.dimW * values.dimH) / 1_000_000
    freightTotalRub = volM3 * whiteParams.freightRateUsd * values.rateRub
  }
  const whiteFreightPerUnit = freightTotalRub / quantity
  const tsTotalRub = (values.exwUsd + values.packUsd) * quantity * supplierRateRub + freightTotalRub
  const tsPerUnit = tsTotalRub / quantity
  const dutyPerUnit = tsPerUnit * (whiteParams.customsDutyPct / 100)
  const vatPerUnit = (tsPerUnit + dutyPerUnit) * 0.20
  const currCommPerUnit = productionRub * (whiteParams.currencyCommissionPct / 100)
  const whiteDefectPerUnit = productionRub * (values.defectPct / 100)
  const whiteFix = whiteParams.brokerRub + whiteParams.svhRub + whiteParams.rfDeliveryWhiteRub
  const fixedPerUnit = whiteFix / quantity
  const certPerUnit = whiteParams.certVolumeQty > 0 ? whiteParams.certRub / whiteParams.certVolumeQty : 0
  const vatInCost = whiteParams.taxMode === 'usn' ? vatPerUnit : 0
  const whiteCostRub = productionRub + oneTimePerUnitRub + chinaDeliveryPerUnitRub + whiteFreightPerUnit
    + dutyPerUnit + vatInCost + currCommPerUnit + whiteDefectPerUnit + fixedPerUnit + certPerUnit
  const whitePriceRub = whiteCostRub * values.markup
  const whiteProfitRub = whitePriceRub - whiteCostRub
  const whiteMarginPct = whitePriceRub > 0 ? (whiteProfitRub / whitePriceRub) * 100 : 0

  const whiteBreakdown = [
    ['Производство EXW', values.exwUsd * supplierRateRub],
    ['Упаковка', values.packUsd * supplierRateRub],
    ['Форма / оснастка', (values.moldUsd / quantity) * supplierRateRub],
    ['Печать / подготовка', (values.printSetupUsd / quantity) * supplierRateRub],
    ['Доставка по Китаю', chinaDeliveryPerUnitRub],
    ['Фрахт до границы', whiteFreightPerUnit],
    ['Пошлина', dutyPerUnit],
    ...(whiteParams.taxMode === 'usn' ? [['НДС (УСН — в себестоимости)', vatPerUnit]] : []),
    ['Валютная комиссия', currCommPerUnit],
    ['Брак / риск', whiteDefectPerUnit],
    ['Брокер + СВХ + доставка РФ', fixedPerUnit],
    ['Сертификация / шт', certPerUnit],
  ].filter(([, amount]) => amount > 0.01)

  const cargoVarPerUnit = chinaDeliveryPerUnitRub + cargoLogisticsRub + cargoPackRub + cargoDefectRub + cargoBankRub
  const whiteVarPerUnit = chinaDeliveryPerUnitRub + whiteFreightPerUnit + dutyPerUnit + vatInCost + currCommPerUnit + whiteDefectPerUnit
  const beDenom = cargoVarPerUnit - whiteVarPerUnit - certPerUnit
  const breakEvenQty = beDenom > 1 ? Math.ceil(whiteFix / beDenom) : null

  // Air cargo: $50/kg, minimum 1 kg, no cargo packaging
  const airChargedKg = Math.max(totalKg, 1)
  const airLogisticsRub = (airChargedKg / quantity) * 50 * values.rateRub
  const airDefectRub = productionRub * (values.defectPct / 100)
  const airBankRub = (productionRub + oneTimePerUnitRub + airLogisticsRub + airDefectRub) * (values.bankPct / 100)
  const airLocalRub = values.localDeliveryRub
  const airCostRub = productionRub + oneTimePerUnitRub + chinaDeliveryPerUnitRub + airLogisticsRub + airDefectRub + airBankRub + airLocalRub
  const airPriceRub = airCostRub * values.markup
  const airProfitRub = airPriceRub - airCostRub
  const airMarginPct = airPriceRub > 0 ? (airProfitRub / airPriceRub) * 100 : 0
  const airBreakdown = [
    ['Производство EXW', values.exwUsd * supplierRateRub],
    ['Упаковка', values.packUsd * supplierRateRub],
    ['Форма / оснастка', (values.moldUsd / quantity) * supplierRateRub],
    ['Печать / подготовка', (values.printSetupUsd / quantity) * supplierRateRub],
    ['Доставка по Китаю', chinaDeliveryPerUnitRub],
    ['Авиакарго ($50/кг)', airLogisticsRub],
    ['Брак / риск', airDefectRub],
    ['Банк / конвертация', airBankRub],
    ['Доставка по РФ / брокер', airLocalRub],
  ].filter(([, amount]) => amount > 0.01)

  const isWhite = values.logistic === 'white'
  const isAir = values.logistic === 'air'

  return {
    quantity,
    chargedKg: totalKg,
    currency,
    supplierRateRub,
    supplierCostForeign: productionForeign + oneTimePerUnitForeign,
    logisticsUsd: isWhite ? whiteFreightPerUnit / values.rateRub : isAir ? (airChargedKg / quantity) * 50 : cargoLogisticsUsd,
    costRub: isWhite ? whiteCostRub : isAir ? airCostRub : cargoCostRub,
    priceRub: isWhite ? whitePriceRub : isAir ? airPriceRub : cargoPriceRub,
    profitRub: isWhite ? whiteProfitRub : isAir ? airProfitRub : cargoProfitRub,
    marginPct: isWhite ? whiteMarginPct : isAir ? airMarginPct : cargoMarginPct,
    totalCostRub: (isWhite ? whiteCostRub : isAir ? airCostRub : cargoCostRub) * quantity,
    totalPriceRub: (isWhite ? whitePriceRub : isAir ? airPriceRub : cargoPriceRub) * quantity,
    totalProfitRub: (isWhite ? whiteProfitRub : isAir ? airProfitRub : cargoProfitRub) * quantity,
    breakdown: isWhite ? whiteBreakdown : isAir ? airBreakdown : cargoBreakdown,
    white: {
      tsTotalRub, tsPerUnit, dutyPerUnit, vatPerUnit, vatInCost,
      fixedPerUnit, certPerUnit, freightPerUnit: whiteFreightPerUnit,
      currCommPerUnit, defectPerUnit: whiteDefectPerUnit,
      whiteCostRub, whitePriceRub, breakEvenQty,
      isOsno: whiteParams.taxMode === 'osno',
    },
    cargo: {
      cargoCostRub, cargoPriceRub, productionRub, oneTimePerUnitRub,
      cargoLogisticsRub, cargoPackRub, cargoDefectRub, cargoBankRub, cargoLocalRub, cargoBreakdown,
    },
    air: isAir ? { airCostRub, airPriceRub, airLogisticsRub, airChargedKg, airBreakdown } : null,
  }
}

// Pure calculation for one quantity (Russian suppliers — all in RUB, no international logistics)
function computeRussian(qty, values, ruParams) {
  const quantity = Math.max(qty, 1)
  const productionRub = getNumber(ruParams.priceRub)
  const packRub = getNumber(ruParams.packRub)
  const oneTimePerUnitRub = (getNumber(ruParams.moldRub) + getNumber(ruParams.printSetupRub)) / quantity
  const defectRub = (productionRub + packRub) * (values.defectPct / 100)
  const costRub = productionRub + packRub + oneTimePerUnitRub + defectRub
  const priceRub = costRub * values.markup
  const profitRub = priceRub - costRub
  const marginPct = priceRub > 0 ? (profitRub / priceRub) * 100 : 0
  const breakdown = [
    ['Производство', productionRub],
    ['Упаковка', packRub],
    ['Форма / оснастка', getNumber(ruParams.moldRub) / quantity],
    ['Печать / подготовка', getNumber(ruParams.printSetupRub) / quantity],
    ['Брак / риск', defectRub],
  ].filter(([, amount]) => amount > 0.01)
  return {
    quantity,
    chargedKg: (quantity * values.weightGram) / 1000,
    currency: 'rub',
    supplierCostForeign: null,
    supplierRateRub: 1,
    costRub,
    priceRub,
    profitRub,
    marginPct,
    totalCostRub: costRub * quantity,
    totalPriceRub: priceRub * quantity,
    totalProfitRub: profitRub * quantity,
    breakdown,
    white: null,
    cargo: null,
  }
}

export default function CostCalculatorPage() {
  const [searchParams] = useSearchParams()
  const dealId = searchParams.get('dealId') || ''
  const accessToken = searchParams.get('access') || searchParams.get('token') || searchParams.get('t') || CALC_TOKEN
  const hasCalculatorAccess = searchParams.get('t') === CALC_TOKEN || Boolean(searchParams.get('access') || searchParams.get('token'))

  if (!hasCalculatorAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Страница недоступна</p>
          <Link to="/" className="mt-4 inline-block text-orange-500 text-sm underline">На главную</Link>
        </div>
      </div>
    )
  }

  const [material, setMaterial] = useState('pu')
  const [values, setValues] = useState(defaults)
  const [whiteParams, setWhiteParams] = useState(whiteDefaults)
  const [moneyInputs, setMoneyInputs] = useState({
    moldUsd: String(defaults.moldUsd),
    printSetupUsd: String(defaults.printSetupUsd),
    sampleUsd: String(defaults.sampleUsd),
    sampleAirDeliveryUsd: String(defaults.sampleAirDeliveryUsd),
    cargoPackUsd: String(defaults.cargoPackUsd),
  })
  const [whiteMoneyInputs, setWhiteMoneyInputs] = useState({
    brokerRub: String(whiteDefaults.brokerRub),
    svhRub: String(whiteDefaults.svhRub),
    rfDeliveryWhiteRub: String(whiteDefaults.rfDeliveryWhiteRub),
    certRub: String(whiteDefaults.certRub),
    certVolumeQty: String(whiteDefaults.certVolumeQty),
  })
  const [deliveryZone, setDeliveryZone] = useState('spb')
  const [copied, setCopied] = useState('')
  const [supplier, setSupplier] = useState({
    name: '',
    url: '',
    variantName: '',
    leadTimeDays: '',
    comment: '',
  })
  const [savedCalculations, setSavedCalculations] = useState([])
  const [saveStatus, setSaveStatus] = useState('')
  const [saveError, setSaveError] = useState('')
  const [loadingSaved, setLoadingSaved] = useState(false)
  const [clientName, setClientName] = useState('')
  const [saveAttempted, setSaveAttempted] = useState(false)
  const autoLoadedDealRef = useRef(null)

  // New state
  const [supplierOrigin, setSupplierOrigin] = useState('china') // 'china' | 'russia'
  const [kpQuantitiesInput, setKpQuantitiesInput] = useState('')
  const [deliveryDays, setDeliveryDays] = useState(37)
  const [ruParams, setRuParams] = useState(ruDefaults)
  const [ruMoneyInputs, setRuMoneyInputs] = useState({
    priceRub: '500', packRub: '50', moldRub: '0', printSetupRub: '0', sampleRub: '0', sampleDeliveryRub: '0',
  })

  const [buyer, setBuyer] = useState({ name: '', inn: '', kpp: '', address: '' })
  const [documents, setDocuments] = useState([])
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [documentError, setDocumentError] = useState('')
  const [generatingDocType, setGeneratingDocType] = useState('')
  const [lastDocument, setLastDocument] = useState(null)
  const [documentCopied, setDocumentCopied] = useState(false)

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setCopied('')
  }

  const updateSupplierCurrency = (currency) => {
    setValues((current) => ({ ...current, supplierCurrency: currency }))
    setCopied('')
  }

  const updateWhite = (key, val) => {
    setWhiteParams((prev) => ({ ...prev, [key]: val }))
    setCopied('')
  }

  const updateWhiteMoney = (key, value) => {
    const normalized = value.replace(',', '.')
    if (!/^\d*\.?\d*$/.test(normalized)) return
    setWhiteMoneyInputs((current) => ({ ...current, [key]: normalized }))
    updateWhite(key, normalized === '' ? 0 : getNumber(normalized))
  }

  const handleMaterialChange = (mat) => {
    const preset = materialPresets[mat]
    setMaterial(mat)
    setValues((current) => ({ ...current, ...preset }))
    setMoneyInputs({
      moldUsd: String(preset.moldUsd),
      printSetupUsd: String(preset.printSetupUsd),
      sampleUsd: String(preset.sampleUsd),
      sampleAirDeliveryUsd: String(preset.sampleAirDeliveryUsd),
      cargoPackUsd: String(preset.cargoPackUsd),
    })
    setCopied('')
  }

  const updateMoneyInput = (key, value) => {
    const normalized = value.replace(',', '.')
    if (!/^\d*\.?\d*$/.test(normalized)) return
    setMoneyInputs((current) => ({ ...current, [key]: normalized }))
    update(key, normalized === '' ? 0 : getNumber(normalized))
  }

  const updateRu = (key, value) => {
    const normalized = String(value).replace(',', '.')
    if (!/^\d*\.?\d*$/.test(normalized)) return
    setRuMoneyInputs((c) => ({ ...c, [key]: normalized }))
    setRuParams((c) => ({ ...c, [key]: normalized === '' ? 0 : getNumber(normalized) }))
    setCopied('')
  }

  const updateLogistic = (logisticKey) => {
    setValues((current) => ({
      ...current,
      logistic: logisticKey,
      ...(logisticKey === 'cargo' ? { localDeliveryRub: 0 } : {}),
    }))
    if (logisticKey === 'air') setDeliveryDays(6)
    else if (logisticKey === 'cargo') setDeliveryDays(37)
    setCopied('')
  }

  // Parse comma-separated extra quantities; primary quantity is always first
  const kpQuantities = useMemo(() => {
    const primary = Math.max(getNumber(values.quantity, 500), 1)
    const extras = kpQuantitiesInput
      .split(/[,;]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => Number.isFinite(n) && n > 0 && n < 1_000_000)
    return [...new Set([primary, ...extras])].sort((a, b) => a - b)
  }, [kpQuantitiesInput, values.quantity])

  const result = useMemo(() => {
    if (supplierOrigin === 'russia') return computeRussian(values.quantity, values, ruParams)
    return computeForQuantity(values.quantity, values, whiteParams)
  }, [values, whiteParams, supplierOrigin, ruParams])

  const kpResults = useMemo(() => {
    if (supplierOrigin === 'russia') {
      return kpQuantities.map((qty) => computeRussian(qty, values, ruParams))
    }
    return kpQuantities.map((qty) => computeForQuantity(qty, values, whiteParams))
  }, [kpQuantities, values, whiteParams, supplierOrigin, ruParams])

  const deliveryResult = useMemo(() => {
    const zone = deliveryZones[deliveryZone]
    const quantity = Math.max(values.quantity, 1)
    const physicalKg = (quantity * values.weightGram) / 1000
    const volKg = quantity * (values.dimL * values.dimW * values.dimH) / 5000
    const chargedKg = Math.max(physicalKg, volKg)
    const totalRub = chargedKg * zone.rate + zone.base
    const perUnitRub = totalRub / quantity
    return { physicalKg, volKg, chargedKg, totalRub, perUnitRub, isVolBased: volKg > physicalKg }
  }, [values.quantity, values.weightGram, values.dimL, values.dimW, values.dimH, deliveryZone])

  const materialLabel = material === 'pu' ? 'PU маскот' : 'Плюш 15 см'

  const isWhite = supplierOrigin === 'china' && values.logistic === 'white'

  // Timing line for texts
  const prodDays = parseInt(supplier.leadTimeDays, 10)
  const delDays = getNumber(deliveryDays)
  const timingLine = (() => {
    const parts = []
    if (prodDays > 0) parts.push(`${prodDays} дн. производство`)
    if (supplierOrigin === 'china' && delDays > 0) parts.push(`${delDays} дн. доставка`)
    if (parts.length === 0) return null
    const total = parts.length === 2 ? ` = ~${prodDays + delDays} дн. с оплаты` : ''
    return `Срок: ${parts.join(' + ')}${total}.`
  })()

  // Sample price for client: (factory cost + air delivery) × markup, all in RUB
  const sampleClientPriceRub = (() => {
    if (supplierOrigin === 'china' && values.sampleUsd > 0) {
      const factoryCostRub = values.sampleUsd * result.supplierRateRub
      const airRub = getNumber(values.sampleAirDeliveryUsd) * values.rateRub
      return (factoryCostRub + airRub) * values.markup
    }
    if (supplierOrigin === 'russia' && ruParams.sampleRub > 0) {
      return (ruParams.sampleRub + getNumber(ruParams.sampleDeliveryRub)) * values.markup
    }
    return 0
  })()

  const sampleLine = (() => {
    if (supplierOrigin === 'china' && values.sampleUsd > 0) {
      return `Тестовый образец: ${formatRub(sampleClientPriceRub)} — оплачивается отдельно до запуска производства.`
    }
    if (supplierOrigin === 'russia' && ruParams.sampleRub > 0) {
      return `Тестовый образец: ${formatRub(sampleClientPriceRub)} — оплачивается отдельно до запуска производства.`
    }
    return null
  })()

  const crmText = [
    dealId ? `Сделка: ${dealId}` : null,
    `Тип изделия: ${supplierOrigin === 'russia' ? 'Российский производитель' : materialLabel}`,
    `Тираж: ${values.quantity} шт.`,
    supplierOrigin === 'china' ? `Валюта поставщика: ${currencyOptions[result.currency]?.label || result.currency}` : null,
    supplierOrigin === 'china' ? `EXW: ${formatCurrency(values.exwUsd, result.currency)} / шт.` : `Цена производства: ${formatRub(ruParams.priceRub)} / шт.`,
    supplierOrigin === 'china' ? `Курс поставщика: ${result.supplierRateRub} ₽` : null,
    supplierOrigin === 'china' && result.currency === 'cny' ? `Курс USD для логистики: ${values.rateRub} ₽` : null,
    `Вес: ${values.weightGram} г / шт. (${Math.round(result.chargedKg)} кг партия)`,
    supplierOrigin === 'china' ? `Логистика: ${logisticOptions[values.logistic].label}` : 'Логистика: Россия',
    isWhite ? `Таможенная стоимость: ${formatRub(result.white.tsPerUnit)} / шт. (${formatRub(result.white.tsTotalRub)} партия)` : null,
    isWhite ? `Пошлина: ${formatRub(result.white.dutyPerUnit)} / шт. (${whiteParams.customsDutyPct}%)` : null,
    isWhite ? `НДС: ${formatRub(result.white.vatPerUnit)} / шт. (${whiteParams.taxMode === 'osno' ? 'ОСНО — к вычету' : 'УСН — в себестоимости'})` : null,
    isWhite ? `Фикс. затраты / шт (брокер+СВХ+РФ): ${formatRub(result.white.fixedPerUnit)}` : null,
    supplierOrigin === 'china' && values.sampleUsd > 0 ? `Образец: ${formatCurrency(values.sampleUsd, result.currency)} (оплачивается отдельно, не в цене партии)` : null,
    supplierOrigin === 'russia' && ruParams.sampleRub > 0 ? `Образец: ${formatRub(ruParams.sampleRub)} (оплачивается отдельно, не в цене партии)` : null,
    timingLine,
    `Себестоимость: ${formatRub(result.costRub)} / шт.`,
    `Цена клиенту: ${formatRub(result.priceRub)} / шт.`,
    `Сумма КП: ${formatRub(result.totalPriceRub)}`,
    `Ожидаемая прибыль: ${formatRub(result.totalProfitRub)}`,
    `Маржа: ${Math.round(result.marginPct)}%`,
  ].filter(Boolean).join('\n')

  const clientText = (() => {
    const lines = [
      'Добрый день!',
      '',
      'Подготовили предварительный расчёт по вашей брендированной игрушке.',
      '',
    ]
    if (kpQuantities.length > 1) {
      lines.push('Тиражи и стоимость:')
      kpResults.forEach((r) => {
        lines.push(`  ${r.quantity.toLocaleString('ru-RU')} шт — ${formatRub(r.priceRub)}/шт — итого ${formatRub(r.totalPriceRub)}`)
      })
    } else {
      lines.push(`Тираж: ${values.quantity} шт.`)
      lines.push(`Ориентировочная стоимость: ${formatRub(result.priceRub)} / шт.`)
      lines.push(`Итого за партию: ${formatRub(result.totalPriceRub)}.`)
    }
    if (timingLine) {
      lines.push('')
      lines.push(timingLine)
    }
    if (sampleLine) {
      lines.push('')
      lines.push(sampleLine)
    }
    lines.push(
      '',
      'В стоимость включены производство, базовая упаковка, логистика и подготовка партии к передаче.',
      'Финальная цена может уточняться после утверждения макета, материала, способа нанесения и точных параметров поставщика.',
      '',
      'Если такой порядок цены подходит, следующим шагом зафиксируем детали: форму, размер, цвет, нанесение логотипа, упаковку и сроки производства.',
    )
    return lines.join('\n')
  })()

  const updateSupplier = (key, value) => {
    setSupplier((current) => ({ ...current, [key]: value }))
    setSaveStatus('')
    setSaveError('')
  }

  // Restore the editor (values / whiteParams / ruParams / supplier fields) from a saved record
  // so opening the calculator link from a CRM note shows that supplier's numbers, not defaults.
  const applySavedRecord = (record) => {
    const inputs = record?.inputs
    if (!inputs || typeof inputs !== 'object') return

    const nextOrigin = inputs.supplierOrigin || 'china'
    setSupplierOrigin(nextOrigin)
    if (inputs.material) setMaterial(inputs.material)

    if (inputs.values && typeof inputs.values === 'object') {
      const nextValues = { ...defaults, ...inputs.values }
      setValues(nextValues)
      setMoneyInputs({
        moldUsd: String(nextValues.moldUsd ?? defaults.moldUsd),
        printSetupUsd: String(nextValues.printSetupUsd ?? defaults.printSetupUsd),
        sampleUsd: String(nextValues.sampleUsd ?? defaults.sampleUsd),
        sampleAirDeliveryUsd: String(nextValues.sampleAirDeliveryUsd ?? defaults.sampleAirDeliveryUsd),
        cargoPackUsd: String(nextValues.cargoPackUsd ?? defaults.cargoPackUsd),
      })
    }

    if (inputs.whiteParams && typeof inputs.whiteParams === 'object') {
      const nextWhite = { ...whiteDefaults, ...inputs.whiteParams }
      setWhiteParams(nextWhite)
      setWhiteMoneyInputs({
        brokerRub: String(nextWhite.brokerRub ?? whiteDefaults.brokerRub),
        svhRub: String(nextWhite.svhRub ?? whiteDefaults.svhRub),
        rfDeliveryWhiteRub: String(nextWhite.rfDeliveryWhiteRub ?? whiteDefaults.rfDeliveryWhiteRub),
        certRub: String(nextWhite.certRub ?? whiteDefaults.certRub),
        certVolumeQty: String(nextWhite.certVolumeQty ?? whiteDefaults.certVolumeQty),
      })
    }

    if (inputs.ruParams && typeof inputs.ruParams === 'object') {
      const nextRu = { ...ruDefaults, ...inputs.ruParams }
      setRuParams(nextRu)
      setRuMoneyInputs({
        priceRub: String(nextRu.priceRub ?? ruDefaults.priceRub),
        packRub: String(nextRu.packRub ?? ruDefaults.packRub),
        moldRub: String(nextRu.moldRub ?? ruDefaults.moldRub),
        printSetupRub: String(nextRu.printSetupRub ?? ruDefaults.printSetupRub),
        sampleRub: String(nextRu.sampleRub ?? ruDefaults.sampleRub),
        sampleDeliveryRub: String(nextRu.sampleDeliveryRub ?? ruDefaults.sampleDeliveryRub),
      })
    }

    if (inputs.supplier && typeof inputs.supplier === 'object') {
      setSupplier((current) => ({ ...current, ...inputs.supplier }))
    }

    if (Number(inputs.deliveryDays) > 0) {
      setDeliveryDays(Number(inputs.deliveryDays))
    }

    setCopied('')
  }

  const loadSavedCalculations = async () => {
    if (!dealId) return
    setLoadingSaved(true)
    setSaveError('')
    try {
      const response = await fetch(`/api/cost-calculations?dealId=${encodeURIComponent(dealId)}`, {
        headers: { 'x-calculator-access': accessToken },
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось загрузить расчёты')
      const records = data.records || []
      setSavedCalculations(records)
      if (autoLoadedDealRef.current !== dealId) {
        autoLoadedDealRef.current = dealId
        const selected = records.find((r) => r.status === 'выбран')
        if (selected) applySavedRecord(selected)
      }
    } catch (error) {
      setSaveError(error.message || 'Не удалось загрузить расчёты')
    } finally {
      setLoadingSaved(false)
    }
  }

  const loadDocuments = async () => {
    if (!dealId) return
    setLoadingDocuments(true)
    setDocumentError('')
    try {
      const response = await fetch(`/api/documents?dealId=${encodeURIComponent(dealId)}`, {
        headers: { 'x-calculator-access': accessToken },
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось загрузить документы')
      setDocuments(data.records || [])
    } catch (error) {
      setDocumentError(error.message || 'Не удалось загрузить документы')
    } finally {
      setLoadingDocuments(false)
    }
  }

  const generateDocument = async (type) => {
    if (!dealId) return
    setGeneratingDocType(type)
    setDocumentError('')
    setDocumentCopied(false)
    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-calculator-access': accessToken },
        body: JSON.stringify({ dealId, type, buyer }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || `Не удалось сформировать ${type}`)
      setLastDocument(data)
      await loadDocuments()
    } catch (error) {
      setDocumentError(error.message || `Не удалось сформировать ${type}`)
    } finally {
      setGeneratingDocType('')
    }
  }

  useEffect(() => {
    loadSavedCalculations()
    loadDocuments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealId, accessToken])

  const buildCalculationPayload = () => ({
    dealId,
    clientName,
    supplier,
    supplierOrigin,
    deliveryDays,
    material,
    materialLabel: supplierOrigin === 'russia' ? 'Российский производитель' : materialLabel,
    values,
    whiteParams,
    ruParams,
    crmText,
    clientText,
    result: {
      currency: result.currency,
      supplierRateRub: result.supplierRateRub,
      supplierCostForeign: result.supplierCostForeign,
      costRub: result.costRub,
      priceRub: result.priceRub,
      profitRub: result.profitRub,
      marginPct: result.marginPct,
      totalCostRub: result.totalCostRub,
      totalPriceRub: result.totalPriceRub,
      totalProfitRub: result.totalProfitRub,
      breakdown: result.breakdown,
      cargo: result.cargo,
      white: result.white,
    },
  })

  const saveCalculation = async () => {
    setSaveAttempted(true)
    const errors = []
    if (!dealId && !clientName.trim()) errors.push('Укажи имя клиента (или открой калькулятор из сделки с dealId в ссылке).')
    if (!supplier.name.trim()) errors.push('Укажи поставщика.')
    if (errors.length > 0) { setSaveError(errors.join(' ')); return }
    setSaveStatus('saving')
    setSaveError('')
    try {
      const response = await fetch('/api/cost-calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-calculator-access': accessToken },
        body: JSON.stringify(buildCalculationPayload()),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось сохранить расчёт')
      setSavedCalculations((current) => [data.record, ...current])
      setSaveStatus('saved')
    } catch (error) {
      setSaveStatus('')
      setSaveError(error.message || 'Не удалось сохранить расчёт')
    }
  }

  const selectCalculation = async (record) => {
    setSaveStatus(`selecting:${record.id}`)
    setSaveError('')
    try {
      const response = await fetch('/api/cost-calculations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-calculator-access': accessToken },
        body: JSON.stringify({ recordId: record.id, dealId }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось выбрать расчёт')
      setSavedCalculations((current) => current.map((item) => (
        item.id === data.record.id ? data.record : item.status === 'выбран' ? { ...item, status: 'черновик' } : item
      )))
      applySavedRecord(data.record)
      setSaveStatus('selected')
    } catch (error) {
      setSaveStatus('')
      setSaveError(error.message || 'Не удалось выбрать расчёт')
    }
  }

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

        {/* Supplier context */}
        <section className="mb-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Поставщик и вариант</div>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Эти поля сохраняются вместе со слепком формулы, чтобы по одной сделке сравнивать несколько предложений.
              </p>
            </div>
            <button
              type="button"
              onClick={saveCalculation}
              disabled={saveStatus === 'saving'}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-lime-300 px-5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-lime-200 disabled:cursor-wait disabled:opacity-60"
            >
              {saveStatus === 'saving' ? 'Сохраняю...' : saveStatus === 'saved' ? 'Расчёт сохранён' : 'Сохранить расчёт'}
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Поставщик" value={supplier.name} placeholder="Alibaba factory / Иван, Гуанчжоу" onChange={(value) => updateSupplier('name', value)} hasError={saveAttempted && !supplier.name.trim()} errorText="Обязательное поле" />
            <TextInput label="Название варианта" value={supplier.variantName} placeholder="PU пакман, вариант 1" onChange={(value) => updateSupplier('variantName', value)} />
            <TextInput label="Ссылка поставщика" value={supplier.url} placeholder="https://..." onChange={(value) => updateSupplier('url', value)} />
            <TextInput label="Срок производства, дней" value={supplier.leadTimeDays} placeholder="25" onChange={(value) => updateSupplier('leadTimeDays', value.replace(/[^\d]/g, ''))} />
            {supplierOrigin === 'china' ? (
              <div>
                <label className="block">
                  <span className="mb-2 block text-sm text-neutral-400">Срок доставки из Китая, дней</span>
                  <div className="flex items-center rounded-md border border-neutral-800 bg-neutral-950/70 px-3">
                    <input
                      type="number"
                      value={deliveryDays}
                      min={1}
                      max={120}
                      onChange={(e) => setDeliveryDays(getNumber(e.target.value, 37))}
                      className="min-h-11 w-full bg-transparent font-mono text-sm text-white outline-none"
                    />
                    <span className="ml-3 shrink-0 text-xs text-neutral-500">дн.</span>
                  </div>
                </label>
              </div>
            ) : null}
            <div className={supplierOrigin === 'china' ? '' : 'md:col-span-2'}>
              <TextInput label="Комментарий" value={supplier.comment} placeholder="MOQ, sample, ограничения по цветам, важные условия" onChange={(value) => updateSupplier('comment', value)} />
            </div>
          </div>
          {!dealId ? (
            <div className="mt-4">
              <TextInput
                label="Клиент (имя или @username — найдём в amoCRM)"
                value={clientName}
                placeholder="Lika Khakimova / @molgord"
                onChange={(v) => { setClientName(v); setSaveStatus(''); setSaveError(''); setSaveAttempted(false) }}
                hasError={saveAttempted && !clientName.trim()}
                errorText="Обязательное поле"
              />
            </div>
          ) : null}
          {saveError ? (
            <p className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{saveError}</p>
          ) : null}
        </section>

        {/* Происхождение + Тип изделия */}
        <section className="mb-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Производитель</div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {[
              { key: 'china', label: 'Китай', hint: 'карго / белая схема' },
              { key: 'russia', label: 'Россия', hint: 'всё в рублях' },
            ].map(({ key, label, hint }) => (
              <button
                key={key}
                type="button"
                onClick={() => { setSupplierOrigin(key); setCopied('') }}
                className={`rounded-md border px-4 py-3 text-left transition-colors ${supplierOrigin === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
              >
                <span className="block text-sm font-medium">{label}</span>
                <span className="mt-1 block font-mono text-xs opacity-70">{hint}</span>
              </button>
            ))}
          </div>

          {supplierOrigin === 'china' ? (
            <>
              <div className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Тип изделия</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'pu', label: 'PU Маскот', hint: 'резина, форма, ~80г' },
                  { key: 'plush', label: 'Плюш', hint: 'мягкая игрушка, ~80г' },
                ].map(({ key, label, hint }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleMaterialChange(key)}
                    className={`rounded-md border px-4 py-3 text-left transition-colors ${material === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                  >
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="mt-1 block font-mono text-xs opacity-70">{hint}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </section>

        {/* Партия + Логистика */}
        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          {/* Партия и производство */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Партия и производство</div>

            {supplierOrigin === 'china' ? (
              <>
                <div className="mb-5 grid grid-cols-2 gap-2">
                  {Object.entries(currencyOptions).map(([key, option]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateSupplierCurrency(key)}
                      className={`rounded-md border px-3 py-3 text-left transition-colors ${values.supplierCurrency === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                    >
                      <span className="block text-sm font-medium">{option.label}</span>
                      <span className="mt-1 block font-mono text-xs opacity-70">валюта поставщика</span>
                    </button>
                  ))}
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="EXW цена" value={values.exwUsd} suffix={` ${currencyOptions[values.supplierCurrency].perUnit}`} min={0} max={values.supplierCurrency === 'cny' ? 100 : 10} step={0.01} onChange={(value) => update('exwUsd', value)} />
                  <Field label="Тираж" value={values.quantity} suffix=" шт" min={50} max={30000} step={50} onChange={(value) => update('quantity', value)} />
                  <Field label="Вес 1 шт" value={values.weightGram} suffix=" г" min={0.1} max={600} step={0.1} onChange={(value) => update('weightGram', value)} />
                  <Field label="Упаковка" value={values.packUsd} suffix={` ${currencyOptions[values.supplierCurrency].perUnit}`} min={0} max={values.supplierCurrency === 'cny' ? 20 : 2} step={0.05} onChange={(value) => update('packUsd', value)} />
                  <NumberInput label="Форма / оснастка" value={moneyInputs.moldUsd} suffix={currencyOptions[values.supplierCurrency].symbol} onChange={(value) => updateMoneyInput('moldUsd', value)} />
                  <NumberInput label="Печать / подготовка" value={moneyInputs.printSetupUsd} suffix={currencyOptions[values.supplierCurrency].symbol} onChange={(value) => updateMoneyInput('printSetupUsd', value)} />
                  <Field label="Доставка по Китаю" value={values.chinaDeliveryRateCny} suffix=" ¥/кг" min={0} max={15} step={0.5} onChange={(value) => update('chinaDeliveryRateCny', value)} />
                  <div>
                    <NumberInput label="Образец / sample" value={moneyInputs.sampleUsd} suffix={currencyOptions[values.supplierCurrency].symbol} onChange={(value) => updateMoneyInput('sampleUsd', value)} />
                    <p className="mt-1 text-xs text-neutral-600">Не в цене партии</p>
                  </div>
                  <div>
                    <NumberInput label="Авиадоставка образца" value={moneyInputs.sampleAirDeliveryUsd} suffix="$" onChange={(value) => updateMoneyInput('sampleAirDeliveryUsd', value)} />
                    <p className="mt-1 text-xs text-neutral-600">DHL / SF Express до клиента</p>
                  </div>
                  {values.logistic === 'cargo' ? (
                    <NumberInput label="Упаковка карго" value={moneyInputs.cargoPackUsd} suffix="$" onChange={(value) => updateMoneyInput('cargoPackUsd', value)} />
                  ) : null}
                </div>
              </>
            ) : (
              /* Russia mode */
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <NumberInput label="Цена производства" value={ruMoneyInputs.priceRub} suffix="₽/шт" onChange={(v) => updateRu('priceRub', v)} />
                </div>
                <NumberInput label="Упаковка" value={ruMoneyInputs.packRub} suffix="₽/шт" onChange={(v) => updateRu('packRub', v)} />
                <NumberInput label="Форма / оснастка" value={ruMoneyInputs.moldRub} suffix="₽" onChange={(v) => updateRu('moldRub', v)} />
                <NumberInput label="Печать / подготовка" value={ruMoneyInputs.printSetupRub} suffix="₽" onChange={(v) => updateRu('printSetupRub', v)} />
                <div>
                  <NumberInput label="Образец" value={ruMoneyInputs.sampleRub} suffix="₽" onChange={(v) => updateRu('sampleRub', v)} />
                  <p className="mt-1 text-xs text-neutral-600">Не в цене партии</p>
                </div>
                <div>
                  <NumberInput label="Доставка образца" value={ruMoneyInputs.sampleDeliveryRub} suffix="₽" onChange={(v) => updateRu('sampleDeliveryRub', v)} />
                  <p className="mt-1 text-xs text-neutral-600">Курьер до клиента</p>
                </div>
                <Field label="Тираж" value={values.quantity} suffix=" шт" min={50} max={30000} step={50} onChange={(value) => update('quantity', value)} />
                <Field label="Вес 1 шт" value={values.weightGram} suffix=" г" min={0.1} max={600} step={0.1} onChange={(value) => update('weightGram', value)} />
              </div>
            )}

            {/* KP quantities — always shown */}
            <div className="mt-5 border-t border-neutral-800 pt-5">
              <label className="block">
                <span className="mb-2 block text-sm text-neutral-400">Тиражи для КП <span className="text-neutral-600">(через запятую, включая основной)</span></span>
                <input
                  type="text"
                  value={kpQuantitiesInput}
                  placeholder="100, 300, 500"
                  onChange={(e) => { setKpQuantitiesInput(e.target.value); setCopied('') }}
                  className="min-h-11 w-full rounded-md border border-neutral-800 bg-neutral-950/70 px-3 font-mono text-sm text-white outline-none placeholder:text-neutral-700"
                />
              </label>
              {kpQuantities.length > 1 ? (
                <p className="mt-1 text-xs text-neutral-600">
                  Считаю: {kpQuantities.map((q) => `${q} шт`).join(', ')}
                </p>
              ) : null}
            </div>
          </div>

          {/* Логистика и продажа */}
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">
              {supplierOrigin === 'russia' ? 'Наценка и риски' : 'Логистика и продажа'}
            </div>

            {supplierOrigin === 'china' ? (
              <>
                <div className="mb-5 grid grid-cols-3 gap-2">
                  {Object.entries(logisticOptions).map(([key, option]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateLogistic(key)}
                      className={`rounded-md border px-3 py-3 text-left transition-colors ${values.logistic === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                    >
                      <span className="block text-sm font-medium">{option.label}</span>
                      <span className="mt-1 block font-mono text-xs opacity-70">{option.hint}</span>
                    </button>
                  ))}
                </div>

                {values.logistic === 'cargo' ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Ставка карго" value={values.cargoRateUsd} suffix=" $/кг" min={1} max={10} step={0.1} onChange={(value) => update('cargoRateUsd', value)} />
                    <Field label="Курс USD" value={values.rateRub} suffix=" ₽" min={45} max={130} step={1} onChange={(value) => update('rateRub', value)} />
                    {values.supplierCurrency === 'cny' ? (
                      <Field label="Курс CNY" value={values.cnyRateRub} suffix=" ₽" min={5} max={25} step={0.1} onChange={(value) => update('cnyRateRub', value)} />
                    ) : null}
                    <Field label="Наценка" value={values.markup} suffix="×" min={1.3} max={6} step={0.1} onChange={(value) => update('markup', value)} />
                    <Field label="Брак / риски" value={values.defectPct} suffix="%" min={0} max={15} step={1} onChange={(value) => update('defectPct', value)} />
                    <Field label="Банк / конвертация" value={values.bankPct} suffix="%" min={0} max={8} step={0.5} onChange={(value) => update('bankPct', value)} />
                    <Field label="Доставка по РФ / брокер" value={values.localDeliveryRub} suffix=" ₽/шт" min={0} max={200} step={1} onChange={(value) => update('localDeliveryRub', value)} />
                  </div>
                ) : values.logistic === 'air' ? (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2 rounded-md border border-sky-400/30 bg-sky-400/10 px-4 py-3">
                      <p className="text-sm text-sky-300">Ставка: <strong>$50/кг</strong> · мин. 1 кг · срок 5–6 дней</p>
                      <p className="mt-1 text-xs text-sky-400/70">Фиксированный тариф. Логистика считается от max(вес партии, 1 кг).</p>
                    </div>
                    <Field label="Курс USD" value={values.rateRub} suffix=" ₽" min={45} max={130} step={1} onChange={(value) => update('rateRub', value)} />
                    {values.supplierCurrency === 'cny' ? (
                      <Field label="Курс CNY" value={values.cnyRateRub} suffix=" ₽" min={5} max={25} step={0.1} onChange={(value) => update('cnyRateRub', value)} />
                    ) : null}
                    <Field label="Наценка" value={values.markup} suffix="×" min={1.3} max={6} step={0.1} onChange={(value) => update('markup', value)} />
                    <Field label="Брак / риски" value={values.defectPct} suffix="%" min={0} max={15} step={1} onChange={(value) => update('defectPct', value)} />
                    <Field label="Банк / конвертация" value={values.bankPct} suffix="%" min={0} max={8} step={0.5} onChange={(value) => update('bankPct', value)} />
                    <Field label="Доставка по РФ / брокер" value={values.localDeliveryRub} suffix=" ₽/шт" min={0} max={200} step={1} onChange={(value) => update('localDeliveryRub', value)} />
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <div className="mb-2 text-sm text-neutral-400">Тип ставки фрахта</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[['kg', '$/кг (авиа/жд)'], ['m3', '$/м³ (морской)']].map(([k, l]) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => updateWhite('freightRateType', k)}
                            className={`rounded-md border px-3 py-2 text-sm transition-colors ${whiteParams.freightRateType === k ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Field label="Ставка фрахта до границы" value={whiteParams.freightRateUsd} suffix={whiteParams.freightRateType === 'kg' ? ' $/кг' : ' $/м³'} min={0} max={whiteParams.freightRateType === 'kg' ? 20 : 1000} step={whiteParams.freightRateType === 'kg' ? 0.1 : 10} onChange={(v) => updateWhite('freightRateUsd', v)} />
                    <Field label="Курс USD" value={values.rateRub} suffix=" ₽" min={45} max={130} step={1} onChange={(value) => update('rateRub', value)} />
                    {values.supplierCurrency === 'cny' ? (
                      <Field label="Курс CNY" value={values.cnyRateRub} suffix=" ₽" min={5} max={25} step={0.1} onChange={(value) => update('cnyRateRub', value)} />
                    ) : null}
                    <Field label="Валютная комиссия" value={whiteParams.currencyCommissionPct} suffix=" %" min={0} max={10} step={0.1} onChange={(v) => updateWhite('currencyCommissionPct', v)} />
                    <Field label="Ставка пошлины" value={whiteParams.customsDutyPct} suffix=" %" min={0} max={30} step={0.5} onChange={(v) => updateWhite('customsDutyPct', v)} />
                    <div className="sm:col-span-2">
                      <div className="mb-2 text-sm text-neutral-400">Режим налогообложения</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[['usn', 'УСН (НДС в с/с)'], ['osno', 'ОСНО (НДС к вычету)']].map(([k, l]) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => updateWhite('taxMode', k)}
                            className={`rounded-md border px-3 py-2 text-sm transition-colors ${whiteParams.taxMode === k ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
                          >
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Field label="Наценка" value={values.markup} suffix="×" min={1.3} max={6} step={0.1} onChange={(value) => update('markup', value)} />
                    <Field label="Брак / риски" value={values.defectPct} suffix="%" min={0} max={15} step={1} onChange={(value) => update('defectPct', value)} />
                    <NumberInput label="Брокер" value={whiteMoneyInputs.brokerRub} suffix="₽" onChange={(v) => updateWhiteMoney('brokerRub', v)} />
                    <NumberInput label="СВХ" value={whiteMoneyInputs.svhRub} suffix="₽" onChange={(v) => updateWhiteMoney('svhRub', v)} />
                    <div className="sm:col-span-2">
                      <NumberInput label="Доставка по РФ (фиксир.)" value={whiteMoneyInputs.rfDeliveryWhiteRub} suffix="₽" onChange={(v) => updateWhiteMoney('rfDeliveryWhiteRub', v)} />
                    </div>
                    <div className="sm:col-span-2">
                      <NumberInput label="Сертификация" value={whiteMoneyInputs.certRub} suffix="₽" onChange={(v) => updateWhiteMoney('certRub', v)} />
                    </div>
                    {whiteParams.certRub > 0 ? (
                      <div className="sm:col-span-2">
                        <NumberInput label="Объём серии для амортизации серт." value={whiteMoneyInputs.certVolumeQty} suffix="шт" step={100} onChange={(v) => updateWhiteMoney('certVolumeQty', v)} />
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            ) : (
              /* Russia — simplified */
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Наценка" value={values.markup} suffix="×" min={1.3} max={6} step={0.1} onChange={(value) => update('markup', value)} />
                <Field label="Брак / риски" value={values.defectPct} suffix="%" min={0} max={15} step={1} onChange={(value) => update('defectPct', value)} />
              </div>
            )}
          </div>
        </section>

        {/* White intermediate values */}
        {isWhite && result.white ? (
          <section className="mt-4 rounded-lg border border-neutral-700 bg-neutral-900 p-5">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Таможенная стоимость и платежи</div>
            <div className="grid gap-0 divide-y divide-neutral-800">
              {[
                ['ТС (таможенная стоимость) — всего', formatRub(result.white.tsTotalRub), 'за всю партию'],
                ['ТС / шт', formatRub(result.white.tsPerUnit), 'база для пошлины и НДС'],
                ['Пошлина / шт', formatRub(result.white.dutyPerUnit), `${whiteParams.customsDutyPct}% от ТС`],
                ['Фрахт до границы / шт', formatRub(result.white.freightPerUnit), `${whiteParams.freightRateType === 'kg' ? whiteParams.freightRateUsd + ' $/кг' : whiteParams.freightRateUsd + ' $/м³'}`],
                ['Валютная комиссия / шт', formatRub(result.white.currCommPerUnit), `${whiteParams.currencyCommissionPct}% от оплаты поставщику`],
                ['Фикс. затраты / шт', formatRub(result.white.fixedPerUnit), `${formatRub(whiteParams.brokerRub + whiteParams.svhRub + whiteParams.rfDeliveryWhiteRub)} ÷ ${values.quantity} шт`],
                result.white.certPerUnit > 0.01 ? ['Сертификация / шт', formatRub(result.white.certPerUnit), `${formatRub(whiteParams.certRub)} ÷ ${whiteParams.certVolumeQty} шт серии`] : null,
              ].filter(Boolean).map(([label, val, hint]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-2.5">
                  <div>
                    <span className="text-sm text-neutral-300">{label}</span>
                    {hint ? <span className="ml-2 text-xs text-neutral-600">{hint}</span> : null}
                  </div>
                  <span className="font-mono text-sm font-semibold text-white">{val}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 py-2.5">
                <div>
                  <span className={`text-sm ${result.white.isOsno ? 'text-amber-300' : 'text-neutral-300'}`}>НДС при ввозе / шт</span>
                  <span className="ml-2 text-xs text-neutral-600">
                    {result.white.isOsno ? 'ОСНО — к вычету, не в себестоимости' : 'УСН — включён в себестоимость'}
                  </span>
                </div>
                <span className={`font-mono text-sm font-semibold ${result.white.isOsno ? 'text-amber-300' : 'text-white'}`}>
                  {formatRub(result.white.vatPerUnit)}
                </span>
              </div>
            </div>
          </section>
        ) : null}

        {/* Metrics */}
        <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            label="Себестоимость / шт"
            value={formatRub(result.costRub)}
            sub={result.supplierCostForeign ? `${formatCurrency(result.supplierCostForeign, result.currency)} поставщик / шт` : `тираж ${values.quantity} шт`}
          />
          <Metric label="Цена клиенту / шт" value={formatRub(result.priceRub)} sub={`наценка ×${values.markup.toFixed(1)}`} accent />
          <Metric label="Сумма КП" value={formatRub(result.totalPriceRub)} sub={`${values.quantity} шт.`} />
          <Metric label="Прибыль партии" value={formatRub(result.totalProfitRub)} sub={`${Math.round(result.marginPct)}% маржа`} />
        </section>

        {/* Sample note */}
        {sampleClientPriceRub > 0 ? (
          <div className="mt-3 rounded-md border border-neutral-700 bg-neutral-900 px-4 py-3">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-xs uppercase tracking-wide text-neutral-500">Образец — клиенту</span>
              <span className="font-mono text-lg font-semibold text-white">{formatRub(sampleClientPriceRub)}</span>
              {supplierOrigin === 'china' && values.sampleUsd > 0 ? (
                <span className="text-xs text-neutral-600">
                  ({formatCurrency(values.sampleUsd, result.currency)} завод + ${getNumber(values.sampleAirDeliveryUsd)} авиа) ×{values.markup.toFixed(1)}
                </span>
              ) : null}
              {supplierOrigin === 'russia' && ruParams.sampleRub > 0 ? (
                <span className="text-xs text-neutral-600">
                  ({formatRub(ruParams.sampleRub)} завод + {formatRub(getNumber(ruParams.sampleDeliveryRub))} доставка) ×{values.markup.toFixed(1)}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-neutral-600">Оплачивается отдельно до запуска производства</p>
          </div>
        ) : null}

        {/* KP tiers table */}
        {kpQuantities.length > 1 ? (
          <section className="mt-4 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900">
            <div className="border-b border-neutral-800 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">
              Таблица тиражей для КП
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="px-5 py-3 text-left font-mono text-xs text-neutral-500">Тираж</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Себест./шт</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-lime-400">Цена/шт</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Маржа</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Итого</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {kpResults.map((r) => (
                    <tr key={r.quantity} className={r.quantity === values.quantity ? 'bg-lime-300/5' : 'hover:bg-neutral-800/40'}>
                      <td className="px-5 py-3 font-mono text-white">
                        {r.quantity.toLocaleString('ru-RU')} шт
                        {r.quantity === values.quantity ? <span className="ml-2 text-xs text-lime-300/60">основной</span> : null}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-neutral-400">{formatRub(r.costRub)}</td>
                      <td className="px-4 py-3 text-right font-mono font-semibold text-lime-300">{formatRub(r.priceRub)}</td>
                      <td className="px-4 py-3 text-right font-mono text-neutral-300">{Math.round(r.marginPct)}%</td>
                      <td className="px-4 py-3 text-right font-mono text-white">{formatRub(r.totalPriceRub)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {/* Saved calculations */}
        {dealId ? (
          <section className="mt-4 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <div className="flex flex-col gap-3 border-b border-neutral-800 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Сохранённые расчёты по сделке</div>
                <p className="mt-1 text-xs text-neutral-600">Можно хранить несколько поставщиков и выбрать один как рабочий.</p>
              </div>
              <button
                type="button"
                onClick={loadSavedCalculations}
                disabled={loadingSaved}
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-neutral-700 px-4 text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white disabled:cursor-wait disabled:opacity-60"
              >
                {loadingSaved ? 'Обновляю...' : 'Обновить'}
              </button>
            </div>
            {savedCalculations.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="px-5 py-3 text-left font-mono text-xs text-neutral-500">Поставщик</th>
                      <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Себестоимость</th>
                      <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Цена</th>
                      <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Маржа</th>
                      <th className="px-4 py-3 text-left font-mono text-xs text-neutral-500">Статус</th>
                      <th className="px-5 py-3 text-right font-mono text-xs text-neutral-500">Действие</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {savedCalculations.map((record) => (
                      <tr key={record.id} className="hover:bg-neutral-800/40">
                        <td className="px-5 py-3">
                          <div className="font-medium text-white">{record.supplierName || 'Поставщик без названия'}</div>
                          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                            <span>{record.variantName || record.material || 'вариант без названия'}</span>
                            <span>{formatDateTime(record.createdAt)}</span>
                            {record.leadTimeDays ? <span>{record.leadTimeDays} дн.</span> : null}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-neutral-300">{formatRub(record.costRub)}</td>
                        <td className="px-4 py-3 text-right font-mono text-lime-300">{formatRub(record.priceRub)}</td>
                        <td className="px-4 py-3 text-right font-mono text-neutral-300">{Math.round(record.marginPct)}%</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs ${record.status === 'выбран' ? 'bg-lime-300 text-neutral-950' : 'bg-neutral-800 text-neutral-400'}`}>
                            {record.status || 'черновик'}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => selectCalculation(record)}
                            disabled={saveStatus === `selecting:${record.id}` || record.status === 'выбран'}
                            className="inline-flex min-h-9 items-center justify-center rounded-md border border-neutral-700 px-3 text-xs font-semibold text-white transition-colors hover:border-lime-300 hover:text-lime-300 disabled:cursor-not-allowed disabled:border-neutral-800 disabled:text-neutral-600"
                          >
                            {saveStatus === `selecting:${record.id}` ? 'Выбираю...' : record.status === 'выбран' ? 'Выбран' : 'Выбрать'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-5 py-8 text-sm text-neutral-500">
                {loadingSaved ? 'Загружаю расчёты...' : 'По этой сделке ещё нет сохранённых расчётов.'}
              </div>
            )}
            {saveStatus === 'selected' ? (
              <p className="border-t border-neutral-800 px-5 py-3 text-sm text-lime-300">Выбранный расчёт отмечен и записан заметкой в amoCRM, если dealId является amo lead id.</p>
            ) : null}
          </section>
        ) : null}

        {/* Documents: КП / Счёт / УПД generated from selected variants of this deal */}
        {dealId ? (
          <section className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5">
            <div className="mb-4">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Документы</div>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Собирается из всех расчётов сделки со статусом «выбран» (может быть несколько вариантов одного завода). УПД — черновик для сверки номера; подписание и отправка контрагенту — через СБИС отдельно.
              </p>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <TextInput label="Покупатель: наименование" value={buyer.name} placeholder="ООО Ромашка" onChange={(v) => setBuyer((c) => ({ ...c, name: v }))} />
              <TextInput label="Покупатель: ИНН" value={buyer.inn} placeholder="7701234567" onChange={(v) => setBuyer((c) => ({ ...c, inn: v.replace(/[^\d]/g, '') }))} />
              <TextInput label="Покупатель: КПП" value={buyer.kpp} placeholder="770101001" onChange={(v) => setBuyer((c) => ({ ...c, kpp: v.replace(/[^\d]/g, '') }))} />
              <TextInput label="Покупатель: адрес" value={buyer.address} placeholder="г. Москва, ул. ..." onChange={(v) => setBuyer((c) => ({ ...c, address: v }))} />
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {['КП', 'Счёт', 'УПД'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => generateDocument(type)}
                  disabled={generatingDocType !== ''}
                  className="inline-flex min-h-10 items-center justify-center rounded-md bg-lime-300 px-4 text-sm font-semibold text-neutral-950 transition-colors hover:bg-lime-200 disabled:cursor-wait disabled:opacity-60"
                >
                  {generatingDocType === type ? 'Формирую...' : `Сформировать ${type}`}
                </button>
              ))}
            </div>

            {documentError ? (
              <p className="mb-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">{documentError}</p>
            ) : null}

            {lastDocument ? (
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">{lastDocument.type} № {lastDocument.number}</span>
                  <button
                    type="button"
                    onClick={async () => { await navigator.clipboard.writeText(lastDocument.text); setDocumentCopied(true) }}
                    className="inline-flex min-h-8 items-center justify-center rounded-md border border-neutral-700 px-3 text-xs font-semibold text-white transition-colors hover:border-lime-300 hover:text-lime-300"
                  >
                    {documentCopied ? 'Скопировано' : 'Скопировать'}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap rounded-md bg-neutral-950 p-4 font-mono text-xs leading-5 text-neutral-300">{lastDocument.text}</pre>
              </div>
            ) : null}

            {documents.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="px-3 py-2 text-left font-mono text-xs text-neutral-500">Номер</th>
                      <th className="px-3 py-2 text-left font-mono text-xs text-neutral-500">Тип</th>
                      <th className="px-3 py-2 text-right font-mono text-xs text-neutral-500">Сумма</th>
                      <th className="px-3 py-2 text-left font-mono text-xs text-neutral-500">Статус</th>
                      <th className="px-3 py-2 text-left font-mono text-xs text-neutral-500">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-3 py-2 font-mono text-white">{doc.number}</td>
                        <td className="px-3 py-2 text-neutral-300">{doc.type}</td>
                        <td className="px-3 py-2 text-right font-mono text-lime-300">{formatRub(doc.totalRub)}</td>
                        <td className="px-3 py-2 text-neutral-400">{doc.status}</td>
                        <td className="px-3 py-2 text-neutral-500">{formatDateTime(doc.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">{loadingDocuments ? 'Загружаю документы...' : 'По этой сделке ещё нет сформированных документов.'}</p>
            )}
          </section>
        ) : null}

        {/* Margin bar */}
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

        {/* Breakdown + CRM */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
            <div className="border-b border-neutral-800 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">
              Структура себестоимости / шт
              {isWhite && result.white?.isOsno ? (
                <span className="ml-3 text-amber-400 normal-case">НДС не включён (ОСНО)</span>
              ) : null}
            </div>
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

        {/* Comparison table — only when white is selected */}
        {isWhite && result.white && result.cargo ? (
          <section className="mt-4 rounded-lg border border-neutral-700 bg-neutral-900 overflow-hidden">
            <div className="border-b border-neutral-800 px-5 py-4 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">
              Сравнение: Карго vs Белая
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="px-5 py-3 text-left font-mono text-xs text-neutral-500">Компонент</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-neutral-500">Карго</th>
                    <th className="px-4 py-3 text-right font-mono text-xs text-lime-400">Белая</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {[
                    ['Производство EXW', values.exwUsd * result.supplierRateRub, values.exwUsd * result.supplierRateRub],
                    ['Упаковка', values.packUsd * result.supplierRateRub, values.packUsd * result.supplierRateRub],
                    ['Одноразовые затраты / шт', result.cargo.oneTimePerUnitRub, result.cargo.oneTimePerUnitRub],
                    ['Логистика до РФ', result.cargo.cargoLogisticsRub, result.white.freightPerUnit],
                    ['Упаковка карго', result.cargo.cargoPackRub, 0],
                    ['Пошлина', 0, result.white.dutyPerUnit],
                    ['НДС при ввозе', 0, result.white.vatPerUnit],
                    ['Валютная комиссия / банк', result.cargo.cargoBankRub, result.white.currCommPerUnit],
                    ['Брак / риск', result.cargo.cargoDefectRub, result.white.defectPerUnit],
                    ['Брокер + СВХ + доставка РФ', result.cargo.cargoLocalRub, result.white.fixedPerUnit],
                    ['Сертификация / шт', 0, result.white.certPerUnit],
                  ].map(([label, cargoAmt, whiteAmt]) => {
                    if (cargoAmt <= 0.01 && whiteAmt <= 0.01) return null
                    const isVat = label === 'НДС при ввозе'
                    return (
                      <tr key={label} className="hover:bg-neutral-800/40">
                        <td className="px-5 py-2.5 text-neutral-300">
                          {label}
                          {isVat && result.white.isOsno ? <span className="ml-2 text-xs text-amber-400">к вычету</span> : isVat ? <span className="ml-2 text-xs text-neutral-500">в с/с</span> : null}
                        </td>
                        <td className="px-4 py-2.5 text-right font-mono text-neutral-400">{cargoAmt > 0.01 ? formatRub(cargoAmt) : '—'}</td>
                        <td className={`px-4 py-2.5 text-right font-mono ${isVat && result.white.isOsno ? 'text-amber-300' : 'text-white'}`}>
                          {whiteAmt > 0.01 ? formatRub(whiteAmt) : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-neutral-700 bg-neutral-800/50">
                    <td className="px-5 py-3 text-sm font-semibold text-white">ИТОГО / шт</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-neutral-300">{formatRub(result.cargo.cargoCostRub)}</td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-lime-300">{formatRub(result.white.whiteCostRub)}</td>
                  </tr>
                  {result.white.isOsno ? (
                    <tr className="border-t border-neutral-800 bg-amber-400/5">
                      <td className="px-5 py-2.5 text-xs text-amber-300" colSpan={3}>
                        ОСНО: НДС {formatRub(result.white.vatPerUnit)}/шт уплачен на таможне, принимается к вычету — не влияет на себестоимость, но замораживает оборотные средства.
                      </td>
                    </tr>
                  ) : null}
                </tfoot>
              </table>
            </div>
            <div className="border-t border-neutral-800 px-5 py-4">
              {result.white.breakEvenQty !== null && result.white.breakEvenQty > 0 && result.white.breakEvenQty < 100000 ? (
                <div className="rounded-md border border-lime-300/30 bg-lime-300/5 px-4 py-3">
                  <p className="text-sm text-neutral-300">
                    Точка безубыточности белой схемы:{' '}
                    <span className="font-semibold text-lime-300">при тираже ≥ {result.white.breakEvenQty.toLocaleString('ru-RU')} шт</span>
                    {' '}белая схема дешевле карго на данных параметрах.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border border-amber-400/30 bg-amber-400/5 px-4 py-3">
                  <p className="text-sm text-amber-300">
                    На текущих параметрах белая схема дороже карго при любом тираже. Проверьте ставку фрахта, пошлину и ставку карго.
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* RF Delivery estimator */}
        <section className="mt-4 rounded-lg border border-neutral-700 bg-neutral-900 p-5">
          <div className="mb-1 font-mono text-xs uppercase tracking-[0.12em] text-neutral-500">Оценка доставки по РФ</div>
          <p className="mb-5 text-xs text-neutral-600">Клиент платит отдельно. Используй для быстрого квотирования.</p>
          <div className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {Object.entries(deliveryZones).map(([key, zone]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDeliveryZone(key)}
                className={`rounded-md border px-3 py-2.5 text-left transition-colors ${deliveryZone === key ? 'border-lime-300 bg-lime-300/10 text-lime-300' : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'}`}
              >
                <span className="block text-xs font-medium">{zone.label}</span>
                <span className="mt-0.5 block font-mono text-[10px] opacity-60">{zone.rate} ₽/кг</span>
              </button>
            ))}
          </div>
          <div className="mb-5">
            <div className="mb-3 text-xs text-neutral-500">Габариты упаковки 1 шт (см)</div>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Длина" value={values.dimL} suffix=" см" min={1} max={120} step={1} onChange={(v) => update('dimL', v)} />
              <Field label="Ширина" value={values.dimW} suffix=" см" min={1} max={120} step={1} onChange={(v) => update('dimW', v)} />
              <Field label="Высота" value={values.dimH} suffix=" см" min={1} max={120} step={1} onChange={(v) => update('dimH', v)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Физический вес" value={`${deliveryResult.physicalKg.toFixed(1)} кг`} sub="вес товара" />
            <Metric label="Объёмный вес" value={`${deliveryResult.volKg.toFixed(1)} кг`} sub={deliveryResult.isVolBased ? 'берётся в расчёт ▲' : 'меньше физического'} />
            <Metric label="Стоимость доставки" value={formatRub(deliveryResult.totalRub)} sub={deliveryZones[deliveryZone].label} />
            <Metric label="На штуку" value={formatRub(deliveryResult.perUnitRub)} sub="для справки" />
          </div>
          {deliveryResult.isVolBased ? (
            <p className="mt-4 rounded-md border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">
              Объёмный вес ({deliveryResult.volKg.toFixed(1)} кг) больше физического ({deliveryResult.physicalKg.toFixed(1)} кг) — ТК выставит счёт по объёму.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  )
}
