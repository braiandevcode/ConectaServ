import useMain from '../../../hooks/useMain';
import { EModalType } from '../../../types/enumModalTypes';
import ModalWrapper from './ModalWrapper';
// import ModalLogin from './ModalLogin';
import ModalRole from './ModalRole';
import ModalVerifyEmail from './ModalVerifyEmail';
import './Modal.css';

// DEFINE QUE MODAL RENDERIZAR
const ModalRenderer = () => {
  const { currentModal, isModalOpen, closeModal } = useMain(); //HOOK NIVEL MAIN

  // MAPEO DE MODALES A MOSTRAR/OCULTAR
  const MODAL_COMPONENTS = {
    [EModalType.MODAL_ROLE]: ModalRole,
    // [EModalType.MODAL_LOGIN]: ModalLogin,
    [EModalType.MODAL_VERIFY]: ModalVerifyEmail,
  };

  if (!isModalOpen || !currentModal) return null;

  const ModalComponent = MODAL_COMPONENTS[currentModal];

  return (
    <ModalWrapper className='modal' isOpen={isModalOpen} onClose={closeModal}>
      <ModalComponent />
    </ModalWrapper>
  );
};

export default ModalRenderer;
