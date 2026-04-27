# Reference Selection — DeStressToys

## Candidates reviewed
- Variant A: Conservative / Restrained Editorial
- Variant B: Premium Editorial / High Contrast Rhythm
- Variant C: Bold Tactile / Dark-Forward

## Decision
- **Selected: Variant B**

## Why selected
1. **Best hierarchy for the goal**: структура hero → comparison → why it works — прямой конверсионный путь. Один dominant message, один CTA.
2. **Clearest CTA emphasis**: коралловая кнопка изолирована на тёмном фоне hero, мгновенно считывается. Нет конкурирующих визуальных элементов.
3. **Most realistic to implement**: чёткая двухколоночная сетка, clean секции, нет сложных multi-object arrangments как в C.
4. **Strongest style fit**: крупный close-up продукта на тёмном (#151716) фоне — единственный вариант, который визуально передаёт тактильность и материальность объекта. Это ключевое УТП продукта.
5. **Best fit with B2B audience**: уверенный, premium, не перегруженный. Маркетолог или закупщик считает "серьёзный бренд", а не "стартап".

## Rejected variants

### Variant A
- Светлый фон доминирует, продукт мелкий — тактильность и материальность объекта не передаётся
- Выглядит как generic B2B SaaS, не дифференцирует физический продукт
- Сдержанность работает против продукта, которому нужна визуальная "осязаемость"

### Variant C
- Три продукта в hero дробят фокус — нет единственного сильного hero-объекта
- Сплошной тёмный фон через все секции → проблема читаемости текстовых блоков (comparison, process)
- Более сложная реализация, выше риск визуальных деградаций при переводе в код

## Assumptions
- Реальная product-фотография заменит placeholder при финальном запуске
- Цветовая схема hero: тёмный (#151716) background, белый текст, коралловый (#ff6a3d) CTA

## Next action
- Конвертировать Variant B в ui_spec.json
- Написать acceptance.md
