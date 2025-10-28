import ModalWrapper from './ModalWrapper';
// import ModalLogin from './ModalLogin';
import ModalRole from './ModalRole';
import './ModalGlobalRenderer.css';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import { type JSX } from 'react';
import type { TGlobalModalComponents } from '../../../types/typeGlobalModalComponents';
import { EModalGlobalType } from '../../../types/enumGlobalModalType';
import useGlobalModal from '../../../hooks/useGlobalModal';
import ModalIdentifyEmail from './ModalIdentifyEmail';
import ModalLogin from './ModalLogin';



// DEFINE QUE MODAL RENDERIZAR EN CONTEXTO GLOBAL
const ModalGlobalRenderer = (): JSX.Element | null => {
  const { currentGlobalModal, isGlobalModalOpen, closeGlobalModal } = useGlobalModal(); //HOOK NIVEL MAIN

  // MAPEO DE MODALES A MOSTRAR/OCULTAR
  const MODAL_COMPONENTS:TGlobalModalComponents = {
    [EModalGlobalType.MODAL_ROLE]: ModalRole,
    [EModalGlobalType.MODAL_LOGIN]: ModalLogin,
    [EModalGlobalType.MODAL_IDENTIFY_EMAIL]: ModalIdentifyEmail,
    [EModalGlobalType.MODAL_SUCCESS]: ModalSuccess,
    [EModalGlobalType.MODAL_ERROR]: ModalError
  };

  if (!isGlobalModalOpen || !currentGlobalModal) return null;

  const ModalComponent = MODAL_COMPONENTS[currentGlobalModal];

  return (
    <ModalWrapper className={`${!isGlobalModalOpen ? 'modal modal--hiden' : 'modal'}`} ariaHidden={!isGlobalModalOpen} onClose={closeGlobalModal}>
      <ModalComponent oncloseModal={closeGlobalModal} />
    </ModalWrapper>
  );
};

export default ModalGlobalRenderer;
