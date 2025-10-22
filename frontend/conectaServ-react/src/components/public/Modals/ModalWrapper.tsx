import { type FC, type ReactNode } from 'react';
import type { iModalWrapperProps } from '../../../interfaces/iModalWrapperProps';

// CSS
import './ModalWrapper.css';

// ES LA PLANTILLA BASE PATRA TODOS LOS MODALES
const ModalWrapper: FC<iModalWrapperProps> = ({ children, className, ariaHidden}): ReactNode => {
  return (
    <>
      <div className='container-modal c-flex c-flex-items-center c-flex-justify-center position-fixed inset-0'>
        <div className={className} aria-hidden={ariaHidden}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
