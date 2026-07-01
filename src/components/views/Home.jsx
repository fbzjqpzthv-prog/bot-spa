import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Home({ onExplore }) {
  return (
    <div className="home">
      <motion.p className="home__eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
        Nous nous sommes dit oui
      </motion.p>

      <motion.h2 className="home__names" variants={fadeUp} initial="hidden" animate="show" custom={1}>
        Quentin
        <motion.span
          className="home__amp"
          initial={{ scale: 0, rotate: -25, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.55, type: 'spring', stiffness: 150, damping: 12 }}
        >
          &amp;
        </motion.span>
        Camille
      </motion.h2>

      <motion.p className="home__date" variants={fadeUp} initial="hidden" animate="show" custom={2}>
        27 juin 2025 · Provence
      </motion.p>

      <motion.p className="home__text" variants={fadeUp} initial="hidden" animate="show" custom={3}>
        Bienvenue dans l’album de notre mariage. Créez vos propres albums,
        rangez-y vos plus belles photos, revivez le fil de la journée et
        laissez-nous un mot dans le livre d’or.
      </motion.p>

      <motion.button
        type="button"
        className="home__cta"
        onClick={onExplore}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={4}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Créer mon premier album
      </motion.button>
    </div>
  )
}
