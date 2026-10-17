// Utility to manage uploaded digital documents (scans, PDFs, images)
// Supports both document sides (Cara 1 and Cara 2)
// Uses IndexedDB as primary high-capacity storage (eliminates localStorage 5MB quota errors)
// with in-memory caching and localStorage fallback.

const IDB_NAME = 'rocio_cv_documents_idb';
const IDB_VERSION = 1;
const IDB_STORE = 'documents';
const STORAGE_KEY = 'rocio_cv_user_doc_scans_v2';
const LEGACY_STORAGE_KEY = 'rocio_cv_user_doc_scans';
const EVENT_NAME = 'rocio_cv_doc_storage_updated';

export type DocumentSide = 'front' | 'back';

export interface StoredDocument {
  front: string | null;
  back: string | null;
  frontName?: string;
  backName?: string;
  updatedAt?: string;
}

export type StoredDocumentsMap = Record<string, StoredDocument>;

// In-memory cache for synchronous reads with zero latency
let memoryStore: StoredDocumentsMap = {};
let isIdbInitialized = false;

/**
 * Opens or creates the IndexedDB database.
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser'));
      return;
    }
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

/**
 * Loads all documents from IndexedDB into memory.
 */
async function loadFromIndexedDB(): Promise<StoredDocumentsMap> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction([IDB_STORE], 'readonly');
      const store = transaction.objectStore(IDB_STORE);
      const request = store.getAll();
      
      request.onsuccess = () => {
        const records: Array<{ id: string; doc: StoredDocument }> = request.result || [];
        const result: StoredDocumentsMap = {};
        for (const record of records) {
          if (record && record.id && record.doc) {
            result[record.id] = record.doc;
          }
        }
        resolve(result);
      };

      request.onerror = () => {
        console.warn('Could not read from IndexedDB, using memory cache');
        resolve({});
      };
    });
  } catch (err) {
    console.warn('IndexedDB initialization skipped/failed:', err);
    return {};
  }
}

/**
 * Saves a single document to IndexedDB.
 */
async function saveToIndexedDB(docId: string, doc: StoredDocument): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction([IDB_STORE], 'readwrite');
      const store = transaction.objectStore(IDB_STORE);
      const request = store.put({ id: docId, doc });

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        console.warn('IndexedDB write error for doc:', docId, request.error);
        resolve(false);
      };
    });
  } catch (e) {
    console.warn('IndexedDB write exception:', e);
    return false;
  }
}

/**
 * Deletes a document from IndexedDB.
 */
async function deleteFromIndexedDB(docId: string): Promise<boolean> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const transaction = db.transaction([IDB_STORE], 'readwrite');
      const store = transaction.objectStore(IDB_STORE);
      const request = store.delete(docId);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

/**
 * Reads initial documents from localStorage synchronously as fallback.
 */
function readLocalStorage(): StoredDocumentsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let map: StoredDocumentsMap = {};
    
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        for (const [id, value] of Object.entries(parsed)) {
          if (typeof value === 'string') {
            map[id] = { front: value, back: null };
          } else if (value && typeof value === 'object') {
            const entry = value as Record<string, unknown>;
            map[id] = {
              front: typeof entry.front === 'string' ? entry.front : null,
              back: typeof entry.back === 'string' ? entry.back : null,
              frontName: typeof entry.frontName === 'string' ? entry.frontName : undefined,
              backName: typeof entry.backName === 'string' ? entry.backName : undefined,
              updatedAt: typeof entry.updatedAt === 'string' ? entry.updatedAt : undefined,
            };
          }
        }
      } catch (e) {
        console.warn('Could not parse v2 document storage', e);
      }
    }

    // Check legacy storage
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      try {
        const legacyParsed = JSON.parse(legacyRaw);
        for (const [id, value] of Object.entries(legacyParsed)) {
          if (typeof value === 'string' && !map[id]) {
            map[id] = { front: value, back: null };
          }
        }
      } catch (e) {
        console.warn('Could not parse legacy storage', e);
      }
    }

    return map;
  } catch {
    return {};
  }
}

/**
 * Tries to sync current memory cache to localStorage without crashing on quota.
 */
function trySaveLocalStorage(map: StoredDocumentsMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // LocalStorage quota reached (common with PDFs/images).
    // Safe to ignore because IndexedDB & in-memory cache persist the data.
  }
}

// Initial synchronous load from localStorage
memoryStore = readLocalStorage();

// Initialize IndexedDB in background and merge
if (typeof window !== 'undefined') {
  loadFromIndexedDB().then((idbDocs) => {
    let changed = false;
    for (const [id, doc] of Object.entries(idbDocs)) {
      if (doc && (doc.front || doc.back)) {
        memoryStore[id] = doc;
        changed = true;
      }
    }
    // Also save existing localStorage docs into IndexedDB so they persist indefinitely
    for (const [id, doc] of Object.entries(memoryStore)) {
      if (!idbDocs[id]) {
        saveToIndexedDB(id, doc);
      }
    }
    isIdbInitialized = true;
    if (changed) {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { action: 'idb_loaded' } }));
    }
  });
}

/**
 * Reads all stored documents synchronously from the cache.
 */
export function getStoredDocuments(): StoredDocumentsMap {
  return { ...memoryStore };
}

/**
 * Reads a single stored document.
 */
export function getStoredDocument(docId: string): StoredDocument | null {
  return memoryStore[docId] ? { ...memoryStore[docId] } : null;
}

/**
 * Saves both sides of a document atomically (Cara 1 and Cara 2).
 */
export async function saveStoredDocumentBothSides(
  docId: string,
  frontUrl: string,
  frontName?: string,
  backUrl?: string | null,
  backName?: string
): Promise<boolean> {
  const existing = memoryStore[docId] || { front: null, back: null };
  const updated: StoredDocument = {
    front: frontUrl,
    back: backUrl !== undefined ? backUrl : existing.back,
    frontName: frontName || existing.frontName,
    backName: backName !== undefined ? backName : existing.backName,
    updatedAt: new Date().toISOString(),
  };

  // 1. Update memory store immediately
  memoryStore[docId] = updated;

  // 2. Dispatch UI event immediately
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { docId, action: 'save_both' } }));

  // 3. Persist to IndexedDB (asynchronous & high capacity)
  await saveToIndexedDB(docId, updated);

  // 4. Try localStorage backup if space allows
  trySaveLocalStorage(memoryStore);

  return true;
}

/**
 * Saves a specific side of a document ('front' or 'back').
 */
export async function saveStoredDocumentSide(
  docId: string, 
  side: DocumentSide, 
  dataUrl: string, 
  fileName?: string
): Promise<boolean> {
  const existing = memoryStore[docId] || { front: null, back: null };
  const updated: StoredDocument = { ...existing };
  
  if (side === 'front') {
    updated.front = dataUrl;
    if (fileName) updated.frontName = fileName;
  } else {
    updated.back = dataUrl;
    if (fileName) updated.backName = fileName;
  }
  updated.updatedAt = new Date().toISOString();

  // 1. Update memory store immediately
  memoryStore[docId] = updated;

  // 2. Dispatch UI event immediately
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { docId, side, action: 'save_side' } }));

  // 3. Persist to IndexedDB
  await saveToIndexedDB(docId, updated);

  // 4. Try localStorage backup
  trySaveLocalStorage(memoryStore);

  return true;
}

/**
 * Compatibility helper: saves to 'front' side.
 */
export function saveStoredDocument(docId: string, dataUrl: string, fileName?: string): Promise<boolean> {
  return saveStoredDocumentSide(docId, 'front', dataUrl, fileName);
}

/**
 * Removes one side of a document.
 */
export async function removeStoredDocumentSide(docId: string, side: DocumentSide): Promise<void> {
  if (memoryStore[docId]) {
    const updated = { ...memoryStore[docId] };
    if (side === 'front') {
      updated.front = null;
      delete updated.frontName;
    } else {
      updated.back = null;
      delete updated.backName;
    }

    if (!updated.front && !updated.back) {
      delete memoryStore[docId];
      await deleteFromIndexedDB(docId);
    } else {
      memoryStore[docId] = updated;
      await saveToIndexedDB(docId, updated);
    }

    trySaveLocalStorage(memoryStore);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { docId, side, action: 'remove_side' } }));
  }
}

/**
 * Removes both sides of a document completely.
 */
export async function removeStoredDocument(docId: string): Promise<void> {
  delete memoryStore[docId];
  await deleteFromIndexedDB(docId);
  trySaveLocalStorage(memoryStore);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { docId, action: 'remove_doc' } }));
}

/**
 * Subscribes to storage changes for reactive React updates.
 */
export function subscribeToDocumentStorage(callback: (docs: StoredDocumentsMap) => void): () => void {
  const handler = () => {
    callback(getStoredDocuments());
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

/**
 * Converts a data URL to an Object Blob URL for reliable display inside sandboxed frames and iframes.
 */
export function dataUrlToBlobUrl(dataUrl: string): string {
  try {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    return URL.createObjectURL(blob);
  } catch {
    return dataUrl;
  }
}

/**
 * Optimizes an uploaded image or reads a PDF reliably without hanging.
 */
export async function processUploadedFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = (file.name || '').toLowerCase();
    const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || 
      fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || 
      fileName.endsWith('.png') || fileName.endsWith('.webp') ||
      fileName.endsWith('.bmp') || fileName.endsWith('.gif');

    // Case 1: PDF Document
    if (isPdf) {
      const reader = new FileReader();
      reader.onload = () => {
        let result = reader.result as string;
        // Ensure proper mime type header if browser provided empty/generic mime
        if (result && !result.startsWith('data:application/pdf')) {
          result = result.replace(/^data:[^;]+;base64,/, 'data:application/pdf;base64,');
        }
        resolve(result);
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo PDF'));
      reader.readAsDataURL(file);
      return;
    }

    // Case 2: Image File
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawDataUrl = event.target?.result as string;
        if (!rawDataUrl) {
          reject(new Error('Error al leer el archivo de imagen'));
          return;
        }

        const img = new Image();
        let timeoutId: number;

        // Safety timeout in case image decode hangs
        timeoutId = window.setTimeout(() => {
          resolve(rawDataUrl);
        }, 2500);

        img.onload = () => {
          window.clearTimeout(timeoutId);
          try {
            const maxDimension = 1800;
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              resolve(rawDataUrl);
              return;
            }

            // White background for transparent PNGs
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // Export as JPEG at 0.88 quality
            const optimized = canvas.toDataURL('image/jpeg', 0.88);
            resolve(optimized);
          } catch {
            resolve(rawDataUrl);
          }
        };

        img.onerror = () => {
          window.clearTimeout(timeoutId);
          resolve(rawDataUrl);
        };

        img.src = rawDataUrl;
      };

      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
      return;
    }

    // Default fallback for any other file
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}
