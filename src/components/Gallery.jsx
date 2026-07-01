import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { categories as baseCategories } from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
}

export default function Gallery({ photos, hasUploads, onOpen, onAddFiles, onDelete }) {
  const [active, setActive] = useState('Tous')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const categories = useMemo(
    () => (hasUploads ? [...baseCategories, 'Mes photos'] : baseCategories),
    [hasUploads],
  )

  const visible = useMemo(
    () => (active === 'Tous' ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  )

  const handleFiles = (fileList) => {
    if (fileList?.length) onAddFiles(fileList)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <section
      className={`gallery ${dragging ? 'gallery--dragging' : ''}`}
      id="galerie"
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false) }}
      onDrop={onDrop}
    >
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
          pour la savourer en grand — ou ajoutez les vôtres.
        </p>
      </motion.div>

      <div className="gallery__toolbar">
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

        <motion.button
          type="button"
          className="add-btn"
          onClick={() => inputRef.current?.click()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span aria-hidden="true">＋</span> Ajouter mes photos
        </motion.button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }}
        />
      </div>

      <motion.div layout className="masonry">
        <AnimatePresence mode="popLayout">
          {visible.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              variants={card}
              initial="hidden"
              animate="show"
              exit="exit"
              whileHover={{ y: -6 }}
              className={`tile tile--${photo.span}`}
            >
              <button type="button" className="tile__open" onClick={() => onOpen(photo)}>
                <PhotoPlaceholder photo={photo} />
                <div className="tile__shade" />
                <div className="tile__caption">
                  <span className="tile__cat">{photo.category}</span>
                  <h3 className="tile__title">{photo.title}</h3>
                </div>
              </button>
              {photo.uploaded && (
                <button
                  type="button"
                  className="tile__delete"
                  aria-label={`Supprimer ${photo.title}`}
                  onClick={() => onDelete(photo.id)}
                >
                  ×
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {dragging && (
          <motion.div
            className="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="dropzone__inner">
              <span className="dropzone__icon" aria-hidden="true">⬆</span>
              <p>Déposez vos photos pour les ajouter à l’album</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
