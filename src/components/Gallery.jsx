import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categories as baseCategories } from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
}

export default function Gallery({
  photos,
  folders,
  onOpen,
  onAddFiles,
  onCreateFolder,
  onDelete,
  onDeleteFolder,
}) {
  const [active, setActive] = useState('Tous')
  const [dragging, setDragging] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const inputRef = useRef(null)

  const tabs = useMemo(() => [...baseCategories, ...folders], [folders])
  const isUserFolder = folders.includes(active)
  const countFor = (tab) => (tab === 'Tous' ? photos.length : photos.filter((p) => p.category === tab).length)

  const visible = useMemo(
    () => (active === 'Tous' ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  )

  // Revenir à "Tous" si le dossier actif vient d'être supprimé.
  useEffect(() => {
    if (active !== 'Tous' && !tabs.includes(active)) setActive('Tous')
  }, [tabs, active])

  const handleFiles = (fileList) => {
    if (fileList?.length && isUserFolder) onAddFiles(fileList, active)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const submitFolder = (e) => {
    e.preventDefault()
    const created = onCreateFolder(newName)
    if (created) {
      setActive(created)
      setNewName('')
      setCreating(false)
    }
  }

  const confirmDeleteFolder = (name) => {
    const n = photos.filter((p) => p.category === name).length
    const msg = n
      ? `Supprimer le dossier « ${name} » et ses ${n} photo(s) ?`
      : `Supprimer le dossier « ${name} » ?`
    if (window.confirm(msg)) onDeleteFolder(name)
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
          Parcourez nos souvenirs par moment de la journée, créez vos propres
          albums et rangez-y vos photos.
        </p>
      </motion.div>

      <div className="toolbar">
        <div className="filters" role="tablist" aria-label="Filtrer les photos">
          {tabs.map((tab) => {
            const deletable = folders.includes(tab)
            return (
              <div key={tab} className={`filter ${active === tab ? 'filter--active' : ''}`}>
                {active === tab && (
                  <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 320, damping: 30 }} />
                )}
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === tab}
                  className="filter__label"
                  onClick={() => setActive(tab)}
                >
                  {deletable && <span className="filter__dot" aria-hidden="true" />}
                  {tab}
                  <span className="filter__count">{countFor(tab)}</span>
                </button>
                {deletable && (
                  <button
                    type="button"
                    className="filter__del"
                    aria-label={`Supprimer le dossier ${tab}`}
                    onClick={() => confirmDeleteFolder(tab)}
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })}

          <button
            type="button"
            className="filter filter--new"
            onClick={() => setCreating((c) => !c)}
          >
            <span className="filter__label">＋ Nouveau dossier</span>
          </button>
        </div>

        <AnimatePresence>
          {creating && (
            <motion.form
              className="folder-new"
              onSubmit={submitFolder}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <input
                className="folder-new__input"
                autoFocus
                type="text"
                placeholder="Nom du dossier (ex. Lune de miel, Famille…)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button type="submit" className="folder-new__btn">Créer</button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="uploader">
          {isUserFolder ? (
            <motion.button
              type="button"
              className="add-btn"
              onClick={() => inputRef.current?.click()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span aria-hidden="true">＋</span> Importer des photos dans « {active} »
            </motion.button>
          ) : (
            <p className="uploader__hint">
              Sélectionnez ou créez un dossier pour y importer vos photos.
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => { handleFiles(e.target.files); e.target.value = '' }}
          />
        </div>
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

      {visible.length === 0 && (
        <p className="gallery__empty">
          Ce dossier est vide — importez-y vos premières photos ✨
        </p>
      )}

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
              <p>
                {isUserFolder
                  ? `Déposez vos photos dans « ${active} »`
                  : 'Sélectionnez d’abord un dossier'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
