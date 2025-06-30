import { iFormSelectCategory } from "../interfaces/interfaces.js";
import { formState, categoryConfigs } from "../config/constant.js";
import { show, hide } from "../ui/auxiliars.js";
import { TCategoryConfig, TCategoryKey, TFieldName, TFormElement, TInputs } from "../types/types.js";
import getStepValidationMap from "../config/getStepValidationStrategies.js";
import setValidationStrategiesMap from "../config/setValidationStrategiesMap.js";
import { createStepBudget, deleteStepBudget } from "./createElementsDom.ts.js";
import createGroupCheckBoxes from "./createGroupCheckBoxes.js";

// FUNCION QUE EVALUA EL VALOR EN SELECT DE CATEGORIA
const evaluateCategorySelected = ({
    formContainerGroups,
    e,
    form,
}: iFormSelectCategory): undefined | null => {
    const $BUTTON: HTMLButtonElement | null = document.querySelector('button[data-step="3"]'); //REFERENCIAR BOTON CON data-step=3

    const target = e.target as TFormElement;

    if (!target) return null;

    if (!form) return null; //SI EL FORMULARIO ES NULO

    const selectedKeyCategory = target?.value.toLowerCase() as TCategoryKey; //VALOR DE SELECT

    const config: TCategoryConfig = categoryConfigs[selectedKeyCategory]; //CONFIGURACION SEGUN EL VALOR SELECCIONADO ejemplo categoryConfig["reparacion-mantenimiento"]

    // SI NO EXISTE
    if (!config) {
        formState.hasContext = false;
        hide({ $el: formContainerGroups, cls: ['form-step--hidden'] });//OCULTAR ESPECIALIDADES 
        return;
    }

    // SI EXISTE EL config
    formState.hasContext = config.hasContext; //ACTUALIZAMOS EL VALOR DE hasContext AL VALOR BOOLEANO ACTUAL DEL OBJETO GLOBAL

    show({ $el: formContainerGroups, cls: ['form-step--hidden'] }); //MOSTRAR SECCION

    const newStrategies: Record<number, TInputs> = getStepValidationMap({ hasBudget: config.budget }); //CREAR OBJETO DE MAPEO DE VALIDACIONES SEGUN  hasBudget(SECCION PRESUPUESTO)

    setValidationStrategiesMap({ map: newStrategies }); //ACTUALIZAR EL NUEVO OBJETO NUEVO OBJETO

    // SI EL VALOR DE budget EN LA PROPIEDAD ACUTAL ES TRUE, SIGNIFICA QUE DEBE CREARSE EL DOM DE LA SECCION 4
    // SI DE LA CATEGORIA ELEGIDA EL BUDGET ES TRUE
    if (config.budget) {
        createStepBudget();
        const budgeSelectedNo = form.querySelector('[name="budgeSelected"][value="no"]') as HTMLInputElement;
        if (budgeSelectedNo) {
            budgeSelectedNo.checked = true;

            //DISPARAR MANUALMENTE EVENTO CHANGE AL ELEMENTO
            const event = new Event('change', { bubbles: true });
            budgeSelectedNo.dispatchEvent(event);
        }
    } else {
        deleteStepBudget({ container: form });
    }

    createGroupCheckBoxes({ options: config.options }); //CREAR CHECKS DOM

    $BUTTON?.setAttribute('disabled', 'true');
}
export default evaluateCategorySelected;