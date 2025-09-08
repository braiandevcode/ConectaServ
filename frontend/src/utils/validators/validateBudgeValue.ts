import { formatMontoOnlyNumber, isValueField, parseMontoToNumber } from "../../ui/auxiliars.js";
import { iFieldState } from "../../interfaces/interfaces";

// LOGICA DE VLAIDACION PASO 4
const validateBudgetValue = (rawValue: string): iFieldState => {
    const value = rawValue.trim(); //QUITAR ESPACIOS INICIO Y FINAL

    // SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: value })) {
        return {
            error: 'Se requiere un monto de presupuesto',
            value,
            isValid: false
        };
    }

    const numericValue:number = parseMontoToNumber(value); //PARSEAR VALOR 

    // SI NO ES UN NUMERO Y ES MENOR O IGUAL A CERO
    if (numericValue <= 0) {
        return {
            error: 'El valor debe ser un numero y mayor a cero.',
            value,
            isValid: false
        };
    }

    const digitsOnly:string = value.replace(/\D/g, ''); // REEMPLAZAR LO QUE NO SEA NUMERO A NADA

    // POSTERIOR VALIDAR SI LA CANTIDAD DE CARACTERES NUMERICOS ES MAYOR A 10 DIGITOS
    if (digitsOnly.length > 10) {
        return {
            error: 'El valor no puede exceder los 10 dígitos',
            value: digitsOnly,
            isValid: false
        };
    }

    return {
        error: '',
        value: formatMontoOnlyNumber(numericValue.toString()),
        isValid: true
    };
}

export default validateBudgetValue;
