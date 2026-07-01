import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categories as baseCategories } from '../data/photos'
import PhotoPlaceholder from './PhotoPlaceholder'

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
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
  onRenameFolder,
}) {
  const [active, setActive] = useState('Tous')
  const [dragging, setDragging] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [renaming, setRenaming] = useState(false)
  const [renameValue, setRenameValue] = useState('')
  const inputRef = useRef(null)

  const tabs = useMemo(() => [...baseCategories, ...folders], [folders])
  const isUserFolder = folders.includes(active)
  const countFor = (tab) =>
    tab === 'Tous' ? photos.length : photos.filter((p) => p.category === tab).length

  const visible = useMemo(
    () => (active === 'Tous' ? photos : photos.filter((p) => p.category === active)),
    [active, photos],
  )

  // Revenir à "Tous" si le dossier actif a été supprimé.
  useEffect(() => {
    if (active !== 'Tous' && !tabs.includes(active)) setActive('Tous')
  }, [tabs, active])
  // Fermer le renommage si on change d'onglet.
  useEffect(() => setRenaming(false), [active])

  const handleFiles = (fileList) => {
    if (fileList?.length && isUserFolder) onAddFiles(fileList, active)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const submitCreate = (e) => {
    e.preventDefault()
    const created = onCreateFolder(newName)
    if (created) {
      setActive(created)
      setNewName('')
      setCreating(false)
    }
  }

  const startRename = () => {
    setRenameValue(active)
    setRenaming(true)
  }
  const submitRename = async (e) => {
    e.preventDefault()
    const ok = await onRenameFolder(active, renameValue)
    if (ok) {
      setActive(renameValue.trim())
      setRenaming(false)
    } else {
      window.alert('Ce nom est vide ou déjà utilisé par un autre dossier.')
    }
  }

  const confirmDelete = (name) => {
    const n = photos.filter((p) => p.category === name).length
    const msg = n
      ? `Supprimer le dossier « ${name} » et ses ${n} photo(s) ?`
      : `Supprimer le dossier « ${name} » ?`
    if (window.confirm(msg)) onDeleteFolder(name)
  }

  return (
    <section
      className={`albums ${dragging ? 'albums--dragging' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false) }}
      onDrop={onDrop}
    >
      <header className="albums__head">
        <p className="view__eyebrow">Nos souvenirs</p>
        <h2 className="view__title">Albums</h2>
        <p className="view__lead">
          Créez vos albums et rangez-y vos photos. Vous pouvez renommer ou
          supprimer un album à tout moment.
        </p>
      </header>

      {folders.length > 0 && (
        <div className="chips" role="tablist" aria-label="Vos albums">
          {tabs.map((tab) => {
            const deletable = folders.includes(tab)
            return (
              <div key={tab} className={`chip ${active === tab ? 'chip--active' : ''}`}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={active === tab}
                  className="chip__label"
                  onClick={() => setActive(tab)}
                >
                  {tab}
                  <span className="chip__count">{countFor(tab)}</span>
                </button>
                {deletable && (
                  <button
                    type="button"
                    className="chip__del"
                    aria-label={`Supprimer le dossier ${tab}`}
                    onClick={() => confirmDelete(tab)}
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="albums__actions">
        {!creating ? (
          <button type="button" className="btn-ghost" onClick={() => setCreating(true)}>
            ＋ Nouveau dossier
          </button>
        ) : (
          <form className="inline-form" onSubmit={submitCreate}>
            <input
              className="inline-form__input"
              autoFocus
              type="text"
              placeholder="Nom du dossier (ex. Lune de miel, Famille…)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button type="submit" className="btn-solid">Créer</button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => { setCreating(false); setNewName('') }}
            >
              Annuler
            </button>
          </form>
        )}

        {isUserFolder && !creating && (
          <>
            {renaming ? (
              <form className="inline-form" onSubmit={submitRename}>
                <input
                  className="inline-form__input"
                  autoFocus
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                />
                <button type="submit" className="btn-solid">Enregistrer</button>
                <button type="button" className="btn-ghost" onClick={() => setRenaming(false)}>
                  Annuler
                </button>
              </form>
            ) : (
              <>
                <button type="button" className="btn-ghost" onClick={startRename}>
                  ✎ Renommer
                </button>
                <button type="button" className="btn-danger" onClick={() => confirmDelete(active)}>
                  Supprimer
                </button>
                <motion.button
                  type="button"
                  className="btn-solid"
                  onClick={() => inputRef.current?.click()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  ＋ Importer des photos
                </motion.button>
              </>
            )}
          </>
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

      {visible.length > 0 ? (
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
                <button
                  type="button"
                  className="tile__delete"
                  aria-label={`Supprimer ${photo.title}`}
                  onClick={() => onDelete(photo.id)}
                >
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="empty">
          {folders.length === 0 ? (
            <>
              <p className="empty__title">Aucun album pour l’instant</p>
              <p className="empty__text">
                Créez votre premier album, puis importez-y vos photos.
              </p>
              <button type="button" className="btn-solid" onClick={() => setCreating(true)}>
                ＋ Créer un album
              </button>
            </>
          ) : active === 'Tous' ? (
            <p className="empty__text">
              Sélectionnez un album ci-dessus et importez-y vos photos ✨
            </p>
          ) : (
            <>
              <p className="empty__title">« {active} » est vide</p>
              <p className="empty__text">Importez ou glissez-déposez vos premières photos ici.</p>
              <button type="button" className="btn-solid" onClick={() => inputRef.current?.click()}>
                ＋ Importer des photos
              </button>
            </>
          )}
        </div>
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
                  : 'Sélectionnez d’abord un album'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
