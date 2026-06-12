import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookies_ok')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookies_ok', '1')
    window.dispatchEvent(new Event('cookies_accepted'))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#151716] border-t border-white/10 px-5 py-4">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#7c847d]">
          Мы используем файлы cookie и Яндекс.Метрику для анализа посещаемости сайта.{' '}
          <a href="/privacy" className="underline text-white/60 hover:text-white transition-colors">
            Политика конфиденциальности
          </a>
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-md bg-[#ff6a3d] px-5 py-2 text-sm font-semibold text-white hover:bg-[#e85a2e] transition-colors"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}
