import { Link } from 'react-router-dom'

export default function CrossNav({ variant }) {
  const isAntistress = variant === 'antistress'
  return (
    <div className="bg-stone-100 border-b border-stone-200 py-2 px-4">
      <div className="mx-auto flex max-w-3xl items-center justify-center">
        {isAntistress ? (
          <div className="flex-1 text-center px-3 py-1">
            <p className="text-xs font-semibold text-stone-800">Антистресс из ПУ-пены</p>
            <p className="text-[11px] text-stone-500">от 500 шт · от 600 ₽/шт · event, промо, стол</p>
          </div>
        ) : (
          <Link to="/" className="flex-1 text-center px-3 py-1 rounded transition-colors hover:bg-stone-200">
            <p className="text-xs font-medium text-stone-500 hover:text-stone-800">← Антистресс из ПУ-пены</p>
            <p className="text-[11px] text-stone-400">от 500 шт · от 600 ₽/шт</p>
          </Link>
        )}
        <div className="mx-2 h-8 w-px bg-stone-300 shrink-0" />
        {!isAntistress ? (
          <div className="flex-1 text-center px-3 py-1">
            <p className="text-xs font-semibold text-stone-800">Мягкая плюшевая игрушка</p>
            <p className="text-[11px] text-stone-500">от 300 шт · от 850 ₽/шт · подарок, HR, онбординг</p>
          </div>
        ) : (
          <Link to="/plush" className="flex-1 text-center px-3 py-1 rounded transition-colors hover:bg-stone-200">
            <p className="text-xs font-medium text-stone-500 hover:text-stone-800">Мягкая плюшевая игрушка →</p>
            <p className="text-[11px] text-stone-400">от 300 шт · от 850 ₽/шт</p>
          </Link>
        )}
      </div>
    </div>
  )
}
