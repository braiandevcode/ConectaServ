import type { IValidator } from '../../interfaces/iValidator.js';
import type { TImageDataStored } from '../../types/typeRegisterEndDto.js';
import type { TFieldState } from '../../types/typeStateFields.js';

// VALIDACION PARA IMAGEN DEL PERFIL
export default class ImageProfileValidator implements IValidator {
  public validate(file: File | TImageDataStored | null): TFieldState {
    const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeMB: number = 5;

    // SI NO HAY ARCHIVO SE CONSIDERA VALIDO
    if (!file) {
      // CAMPO OPCIONAL
      return { error: '', value: null, isValid: true };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        error: 'Formato de imagen no válido. Usa JPG, JPEG, PNG o WEBP.',
        value: null,
        isValid: false,
      };
    }

    // PREGUNTO ANTES SI ES INSTANCIA DE FILE
    if (file instanceof File) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        return {
          error: `La imagen no debe superar los ${maxSizeMB}MB.`,
          value: null,
          isValid: false,
        };
      }
    } else {
      if (file.bytes > maxSizeMB * 1024 * 1024) {
        return {
          error: `La imagen no debe superar los ${maxSizeMB}MB.`,
          value: null,
          isValid: false,
        };
      }
    }

    return { error: '', value: file, isValid: true };
  }
}
