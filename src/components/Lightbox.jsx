import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect } from 'react'
import { photos } from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

export default function Lightbox({ photo, onClose, onNavigate }) {
  const go = useCallback(
    (dir) => {
      const idx = photos.findIndex((p) => p.id === photo?.id)
      if (idx === -1) return
      const next = (idx + dir + photos.length) % photos.length
      onNavigate(photos[next])
    },
    [photo, onNavigate],
  )

  useEffect(() => {
    if (!photo) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [photo, go, onClose])

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
        >
          <button className="lightbox__close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); go(-1) }}
            aria-label="Photo précédente"
          >
            ‹
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={photo.id}
              className="lightbox__figure"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox__frame">
                <PhotoPlaceholder photo={photo} />
              </div>
              <figcaption className="lightbox__caption">
                <span className="lightbox__cat">{photo.category}</span>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); go(1) }}
            aria-label="Photo suivante"
          >
            ›
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
