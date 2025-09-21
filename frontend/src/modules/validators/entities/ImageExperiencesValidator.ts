import {IValidator} from '../../../interfaces/interfaces';
import {TFieldState} from '../../../types/types';
import {convertBytes} from '../../../ui/auxiliars.js';

// VALIDACION ENTRADA IMAGEN DEL PERFIL
export default class ImageExperiencesValidator implements IValidator {
  public validate(files: FileList | null): TFieldState {
    const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeMB: number = 5;
    const maxImages: number = 10;
    const maxTotalSizeMB: number = 50;
    let totalSize: number = 0;

    if (!files || files.length === 0) {
      // CAMPO OPCIONAL: VALOR VACIO Y VALIDO
      return {error: '', value: null, isValid: true};
    }

    if (files.length > maxImages) {
      return {
        error: `Puedes subir hasta ${maxImages} imágenes.`,
        value: null,
        isValid: false,
      };
    }

    const filesArray = Array.from(files);

    for (const file of filesArray) {
      if (!allowedTypes.includes(file.type)) {
        return {
          error: `Una o más imágenes tienen formato inválido. Usa JPG, JPEG, PNG o WEBP.`,
          value: null,
          isValid: false,
        };
      }

      const maxSizesBytes: number = convertBytes(maxSizeMB);

      if (file.size > maxSizesBytes) {
        return {
          error: `Cada imagen debe pesar menos de ${maxSizeMB}MB.`,
          value: null,
          isValid: false,
        };
      }

      totalSize += file.size;
    }

    const maxSizesTotalBytes: number = convertBytes(maxTotalSizeMB); //CONVERTIR A BYTES

    if (totalSize > maxSizesTotalBytes) {
      return {
        error: `El peso total de las imágenes no debe superar los ${maxTotalSizeMB}MB.`,
        value: null,
        isValid: false,
      };
    }

    return {
      error: '',
      value: filesArray,
      isValid: true,
    };
  }
}
