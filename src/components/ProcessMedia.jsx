import { useEffect, useRef, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

/**
 * Ленивое производственное видео: постер вместо видео при prefers-reduced-motion,
 * запуск только когда ролик виден, пауза при уходе из зоны видимости.
 * Подпись всегда «Съёмка на производстве» — принадлежность фабрики не подтверждена
 * (см. public/videos/README.md).
 */
export default function ProcessMedia({
  src,
  poster,
  width,
  height,
  alt,
  caption = 'Съёмка на производстве',
  className = '',
  mediaClassName = '',
  captionClassName = '',
}) {
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
          src={poster}
          width={width}
          height={height}
          alt={alt}
          className={mediaClassName}
          loading="lazy"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="none"
          width={width}
          height={height}
          aria-label={alt}
          className={mediaClassName}
        />
      )}
      <figcaption className={captionClassName}>{caption}</figcaption>
    </figure>
  )
}
