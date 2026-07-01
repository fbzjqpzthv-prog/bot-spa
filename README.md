# Quentin & Camille — Album photo interactif 💍

Un album photo de mariage interactif, construit avec **React**, **Vite** et
**Framer Motion**, pensé pour une expérience UI/UX soignée et fluide.

## ✨ Fonctionnalités

- **Hero animé** avec effet de parallaxe au scroll et apparition en cascade des noms.
- **Galerie masonry filtrable** par moment de la journée (Cérémonie, Réception, Soirée…),
  avec animations de layout Framer Motion (`layout`, `AnimatePresence`).
- **Lightbox** plein écran : navigation clavier (← → Échap), transitions douces.
- **Timeline** du déroulé de la journée, révélée au scroll.
- **Livre d’or** interactif où les invités laissent un message (animé à l’ajout).
- **Barre de progression** de lecture, navigation flottante, design responsive
  et respect de `prefers-reduced-motion`.

## 🚀 Démarrage

```bash
npm install
npm run dev        # serveur de développement
npm run build      # build de production dans /dist
npm run preview    # prévisualiser le build
```

## 🖼️ Ajouter vos vraies photos

Les visuels sont pour l’instant des dégradés de remplacement élégants.
Pour utiliser vos photos, ouvrez `src/data/photos.js` et ajoutez un champ
`src` à chaque entrée :

```js
{
  id: 1,
  title: 'La cérémonie',
  caption: 'Devant nos proches, nous avons dit oui.',
  category: 'Cérémonie',
  src: '/photos/ceremonie.jpg', // <-- votre image (placez-la dans /public)
  span: 'wide',
}
```

Le composant `PhotoPlaceholder` affiche automatiquement l’image dès qu’un
`src` est présent.

## 🎨 Personnalisation

- Noms, date et lieu : `src/components/Hero.jsx` et `src/components/Footer.jsx`.
- Couleurs et typographies : variables CSS en haut de `src/index.css`.
- Contenu de la timeline et catégories : `src/data/photos.js`.

---

Fait avec ❤️ pour Quentin & Camille.
