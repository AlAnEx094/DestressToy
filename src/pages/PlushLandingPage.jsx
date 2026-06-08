import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import CrossNav from '../components/CrossNav.jsx'
import StickyProductTab from '../components/StickyProductTab.jsx'
import CookieBanner from '../components/CookieBanner.jsx'

const stageItems = [
  { src: '/images/hero-stage/plush_bear.webp',   alt: 'Плюшевый медведь-маскот с логотипом — корпоративный подарок на заказ', size: 250, x: 20, y: 26, z: 3, delay: '0.2s', float: '4.0s' },
  { src: '/images/hero-stage/plush_rabbit.webp', alt: 'Плюшевый кролик — кастомный мягкий маскот для брендинга', size: 155, x: 2, y: 6, z: 2, delay: '0.6s', float: '4.4s' },
  { src: '/images/hero-stage/plush_fox.webp',    alt: 'Плюшевый кибер-лис — кастомный мягкий маскот для IT-брендинга', size: 180, x: 58, y: 55, z: 2, delay: '0.9s', float: '3.5s' },
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
          background: 'radial-gradient(circle, rgba(155,123,232,0.18) 0%, transparent 70%)',
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
  { label: 'Форматы', href: '#formats' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Процесс', href: '#process' },
  { label: 'Отзывы', href: '#reviews' },
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
  { label: 'Медведь · корпоративные подарки', title: 'Плюшевый медведь', body: 'Классический мягкий медведь с фирменной вышивкой логотипа. Подходит для подарков сотрудникам, партнёрам и клиентам.', image: '/images/gallery/plush_bear.webp', alt: 'Плюшевый медведь с вышивкой логотипа — кастомный мягкий маскот для корпоративных подарков' },
  { label: 'Кролик · маскот бренда', title: 'Плюшевый кролик', body: 'Мягкий кролик с детализированными ушами — универсальный маскот для брендов, ориентированных на тепло и заботу.', image: '/images/gallery/plush_rabbit.webp', alt: 'Плюшевый кролик — кастомный мягкий маскот для брендинга и корпоративных подарков' },
  { label: 'Лис · IT и digital', title: 'Кибер-лис', body: 'Технологичный персонаж в фирменных цветах. Подходит для IT, стартапов и digital-команд с характером.', image: '/images/gallery/plush_fox.webp', alt: 'Кибер-лис — плюшевый кастомный маскот для IT-компании и технологичного бренда' },
  { label: 'Облачко · wellness и HR', title: 'Облачко', body: 'Мягкое облако с добрым лицом — для HR-программ, wellness-инициатив и заботливых корпоративных подарков.', image: '/images/gallery/plush_cloud.webp', alt: 'Плюшевое облачко — кастомный мягкий маскот для HR и wellness-программ' },
  { label: 'Осьминог · события и стенды', title: 'Осьминог', body: 'Яркий многорукий персонаж для event-стендов и раздатки. Высокая тактильность и узнаваемость — запоминается с первого раза.', image: '/images/gallery/plush_octopus.webp', alt: 'Плюшевый осьминог — кастомный мягкий маскот для выставок и промо-мероприятий' },
  { label: 'Ракета · запуски и спецпроекты', title: 'Ракета', body: 'Яркий футуристичный персонаж для запусков продуктов, конференций и брендов с амбициями.', image: '/images/gallery/plush_rocket.webp', alt: 'Плюшевая ракета — кастомный мягкий маскот для запусков и технологичных брендов' },
]

const pricingTiers = [
  { qty: 'от 300 шт', price: 'от 1 500 ₽', perUnit: 'за штуку' },
  { qty: 'от 500 шт', price: '1 200 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 000 шт', price: '1 000 ₽', perUnit: 'за штуку' },
  { qty: 'от 2 000 шт', price: '850 ₽', perUnit: 'за штуку' },
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

const useCases = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Онбординг сотрудников',
    body: 'Регулярный заказ — под каждый поток новичков. Игрушка уходит домой к детям сотрудника, бренд живёт в семье.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Корпоративные подарки',
    body: 'К юбилею компании, закрытию проекта или корпоративным датам. Плюш не выбрасывают — его дарят дальше.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Маскот бренда',
    body: 'FMCG, ритейл, банки с персонажем. Физический объект из любимого героя — для промо и детских активаций.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    title: 'Подарок к покупке',
    body: 'Игрушка к покупке увеличивает средний чек и возвращает клиента. Работает в ритейле, аптеках, F&B.',
  },
]

const productFormats = [
  {
    emoji: '🧸',
    num: '01',
    title: 'Маскот бренда',
    body: 'Плюшевый персонаж с вышивкой логотипа. Кастомная форма под героя бренда или готовый силуэт.',
    fit: 'Когда у бренда есть персонаж — или он нужен.',
  },
  {
    emoji: '🎓',
    num: '02',
    title: 'Онбординг-подарок',
    body: 'Мягкая игрушка в welcome kit для нового сотрудника. Уходит домой и остаётся в семье.',
    fit: 'Для HR-команд, которые хотят тёплый первый день, а не стандартный пакет.',
  },
  {
    emoji: '🛍️',
    num: '03',
    title: 'Подарок к покупке',
    body: 'Плюш как подарок к покупке — для ретейла, FMCG и банков с маскотом.',
    fit: 'Когда подарок должен увеличить средний чек и остаться у клиента дома.',
  },
  {
    emoji: '🎁',
    num: '04',
    title: 'Корпоративный подарок',
    body: 'Брендированная игрушка для команды, партнёров или ключевых клиентов.',
    fit: 'На НГ, день компании или юбилей — подарок, который не убирают в ящик.',
  },
  {
    emoji: '🎨',
    num: '05',
    title: 'Игрушка-персонаж',
    body: 'Кастомный герой по иллюстрации, рекламной кампании или продукту бренда.',
    fit: 'Для запусков, спецпроектов и брендов с выраженным характером.',
  },
  {
    emoji: '✦',
    num: '06',
    title: 'Подарок клиентам',
    body: 'Плюш вместо ручек и кружек — тактильный объект с эмоциональной ценностью.',
    fit: 'Для брендов, где важна долгосрочная связь с клиентом.',
  },
]

const reviews = [
  {
    name: 'Анна С.',
    role: 'HR-менеджер, розничная сеть',
    city: 'Москва',
    text: 'Делали игрушки для подарков сотрудникам. Важно было, чтобы выглядело не как детский сувенир, а аккуратно и в фирменных цветах. Обсудили форму, поправили детали, итог приняли спокойно.',
    qty: '300 шт',
    type: 'Подарки сотрудникам',
  },
  {
    name: 'Екатерина В.',
    role: 'HR-директор, IT-компания',
    city: 'Санкт-Петербург',
    text: 'Заказали плюшевых мишек для онбординг-кита. 300 штук, три волны по 100. Сотрудники берут домой детям — нам это и нужно было, чтоб бренд жил вне офиса. Качество вышивки проверили на образце, всё держится.',
    qty: '300 шт',
    type: 'Онбординг',
  },
  {
    name: 'Михаил С.',
    role: 'Бренд-менеджер, ретейл-сеть',
    city: 'Москва',
    text: 'Делали партию к 10-летию сети — 200 зайцев с вышивкой логотипа, в крафт-коробке с лентой. Раздавали партнёрам. Несколько написали потом: дети уже не отдают.',
    qty: '300 шт',
    type: 'Корпоративный подарок',
  },
  {
    name: 'Ирина Н.',
    role: 'Менеджер по маркетингу, FMCG',
    city: 'Екатеринбург',
    text: 'Нужен был подарок для постоянных клиентов, без ощущения дешёвой раздатки. Понравилось, что до расчёта проговорили ограничения и не обещали невозможного.',
    qty: '500 шт',
    type: 'Подарки клиентам',
  },
]

const faqItems = [
  {
    q: 'Какой минимальный тираж?',
    a: 'От 300 штук. При тираже от 500 шт доступны дополнительные скидки.',
  },
  {
    q: 'Из чего делают объекты?',
    a: 'Классический плюш с мягким ворсом и гипоаллергенным наполнителем. Вышивка или термоперенос логотипа на поверхности. Если нужен антистресс из ПУ-пены — смотрите раздел антистресс-маскотов.',
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
    a: 'Ориентировочные цены: от 1 200 ₽/шт при тираже 500 шт, от 1 000 ₽/шт при 1 000 шт, от 850 ₽/шт при 2 000 шт. Точная стоимость зависит от формы и сложности — пришлём расчёт после заявки.',
  },
  {
    q: 'Где производятся игрушки?',
    a: 'На фабрике в Китае. Китайские производители специализируются на производстве мягких игрушек — это их основная компетенция, а не побочный продукт. Это позволяет делать тираж от 300 штук и выдерживать понятные производственные сроки.',
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
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20 ${className}`}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.06em] text-[#9b7be8]">
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
      className={`inline-flex items-center justify-center rounded-md bg-[#9b7be8] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#8469d0] ${className}`}
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
      className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/12 text-[#dfe5df] transition-colors hover:border-[#9b7be8]/70 hover:bg-white/5 hover:text-white"
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
  const [formValues, setFormValues] = useState(formDefaults)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
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
    const ctaSection = document.getElementById('final_cta')
    let ctaVisible = false

    const observer = new IntersectionObserver(
      ([entry]) => { ctaVisible = entry.isIntersecting },
      { threshold: 0.05 }
    )
    if (ctaSection) observer.observe(ctaSection)

    const onScroll = () => {
      const scrolled = window.scrollY
      setShowStickyCta(scrolled > window.innerHeight * 0.5 && !ctaVisible)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
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
      product_type: 'plush',
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
      product_type: 'plush',
      ...utmRef.current,
    })

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      trackEvent('lead_form_success', { lead_id: leadId, product: 'plush', ...utmRef.current })
      trackEvent('plush_lead_form_success', {
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
    <main className="bg-[#151716] text-[#151716]">
      <header
        id="header"
        className="sticky top-0 z-50 border-b border-white/10 bg-[#151716]"
      >
        <Container className="relative">
          <div className="flex h-16 items-center justify-between gap-4">
            <a
              href="#hero"
              className="flex shrink-0 items-center gap-2.5"
            >
              <img src="/logo-bear.webp" alt="DeStressToys" className="h-9 w-auto" />
              <span className="text-xl font-bold text-white tracking-tight">DeStressToys</span>
            </a>

            <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[14px] font-medium text-[#7c847d] transition-colors hover:text-white"
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
                href="#lead_form"
                onClick={() => handleCtaClick('header', 'pricing')}
                className="inline-flex items-center justify-center rounded-md bg-[#9b7be8] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8469d0]"
              >
                Получить расчёт
              </a>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-white/35 md:hidden"
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
              className="absolute inset-x-5 top-[72px] rounded-[12px] border border-white/10 bg-[#151716] p-4 md:hidden"
            >
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 border-t border-white/10 pt-4">
                  <p className="text-sm text-[#7c847d]">Связаться напрямую</p>
                  <div className="mt-3 flex flex-col gap-2">
                    <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'mobile_menu')} className="text-base font-semibold text-white">
                      {CONTACT_PHONE}
                    </a>
                    <a href="#" onClick={(event) => handleEmailCopy(event, 'mobile_menu')} className="text-base font-medium text-white">
                      {CONTACT_EMAIL}
                    </a>
                    <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('telegram', 'mobile_menu')} className="text-base font-medium text-white">
                      Telegram
                    </a>
                    <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('max', 'mobile_menu')} className="text-base font-medium text-white">
                      MAX
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-[#7c847d]">Ответим с {RESPONSE_HOURS}</p>
                </div>
                <PrimaryButton
                  href="#lead_form"
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

      <StickyProductTab variant="plush" />

      <section id="hero" className="bg-[#151716] flex flex-col min-h-[85vh] md:min-h-screen">
        <Container className="w-full flex-1 flex items-center py-14 md:py-16 xl:py-24">
          <div className="grid w-full items-stretch gap-10 md:grid-cols-[1.2fr_0.95fr] md:gap-16">
            <div className="flex flex-col justify-center">
              <SectionLabel>Мягкие игрушки · тираж от 300 шт</SectionLabel>
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-white">
                Мягкая игрушка с характером вашего бренда
              </h1>
              <p className="mt-5 max-w-[520px] text-base sm:text-lg leading-7 sm:leading-8 text-[#7c847d]">
                HR-менеджеры заказывают для онбординга и подарков сотрудникам. Ретейл и банки — как gift-with-purchase и маскот бренда. Тираж от 300 шт.
              </p>

              <div className="mt-8 md:mt-10">
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton href="#lead_form" onClick={() => handleCtaClick('hero', 'pricing')}>Получить расчёт</PrimaryButton>
                  <a
                    href="#formats"
                    onClick={() => handleCtaClick('hero', 'formats')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Смотреть форматы →
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                  {['Тираж от 300 шт', 'Концепт за 2 часа', 'Договор перед запуском'].map((p, i) => (
                    <span key={i} className="text-sm text-[#7c847d] flex items-center gap-2">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-[#7c847d] inline-block" />}
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile toy strip */}
            <div className="flex md:hidden items-end justify-center gap-6 pt-2 pb-6 relative">
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(155,123,232,0.15) 0%, transparent 70%)'}} />
              <img src="/images/hero-stage/plush_rabbit.webp" alt="" fetchPriority="high" className="w-20 object-contain relative" style={{filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.5))', animation: 'stageFLoat 4.4s ease-in-out 0.6s infinite'}} />
              <img src="/images/hero-stage/plush_bear.webp"   alt="" fetchPriority="high" className="w-32 object-contain relative" style={{filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.5))', animation: 'stageFLoat 4.0s ease-in-out 0.2s infinite'}} />
              <img src="/images/hero-stage/plush_fox.webp"    alt="" fetchPriority="high" className="w-20 object-contain relative" style={{filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.5))', animation: 'stageFLoat 3.8s ease-in-out 0s infinite'}} />
            </div>

            <div className="hidden md:block w-full md:min-h-[600px] lg:min-h-[680px]">
              <ProductStage />
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

          <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item, index) => (
              <article
                key={item.label}
                className={`overflow-hidden rounded-xl border border-[#e5e0d8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]${index >= 4 ? ' hidden md:block' : ''}`}
              >
                <div className="w-full aspect-[5/4] bg-[#f4efe8]">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-4 md:p-6">
                  <p className="mb-1 text-xs uppercase tracking-widest text-[#9b7be8]">
                    {item.label}
                  </p>
                  <h3 className="text-base md:text-xl font-bold text-[#151716]">{item.title}</h3>
                  <p className="mt-1 hidden md:block text-sm leading-relaxed text-[#5a6060]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="production" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Производство</SectionLabel>
          <div className="max-w-[760px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Как производятся ваши игрушки
            </h2>
            <p className="mt-4 text-base leading-7 text-[#dfe5df]">
              Фабрика занимается исключительно мягкими игрушками — узкая специализация даёт стабильное качество и предсказуемые сроки. Каждая партия проходит контроль на соответствие согласованному образцу. Тираж от 300 штук.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/factory-hall.webp"
                alt="Специализированная фабрика мягких игрушек — более 200 сотрудников, собственный цех"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#9b7be8]">
                  Специализация
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Специализированное производство — более 200 сотрудников. Тираж от 200 до 50 000 шт.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/sewing-shop.webp"
                alt="Швейный цех фабрики мягких игрушек — ручная сборка партии"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#9b7be8]">
                  Ручная сборка
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Каждая игрушка шьётся вручную — единообразие партии гарантировано.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/5">
              <img
                src="/images/production/quality-control.webp"
                alt="Входной контроль качества на фабрике мягких игрушек — проверка перед отгрузкой"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="p-4">
                <p className="mb-1 text-xs uppercase tracking-widest text-[#9b7be8]">
                  Контроль качества
                </p>
                <p className="text-sm leading-6 text-[#dfe5df]">
                  Входной контроль качества — каждая партия проходит проверку перед отгрузкой.
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

      <section id="formats" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Форматы</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Что можно изготовить под ваш бренд
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5a6060]">
              Начинаем не с материала, а с задачи: кому вручаете, где игрушка будет работать и какой образ должен остаться у клиента или сотрудника.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {productFormats.map((format) => (
              <article
                key={format.title}
                className="group relative overflow-hidden rounded-xl border border-[#e5e0d8] bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <span className="pointer-events-none absolute right-4 top-2 select-none text-[4rem] font-black leading-none text-[#f4efe8] transition-colors group-hover:text-[#ffe8df]">
                  {format.num}
                </span>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff5f2] text-xl">
                  {format.emoji}
                </div>
                <h3 className="text-lg font-bold leading-6 text-[#151716]">{format.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5a6060]">{format.body}</p>
                <p className="mt-4 inline-block rounded-full border border-[#9b7be8]/30 px-3 py-1 text-xs leading-5 text-[#9b7be8]">
                  {format.fit}
                </p>
              </article>
            ))}
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
              Точная стоимость зависит от формы и сложности. Цены указаны для стандартных форм.
            </p>
          </div>

          <p className="mt-4 text-sm text-[#7c847d]">Классическая мягкая игрушка. Плюшевый ворс. Вышивка логотипа.</p>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {pricingTiers.map((tier) => (
              <div
                key={tier.qty}
                className={`rounded-xl border p-5 text-center relative ${tier.qty === 'от 500 шт' ? 'border-[#9b7be8] bg-white/10' : 'border-white/10 bg-white/5'}`}
              >
                {tier.qty === 'от 500 шт' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#9b7be8] px-3 py-0.5 text-xs font-bold text-white whitespace-nowrap">
                    Популярный
                  </span>
                )}
                <p className="text-sm text-[#7c847d]">{tier.qty}</p>
                <p className="mt-2 text-[2rem] font-bold leading-none text-[#9b7be8]">{tier.price}</p>
                <p className="mt-1 text-xs text-[#7c847d]">{tier.perUnit}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-white/50">
            * Цена тиража 300 шт зависит от формы и вышивки — уточним при расчёте
          </p>

          <p className="mt-4 text-xs text-[#7c847d]">Итоговая цена зависит от формы и комплектации. Точный расчёт — после заявки.</p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7c847d]">
            <span><span className="text-[#9b7be8]">✓</span> Разработка выкройки под ваш бренд</span>
            <span><span className="text-[#9b7be8]">✓</span> Производство тиража</span>
            <span><span className="text-[#9b7be8]">✓</span> Упаковка</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
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
            className="inline-flex w-full items-center justify-center rounded-md bg-[#9b7be8] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#8469d0]"
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

      <section id="use_cases" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Где используют</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Плюш покупают не как мерч — как подарок
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 xl:grid-cols-4">
            {useCases.map((item) => (
              <article
                key={item.title}
                className="rounded-[12px] border border-[#e5e0d8] bg-white p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[10px] md:rounded-[12px] bg-[#ebe5dd] text-[#151716] ring-1 ring-inset ring-[#d0c9bf]">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base md:text-2xl font-semibold leading-6 md:leading-8 text-[#151716]">
                  {item.title}
                </h3>
                <p className="mt-2 md:mt-4 text-sm md:text-base leading-6 md:leading-7 text-[#5a6060]">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Процесс</SectionLabel>
          <div className="max-w-[620px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              От заявки до готового объекта
            </h2>
          </div>

          <div className="relative mt-8 md:mt-10">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step) => (
                <article key={step.number} className="relative min-w-0">
                  <p className="text-[1.75rem] lg:text-[3rem] font-bold leading-none tracking-[-0.02em] text-[#9b7be8]">
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
          </div>
        </Container>
      </section>

      <section id="brand_gifts" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid items-center gap-8 md:gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
            <div className="order-2 md:order-1 max-w-[520px]">
              <SectionLabel>Корпоративные подарки</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
                Плюш уходит домой — бренд остаётся в семье
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#5a6060]">
                HR заказывают под каждый поток новичков. Ретейл и банки — как gift-with-purchase и маскот бренда. Игрушку не убирают в ящик — она живёт на полке или едет домой к ребёнку.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Онбординг', 'Маскот бренда', 'Подарок к покупке', 'Подарки команде'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded px-3.5 py-1.5 text-sm text-[#5a6060] ring-1 ring-inset ring-[#d0c9bf]"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <PrimaryButton href="#lead_form" onClick={() => handleCtaClick('process', 'pricing')} className="mt-8">
                Получить расчёт
              </PrimaryButton>
            </div>

            <div className="order-1 md:order-2 min-h-[260px] md:min-h-[420px] grid grid-cols-2 gap-3 content-center">
              <img
                src="/images/gallery/plush-brand-1.webp"
                alt="Плюшевый корпоративный подарок с логотипом — кастомный маскот на заказ"
                className="w-full aspect-square rounded-xl object-cover"
                loading="lazy"
              />
              <img
                src="/images/gallery/plush-brand-2.webp"
                alt="Мягкая игрушка с вышивкой логотипа — корпоративный подарок DeStressToys"
                className="w-full aspect-square rounded-xl object-cover"
                loading="lazy"
              />
              <img
                src="/images/gallery/plush-brand-3.webp"
                alt="Кастомная плюшевая игрушка для HR и онбординга"
                className="w-full aspect-square rounded-xl object-cover"
                loading="lazy"
              />
              <img
                src="/images/gallery/plush-brand-4.webp"
                alt="Фирменный плюшевый маскот — бренд остаётся в семье"
                className="w-full aspect-square rounded-xl object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="reviews" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Отзывы</SectionLabel>
          <div className="max-w-[680px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Что говорят клиенты
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-xl border border-[#e5e0d8] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]">
                <p className="text-[#9b7be8] text-base">{review.rating || '★★★★★'}</p>
                <p className="mt-3 text-base leading-7 text-[#151716]">«{review.text}»</p>
                <div className="mt-5 pt-4 border-t border-[#e5e0d8]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9b7be8]/15 text-sm font-bold text-[#9b7be8]">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#151716]">{review.name}</p>
                      <p className="text-sm text-[#7c847d]">{review.role} · {review.city}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md bg-[#f4efe8] px-2.5 py-1 text-xs font-medium text-[#5a6060]">{review.qty}</span>
                    <span className="rounded-md bg-[#f4efe8] px-2.5 py-1 text-xs font-medium text-[#5a6060]">{review.type}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="trust" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Почему нам доверяют</SectionLabel>
          <h2 className="text-[1.75rem] md:text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716] max-w-[600px]">
            Работаем с HR, ретейлом, FMCG и банками
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-6 xl:gap-4">
            {[
              { title: 'Мин. тираж', value: 'от 300 шт' },
              { title: 'Расчёт', value: 'за 1 день' },
              { title: 'Договор', value: 'до старта' },
              { title: 'Производство', value: '~15 дней' },
              { title: 'Доставка', value: '25–30 дней' },
              { title: 'Контроль', value: 'фото + видео' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[#e5e0d8] bg-white p-4 text-center shadow-[0_4px_16px_rgba(0,0,0,0.05)]">
                <p className="text-2xl font-bold leading-none text-[#9b7be8]">{item.value}</p>
                <p className="mt-2 text-xs leading-4 text-[#5a6060]">{item.title}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {['HR и онбординг', 'Ретейл и FMCG', 'Банки и финтех', 'Потребительские бренды', 'IT и SaaS', 'Корпоративные подарки'].map((sector) => (
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
                      <span className="text-2xl leading-none text-[#9b7be8]">
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
                      className={`px-5 py-4 text-left font-semibold ${index === comparisonCols.length - 1 ? 'bg-[#9b7be8]/10 font-bold text-[#9b7be8] border-t-2 border-[#9b7be8]' : ''}`}
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
                        className={`px-5 py-4 text-sm ${index === row.values.length - 1 ? 'bg-[#9b7be8]/8' : 'text-[#5a6060]'}`}
                      >
                        {index === row.values.length - 1 ? (
                          <span className="inline-flex items-center rounded-full bg-[#9b7be8] px-3 py-0.5 text-xs font-bold text-white">
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
                    ? 'border-[#9b7be8] bg-white shadow-[0_18px_34px_rgba(155,123,232,0.14)]'
                    : 'border-[#e5e0d8] bg-white'
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${card.tone === 'accent' ? 'text-[#9b7be8]' : 'text-[#7c847d]'}`}>
                  {card.subtitle}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-7 text-[#151716]">{card.title}</h3>
                <ul className="mt-4 space-y-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-[#5a6060]">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${card.tone === 'accent' ? 'bg-[#9b7be8]' : 'bg-[#d0c9bf]'}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold leading-6 ${
                  card.tone === 'accent'
                    ? 'bg-[#9b7be8] text-white'
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
            <span className="font-bold text-[#9b7be8]">Вывод:</span> бренд-объект
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
                <p className="text-[2rem] md:text-[3rem] font-bold leading-none tracking-[-0.02em] text-[#9b7be8]">
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

      <section id="texture" className="hidden md:block bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-[540px]">
              <SectionLabel>Материал</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Плюш — мягкость в каждой детали.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Мягкий ворс, гипоаллергенный наполнитель и вышитый логотип. Игрушка, которую приятно держать — и которую не убирают в ящик.
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#7c847d]">
                {[
                  'Внешний слой: мягкий плюшевый ворс',
                  'Наполнитель: гипоаллергенный холлофайбер',
                  'Логотип: вышивка или термоперенос',
                  'Высокая воспринимаемая ценность — premium-подарок',
                  'Долговечность: годы использования без потери формы',
                  'Без латекса',
                ].map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9b7be8]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full min-h-[200px] md:min-h-[400px]">
              <img src="/images/texture/plush-texture-1.webp" alt="Текстура плюшевого материала крупным планом — мягкий ворс и вышивка логотипа" className="w-full h-full object-cover rounded-xl" loading="lazy" />
              <img src="/images/texture/plush-texture-2.webp" alt="Плюшевая игрушка с вышитым логотипом — качество пошива DeStressToys" className="w-full h-full object-cover rounded-xl" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>

      <section id="final_cta" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
            <div className="max-w-[420px]">
              <SectionLabel>Связаться</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Рассчитайте стоимость под ваш тираж
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Укажите тираж и задачу — пришлём ориентир по стоимости в течение 1 рабочего дня. Если удобнее, свяжитесь с нами напрямую.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-[#7c847d]">
                {['Ответим с 8:00 до 18:00 по МСК', 'Файлы можно прислать позже', 'Договор перед запуском тиража'].map(
                  (item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#9b7be8]">✓</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <img
                  src="/images/cta/plush-cta.webp"
                  alt="Плюшевая игрушка с логотипом в корпоративной упаковке — кастомный подарок DeStressToys"
                  className="w-full h-[220px] object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-[#7c847d]">
                <p className="font-semibold text-white">Что будет после заявки</p>
                <div className="mt-4 space-y-4">
                  {afterRequestSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9b7be8]/15 text-xs font-bold text-[#9b7be8]">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-white">{step.title}</p>
                        <p className="mt-1 text-xs leading-5 text-[#7c847d]">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div id="lead_form" className="rounded-[12px] border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="mb-6 rounded-md border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm font-medium text-white">Связаться напрямую</p>
                <p className="mt-1 text-sm leading-6 text-[#7c847d]">
                  Отвечаем с {RESPONSE_HOURS}. Для быстрых вопросов удобнее написать в мессенджер.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={TELEGRAM_CONTACT_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleContactClick('telegram', 'form_contact')}
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#9b7be8] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8469d0]"
                  >
                    Написать в Telegram
                  </a>
                  <a
                    href={MAX_CONTACT_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleContactClick('max', 'form_contact')}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                  >
                    Написать в MAX
                  </a>
                </div>
              </div>

              {isSubmitted ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white">
                    Заявка принята! Свяжемся в течение 1 рабочего дня.
                  </h3>
                  <p className="text-base leading-7 text-[#7c847d]">
                    Мы получили ваши данные и подготовим концепт под задачу
                    {formValues.company ? ` для ${formValues.company}` : ''}.
                    Ответ придёт на {formValues.email || 'указанный email'}. Для срочного вопроса можно позвонить по номеру{' '}
                    <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'success_message')} className="text-[#9b7be8] underline">{CONTACT_PHONE}</a>.
                  </p>
                </div>
              ) : submitError ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white">
                    Не удалось отправить заявку
                  </h3>
                  <p className="text-base leading-7 text-[#7c847d]">
                    Произошла техническая ошибка. Позвоните нам напрямую:{' '}
                    <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'error_message')} className="text-[#9b7be8] underline">{CONTACT_PHONE}</a>{' '}
                    или напишите на{' '}
                    <a href="mailto:info@destresstoys.ru" className="text-[#9b7be8] underline">info@destresstoys.ru</a>.
                  </p>
                  <button
                    onClick={() => setSubmitError(false)}
                    className="text-sm text-[#7c847d] underline hover:text-white"
                  >
                    Попробовать снова
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">Имя</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formValues.name}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#9b7be8] focus:ring-2 focus:ring-[#9b7be8]/20"
                      placeholder="Ваше имя"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">
                      Компания
                    </span>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formValues.company}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#9b7be8] focus:ring-2 focus:ring-[#9b7be8]/20"
                      placeholder="Название компании"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formValues.email}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#9b7be8] focus:ring-2 focus:ring-[#9b7be8]/20"
                      placeholder="name@company.com"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">
                      Опишите задачу
                    </span>
                    <textarea
                      name="task"
                      rows="4"
                      value={formValues.task}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#9b7be8] focus:ring-2 focus:ring-[#9b7be8]/20"
                      placeholder="Онбординг, корпоративный подарок или gift-with-purchase? Укажите тираж и аудиторию."
                    />
                  </label>

                  <details className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                    <summary className="cursor-pointer text-sm font-medium text-[#7c847d]">Файлы и детали заказа — необязательно</summary>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <fieldset className="col-span-2">
                        <legend className="block text-sm font-medium text-[#7c847d] mb-2">
                          Как удобнее передать логотип или референсы?
                        </legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {assetDeliveryOptions.map((option) => (
                            <label
                              key={option.value}
                              className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors hover:border-white/25"
                            >
                              <input
                                type="radio"
                                name="assetDelivery"
                                value={option.value}
                                checked={formValues.assetDelivery === option.value}
                                onChange={handleInputChange}
                                className="h-4 w-4 border-white/20 accent-[#9b7be8]"
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#7c847d]">
                          Если материалов пока нет, просто пропустите этот блок.
                        </p>
                      </fieldset>

                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-[#7c847d] mb-1.5">Примерный тираж</label>
                        <input id="quantity" name="quantity" type="text" placeholder="200 / 500 / 1000"
                          value={formValues.quantity}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#9b7be8] focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#7c847d] mb-1.5">Телефон</label>
                        <input id="phone" name="phone" type="tel" placeholder="+7"
                          value={formValues.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#9b7be8] focus:outline-none transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="reference" className="block text-sm font-medium text-[#7c847d] mb-1.5">Ссылка / референс</label>
                        <input id="reference" name="reference" type="url" placeholder="Figma, Drive, сайт"
                          value={formValues.reference}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#9b7be8] focus:outline-none transition-colors" />
                      </div>
                    </div>
                  </details>

                  <label className="flex items-start gap-3 rounded-md bg-white/[0.04] px-4 py-3 text-sm text-[#7c847d] cursor-pointer">
                    <input type="checkbox" name="consent" required
                      className="mt-0.5 h-4 w-4 rounded border-white/20 accent-[#9b7be8]" />
                    <span>Я согласен на обработку персональных данных в соответствии с <Link to="/privacy" className="underline hover:text-white transition-colors">политикой конфиденциальности</Link></span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#9b7be8] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#8469d0]"
                  >
                    Получить расчёт стоимости
                  </button>

                  <p className="text-xs leading-5 text-[#7c847d]">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <Link className="underline" to="/privacy">
                      политикой конфиденциальности
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      <CrossNav variant="plush" />

      <footer
        id="footer"
        className="border-t border-white/10 bg-[#151716] py-10 text-sm text-[#7c847d]"
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.8fr_1.1fr] md:items-start">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/logo-bear.webp" alt="DeStressToys" className="h-9 w-auto" />
                <span className="text-xl font-bold tracking-tight text-white">DeStressToys</span>
              </div>
              <p className="mt-4 max-w-[320px] leading-6">
                Брендированные мягкие игрушки и антистресс-объекты для корпоративных подарков, событий и промо-наборов.
              </p>
              <p className="mt-4">© 2026 DeStressToys</p>
            </div>

            <nav className="flex flex-col gap-3">
              <p className="font-semibold text-white">Разделы</p>
              <a href="#gallery" className="transition-colors hover:text-white">Работы</a>
              <a href="#pricing" className="transition-colors hover:text-white">Цены</a>
              <a href="#process" className="transition-colors hover:text-white">Процесс</a>
              <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
              <Link className="transition-colors hover:text-white" to="/privacy">
                Политика конфиденциальности
              </Link>
            </nav>

            <div>
              <p className="font-semibold text-white">Контакты</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={CONTACT_PHONE_HREF} onClick={() => handleContactClick('phone', 'footer')} className="text-base font-semibold text-white transition-colors hover:text-[#9b7be8]">
                  {CONTACT_PHONE}
                </a>
                <a href="#" onClick={(event) => handleEmailCopy(event, 'footer')} className="text-base font-medium text-white transition-colors hover:text-[#9b7be8]">
                  {CONTACT_EMAIL}
                </a>
                <a href={TELEGRAM_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('telegram', 'footer')} className="text-base font-medium text-white transition-colors hover:text-[#9b7be8]">
                  Telegram
                </a>
                <a href={MAX_CONTACT_URL} target="_blank" rel="noreferrer" onClick={() => handleContactClick('max', 'footer')} className="text-base font-medium text-white transition-colors hover:text-[#9b7be8]">
                  MAX
                </a>
                <span>{RESPONSE_HOURS}</span>
                <span>{COMPANY_CITY}</span>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4 leading-6">
                <p>{LEGAL_NAME}</p>
                <p>{LEGAL_ID}</p>
              </div>
            </div>
          </div>
        </Container>
      </footer>
      <CookieBanner />
      {showStickyCta && cookiesOk && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-[#e5e0d8] bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <a
            href="#lead_form"
            onClick={() => handleCtaClick('sticky_cta', 'final_cta')}
            className="block w-full rounded-md bg-[#9b7be8] py-3.5 text-center text-base font-semibold text-white"
          >
            Получить расчёт
          </a>
        </div>
      )}
    </main>
  )
}
