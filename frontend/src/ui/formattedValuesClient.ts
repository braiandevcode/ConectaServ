import { capitalizeWords, normalizeSpaces } from "./auxiliars.js";

// FUNCION PARA FORMATEAR VALORES EN FORMULARIO CLIENTE
const formatedValuesClient = (): Record<string, (v: unknown) => string> => {
    const formatters: Record<string, (v: unknown) => string> = {
        fullName: (val) => capitalizeWords(normalizeSpaces(String(val))),
        userName: (val) => String(val).trim(),
        email: (val) => String(val).toLowerCase(),
        location: (val) => {
            const str = String(val);
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },
        password: (val) => String(val)
    };

    return formatters;
};

export default formatedValuesClient;