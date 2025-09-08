import { TFieldState } from "../../../../types/types";
import { IValidator } from "../../../../interfaces/interfaces";
import { isValueField } from "../../../../utils/domUtils.js";
import { formatMontoOnlyNumber, parseMontoToNumber } from "../../../../ui/auxiliars.js";

// VALIDACION EN CAMPO PRESUPUESTO
export default class BudgeValidator implements IValidator {
  validate(value: string): TFieldState {
    const trimed = value.trim(); //QUITAR ESPACIOS INICIO Y FINAL

    // SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: value })) {
      return {
        error: "Se requiere un monto de presupuesto",
        value: trimed,
        isValid: false,
      };
    }

    const numericValue: number = parseMontoToNumber(trimed); //PARSEAR VALOR

    // SI NO ES UN NUMERO Y ES MENOR O IGUAL A CERO
    if (numericValue <= 0) {
      return {
        error: "El valor debe ser un numero y mayor a cero.",
        value: trimed,
        isValid: false,
      };
    }

    const digitsOnly: string = value.replace(/\D/g, ""); // REEMPLAZAR LO QUE NO SEA NUMERO A NADA

    // POSTERIOR VALIDAR SI LA CANTIDAD DE CARACTERES NUMERICOS ES MAYOR A 10 DIGITOS
    if (digitsOnly.length > 10) {
      return {
        error: "El valor no puede exceder los 10 dígitos",
        value: digitsOnly,
        isValid: false,
      };
    }

    return {
      error: "",
      value: formatMontoOnlyNumber(numericValue.toString()),
      isValid: true,
    };
  }
}
