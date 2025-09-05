import { TCategoryOption, TOptionTypeGroup } from "../types/types";
import clearElementChild from "./clearElementChild.js";
import optionsChecksForm from "./optionsChecksForm.js";
const D: Document = document;

const createGroupCheckBoxes = ({ options }: { options: TCategoryOption[] }) => {
    // CONTENEDOR PRINCIPAL DE SECCIONES
    // const $FORM_CONTAINER_GROUPS: HTMLDivElement | null = D.querySelector('.form-professional-groupSpeciality');
    const $GROUP_CONTEXT_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__contexts-body');
    const $GROUP_SPECIALITY_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__services-body');
    const $GROUP_DAYS_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__days-body');
    const $GROUP_HOUR_CHECKS = D.querySelector<HTMLDivElement>('.form-professional-groupSpeciality__hours-body');


    const resetAllCheckboxContainers = [
        $GROUP_CONTEXT_CHECKS,
        $GROUP_HOUR_CHECKS,
        $GROUP_DAYS_CHECKS,
        $GROUP_SPECIALITY_CHECKS
    ].filter((el): el is HTMLDivElement => el !== null);

    clearElementChild({ elements: resetAllCheckboxContainers });

    // RECORRER LAS OPCIONES EN LA CONFIGURACION
    options.forEach(({ vectorGroupItemCheck, type }) => {
        // MAPEAMOS Y CREAMOS EN CADA VUELTA UN OBJETO QUE GUARDE LOS ELEMENTOS CONTENEDORES DE CADA GRUPO DE CHECKSBOX
        const containerMap: Record<TOptionTypeGroup, HTMLElement | null> = {
            service: $GROUP_SPECIALITY_CHECKS,
            context: $GROUP_CONTEXT_CHECKS,
            day: $GROUP_DAYS_CHECKS,
            hour: $GROUP_HOUR_CHECKS
        };

        // REFERENCIA DEL CONTENEDOR PRINCIPAL QUE CONTENGA LOS GRUPOS POR EL TIPO
        const $CONTAINER: HTMLElement | null = containerMap[type];

        //LLAMAR A FUNCION DE CREACION DE CHECKS EN CADA VUELTA DEL BUCLE
        optionsChecksForm({ vectorGroupItemCheck, type, container: $CONTAINER });
    });
};

export default createGroupCheckBoxes;