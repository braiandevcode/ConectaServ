import { MdClose } from 'react-icons/md';
import { type JSX } from 'react';
import Button from '../../../Button';

// CSS
import './BtnClose.css';
import type { iBtnCloseModal } from '../../../../interfaces/iBtnCloseModal';
// BOTON PARA CERRAR CUALQUIER MODAL
const BtnClose = ({ className, onCloseModal }: iBtnCloseModal): JSX.Element => {
  return (
    <>
      <Button type='button' aria-label='Cerrar Modal' variant='btn btn__ghost' title='Cerrar' className={`btn__closeModal position-fixed ${className}`} onClick={onCloseModal}>
        <MdClose size={35} />
      </Button>
    </>
  );
};

export default BtnClose;
