// Données de l'album. Chaque photo est un dégradé/placeholder élégant :
// remplacez simplement `src` par l'URL (ou l'import) de vos vraies photos.
// Les proportions `span` contrôlent la mise en page "masonry" de la galerie.
// Palettes en tons beige & vert sauge, accordées au thème.

export const photos = [
  {
    id: 1,
    title: 'Les préparatifs',
    caption: 'Les dernières minutes avant le grand oui.',
    category: 'Préparatifs',
    palette: ['#f0ecdf', '#b9c7a6'],
    span: 'tall',
  },
  {
    id: 2,
    title: 'La cérémonie',
    caption: 'Devant nos proches, nous avons dit oui.',
    category: 'Cérémonie',
    palette: ['#e7e5d3', '#8ba173'],
    span: 'wide',
  },
  {
    id: 3,
    title: 'Le premier regard',
    caption: 'Ce moment suspendu, rien que nous deux.',
    category: 'Cérémonie',
    palette: ['#eeead9', '#a3b587'],
    span: 'normal',
  },
  {
    id: 4,
    title: 'Les alliances',
    caption: 'Un cercle sans fin, comme notre amour.',
    category: 'Cérémonie',
    palette: ['#f2eede', '#c0cbaa'],
    span: 'normal',
  },
  {
    id: 5,
    title: 'Sous les pétales',
    caption: 'Une pluie de bonheur à la sortie.',
    category: 'Cérémonie',
    palette: ['#f4f0e2', '#9db384'],
    span: 'tall',
  },
  {
    id: 6,
    title: 'Le cocktail',
    caption: 'Rires, bulles et grands sourires.',
    category: 'Réception',
    palette: ['#e8e4d0', '#7f9668'],
    span: 'wide',
  },
  {
    id: 7,
    title: 'La première danse',
    caption: 'Le monde entier a disparu autour de nous.',
    category: 'Soirée',
    palette: ['#e2e0cd', '#5f7550'],
    span: 'normal',
  },
  {
    id: 8,
    title: 'Les éclats de rire',
    caption: 'Nos familles réunies, enfin.',
    category: 'Réception',
    palette: ['#efebda', '#aabb8f'],
    span: 'normal',
  },
  {
    id: 9,
    title: 'La pièce montée',
    caption: 'Aussi sucrée que cette journée.',
    category: 'Réception',
    palette: ['#f3efe0', '#c4cfae'],
    span: 'normal',
  },
  {
    id: 10,
    title: 'La piste de danse',
    caption: 'On a dansé jusqu’au bout de la nuit.',
    category: 'Soirée',
    palette: ['#e4e2cf', '#6d8459'],
    span: 'tall',
  },
  {
    id: 11,
    title: 'Le feu d’artifice',
    caption: 'Le ciel s’est illuminé pour nous.',
    category: 'Soirée',
    palette: ['#dcdcc6', '#546a47'],
    span: 'wide',
  },
  {
    id: 12,
    title: 'Le dernier slow',
    caption: 'La fin d’un jour, le début d’une vie.',
    category: 'Soirée',
    palette: ['#e6e3d1', '#8fa675'],
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
