import { useEffect, type JSX } from 'react';
import ModalMessage from './ModalMessage';
import { FaCheckCircle } from 'react-icons/fa';
import useGlobalModal from '../../../hooks/useGlobalModal';

// MODAL SATISFACTORIO
const ModalSuccess = (): JSX.Element => {
  const { onCloseCallback, closeGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXT DE MODAL GLOBAL

  // EFECTO CON TIMMER PARA CERRAR AUTOMATICAMENTE MODAL
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    // SI HAY UNA CALLBACK GUARDADA UNA ACCION DE REDIRECCION PENDIENTE
    if (onCloseCallback) {
      //ACTIVAR TIMMER
      timerId = setTimeout(() => {
        closeGlobalModal(); // EJECUTAR CALLBACK QUE TIENE GUARDADO AL CERRAR MODAL
      }, 4000);

      // CLEAN UP(FUNCION PARA LIMPIAR TIMMER)
      return () => {
        // SI HAY UN TIMMER
        if (timerId) {
          clearTimeout(timerId); //LIMPIAR
        }
      };
    }
  }, [onCloseCallback, closeGlobalModal]); // DEPENDENCIAS

  return (
    <>
      <ModalMessage oncloseModal={closeGlobalModal} iconBaseProps={{ color: 'green', size: 80 }} iconReact={FaCheckCircle} />
    </>
  );
};

export default ModalSuccess;
