import { TFieldName, TFormElement } from "../types/types";
import { createTitleCategorySelected } from "../dom/createElementsDom.ts.js";
import { iFieldState } from "../interfaces/interfaces";
// import isCategory from "../utils/validators/isCategory.js";
// import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import saveDataStep from "../utils/saveDataStep.js";
import { namesCheckBoxes } from "../config/constant.js";
import lastStepCheckTerms from "../ui/lastStepCheckTerms.js";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";
import stepOneCheckBoxes from "../ui/stepOneCheckBoxes.js";
import stepThreeBudgeSelected from "../ui/stepThreeBudgeSelected.js";
import stepThreeReinsertSelected from "../ui/stepThreeReinsertSelected.js";
import stepLastOrZeroSelected from "../ui/stepLastOrZeroSelected.js";
import stepOneSelectCategory from "../ui/stepOneSelectCategory.js";
import stepTwoFiles from "../ui/stepTwoFiles.js";


// CUANDO SE CAMBIA DE CATEGORIA:
// const handleCategoryChange = (selectCategory: HTMLSelectElement, elements: TFormElement[]) => {
//     const categoryValue: string = selectCategory.value.trim();
//     // GUARDAR PASO 2 CON LA NUEVA CATEGORIA
//     saveDataStep({ step: Number(EKeyDataByStep.ONE), elements });

//     // SEGUN CATEGORIA GUARDAR PASO 4 o 5 CON DATOS "limpios" O POR DEFECTO
//     if (categoryValue === ECategoryKey.REPAIR) {
//         // GUARDAR PRESUPUESTO CON VALORES POR DEFECTO 
//         saveDataStep({ step: Number(EKeyDataByStep.THREE), elements });
//     } else {
//         // GUARDAR BASICO CON VALORES POR DEFECTO 
//         saveDataStep({ step: Number(EKeyDataByStep.FOUR), elements });
//     }

//     // Opcional: LIMPIAR DATOS DEL PASO QUE YA NO APLICA
//     const existingData = JSON.parse(localStorage.getItem("stepData") || "{}");
//     if (categoryValue === ECategoryKey.REPAIR) {
//         delete existingData[EKeyDataByStep.FOUR]; // EL PASO PRESUPUESTO NO APLICA, ELIMINAR
//     }
//     localStorage.setItem("stepData", JSON.stringify(existingData));
// };


// FUNCION DE DELEGACION PARA EL EVENTO 'CHANGE' EN FORMULARIOS
const eventTypeChange = (): void => {
    document.addEventListener('change', (e: Event) => {
        e.preventDefault();
        const target = e?.target as HTMLInputElement;
        if (!target) return null;

        if (!target.name) return null;
        const fieldName = target.name as TFieldName; // NAME DEL CAMPO

        //--------------------FORMULARIOS DE REGISTRO CLIENTE/PROFESIONAL----------------------//
        const formElementRegisterProfessional = (target.closest('.register-client') as HTMLFormElement);
        const formElementRegister = (target.closest('.register-professional') as HTMLFormElement) ?? formElementRegisterProfessional;

        if (formElementRegister) {
            const stepKey: string = target.closest('[data-step]')?.getAttribute('data-step') as string; // OBTENER VALOR DEL data-step
            const step: number = parseInt(stepKey); // PARSEAR VALOR DEL DATA SET A NUMERO

            // LUEGO DEL EVENTO OBTENER TODOS LOS ELEMENTOS DEL FORMULARIO
            const allFormElements = Array.from(formElementRegister.elements as Iterable<TFormElement>) as TFormElement[];

            // SI A CATEGORIA ES "reparacion y mantenimiento"
            // const isCategoryRepair = isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.TWO });

            // REGISTRO CHECK DE TERMINOS
            if (target.name === 'terms' && (step === 0 || step === 3 || step === 4)) {
                lastStepCheckTerms({ step, e, form: formElementRegister }); //LLAMAR FUNCION DEL ULTIMO PASO CHECK DE TERMINOS
                saveDataStep({ step, elements: allFormElements });
            }

            if ((step === 1) && (fieldName === "category")) {
                if ((target instanceof HTMLSelectElement)) {
                    // handleCategoryChange(target, allFormElements)
                    createTitleCategorySelected();
                    stepOneSelectCategory({ step, form: formElementRegister, e });
                }
                // saveDataStep({ step, elements: allFormElements });
            }

            // // CHEXKBOX DE DATOS ESPECIFICOS DE PROFESION
            if ((step === 1) && Object.values(namesCheckBoxes).includes(fieldName)) {
                stepOneCheckBoxes({ step, form: formElementRegister, e });
                saveDataStep({ step, elements: allFormElements });
            }

            // IMAGENES DE PERFIL Y EXPERIENCIAS
            if (['imageProfile', 'imageExperiences'].includes(fieldName) && step === 2) {
                stepTwoFiles({ step, form: formElementRegister, e }); //LLAMAR FUNCION PARA PASO 4 O 5

                // SI EL TARGET CONTIENE "files" Y SI SU LONGITUD ES MAYOR A CERO
                if (target.files && target.files.length > 0) {
                    const containerMessage: HTMLDivElement | null = formElementRegister.querySelector(`[data-message="${fieldName}"]`);
                    if (!containerMessage) return null; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR NULO

                    const messageError = containerMessage?.querySelector('.has-error') as HTMLSpanElement | null;
                    if (!messageError) return null; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR NULO

                    // VALIDAR CAMPOS ENE STE PUNTO LOS DE FILES
                    const result: iFieldState | null = validateFieldsWithErrorsUI({
                        fieldName,
                        value: '',
                        values: [],
                        file: target.multiple ? null : target.files[0],//SI ES MULTIPLE NULO SINO FILE SIMPLE
                        files: target.multiple ? target.files : null,//MULTIPLES O NULL
                    });

                    if (!result) return null; // ASEGURARSE DE QUE RESULT NO SEA NULL

                    let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
                    let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

                    isValidFinal = result.isValid; //GUARDAR EN MEMORIA VALOR BOOLEANO SI ES VALIDO O NO
                    errorFinal = result.error; //GUARDAR EN MEMORIA VALOR DEL MENSAJE DE ERROR

                    target.classList.toggle('is-valid', isValidFinal); // SERA VALIDO SI ES TRUE
                    target.classList.toggle('is-invalid', !isValidFinal); // SERA INVALIDO SI ES FALSE

                    messageError.textContent = errorFinal; //CONTENIDO DE TEXTO DEL ELEMENTO
                }

                saveDataStep({ step, elements: allFormElements }); //GUARDAR
            }

            // PRESUPUESTO - RADIO  
            if (step === 3 && fieldName === 'budgeSelected') {
                stepThreeBudgeSelected({ step, form: formElementRegister, e });
                saveDataStep({ step, elements: allFormElements });
            }

            // PRESUPUESTO - RADIO  
            if (step === 3 && fieldName === 'reinsert') {
                stepThreeReinsertSelected({ e });
                saveDataStep({ step, elements: allFormElements });
            }

            // UBICACION
            if (fieldName === 'location' && (step === 0 || step === 3 || step === 4)) {
                stepLastOrZeroSelected({ step, e, form: formElementRegister }); //LLAMAR FUNCION PARA ESTE CASO

                // REFERENCIAR ELEMENTO DEL DOM data-message POR SU VALOR
                const containerMessage = formElementRegister.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement;

                //DEL CONTENEDOR PADRE REFERENCIAL EL ELEMENTO DEL TEXTO SPAN
                const messageError = containerMessage?.querySelector('.has-error') as HTMLSpanElement | null;

                if (!messageError) return null; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR NULO

                // LLAMAR FUNCION DE ERRORES PARA VERIFICAR SU ESTADO ACTUAL
                const result = validateFieldsWithErrorsUI({
                    fieldName,
                    value: target.value,
                    values: [],
                    file: null,
                    files: null,
                });

                if (!result) return null; // SI ES NULL 

                let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
                let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

                isValidFinal = result.isValid; // GUARDAR VALOR ACTUAL EN => isValidFinal 
                errorFinal = !result.isValid ? result.error : ''; // SI NO ES VALIDO MENSAJE DE ERROR CORRESPONDIENTE AL CAMPO SINO VACIO

                target?.classList.toggle('is-valid', isValidFinal); // SI ES TRUE AÑADIR CLASE => DOMTokenList.toggle(token: string, force?: boolean | undefined): boolean
                target?.classList.toggle('is-invalid', !isValidFinal); // SI ES FALSE ESTILO DE is-invalid
                messageError.textContent = errorFinal; //AGREGAR AL SPAN CORRESPONDIENTE EL MENSAJE DE ERROR

                saveDataStep({ step, elements: allFormElements });
            }

        }

        //----------------- OTRAS CONDICIONES NECESARIAS CON EL MISMO EVENTO---------------// ...
    });
}

export default eventTypeChange;