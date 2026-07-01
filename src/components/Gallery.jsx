import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { categories, photos } from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
}

export default function Gallery({ onOpen }) {
  const [active, setActive] = useState('Tous')

  const visible = useMemo(
    () => (active === 'Tous' ? photos : photos.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section className="gallery" id="galerie">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-head__eyebrow">Notre journée en images</p>
        <h2 className="section-head__title">La galerie</h2>
        <p className="section-head__lead">
          Chaque cliché raconte un fragment de ce jour unique. Cliquez sur une photo
          pour la savourer en grand.
        </p>
      </motion.div>

      <div className="filters" role="tablist" aria-label="Filtrer les photos">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            className={`filter ${active === cat ? 'filter--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {active === cat && (
              <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 320, damping: 30 }} />
            )}
            <span className="filter__label">{cat}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="masonry">
        <AnimatePresence mode="popLayout">
          {visible.map((photo) => (
            <motion.button
              type="button"
              key={photo.id}
              layout
              variants={card}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover={{ y: -6 }}
              className={`tile tile--${photo.span}`}
              onClick={() => onOpen(photo)}
            >
              <PhotoPlaceholder photo={photo} />
              <div className="tile__shade" />
              <div className="tile__caption">
                <span className="tile__cat">{photo.category}</span>
                <h3 className="tile__title">{photo.title}</h3>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
