import { iRadioButton } from "../interfaces/interfaces";
import { TFormElement } from "../types/types";

// VALIDAR QUE TODOS LOS INPUTS TIPO TEXTO/PASSWORD/SELECT TIENEN VALOR
export const allInputsWithValueFilled = ({ elements }: { elements: Iterable<TFormElement> }): boolean => {
    return Array.from(elements).every(input => input.value.trim() !== '');
};

// VALIDAR QUE TODOS LOS CHECKBOXES DE LOS GRUPOS REQUERIDOS ESTAN SELECCIONADOS SEGUN CONTEXTO
export const allInputsChecked = ({ inputs, hasContext }: { inputs: NodeListOf<HTMLInputElement>, hasContext: boolean }): boolean => {
    const groupNames: string[] = ['service[]', 'context[]', 'day[]', 'hour[]'];
    const vectorInputsCheckboxElements =  Array.from(inputs);

    // SI TIENE EL GRUPO DE CONTEXT
    if (hasContext) {
        // VALIDAR QUE HAYA AL MENOS UN CHECK POR CADA GRUPO CUANDO HAY CONTEXTO
        return groupNames.every(name =>
            vectorInputsCheckboxElements.some(input => input.name === name && input.checked)
        );
    } else {
        // VALIDAR QUE HAYA AL MENOS UN CHECK POR CADA GRUPO EXCLUYENDO CONTEXTO
        const copyGroupName: Array<string> = groupNames.filter((_, i) => i !== 1);
        return copyGroupName.every(name =>
            vectorInputsCheckboxElements.some(input => input.name === name && input.checked)
        );
    }
};

// VALIDAR QUE AL MENOS UN RADIO BUTTON CON NOMBRE Y VALOR ESPECIFICO ESTE SELECCIONADO
export const allInputsCheckedRadio = ({inputs, name, value = "yes" }: iRadioButton): boolean => {
    const vectorInputsRadioButonElements = Array.from(inputs);
    return vectorInputsRadioButonElements.some(input => input.type === 'radio' && input.name === name && input.value === value && input.checked);
};

// VALIDAR QUE EL CHECKBOX DE TÉRMINOS Y CONDICIONES O PARA CUALQUIER OTRO CASO ESTE SELECCIONADO
export const isCheckboxChecked = ({ inputs, name }: { inputs: NodeListOf<HTMLInputElement>, name: string }): boolean => {
    return Array.from(inputs).some(input => input.type === 'checkbox' && input.name === name && input.checked);
};

// VALIDAR QUE TODOS EL CHECKBOX ESTEN SELECCIONADO
export const isAllCheckboxChecked = ({ inputs, name }: { inputs: NodeListOf<HTMLInputElement>, name: string }): boolean => {
    return Array.from(inputs).some(
        input => input.type === 'checkbox' && input.name === name && input.checked
    );
};





