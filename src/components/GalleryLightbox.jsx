import { useEffect } from 'react'

export default function GalleryLightbox({ item, accentColor, onClose }) {
  useEffect(() => {
    if (!item) return undefined

    const previousOverflow = document.body.style.overflow

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-3xl leading-none text-[#151716] shadow-[0_4px_16px_rgba(0,0,0,0.16)] transition-colors hover:bg-white"
        >
          ×
        </button>
        <img
          src={item.image}
          alt={item.alt}
          className="w-full aspect-[5/4] object-cover bg-[#f4efe8]"
        />
        <div className="p-5">
          <p
            className="text-xs uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {item.label}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[#151716]">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#5a6060]">
            {item.body}
          </p>
        </div>
      </div>
    </div>
  )
}
