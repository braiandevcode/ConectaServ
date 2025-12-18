import type { TProfileImagePreviewProps } from "../types/typeImageProfilePreview";
import type {  TImageDataStored } from "../types/typeRegisterEndDto";
import { verifyMetaDataImage } from "./validateFieldUtils";

// TIPADO INTERNO
type TLoadImage = Pick<TProfileImagePreviewProps, 'setSrc'> & {
  storedImage:TImageDataStored| null
}

//  LEER DATOS DE IMAGEN DE PERFIL EN STORAGE Y AGREGAR AL SOURCE
// FUNCION ASINCRONA
const loadImage = async ({  storedImage, setSrc }: TLoadImage) => {
  setSrc('');
  if (!storedImage || Object.keys(storedImage).length === 0) return; // ==> SI NO HAY DATOS O EL OBJETO ESTA VACIO NO

  const isImage: boolean = verifyMetaDataImage(storedImage); // ==> UTILIZAR HELPER PARA VERIFICAR
  if (!isImage) return; //SI NO HAY DATOS RETORNAR

  //SI NO ES NULO Y SI EL OBJETO CONTIENE DATOS
  if (storedImage && Object.keys(storedImage).length > 0) {
    setSrc(storedImage.secureUrl); //SETEAR ESTADO DE SOURCE "src"
  }
};

export default loadImage;
