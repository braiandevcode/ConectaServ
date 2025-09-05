import { iFieldsForms } from "../interfaces/interfaces";
// FUNCION PARA RECORRER CAMPOS Y FORMATEAR VALORES 
const everyFieldsFormsByFormatter = ({ vNames, dataToSend, formElement, formatters }: iFieldsForms) => {
    vNames.forEach(field => {
        const value = (formElement.elements.namedItem(field) as HTMLInputElement)?.value?.trim() ?? "";
        const formatter = formatters[field];
        if (formatter) {
            dataToSend[field] = formatter(value);
        }
    });
}

export default everyFieldsFormsByFormatter;