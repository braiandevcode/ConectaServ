//IMPORTACIONES
import stepThree from "./stepThree.js";
import stepTwoSelectCategory from "./stepTwoSelectCategory.js";
import stepFourBudgeSelected from "./stepFourBudgeSelected.js";
import eventTypeInput from "../events/eventTypeInput.js";
import eventTypeChange from "../events/eventTypeChange.js";
import stepFourAmountBudge from "../ui/stepFourAmountBudge.js";
import stepOneOrZero from "./stepOneOrZero.js";
import stepFourOrFiveDescription from "./stepFourOrFiveDescription.js";
import { TCbEventPropsRegistro, TFieldName, TFormElement } from "../types/types.js";
import lastStepCheckTerms from "./lastStepCheckTerms.js";
import stepFourOrFiveFiles from "./stepFourOrFiveFiles.js";
import { validateFieldsWithErrorsUI } from "./fieldsValidateUI.js";
import stepOneOrZeroSelected from "./stepOneOrZeroSelected.js";
import stepFourReinsertSelected from "./stepFourReinsertSelected.js";


//FUNCION PARA LOS EVENTOS DE PASOS EN REGISTRO DE PROFESIONAL DONDE SE HACE USO DE LAS FUNCIONES DE EVENTOS
const setupEventsByStep = ({ step, form }: {
    step: number;
    form: HTMLFormElement;
    btn?: HTMLButtonElement;
}): void => {
    // EVENTO DE INPUT
    eventTypeInput<TCbEventPropsRegistro>({
        step,
        form,
        cbEvent: ({ step, e, form }) => {
            if (!form) return null;

            if ((step === 1 || step === 0) && e) {
                stepOneOrZero({ step, e, form });
            }

            if (step === 4 && e) {
                stepFourAmountBudge({ step, e, form });
            }

            if ((step === 4 || step === 5) && e) {
                stepFourOrFiveDescription({ step, e, form });
            }
        }
    });

    // EVENTO DE CAMBIO
    eventTypeChange<TCbEventPropsRegistro>({
        step,
        form,
        cbEvent: ({ step, e, form }) => {
            if (!form) return null; // SI FORM ES NULL
            const target = e?.target as TFormElement; // CASTEAR A TIPO "TFormElement"
            if (!target) return null; //SI EL ELEMENTO TARGET ES NULL

            const fieldName = target.name as TFieldName; // CASTEAR A TIPO "TFieldName"
            // SI EL PASO ES CERO, CUATRO O CINCO Y EXISTE EL OBJETO EVENTO
            if ((step === 0 || step === 4 || step === 5) && e) {
                if (step === 4 || step === 5) {
                    stepFourOrFiveFiles({ step, form, e }); //LLAMAR FUNCION PARA PASO 4 O 5

                    // MENSAJE EN UI CAMPOS DE IMAGENES
                    const targetFile = e.target as HTMLInputElement;
                    if (!targetFile.name) return null;

                    if (targetFile.files && targetFile.files.length > 0) {
                        const containerMessage = form.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement;
                        const messageError = containerMessage?.querySelector('.has-error') as HTMLSpanElement | null;
                        if (!messageError) return; // SI NO HAY ELEMENTO REFERENCIADO RETORNAR

                        const result = validateFieldsWithErrorsUI({
                            fieldName,
                            value: '',
                            values: [],
                            file: targetFile.multiple ? null : targetFile.files[0],
                            files: targetFile.multiple ? targetFile.files : null,
                        });

                        if (!result) return; // ASEGURARSE DE QUE RESULT NO SEA NULL

                        let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
                        let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO

                        isValidFinal = result.isValid;
                        errorFinal = !result.isValid ? result.error : '';


                        targetFile.classList.toggle('is-valid', isValidFinal);
                        targetFile.classList.toggle('is-invalid', !isValidFinal);
                        messageError.textContent = isValidFinal ? '' : errorFinal;
                    }
                }
                lastStepCheckTerms({ step, e, form }); //LLAMAR FUNCION DEL ULTIMO PASO CHECK DE TERMINOS
            }

            // SI EL PASO ES EL 2
            if (step === 2 && e) {
                stepTwoSelectCategory({ step, form, e });

            }
            // SI EL PASO ES EL 4
            if (step === 4 && e &&  fieldName === 'budgeSelected') {
                stepFourBudgeSelected({ step, form, e });
            }

            if (step === 4 && e && fieldName === 'reinsert') {
                stepFourReinsertSelected({ e });
            }

            // SI EL PASO ES EL 3 Y SI EXISTE EL OBJETO DE EVENTO
            if (step === 3 && e) {
                stepThree({ step, form, e });
            }

            // SI EL STEP ES CERO O UNO Y EL NAME ES LOCATION Y EXISTE EL EVENTO
            if ((step === 0 || step === 1) && (fieldName === 'location') && e) {
                stepOneOrZeroSelected({ step, e, form }); //LLAMAR FUNCION PARA ESTE CASO

                // REFERENCIAR ELEMENTO DEL DOM data-message POR SU VALOR
                const containerMessage = form.querySelector(`[data-message="${fieldName}"]`) as HTMLDivElement;

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
            }
        }
    });
}

export default setupEventsByStep

