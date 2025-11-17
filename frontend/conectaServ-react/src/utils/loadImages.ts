import type { RefObject } from 'react';
import { verifyMetaDataImage } from './validateFieldUtils';
import { getImageDataUrlFromIndexedDB } from './storageUtils';
import { ENamesOfKeyLocalStorage } from '../types/enums';
import type { TExperienceImagesPreviewProps } from '../types/typeImageExperiences';
import type { TImageData } from '../types/typeRegisterEndDto';

// TIPADO INTERNO
type TLoadImages = Pick<TExperienceImagesPreviewProps, 'setSrcVector'> & {
  storedImages: TImageData[];
  countImagesExp: RefObject<number>;
};

// LEER DATOS DE IMAGENES DE EXPERIENCIAS Y AGREGAR A LOS SOURCES
// FUNCION ASINCRONA INTERNA (EL EFFECT NO PUEDE SER ASYNC)
const loadImages = async ({ setSrcVector, storedImages, countImagesExp }: TLoadImages) => {
  if (!storedImages || storedImages.length === 0) {
    setSrcVector([]); // SI NO HAY IMAGENES LIMPIAR ==> ASEGURA EJECUTAR SIN NECESIDAD
    return;
  }

  // LIMPIEZA INICIAL
  countImagesExp.current = 0; // ==> LIMPIAR REF A 0
  setSrcVector([]); // RESETEAR ESTADO DE VECTOR DE

  countImagesExp.current = storedImages.length; // GUARDAR LA CANTIDAD ESPERADA

  // === COMIENZA BLOQUE ASINCRONICO ===
  // SE EJECUTA UN BUCLE QUE HACE "AWAIT" EN CADA ITERACION
  const dataUrl = []; // ==> ARRAY AUXILIAR
  for (const imageObj of storedImages) {
    if (!verifyMetaDataImage(imageObj)) continue; // VALIDAR OBJETO ANTES DE USARLO
    // ACA SE PRODUCE EL COMPORTAMIENTO ASINCRONICO REAL:
    // CADA "await" DETIENE LA FUNCIÓN HASTA QUE SE RESUELVA LA PROMESA.
    // MIENTRAS, REACT PUEDE VOLVER A RENDERIZAR O DESMONTAR EL COMPONENTE.
    const result = await getImageDataUrlFromIndexedDB(imageObj.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

    if (result) {
      dataUrl.push(result.data); // AGREGO LA DATAURL AL ARRAY TEMPORAL
    }
  }
  setSrcVector([...dataUrl]); //SOBREESCRIBIR VIEJOS Y EVITAR ACUMULAR
};

export default loadImages;