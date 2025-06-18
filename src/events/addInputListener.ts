
import { iListenerChangeOrInput } from "../interfaces/interfaces";

const addInputListener = ({ element, callback }:iListenerChangeOrInput): void => {
  if (!element) return; //SI EL ELEMENTO NO EXISTE

  // VARIABLE QUE VERIFICA EL TIPO DE EVENTO
  const eventType = element instanceof HTMLSelectElement || (element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio' || element.type === 'file'))
      ? 'change'
      : 'input';
    element.addEventListener(eventType, callback);  // EJECUTA EL LISTENER SEGUN EL TIPO
};

export default addInputListener;
