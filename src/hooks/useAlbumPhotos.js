import { useCallback, useEffect, useRef, useState } from 'react'
import { photos as defaultPhotos } from '../data/photos'
import { deleteUpload, loadUploads, saveUploads } from '../utils/photoStore'

const FOLDERS_KEY = 'wedding-album-folders'
const SPANS = ['normal', 'tall', 'wide', 'normal', 'tall']

function readFolders() {
  try {
    return JSON.parse(localStorage.getItem(FOLDERS_KEY)) || []
  } catch {
    return []
  }
}
function writeFolders(list) {
  try {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(list))
  } catch {
    /* quota / mode privé : on ignore */
  }
}

function toPhoto(record, i) {
  return {
    id: record.id,
    title: record.title || 'Souvenir',
    caption: 'Une photo de notre album.',
    category: record.folder,
    folder: record.folder,
    src: URL.createObjectURL(record.blob),
    span: SPANS[i % SPANS.length],
    uploaded: true,
  }
}

// Gère les photos "curées" (démo) + les vraies photos importées, rangées dans
// des dossiers personnalisés créés par l'utilisateur. Photos dans IndexedDB,
// liste des dossiers dans localStorage (pour conserver aussi les dossiers vides).
export function useAlbumPhotos() {
  const [uploaded, setUploaded] = useState([])
  const [folders, setFolders] = useState(readFolders)
  const urlsRef = useRef(new Set())

  useEffect(() => {
    let cancelled = false
    loadUploads()
      .then((records) => {
        if (cancelled) return
        const mapped = records.map(toPhoto)
        mapped.forEach((p) => urlsRef.current.add(p.src))
        setUploaded(mapped)
        setFolders((prev) => {
          const set = new Set(prev)
          records.forEach((r) => r.folder && set.add(r.folder))
          const merged = [...set]
          writeFolders(merged)
          return merged
        })
      })
      .catch(() => {})
    const urls = urlsRef.current
    return () => {
      cancelled = true
      urls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [])

  const createFolder = useCallback((name) => {
    const n = (name || '').trim()
    if (!n) return null
    setFolders((prev) => {
      if (prev.includes(n)) return prev
      const next = [...prev, n]
      writeFolders(next)
      return next
    })
    return n
  }, [])

  const addFiles = useCallback(async (fileList, folder) => {
    const target = (folder || '').trim()
    if (!target) return
    const files = Array.from(fileList).filter((f) => f.type.startsWith('image/'))
    if (!files.length) return
    const records = await saveUploads(files, target)
    setUploaded((prev) => {
      const mapped = records.map((r, i) => toPhoto(r, prev.length + i))
      mapped.forEach((p) => urlsRef.current.add(p.src))
      return [...prev, ...mapped]
    })
    setFolders((prev) => {
      if (prev.includes(target)) return prev
      const next = [...prev, target]
      writeFolders(next)
      return next
    })
  }, [])

  const removePhoto = useCallback(
    async (id) => {
      await deleteUpload(id)
      const target = uploaded.find((p) => p.id === id)
      if (target?.src) {
        URL.revokeObjectURL(target.src)
        urlsRef.current.delete(target.src)
      }
      setUploaded((prev) => prev.filter((p) => p.id !== id))
    },
    [uploaded],
  )

  const removeFolder = useCallback(
    async (name) => {
      const targets = uploaded.filter((p) => p.folder === name)
      targets.forEach((p) => {
        if (p.src) {
          URL.revokeObjectURL(p.src)
          urlsRef.current.delete(p.src)
        }
      })
      await Promise.all(targets.map((p) => deleteUpload(p.id)))
      setUploaded((prev) => prev.filter((p) => p.folder !== name))
      setFolders((prev) => {
        const next = prev.filter((f) => f !== name)
        writeFolders(next)
        return next
      })
    },
    [uploaded],
  )

  return {
    photos: [...defaultPhotos, ...uploaded],
    folders,
    addFiles,
    createFolder,
    removePhoto,
    removeFolder,
  }
}
