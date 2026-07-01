// Visuel de remplacement élégant tant que les vraies photos ne sont pas ajoutées.
// Si une photo possède un champ `src`, on affiche l'image réelle à la place.
export default function PhotoPlaceholder({ photo, className = '' }) {
  if (photo.src) {
    return (
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        className={`photo-media ${className}`}
      />
    )
  }

  const [from, to] = photo.palette
  return (
    <div
      className={`photo-media photo-media--placeholder ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      aria-label={photo.title}
      role="img"
    >
      <svg viewBox="0 0 120 120" className="photo-media__monogram" aria-hidden="true">
        <path
          d="M60 92S30 74 30 52a15 15 0 0 1 30-9 15 15 0 0 1 30 9c0 22-30 40-30 40Z"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
