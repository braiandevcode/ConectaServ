import { useEffect, type ReactNode } from 'react';
import type { iModalWrapperProps } from '../../../interfaces/iModalWrapperProps';

// CSS
import './ModalWrapper.css';
import BtnClose from './Buttons/BtnClose';
import useGlobalModal from '../../../hooks/useGlobalModal';

// ES LA PLANTILLA BASE PATRA TODOS LOS MODALES
const ModalWrapper = ({ children, className, ariaHidden }: iModalWrapperProps): ReactNode => {
  const { closeGlobalModal } = useGlobalModal();

  // PARA QUITAR SCROLL AL ABRIR MODAL
  useEffect(() => {
    // AGREGAR CLASE AL BODY PARA BLOQUEAR SCROLL
    document.body.classList.add('no-scroll');

    // REMOVER CLASE AL CERRAR MODAL
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <>
      <BtnClose onCloseModal={closeGlobalModal} variant='btn btn__ghost' className='modalLoginHeader__btnClose' />
      <div className='container-modal c-flex c-flex-items-center c-flex-justify-center position-fixed inset-0'>
        <div className={className} aria-hidden={ariaHidden}>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapper;
