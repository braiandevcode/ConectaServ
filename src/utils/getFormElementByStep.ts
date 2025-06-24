import { namesCheckBoxes } from "../config/constant.js";

// VER Y REFERENCIAR TODOS LOS ELEMENTOS INPUTS DE LA SECCION DETALLES PROFESION
export const getAllCheckboxInputs = (): HTMLInputElement[] => {
    const valueNames = Object.values(namesCheckBoxes); //CREAR ARREGLO CON VALORES DE LAS PROPIEDADES DEL OBJETO "namesCheckBoxes "
    let allCheckboxes: HTMLInputElement[] = []; // ARREGLO VACIO

    // SE RECORRE CADA NAME
    valueNames.forEach(name => {
        // SE REFERENCIAN TODOS LOS ELEMENTOS CON EL NAME ESPECIFIANDO SU GRUPO
        const group = document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${name}"]`);
        allCheckboxes = [...allCheckboxes, ...group]; //GUARDAR EN EL ARREGLO CADA GRUPO
    });

    return allCheckboxes;
};

// FUNCION BASE PARA LOS ELEMENTOS DEL FORMULARIO
// const getFormElementsByStep = ({ formSelector, step }: { formSelector: string; step: number }) => {
//     const base: string = `.register-${formSelector} [data-step="${step}"]`; // LA BASE PARA REFERENCIAR LOS PASOS
//     const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>(`${base} input`); // DESDE LA BASE ENCONTRAR EL INPUT
//     const selects: NodeListOf<HTMLSelectElement> = document.querySelectorAll<HTMLSelectElement>(`${base} select`); // DESDE LA BASE ENCONTRAR EL SELECT
//     const textArea: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll<HTMLTextAreaElement>(`${base} textarea`); // DESDE LA BASE ENCONTRAR EL SELECT
//     return { inputs, selects, textArea };
// };

// export default getFormElementsByStep;
