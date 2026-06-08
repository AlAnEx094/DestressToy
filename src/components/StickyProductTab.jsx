import { Link } from 'react-router-dom'

export default function StickyProductTab({ variant }) {
  const isAntistress = variant === 'antistress'

  return (
    <div className="sticky top-16 z-40 border-b border-white/[0.06] bg-[#151716]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 xl:px-20">
        <div className="flex h-10 items-center gap-1">
          {isAntistress ? (
            <span className="flex items-center gap-1.5 rounded-md border border-[#ff6a3d]/25 bg-[#ff6a3d]/10 px-3 py-1 text-xs font-semibold text-[#ff6a3d]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a3d]" />
              Антистресс ПУ-пена
            </span>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium text-[#7c847d] transition-colors hover:bg-white/5 hover:text-white"
            >
              Антистресс ПУ-пена
            </Link>
          )}

          {!isAntistress ? (
            <span className="flex items-center gap-1.5 rounded-md border border-[#9b7be8]/25 bg-[#9b7be8]/10 px-3 py-1 text-xs font-semibold text-[#9b7be8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9b7be8]" />
              Мягкая игрушка
            </span>
          ) : (
            <Link
              to="/plush"
              className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium text-[#7c847d] transition-colors hover:bg-white/5 hover:text-white"
            >
              Мягкая игрушка
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
