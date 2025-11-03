// IMPORTACIONES
import type { IValidator } from '../../interfaces/iValidator.js';
import type { TFieldState } from '../../types/typeStateFields.js';
import { EDefaultSelected } from "../../types/enums";
import { isValueField } from "../../utils/validateFieldUtils";

// VALIDACION SELECTS
export default class SelectedValidator implements IValidator {
  validate(value: string): TFieldState {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    const msgError = [
      {
        default: EDefaultSelected.SELECT_LOCATION.trim().toLowerCase(),
        error: 'Debe seleccionar una ubicación',
      },
      {
        default: EDefaultSelected.SELECT_CATEGORY.trim().toLowerCase(),
        error: 'Debe seleccionar una categoría',
      },
    ];

    // INDICE QUE CORRESPONDA AL FILTRADO DEL OBJETO
    const indexValDefault: number = msgError.findIndex((msj) => msj.default === valueNoSpaces.toLowerCase());

    // VALIDAR LONGITUD MINIMA 6 CARACTERES Y SI EL RESULTADO DE FILTRO ES DIFERENTE DE -1
    if (!isValueField({text: valueNoSpaces}) || indexValDefault !== -1) {
      return {
        error: msgError[indexValDefault]?.error,
        value: valueNoSpaces,
        isValid: false,
      };
    }

    return {error: '', value: valueNoSpaces.toLowerCase(), isValid: true};
  }
}
