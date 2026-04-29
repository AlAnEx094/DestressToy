import { useState } from 'react'
import { Link } from 'react-router-dom'

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
    body: 'Физический объект активирует несколько органов чувств одновременно — запоминаемость в разы выше, чем у визуального мерча.',
  },
  {
    number: '02',
    title: 'Эмоциональная связь',
    body: 'Мягкость и форма вашего бренда создают положительную ассоциацию каждый раз, когда объект берут в руки.',
  },
  {
    number: '03',
    title: 'Долгий эффект',
    body: 'Бренд-объект остаётся на столе неделями. Среднее время жизни — в 8 раз дольше стандартного промо-предмета.',
  },
]

const galleryItems = [
  { label: 'Лого-форма · наборы для новых сотрудников', title: 'Логотип как объект', body: 'Для наборов для новых сотрудников и клиентских подарков, где важно быстро связать объект с брендом.', image: '/images/gallery/logo-1.webp', alt: 'Мягкий бренд-объект в форме логотипа' },
  { label: 'Символ · мероприятия и стенды', title: 'Символ или знак компании', body: 'Для мероприятий и стендов, где нужен заметный и понятный объект для короткого контакта.', image: '/images/gallery/logo-2.webp', alt: 'Мягкий бренд-объект в форме корпоративного символа' },
  { label: 'Абстракция · маркетинговые кампании', title: 'Абстрактная форма кампании', body: 'Для маркетинговых кампаний, когда нужен образ, связанный с идеей или продуктом.', image: '/images/gallery/logo-3.webp', alt: 'Абстрактный мягкий бренд-объект' },
  { label: 'Маскот · отправки для клиентов', title: 'Корпоративный маскот', body: 'Для отправок клиентам и партнёрам, где нужен более живой и узнаваемый образ.', image: '/images/gallery/logo-4.webp', alt: 'Мягкий бренд-объект маскот' },
  { label: 'Сложный силуэт · специальные запуски', title: 'Сложная скульптурная форма', body: 'Для специальных запусков, когда форма должна выглядеть необычно, но оставаться удобной в производстве.', image: '/images/gallery/logo-5.webp', alt: 'Скульптурный мягкий объект' },
]

const processSteps = [
  {
    number: '01',
    title: 'Заявка',
    body: 'Заполните форму — опишите задачу, бренд и контекст использования.',
  },
  {
    number: '02',
    title: 'Концепт',
    body: 'В течение 1 рабочего дня пришлём концепт формы с рендером и описанием.',
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
    body: 'Раздаточный материал, который не выбрасывают. Логотип-антистресс остаётся на столе после мероприятия.',
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
    body: 'Первый физический предмет бренда в руках нового сотрудника или клиента. Формирует принадлежность.',
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
    body: 'Вкладыш в почтовую рассылку, который открывают и держат в руках. CTR таких рассылок выше на 40%.',
  },
]

const trustBrands = [
  {
    name: 'Atmos',
    logo: (
      <svg viewBox="0 0 96 28" className="h-6 w-auto" fill="none">
        <path d="M4 8h10M4 14h7M4 20h10" stroke="#151716" strokeWidth="1.8" strokeLinecap="round"/>
        <text x="21" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="13" fill="#151716" letterSpacing="1.5">ATMOS</text>
      </svg>
    ),
  },
  {
    name: 'Forma',
    logo: (
      <svg viewBox="0 0 82 28" className="h-6 w-auto" fill="none">
        <rect x="3" y="6" width="14" height="16" rx="3.5" stroke="#151716" strokeWidth="1.8"/>
        <text x="22" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="400" fontSize="13" fontStyle="italic" fill="#151716">forma</text>
      </svg>
    ),
  },
  {
    name: 'Vertex',
    logo: (
      <svg viewBox="0 0 106 28" className="h-6 w-auto" fill="none">
        <path d="M3 20L10 8l7 12" stroke="#151716" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="26" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="600" fontSize="13" fill="#151716" letterSpacing="1">VERTEX</text>
      </svg>
    ),
  },
  {
    name: 'Nord',
    logo: (
      <svg viewBox="0 0 72 28" className="h-6 w-auto" fill="none">
        <path d="M5 22V6l10 16V6" stroke="#151716" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="22" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="800" fontSize="13" fill="#151716">Nord</text>
      </svg>
    ),
  },
  {
    name: 'Pulse',
    logo: (
      <svg viewBox="0 0 98 28" className="h-6 w-auto" fill="none">
        <path d="M3 14H7L9 7L12 21L14.5 14L16.5 18H20" stroke="#151716" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="26" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="500" fontSize="13" fill="#151716" letterSpacing="1.5">PULSE</text>
      </svg>
    ),
  },
  {
    name: 'Kite',
    logo: (
      <svg viewBox="0 0 72 28" className="h-6 w-auto" fill="none">
        <path d="M10 4L18 14L10 24L2 14Z" stroke="#151716" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="25" y="19" fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="13" fill="#151716">Kite</text>
      </svg>
    ),
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
    a: '3–5 недель от утверждения финального концепта. Срочные заказы обсуждаются индивидуально.',
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
    a: 'Да, производим тестовый образец. Стоимость образца засчитывается в тираж при подтверждении заказа.',
  },
]

const formDefaults = {
  name: '',
  company: '',
  email: '',
  task: '',
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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await fetch('https://n8n.destresstoys.ru/webhook/new-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formValues.name,
          company: formValues.company,
          email: formValues.email,
          description: formValues.task,
        }),
      })
    } catch {
      // fire-and-forget — don't block success UX on network errors
    }
    setIsSubmitted(true)
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
            <a href="#hero">
              <img src="/favicon.svg" alt="DeStressToys" className="h-8 w-8" />
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
                Запросить концепт
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
                  Запросить концепт
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
              <SectionLabel>Кастомные бренд-объекты для компаний</SectionLabel>
              <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.08] text-white">
                Бренд-объект, который не теряется среди обычного мерча
              </h1>
              <p className="mt-5 max-w-[520px] text-base sm:text-lg leading-7 sm:leading-8 text-[#7c847d]">
                Мягкие объекты кастомной формы — логотип, маскот или символ бренда.
                Тактильный предмет, который остаётся в руках и на столе.
              </p>

              <div className="mt-8 md:mt-10">
                <PrimaryButton href="#final_cta">Запросить концепт</PrimaryButton>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
                  {['Форма под любой бренд', 'Тираж от 50 штук', 'Производство под ключ'].map((p, i) => (
                    <span key={i} className="text-sm text-[#7c847d] flex items-center gap-2">
                      {i > 0 && <span className="w-1 h-1 rounded-full bg-[#7c847d] inline-block" />}
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block w-full overflow-hidden rounded-2xl md:min-h-[600px] lg:min-h-[680px]">
              <video
                src="/videos/hero-squish.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="comparison" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Сравнение</SectionLabel>
          <div className="max-w-[820px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Обычные сувениры редко дают повторный контакт с брендом
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#7c847d]">
              Шоколад заканчивается, ручка теряется, блокнот не всегда под рукой.
              Бренд-объект выигрывает тем, что к нему возвращаются.
            </p>
          </div>

          <div className="mt-10 hidden overflow-hidden rounded-xl border border-[#e5e0d8] bg-white md:block">
            <table className="w-full border-collapse">
              <thead className="bg-[#ebe5dd] text-xs uppercase tracking-wider text-[#7c847d]">
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
                        className={`px-5 py-4 text-sm ${index === row.values.length - 1 ? 'bg-[#ff6a3d]/8' : 'text-[#7c847d]'}`}
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
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[0, 2, 4].map((origIdx) => (
                    <div key={`${row.label}-${origIdx}`} className="flex flex-col items-center gap-1.5 text-center">
                      <span className="text-[10px] uppercase tracking-wider text-[#7c847d]">
                        {comparisonCols[origIdx + 1]}
                      </span>
                      {origIdx === 4 ? (
                        <span className="inline-flex items-center rounded-full bg-[#ff6a3d] px-2 py-0.5 text-[10px] font-bold text-white">
                          {row.values[origIdx]}
                        </span>
                      ) : (
                        <span className="text-sm text-[#7c847d]">{row.values[origIdx]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-[#ebe5dd] p-6 text-base text-[#7c847d]">
            <span className="font-bold text-[#ff6a3d]">Вывод:</span> бренд-объект
            чаще остаётся в поле зрения и даёт повторный физический контакт с
            брендом.
          </div>
        </Container>
      </section>

      <section id="why_it_works" className="bg-[#f4efe8] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Почему это работает</SectionLabel>
          <div className="max-w-[760px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Тактильный контакт работает там, где визуальный — нет
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
                <p className="mt-4 text-base leading-7 text-[#7c847d]">{card.body}</p>
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
                Мягкий пенополиуретан с бархатистым покрытием. Объект пружинит и
                возвращает форму — руки тянутся к нему снова и снова.
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
              <img src="/images/texture/texture-1.webp" alt="Текстура поверхности бренд-объекта" className="w-full h-full object-cover rounded-xl" loading="lazy" />
              <img src="/images/texture/texture-2.webp" alt="Материал мягкого объекта крупным планом" className="w-full h-full object-cover rounded-xl" loading="lazy" />
            </div>
          </div>
        </Container>
      </section>

      <section id="gallery" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Примеры</SectionLabel>
          <div className="max-w-[680px]">
            <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-[#151716]">
              Реализованные бренд-объекты
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
                  <p className="mt-1 hidden md:block text-sm leading-relaxed text-[#7c847d]">
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
                Стать частью welcome kit — и остаться на столе
              </h2>
              <p className="mt-6 text-lg leading-8 text-[#7c847d]">
                Бренд-объект в составе корпоративного набора — первое физическое
                впечатление нового сотрудника или клиента. Формирует принадлежность
                с первого дня.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Welcome kit', 'Промонаборы', 'Event-пакеты', 'Подарки партнёрам'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded px-3.5 py-1.5 text-sm text-[#7c847d] ring-1 ring-inset ring-[#d0c9bf]"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <PrimaryButton href="#final_cta" className="mt-8">
                Запросить концепт
              </PrimaryButton>
            </div>

            <div className="order-1 md:order-2 overflow-hidden rounded-xl">
              <img
                src="/images/welcome-kit.webp"
                alt="Бренд-объект DeStressToys в составе корпоративного welcome kit"
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
              Подходит для любой точки контакта с брендом
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:gap-5 xl:grid-cols-4">
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
                <p className="mt-2 md:mt-4 text-sm md:text-base leading-6 md:leading-7 text-[#7c847d]">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="trust" className="bg-[#ebe5dd] py-10 md:py-16 xl:py-24">
        <Container>
          <SectionLabel>Доверие</SectionLabel>
          <p className="text-sm uppercase tracking-[0.08em] text-[#7c847d]">
            Бренды, которые уже сделали свой объект
          </p>

          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#ebe5dd] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#ebe5dd] to-transparent" />
            <div className="marquee-track flex w-max gap-4">
              {[...trustBrands, ...trustBrands].map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex h-16 w-44 shrink-0 items-center justify-center rounded-[12px] bg-white px-4 opacity-75 transition-opacity hover:opacity-100"
                >
                  {brand.logo}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <article className="max-w-[720px] rounded-[12px] border border-[#e5e0d8] bg-white p-8 md:p-10">
              <p className="text-base md:text-xl leading-7 md:leading-8 text-[#151716]">
                «Раньше мы дарили ручки и блокноты. После того как сделали фигуру
                нашего маскота — клиенты сами присылают фото с ним. Это стало частью
                бренда.»
              </p>
              <p className="mt-4 text-sm text-[#7c847d]">
                Алёна М., Head of Marketing, Placeholder Company
              </p>
            </article>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
            {[
              { title: 'Минимальный тираж', value: 'от 50 шт.' },
              { title: 'Концепт бесплатно', value: 'без предоплаты' },
              { title: 'Срок производства', value: '3–5 недель' },
              { title: 'Правки до утверждения', value: 'бесплатно' },
            ].map((item) => (
              <div key={item.title}>
                <p className="text-sm text-[#7c847d]">{item.title}</p>
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

      <section id="final_cta" className="bg-[#151716] py-10 md:py-16 xl:py-24">
        <Container>
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
            <div className="max-w-[420px]">
              <SectionLabel>Запрос концепта</SectionLabel>
              <h2 className="text-[1.75rem] md:text-[2.5rem] xl:text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Запросить концепт под ваш бренд
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
                  src="/images/cta/cta-main.webp"
                  alt="Бренд-объект на столе"
                  className="w-full h-[220px] object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-[#7c847d]">
                После заявки вы получите:
                <ul className="mt-3 space-y-2">
                  {['Предварительный визуальный концепт', 'Ориентир по тиражу и стоимости', 'Понимание, подходит ли формат под ваш бренд'].map(i => (
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

                  <div>
                    <label htmlFor="telegram" className="block text-sm font-medium text-[#7c847d] mb-1.5">Telegram</label>
                    <input id="telegram" name="telegram" type="text" placeholder="@username"
                      className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
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
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-[#7c847d] mb-1.5">Примерный тираж</label>
                        <input id="quantity" name="quantity" type="text" placeholder="200 / 500 / 1000"
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#7c847d] mb-1.5">Телефон</label>
                        <input id="phone" name="phone" type="tel" placeholder="+7"
                          className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-[#7c847d] focus:border-[#ff6a3d] focus:outline-none transition-colors" />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="reference" className="block text-sm font-medium text-[#7c847d] mb-1.5">Ссылка / референс</label>
                        <input id="reference" name="reference" type="url" placeholder="Figma, Drive, сайт"
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
