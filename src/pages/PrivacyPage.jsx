import { Link } from 'react-router-dom'

function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20 ${className}`}>
      {children}
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4efe8] text-[#151716]">
      <header className="border-b border-white/10 bg-[#151716] py-5">
        <Container className="flex items-center justify-between gap-4">
          <Link to="/" className="text-[22px] font-bold tracking-[-0.02em] text-white">
            DS
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
              Privacy
            </p>
            <h1 className="mt-4 text-[2.5rem] font-bold leading-[1.1] tracking-[-0.02em] md:text-[3rem]">
              Политика конфиденциальности
            </h1>
            <p className="mt-4 text-base leading-7 text-[#7c847d]">
              Эта страница описывает, какие данные собирает DeStressToys при отправке
              заявки и как они используются для подготовки концепта бренд-объекта.
            </p>

            <div className="mt-10 space-y-8">
              <section>
                <h2 className="text-xl font-semibold">Какие данные мы получаем</h2>
                <p className="mt-3 text-base leading-7 text-[#7c847d]">
                  Имя, название компании, email и текст запроса, который вы
                  оставляете в форме на сайте.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">Зачем мы используем данные</h2>
                <p className="mt-3 text-base leading-7 text-[#7c847d]">
                  Чтобы связаться с вами, уточнить задачу и подготовить бесплатный
                  концепт бренд-объекта под ваш бренд.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">Передача третьим лицам</h2>
                <p className="mt-3 text-base leading-7 text-[#7c847d]">
                  Мы не передаём персональные данные третьим лицам, кроме случаев,
                  когда это требуется законом или необходимо для доставки согласованного
                  заказа.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">Оператор персональных данных</h2>
                <p className="mt-3 text-base leading-7 text-[#7c847d]">
                  ИП Антипов Алексей Александрович<br />
                  ИНН 712807991969 · ОГРНИП 325710000056557
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">Контакты</h2>
                <p className="mt-3 text-base leading-7 text-[#7c847d]">
                  По вопросам обработки персональных данных напишите на{' '}
                  <a
                    href="mailto:AlexeyAntipov4233@yandex.ru"
                    className="text-[#151716] underline underline-offset-2 hover:text-[#ff6a3d] transition-colors"
                  >
                    AlexeyAntipov4233@yandex.ru
                  </a>
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
