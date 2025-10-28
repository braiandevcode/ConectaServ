import { MdClose } from 'react-icons/md';
import { type JSX } from 'react';
import Button from '../../../Button';

// CSS
import './BtnClose.css';
import type { iBtnCloseModal } from '../../../../interfaces/iBtnCloseModal';
// BOTON PARA CERRAR CUALQUIER MODAL
const BtnClose = ({ variant= 'btn btn__ghost', className, onCloseModal }: iBtnCloseModal): JSX.Element => {
  return (
    <>
      <Button type='button' aria-label='Cerrar Modal' title='Cerrar' className={className ? `${className} ${variant}` : variant} onClick={onCloseModal}>
        <MdClose size={25} />
      </Button>
    </>
  );
};

export default BtnClose;
