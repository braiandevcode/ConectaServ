import { type FC, type ReactNode } from 'react';
import type { iModalWrapperProps } from '../../../interfaces/iModalWrapperProps';
import useModal from '../../../hooks/useModal';

// CSS
import './ModalWrapper.css';

// ES LA PLANTILLA BASE PATRA TODOS LOS MODALES
const ModalWrapper: FC<iModalWrapperProps> = ({ children, className }): ReactNode => {
  const { isModalOpen } = useModal(); //HOOK NIVEL MAIN
  return (
    <>
      <div className='container-modal c-flex c-flex-items-center c-flex-justify-center position-fixed inset-0'>
        <div className={className} aria-hidden={!isModalOpen}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
