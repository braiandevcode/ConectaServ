import type { FC, ReactNode } from 'react';
import Modal from 'react-modal';
import type { iModalWrapperProps } from '../../../interfaces/iModalWrapperProps';

Modal.setAppElement('#root'); // SOLO UNA VEZ EN TODO EL PROYECTO

// ES LA PLANTILLA BASE PATRA TODOS LOS MODALES
const ModalWrapper: FC<iModalWrapperProps> = ({ isOpen, onClose, children, className }): ReactNode => {
  return (
    <>
      <Modal className={className} isOpen={isOpen} onRequestClose={onClose}>
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
