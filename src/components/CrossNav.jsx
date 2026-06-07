import { Link } from 'react-router-dom'

export default function CrossNav({ variant }) {
  const isAntistress = variant === 'antistress'
  return (
    <div className="border-t border-white/[0.06] bg-[#151716]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 xl:px-20 py-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.06em] text-[#7c847d]">
          Другой формат на заказ
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          {isAntistress ? (
            <div className="flex-1 rounded-xl border border-[#ff6a3d]/30 bg-[#ff6a3d]/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ff6a3d]">Вы здесь</p>
              <p className="mt-1 text-sm font-semibold text-white">Антистресс из ПУ-пены</p>
              <p className="mt-0.5 text-xs text-[#7c847d]">Тираж от 500 шт · от 600 ₽/шт · event, промо, стол</p>
            </div>
          ) : (
            <Link
              to="/"
              className="group flex-1 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#ff6a3d]/40 hover:bg-white/[0.08]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#ff6a3d]/70 transition-opacity group-hover:text-[#ff6a3d]">
                ← Антистресс из ПУ-пены
              </p>
              <p className="mt-1 text-sm font-semibold text-white">Сжимается, возвращает форму. Бархатистое покрытие</p>
              <p className="mt-0.5 text-xs text-[#7c847d]">Тираж от 500 шт · от 600 ₽/шт</p>
            </Link>
          )}
          {!isAntistress ? (
            <div className="flex-1 rounded-xl border border-[#9b7be8]/30 bg-[#9b7be8]/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9b7be8]">Вы здесь</p>
              <p className="mt-1 text-sm font-semibold text-white">Мягкая плюшевая игрушка</p>
              <p className="mt-0.5 text-xs text-[#7c847d]">Тираж от 300 шт · от 1 200 ₽/шт · подарок, HR, онбординг</p>
            </div>
          ) : (
            <Link
              to="/plush"
              className="group flex-1 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#9b7be8]/40 hover:bg-white/[0.08]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9b7be8]/70 transition-opacity group-hover:text-[#9b7be8]">
                Мягкая плюшевая игрушка →
              </p>
              <p className="mt-1 text-sm font-semibold text-white">Плюш с вышивкой. Высокая воспринимаемая ценность</p>
              <p className="mt-0.5 text-xs text-[#7c847d]">Тираж от 300 шт · от 1 200 ₽/шт</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
