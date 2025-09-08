import { TFieldState } from "../../../../types/types";
import { IValidator } from "../../../../interfaces/interfaces";
import { formatTextArea, isLengthValid, isValueField, validateWithRegex } from "../../../../utils/domUtils.js";

// VALIDACION DESCRIPCION (TEXTAREA)
export default class DescriptionValidator implements IValidator {
  validate(value: string): TFieldState {
    // SI ESTA VACIO PERMITIR SIN VALOR PORQUE ES OPCIONAL
    if (!isValueField({ text: value.trim() })) {
      return { error: "", value: "", isValid: true };
    }

    // SI ES MAYOR A 350 CARACTERES
    if (isLengthValid({ text: value, num: 351 })) {
      return {
        error: "Has excedido el limite de 350 caracteres.",
        value: value,
        isValid: false,
      };
    }

    const formatedDescription = formatTextArea(value);

    return { error: "", value: formatedDescription, isValid: true };
  }
}