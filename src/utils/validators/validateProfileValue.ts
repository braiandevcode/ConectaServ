import { iFieldState } from "../../interfaces/interfaces.js"
import { convertBytes, formatDescription, isLengthValid, isValueField } from "../../ui/auxiliars.js"

// FUNCION QUE VALIDA CAMPO DE DESCRIPCION
export const validateDescription = (value: string): iFieldState => {
    // SI ESTA VACIO PERMITIR SIN VALOR PORQUE ES OPCIONAL
    if (!isValueField({ text: value })) {
        return { error: '', value: '', isValid: true }
    }

    // SI ES MAYOR A 350 CARACTERES
    if (isLengthValid({ text: value, num: 351 })) {
        return {
            error: 'Has excedido el limite de 350 caracteres.',
            value: value,
            isValid: false
        }
    }

    const formatedDescription = formatDescription(value);

    return { error: '', value: formatedDescription, isValid: true }
}

// FUNCION QUE VALIDA LA IMAGEN DEL PERFIL
export const validateImageProfile = (file: File | null): iFieldState => {
    const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeMB: number = 5;

    if (!file) {
        // CAMPO OPCIONAL
        return { error: '', value: '', isValid: true };
    }

    if (!allowedTypes.includes(file.type)) {
        return {
            error: 'Formato de imagen no válido. Usa JPG, JPEG, PNG o WEBP.',
            value: '',
            isValid: false
        };
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
        return {
            error: `La imagen no debe superar los ${maxSizeMB}MB.`,
            value: '',
            isValid: false
        };
    }

    return { error: '', value: file.name, isValid: true };
};


// FUNCION QUE VALIDA LAS IMAGENES DE EXPERIENCIAS, TAMAÑO, CANTIDAD Y SUMA TOTAL DEL PESO
export const validateImageExperiences = (files: FileList | null): iFieldState => {
    const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeMB: number = 5;
    const maxImages: number = 10;
    const maxTotalSizeMB: number = 50;
    let totalSize: number = 0; // VARIABLE AUXILIAR GLOBAL PARA CONTAR EL TAMAÑO TOTAL ASIGNADO ENTRE TODAS LAS IMAGENES DE EXPERIENCIAS
   
    // SI NO HAY ARCHIVO O SU LONGITUD ES  CERO ES VALIDO IGUAL
    if (!files || files.length === 0) {
        // CAMPO OPCIONAL
        return { error: '', value: '', isValid: true };

    }

    // SI LA CANTIDAD DE IMAGENES ES MAYOR AL LIMITE PERMITIDO NO ES VALIDO
    if (files.length > maxImages) {
        return {
            error: `Puedes subir hasta ${maxImages} imágenes.`,
            value: '',
            isValid: false
        };
    }

    // RECORRER CADA ARCHIIVO DE LOS ARCHIVOS DE IMAGENES MULTIPLES
    for (const file of Array.from(files)) {
        // SI EL TIPO DE MIME NO ESTA INCLUIDO EN EL FILE ERROR
        if (!allowedTypes.includes(file.type)) {
            return {
                error: `Una o más imágenes tienen formato inválido. Usa JPG, JPEG, PNG o WEBP.`,
                value: '',
                isValid: false
            };
        }


        const maxSizesBytes: number = convertBytes(maxSizeMB); //CONVERTIR A BYTES
        // SI EL TAMAÑO DE PESO DE LA IMAGEN ES MAYOR AL LIMITE
        if (file.size > maxSizesBytes) {
            return {
                error: `Cada imagen debe pesar menos de ${maxSizeMB}MB.`,
                value: '',
                isValid: false
            };
        }

        totalSize += file.size; //ACUMULAR PESO TOTAL
    }

    const maxSizesTotalBytes: number = convertBytes(maxTotalSizeMB); //CONVERTIR EL VALOR DE TOTAL DE MEGABYTES A BYTES
    //  SI EL TAMAÑO ACTUAL DEL PESO TOTAL DE IMAGENES ES MAYOR AL LIMITE
    if (totalSize > maxSizesTotalBytes) {
        return {
            error: `El peso total de las imágenes no debe superar los ${maxTotalSizeMB}MB.`,
            value: '',
            isValid: false
        };
    }

    // RETORNAR NUMERO DE CANTIDAD DE IMAGENES SELECCIONADAS
    return {
        error: '',
        value: `${files.length} archivo(s) seleccionado(s)`,
        isValid: true
    };
};
