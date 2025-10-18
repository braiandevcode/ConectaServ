import { MdClose } from 'react-icons/md';
import './BtnClose.css';
import type { JSX } from 'react';
import Button from '../../../Button';
import type { iBtns } from '../../../../interfaces/iBtns';
import useMain from '../../../../hooks/useMain';

// BOTON PARA CERRAR CUALQUIER MODAL
const BtnClose = ({ variant= 'btn btn__close', className }: iBtns): JSX.Element => {
  const { closeModal } = useMain() // HOOK NIVEL MAIN
  return (
    <>
      <Button type='button' aria-label='Cerrar Modal' title='Cerrar' className={className ? `${className} ${variant}` : variant} onClick={closeModal}>
        <MdClose size={20} />
      </Button>
    </>
  );
};

export default BtnClose;
