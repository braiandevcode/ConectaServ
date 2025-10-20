import useMain from '../../../hooks/useMain';
import { EModalType } from '../../../types/enumModalTypes';
import ModalWrapper from './ModalWrapper';
// import ModalLogin from './ModalLogin';
import ModalRole from './ModalRole';
import ModalVerifyEmail from './ModalVerifyEmail';
import './ModalRenderer.css';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import type { iModalsComponents } from '../../../types/typesModalComponents';
import { useEffect, type JSX } from 'react';


// AUNQUE TYPESCRIPT PUEDE INFERIR EL TIPO DE RETORNO (JSX.ELEMENT) DESDE REACT 18,
// SE UTILIZA LA ANOTACION EXPLICITA PARA MEJORAR LA LEGIBILIDAD
// Y LA CLARIDAD DE LA FIRMA DEL COMPONENTE.
// DEFINE QUE MODAL RENDERIZAR
const ModalRenderer = (): JSX.Element | null => {
  const { currentModal, isModalOpen, closeModal } = useMain(); //HOOK NIVEL MAIN

  // MAPEO DE MODALES A MOSTRAR/OCULTAR
  const MODAL_COMPONENTS:iModalsComponents = {
    [EModalType.MODAL_ROLE]: ModalRole,
    // [EModalType.MODAL_LOGIN]: ModalLogin,
    [EModalType.MODAL_VERIFY]: ModalVerifyEmail,
    [EModalType.MODAL_SUCCESS]: ModalSuccess,
    [EModalType.MODAL_ERROR]: ModalError
  };

  if (!isModalOpen || !currentModal) return null;

  const ModalComponent = MODAL_COMPONENTS[currentModal];
    useEffect(() => {
      console.log('Me Monte en RENDERER');
    }, [])

  return (
    <ModalWrapper className='modal' isOpen={isModalOpen} onClose={closeModal}>
      <ModalComponent />
    </ModalWrapper>
  );
};

export default ModalRenderer;
