import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const seed = [
  { id: 1, name: 'Léa & Thomas', text: 'Une journée magnifique, merci pour ces souvenirs !' },
  { id: 2, name: 'Grand-mère Simone', text: 'Tant d’amour et de bonheur. Je vous embrasse fort.' },
]

export default function Guestbook() {
  const [messages, setMessages] = useState(seed)
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setMessages((m) => [{ id: Date.now(), name: name.trim(), text: text.trim() }, ...m])
    setName('')
    setText('')
  }

  return (
    <section className="guestbook" id="livre-d-or">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-head__eyebrow">Un mot pour les mariés</p>
        <h2 className="section-head__title">Le livre d’or</h2>
        <p className="section-head__lead">
          Laissez un souvenir, un vœu ou une anecdote — il rejoindra ceux de nos proches.
        </p>
      </motion.div>

      <form className="guestbook__form" onSubmit={submit}>
        <input
          className="field"
          type="text"
          placeholder="Votre nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Votre nom"
        />
        <textarea
          className="field field--area"
          placeholder="Votre message…"
          value={text}
          rows={3}
          onChange={(e) => setText(e.target.value)}
          aria-label="Votre message"
        />
        <motion.button
          type="submit"
          className="guestbook__submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Signer le livre d’or
        </motion.button>
      </form>

      <div className="guestbook__list">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.blockquote
              key={m.id}
              className="note"
              layout
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="note__text">« {m.text} »</p>
              <cite className="note__name">— {m.name}</cite>
            </motion.blockquote>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
