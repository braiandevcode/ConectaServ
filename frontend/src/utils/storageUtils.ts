// IMPORTACIONES
import { TStoredImage } from "../types/types";

//------------------------ALMACENAMIENTO EN INDEXEDDB---------------------------------------------------//

// ELIMINAR BASE DE DATOS DE INDEXEDDB //
export const deleteDbIndexedDB = (db:string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase(db);

    req.onsuccess = () => {
      console.log("IndexedDB eliminada exitosamente.");
      resolve();
    };

    req.onerror = () => {
      console.error("Error al eliminar IndexedDB:", req.error);
      reject(req.error);
    };

    req.onblocked = () => {
      console.warn("Eliminación bloqueada. Cerrá otras pestañas que usen la DB.");
    };
  });
};

// GUARDAR IMAGEN EN BASE DE DATOS DE INDEXEDDB //
export const saveImageToIndexedDB = (id: string, dataUrl: string, nameDb:string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(nameDb, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images", { keyPath: "id" });
      }
    };

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("images", "readwrite");
      const store = tx.objectStore("images");
      store.put({ id, data: dataUrl });

      tx.oncomplete = () => {
        db.close(); // CERRAR LA CONEXION CUANDO TERMINA
        resolve();
      };

      tx.onerror = () => {
        db.close(); // CERRAR SI HAY ERROR
        reject(tx.error);
      };
    };

    req.onerror = () => reject(req.error);
  });
};

// OBTENER IMAGEN EN BASE64 DE LA DB INDEXEDDB
export const getImageDataUrlFromIndexedDB = (id: string, nameDb:string): Promise<Record<string, string> | null> => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(nameDb, 1);

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("images", "readonly");
      const store = tx.objectStore("images");
      const getReq = store.get(id);

      getReq.onsuccess = () => {
        const result = getReq.result;
        db.close(); // CERRAR ANTES DE RESOLVER
        resolve(result ?? null);
      };

      getReq.onerror = () => {
        db.close(); // ERROR CERRAR
        reject(getReq.error);
      };

      getReq.onerror = () => reject(getReq.error);
    };

    req.onerror = () => reject(req.error);
  });
};

// ELIMINAR IMAGEN DE INDEXEDDB
export const deleteImageFromIndexedDB = (id: string, nameDb:string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(nameDb, 1);

    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction("images", "readwrite");
      const store = tx.objectStore("images");
      store.delete(id); // ELIMINAR POR CLAVE ID
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };

    req.onerror = () => reject(req.error);
  });
};

//-------------------- ALMACENAMIENTO EN LOCALSTORAGE -----------------------------------------------//

//FUNCION PARA OBTENER UN STRING O NULL DIRECTAMENTE SIN PARSEO
export const getStoredString = (key: string): string | null => {
  return localStorage.getItem(key);
};

//FUNCION PARA OBTENER UN ARRAY DE STRING PARSEADO
export const getStoredStringArray = (key: string): string[] | TStoredImage[] => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

// LEER LOCALSTORAGE PARSEADO
export const readExistingData = (key: string): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
};