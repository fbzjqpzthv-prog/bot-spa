import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Home from './components/views/Home'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import Guestbook from './components/Guestbook'
import Lightbox from './components/Lightbox'
import { useAlbumPhotos } from './hooks/useAlbumPhotos'

const view = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function App() {
  const [current, setCurrent] = useState('accueil')
  const [selected, setSelected] = useState(null)
  const album = useAlbumPhotos()

  return (
    <div className="app">
      <div className="shell">
        <Sidebar view={current} onNavigate={setCurrent} />

        <main className="stage">
          <div className="panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={view}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {current === 'accueil' && <Home onExplore={() => setCurrent('albums')} />}
                {current === 'albums' && (
                  <Gallery
                    photos={album.photos}
                    folders={album.folders}
                    onOpen={setSelected}
                    onAddFiles={album.addFiles}
                    onCreateFolder={album.createFolder}
                    onDelete={album.removePhoto}
                    onDeleteFolder={album.removeFolder}
                    onRenameFolder={album.renameFolder}
                  />
                )}
                {current === 'histoire' && <Timeline />}
                {current === 'livre' && <Guestbook />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <Lightbox
        photos={album.photos}
        photo={selected}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </div>
  )
}
