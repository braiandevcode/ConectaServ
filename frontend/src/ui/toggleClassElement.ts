import { iToggleClassElement } from "../interfaces/interfaces";

// AGREGAR O QUITAR CLASE DEPENDIENDO DEL BOOLEANO "isRemove"
const toggleClassElement = ({ container, className, isRemoveClass }: iToggleClassElement) => {
    // SI REMOVER O AÑADIR LA CLASE
    isRemoveClass ? container?.classList.remove(...className) : container?.classList.add(...className);
}
export default toggleClassElement;