import { ENamesOfKeyLocalStorage } from "../types/enums";
import type { TProfileImagePreviewProps, TStoredImage } from "../types/types";
import { getImageDataUrlFromIndexedDB } from "./storageUtils";
import { verifyMetaDataImage } from "./validateFieldUtils";

// TIPADO INTERNO
type TLoadImage = Pick<TProfileImagePreviewProps, 'setSrc'> & {
    storedImage:TStoredImage | null
}

//  LEER DATOS DE IMAGEN DE PERFIL EN STORAGE Y AGREGAR AL SOURCE
// FUNCION ASINCRONA
const loadImage = async ({  storedImage, setSrc }: TLoadImage) => {
  setSrc('');
  if (!storedImage || Object.keys(storedImage).length === 0) return; // ==> SI NO HAY DATOS O EL OBJETO ESTA VACIO NO

  const isImage: boolean = verifyMetaDataImage(storedImage); // ==> UTILIZAR HELPER PARA VERIFICAR
  if (!isImage) return; //SI NO HAY DATOS RETORNAR

  //LEO IMAGEN POR SU ID EN INDEXEDDB Y GUARDO EN "result"
  const result: Record<string, string> | null = await getImageDataUrlFromIndexedDB(storedImage.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);
  //SI NO ES NULO Y SI EL OBJETO CONTIENE DATOS
  if (result && Object.keys(result).length > 0) {
    setSrc(result.data); //SETEAR ESTADO DE SOURCE "src"
  }
};

export default loadImage;
