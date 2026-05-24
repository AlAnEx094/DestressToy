import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const stageItems = [
  { src: '/images/hero-stage/dinosaur.webp', alt: 'Кастомный антистресс динозавр — мягкий бренд-объект для welcome kit',             size: 178, x: 60, y: 22, z: 1, delay: '0s',   float: '3.8s' },
  { src: '/images/hero-stage/cat.webp',      alt: 'Антистресс кот-маскот с логотипом клиента — корпоративный мерч',                   size: 165, x: 1,  y: 30, z: 2, delay: '0.6s', float: '4.4s' },
  { src: '/images/hero-stage/bear.webp',     alt: 'Кастомный антистресс медведь с логотипом — пример бренд-объекта DeStressToys',     size: 252, x: 24, y: 30, z: 3, delay: '0.2s', float: '4.0s' },
  { src: '/images/hero-stage/robot.webp',    alt: 'Антистресс робот с фирменным логотипом — пример корпоративного бренд-объекта',    size: 200, x: 54, y: 54, z: 2, delay: '0.9s', float: '3.5s' },
  { src: '/images/hero-stage/drop.webp',     alt: 'Мягкая антистресс капля — кастомная форма бренд-объекта под логотип',             size: 158, x: 3,  y: 61, z: 1, delay: '1.2s', float: '4.8s' },
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
  { label: 'Продукт', href: '#comparison' },
  { label: 'Примеры', href: '#gallery' },
  { label: 'Процесс', href: '#process' },
  { label: 'О нас', href: '#trust' },
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
  { label: 'Маскот · welcome kit и подарки', title: 'Белый медведь', body: 'Нейтральная форма под нанесение логотипа. Хорошо читается в фирменных цветах и в нейтральных — подходит для welcome kit и клиентских подарков.', image: '/images/gallery/white_bear.webp', alt: 'Белый медведь-маскот с брендингом клиента — антистресс для welcome kit' },
  { label: 'Символ · мероприятия и стенды', title: 'Осьминог-маскот', body: 'Узнаваемая форма с высокой тактильностью. Легко ассоциируется с брендом — для event-стендов и раздатки на мероприятиях.', image: '/images/gallery/octopus.webp', alt: 'Синий осьминог-маскот с логотипом — пример кастомного антистресса для события' },
  { label: 'Промо · выставки и рассылки', title: 'Смайл-персонаж', body: 'Позитивный образ для промо-акций и рассылок. Физическое вложение стабильно увеличивает процент открытий — в отличие от писем без вложения.', image: '/images/gallery/orange_smile.webp', alt: 'Оранжевый смайл-персонаж с логотипом — корпоративный антистресс для промо-акции' },
  { label: 'Маскот · отправки для клиентов', title: 'Кот-единорог', body: 'Для отправок клиентам и партнёрам — живой, узнаваемый персонаж с уникальным характером. Высокая вовлечённость аудитории.', image: '/images/gallery/cat_rog.webp', alt: 'Кот-единорог с брендингом клиента — кастомный мягкий антистресс бренд-объект' },
  { label: 'Кастомная форма · спецзапуски', title: 'Арбуз-персонаж', body: 'Для специальных кампаний, когда нужна нестандартная форма, которая запоминается с первого взгляда.', image: '/images/gallery/watermelon.webp', alt: 'Антистресс арбуз нестандартной формы — кастомный бренд-объект с логотипом' },
]

const processSteps = [
  {
    number: '01',
    title: 'Заявка',
    body: 'Заполните короткую форму — опишите задачу и бренд. Занимает 2–3 минуты.',
  },
  {
    number: '02',
    title: 'Концепт',
    body: 'В течение 1 рабочего дня пришлём визуальный концепт формы — рендер и описание материалов. Бесплатно.',
  },
  {
    number: '03',
    title: 'Согласование',
    body: 'Утвердим детали: форма, размер, цвет, тираж. Внесём правки бесплатно.',
  },
  {
    number: '04',
    title: 'Производство',
    body: 'Изготовим и доставим. Срок производства — 3–5 недель от утверждения.',
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

const faqItems = [
  {
    q: 'Какой минимальный тираж?',
    a: 'От 50 штук. Для крупных тиражей (500+) доступны дополнительные скидки.',
  },
  {
    q: 'Из чего делают объекты?',
    a: 'Мягкий пенополиуретан с бархатистым покрытием. Сертификат ЕС, безопасен для взрослых и детей от 3 лет.',
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
    a: 'Стоимость зависит от формы, тиража и сложности. Концепт и расчёт цены — бесплатно, после заявки.',
  },
  {
    q: 'Можно ли получить образец перед тиражом?',
    a: 'Да. Производим тестовый образец — вы оцениваете форму, материал и цвет вживую. Стоимость образца засчитывается в тираж при заказе.',
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
  { value: 'email_reply', label: 'Отправлю ответом на письмо' },
  { value: 'link', label: 'Есть ссылка' },
]

const METRIKA_ID = 108979976
const TELEGRAM_CTA_URL = import.meta.env.VITE_TELEGRAM_CTA_URL || 'https://t.me/DestressToys_bot'

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
              <PrimaryButton href="#final_cta" className="px-5 py-2.5 text-sm">
                Получить концепт бесплатно
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
                  href="#final_cta"
                  className="mt-2 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Получить концепт бесплатно
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
              <SectionLabel>Мягкий кастомный мерч для корпоративных брендов</SectionLabel>
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-white">
                Кастомный антистресс с логотипом вашего бренда — мерч, к которому возвращаются снова
              </h1>
              <p className="mt-5 max-w-[520px] text-base sm:text-lg leading-7 sm:leading-8 text-[#7c847d]">
                Мягкий пенополиуретан с бархатистым покрытием. Форма — логотип, маскот или любой символ бренда.
                Лежит на столе, попадает в руки снова и снова.
              </p>

              <div className="mt-8 md:mt-10">
                <PrimaryButton href="#final_cta">Получить концепт бесплатно</PrimaryButton>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                  {['Любая форма: логотип, маскот, символ', 'Тираж от 50 шт', 'Концепт бесплатно за 1 день'].map((p, i) => (
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

          <div className="mt-10 space-y-4 md:hidden">
            {comparisonMatrix.map((row) => (
              <article
                key={row.label}
                className="rounded-xl border border-[#e5e0d8] bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-[#151716]">{row.label}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[0, 4].map((origIdx) => (
                    <div key={`${row.label}-${origIdx}`} className={`flex flex-col items-center gap-1.5 text-center rounded-lg p-2 ${origIdx === 4 ? 'bg-[#ff6a3d]/8' : 'bg-[#f4efe8]'}`}>
                      <span className="text-[10px] uppercase tracking-wider text-[#5a6060]">
                        {comparisonCols[origIdx + 1]}
                      </span>
                      {origIdx === 4 ? (
                        <span className="inline-flex items-center rounded-full bg-[#ff6a3d] px-2 py-0.5 text-[10px] font-bold text-white">
                          {row.values[origIdx]}
                        </span>
                      ) : (
                        <span className="text-sm text-[#5a6060]">{row.values[origIdx]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
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
                className="bg-white border border-[#e5e0d8] rounded-xl p-5 md:p-8"
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
                Приятно держать. Сложно отложить.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Мягкий пенополиуретан с бархатистым покрытием. Объект пружинит, возвращает форму и не теряет вид — руки тянутся к нему снова и снова.
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-[#7c847d]">
                {[
                  'Покрытие: бархатистый полиуретан',
                  'Наполнитель: медленно восстанавливающаяся пена',
                  'Безопасен: сертификат ЕС, без латекса',
                  'Долговечность: 3+ года активного использования',
                ].map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7c847d]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full min-h-[200px] md:min-h-[400px]">
              <img src="/images/texture/texture-1.webp" alt="Мягкая текстура антистресс-наполнителя — ощущение бренд-объекта DeStressToys" className="w-full h-full object-cover rounded-xl" loading="lazy" />
              <img src="/images/texture/texture-2.webp" alt="Материал кастомного антистресса крупным планом — качество производства DeStressToys" className="w-full h-full object-cover rounded-xl" loading="lazy" />
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

          <div className="mt-8 grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.label}
                className="overflow-hidden rounded-xl border border-[#e5e0d8] bg-white"
              >
                <img src={item.image} alt={item.alt} className="w-full aspect-[4/3] object-cover" loading="lazy" />
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

              <PrimaryButton href="#final_cta" className="mt-8">
                Получить концепт бесплатно
              </PrimaryButton>
            </div>

            <div className="order-1 md:order-2 overflow-hidden rounded-xl">
              <img
                src="/images/showcase_shelf.webp"
                alt="Линейка кастомных антистресс бренд-объектов DeStressToys — варианты для корпоративного welcome kit"
                className="w-full object-cover min-h-[260px] md:min-h-[420px] rounded-xl"
                loading="lazy"
              />
            </div>
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
                className="rounded-[12px] border border-[#e5e0d8] bg-white p-5 md:p-8"
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

      <section id="trust" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
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

          <div className="mt-10 flex justify-center">
            <article className="max-w-[720px] rounded-[12px] border border-[#e5e0d8] bg-white p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff6a3d] mb-4">Кейс</p>
              <p className="text-base md:text-xl leading-7 md:leading-8 text-[#151716]">
                IT-компания заменила ручки и блокноты в welcome kit на маскота своего бренда.
                Сотрудники сами фотографировались с ним и выкладывали в Stories — без просьб со стороны HR.
                Объект остался на столах через полгода.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {['IT-сектор, Москва', 'Welcome kit', '200 шт.'].map((tag) => (
                  <span key={tag} className="rounded-md bg-[#f4efe8] px-3 py-1 text-xs font-medium text-[#5a6060]">{tag}</span>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-5">
            {[
              { title: 'Минимальный тираж', value: 'от 50 шт.' },
              { title: 'Концепт бесплатно', value: 'без предоплаты' },
              { title: 'Срок производства', value: '3–5 недель' },
              { title: 'Правки до утверждения', value: 'бесплатно' },
              { title: 'Доставка', value: 'РФ и СНГ' },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-sm text-[#5a6060]">{item.title}</p>
                <p className="mt-2 text-2xl font-semibold text-[#151716]">{item.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Частые вопросы
            </h2>

            <div className="mt-8 border-t border-[#d0c9bf]">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index

                return (
                  <div key={item.q} className="border-b border-[#d0c9bf] py-5">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-6 text-left"
                      aria-expanded={isOpen}
                      onClick={() => handleFaqToggle(index)}
                    >
                      <span className="text-base md:text-lg font-semibold leading-6 md:leading-7 text-[#151716]">
                        {item.q}
                      </span>
                      <span className="text-2xl leading-none text-[#ff6a3d]">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen ? (
                      <p className="mt-4 max-w-[620px] text-base leading-7 text-[#5a6060]">
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

      <section id="final_cta" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
            <div className="max-w-[420px]">
              <SectionLabel>Запрос концепта</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Получите концепт под ваш бренд — бесплатно за 1 рабочий день
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Опишите задачу — пришлём концепт бесплатно в течение 1 рабочего дня.
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
                  alt="Антистресс бренд-объект с логотипом на рабочем столе — корпоративный подарок партнёру"
                  className="w-full h-[220px] object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-[#7c847d]">
                После заявки вы получите:
                <ul className="mt-3 space-y-2">
                  {['Визуальный концепт формы — рендер и описание материалов', 'Расчёт стоимости под ваш тираж', 'Ответы на вопросы по формату и срокам'].map(i => (
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-colors placeholder:text-[#7c847d] focus:border-[#ff6a3d]"
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-colors placeholder:text-[#7c847d] focus:border-[#ff6a3d]"
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-colors placeholder:text-[#7c847d] focus:border-[#ff6a3d]"
                      placeholder="name@company.com"
                    />
                  </label>

                  <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm font-medium text-white">Быстрее в мессенджере</p>
                    <p className="mt-1 text-sm leading-6 text-[#7c847d]">
                      Отвечаем в течение нескольких часов.
                    </p>
                    <div className="mt-4">
                      <a
                        href={TELEGRAM_CTA_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleMessengerClick('telegram')}
                        className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#ff6a3d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85a2e]"
                      >
                        Написать в Telegram
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
                      className="w-full rounded-md border border-[#d0c9bf] bg-white px-4 py-3 text-base text-[#151716] outline-none transition-colors placeholder:text-[#7c847d] focus:border-[#ff6a3d]"
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
                    Отправить заявку
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
