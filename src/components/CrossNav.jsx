import { Link } from 'react-router-dom'

export default function CrossNav({ variant }) {
  if (variant === 'antistress') {
    return (
      <div className="bg-stone-100 py-2 px-6 text-center">
        <span className="text-sm text-stone-500">
          Ищете мягкую плюшевую игрушку?{' '}
          <Link to="/plush" className="text-stone-700 underline hover:text-stone-900">
            Смотреть плюш →
          </Link>
        </span>
      </div>
    )
  }
  return (
    <div className="bg-stone-100 py-2 px-6 text-center">
      <span className="text-sm text-stone-500">
        Нужен антистресс-маскот из ПУ-пены?{' '}
        <Link to="/" className="text-stone-700 underline hover:text-stone-900">
          Смотреть антистресс →
        </Link>
      </span>
    </div>
  )
}
