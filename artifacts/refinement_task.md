# Refinement Task — Iteration 1

## Context
- iteration: 1
- match level before patch: medium (68%)
- reference: ./artifacts/reference.png
- file to patch: src/pages/LandingPage.jsx

---

## Patch 1 — Hero headline font size

- file: src/pages/LandingPage.jsx
- issue: h1 в hero оборачивается в 5 строк, визуальный вес потерян
- required: 2–3 строки на desktop, крупная display-типографика
- implementation:
  Find the hero `<h1>` element and change its className to:
  ```
  text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] text-white max-w-[580px]
  ```

---

## Patch 2 — Hero section min-height

- file: src/pages/LandingPage.jsx
- issue: секция hero слишком короткая — не занимает экран
- required: min-height 88vh, колонки выравнены по центру вертикально
- implementation:
  Find the hero `<section>` wrapper. Add to its className:
  ```
  min-h-[88vh] flex items-center
  ```
  The inner container (the two-column div) should be `w-full`.

---

## Patch 3 — Hero right column image placeholder height

- file: src/pages/LandingPage.jsx
- issue: placeholder изображения занимает ~300px вместо полной высоты колонки
- required: заполнить всю высоту правой колонки
- implementation:
  Find the right-column image placeholder div. Replace its height classes with:
  ```
  h-full min-h-[520px] w-full
  ```
  Ensure the right column itself has `h-full` so it stretches with the section.
  The two-column flex container should have `items-stretch` (not `items-center`).

---

## Patch 4 — Comparison columns visual contrast

- file: src/pages/LandingPage.jsx
- issue: обе колонки comparison выглядят одинаково — нет визуального противопоставления
- required:
  Left column (Обычный мерч):
  - Title: `text-[#7c847d] font-semibold text-lg`
  - Row text: `text-[#7c847d]`
  Right column (DeStressToys):
  - Title: add `<span className="border-b-2 border-[#ff6a3d] pb-0.5">Бренд-объект DeStressToys</span>` inside the h3
  - Each row: prepend `<span className="text-[#ff6a3d] font-bold mr-2">✓</span>` before the text
  - Row text: `text-[#151716] font-medium`

---

## Patch 5 — Proof points under hero CTA

- file: src/pages/LandingPage.jsx
- issue: proof points отсутствуют или не видны под CTA-кнопкой
- required: 3 тезиса в ряд с dot-сепаратором под кнопкой
- implementation:
  After the CTA button in hero, ensure this block exists:
  ```jsx
  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4">
    {['Форма под любой бренд', 'Тираж от 50 штук', 'Производство под ключ'].map((p, i) => (
      <span key={i} className="text-sm text-[#7c847d] flex items-center gap-2">
        {i > 0 && <span className="w-1 h-1 rounded-full bg-[#7c847d] inline-block" />}
        {p}
      </span>
    ))}
  </div>
  ```

---

## Patch 6 — Why it works cards border

- file: src/pages/LandingPage.jsx
- issue: карточки сливаются с sandy фоном
- required: белый фон с subtle border
- implementation:
  Find the why-it-works card divs. Change their className to include:
  ```
  bg-white border border-[#e5e0d8] rounded-xl p-8
  ```

---

## Patch 7 — Header DS logo size

- file: src/pages/LandingPage.jsx
- issue: "DS" логотип слишком мал
- required: крупный уверенный text-mark
- implementation:
  Find the logo element. Change its className to:
  ```
  text-xl font-bold text-white tracking-tight
  ```

---

## Do NOT change
- Порядок всех 13 секций
- Цвета секций (какая тёмная, какая светлая)
- Структуру и логику Process секции
- Gallery grid и его плейсхолдеры
- Welcome Box секцию
- Texture секцию
- Use Cases карточки
- Trust секцию
- FAQ аккордеон и его логику
- Final CTA форму, её поля и success state
- Footer
- React Router настройку и Privacy page
- Ни один из Tailwind конфиг-файлов

---

## Acceptance
- Скриншоты обновлены на 1440px, 1024px, 390px: `node screenshot.js`
- Hero занимает ~88vh на десктопе
- Заголовок hero — 2–3 строки, крупный
- Правая колонка hero — placeholder заполняет высоту секции
- Comparison — left muted gray-green, right dark с coral checkmarks
- Все остальные секции без изменений
