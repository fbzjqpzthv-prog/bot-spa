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

Deux méthodes, selon votre besoin :

### 1. Directement dans le site (le plus simple) 🚀

Dans la galerie, cliquez sur **« ＋ Ajouter mes photos »** ou **glissez-déposez**
vos images sur la galerie. Elles apparaissent immédiatement sous le filtre
**« Mes photos »**, avec une belle animation.

Ces photos sont enregistrées **localement dans le navigateur** (via IndexedDB) :
elles restent après rafraîchissement, et vous pouvez en supprimer une en
survolant la vignette (petit **×**). C’est parfait pour composer votre album
sans toucher au code — mais ces photos vivent uniquement dans *votre*
navigateur, elles ne sont pas partagées avec les autres visiteurs du site.

### 2. Dans le code (pour un album partagé/déployé) 🌐

Pour que vos photos fassent partie du site publié et soient visibles par tous,
placez vos images dans `public/photos/` puis ajoutez un champ `src` à chaque
entrée de `src/data/photos.js` :

```js
{
  id: 1,
  title: 'La cérémonie',
  caption: 'Devant nos proches, nous avons dit oui.',
  category: 'Cérémonie',
  src: '/photos/ceremonie.jpg', // <-- votre image (dans public/photos/)
  span: 'wide',
}
```

Le composant `PhotoPlaceholder` affiche automatiquement l’image dès qu’un
`src` est présent (sinon, il affiche un joli dégradé de remplacement).

## 🎨 Personnalisation

- Noms, date et lieu : `src/components/Hero.jsx` et `src/components/Footer.jsx`.
- Couleurs et typographies : variables CSS en haut de `src/index.css`.
- Contenu de la timeline et catégories : `src/data/photos.js`.

---

Fait avec ❤️ pour Quentin & Camille.
