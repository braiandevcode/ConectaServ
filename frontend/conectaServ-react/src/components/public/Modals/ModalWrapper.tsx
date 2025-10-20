import { useEffect, type FC, type ReactNode } from 'react';
import Modal from 'react-modal';
import type { iModalWrapperProps } from '../../../interfaces/iModalWrapperProps';

Modal.setAppElement('#root'); // SOLO UNA VEZ EN TODO EL PROYECTO

// ES LA PLANTILLA BASE PATRA TODOS LOS MODALES
const ModalWrapper: FC<iModalWrapperProps> = ({ isOpen, children, className }): ReactNode => {

  useEffect(() => {
    console.log('Me Monte');
  }, [])
  return (
    <>
      <Modal className={className} isOpen={isOpen}>
        {children}
      </Modal>
    </>
  );
};

export default ModalWrapper;
