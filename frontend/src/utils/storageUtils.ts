// IMPORTACIONES
import { ENamesOfKeyLocalStorage } from '../types/enums';
import type { TImageData } from '../types/typeRegisterEndDto';
import type { TIdString } from '../types/typeUUID';

//------------------------ALMACENAMIENTO EN INDEXEDDB---------------------------------------------------//

// ELIMINAR BASE DE DATOS DE INDEXEDDB //
export const deleteDbIndexedDB = (db: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req: IDBOpenDBRequest = indexedDB.deleteDatabase(db);

    req.onsuccess = () => {
      resolve(); // ==> SE RESUELVE CUANDO SE ELIMINA BIEN
    };

    req.onerror = () => {
      reject(req.error); // ==> ERROR EN EL PROCESO
    };

    req.onblocked = () => {
      console.warn('Eliminación bloqueada. Cerrá otras pestañas que usen la DB.');
    };
  });
};

// GUARDAR IMAGEN EN BASE DE DATOS DE INDEXEDDB //
export const saveImageToIndexedDB = (id: TIdString, dataUrl: string, nameDb: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req: IDBOpenDBRequest = indexedDB.open(nameDb, 1);

    req.onupgradeneeded = () => {
      const db: IDBDatabase = req.result;
      // ==> SI NO EXISTE STORE "images" LO CREA
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
    };

    req.onsuccess = () => {
      const db: IDBDatabase = req.result;
      const tx: IDBTransaction = db.transaction('images', 'readwrite'); // ==> TRANSACCIÓN ESCRITURA
      const store: IDBObjectStore = tx.objectStore('images');
      store.put({ id, data: dataUrl }); // ==> GUARDA O REEMPLAZA IMAGEN POR ID

      tx.oncomplete = () => {
        db.close(); // ==> SI TERMINA BIEN CERRAR CONEXIÓN
        resolve();
      };

      tx.onerror = () => {
        db.close(); // ==> SI HAY ERROR TAMBIÉN SE CIERRA
        reject(tx.error);
      };
    };

    req.onerror = () => reject(req.error); // ==> ERROR AL ABRIR DB
  });
};

// OBTENER IMAGEN EN BASE64 DE LA DB INDEXEDDB //
export const getImageDataUrlFromIndexedDB = (id: TIdString, nameDb: string): Promise<Record<string, string> | null> => {
  return new Promise((resolve, reject) => {
    const req: IDBOpenDBRequest = indexedDB.open(nameDb, 1);

    req.onsuccess = () => {
      const db: IDBDatabase = req.result;
      const tx: IDBTransaction = db.transaction('images', 'readonly'); // ==> SOLO LECTURA
      const store: IDBObjectStore = tx.objectStore('images');
      const getReq: IDBRequest<any> = store.get(id); // ==> BUSCA POR CLAVE ID

      getReq.onsuccess = () => {
        const result = getReq.result;
        db.close(); // ==> CERRAR SIEMPRE ANTES DE DEVOLVER RESULTADO
        resolve(result ?? null); // ==> DEVUELVE OBJETO {id, data} O NULL
      };

      getReq.onerror = () => {
        db.close(); // ==> CERRAR EN CASO DE ERROR
        reject(getReq.error);
      };
    };

    req.onerror = () => reject(req.error); // ==> ERROR AL ABRIR DB
  });
};

// ELIMINAR IMAGEN DE INDEXEDDB //
export const deleteImageFromIndexedDB = (id: TIdString, nameDb: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const req: IDBOpenDBRequest = indexedDB.open(nameDb, 1);

    req.onsuccess = () => {
      const db: IDBDatabase = req.result;
      const tx: IDBTransaction = db.transaction('images', 'readwrite'); // ==> TRANSACCIÓN ESCRITURA
      const store: IDBObjectStore = tx.objectStore('images');
      store.delete(id); // ==> ELIMINAR IMAGEN POR CLAVE ID

      tx.oncomplete = () => resolve(); // ==> TERMINA OK
      tx.onerror = () => reject(tx.error); // ==> ERROR EN EL PROCESO
    };

    req.onerror = () => reject(req.error); // ==> ERROR AL ABRIR DB
  });
};

// FUNCION QUE RETORNA UN OBJETO CON UNA PROMESA
export const fileToStoredImage = async (file: File): Promise<TImageData> => {
  const { name, size, type } = file; //DESESTRUCTURAMOS OBJETO DE FILE
  const idImage: TIdString = crypto.randomUUID(); //SE CREAR RANDOM DE ID UNICA PARA IMAGEN

  // LEER COMO BASE64 Y GUARDAR EN IndexedDB MEDIANTE UNA PROMESA
  const dataUrl = await new Promise<string>((res, rej) => {
    //INSTANCIAR LA PROMESA
    const r: FileReader = new FileReader(); //INSTANCIAR CONSTRUCTO FileReader
    r.onload = () => res(String(r.result)); //ESCUCHAR EVENTO onload Y EJECUTAR CALLBACK, SI TODO FUE BIEN OBTENER EL "result"
    r.onerror = rej; //SI HAY ERROR reject
    r.readAsDataURL(file); //POR ULTIMO LEER EL file
  });

  await saveImageToIndexedDB(idImage, dataUrl, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

  // DEVOLVER OBJETO SIN dataUrl
  return { name, size, type, idImage, dataUrl};
};

//-------------------- ALMACENAMIENTO EN LOCALSTORAGE -----------------------------------------------//
//FUNCION PARA OBTENER UN ARRAY DE STRING PARSEADO
export const getStoredStringArray = (key: string): string[] | TImageData[] => {
  try {
    const raw: string | null = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === 'string')) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

//FUNCION PARA OBTENER UN STRING O NULL DIRECTAMENTE SIN PARSEO
export const getStoredString = (key: string): string | null => {
  return localStorage.getItem(key);
};

// LEER LOCALSTORAGE PARSEADO
export const readExistingData = (key: string): Record<string, any> => {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch (error) {
    console.error(error);
    return {};
  }
};

// FUNCION PARA LIMPIAR STORAGE E INDEXEDDB DEL NAVEGADOR
export const clearPersistence = async () => {
  // HELPER PARA ELIMINAR INDEXEDDB
  await deleteDbIndexedDB(ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);
  // REMOVER TODO DE STORAGE
  localStorage.removeItem(ENamesOfKeyLocalStorage.CURRENT_STEP);
  localStorage.removeItem(ENamesOfKeyLocalStorage.STEP_DATA);
  localStorage.removeItem(ENamesOfKeyLocalStorage.INTERACTED);
  localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
  localStorage.removeItem(ENamesOfKeyLocalStorage.CLIENT_DATA);
  localStorage.removeItem(ENamesOfKeyLocalStorage.ROLE);
  localStorage.removeItem(ENamesOfKeyLocalStorage.IS_VERIFY_CODE);
};
