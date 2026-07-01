// L'album démarre vide : aucun dossier n'est pré-créé.
// L'utilisateur crée ses propres albums et y importe ses photos.
// (Les photos importées sont conservées dans IndexedDB via le hook useAlbumPhotos.)

export const photos = []

export const categories = ['Tous']

export const timeline = [
  { time: '14 h 00', title: 'Cérémonie', text: 'Le moment que nous attendions tant, entourés de ceux que nous aimons.' },
  { time: '16 h 00', title: 'Vin d’honneur', text: 'Bulles, petites bouchées et embrassades sous les arbres.' },
  { time: '19 h 30', title: 'Dîner', text: 'Un festin partagé autour de grandes tablées joyeuses.' },
  { time: '22 h 00', title: 'Ouverture du bal', text: 'Notre première danse, puis la piste ne s’est plus vidée.' },
]
