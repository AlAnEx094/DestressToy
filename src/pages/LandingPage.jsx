import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const stageItems = [
  { src: '/images/hero-stage/bear.webp',        alt: 'Кастомный медведь-маскот с логотипом — мягкая игрушка на заказ для бренда', size: 250, x: 20, y: 26, z: 3, delay: '0.2s', float: '4.0s' },
  { src: '/images/hero-stage/cat.webp',         alt: 'Кот-маскот с логотипом клиента — брендированная мягкая игрушка для корпоративного мерча',               size: 155, x: 2,  y: 6,  z: 2, delay: '0.6s', float: '4.4s' },
  { src: '/images/hero-stage/robot.webp',       alt: 'Робот-маскот с фирменным логотипом — кастомная игрушка на заказ для компании', size: 180, x: 58, y: 55, z: 2, delay: '0.9s', float: '3.5s' },
  { src: '/images/hero-stage/plush_rabbit.webp',alt: 'Плюшевый кролик-маскот — кастомная мягкая игрушка для корпоративного мерча',   size: 160, x: 65, y: 5,  z: 1, delay: '0.4s', float: '4.2s' },
  { src: '/images/hero-stage/plush_fox.webp',   alt: 'Плюшевый кибер-лис — кастомный мягкий маскот для IT-брендинга',               size: 155, x: 4,  y: 62, z: 1, delay: '1.0s', float: '3.6s' },
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
  { label: 'Примеры', href: '#gallery' },
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
  { label: 'Маскот · welcome kit и подарки', title: 'Медведь-маскот', body: 'Дружелюбная форма для welcome kit, клиентских подарков и корпоративных наборов. Хорошо смотрится в нейтральных и фирменных цветах.', image: '/images/gallery/bear.webp', alt: 'Белый медведь-маскот — мягкая игрушка на заказ для welcome kit и корпоративных подарков' },
  { label: 'Маскот · digital и IT', title: 'Кот-робот', body: 'Технологичный персонаж для IT, финтеха и digital-команд. Подходит для мерча, который хочется оставить на рабочем столе.', image: '/images/gallery/cat.webp', alt: 'Чёрный кот-робот — брендированная мягкая игрушка для IT-компании и корпоративного мерча' },
  { label: 'Символ · мероприятия и стенды', title: 'Осьминог-маскот', body: 'Узнаваемая форма с высокой тактильностью. Легко ассоциируется с брендом — для event-стендов и раздатки на мероприятиях.', image: '/images/gallery/octopus.webp', alt: 'Голубой осьминог-маскот — кастомная мягкая игрушка для выставок, событий и промо-раздачи' },
  { label: 'Персонаж · спецпроекты', title: 'Динозавр', body: 'Мягкий персонаж для запусков, детских направлений и брендов с ярким характером. Работает как запоминающийся бренд-объект.', image: '/images/gallery/dinosaur.webp', alt: 'Мятный динозавр — мягкий бренд-персонаж на заказ для промо-кампании' },
  { label: 'Промо · выставки и рассылки', title: 'Утёнок', body: 'Позитивный образ для промо-акций, рассылок и подарков партнёрам. Быстро считывается и вызывает эмоциональный отклик.', image: '/images/gallery/duck.webp', alt: 'Жёлтый утёнок — брендированная мягкая игрушка для промо-рассылок, выставок и корпоративных подарков' },
  { label: 'Форма · wellness и забота', title: 'Облачко', body: 'Спокойная минималистичная форма для HR, wellness-программ и заботливых клиентских коммуникаций.', image: '/images/gallery/cloud.webp', alt: 'Мягкое облачко — кастомная игрушка с логотипом для HR и wellness-программ' },
  { label: 'Кастом · необычная форма', title: 'Арбуз', body: 'Яркая предметная форма для специальных кампаний, сезонных запусков и брендов, которым важно выделиться с первого взгляда.', image: '/images/gallery/watermelon.webp', alt: 'Арбуз-персонаж — нестандартная мягкая игрушка на заказ для промо-кампании' },
  { label: 'Маскот · инновации', title: 'Космонавт', body: 'Аккуратный футуристичный маскот для технологичных продуктов, конференций и подарков команде или партнёрам.', image: '/images/gallery/cosmo.webp', alt: 'Космонавт-маскот — корпоративная мягкая игрушка на заказ для технологичного бренда и конференций' },
  { label: 'Плюш · welcome kit и подарки', title: 'Плюшевый медведь', body: 'Классический мягкий медведь с фирменной вышивкой логотипа. Идеально для welcome kit, клиентских подарков и корпоративных наборов.', image: '/images/gallery/plush_bear.webp', alt: 'Плюшевый медведь с вышивкой логотипа — кастомный мягкий маскот для welcome kit и корпоративных подарков' },
  { label: 'Плюш · маскот бренда', title: 'Плюшевый кролик', body: 'Мягкий кролик с детализированными ушами — универсальный маскот для брендов, ориентированных на тепло и заботу.', image: '/images/gallery/plush_rabbit.webp', alt: 'Плюшевый кролик — кастомный мягкий маскот для брендинга и корпоративных подарков' },
  { label: 'Плюш · IT и digital', title: 'Кибер-лис', body: 'Технологичный персонаж в фирменных цветах. Подходит для IT, стартапов и digital-команд с характером.', image: '/images/gallery/plush_fox.webp', alt: 'Кибер-лис — плюшевый кастомный маскот для IT-компании и технологичного бренда' },
  { label: 'Плюш · wellness и HR', title: 'Облачко', body: 'Мягкое облако с добрым лицом — для HR-программ, wellness-инициатив и заботливых корпоративных подарков.', image: '/images/gallery/plush_cloud.webp', alt: 'Плюшевое облачко — кастомный мягкий маскот для HR и wellness-программ' },
  { label: 'Плюш · событие и стенды', title: 'Осьминог', body: 'Яркий многорукий персонаж для event-стендов и раздатки. Высокая тактильность и узнаваемость — запоминается с первого раза.', image: '/images/gallery/plush_octopus.webp', alt: 'Плюшевый осьминог — кастомный мягкий маскот для выставок и промо-мероприятий' },
  { label: 'Плюш · запуски и спецпроекты', title: 'Ракета', body: 'Яркий футуристичный персонаж для запусков продуктов, конференций и брендов с амбициями.', image: '/images/gallery/plush_rocket.webp', alt: 'Плюшевая ракета — кастомный мягкий маскот для запусков и технологичных брендов' },
]

const pricingTiers = [
  { qty: 'от 200 шт', price: '1 250 ₽', perUnit: 'за штуку' },
  { qty: 'от 500 шт', price: '850 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 000 шт', price: '700 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 500 шт', price: '650 ₽', perUnit: 'за штуку' },
  { qty: 'от 2 000 шт', price: '600 ₽', perUnit: 'за штуку' },
]

const plushPricingTiers = [
  { qty: 'от 200 шт', price: '1 950 ₽', perUnit: 'за штуку' },
  { qty: 'от 500 шт', price: '1 200 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 000 шт', price: '1 000 ₽', perUnit: 'за штуку' },
  { qty: 'от 1 500 шт', price: '900 ₽', perUnit: 'за штуку' },
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
    title: 'Образец',
    body: 'После согласования концепта изготавливаем физический образец. Срок — 10 дней (авиадоставка). Стоимость образца засчитывается в тираж.',
  },
  {
    number: '03',
    title: 'Тираж',
    body: 'После одобрения образца и заключения договора запускаем производство. Срок — 15 дней на нашей фабрике.',
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
    title: 'Event и выставки',
    body: 'Раздатка, которую не выбрасывают на выходе. Объект уходит домой или на рабочий стол — и продолжает работать после события.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
        <line x1="12" y1="22" x2="12" y2="7"/>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Welcome kit',
    body: 'Единственный предмет из набора, который остаётся на столе через месяц. Формирует принадлежность с первого дня.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Подарки партнёрам',
    body: 'Статусный корпоративный подарок с индивидуальной формой. Не безликий мерч — авторский объект.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    title: 'Промо-рассылки',
    body: 'Вкладыш в почтовую рассылку, который открывают и держат в руках. Физические вложения стабильно увеличивают процент открытий.',
  },
]

const reviews = [
  {
    name: 'Алексей К.',
    role: 'HR-директор, ретейл-компания',
    city: 'Москва',
    text: 'Заказали 300 штук для welcome kit. Производство заняло 4 недели, всё пришло в срок. Сотрудники сами начали фотографировать и выкладывать — без какого-либо подогрева с нашей стороны.',
    qty: '300 шт',
    type: 'Welcome kit',
  },
  {
    name: 'Марина В.',
    role: 'Маркетолог, SaaS-компания',
    city: 'Санкт-Петербург',
    text: 'Нужен был маскот для стенда на конференции. Концепт сделали за день, согласовали за два, уложились в 3 недели производства. Расхватали прямо со стенда — не успела сфотографироваться.',
    qty: '150 шт',
    type: 'Event-раздатка',
  },
  {
    name: 'Дмитрий О.',
    role: 'Основатель, digital-агентство',
    city: 'Екатеринбург',
    text: 'Хотели нестандартный подарок клиентам на 8 лет компании вместо ежедневников. Несколько клиентов написали сами, что объект стоит на столе. Это и есть цель.',
    qty: '100 шт',
    type: 'Подарки клиентам',
  },
]

const faqItems = [
  {
    q: 'Какой минимальный тираж?',
    a: 'От 200 штук. Для крупных тиражей (500+) доступны дополнительные скидки.',
  },
  {
    q: 'Из чего делают объекты?',
    a: 'Два формата на выбор. Антистресс PU foam: мягкий пенополиуретан с бархатистым покрытием, сжимается и возвращает форму. Плюшевые: классический плюш с набивкой, мягкие и приятные на ощупь. Оба формата безопасны, сертификат ЕС, подходят для детей от 3 лет.',
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
    a: 'Доставляем по России и СНГ. Возможна доставка до склада или прямая развозка на мероприятие.',
  },
  {
    q: 'Сколько стоит?',
    a: 'Ориентировочные цены: от 1 250 ₽/шт при тираже 200 шт, от 800 ₽/шт при 500 шт, от 700 ₽/шт при 1 000 шт. Точная стоимость зависит от формы и сложности — пришлём расчёт после заявки.',
  },
  {
    q: 'Можно ли получить образец перед тиражом?',
    a: 'Да. Производим тестовый образец — вы оцениваете форму, материал и цвет вживую. Срок — 10 дней (авиадоставка). Стоимость образца засчитывается в тираж при заказе.',
  },
  {
    q: 'Где производятся игрушки?',
    a: 'На нашей фабрике в Китае. Китайские производители специализируются на производстве мягких игрушек — это их основная компетенция, а не побочный продукт. Именно это позволяет нам делать тираж от 200 штук по цене от 800 ₽/шт и выдерживать срок 15 дней. Мы контролируем производство напрямую: принимаем образец, согласуем качество — и только после этого запускаем тираж.',
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
  { value: 'telegram', label: 'Прикреплю в Telegram' },
  { value: 'max', label: 'Прикреплю в MAX' },
  { value: 'email_reply', label: 'Отправлю ответом на письмо' },
  { value: 'link', label: 'Есть ссылка' },
]

const METRIKA_ID = 108979976
const TELEGRAM_CTA_URL = import.meta.env.VITE_TELEGRAM_CTA_URL || 'https://t.me/DestressToys_bot'
const MAX_CTA_URL = import.meta.env.VITE_MAX_CTA_URL || 'https://max.ru/'

function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') return

  window.ym?.(METRIKA_ID, 'reachGoal', eventName, params)
  window.gtag?.('event', eventName, params)
  window.dataLayer?.push({ event: eventName, ...params })
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
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.06em] text-[#ff6a3d]">
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
      className={`inline-flex items-center justify-center rounded-md bg-[#ff6a3d] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#e85a2e] ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState(null)
  const [formValues, setFormValues] = useState(formDefaults)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [pricingTab, setPricingTab] = useState('pu')
  const utmRef = useRef({})

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    const utm = {}
    utmKeys.forEach((key) => {
      const val = params.get(key)
      if (val) utm[key] = val
    })
    if (Object.keys(utm).length > 0) {
      utmRef.current = utm
      sessionStorage.setItem('utm', JSON.stringify(utm))
    } else {
      const stored = sessionStorage.getItem('utm')
      if (stored) {
        try {
          utmRef.current = JSON.parse(stored)
        } catch {
          sessionStorage.removeItem('utm')
        }
      }
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
    const payload = {
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
      ...utmRef.current,
    }

    trackEvent('lead_form_submit', {
      lead_source: 'form',
      has_phone: Boolean(formValues.phone),
      has_quantity: Boolean(formValues.quantity),
      has_reference: Boolean(formValues.reference),
      has_assets: Boolean(formValues.assetDelivery || formValues.reference),
      asset_delivery: formValues.assetDelivery,
      ...utmRef.current,
    })

    try {
      await fetch('https://n8n.destresstoys.ru/webhook/new-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // fire-and-forget — don't block success UX on network errors
    }
    trackEvent('lead_form_success', {
      lead_source: 'form',
      ...utmRef.current,
    })
    setIsSubmitted(true)
  }

  const handleMessengerClick = (channel) => {
    trackEvent(`messenger_${channel}_click`, {
      lead_source: channel,
      ...utmRef.current,
    })
  }

  const handleFaqToggle = (index) => {
    setOpenFaqIndex((current) => (current === index ? null : index))
  }

  return (
    <main className="bg-[#151716] text-[#151716]">
      <header
        id="header"
        className="sticky top-0 z-50 border-b border-white/10 bg-[#151716]"
      >
        <Container className="relative">
          <div className="flex h-16 items-center justify-between gap-6">
            <a
              href="#hero"
              className="flex items-center gap-2.5"
            >
              <img src="/logo-bear.webp" alt="DeStressToys" className="h-9 w-auto" />
              <span className="text-xl font-bold text-white tracking-tight">DeStressToys</span>
            </a>

            <nav className="hidden items-center gap-10 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[15px] font-medium text-[#7c847d] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <PrimaryButton href="#pricing" className="px-5 py-2.5 text-sm">
                Рассчитать стоимость
              </PrimaryButton>
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
                <PrimaryButton
                  href="#pricing"
                  className="mt-2 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Рассчитать стоимость
                </PrimaryButton>
              </nav>
            </div>
          ) : null}
        </Container>
      </header>

      <section id="hero" className="bg-[#151716] flex flex-col min-h-[85vh] md:min-h-screen">
        <Container className="w-full flex-1 flex items-center py-14 md:py-16 xl:py-24">
          <div className="grid w-full items-stretch gap-10 md:grid-cols-[1.2fr_0.95fr] md:gap-16">
            <div className="flex flex-col justify-center">
              <SectionLabel>Кастомный мерч · тираж от 200 шт</SectionLabel>
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-white">
                Мягкие игрушки и маскоты на заказ для вашего бренда
              </h1>
              <p className="mt-5 max-w-[520px] text-base sm:text-lg leading-7 sm:leading-8 text-[#7c847d]">
                Корпоративный мерч в форме логотипа, маскота или любого символа бренда. Антистресс PU foam или классические плюшевые — выберите формат под задачу. Тираж от 200 шт.
              </p>

              <div className="mt-8 md:mt-10">
                <div className="flex flex-wrap gap-3">
                  <PrimaryButton href="#pricing">Рассчитать стоимость</PrimaryButton>
                  <a
                    href={TELEGRAM_CTA_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleMessengerClick('telegram')}
                    className="inline-flex items-center justify-center rounded-md border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40"
                  >
                    Написать в Telegram
                  </a>
                  <a
                    href={MAX_CTA_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleMessengerClick('max')}
                    className="inline-flex items-center justify-center rounded-md border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40"
                  >
                    Написать в MAX
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                  {['Тираж от 200 шт', 'Концепт за 2 часа', 'Образец за 10 дней'].map((p, i) => (
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
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,106,61,0.15) 0%, transparent 70%)'}} />
              <img src="/images/hero-stage/cat.webp"      alt="" className="w-20 object-contain relative" style={{filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.5))', animation: 'stageFLoat 4.4s ease-in-out 0.6s infinite'}} />
              <img src="/images/hero-stage/bear.webp"     alt="" className="w-32 object-contain relative" style={{filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.5))', animation: 'stageFLoat 4.0s ease-in-out 0.2s infinite'}} />
              <img src="/images/hero-stage/dinosaur.webp" alt="" className="w-20 object-contain relative" style={{filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.5))', animation: 'stageFLoat 3.8s ease-in-out 0s infinite'}} />
            </div>

            <div className="hidden md:block w-full md:min-h-[600px] lg:min-h-[680px]">
              <ProductStage />
            </div>
          </div>
        </Container>
      </section>

      <section id="gallery" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Примеры</SectionLabel>
          <div className="max-w-[680px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Примеры: что уже делают другие компании
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <article
                key={item.label}
                className="overflow-hidden rounded-xl border border-[#e5e0d8] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]"
              >
                <div className="w-full aspect-[5/4] bg-[#f4efe8]">
                  <img src={item.image} alt={item.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div className="p-4 md:p-6">
                  <p className="mb-1 text-xs uppercase tracking-widest text-[#ff6a3d]">
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

      <section id="formats" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Форматы</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Выберите тип под вашу задачу
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-[#e5e0d8] bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">Антистресс · PU foam</p>
              <h3 className="mt-2 text-xl md:text-2xl font-bold leading-7 text-[#151716]">Антистресс PU foam</h3>
              <p className="mt-1 text-sm text-[#7c847d]">Тираж от 200 шт · от 1 250 ₽/шт</p>
              <ul className="mt-5 space-y-3">
                {['Сжимается и возвращает форму — антистресс-эффект', 'Бархатистое покрытие, приятно держать', 'Любая форма: логотип, маскот, символ', 'Дольше остаётся в руках — больше касаний с брендом'].map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#5a6060]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a3d]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="#pricing" className="mt-6 inline-flex items-center text-sm font-semibold text-[#ff6a3d] hover:underline">
                Смотреть цены →
              </a>
            </article>

            <article className="rounded-xl border border-[#e5e0d8] bg-white p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">Плюш · классика</p>
              <h3 className="mt-2 text-xl md:text-2xl font-bold leading-7 text-[#151716]">Плюшевые игрушки</h3>
              <p className="mt-1 text-sm text-[#7c847d]">Тираж от 200 шт · от 1 950 ₽/шт</p>
              <ul className="mt-5 space-y-3">
                {['Классический мягкий плюш с набивкой', 'Высокая воспринимаемая ценность — premium-подарок', 'Узнаваемый формат для любой аудитории', 'Подходит для дорогих welcome kit и подарков партнёрам'].map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-[#5a6060]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a3d]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <a href="#pricing" className="mt-6 inline-flex items-center text-sm font-semibold text-[#ff6a3d] hover:underline">
                Смотреть цены →
              </a>
            </article>
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

          <div className="mt-8 flex gap-2">
            <button
              type="button"
              onClick={() => setPricingTab('pu')}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${pricingTab === 'pu' ? 'bg-[#ff6a3d] text-white' : 'border border-white/10 bg-white/5 text-[#7c847d] hover:text-white'}`}
            >
              Антистресс PU foam
            </button>
            <button
              type="button"
              onClick={() => setPricingTab('plush')}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold transition-colors ${pricingTab === 'plush' ? 'bg-[#ff6a3d] text-white' : 'border border-white/10 bg-white/5 text-[#7c847d] hover:text-white'}`}
            >
              Плюшевые
            </button>
          </div>

          {pricingTab === 'pu' && (
            <p className="mt-4 text-sm text-[#7c847d]">Сжимается, возвращает форму. Бархатистое покрытие. Антистресс-эффект.</p>
          )}
          {pricingTab === 'plush' && (
            <p className="mt-4 text-sm text-[#7c847d]">Классическая мягкая игрушка. Плюшевый ворс. Подходит для premium welcome kit и статусных подарков.</p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5 md:gap-5">
            {(pricingTab === 'pu' ? pricingTiers : plushPricingTiers).map((tier) => (
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

          <p className="mt-5 text-sm text-[#7c847d]">
            Стоимость образца (sample) — от 5 000 ₽. Засчитывается в тираж при заказе.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="#final_cta">Рассчитать точную стоимость</PrimaryButton>
            <a
              href={TELEGRAM_CTA_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => handleMessengerClick('telegram')}
              className="inline-flex items-center justify-center rounded-md border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40"
            >
              Спросить в Telegram
            </a>
          </div>
        </Container>
      </section>

      <section id="use_cases" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Где используют</SectionLabel>
          <div className="max-w-[720px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Четыре задачи, которые уже решают с бренд-объектом
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-4">
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
          </div>
        </Container>
      </section>

      <section id="welcome_box" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid items-center gap-8 md:gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
            <div className="order-2 md:order-1 max-w-[520px]">
              <SectionLabel>Welcome Kit</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
                Первый физический предмет бренда в руках нового сотрудника
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#5a6060]">
                Welcome kit задаёт тон отношения к компании. Бренд-объект — это единственный предмет из набора,
                который остаётся на столе через месяц.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Welcome kit', 'Промонаборы', 'Event-пакеты', 'Подарки партнёрам'].map(
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

              <PrimaryButton href="#pricing" className="mt-8">
                Рассчитать стоимость
              </PrimaryButton>
            </div>

            <div className="order-1 md:order-2 min-h-[260px] md:min-h-[420px] flex items-center justify-center">
              <img
                src="/images/showcase_shelf.webp"
                alt="Линейка кастомных мягких игрушек и бренд-маскотов DeStressToys для корпоративного welcome kit"
                className="w-full max-h-[420px] rounded-xl object-contain"
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

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.name} className="rounded-xl border border-[#e5e0d8] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_8px_32px_rgba(0,0,0,0.11)]">
                <p className="text-[#ff6a3d] text-base">★★★★★</p>
                <p className="mt-3 text-base leading-7 text-[#151716]">«{review.text}»</p>
                <div className="mt-5 pt-4 border-t border-[#e5e0d8]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff6a3d]/15 text-sm font-bold text-[#ff6a3d]">
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
          <SectionLabel>Доверие</SectionLabel>
          <p className="text-sm uppercase tracking-[0.08em] text-[#5a6060]">
            Работаем с компаниями из IT, ретейла, FMCG и финтеха
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {['IT и SaaS', 'FMCG', 'Ретейл', 'Финтех', 'HR и EdTech', 'Производство'].map((sector) => (
              <span
                key={sector}
                className="rounded-[8px] border border-[#d0c9bf] bg-white px-4 py-2 text-sm font-medium text-[#151716]"
              >
                {sector}
              </span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-5">
            {[
              { title: 'Минимальный тираж', value: 'от 200 шт.' },
              { title: 'Концепт', value: 'за 2 часа' },
              { title: 'Образец', value: '10 дней' },
              { title: 'Производство тиража', value: '15 дней' },
              { title: 'На рынке', value: 'более 2 лет' },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-sm text-[#5a6060]">{item.title}</p>
                <p className="mt-2 text-2xl font-semibold text-[#151716]">{item.value}</p>
              </div>
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

      <section id="comparison" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Сравнение</SectionLabel>
          <div className="max-w-[820px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
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
              Поэтому антистресс-маскот лучше работает для welcome kit, событий и подарков партнёрам: он не просто
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
                Два материала — одно качество.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                PU foam и плюш — разные форматы, одинаковый стандарт производства. Оба материала безопасны, прошли сертификацию ЕС и рассчитаны на долгое использование.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#ff6a3d]">
                Антистресс PU foam
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
                Безопасны: сертификат ЕС, без латекса
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full min-h-[200px] md:min-h-[400px]">
              <img src="/images/texture/texture-1.webp" alt="Мягкая плюшевая текстура для кастомных игрушек и бренд-маскотов DeStressToys" className="w-full h-full object-cover rounded-xl" loading="lazy" />
              <img src="/images/texture/texture-2.webp" alt="Материал мягкой игрушки крупным планом — качество пошива и производства DeStressToys" className="w-full h-full object-cover rounded-xl" loading="lazy" />
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
                Укажите тираж и форму — пришлём расчёт в течение 1 рабочего дня. Или напишите напрямую в мессенджер.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-[#7c847d]">
                {['Без предоплаты', 'Правки бесплатно', 'Ответим за 1 день'].map(
                  (item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[#ff6a3d]">✓</span>
                      <span>{item}</span>
                    </li>
                  ),
                )}
              </ul>

              <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <img
                  src="/images/cta/cta-hero.webp"
                  alt="Кастомная мягкая игрушка с логотипом на рабочем столе — корпоративный подарок партнёру"
                  className="w-full h-[220px] object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-[#7c847d]">
                После заявки вы получите:
                <ul className="mt-3 space-y-2">
                  {['Расчёт стоимости под ваш тираж', 'Визуальный концепт формы — рендер и описание', 'Ответы по срокам и условиям производства'].map(i => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#ff6a3d] shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[12px] border border-white/10 bg-white/5 p-8 md:p-10">
              {isSubmitted ? (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white">
                    Заявка принята! Свяжемся в течение 1 рабочего дня.
                  </h3>
                  <p className="text-base leading-7 text-[#7c847d]">
                    Мы получили ваши данные и подготовим концепт под задачу
                    {formValues.company ? ` для ${formValues.company}` : ''}.
                    Ответ придёт на {formValues.email || 'указанный email'} — или напишите напрямую в{' '}
                    <a href={TELEGRAM_CTA_URL} target="_blank" rel="noreferrer" className="text-[#ff6a3d] underline">Telegram</a>.
                  </p>
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#ff6a3d] focus:ring-2 focus:ring-[#ff6a3d]/20"
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#ff6a3d] focus:ring-2 focus:ring-[#ff6a3d]/20"
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#ff6a3d] focus:ring-2 focus:ring-[#ff6a3d]/20"
                      placeholder="name@company.com"
                    />
                  </label>

                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">Быстрее в мессенджере</p>
                    <p className="mt-1 text-sm leading-6 text-[#7c847d]">
                      Отвечаем в течение нескольких часов.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={TELEGRAM_CTA_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleMessengerClick('telegram')}
                        className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#ff6a3d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85a2e]"
                      >
                        Написать в Telegram
                      </a>
                      <a
                        href={MAX_CTA_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleMessengerClick('max')}
                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40"
                      >
                        Написать в MAX
                      </a>
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-white">
                      Опишите задачу
                    </span>
                    <textarea
                      name="task"
                      rows="4"
                      value={formValues.task}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-all placeholder:text-[#7c847d] focus:border-[#ff6a3d] focus:ring-2 focus:ring-[#ff6a3d]/20"
                      placeholder="Где будет использоваться бренд-объект и какой нужен тираж?"
                    />
                  </label>

                  <details className="rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                    <summary className="cursor-pointer text-sm font-medium text-[#7c847d]">Дополнительно</summary>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <fieldset className="col-span-2">
                        <legend className="block text-sm font-medium text-[#7c847d] mb-2">
                          Есть логотип, брендбук или референсы?
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
                                className="h-4 w-4 border-white/20 accent-[#ff6a3d]"
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                        <p className="mt-2 text-xs leading-5 text-[#7c847d]">
                          Файлы удобнее отправить в мессенджере или ответом на письмо после заявки.
                        </p>
                      </fieldset>

                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-[#7c847d] mb-1.5">Примерный тираж</label>
                        <input id="quantity" name="quantity" type="text" placeholder="200 / 500 / 1000"
                          value={formValues.quantity}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#7c847d] mb-1.5">Телефон</label>
                        <input id="phone" name="phone" type="tel" placeholder="+7"
                          value={formValues.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="reference" className="block text-sm font-medium text-[#7c847d] mb-1.5">Ссылка / референс</label>
                        <input id="reference" name="reference" type="url" placeholder="Figma, Drive, сайт"
                          value={formValues.reference}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
                      </div>
                    </div>
                  </details>

                  <label className="flex items-start gap-3 rounded-md bg-white/[0.04] px-4 py-3 text-sm text-[#7c847d] cursor-pointer">
                    <input type="checkbox" name="consent" required
                      className="mt-0.5 h-4 w-4 rounded border-white/20 accent-[#ff6a3d]" />
                    <span>Я согласен на обработку персональных данных</span>
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[#ff6a3d] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#e85a2e]"
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

      <footer
        id="footer"
        className="border-t border-white/10 bg-[#151716] py-8 text-sm text-[#7c847d]"
      >
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p>© 2025 DeStressToys</p>
            <nav className="flex flex-wrap gap-5">
              <a href="#comparison" className="transition-colors hover:text-white">
                Продукт
              </a>
              <a href="#gallery" className="transition-colors hover:text-white">
                Примеры
              </a>
              <a href="#process" className="transition-colors hover:text-white">
                Процесс
              </a>
              <a href="#faq" className="transition-colors hover:text-white">
                FAQ
              </a>
            </nav>
            <Link className="transition-colors hover:text-white" to="/privacy">
              Политика конфиденциальности
            </Link>
          </div>
        </Container>
      </footer>
    </main>
  )
}
