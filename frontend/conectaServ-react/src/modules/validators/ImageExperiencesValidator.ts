import type { IValidator } from '../../interfaces/iValidator.js';
import type { TStoredImage } from '../../types/typePersistanceDataImage.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { convertBytes } from '../../utils/parsedAndFormatValuesUtils.js';

// VALIDACION ENTRADA IMAGEN DE EXPERIENCIAS
export default class ImageExperiencesValidator implements IValidator {
  public validate(files: FileList | TStoredImage[] | null, existingCount: number = 0, existingTotalSize: number = 0): TFieldState {
    const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeMB: number = 5;
    const maxImages: number = 10;
    const maxTotalSizeMB: number = 50;
    let totalSize: number = existingTotalSize; // ARRANCO CON EL PESO YA EXISTENTE

    // SI NO HAY ARCHIVOS O LA LONGITUD ES CERO SE CONSIDERA VALIDO
    if (!files || files.length === 0) {
      return { error: '', value: null, isValid: true };
    }

    // VALIDAR CANTIDAD TOTAL (EXISTENTES + NUEVOS)
    if (files.length + existingCount > maxImages) {
      return {
        error: `Puedes subir hasta ${maxImages} imágenes.`,
        value: null,
        isValid: false,
      };
    }

    for (const file of files) {
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

    const maxSizesTotalBytes: number = convertBytes(maxTotalSizeMB);

    if (totalSize > maxSizesTotalBytes) {
      return {
        error: `El peso total de las imágenes no debe superar los ${maxTotalSizeMB}MB.`,
        value: null,
        isValid: false,
      };
    }

    return {
      error: '',
      value: files,
      isValid: true,
    };
  }
}
