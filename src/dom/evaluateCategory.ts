import { iFormSelectCategory } from "../interfaces/interfaces.js";
import { formState, categoryConfigs } from "../config/constant.js";
import optionsChecksForm from "./optionsChecksForm.js";
import { show, hide } from "../ui/auxiliars.js";
import { TCategoryConfig, TCategoryKey, TFormElement, TInputs, TOptionTypeGroup } from "../types/types.js";
import getStepValidationMap from "../config/getStepValidationStrategies.js";
import setValidationStrategiesMap from "../config/setValidationStrategiesMap.js";
import { createStepBudget, deleteStepBudget } from "./createElementsDom.ts.js";
// import saveDataStep from "../utils/saveDataStep.js";

// FUNCION QUE EVALUA EL VALOR EN SELECT DE CATEGORIA
const evaluateCategorySelected = ({
    formContainerGroups,
    formCategorySelected,
    groupServiceCheckbox,
    groupDaysCheckbox,
    groupHoursCheckbox,
    groupContextCheckbox
}: iFormSelectCategory): undefined | null => {
    const $BUTTON: HTMLButtonElement | null = document.querySelector('button[data-step="3"]'); //REFERENCIAR BOTON CON data-step=3
    const $CONTAINER_FORM_PROFESSIONAL: HTMLElement | null = document.querySelector('.form-professional');

    if (!formContainerGroups || !$CONTAINER_FORM_PROFESSIONAL) return null; //SI SON NULOS

    const selectedKeyCategory = formCategorySelected?.value.toLowerCase() as TCategoryKey; //VALOR DE SELECT

    const config: TCategoryConfig = categoryConfigs[selectedKeyCategory]; //CONFIGURACION SEGUN EL VALOR SELECCIONADO ejemplo categoryConfig["reparacion-mantenimiento"]

    // saveDataStep({ step:"2", elements:[formCategorySelected as TFormElement] }); //GUARDAR CATEGORIA ELEGIDA

    // SI NO EXISTE
    if (!config) {
        formState.hasContext = false;
        hide({ $el: formContainerGroups, cls: ['form-step--hidden'] });//OCULTAR ESPECIALIDADES 
        return;
    }

    // SINO
    formState.hasContext = config.hasContext; //ACTUALIZAMOS EL VALOR DE hasContext AL VALOR BOOLEANO ACTUAL DEL OBJETO GLOBAL

    show({ $el: formContainerGroups, cls: ['form-step--hidden'] }); //MOSTRAR SECCION

    const newStrategies: Record<number, TInputs> = getStepValidationMap({ hasBudget: config.budget }); //CREAR OBJETO DE MAPEO DE VALIDACIONES SEGUN  hasBudget(SECCION PRESUPUESTO)

    setValidationStrategiesMap({ map: newStrategies }); //ACTUALIZAR EL NUEVO OBJETO NUEVO OBJETO

    // SI DE LA CATEGORIA ELEGIDA EL BUDGET ES TRUE
    if (config.budget) {
        createStepBudget();
    } else {
        deleteStepBudget({ container: $CONTAINER_FORM_PROFESSIONAL });
    }

    // SI EL VALOR DE budget EN LA PROPIEDAD ACUTAL ES TRUE, SIGNIFICA QUE DEBE CREARSE EL DOM DE LA SECCION 4
    // if (config.budget) {
    //     console.log('el contenedor existe');
    //     crearPasoPresupuesto();
    // } else {
    //     console.log('el NO contenedor existe');
    //     eliminarPasoPresupuesto({ container: $CONTAINER_FORM_PROFESSIONAL }); //SINO ELIMINAR
    // }

    // RECORRER LAS OPCIONES EN LA CONFIGURACION
    config.options.forEach(({ vectorGroupItemCheck, type }) => {
        // MAPEAMOS Y CREAMOS EN CADA VUELTA UN OBJETO QUE GUARDE LOS ELEMENTOS CONTENEDORES DE CADA GRUPO DE CHECKSBOX
        const containerMap: Record<TOptionTypeGroup, HTMLElement | null> = {
            service: groupServiceCheckbox,
            context: groupContextCheckbox,
            day: groupDaysCheckbox,
            hour: groupHoursCheckbox
        };

        // REFERENCIA DEL CONTENEDOR PRINCIPAL QUE CONTENGA LOS GRUPOS POR EL TIPO
        const $CONTAINER: HTMLElement | null = containerMap[type];

        //LLAMAR A FUNCION DE CREACION DE CHECKS EN CADA VUELTA DEL BUCLE
        optionsChecksForm({ vectorGroupItemCheck, type, container: $CONTAINER });
    });

    $BUTTON?.setAttribute('disabled', 'true');
}
export default evaluateCategorySelected;