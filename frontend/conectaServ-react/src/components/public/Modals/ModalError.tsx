import { useEffect } from 'react';
import ModalMessage from './ModalMessage';
import { RiAlertFill } from 'react-icons/ri';
import useGlobalModal from '../../../hooks/useGlobalModal';

// MODAL ERROR
const ModalError = () => {
  const { closeGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXT DE MODAL GLOBAL

  // EFECTO CON TIMMER PARA CERRAR AUTOMATICAMENTE MODAL
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    // SI HAY UNA CALLBACK GUARDADA UNA ACCION DE REDIRECCION PENDIENTE
    //ACTIVAR TIMMER
    timerId = setTimeout(() => {
      closeGlobalModal(); // EJECUTAR CALLBACK QUE TIENE GUARDADO AL CERRAR MODAL
    }, 6000);

    // CLEAN UP(FUNCION PARA LIMPIAR TIMMER)
    return () => {
      // SI HAY UN TIMMER
      if (timerId) {
        clearTimeout(timerId); //LIMPIAR
      }
    };
  }, [closeGlobalModal]); // DEPENDENCIAS

  return (
    <>
      <ModalMessage oncloseModal={closeGlobalModal} iconBaseProps={{ color: '#d49f0dff', size: 120 }} iconReact={RiAlertFill} />
    </>
  );
};

export default ModalError;
