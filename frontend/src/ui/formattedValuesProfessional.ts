import { capitalizeWords, formatDescription, normalizeSpaces, parseMontoToNumber } from "./auxiliars.js";

// FUNCION PARA FORMATEAR VALORES EN FORMULARIO CLIENTE
const formatedValuesProfessional = (): Record<string, (v: unknown) => string | number | string[]> => {
    const formatters: Record<string, (v: unknown) => string | number | string[]> = {
        // PASO 1 DATOS BASICOS
        fullName: (val) => capitalizeWords(normalizeSpaces(String(val))),
        userName: (val) => String(val).trim(),
        email: (val) => String(val).toLowerCase(),
        location: (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),
        password: (val) => String(val),

        // PASO 2 ELEGUIR CATEGORIA
        category: (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),

        // PASO 3 DETALLES PROFESION
        "service[]": (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),
        "context[]": (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),
        "day[]": (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),
        "hour[]": (val) => String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase(),

        // PASO 4 PRESUPUESTO
        amountBudge: (val) => parseMontoToNumber(String(val)),
        budgeSelected: (val) => String(val),
        reinsert: (val) => String(val),

        // PASO 4 O 5 PERFIL
        description: (val) => formatDescription(String(val)),

        // Archivos
        imageProfile: (val) => val instanceof File ? val.name : String(val),
        imageExperiences: (val) => (
            Array.isArray(val) && val.every(f => f instanceof File)
                ? val.map(f => f.name)
                : []
        )
    };

    return formatters;
};

export default formatedValuesProfessional;