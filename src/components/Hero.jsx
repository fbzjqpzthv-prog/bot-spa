import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero({ onExplore }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <header className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y }} aria-hidden="true">
        <div className="hero__orb hero__orb--a" />
        <div className="hero__orb hero__orb--b" />
        <div className="hero__grain" />
      </motion.div>

      <motion.div className="hero__inner" style={{ opacity }}>
        <motion.p className="hero__eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
          Nous nous sommes dit oui
        </motion.p>

        <motion.h1 className="hero__names" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <span>Quentin</span>
          <motion.span
            className="hero__amp"
            initial={{ scale: 0, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 140, damping: 12 }}
          >
            &amp;
          </motion.span>
          <span>Camille</span>
        </motion.h1>

        <motion.p className="hero__date" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          14 Juin 2025 · Provence
        </motion.p>

        <motion.button
          type="button"
          className="hero__cta"
          onClick={onExplore}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Découvrir l’album
        </motion.button>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span>Faites défiler</span>
        <motion.div
          className="hero__scroll-line"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </header>
  )
}
