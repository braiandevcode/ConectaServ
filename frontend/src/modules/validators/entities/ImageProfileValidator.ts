import { IValidator } from "../../../interfaces/interfaces";
import { TFieldState } from "../../../types/types";

// VALIDACION PARA IMAGEN DEL PERFIL
export default class ImageProfileValidator implements IValidator {
  validate(file: File | null): TFieldState {
     const allowedTypes: string[] = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSizeMB: number = 5;

    if (!file) {
      // CAMPO OPCIONAL
      return { error: "", value: null, isValid: true };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        error: "Formato de imagen no válido. Usa JPG, JPEG, PNG o WEBP.",
        value: null,
        isValid: false,
      };
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      return {
        error: `La imagen no debe superar los ${maxSizeMB}MB.`,
        value: null,
        isValid: false,
      };
    }

    return { error: "", value: file, isValid: true };
  }
}