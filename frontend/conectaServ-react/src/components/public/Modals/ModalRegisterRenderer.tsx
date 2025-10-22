import type { JSX } from "react";
import { EModalRegistersType } from "../../../types/enumModalRegistersTypes";
import useRegisterModal from "../../../hooks/useRegisterModal";

// CSS
import './ModalRegisterRenderer.css';
import ModalWrapper from "./ModalWrapper";
import type { TRegisterModalComponents } from "../../../types/typesRegisterModalComponents";
import ModalVerifyEmail from "./ModalVerifyEmail";

// DEFINE QUE MODAL RENDERIZAR
const ModalRegisterRenderer = (): JSX.Element | null => {
  const  { closeRegisterModal, currentRegisterModal, isRegisterModalOpen } = useRegisterModal()

  // MAPEO DE MODALES A MOSTRAR/OCULTAR
  const MODAL_COMPONENTS: TRegisterModalComponents ={
    [EModalRegistersType.MODAL_VERIFY]: ModalVerifyEmail,
  };

  if (!isRegisterModalOpen|| !currentRegisterModal) return null;

  const ModalComponent = MODAL_COMPONENTS[currentRegisterModal];

  return (
    <ModalWrapper className={`${!isRegisterModalOpen ? 'modal modal--hiden' : 'modal'}`} ariaHidden={!isRegisterModalOpen} onClose={closeRegisterModal}>
      <ModalComponent />
    </ModalWrapper>
  );
};

export default ModalRegisterRenderer;