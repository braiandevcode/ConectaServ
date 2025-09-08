import { iFormSelectCategory } from "../interfaces/interfaces.js";
import { formState, categoryConfigs } from "../config/constant.js";
import { show, hide } from "../ui/auxiliars.js";
import { TCategoryConfig, TCategoryKey, TFormElement, TInputs } from "../types/types.js";
import getStepValidationMap from "../config/getStepValidationStrategies.js";
import setValidationStrategiesMap from "../config/setValidationStrategiesMap.js";
import { createStepBudget, deleteStepBudget } from "./createElementsDom.ts.js";
import createGroupCheckBoxes from "./createGroupCheckBoxes.js";

// FUNCION QUE EVALUA EL VALOR EN SELECT DE CATEGORIA
const evaluateCategorySelected = ({
    formContainerGroups,
    target,
    e,
    form,
}: iFormSelectCategory): undefined | null => {
    // SI NO PASA UN TARGET LITERAL PASAR EL TARGET DEL EVENTO
    const targetEvent = target ?? (e?.target as TFormElement);

    // SI NO HAY TARGET RETORNAR NULO
    if (!targetEvent) return null;

    target = targetEvent as HTMLElement; // ASEGURAR QUE "target" SEA UN HTMLElement

    if (!form) return null; //SI EL FORMULARIO ES NULO

    const selectedKeyCategory = (targetEvent as HTMLSelectElement)?.value.toLowerCase() as TCategoryKey; // VALOR DE SELECT

    //CONFIGURACION SEGUN EL VALOR SELECCIONADO ejemplo categoryConfig["reparacion-mantenimiento"]
    const config: TCategoryConfig = categoryConfigs[selectedKeyCategory];

    // SI NO EXISTE
    if (!config) {
        formState.hasContext = false;
        hide({ $el: formContainerGroups, cls: ['form-step--hidden'] });//OCULTAR ESPECIALIDADES 
        return null;
    }

    // SI EXISTE EL config
    formState.hasContext = config.hasContext; //ACTUALIZAMOS EL VALOR DE hasContext AL VALOR BOOLEANO ACTUAL DEL OBJETO GLOBAL

    show({ $el: formContainerGroups, cls: ['form-step--hidden'] }); //MOSTRAR SECCION

    const newStrategies: Record<number, TInputs> = getStepValidationMap({ hasBudget: config.budget }); //CREAR OBJETO DE MAPEO DE VALIDACIONES SEGUN  hasBudget(SECCION PRESUPUESTO)

    setValidationStrategiesMap({ map: newStrategies }); //ACTUALIZAR EL NUEVO OBJETO NUEVO OBJETO

    // // SI EL VALOR DE budget EN LA PROPIEDAD ACUTAL ES TRUE, SIGNIFICA QUE DEBE CREARSE EL DOM DE LA SECCION 4
    // // SI DE LA CATEGORIA ELEGIDA EL BUDGET ES TRUE    
    if (config.budget) {
        createStepBudget();
    } else {
        deleteStepBudget({ container: form }); //ELIMINAR SECCION DE PRESUPUESTO
    }

    createGroupCheckBoxes({ options: config.options }); //CREAR SECCION DE GRUPOS DE CHECKS 
}
export default evaluateCategorySelected;