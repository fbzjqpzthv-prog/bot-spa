import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Timeline from './components/Timeline'
import Guestbook from './components/Guestbook'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'

const links = [
  { href: '#galerie', label: 'Galerie' },
  { href: '#histoire', label: 'Histoire' },
  { href: '#livre-d-or', label: 'Livre d’or' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const scrollToGallery = () =>
    document.getElementById('galerie')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="app" ref={galleryRef}>
      <motion.div className="progress" style={{ scaleX: progress }} />

      <motion.nav
        className="nav"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#top" className="nav__brand">Q &amp; C</a>
        <ul className="nav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </motion.nav>

      <main id="top">
        <Hero onExplore={scrollToGallery} />
        <Gallery onOpen={setSelected} />
        <Timeline />
        <Guestbook />
      </main>

      <Footer />

      <Lightbox photo={selected} onClose={() => setSelected(null)} onNavigate={setSelected} />
    </div>
  )
}
