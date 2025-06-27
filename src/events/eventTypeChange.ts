import { TFieldName, TFormElement } from "../types/types";
import { createTitleCategorySelected } from "../dom/createElementsDom.ts.js";
import { iCbEventBaseProps, iFormEventHandler } from "../interfaces/interfaces";
import stepFourOrFiveFiles from "../ui/stepFourOrFiveFiles.js";
import isCategory from "../utils/validators/isCategory.js";
import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import saveDataStep from "../utils/saveDataStep.js";
import { formState } from "../config/constant.js";
import { validateFieldsWithErrorsUI } from "../ui/fieldsValidateUI.js";

// FUNCION DE DELEGACION PARA EL EVENTO 'CHANGE' EN FORMULARIOS
// ESTA FUNCION AGREGA UN ESCUCHADOR DE EVENTO AL FORMULARIO Y EJECUTA UNA CALLBACK PERSONALIZADA SEGUN EL CONTEXTO (REGISTRO, CONTACTO, ETC).
// LA CALLBACK 'cbEvent' DEBE DEFINIRSE EN CADA CASO CON SU PROPIA INTERFAZ PARA RECIBIR LOS DATOS NECESARIOS. 
// SE USA UNA INTERFAZ GENERICA PARA PERMITIR TIPADO FLEXIBLE SEGUN EL FORMULARIO DONDE SE INVOQUE.
const eventTypeChange = <T extends iCbEventBaseProps>({ cbEvent, step, form }: iFormEventHandler<T>): void | null => {
    const stepKey: string = String(step);

    form?.addEventListener('change', (e: Event) => {
        // LUEGO DEL EVENTO OBTENER TODOS LOS ELEMENTOS DEL FORMULARIO
        const allFormElements = Array.from(form?.elements as Iterable<TFormElement>) as TFormElement[];
        // SI A CATEGORIA ES "reparacion y mantenimiento"
        const isCategoryRepair = isCategory({ category: ECategoryKey.REPAIR, key: EKeyDataByStep.TWO });

        const target = e.target as TFormElement; // TARGET DEL EVENTO
        if (!target.name) return null; // SI NO EXISTE RETORNAR NULO

        const fieldName = target.name as TFieldName;

        // REGISTRO CHECK DE TERMINOS
        if (target.name === 'terms' && (step === 0 || step === 4 || step === 5)) {
            cbEvent({
                step,
                form,
                e
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
            console.log(formState.dataByStep);
        }

        // SELECT DE CATEGORIAS
        if ((step === 2 && fieldName === "category")) {
            createTitleCategorySelected();
            cbEvent({
                step,
                form,
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            // const budgeSelectedNo = form.querySelector('[name="budgeSelected"][value="no"]') as HTMLInputElement;
            // budgeSelectedNo.checked = true;
            saveDataStep({ step: stepKey, elements: allFormElements });
            console.log(formState.dataByStep);
        }

        if (step === 3 && ['service[]', 'context[]', 'day[]', 'hour[]'].includes(target.name)) {
            cbEvent({
                step,
                e,
                form,
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
            console.log(formState.dataByStep);
        }

        // PRESUPUESTO - RADIO  
        if (step === 4 && ['budgeSelected', 'reinsert'].includes(fieldName)) {
            cbEvent({
                step,
                form,
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
            console.log(formState.dataByStep);
        }

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
                file: targetFile.multiple ? null : targetFile.files[0],
                files: targetFile.multiple ? targetFile.files : null,
            });

            if (!result) return; // ASEGURARSE DE QUE RESULT NO SEA NULL

            let isValidFinal: boolean = result.isValid; // GUARDAR VALOR POR DEFECTO
            let errorFinal: string = result.error; // GUARDAR VALOR POR DEFECTO


            if (['imageProfile', 'imageExperiences'].includes(fieldName) && isCategoryRepair && (step === 5)) {
                isValidFinal = result.isValid;
                errorFinal = !result.isValid ? result.error : '';

                cbEvent({
                    step,
                    form,
                    e
                } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

                saveDataStep({ step: stepKey, elements: allFormElements });
                console.log(formState.dataByStep);

                targetFile.classList.toggle('is-valid', isValidFinal);
                targetFile.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;
            }

            if (['imageProfile', 'imageExperiences'].includes(fieldName) && !isCategoryRepair && (step === 4)) {

                cbEvent({
                    step,
                    form,
                    e
                } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO
                isValidFinal = result.isValid;
                errorFinal = !result.isValid ? result.error : '';

                stepFourOrFiveFiles({ step, form, e });

                saveDataStep({ step: stepKey, elements: allFormElements });
                console.log(formState.dataByStep);

                targetFile.classList.toggle('is-valid', isValidFinal);
                targetFile.classList.toggle('is-invalid', !isValidFinal);
                messageError.textContent = isValidFinal ? '' : errorFinal;
            }

        }

    });
}

export default eventTypeChange;