import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="footer__mono">Q&nbsp;&amp;&nbsp;C</p>
        <p className="footer__line">Merci d’avoir partagé ce jour avec nous.</p>
        <p className="footer__small">Quentin &amp; Camille · 14 Juin 2025</p>
      </motion.div>
    </footer>
  )
}
