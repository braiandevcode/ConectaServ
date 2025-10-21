import { EModalType } from '../../../types/enumModalTypes';
import ModalWrapper from './ModalWrapper';
// import ModalLogin from './ModalLogin';
import ModalRole from './ModalRole';
import ModalVerifyEmail from './ModalVerifyEmail';
import './ModalRenderer.css';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import type { iModalsComponents } from '../../../types/typesModalComponents';
import { type JSX } from 'react';
import useModal from '../../../hooks/useModal';


// DEFINE QUE MODAL RENDERIZAR
const ModalRenderer = (): JSX.Element | null => {
  const { currentModal, isModalOpen, closeModal } = useModal(); //HOOK NIVEL MAIN
  // const [modal, setModal] = useState<>(null);

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

  return (
    <ModalWrapper className={`${!isModalOpen ? 'modal modal--hiden' : 'modal'}`} onClose={closeModal}>
      <ModalComponent />
    </ModalWrapper>
  );
};

export default ModalRenderer;
