import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CrossNav from '../components/CrossNav.jsx'
import StickyProductTab from '../components/StickyProductTab.jsx'
import CookieBanner from '../components/CookieBanner.jsx'
import GalleryLightbox from '../components/GalleryLightbox.jsx'
import ProcessMedia from '../components/ProcessMedia.jsx'

const stageItems = [
  { src: '/images/hero-stage/bear.webp',    alt: 'Кастомный медведь-маскот с логотипом — мягкая игрушка на заказ для бренда', size: 250, x: 20, y: 26, z: 3, delay: '0.2s', float: '4.0s' },
  { src: '/images/hero-stage/cat.webp',     alt: 'Кот-маскот с логотипом клиента — брендированная мягкая игрушка для корпоративного мерча', size: 155, x: 2, y: 6, z: 2, delay: '0.6s', float: '4.4s' },
  { src: '/images/hero-stage/robot.webp',   alt: 'Робот-маскот с фирменным логотипом — кастомная игрушка на заказ для компании', size: 180, x: 58, y: 55, z: 2, delay: '0.9s', float: '3.5s' },
  { src: '/images/hero-stage/dinosaur.webp',alt: 'Динозавр-маскот — кастомный антистресс-объект для корпоративного бренда', size: 155, x: 65, y: 5, z: 1, delay: '0.4s', float: '4.2s' },
]

function ProductStage() {
  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">
      {/* Coral glow behind center bear */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 340, height: 340,
          left: '50%', top: '50%',
          transform: 'translate(-50%, -52%)',
          background: 'radial-gradient(circle, rgba(255,106,61,0.18) 0%, transparent 70%)',
          animation: 'stageGlow 4s ease-in-out infinite',
        }}
      />

      {stageItems.map((item) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          draggable={false}
          style={{
            position: 'absolute',
            width: item.size,
            left: `${item.x}%`,
            top: `${item.y}%`,
            zIndex: item.z,
            transform: 'translateY(0px)',
            animation: `stageFLoat ${item.float} ease-in-out infinite`,
            animationDelay: item.delay,
            filter: 'drop-shadow(0 28px 36px rgba(0,0,0,0.5))',
          }}
        />
      ))}
    </div>
  )
}

const navLinks = [
  { label: 'Работы', href: '#gallery' },
  { label: 'Форматы', href: '#standard_forms' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Процесс', href: '#process' },
  { label: 'FAQ', href: '#faq' },
]

const comparisonCols = ['Критерий', 'Шоколад', 'Блокнот', 'Ручка', 'Брелок', 'Бренд-объект']
const comparisonMatrix = [
  { label: 'Сколько с ним взаимодействуют', values: ['Пока едят', 'Иногда', 'По необходимости', 'Редко', 'Многократно'] },
  { label: 'Насколько запоминается', values: ['Низко', 'Средне', 'Низко', 'Средне', 'Высоко'] },
  { label: 'Возвращаются ли к нему снова', values: ['Нет', 'Иногда', 'Только по делу', 'Редко', 'Да'] },
  { label: 'Легко ли заметить', values: ['Нет', 'Скорее нет', 'Скорее нет', 'Средне', 'Да'] },
  { label: 'Остаётся ли на столе', values: ['Нет', 'Иногда', 'Редко', 'Иногда', 'Часто'] },
]

const mobileComparisonCards = [
  {
    title: 'Обычный мерч',
    subtitle: 'Шоколад, ручки, блокноты и брелоки',
    points: ['Съели, потеряли или убрали в ящик', 'Контакт с брендом короткий', 'Слабо выделяется среди похожих подарков'],
    result: 'Бренд быстро исчезает из поля зрения.',
    tone: 'muted',
  },
  {
    title: 'Бренд-объект',
    subtitle: 'Кастомный мягкий маскот',
    points: ['Берут в руки снова и снова', 'Остаётся на столе неделями', 'Запоминается как персональный подарок'],
    result: 'Каждое касание снова возвращает внимание к бренду.',
    tone: 'accent',
  },
]

const whyCards = [
  {
    number: '01',
    title: 'Тактильный контакт',
    body: 'Когда объект берут в руки, мозг запоминает его иначе, чем картинку в письме. Физический контакт формирует более устойчивую ассоциацию с брендом.',
  },
  {
    number: '02',
    title: 'Эмоциональная связь',
    body: 'Каждый раз, когда сотрудник или клиент берёт объект в руки, бренд получает касание — без push-уведомлений и без бюджета на показы.',
  },
  {
    number: '03',
    title: 'Долгий эффект',
    body: 'Бренд-объект остаётся на рабочем столе неделями. Шоколад съеден, ручка потеряна — объект всё ещё работает.',
  },
]

const galleryItems = [
  { label: 'Маскот · подарки сотрудникам', title: 'Медведь-маскот', body: 'Дружелюбная форма для корпоративных подарков, промонаборов и внутренних мероприятий. Хорошо смотрится в нейтральных и фирменных цветах.', image: '/images/gallery/bear.webp', alt: 'Белый медведь-маскот — мягкая игрушка на заказ для корпоративных подарков' },
  { label: 'Маскот · digital и IT', title: 'Кот-робот', body: 'Технологичный персонаж для IT, финтеха и digital-команд. Подходит для мерча, который хочется оставить на рабочем столе.', image: '/images/gallery/cat.webp', alt: 'Чёрный кот-робот — брендированная мягкая игрушка для IT-компании и корпоративного мерча' },
  { label: 'Символ · мероприятия и стенды', title: 'Осьминог-маскот', body: 'Узнаваемая форма с высокой тактильностью. Легко ассоциируется с брендом — для event-стендов и раздатки на мероприятиях.', image: '/images/gallery/octopus.webp', alt: 'Голубой осьминог-маскот — кастомная мягкая игрушка для выставок, событий и промо-раздачи' },
  { label: 'Персонаж · спецпроекты', title: 'Динозавр', body: 'Мягкий персонаж для запусков, детских направлений и брендов с ярким характером. Работает как запоминающийся бренд-объект.', image: '/images/gallery/dinosaur.webp', alt: 'Мятный динозавр — мягкий бренд-персонаж на заказ для промо-кампании' },
  { label: 'Промо · выставки и рассылки', title: 'Утёнок', body: 'Позитивный образ для промо-акций, рассылок и подарков партнёрам. Быстро считывается и вызывает эмоциональный отклик.', image: '/images/gallery/duck.webp', alt: 'Жёлтый утёнок — брендированная мягкая игрушка для промо-рассылок, выставок и корпоративных подарков' },
  { label: 'Форма · wellness и забота', title: 'Облачко', body: 'Спокойная минималистичная форма для HR, wellness-программ и заботливых клиентских коммуникаций.', image: '/images/gallery/cloud.webp', alt: 'Мягкое облачко — кастомная игрушка с логотипом для HR и wellness-программ' },
  { label: 'Кастом · необычная форма', title: 'Арбуз', body: 'Яркая предметная форма для специальных кампаний, сезонных запусков и брендов, которым важно выделиться с первого взгляда.', image: '/images/gallery/watermelon.webp', alt: 'Арбуз-персонаж — нестандартная мягкая игрушка на заказ для промо-кампании' },
  { label: 'Маскот · инновации', title: 'Космонавт', body: 'Аккуратный футуристичный маскот для технологичных продуктов, конференций и подарков команде или партнёрам.', image: '/images/gallery/cosmo.webp', alt: 'Космонавт-маскот — корпоративная мягкая игрушка на заказ для технологичного бренда и конференций' },
]

const pricingTiers = [
  { qty: 'от 500 шт', price: '850 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 000 шт', price: '700 ₽', perUnit: 'за штуку' },
  { qty: 'от 2 000 шт', price: '600 ₽', perUnit: 'за штуку' },
  { qty: 'от 3 000 шт', price: '390 ₽', perUnit: 'за штуку' },
]

const processSteps = [
  {
    number: '01',
    title: 'Заявка и концепт',
    body: 'Заполните форму — опишите задачу и бренд. Визуальный концепт формы пришлём за 2 часа. Бесплатно.',
  },
  {
    number: '02',
    title: 'Договор',
    body: 'Фиксируем форму, тираж, сроки, стоимость и условия производства. После подписания запускаем заказ в работу.',
  },
  {
    number: '03',
    title: 'Тираж',
    body: 'Производим партию на фабрике и контролируем соответствие согласованному концепту. Срок производства — около 15 дней.',
  },
  {
    number: '04',
    title: 'Доставка',
    body: 'Доставка из Китая в Россию: 25–30 дней. Итого от заявки до тиража в ваших руках — около 7 недель.',
  },
]

const faqItems = [
  {
    q: 'Какой минимальный тираж?',
    a: 'ПУ-антистресс со стандартной формой — от 1 000 штук, с индивидуальной формой — от 3 000 штук. Меньший тираж рассчитаем отдельно.',
  },
  {
    q: 'Из чего делают объекты?',
    a: 'Антистресс из ПУ-пены: мягкий пенополиуретан с бархатистым покрытием, сжимается и возвращает форму. Если нужен плюшевый маскот — смотрите раздел мягких игрушек.',
  },
  {
    q: 'Сколько занимает производство?',
    a: '3–5 недель от утверждения. Если нужно к конкретной дате — напишите в заявке, рассмотрим возможности.',
  },
  {
    q: 'Какие форматы кастомизации доступны?',
    a: 'Любая 3D-форма: логотип, маскот, символ, продукт компании. Доступны также кастомный цвет и брендированная упаковка.',
  },
  {
    q: 'Как происходит доставка?',
    a: 'Доставляем по России. Возможна доставка до склада или прямая отправка на мероприятие по договорённости.',
  },
  {
    q: 'Сколько стоит?',
    a: 'Ориентировочные цены: от 850 ₽/шт при тираже 500 шт, от 700 ₽/шт при 1 000 шт, от 600 ₽/шт при 2 000 шт. Точная стоимость зависит от формы и сложности — пришлём расчёт после заявки.',
  },
  {
    q: 'Где производятся игрушки?',
    a: 'На фабрике в Китае. Китайские производители специализируются на производстве мягких игрушек — это их основная компетенция, а не побочный продукт. Для ПУ-антистресса ориентир — от 1 000 штук со стандартной формой и от 3 000 штук с индивидуальной. Меньший тираж рассчитаем отдельно.',
  },
]

const formDefaults = {
  name: '',
  company: '',
  email: '',
  task: '',
  quantity: '',
  phone: '',
  reference: '',
  assetDelivery: '',
}

const assetDeliveryOptions = [
  { value: 'email_reply', label: 'Отвечу на письмо' },
  { value: 'link', label: 'Вставлю ссылку' },
  { value: 'later', label: 'Пришлю позже' },
]

const METRIKA_ID = 108979976
const CONTACT_PHONE = '+7 953 970-97-89'
const CONTACT_PHONE_HREF = 'tel:+79539709789'
const CONTACT_EMAIL = 'info@destresstoys.ru'
const MAX_CONTACT_URL = 'https://max.ru/id712807991969_bot'
const TELEGRAM_CONTACT_URL = 'https://t.me/DestressToys_bot'
const RESPONSE_HOURS = '8:00–18:00 по МСК'
const COMPANY_CITY = 'Россия, г. Тула'
const LEGAL_NAME = 'ИП Антипов Алексей Александрович'
const LEGAL_ID = 'ОГРНИП 325710000056557'
const ATTRIBUTION_STORAGE_KEY = 'destresstoys_attribution'
const SESSION_STORAGE_KEY = 'destresstoys_session_id'
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'yclid',
  'ymclid',
  'gclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'openstat',
]

const afterRequestSteps = [
  {
    title: 'Уточним задачу',
    body: 'Проверим тираж, сроки, материал, форму и ограничения по производству.',
  },
  {
    title: 'Подготовим концепт и расчёт',
    body: 'Покажем визуальное направление и ориентир по стоимости партии.',
  },
  {
    title: 'Зафиксируем условия',
    body: 'После согласования заключаем договор и запускаем тираж в работу.',
  },
]

function createTrackingId(prefix) {
  const randomPart =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  return `${prefix}_${randomPart}`
}

function getOrCreateSessionId() {
  if (typeof window === 'undefined') return ''

  const existing = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (existing) return existing

  const next = createTrackingId('session')
  sessionStorage.setItem(SESSION_STORAGE_KEY, next)
  return next
}

function collectAttribution() {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  const saved = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
  let attribution = {}

  if (saved) {
    try {
      attribution = JSON.parse(saved)
    } catch {
      sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
    }
  }

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) attribution[key] = value
  })

  attribution.session_id = getOrCreateSessionId()
  attribution.landing_page = attribution.landing_page || window.location.href
  attribution.current_page = window.location.href
  attribution.referrer = attribution.referrer || document.referrer || ''

  sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  return attribution
}

function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return

  const eventPayload = {
    event_id: createTrackingId('event'),
    page_path: window.location.pathname,
    page_title: document.title,
    ...params,
  }

  window.ym?.(METRIKA_ID, 'reachGoal', eventName, eventPayload)
  window.gtag?.('event', eventName, eventPayload)
  window.dataLayer?.push({ event: eventName, ...eventPayload })

  return eventPayload
}

function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-gut-m md:px-gut-t xl:px-gut-d ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.06em] text-accent-deep">
      {children}
    </p>
  )
}

function PlaceholderBlock({ label, className = '', tone = 'dark' }) {
  const toneClass =
    tone === 'light'
      ? 'bg-gray-300 text-[#151716]'
      : 'bg-gray-800 text-white'

  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-[12px] border border-black/5 ${toneClass} ${className}`}
    >
      <span className="px-6 text-center text-sm font-medium uppercase tracking-[0.12em] opacity-80">
        {label}
      </span>
    </div>
  )
}

function PrimaryButton({ as: Component = 'a', className = '', children, ...props }) {
  return (
    <Component
      className={`inline-flex items-center justify-center rounded-md bg-accent px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

function ContactIconLink({ href = '#', label, tooltip, children, onClick, external = false }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={tooltip}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onClick}
      className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line/40 text-muted transition-colors hover:border-accent hover:bg-surface hover:text-ink"
    >
      {children}
      <span className="pointer-events-none absolute right-0 top-[calc(100%+10px)] z-50 w-max max-w-[220px] whitespace-normal rounded-md border border-white/10 bg-[#151716] px-3 py-2 text-xs font-medium leading-5 text-white opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {tooltip}
      </span>
    </a>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [galleryLightboxItem, setGalleryLightboxItem] = useState(null)
  const [formValues, setFormValues] = useState(formDefaults)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formHasFocus, setFormHasFocus] = useState(false)
  const [formInView, setFormInView] = useState(false)
  const [cookiesOk, setCookiesOk] = useState(() => !!localStorage.getItem('cookies_ok'))
  const utmRef = useRef({})

  useEffect(() => {
    utmRef.current = collectAttribution()
  }, [])

  useEffect(() => {
    const handler = () => setCookiesOk(true)
    window.addEventListener('cookies_accepted', handler)
    return () => window.removeEventListener('cookies_accepted', handler)
  }, [])

  useEffect(() => {
    const form = document.getElementById('lead_form')
    if (!form) return
    const observer = new IntersectionObserver(([entry]) => {
      setFormInView(entry.isIntersecting)
    })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fired = new Set()
    const observers = []
    const leadForm = document.getElementById('lead_form')

    const fireOnce = (name) => {
      if (fired.has(name)) return
      fired.add(name)
      trackEvent(name, { ...utmRef.current })
    }

    if (typeof IntersectionObserver !== 'undefined') {
      const observeSection = (element, eventName) => {
        if (!element) return
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return
            fireOnce(eventName)
            observer.disconnect()
          },
          { threshold: 0.15 }
        )
        observer.observe(element)
        observers.push(observer)
      }

      observeSection(document.getElementById('pricing'), 'pricing_view')
      observeSection(leadForm, 'form_view')
    }

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const progress = window.scrollY / maxScroll

      if (progress >= 0.5) fireOnce('scroll_50')
      if (progress >= 0.75) fireOnce('scroll_75')
    }

    const onFocusIn = (event) => {
      if (event.target?.matches?.('input, textarea, select')) fireOnce('form_start')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    if (leadForm) leadForm.addEventListener('focusin', onFocusIn)

    return () => {
      observers.forEach((observer) => observer.disconnect())
      window.removeEventListener('scroll', onScroll)
      if (leadForm) leadForm.removeEventListener('focusin', onFocusIn)
    }
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFieldErrors((current) => ({ ...current, [name]: undefined }))
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const errors = {}
    if (!formValues.name.trim()) errors.name = 'Укажите имя.'
    if (!formValues.company.trim()) errors.company = 'Укажите компанию.'
    if (!formValues.email.trim()) errors.email = 'Укажите email.'
    else if (!form.elements.email.validity.valid) errors.email = 'Проверьте адрес email.'
    if (formValues.reference && !form.elements.reference.validity.valid) errors.reference = 'Укажите корректную ссылку.'
    if (!form.elements.consent.checked) errors.consent = 'Подтвердите согласие на обработку данных.'
    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      const first = ['name', 'company', 'email', 'reference', 'consent'].find((field) => errors[field])
      if (first === 'reference') form.querySelector('details').open = true
      requestAnimationFrame(() => form.elements[first]?.focus())
      return
    }
    setFieldErrors({})
    setSubmitError(false)
    const leadId = createTrackingId('lead')
    const submittedAt = new Date().toISOString()
    const payload = {
      lead_id: leadId,
      submitted_at: submittedAt,
      name: formValues.name,
      company: formValues.company,
      email: formValues.email,
      description: formValues.task,
      quantity: formValues.quantity,
      phone: formValues.phone,
      reference: formValues.reference,
      has_assets: Boolean(formValues.assetDelivery || formValues.reference),
      asset_delivery: formValues.assetDelivery,
      lead_source: 'form',
      product_type: 'antistress',
      ...utmRef.current,
    }

    trackEvent('lead_form_submit', {
      lead_id: leadId,
      lead_source: 'form',
      has_phone: Boolean(formValues.phone),
      has_quantity: Boolean(formValues.quantity),
      has_reference: Boolean(formValues.reference),
      has_assets: Boolean(formValues.assetDelivery || formValues.reference),
      asset_delivery: formValues.assetDelivery,
      product_type: 'antistress',
      ...utmRef.current,
    })

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      trackEvent('lead_form_success', { lead_id: leadId, product: 'antistress', ...utmRef.current })
      trackEvent('antistress_lead_form_success', {
        lead_id: leadId,
        lead_source: 'form',
        ...utmRef.current,
      })
      setIsSubmitted(true)
    } catch {
      trackEvent('lead_form_error', {
        lead_id: leadId,
        lead_source: 'form',
        ...utmRef.current,
      })
      setSubmitError(true)
    }
  }

  const handleFaqToggle = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index))
  }

  const handleContactClick = (channel, placement) => {
    trackEvent(`contact_${channel}_click`, {
      lead_source: channel,
      placement,
      ...utmRef.current,
    })
  }

  const handleEmailCopy = async (event, placement) => {
    event.preventDefault()

    try {
      await navigator.clipboard?.writeText(CONTACT_EMAIL)
    } catch {
      // Copy failures should not block tracking or the rest of the page.
    }

    trackEvent('contact_email_copy', {
      lead_source: 'email',
      placement,
      email: CONTACT_EMAIL,
      ...utmRef.current,
    })
  }

  const handleCtaClick = (placement, target) => {
    trackEvent('cta_click', {
      placement,
      target,
      ...utmRef.current,
    })
  }


  return (
    <main className="bg-canvas text-ink">
      <header
        id="header"
        className="sticky top-0 z-50 border-b border-line/25 bg-canvas"
      >
        <Container className="relative">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#hero"
              className="flex shrink-0 items-center gap-2.5"
            >
              <img src="/logo-bear-144.webp" alt="DeStressToys" width={36} height={36} className="h-9 w-auto" />
              <span className="text-xl font-bold text-ink tracking-tight">DeStressToys</span>
            </a>

            <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-caption font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              <ContactIconLink
                href={CONTACT_PHONE_HREF}
                label="Позвонить"
                tooltip={CONTACT_PHONE}
                onClick={() => handleContactClick('phone', 'header')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.1 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.61a2 2 0 0 1-.45 2.11L9 10.72a16 16 0 0 0 4.28 4.28l1.28-1.28a2 2 0 0 1 2.11-.45c.84.29 1.71.5 2.61.62A2 2 0 0 1 22 16.92z" />
                </svg>
              </ContactIconLink>
              <ContactIconLink
                label="Скопировать email"
                tooltip={`${CONTACT_EMAIL} · нажмите, чтобы скопировать`}
                onClick={(event) => handleEmailCopy(event, 'header')}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </ContactIconLink>
              <ContactIconLink
                href={TELEGRAM_CONTACT_URL}
                label="Написать в Telegram"
                tooltip="Telegram"
                external
                onClick={() => handleContactClick('telegram', 'header')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.6 4.2 18.4 19.3c-.24 1.06-.86 1.32-1.74.82l-4.8-3.54-2.32 2.23c-.26.26-.47.47-.96.47l.34-4.88 8.88-8.02c.39-.34-.08-.53-.6-.2L6.22 13.1 1.5 11.62c-1.03-.32-1.05-1.03.22-1.53L20.16 3c.85-.32 1.6.2 1.44 1.2z" />
                </svg>
              </ContactIconLink>
              <ContactIconLink
                href={MAX_CONTACT_URL}
                label="Написать в MAX"
                tooltip="MAX"
                external
                onClick={() => handleContactClick('max', 'header')}
              >
                <span className="text-[11px] font-black tracking-[-0.02em]" aria-hidden="true">MAX</span>
              </ContactIconLink>
            </div>

            <div className="hidden md:block">
              <a
                href="#category_choice"
                onClick={() => handleCtaClick('header', 'pricing')}
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
              >
                Получить расчёт
              </a>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-line/40 text-ink transition-colors hover:border-ink/60 md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Открыть навигацию"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              <span className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>
          </div>

          {mobileMenuOpen ? (
            <div
              id="mobile-navigation"
              className="absolute inset-x-gut-m top-[72px] rounded-[12px] border border-line/30 bg-surface p-4 md:hidden"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-ink"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 border-t border-line/30 pt-4">
                  <p className="text-caption text-muted">Связаться напрямую</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'mobile_menu')} className="text-base font-semibold text-ink">
                      {CONTACT_PHONE}
                    </a>
                    <a href="#" onClick={(event) => handleEmailCopy(event, 'mobile_menu')} className="text-base font-medium text-ink">
                      {CONTACT_EMAIL}
                    </a>
                    <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('telegram', 'mobile_menu')} className="text-base font-medium text-ink">
                      Telegram
                    </a>
                    <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('max', 'mobile_menu')} className="text-base font-medium text-ink">
                      MAX
                    </a>
                  </div>
                  <p className="mt-2 text-caption text-muted">Ответим с {RESPONSE_HOURS}</p>
                </div>
                <PrimaryButton
                  href="#category_choice"
                  className="mt-2 w-full"
                  onClick={() => {
                    handleCtaClick('mobile_menu', 'pricing')
                    setMobileMenuOpen(false)
                  }}
                >
                  Получить расчёт
                </PrimaryButton>
              </nav>
            </div>
          ) : null}
        </Container>
      </header>

      <StickyProductTab variant="antistress" />

      <section id="hero" className="bg-canvas flex flex-col min-h-[85vh] md:min-h-screen">
        <Container className="w-full flex-1 flex items-center py-sec-m md:py-sec-t">
          <div className="grid w-full items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div className="flex flex-col justify-center">
              <SectionLabel>Плюш и PU-антистресс</SectionLabel>
              <h1 className="text-h1-m md:text-h1-t xl:text-h1-d font-bold text-ink">
                Игрушки с логотипом, которые хочется оставить
              </h1>
              <p className="mt-6 max-w-measure text-body md:text-body-lg text-muted">
                Плюшевые маскоты и PU-антистрессы для команд, клиентов и событий.
              </p>

              <div className="mt-8 md:mt-10">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <PrimaryButton href="#category_choice" onClick={() => handleCtaClick('hero', 'pricing')}>Рассчитать мой тираж</PrimaryButton>
                  <span className="text-caption text-muted">
                    или напишите в{' '}
                    <a
                      href={TELEGRAM_CONTACT_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleContactClick('telegram', 'hero')}
                      className="text-ink underline underline-offset-4 hover:text-accent transition-colors"
                    >
                      Telegram
                    </a>
                    {' · '}
                    <a
                      href={MAX_CONTACT_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => handleContactClick('max', 'hero')}
                      className="text-ink underline underline-offset-4 hover:text-accent transition-colors"
                    >
                      MAX
                    </a>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-6">
                  {['Образец до запуска тиража', 'Концепт за 2 часа', 'Договор перед запуском'].map((p, i) => (
                    <span key={i} className="text-caption text-muted flex items-center gap-2">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-line inline-block" />}
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Один предмет крупно, без движения: остальные игрушки живут в галерее,
                в hero они спорили друг с другом и с заголовком. */}
            <figure className="relative m-0 flex flex-col items-center">
              <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[80%] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,106,61,0.16) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <img
                src="/images/hero/hero-bear-780.webp"
                srcSet="/images/hero/hero-bear-780.webp 780w, /images/hero/hero-bear-1024.webp 1024w"
                sizes="(min-width: 768px) 44vw, 78vw"
                width={1024}
                height={1024}
                alt="Медведь-маскот с логотипом на груди: концептуальная визуализация плотного ворсового плюша и вышитого знака"
                fetchPriority="high"
                decoding="async"
                className="relative w-[78vw] max-w-[320px] md:w-full md:max-w-[520px] object-contain"
                style={{ filter: 'drop-shadow(0 22px 28px rgba(21,23,22,0.18))' }}
              />
              <figcaption className="relative mt-4 text-xs leading-5 text-muted text-center">
                Концепция изделия, не готовый образец
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section id="categories" className="bg-canvas py-sec-m md:py-sec-t xl:py-sec-d">
        <Container>
          <h2 className="text-h2-m md:text-h2-t xl:text-h2-d font-bold text-ink">Плюш или антистресс?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              to="/plush"
              className="group block text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <figure className="m-0">
                <img src="/images/gallery/plush_bear.webp" alt="Концепция плюшевого маскота с видимым ворсом" className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
              </figure>
              <div className="pt-6">
                <h3 className="text-h2-m font-bold">Плюш</h3>
                <p className="mt-2 text-body text-muted">Маскот для подарков сотрудникам и клиентам.</p>
                <p className="mt-4 text-body font-semibold">от 100 шт</p>
                <span className="mt-4 inline-block text-body font-semibold underline underline-offset-4 group-hover:no-underline">Посмотреть плюш</span>
                <p className="mt-4 text-caption text-muted">Концепция изделия, не готовый образец</p>
              </div>
            </Link>
            <a
              href="#pricing"
              className="group block text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <figure className="m-0">
                <img src="/images/gallery/white_bear.webp" alt="Концепция PU-антистресса с видимой поверхностью" className="aspect-square w-full object-cover" loading="lazy" decoding="async" />
              </figure>
              <div className="pt-6">
                <h3 className="text-h2-m font-bold">PU-антистресс</h3>
                <p className="mt-2 text-body text-muted">Антистресс для стендов и промо-наборов.</p>
                <p className="mt-4 text-body font-semibold">от 1 000 шт</p>
                <p className="mt-1 text-caption text-muted">индивидуальная форма — от 3 000 шт</p>
                <span className="mt-4 inline-block text-body font-semibold underline underline-offset-4 group-hover:no-underline">Подобрать PU-антистресс</span>
                <p className="mt-4 text-caption text-muted">Концепция изделия, не готовый образец</p>
              </div>
            </a>
          </div>
          <p className="mt-4 text-caption text-muted">Нужен тираж меньше — рассчитаем отдельно</p>
          <div id="category_choice" className="mt-8 border-t border-line pt-6 scroll-mt-28">
            <p className="text-body font-semibold text-ink">Для расчёта выберите категорию</p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <a href="#lead_form" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-3 text-body font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">PU-антистресс</a>
              <Link to="/plush#lead_form" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line/50 px-6 py-3 text-body font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Плюшевый маскот</Link>
            </div>
          </div>
        </Container>
      </section>

      <section id="gallery" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Работы</SectionLabel>
          <div className="max-w-[680px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Наши работы и форматы бренд-игрушек
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <article
                key={item.label}
                className="overflow-hidden rounded-xl border border-[#e5e0d8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]"
              >
                <button type="button" onClick={() => setGalleryLightboxItem(item)} className="block w-full text-left cursor-pointer">
                  <div className="w-full aspect-[5/4] bg-[#f4efe8]">
                    <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-3 md:p-6">
                    <p className="mb-1 hidden text-xs uppercase tracking-widest text-[#ff6a3d] md:block">
                      {item.label}
                    </p>
                    <h3 className="text-sm md:text-xl font-bold text-[#151716]">{item.title}</h3>
                    <p className="mt-1 hidden md:block text-sm leading-relaxed text-[#5a6060]">
                      {item.body}
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>
          <GalleryLightbox item={galleryLightboxItem} accentColor="#ff6a3d" onClose={() => setGalleryLightboxItem(null)} />
        </Container>
      </section>

      <section id="production" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Производство</SectionLabel>
          <div className="max-w-[760px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Как производится антистресс из ПУ-пены
            </h2>
            <p className="mt-4 text-base leading-7 text-[#dfe5df]">
              Специализированное производство в Китае — пресс-формы, заливка ПУ-пены, покраска и упаковка под одной крышей. Контролируем качество каждой партии и гарантируем соответствие образцу.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/pu-prod-1.webp"
                alt="Реакторы-смесители ПУ-компонентов на производственной линии"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#ff6a3d]">
                  Смешивание компонентов
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Реакторы смешивают изоцианат и полиол — базовые компоненты ПУ-пены в нужной пропорции.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/pu-prod-2.webp"
                alt="Заливка ПУ-пены в пресс-формы — производство антистресс-маскота"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#ff6a3d]">
                  Заливка в пресс-форму
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Готовая смесь заливается в форму под ваш маскот. Форма определяет итоговый силуэт изделия.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/pu-prod-3.webp"
                alt="Автоматическая линия серийной заливки ПУ-пены"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#ff6a3d]">
                  Серийная линия
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Автоматическая линия обеспечивает одинаковую плотность и вес каждого изделия в тираже.
                </p>
              </div>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#7c847d]">
            <span>✓ Образец перед запуском тиража</span>
            <span>✓ Фото и видео с производства по запросу</span>
            <span>✓ Договор фиксирует параметры до старта</span>
          </div>
        </Container>
      </section>

      <section className="bg-[#151716] border-t border-white/[0.06] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Готовый тираж</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              От пресс-формы до вашего склада
            </h2>
            <p className="mt-4 text-base leading-7 text-[#dfe5df]">
              Упаковываем, маркируем и отгружаем тираж под ключ. Брендированные коробки, контроль комплектности, документы для таможни.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {[
              { src: '/images/production/batch-1.webp', alt: 'Брендированные антистресс-маскоты укладываются в коробки клиента', label: 'Брендированная упаковка', body: 'Логотип клиента на изделии и коробке. Каждая единица — готовый подарочный объект.' },
              { src: '/images/production/batch-2.webp', alt: 'Готовые фирменные антистрессы в упаковочных коробках', label: 'Контроль тиража', body: 'Проверяем каждую партию на соответствие образцу до укладки в коробки.' },
              { src: '/images/production/batch-3.webp', alt: 'Паллета с коробками брендированных антистрессов готова к отгрузке', label: 'Отгрузка', body: 'Паллеты укомплектованы, промаркированы и готовы к отправке на ваш склад.' },
            ].map((item) => (
              <article key={item.label} className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
                <img src={item.src} alt={item.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-4">
                  <p className="mb-1 text-xs uppercase tracking-widest text-[#ff6a3d]">{item.label}</p>
                  <p className="text-sm leading-6 text-[#dfe5df]">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="standard_forms" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Стандартные формы</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Готовая форма с вашим логотипом — быстрее и доступнее
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5a6060]">
              Не нужна уникальная пресс-форма. Выберите из 35+ готовых форм и нанесите логотип вашего бренда. Тираж от 1 000 шт, меньший рассчитаем отдельно. Срок от 2 недель — подходит для ограниченного бюджета или срочного запуска.
            </p>
          </div>

          <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {[
              { img: '/images/forms/seal.webp', emoji: '🐻', category: 'Животные', examples: 'Медведь, котик, котик-тюлень, кролик' },
              { img: '/images/forms/cup.webp', emoji: '🍔', category: 'Еда и напитки', examples: 'Стакан, гамбургер, авокадо, пончик' },
              { img: '/images/forms/bus.webp', emoji: '🚗', category: 'Транспорт', examples: 'Автобус, автомобиль, эвакуатор' },
              { img: '/images/forms/ball.webp', emoji: '⚽', category: 'Спорт', examples: 'Мяч, баскетбол, шлем, футболка' },
              { img: '/images/forms/teeth.webp', emoji: '💊', category: 'Медицина / Юмор', examples: 'Зубы, мозг, капсула, губы' },
              { img: '/images/forms/drop.webp', emoji: '☁️', category: 'Природа / Жидкости', examples: 'Капля, облако, звезда, гриб' },
              { img: '/images/forms/mic.webp', emoji: '🏠', category: 'Офис / Быт', examples: 'Микрофон, домик, дрель, флакон' },
              { img: '/images/forms/eggplant.webp', emoji: '❤️', category: 'Овощи / Прочее', examples: 'Баклажан, перец, морковь, сердце' },
            ].map((cat) => (
              <div
                key={cat.category}
                className="snap-start flex-shrink-0 w-[160px] rounded-xl border border-[#e5e0d8] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:w-auto"
              >
                {cat.img ? (
                  <img src={cat.img} alt={cat.category} className="w-full aspect-square object-cover" loading="lazy" decoding="async" />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-[#f4efe8]">
                    <span className="text-4xl">{cat.emoji}</span>
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#151716]">{cat.category}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5a6060]">{cat.examples}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl bg-[#151716] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">Ориентировочные цены</p>
              <div className="mt-5 space-y-3">
                {[
                  { qty: 'от 200 шт', price: 'от 270 ₽/шт' },
                  { qty: 'от 500 шт', price: 'от 200 ₽/шт' },
                  { qty: 'от 1 000 шт', price: 'от 130 ₽/шт' },
                ].map((row) => (
                  <div key={row.qty} className="flex items-baseline justify-between border-b border-white/10 pb-3">
                    <span className="text-sm text-[#7c847d]">{row.qty}</span>
                    <span className="text-lg font-bold text-white">{row.price}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#7c847d]">Цена зависит от конкретной формы. Простые формы — дешевле, сложные — дороже. Точный расчёт — после выбора.</p>
            </div>

            <div className="rounded-xl border border-[#e5e0d8] bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-bold text-[#151716]">Чем отличается от кастомной формы</p>
              <ul className="mt-4 space-y-3">
                {[
                  'Тираж от 200 шт — не от 500',
                  'Срок от 2 недель — не от 4–5',
                  'Нет затрат на разработку пресс-формы',
                  'Логотип методом тампопечати или нанесения',
                  'Подходит для разовых акций и тестовых тиражей',
                ].map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#5a6060]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a3d]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <PrimaryButton href="#lead_form" onClick={() => handleCtaClick('standard_forms', 'final_cta')}>Выбрать форму и получить расчёт</PrimaryButton>
          </div>
        </Container>
      </section>

      <section id="pricing" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Стоимость</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Примерные цены на тираж
            </h2>
            <p className="mt-4 text-base leading-7 text-[#7c847d]">
              Точная стоимость зависит от формы и сложности. Цены ниже — для кастомной формы. Стандартная форма с лого — дешевле, смотрите раздел выше.
            </p>
          </div>

          <p className="mt-4 text-sm text-[#7c847d]">Сжимается, возвращает форму. Бархатистое покрытие. Антистресс-эффект.</p>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {pricingTiers.map((tier) => (
              <div
                key={tier.qty}
                className={`rounded-xl border p-5 text-center relative ${tier.qty === 'от 500 шт' ? 'border-[#ff6a3d] bg-white/10' : 'border-white/10 bg-white/5'}`}
              >
                {tier.qty === 'от 500 шт' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff6a3d] px-3 py-0.5 text-xs font-bold text-white whitespace-nowrap">
                    Популярный
                  </span>
                )}
                <p className="text-sm text-[#7c847d]">{tier.qty}</p>
                <p className="mt-2 text-[2rem] font-bold leading-none text-[#ff6a3d]">{tier.price}</p>
                <p className="mt-1 text-xs text-[#7c847d]">{tier.perUnit}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7c847d]">
            <span><span className="text-[#ff6a3d]">✓</span> Разработка формы под ваш бренд</span>
            <span><span className="text-[#ff6a3d]">✓</span> Производство тиража</span>
            <span><span className="text-[#ff6a3d]">✓</span> Упаковка</span>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Нужно дешевле или быстрее?</p>
            <p className="mt-1 text-sm text-[#7c847d]">Стандартные готовые формы — тираж от 200 шт, от 130–270 ₽/шт, срок от 2 недель. Логотип методом тампопечати.</p>
            <a
              href="#standard_forms"
              onClick={() => handleCtaClick('pricing', 'standard_forms')}
              className="mt-3 inline-flex items-center text-sm font-semibold text-[#ff6a3d] hover:underline"
            >
              Смотреть стандартные формы →
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-4">
            <PrimaryButton href="#lead_form" onClick={() => handleCtaClick('pricing', 'final_cta')}>Рассчитать точную стоимость</PrimaryButton>
          </div>
        </Container>
      </section>

      {/* Mobile-only contact block after pricing */}
      <div className="md:hidden bg-[#151716] border-t border-white/10 px-5 py-8">
        <p className="text-sm font-medium text-white">Есть вопрос по цене?</p>
        <p className="mt-1 text-sm text-[#7c847d]">Ответим в мессенджере — быстро и без форм.</p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={TELEGRAM_CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleContactClick('telegram', 'pricing_mobile')}
            className="inline-flex w-full items-center justify-center rounded-md bg-[#ff6a3d] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85a2e]"
          >
            Написать в Telegram
          </a>
          <a
            href={MAX_CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => handleContactClick('max', 'pricing_mobile')}
            className="inline-flex w-full items-center justify-center rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
          >
            Написать в MAX
          </a>
        </div>
      </div>

      <section id="process" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Процесс</SectionLabel>
          <div className="max-w-[620px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              От заявки до готового объекта
            </h2>
          </div>

          <div className="relative mt-8 grid gap-8 md:mt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-12">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-2 lg:gap-6">
              {processSteps.map((step) => (
                <article key={step.number} className="relative min-w-0">
                  <p className="text-[1.75rem] lg:text-[3rem] font-bold leading-none tracking-[-0.02em] text-[#ff6a3d]">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-base lg:text-2xl font-semibold leading-6 lg:leading-8 text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#7c847d] lg:max-w-[260px] lg:text-base lg:leading-7">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>

            {/* Шаг «Образец» словами не доказать — показываем сборку на производстве. */}
            <ProcessMedia
              src="/videos/process-sewing.mp4"
              poster="/videos/process-sewing-poster.webp"
              width={864}
              height={486}
              alt="Сборка плюшевой игрушки на производстве"
              className="relative overflow-hidden rounded-xl border border-white/[0.08]"
              mediaClassName="w-full h-auto"
              captionClassName="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-1.5 text-[11px] leading-4 text-white/85"
            />
          </div>
        </Container>
      </section>

      <section className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Кейс</SectionLabel>
          <div className="overflow-hidden rounded-2xl border border-[#e5e0d8] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:flex">
            <div className="md:w-1/2 shrink-0">
              <img
                src="/images/production/exhibition.webp"
                alt="Брендированные ПУ-маскоты на корпоративном мероприятии — переговорный стол с фирменными фигурками"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">Рекламное агентство · 3 000 шт</p>
              <h3 className="mt-3 text-[1.4rem] md:text-[1.75rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#151716]">
                Маскот сложной формы для BAUMA Russia
              </h3>
              <p className="mt-4 text-base leading-7 text-[#5a6060]">
                Агентство заказало 3 000 кастомных антистрессов для раздачи на стенде BAUMA Russia. Сложная форма, фирменный цвет, логотип тампопечатью. Образец — за 10 дней, тираж — в срок до начала выставки.
              </p>
              <ul className="mt-5 space-y-2">
                {['Кастомная форма по эскизу клиента', 'Тираж 3 000 шт с брендированной упаковкой', 'Поставка за 28 дней от утверждения образца'].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-6 text-[#5a6060]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a3d]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section id="trust" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Почему нам доверяют</SectionLabel>
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716] max-w-[600px]">
            Работаем с IT, финтехом, фармой и ретейлом
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6 xl:gap-4">
            {[
              { title: 'Мин. тираж', value: 'от 1 000 шт' },
              { title: 'Расчёт', value: 'за 1 день' },
              { title: 'Договор', value: 'до старта' },
              { title: 'Производство', value: '~15 дней' },
              { title: 'Доставка', value: '25–30 дней' },
              { title: 'Контроль', value: 'фото + видео' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[#e5e0d8] bg-white p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <p className="text-2xl font-bold leading-none text-[#ff6a3d]">{item.value}</p>
                <p className="mt-2 text-xs leading-4 text-[#5a6060]">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {['IT и SaaS', 'Потребительские бренды', 'Ретейл', 'Финтех', 'HR и обучение', 'Производство'].map((sector) => (
              <span
                key={sector}
                className="rounded-[8px] border border-[#d0c9bf] bg-white px-4 py-2 text-sm font-medium text-[#151716]"
              >
                {sector}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Частые вопросы
            </h2>

            <div className="mt-8 border-t border-white/10">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index

                return (
                  <div key={item.q} className="border-b border-white/10 py-5">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                      onClick={() => handleFaqToggle(index)}
                    >
                      <span className="text-base md:text-lg font-semibold leading-6 md:leading-7 text-white">
                        {item.q}
                      </span>
                      <span className="text-2xl leading-none text-[#ff6a3d]">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen ? (
                      <p className="mt-4 max-w-[620px] text-base leading-7 text-[#7c847d]">
                        {item.a}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* comparison section removed — T-01 split */}
      <section id="comparison_removed" className="hidden">
        <Container>
          <SectionLabel>Сравнение</SectionLabel>
          <div className="max-w-[980px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[2.85rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#151716]">
              Обычный мерч используют один раз. Бренд-объект остаётся на виду.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#5a6060]">
              Шоколад заканчивается, ручка теряется, блокнот не всегда под рукой.
              Бренд-объект выигрывает тем, что к нему возвращаются.
            </p>
          </div>

          <div className="mt-10 hidden overflow-hidden rounded-xl border border-[#e5e0d8] bg-white md:block">
            <table className="w-full border-collapse">
              <thead className="bg-[#ebe5dd] text-xs uppercase tracking-wider text-[#5a6060]">
                <tr>
                  {comparisonCols.map((col, index) => (
                    <th
                      key={col}
                      className={`px-5 py-4 text-left font-semibold ${index === comparisonCols.length - 1 ? 'bg-[#ff6a3d]/10 font-bold text-[#ff6a3d] border-t-2 border-[#ff6a3d]' : ''}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e0d8]">
                {comparisonMatrix.map((row) => (
                  <tr key={row.label} className="hover:bg-[#f4efe8]/40">
                    <th className="px-5 py-4 text-left text-sm font-semibold text-[#151716]">
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${index}`}
                        className={`px-5 py-4 text-sm ${index === row.values.length - 1 ? 'bg-[#ff6a3d]/8' : 'text-[#5a6060]'}`}
                      >
                        {index === row.values.length - 1 ? (
                          <span className="inline-flex items-center rounded-full bg-[#ff6a3d] px-3 py-0.5 text-xs font-bold text-white">
                            {value}
                          </span>
                        ) : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 md:hidden">
            {mobileComparisonCards.map((card) => (
              <article
                key={card.title}
                className={`rounded-xl border p-5 ${
                  card.tone === 'accent'
                    ? 'border-[#ff6a3d] bg-white shadow-[0_18px_34px_rgba(255,106,61,0.14)]'
                    : 'border-[#e5e0d8] bg-white'
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${card.tone === 'accent' ? 'text-[#ff6a3d]' : 'text-[#7c847d]'}`}>
                  {card.subtitle}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-7 text-[#151716]">{card.title}</h3>
                <ul className="mt-4 space-y-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#5a6060]">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${card.tone === 'accent' ? 'bg-[#ff6a3d]' : 'bg-[#d0c9bf]'}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold leading-6 ${
                  card.tone === 'accent'
                    ? 'bg-[#ff6a3d] text-white'
                    : 'bg-[#f4efe8] text-[#5a6060]'
                }`}>
                  {card.result}
                </p>
              </article>
            ))}
            <p className="rounded-xl bg-[#ebe5dd] p-5 text-sm leading-6 text-[#5a6060]">
              Поэтому антистресс-маскот лучше работает для событий, промо-наборов и подарков партнёрам: он не просто
              передаёт логотип, а остаётся рядом с человеком.
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-[#ebe5dd] p-6 text-base text-[#5a6060]">
            <span className="font-bold text-[#ff6a3d]">Вывод:</span> бренд-объект
            остаётся на столе неделями — каждый раз это контакт с вашим брендом без дополнительных вложений.
          </div>
        </Container>
      </section>

      <section id="why_it_works" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Почему это работает</SectionLabel>
          <div className="max-w-[760px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Физический предмет запоминается иначе, чем картинка или письмо
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyCards.map((card) => (
              <article
                key={card.number}
                className="bg-white border border-[#e5e0d8] rounded-xl p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <p className="text-[2rem] md:text-[3rem] font-bold leading-none tracking-[-0.02em] text-[#ff6a3d]">
                  {card.number}
                </p>
                <h3 className="mt-6 text-2xl font-semibold leading-8 text-[#151716]">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#5a6060]">{card.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="texture" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-[540px]">
              <SectionLabel>Материал</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                ПУ-пена — материал, который работает.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Мягкий пенополиуретан с бархатистым покрытием — сжимается, возвращает форму, держит цвет годами. Подбирается под длительное использование и аккуратную передачу деталей бренда.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">
                Антистресс из ПУ-пены
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-[#7c847d]">
                {[
                  'Покрытие: бархатистый полиуретан',
                  'Наполнитель: медленно восстанавливающаяся пена',
                  'Сжимается и возвращает форму — тактильный антистресс',
                  'Долговечность: 3+ года активного использования',
                ].map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7c847d]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">
                Плюшевые игрушки
              </p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-[#7c847d]">
                {[
                  'Материал: мягкий плюшевый ворс',
                  'Наполнитель: гипоаллергенный холлофайбер',
                  'Высокая воспринимаемая ценность — premium-подарок',
                  'Вышивка или принт логотипа на поверхности',
                ].map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7c847d]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-[#7c847d]/70">
                Без латекса
              </p>
            </div>

            {/* Видео сжатия доказывает «сжимается и возвращает форму» — две статичные
                картинки этого показать не могут. Рядом остаётся текстура ворса плюша. */}
            <div className="grid grid-cols-2 gap-4 h-full min-h-[200px] md:min-h-[400px]">
              <ProcessMedia
                src="/videos/pu-squeeze.mp4"
                poster="/videos/pu-squeeze-poster.webp"
                width={540}
                height={960}
                alt="Рука сжимает ПУ-антистресс, пена возвращает форму"
                className="relative h-full overflow-hidden rounded-xl"
                mediaClassName="h-full w-full object-cover"
                captionClassName="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-1.5 text-[11px] leading-4 text-white/85"
              />
              <img
                src="/images/texture/plush-texture-1.webp"
                alt="Плюшевый ворс крупным планом — материал мягкой игрушки"
                className="w-full h-full object-cover rounded-xl"
                loading="lazy"
                width={1200}
                height={900}
              />
            </div>
          </div>
        </Container>
      </section>


      <section id="final_cta" className="bg-canvas py-sec-m md:py-sec-t xl:py-sec-d">
        <Container>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="max-w-measure">
              <h2 className="text-h2-m font-bold text-ink md:text-h2-t xl:text-h2-d">
                Рассчитаем игрушку под вашу задачу
              </h2>
              <p className="mt-6 text-body-lg text-muted">
                Расскажите о задаче и тираже. Мы уточним детали и подготовим расчёт.
              </p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-body font-semibold text-ink">Что будет после заявки</p>
                <ol className="mt-4 space-y-4">
                  {afterRequestSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-3 text-body text-muted">
                      <span className="font-semibold text-accent-deep">{index + 1}.</span>
                      <span><strong className="font-semibold text-ink">{step.title}.</strong> {step.body}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div id="lead_form" className="scroll-mt-24 border border-line bg-surface p-5 md:p-8">
              <div className="mb-6 border-b border-line pb-6">
                <p className="text-body font-semibold text-ink">Удобнее написать напрямую?</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer"
                    onClick={() => handleContactClick('telegram', 'form_contact')}
                    className="inline-flex min-h-11 items-center justify-center border border-line px-4 text-caption font-semibold text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    Telegram
                  </a>
                  <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer"
                    onClick={() => handleContactClick('max', 'form_contact')}
                    className="inline-flex min-h-11 items-center justify-center border border-line px-4 text-caption font-semibold text-ink hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    MAX
                  </a>
                </div>
              </div>

              <div role="status" aria-live="polite" aria-atomic="true">
                {isSubmitted ? (
                  <div className="space-y-4 text-body text-ink">
                    <h3 className="text-body-lg font-semibold">Заявка принята</h3>
                    <p>Мы получили данные, уточним детали задачи и подготовим расчёт.</p>
                  </div>
                ) : submitError ? (
                  <div className="space-y-4 text-body text-ink">
                    <h3 className="text-body-lg font-semibold">Не удалось отправить заявку</h3>
                    <p>Произошла техническая ошибка. Проверьте соединение и попробуйте снова.</p>
                    <button type="button" onClick={() => setSubmitError(false)}
                      className="min-h-11 font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                      Вернуться к форме
                    </button>
                  </div>
                ) : null}
              </div>

              {!isSubmitted && !submitError && (
                <form className="space-y-5" onSubmit={handleSubmit} noValidate
                  onFocusCapture={() => setFormHasFocus(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setFormHasFocus(false)
                  }}>
                  <div>
                    <label htmlFor="lead-name" className="mb-2 block text-caption font-semibold text-ink">Имя</label>
                    <input id="lead-name" type="text" name="name" required value={formValues.name} onChange={handleInputChange}
                      aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'lead-name-error' : undefined}
                      className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      placeholder="Ваше имя" />
                    {fieldErrors.name && <p id="lead-name-error" className="mt-1 text-caption text-accent-deep">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-company" className="mb-2 block text-caption font-semibold text-ink">Компания</label>
                    <input id="lead-company" type="text" name="company" required value={formValues.company} onChange={handleInputChange}
                      aria-invalid={Boolean(fieldErrors.company)} aria-describedby={fieldErrors.company ? 'lead-company-error' : undefined}
                      className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      placeholder="Название компании" />
                    {fieldErrors.company && <p id="lead-company-error" className="mt-1 text-caption text-accent-deep">{fieldErrors.company}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-email" className="mb-2 block text-caption font-semibold text-ink">Email</label>
                    <input id="lead-email" type="email" name="email" required value={formValues.email} onChange={handleInputChange}
                      aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'lead-email-error' : undefined}
                      className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      placeholder="name@company.com" />
                    {fieldErrors.email && <p id="lead-email-error" className="mt-1 text-caption text-accent-deep">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="lead-task" className="mb-2 block text-caption font-semibold text-ink">Опишите задачу</label>
                    <textarea id="lead-task" name="task" rows="4" value={formValues.task} onChange={handleInputChange}
                      className="w-full border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                      placeholder="Какая игрушка нужна и для чего?" />
                  </div>

                  <details className="border border-line p-4">
                    <summary className="cursor-pointer text-caption font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Файлы и детали заказа — необязательно</summary>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <fieldset className="sm:col-span-2">
                        <legend className="mb-2 text-caption font-semibold text-ink">Как удобнее передать логотип или референсы?</legend>
                        <div className="grid gap-2">
                          {assetDeliveryOptions.map((option) => (
                            <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-2 text-body text-ink">
                              <input type="radio" name="assetDelivery" value={option.value}
                                checked={formValues.assetDelivery === option.value} onChange={handleInputChange}
                                className="h-4 w-4 accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <p className="mt-2 text-caption text-muted">Если материалов пока нет, пропустите этот блок.</p>
                      </fieldset>
                      <div>
                        <label htmlFor="quantity" className="mb-2 block text-caption font-semibold text-ink">Примерный тираж</label>
                        <input id="quantity" name="quantity" type="text" value={formValues.quantity} onChange={handleInputChange}
                          className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-caption font-semibold text-ink">Телефон</label>
                        <input id="phone" name="phone" type="tel" value={formValues.phone} onChange={handleInputChange}
                          className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="reference" className="mb-2 block text-caption font-semibold text-ink">Ссылка / референс</label>
                        <input id="reference" name="reference" type="url" value={formValues.reference} onChange={handleInputChange}
                          aria-invalid={Boolean(fieldErrors.reference)} aria-describedby={fieldErrors.reference ? 'lead-reference-error' : undefined}
                          className="w-full min-h-11 border border-line bg-canvas px-4 py-3 text-body text-ink placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" />
                        {fieldErrors.reference && <p id="lead-reference-error" className="mt-1 text-caption text-accent-deep">{fieldErrors.reference}</p>}
                      </div>
                    </div>
                  </details>

                  <div>
                    <label className="flex min-h-11 cursor-pointer items-start gap-3 text-caption text-muted">
                      <input type="checkbox" name="consent" required
                        onChange={() => setFieldErrors((current) => ({ ...current, consent: undefined }))}
                        aria-invalid={Boolean(fieldErrors.consent)}
                        aria-describedby={fieldErrors.consent ? 'lead-consent-error' : undefined}
                        className="mt-1 h-4 w-4 shrink-0 accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" />
                      <span>Я согласен на обработку персональных данных в соответствии с <Link to="/privacy" className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">политикой конфиденциальности</Link></span>
                    </label>
                    {fieldErrors.consent && <p id="lead-consent-error" className="mt-1 text-caption text-accent-deep">{fieldErrors.consent}</p>}
                  </div>
                  <button type="submit"
                    className="inline-flex min-h-11 w-full items-center justify-center bg-accent px-6 py-3 text-body font-semibold text-ink hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                    Получить расчёт
                  </button>
                  <p className="text-caption text-muted">После отправки мы уточним детали задачи и подготовим расчёт.</p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CrossNav variant="antistress" />

      <footer
        id="footer"
        className="border-t border-line bg-surface pb-32 pt-10 text-caption text-muted md:pb-10"
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.8fr_1.1fr] md:items-start">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/logo-bear-144.webp" alt="DeStressToys" width={36} height={36} className="h-9 w-auto" />
                <span className="text-body-lg font-bold text-ink">DeStressToys</span>
              </div>
              <p className="mt-4 max-w-[320px] leading-6">
                Брендированные мягкие игрушки и антистресс-объекты для корпоративных подарков, событий и промо-наборов.
              </p>
              <p className="mt-4">© 2026 DeStressToys</p>
            </div>

            <nav className="flex flex-col gap-3">
              <p className="font-semibold text-ink">Разделы</p>
              <a href="#gallery" className="hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">Работы</a>
              <a href="#pricing" className="hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">Цены</a>
              <a href="#process" className="hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">Процесс</a>
              <a href="#faq" className="hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">FAQ</a>
              <Link className="hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink" to="/privacy">
                Политика конфиденциальности
              </Link>
            </nav>

            <div>
              <p className="font-semibold text-ink">Контакты</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'footer')} className="text-body font-semibold text-ink hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">
                  {CONTACT_PHONE}
                </a>
                <a href="#" onClick={(event) => handleEmailCopy(event, 'footer')} className="text-body font-medium text-ink hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">
                  {CONTACT_EMAIL}
                </a>
                <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('telegram', 'footer')} className="text-body font-medium text-ink hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">
                  Telegram
                </a>
                <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('max', 'footer')} className="text-body font-medium text-ink hover:text-accent-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">
                  MAX
                </a>
                <span>{RESPONSE_HOURS}</span>
                <span>{COMPANY_CITY}</span>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <p>{LEGAL_NAME}</p>
                <p>{LEGAL_ID}</p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
      <CookieBanner />
      {!mobileMenuOpen && !formHasFocus && !formInView && (
        <div
          className="fixed inset-x-0 z-40 border-t border-line bg-surface md:hidden"
          style={{ bottom: 'var(--cookie-banner-h, 0px)' }}
        >
          <Container>
            <div className="flex gap-2 py-3">
              <a href="#category_choice" onClick={() => handleCtaClick('sticky_cta', 'category_choice')}
                className="inline-flex min-h-11 flex-1 items-center justify-center bg-accent px-3 text-caption font-semibold text-ink hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Рассчитать
              </a>
              <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer"
                onClick={() => handleContactClick('telegram', 'sticky_cta')}
                className="inline-flex min-h-11 items-center justify-center border border-line px-3 text-caption font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                Telegram
              </a>
              <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer"
                onClick={() => handleContactClick('max', 'sticky_cta')}
                className="inline-flex min-h-11 items-center justify-center border border-line px-3 text-caption font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                MAX
              </a>
            </div>
            <div aria-hidden="true" style={{ height: 'env(safe-area-inset-bottom)' }} />
          </Container>
        </div>
      )}
    </main>
  )
}
