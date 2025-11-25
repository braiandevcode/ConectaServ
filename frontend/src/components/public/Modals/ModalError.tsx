import { useEffect } from 'react';
import ModalMessage from './ModalMessage';
import { RiAlertFill } from 'react-icons/ri';
import useGlobalModal from '../../../hooks/useGlobalModal';

// CSS
import './ModalError.css';

// MODAL ERROR
const ModalError = () => {
  const { closeGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXT DE MODAL GLOBAL

  // EFECTO CON TIMMER PARA CERRAR AUTOMATICAMENTE MODAL
  useEffect(() => {
    // SI HAY UNA CALLBACK GUARDADA UNA ACCION DE REDIRECCION PENDIENTE
    //ACTIVAR TIMMER
    const timerId = setTimeout(() => {
      closeGlobalModal(); // EJECUTAR CALLBACK QUE TIENE GUARDADO AL CERRAR MODAL
    }, 2500);

    // CLEAN UP(FUNCION PARA LIMPIAR TIMMER)
    return () => {
      // SI HAY UN TIMMER
      clearTimeout(timerId); //LIMPIAR
    };
  }, [closeGlobalModal]); // DEPENDENCIAS

  return (
    <>
      <ModalMessage oncloseModal={closeGlobalModal} iconBaseProps={{ color: '#d49f0dff', size: 120 }} iconReact={RiAlertFill} />
    </>
  );
};

export default ModalError;
