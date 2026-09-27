import { useEffect, useRef, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export default function ProcessSewingMedia({ className = '', mediaClassName = '' }) {
  const videoRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches,
  )

  useEffect(() => {
    const preference = window.matchMedia(reducedMotionQuery)
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })
    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [reducedMotion])

  return (
    <figure className={className}>
      {reducedMotion ? (
        <img
          src="/videos/process-sewing-poster.webp"
          width={864}
          height={486}
          alt="Сборка плюшевой игрушки на производстве"
          className={mediaClassName}
          loading="lazy"
        />
      ) : (
        <video
          ref={videoRef}
          src="/videos/process-sewing.mp4"
          poster="/videos/process-sewing-poster.webp"
          muted
          playsInline
          loop
          preload="none"
          width={864}
          height={486}
          aria-label="Сборка плюшевой игрушки на производстве"
          className={mediaClassName}
        />
      )}
      <figcaption>Съёмка на производстве</figcaption>
    </figure>
  )
}
