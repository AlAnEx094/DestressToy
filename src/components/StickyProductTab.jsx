import { Link } from 'react-router-dom'

export default function StickyProductTab({ variant }) {
  const isAntistress = variant === 'antistress'

  return (
    <div className="sticky top-16 z-40 border-b border-line/20 bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-gut-m md:px-gut-t xl:px-gut-d">
        <div className="flex h-10 items-center gap-1">
          {isAntistress ? (
            <span className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Антистресс ПУ-пена
            </span>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              Антистресс ПУ-пена
            </Link>
          )}

          {!isAntistress ? (
            <span className="flex items-center gap-1.5 rounded-md border border-line/40 bg-surface px-3 py-1 text-xs font-semibold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Мягкая игрушка
            </span>
          ) : (
            <Link
              to="/plush"
              className="flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              Мягкая игрушка
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
