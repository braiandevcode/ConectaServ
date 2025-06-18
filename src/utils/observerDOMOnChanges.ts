import { iOnchangeObserver } from "../interfaces/interfaces";

// OBSERVAR EVENTOS DE CAMBIOS EN EL DOM
const observeDOMChanges = ({ containerSelector, onChangeDOM }: iOnchangeObserver ): void => {
    // if(!containerSelector) return
    const $CONTAINER: HTMLElement | null = document.querySelector(containerSelector);
    if (!$CONTAINER) return;

    // API DEL NAVEGADOR QUE NOS PERMITE VIGILAR EL DOM
    const observer = new MutationObserver(() => {
        onChangeDOM();
    });

    // OBSERVA CAMBIOS EN HIJOS Y NODOS DEL ARBOL
    observer.observe($CONTAINER, {
        childList: true, //OBSERVA SI HAY ADICION O ELIMINACION EN LOS ELEMENTOS HIJOS DEL NODO(INCLUIDO LOS TEXTOS)
        subtree: true, // SI LOS CAMBIOS DEBN SER TAMBIEN OBSERVADOS EN LOS DESCENDIENTES
        attributes: true, //LOS CAMBIOS DE ATRIBUTO SON OBSERVADOS
        characterData: true
    });
}

export default observeDOMChanges;