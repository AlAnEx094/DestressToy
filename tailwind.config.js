/** @type {import('tailwindcss').Config} */

// Дизайн-система DeStressToys (этап 2а, концепция DES-18 одобрена 26.09.2026).
// Все цвета, шрифты и ритм страницы берутся ТОЛЬКО отсюда: в разметке не должно
// появляться новых произвольных значений вида bg-[#...] или text-[17px].
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Поверхности
        canvas: '#F4EFE8',   // основной фон страницы (тёплый светлый)
        surface: '#EBE5DD',  // вторичная поверхность: карточки, полосы, выделенные блоки
        ink: '#151716',      // основной текст и тёмные плашки
        // Акцент
        accent: {
          DEFAULT: '#FF6A3D', // фон CTA. Текст на нём — только ink (7,1:1), не белый (2,5:1)
          hover: '#E85A2E',
        },
        // Текст и линии
        muted: '#4A524C',    // вторичный текст на canvas/surface (6,8:1)
        line: '#7C847D',     // ТОЛЬКО линии, рамки, разделители. Мелкий текст им не красить (3,4:1)
        'accent-deep': '#B8431C', // коралловый для МЕЛКОГО текста на светлом (4,8:1). #FF6A3D в тексте даёт 2,6:1
      },
      fontFamily: {
        // Inter подключён локально (inter-cyrillic.woff2 + inter-latin.woff2, font-display: swap)
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Заголовки: 390 / 768 / 1440. Межстрочный 1.04–1.12, как в концепции.
        'h1-m': ['2.625rem', { lineHeight: '1.04', letterSpacing: '-0.02em' }],   // 42
        'h1-t': ['4rem', { lineHeight: '1.04', letterSpacing: '-0.02em' }],       // 64
        'h1-d': ['4.5rem', { lineHeight: '1.04', letterSpacing: '-0.025em' }],    // 72 — рабочий размер H1 на 1440
        'display': ['5.5rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }], // 88 — только заголовки в 2–3 слова
        'h2-m': ['2rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],       // 32
        'h2-t': ['2.75rem', { lineHeight: '1.08', letterSpacing: '-0.015em' }],   // 44
        'h2-d': ['4rem', { lineHeight: '1.06', letterSpacing: '-0.02em' }],       // 64
        // Текст
        'body': ['1rem', { lineHeight: '1.6' }],                                  // 16
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],                           // 18
        'caption': ['0.875rem', { lineHeight: '1.5' }],                           // 14
      },
      spacing: {
        // Вертикальный ритм секций: 64 / 88 / 112
        'sec-m': '4rem',
        'sec-t': '5.5rem',
        'sec-d': '7rem',
        // Поля ~5vw: 20 / 38 / 72
        'gut-m': '1.25rem',
        'gut-t': '2.375rem',
        'gut-d': '4.5rem',
      },
      maxWidth: {
        // Ширина текстовой колонки: длинные русские строки не растягиваем
        measure: '34rem',
      },
      transitionDuration: {
        // Длительность единственного допустимого движения в секции
        reveal: '350ms',
      },
    },
  },
  plugins: [],
}
