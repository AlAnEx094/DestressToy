import { Link } from 'react-router-dom'

function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20 ${className}`}>
      {children}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[#151716]">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-7 text-[#5a6060]">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4efe8] text-[#151716]">
      <header className="border-b border-white/10 bg-[#151716] py-5">
        <Container className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo-bear.webp" alt="DeStressToys" className="h-9 w-auto" />
            <span className="text-xl font-bold tracking-tight text-white">DeStressToys</span>
          </Link>
          <Link
            to="/"
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/35"
          >
            На главную
          </Link>
        </Container>
      </header>

      <section className="py-12 md:py-16 xl:py-24">
        <Container>
          <div className="max-w-[820px] rounded-[12px] border border-[#e5e0d8] bg-white p-8 md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#ff6a3d]">
              Правовые документы
            </p>
            <h1 className="mt-4 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
              Политика конфиденциальности
            </h1>
            <p className="mt-3 text-sm text-[#7c847d]">
              Последнее обновление: 8 июня 2026 г.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5a6060]">
              Настоящая Политика конфиденциальности описывает порядок сбора, хранения и обработки персональных данных пользователей сайта <strong>destresstoys.ru</strong> в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».
            </p>

            <div className="mt-10 space-y-8">

              <Section title="1. Оператор персональных данных">
                <p>
                  ИП Антипов Алексей Александрович<br />
                  ИНН 712807991969 · ОГРНИП 325710000056557<br />
                  Электронная почта: <a href="mailto:info@destresstoys.ru" className="text-[#ff6a3d] underline underline-offset-2 hover:opacity-80 transition-opacity">info@destresstoys.ru</a>
                </p>
              </Section>

              <Section title="2. Какие персональные данные мы собираем">
                <p>При заполнении формы на сайте мы получаем следующие данные:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Имя и/или название компании</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона (если указан)</li>
                  <li>Текст запроса и тираж</li>
                </ul>
                <p>Автоматически при посещении сайта собираются технические данные:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>IP-адрес и данные браузера</li>
                  <li>Страницы и разделы сайта, которые вы посещаете</li>
                  <li>Источник перехода (UTM-метки)</li>
                  <li>Файлы cookie Яндекс.Метрики</li>
                </ul>
              </Section>

              <Section title="3. Цели обработки данных">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Обработка заявки и связь с потенциальным клиентом</li>
                  <li>Подготовка коммерческого предложения</li>
                  <li>Отправка подтверждения о принятии заявки</li>
                  <li>Анализ посещаемости и улучшение сайта (Яндекс.Метрика)</li>
                </ul>
              </Section>

              <Section title="4. Правовое основание обработки">
                <p>
                  Обработка данных, переданных через форму, осуществляется на основании согласия субъекта персональных данных (ст. 9 152-ФЗ), которое выражается при установке соответствующей отметки в форме перед отправкой заявки.
                </p>
                <p>
                  Сбор технических данных (cookie, IP) осуществляется на основании согласия, выраженного через баннер при первом посещении сайта.
                </p>
              </Section>

              <Section title="5. Передача данных третьим лицам">
                <p>Для обработки заявок данные могут передаваться следующим сервисам, расположенным на территории РФ:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>AmoCRM</strong> (ООО «Стрим», РФ) — CRM-система для ведения сделок</li>
                  <li><strong>Яндекс.Метрика</strong> (ООО «Яндекс», РФ) — веб-аналитика</li>
                  <li><strong>Telegram / MAX</strong> — мессенджеры для уведомления оператора о новой заявке</li>
                  <li><strong>Яндекс.Почта</strong> — почтовый сервис для отправки подтверждений</li>
                </ul>
                <p>
                  Трансграничная передача персональных данных не осуществляется. Иным третьим лицам данные не передаются, за исключением случаев, предусмотренных законодательством РФ.
                </p>
              </Section>

              <Section title="6. Сроки хранения данных">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Данные заявок — 3 года с момента последнего взаимодействия</li>
                  <li>Данные Яндекс.Метрики — в соответствии с политикой Яндекса (до 2 лет)</li>
                  <li>Cookie — до 1 года или до очистки браузера</li>
                </ul>
                <p>По истечении срока данные удаляются или обезличиваются.</p>
              </Section>

              <Section title="7. Файлы cookie">
                <p>
                  Сайт использует файлы cookie для работы Яндекс.Метрики: сбора статистики посещаемости, анализа источников трафика и поведения пользователей. Cookie не содержат персональных данных напрямую.
                </p>
                <p>
                  При первом посещении сайта отображается баннер с запросом согласия на использование cookie. Вы можете отклонить cookie, однако это не повлияет на работу основного функционала сайта.
                </p>
              </Section>

              <Section title="8. Права субъекта персональных данных">
                <p>В соответствии с 152-ФЗ вы имеете право:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Получить информацию об обрабатываемых персональных данных</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Потребовать удаления данных (право на забвение)</li>
                  <li>Отозвать ранее данное согласие на обработку</li>
                  <li>Обжаловать действия оператора в Роскомнадзор</li>
                </ul>
                <p>
                  Для реализации прав направьте запрос на <a href="mailto:info@destresstoys.ru" className="text-[#ff6a3d] underline underline-offset-2 hover:opacity-80 transition-opacity">info@destresstoys.ru</a>. Мы ответим в течение 30 дней.
                </p>
              </Section>

              <Section title="9. Безопасность данных">
                <p>
                  Мы принимаем организационные и технические меры для защиты персональных данных от несанкционированного доступа: передача данных осуществляется по протоколу HTTPS, доступ к CRM и базам данных ограничен.
                </p>
              </Section>

              <Section title="10. Изменения в политике">
                <p>
                  Мы можем обновлять настоящую Политику. Актуальная версия всегда доступна на этой странице. Дата последнего обновления указана в начале документа.
                </p>
              </Section>

              <Section title="11. Контакты">
                <p>
                  По вопросам обработки персональных данных обращайтесь:<br />
                  <a href="mailto:info@destresstoys.ru" className="text-[#ff6a3d] underline underline-offset-2 hover:opacity-80 transition-opacity">info@destresstoys.ru</a>
                </p>
              </Section>

            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
