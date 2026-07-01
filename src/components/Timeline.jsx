import { motion } from 'framer-motion'
import { timeline } from '../data/photos'

export default function Timeline() {
  return (
    <section className="story">
      <header className="albums__head">
        <p className="view__eyebrow">Le fil de la journée</p>
        <h2 className="view__title">Notre histoire</h2>
      </header>

      <div className="timeline__track">
        <motion.span
          className="timeline__line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            className={`timeline__item ${i % 2 ? 'timeline__item--right' : ''}`}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline__dot" />
            <span className="timeline__time">{item.time}</span>
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__text">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
