import { TFieldName, TFormElement } from "../types/types";
import { createTitleCategorySelected } from "../dom/createElementsDom.ts.js";
import { iCbEventBaseProps, iFormEventHandler } from "../interfaces/interfaces";
import stepFourOrFiveFiles from "../ui/stepFourOrFiveFiles.js";
import isCategory from "../utils/validators/isCategory.js";
import { ECategoryKey, EKeyDataByStep } from "../types/enums.js";
import saveDataStep from "../utils/saveDataStep.js";
import { formState, namesCheckBoxes } from "../config/constant.js";

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
            cbEvent({ step, form, e } as unknown as T);
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // SELECT DE CATEGORIAS
        if ((step === 2 && fieldName === "category")) {
            createTitleCategorySelected();
            cbEvent({ step, form, e } as unknown as T);
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // CHEXKBOX DE DATOS ESPECIFICOS DE PROFESION
        if (step === 3 && Object.values(namesCheckBoxes).includes(fieldName)) {
            cbEvent({
                step,
                e,
                form,
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO
            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // PRESUPUESTO - RADIO  
        if (step === 4 && fieldName === 'budgeSelected') {
            cbEvent({
                step,
                form,
                e
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
        }


        // PRESUPUESTO - RADIO  
        if (step === 4 && fieldName === 'reinsert') {
            cbEvent({
                step,
                form,
                e
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
            console.log(formState.dataByStep);
        }


        // IMAGENES DE PERFIL Y EXPERIENCIAS
        if (['imageProfile', 'imageExperiences'].includes(fieldName) && ((isCategoryRepair && step === 5) || (!isCategoryRepair && step === 4))) {
            cbEvent({
                step,
                form,
                e,
            } as unknown as T);

            // if (!isCategoryRepair && step === 4) {
            //     stepFourOrFiveFiles({ step, form, e });
            // }

            saveDataStep({ step: stepKey, elements: allFormElements });
        }

        // UBICACION
        if ((step === 0 || step === 1) && fieldName === 'location') {
            cbEvent({
                step,
                form,
                e,
            } as unknown as T); //CONFIA EN MI, YO ME ENCARGO DEL TIPO

            saveDataStep({ step: stepKey, elements: allFormElements });
        }
    });
}

export default eventTypeChange;