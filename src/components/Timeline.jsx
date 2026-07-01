import { motion } from 'framer-motion'
import { timeline } from '../data/photos'

export default function Timeline() {
  return (
    <section className="timeline" id="histoire">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-head__eyebrow">Le fil de la journée</p>
        <h2 className="section-head__title">Notre histoire</h2>
      </motion.div>

      <div className="timeline__track">
        <motion.span
          className="timeline__line"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {timeline.map((item, i) => (
          <motion.div
            key={item.title}
            className={`timeline__item ${i % 2 ? 'timeline__item--right' : ''}`}
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
