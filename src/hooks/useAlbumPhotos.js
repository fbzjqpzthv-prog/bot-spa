import { useCallback, useEffect, useRef, useState } from 'react'
import { photos as defaultPhotos } from '../data/photos'
import { deleteUpload, loadUploads, saveUploads } from '../utils/photoStore'

const SPANS = ['normal', 'tall', 'wide', 'normal', 'tall']

function toPhoto(record, i) {
  return {
    id: record.id,
    title: record.title || 'Souvenir',
    caption: 'Une photo ajoutée à notre album.',
    category: 'Mes photos',
    src: URL.createObjectURL(record.blob),
    span: SPANS[i % SPANS.length],
    uploaded: true,
  }
}

// Gère la fusion des photos "curées" (dégradés de démo) avec les vraies
// photos importées par l'utilisateur et conservées dans IndexedDB.
export function useAlbumPhotos() {
  const [uploaded, setUploaded] = useState([])
  const urlsRef = useRef(new Set())

  useEffect(() => {
    let cancelled = false
    loadUploads()
      .then((records) => {
        if (cancelled) return
        const mapped = records.map(toPhoto)
        mapped.forEach((p) => urlsRef.current.add(p.src))
        setUploaded(mapped)
      })
      .catch(() => {})
    const urls = urlsRef.current
    return () => {
      cancelled = true
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [])

  const addFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (!files.length) return
    const records = await saveUploads(files)
    setUploaded((prev) => {
      const mapped = records.map((r, i) => toPhoto(r, prev.length + i))
      mapped.forEach((p) => urlsRef.current.add(p.src))
      return [...prev, ...mapped]
    })
  }, [])

  const removePhoto = useCallback(async (id) => {
    await deleteUpload(id)
    setUploaded((prev) => {
      const target = prev.find((p) => p.id === id)
      if (target?.src) {
        URL.revokeObjectURL(target.src)
        urlsRef.current.delete(target.src)
      }
      return prev.filter((p) => p.id !== id)
    })
  }, [])

  return {
    photos: [...defaultPhotos, ...uploaded],
    addFiles,
    removePhoto,
    hasUploads: uploaded.length > 0,
  }
}
