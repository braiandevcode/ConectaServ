import { TOptionsCheckForm, TOptionTypeGroup } from "../types/types";
import convertTextOfTypes from "../utils/convertTextOfTypes.js";
import clearElementChild from "./clearElementChild.js";

const optionsChecksForm = ({ vectorGroupItemCheck, type, container }: TOptionsCheckForm): HTMLElement | null => {
    const D: Document = document;
    if (!container) return null;

    clearElementChild({ elements: [container] }) //REUTILIZO FUNCION PARA LIMPIAR

    const $FRAGMENT: DocumentFragment = D.createDocumentFragment();

    // MAPEAR ICONOS POR SU TIPO
    const iconByType: Record<TOptionTypeGroup, string> = {
        service: 'fa-tools',
        context: 'fa-building',
        day: 'fa-calendar-day',
        hour: 'fa-clock',
    };

    // HEADER DEL GRUPO DE CHECKBOXES (SOLO UNA VEZ)
    const $DIV_HEADER: HTMLDivElement = D.createElement('div');
    $DIV_HEADER.classList.add('c-flex', 'c-flex-items-center', 'gap-1', 'form-professional-groupSpeciality__context-header');

    const $ICON: HTMLElement = D.createElement('i');

    const iconName = iconByType[type as TOptionTypeGroup];

    $ICON.classList.add('fas', iconName);

    const $H4: HTMLHeadingElement = D.createElement('h4');
    $H4.classList.add('c-flex', 'c-flex-items-center', 'c-flex-justify-center', 'gap-1/2', 'form-professional-groupSpeciality__label');

    const $SPAN_TITLE: HTMLSpanElement = D.createElement('span');
    $SPAN_TITLE.textContent = convertTextOfTypes({ textType: type });

    const $SPAN_REQUIRED: HTMLSpanElement = D.createElement('span');
    $SPAN_REQUIRED.classList.add('span-required');
    $SPAN_REQUIRED.textContent = '*';

    $H4.append($SPAN_TITLE, $SPAN_REQUIRED);
    $DIV_HEADER.append($ICON, $H4);
    $FRAGMENT.append($DIV_HEADER); // GUARDAMOS HEADER EN FRAGMENT

    // RECORRER VECTOR Y CREAR ELEMENTOS
    vectorGroupItemCheck.forEach((el, i) => {
        const $DIV_SERVICE: HTMLDivElement = D.createElement('div');
        const $INPUT_CHECK: HTMLInputElement = D.createElement('input');
        const $LABEL_CHECK: HTMLLabelElement = D.createElement('label');

        // CREACION DE CHECKS DE CADA GRUPO
        $DIV_SERVICE.classList.add('c-flex', 'c-flex-items-center', 'gap-1\/2', `${type}`);

        $INPUT_CHECK.setAttribute('type', 'checkbox');
        $INPUT_CHECK.classList.add('cursor-pointer');
        $INPUT_CHECK.setAttribute('name', `${type}[]`);
        $INPUT_CHECK.setAttribute('id', `${type}-${i}`);
        $INPUT_CHECK.setAttribute('value', `${el.value}`);
        $INPUT_CHECK.classList.add('c-flex', 'c-flex-justify-center', 'c-flex-items-center', `${type}__input`);

        $LABEL_CHECK.classList.add(`${type}__label`);
        $LABEL_CHECK.setAttribute('for', `${type}-${i}`);
        $LABEL_CHECK.textContent = el.label;

        $DIV_SERVICE.append($INPUT_CHECK, $LABEL_CHECK);
        $FRAGMENT.appendChild($DIV_SERVICE); // GUARDAMOS EN FRAGMENT
    });

    container?.append($FRAGMENT);

    return container;
}

export default optionsChecksForm;