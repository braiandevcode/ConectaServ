// IMPORTACIONES
import { ENamesOfKeyLocalStorage } from '../types/enums';
import type { TImageDataStored } from '../types/typeRegisterEndDto';
//-------------------- ALMACENAMIENTO EN LOCALSTORAGE -----------------------------------------------//
//FUNCION PARA OBTENER UN ARRAY DE STRING PARSEADO
export const getStoredStringArray = (key: string): string[] | TImageDataStored[] => {
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
  // REMOVER TODO DE STORAGE
  localStorage.removeItem(ENamesOfKeyLocalStorage.CURRENT_STEP);
  localStorage.removeItem(ENamesOfKeyLocalStorage.STEP_DATA);
  localStorage.removeItem(ENamesOfKeyLocalStorage.INTERACTED);
  localStorage.removeItem(ENamesOfKeyLocalStorage.CLIENT_DATA);
  localStorage.removeItem(ENamesOfKeyLocalStorage.ROLE);
  localStorage.removeItem(ENamesOfKeyLocalStorage.IS_VERIFY_CODE);
};
