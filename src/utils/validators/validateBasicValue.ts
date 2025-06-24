import { capitalizeWords, isLengthValid, isValueField, normalizeSpaces, validateWithRegex } from "../../ui/auxiliars.js";
import { iFieldState } from "../../interfaces/interfaces";
import { formStateValidField } from "../../config/constant.js";

// FUNCION PARA VALIDAR CAMPO NOMBRE COMPLETO
export const validateFullName = (value: string): iFieldState => {
    const trimmed: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL
    const normalized: string = normalizeSpaces(trimmed); //ASEGURAR  QUE PARA EL NOMBRE DE USUARIO SIEMPRE FORZAR UN SOLO TAB DE ESPACIO AUNQUE PONGA VARIOS
    const capitalized: string = capitalizeWords(normalized); // CONVERTIR PRIMERA LETRA A MAYUSCULA PARA EL NOMBRE/S Y APELLIDO

    if (!isValueField({ text: trimmed })) return { error: 'El campo no puede estar vacío', value: trimmed, isValid: false }; //SI ESTA VACIO

    if (!isLengthValid({ text: normalized, num: 6 })) return { error: 'Debe tener al menos 6 caracteres', value: normalized, isValid: false }; // SI NO CUMPLE LA LONGITUD


    //SOLO LETRAS MAYUSCULAS Y MINUSCULAS, ESPACIOS Y TILDES
    if (!validateWithRegex({ pattern: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/, text: normalized })) {
        return {
            error: 'Solo se permiten letras, espacios y tildes',
            value: normalized,
            isValid: false
        };
    }
    
    // VERIFICAR QUE HAY DOS PALABRAS Y QUE CADA UNA TIENE 3 O MAS CARACTERES EN LA CADENA
    const isValidFullName = (text: string): boolean => {
        const normalized: string = normalizeSpaces(text);
        const parts: string[] = normalized.split(' ');

        return parts.length >= 2 && parts.every(part => part.length >= 3) as boolean;
    };

    // SI LAS PARTES SON MENOR A 2 O DE LAS PARTES SU LONGITUD ES MENOR A 3 CARACTERES
    if (!isValidFullName(trimmed)) return { error: 'Debe tener al menos dos palabras con mínimo 3 letras cada una', value: normalized, isValid: false };

    return { error: '', value: capitalized, isValid: true };
}

// FUNCION PARA VALIDAR CAMPO NOMBRE DE USUARIO
export const validateUserName = (value: string): iFieldState => {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: valueNoSpaces })) {
        return {
            error: 'El campo no puede estar vacío',
            value: valueNoSpaces,
            isValid: false,
        };
    }


    // VALIDAR QUE NO SEA MENOR A 4 CARACTERES EN TOTAL 
    if (!isLengthValid({ text: valueNoSpaces, num: 4 })) {
        return {
            error: 'Debe tener al menos 4 caracteres',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // SI EN TODA LA CADENA DEL NOMBRE DE USUARIO CONTIENE ALGUN ESPACIADO/TAB => ERROR
    if (validateWithRegex({ pattern: /\s/, text: valueNoSpaces })) {
        return {
            error: 'El nombre de usuario no puede contener espacios',
            value: valueNoSpaces,
            isValid: false,
        }
    }

    // SOLO LETRAS mayusculas/minusculas, NUMEROS, PUNTOS(.),Y GUIONES BAJOS (_), SI NO SE CUMPLE
    if (!validateWithRegex({ pattern: /^[a-zA-Z0-9._]+$/, text: valueNoSpaces })) {
        return {
            error: 'Solo letras, números, puntos y guiones bajos permitidos.',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // QUE NO COMIENCE CON PUNTO(.) O UN GUION BAJO (_).
    if (validateWithRegex({ pattern: /^(\.|_)/, text: valueNoSpaces })) {
        return {
            error: 'No puede comenzar ni terminar con "." o "_"',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // QUE NO CONTENGA DOS PUNTOS CONSECUTIVOS(..)
    if (validateWithRegex({ pattern: /(\.\.)/, text: valueNoSpaces })) {
        return {
            error: 'No puede contener puntos".." consecutivos',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // QUE NO CONTENGA TRES GUIONES BAJOS CONSECUTIVOS (___) AL FINAL
    if (validateWithRegex({ pattern: /(___)$/, text: valueNoSpaces })) {
        return {
            error: 'No puede contener mas de 2 guiones bajos "__" consecutivos al final',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    return { error: '', value: valueNoSpaces, isValid: true };
}

// FUNCION PARA VALIDAR CAMPO EMAIL
export const validateEmail = (value: string): iFieldState => {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL
    const safeEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com)$/i; //EXPRESION PARA EMAIL FORMA MAS SEGURA DE EMAILS
    //SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: valueNoSpaces })) {
        return {
            error: 'El campo no puede estar vacío',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // VALIDAR LONGITUD MINIMA 6 CARACTERES
    if (!isLengthValid({ text: valueNoSpaces, num: 6 })) {
        return {
            error: 'Debe tener al menos 6 caracteres',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // VALIDAR FORMATO DE EMAIL VALIDO
    if (!validateWithRegex({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, text: valueNoSpaces })) {
        return {
            error: 'Debe ser un correo válido',
            value: valueNoSpaces,
            isValid: false,
        };
    }
    // VALIDAR EMAILS PERMITIDOS
    if (!validateWithRegex({ pattern: safeEmailRegex, text: valueNoSpaces.toLowerCase() })) {
        return {
            error: 'Solo se permiten correos de gmail, outlook o hotmail',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    return { error: '', value: valueNoSpaces.toLocaleLowerCase(), isValid: true };
}

// FUNCION PARA VALIDAR CAMPO DE CONTRASEÑA
export const validatePassword = (value: string): iFieldState => {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: valueNoSpaces })) {
        return {
            error: 'El campo no puede estar vacío',
            value: valueNoSpaces,
            isValid: false,
        };
    }


    // MINIMO 8 CARACTERES
    if (!isLengthValid({ text: valueNoSpaces, num: 8 })) {
        return {
            error: 'Debe tener al menos 8 caracteres',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // MINIMO UNA LETRA MAYUSCULA
    if (!validateWithRegex({ pattern: /[A-Z]/, text: valueNoSpaces })) {
        return {
            error: 'Debe contener al menos una letra mayúscula',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // MINIMO UNA LETRA MINUSCULA
    if (!validateWithRegex({ pattern: /[a-z]/, text: valueNoSpaces })) {
        return {
            error: 'Debe contener al menos una letra minúscula',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // AL MENOS UN NUMERO
    if (!validateWithRegex({ pattern: /\d/, text: valueNoSpaces })) {
        return {
            error: 'Debe incluir al menos un número',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    // AL MENOS UN SIMBOLO (CARACTER ESPECIAL)
    if (!validateWithRegex({ pattern: /[!@#$%^&*(),.?":{}|<>_\-+=~`\[\]\\;]/, text: valueNoSpaces })) {
        return {
            error: 'Debe incluir al menos un símbolo',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    return { error: '', value: valueNoSpaces, isValid: true };
}

// FUNCION PARA VALIDAR CAMPO DE CONFIRMAR CONTRASEÑA
export const validateConfirmPassword = (value: string): iFieldState => {
    const valueNoSpaces: string = value.trim(); //QUITAR ESPACIOS EN BLANCO AL INICIO Y FINAL

    //SI EL CAMPO ESTA VACIO
    if (!isValueField({ text: valueNoSpaces })) {
        return {
            error: 'El campo no puede estar vacío',
            value: valueNoSpaces,
            isValid: false,
        };
    }

    const passwordValue: string = formStateValidField.password.value;

    // VERIFICAR QUE LAS CONTRASEÑAS COINCIDAN
    if (valueNoSpaces !== passwordValue.trim()) {
        return {
            error: 'Las contraseñas no coinciden',
            value: valueNoSpaces,
            isValid: false,
        };
    }
    return { error: '', value: valueNoSpaces, isValid: true };
}




