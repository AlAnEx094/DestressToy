import { useState, useEffect, useRef, useCallback } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!localStorage.getItem('cookies_ok')) {
      setVisible(true)
    }
  }, [])

  // Публикуем высоту баннера, чтобы мобильный CTA вставал над ним, а не под ним.
  const publishHeight = useCallback(() => {
    const h = ref.current ? ref.current.offsetHeight : 0
    document.documentElement.style.setProperty('--cookie-banner-h', `${h}px`)
  }, [])

  useEffect(() => {
    if (!visible) {
      document.documentElement.style.setProperty('--cookie-banner-h', '0px')
      return
    }
    publishHeight()
    window.addEventListener('resize', publishHeight)
    return () => window.removeEventListener('resize', publishHeight)
  }, [visible, publishHeight])

  function accept() {
    localStorage.setItem('cookies_ok', '1')
    window.dispatchEvent(new Event('cookies_accepted'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-[60] bg-[#151716] border-t border-white/10 px-5 py-2.5"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
        <p className="text-xs leading-5 text-[#9aa29b] sm:text-sm">
          Мы используем cookie и Яндекс.Метрику.{' '}
          <a href="/privacy" className="underline hover:text-white transition-colors">
            Политика конфиденциальности
          </a>
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-md bg-[#ff6a3d] px-4 py-2 text-sm font-semibold text-[#151716] hover:bg-[#ff8a4c] transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}
