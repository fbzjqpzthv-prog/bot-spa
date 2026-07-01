import { motion } from 'framer-motion'

const links = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'albums', label: 'Albums' },
  { id: 'histoire', label: 'Notre histoire' },
  { id: 'livre', label: 'Livre d’or' },
]

export default function Sidebar({ view, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__brand">
          Q<span>&amp;</span>C
        </div>
        <h1 className="sidebar__names">
          Quentin <em>&amp;</em> Camille
        </h1>
        <p className="sidebar__date">27 juin 2025 · Provence</p>
      </div>

      <nav className="sidebar__nav" aria-label="Navigation principale">
        {links.map((l) => (
          <button
            key={l.id}
            type="button"
            className={`navlink ${view === l.id ? 'navlink--active' : ''}`}
            aria-current={view === l.id ? 'page' : undefined}
            onClick={() => onNavigate(l.id)}
          >
            {view === l.id && (
              <motion.span
                layoutId="nav-ind"
                className="navlink__ind"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="navlink__txt">{l.label}</span>
          </button>
        ))}
      </nav>

      <p className="sidebar__foot">Fait avec ❤ pour notre grand jour</p>
    </aside>
  )
}
