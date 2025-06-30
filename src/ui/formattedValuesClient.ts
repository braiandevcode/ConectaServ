import { capitalizeWords, normalizeSpaces } from "./auxiliars.js";

// FUNCION PARA FORMATEAR VALORES  EN FORMULARIO CLIENTE
const formatedValuesClient = (): Record<string, (v: string) => string> => {
    // FORMATEAR VALORES ANTES DE GUARDAR
    const formatters: Record<string, (v: string) => string> = {
        fullName: val => capitalizeWords(normalizeSpaces(val)),
        userName: val => val.trim(),
        email: val => val.toLowerCase(),
        location: val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
        password: val => val
    };

    return formatters;
}

export default formatedValuesClient;