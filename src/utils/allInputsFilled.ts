import { iRadioButton } from "../interfaces/interfaces";
import { TFormElement } from "../types/types";

// VALIDAR QUE TODOS LOS INPUTS TIPO TEXTO/PASSWORD/SELECT TIENEN VALOR
export const allInputsWithValueFilled = ({ elements }: { elements: Iterable<TFormElement> }): boolean => {
    return Array.from(elements).every(input => input.value.trim() !== '');
};



// VALIDAR QUE TODOS LOS CHECKBOXES DE LOS GRUPOS REQUERIDOS ESTAN SELECCIONADOS SEGUN CONTEXTO
export const groupEveryGroupHasChecked = ({ groupNames }: { groupNames: string[] }): boolean => {
    return groupNames.every(name => {
        const inputs = Array.from(document.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${name}"]`));
        return inputs.some(input => input.checked);
    });
};
// VALIDAR QUE AL MENOS UN RADIO BUTTON CON NOMBRE Y VALOR ESPECIFICO ESTE SELECCIONADO
export const inputsCheckedRadio = ({ inputs, name, value = "yes" }: iRadioButton): boolean => {
    const vectorInputsRadioButonElements = Array.from(inputs);
    return vectorInputsRadioButonElements.some(input => input.type === 'radio' && input.name === name && input.value === value && input.checked);
};

// VALIDAR QUE TODOS EL CHECKBOX ESTEN SELECCIONADO
export const isAllCheckboxChecked = ({ inputs, name }: { inputs: NodeListOf<HTMLInputElement>, name: string }): boolean => {
    return Array.from(inputs).some(
        input => input.type === 'checkbox' && input.name === name && input.checked
    );
};





