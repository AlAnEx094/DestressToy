# Рекламная аналитика DeStressToys

## Что уже заложено на сайте

Счётчик Яндекс Метрики:

- ID: `108979976`
- включены: clickmap, trackLinks, accurateTrackBounce, webvisor.

Сайт сохраняет рекламную атрибуцию в рамках сессии:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `yclid`
- `ymclid`
- `gclid`
- `gbraid`
- `wbraid`
- `fbclid`
- `openstat`
- `session_id`
- `landing_page`
- `current_page`
- `referrer`

При отправке формы в webhook n8n также передаются:

- `lead_id`
- `submitted_at`
- контактные данные клиента;
- описание задачи;
- тираж;
- ссылка на референсы;
- способ передачи материалов;
- выбранная вкладка стоимости: `pu` или `plush`;
- рекламная атрибуция из списка выше.

## События / цели

Эти события отправляются в:

- Яндекс Метрику через `ym(..., 'reachGoal', ...)`;
- Google Analytics, если когда-нибудь будет подключён `gtag`;
- `dataLayer`, если позже будет подключён GTM.

| Событие | Когда срабатывает | Зачем нужно |
| --- | --- | --- |
| `cta_click` | Клик по основным CTA | Понять, какие блоки ведут к заявке |
| `pricing_tab_click` | Переключение ПУ / плюш | Видеть интерес к типу изделия |
| `contact_phone_click` | Клик по телефону | Отдельная цель для звонков |
| `contact_email_copy` | Копирование email | Отдельная цель для заявок через почту |
| `contact_telegram_click` | Клик по Telegram | Отдельная цель для переходов в Telegram-бот |
| `contact_max_click` | Клик по MAX | Отдельная цель для заявок через MAX |
| `lead_form_submit` | Нажатие отправки формы | Черновая конверсия до ответа webhook |
| `lead_form_success` | Форма принята сайтом | Основная цель заявки |

## Что нужно настроить в Яндекс Метрике

В интерфейсе Метрики создать JavaScript-события:

1. `lead_form_success` — основная цель.
2. `lead_form_submit` — вспомогательная цель.
3. `contact_phone_click` — звонки.
4. `contact_email_copy` — копирование почты.
5. `contact_telegram_click` — переходы в Telegram.
6. `contact_max_click` — переходы в MAX.
7. `cta_click` — интерес к расчёту.
8. `pricing_tab_click` — интерес к формату изделия.

Для Яндекс Директа основной целью лучше назначить `lead_form_success`.

Второстепенные цели можно использовать для оптимизации после накопления статистики:

- `contact_phone_click`;
- `contact_email_copy`;
- `contact_telegram_click`;
- `contact_max_click`;
- `cta_click`.

## Что нужно проверить вручную

1. Открыть сайт с тестовыми UTM:

   `https://destresstoys.ru/?utm_source=test&utm_medium=cpc&utm_campaign=analytics_check&utm_content=button&utm_term=plush&yclid=test_yclid`

2. Нажать:

   - CTA "Рассчитать стоимость";
   - вкладку стоимости "Плюшевые";
   - телефон;
   - email.

3. Отправить тестовую заявку.

4. Проверить в Метрике:

   - Вебвизор;
   - отчёт по целям;
   - параметры визита;
   - наличие `yclid`.

5. Проверить в n8n / CRM, что в заявке есть:

   - `lead_id`;
   - `session_id`;
   - `utm_*`;
   - `yclid`;
   - `landing_page`;
   - `referrer`;
   - `current_pricing_tab`.

## Telegram и MAX

Telegram:

- для рекламы лучше использовать бота, если он фиксирует заявку, источник и не теряет сообщения;
- личный Telegram лучше оставить как резервный канал, а не как основной рекламный CTA.
- текущая ссылка на сайте ведёт в Telegram-бота: `https://t.me/DestressToys_bot`.

MAX:

- временно можно использовать личный профиль для теста;
- текущая тестовая ссылка: `https://max.ru/u/f9LHodD0cOKaimmN-xgqBCQy-efE6Jo5-pFyieeix86sJ3PrxufNqwd3h_k`;
- после появления рабочего аккаунта заменить личную ссылку на рабочую.

## Что ещё осталось

1. Создать цели в Яндекс Метрике вручную.
2. Проверить фактическое попадание тестовой заявки в amoCRM.
3. Решить, какой канал будет основным: форма, Telegram-бот, MAX или телефон.
4. Добавить рабочие ссылки Telegram/MAX только после проверки, что они не ломают учёт заявок.
5. Связать расходы Яндекс Директа с фактическими сделками в amoCRM.
