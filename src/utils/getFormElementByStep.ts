const getFormElementsByStep = ({ formSelector, step} : { formSelector: string; step: number }) => {
    const base:string = `.register-${formSelector} [data-step="${step}"]`; // LA BASE PARA REFERENCIAR LOS PASOS
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>(`${base} input`); // DESDE LA BASE ENCONTRAR EL INPUT
    const selects: NodeListOf<HTMLSelectElement> = document.querySelectorAll<HTMLSelectElement>(`${base} select`); // DESDE LA BASE ENCONTRAR EL SELECT
    const textArea: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll<HTMLTextAreaElement>(`${base} textarea`); // DESDE LA BASE ENCONTRAR EL SELECT
    return { inputs, selects, textArea };
};

export default getFormElementsByStep;
