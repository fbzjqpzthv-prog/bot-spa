// Stockage local des photos importées via IndexedDB.
// On garde les images sous forme de Blob (bien plus robuste que le base64
// dans localStorage, qui sature vite au-delà de quelques Mo).

const DB_NAME = 'wedding-album'
const STORE = 'photos'

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveUploads(files, folder) {
  const db = await openDb()
  const records = files.map((file) => ({
    id: `up-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    blob: file,
    title: file.name.replace(/\.[^.]+$/, ''),
    folder,
    createdAt: Date.now(),
  }))
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    records.forEach((r) => tx.objectStore(STORE).put(r))
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
  return records
}

export async function loadUploads() {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).getAll()
    req.onsuccess = () => resolve(req.result.sort((a, b) => a.createdAt - b.createdAt))
    req.onerror = () => reject(req.error)
  })
}

export async function renameFolderRecords(oldName, newName) {
  const db = await openDb()
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    const store = tx.objectStore(STORE)
    const req = store.getAll()
    req.onsuccess = () => {
      req.result.forEach((r) => {
        if (r.folder === oldName) {
          r.folder = newName
          store.put(r)
        }
      })
    }
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}

export async function deleteUpload(id) {
  const db = await openDb()
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(id)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}
