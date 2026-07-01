// Données de l'album. Chaque photo est un dégradé/placeholder élégant :
// remplacez simplement `src` par l'URL (ou l'import) de vos vraies photos.
// Les proportions `span` contrôlent la mise en page "masonry" de la galerie.

export const photos = [
  {
    id: 1,
    title: 'Les préparatifs',
    caption: 'Les dernières minutes avant le grand oui.',
    category: 'Préparatifs',
    palette: ['#f3e7e0', '#d8a48f'],
    span: 'tall',
  },
  {
    id: 2,
    title: 'La cérémonie',
    caption: 'Devant nos proches, nous avons dit oui.',
    category: 'Cérémonie',
    palette: ['#e9e3da', '#b08968'],
    span: 'wide',
  },
  {
    id: 3,
    title: 'Le premier regard',
    caption: 'Ce moment suspendu, rien que nous deux.',
    category: 'Cérémonie',
    palette: ['#efe6dd', '#c99e83'],
    span: 'normal',
  },
  {
    id: 4,
    title: 'Les alliances',
    caption: 'Un cercle sans fin, comme notre amour.',
    category: 'Cérémonie',
    palette: ['#f5ece4', '#cbb190'],
    span: 'normal',
  },
  {
    id: 5,
    title: 'Sous les pétales',
    caption: 'Une pluie de bonheur à la sortie.',
    category: 'Cérémonie',
    palette: ['#f7e9e0', '#d99e8a'],
    span: 'tall',
  },
  {
    id: 6,
    title: 'Le cocktail',
    caption: 'Rires, bulles et grands sourires.',
    category: 'Réception',
    palette: ['#eae4d9', '#a68a64'],
    span: 'wide',
  },
  {
    id: 7,
    title: 'La première danse',
    caption: 'Le monde entier a disparu autour de nous.',
    category: 'Soirée',
    palette: ['#e4ded6', '#8f7355'],
    span: 'normal',
  },
  {
    id: 8,
    title: 'Les éclats de rire',
    caption: 'Nos familles réunies, enfin.',
    category: 'Réception',
    palette: ['#f2e8de', '#cda17f'],
    span: 'normal',
  },
  {
    id: 9,
    title: 'La pièce montée',
    caption: 'Aussi sucrée que cette journée.',
    category: 'Réception',
    palette: ['#f5eee6', '#d6b48c'],
    span: 'normal',
  },
  {
    id: 10,
    title: 'La piste de danse',
    caption: 'On a dansé jusqu’au bout de la nuit.',
    category: 'Soirée',
    palette: ['#e6ddd3', '#7c6a52'],
    span: 'tall',
  },
  {
    id: 11,
    title: 'Le feu d’artifice',
    caption: 'Le ciel s’est illuminé pour nous.',
    category: 'Soirée',
    palette: ['#dcd4ca', '#6d5c46'],
    span: 'wide',
  },
  {
    id: 12,
    title: 'Le dernier slow',
    caption: 'La fin d’un jour, le début d’une vie.',
    category: 'Soirée',
    palette: ['#e8e0d6', '#9c8064'],
    span: 'normal',
  },
]

export const categories = ['Tous', 'Préparatifs', 'Cérémonie', 'Réception', 'Soirée']

export const timeline = [
  { time: '14 h 00', title: 'Cérémonie', text: 'Le moment que nous attendions tant, entourés de ceux que nous aimons.' },
  { time: '16 h 00', title: 'Vin d’honneur', text: 'Bulles, petites bouchées et embrassades sous les arbres.' },
  { time: '19 h 30', title: 'Dîner', text: 'Un festin partagé autour de grandes tablées joyeuses.' },
  { time: '22 h 00', title: 'Ouverture du bal', text: 'Notre première danse, puis la piste ne s’est plus vidée.' },
]
