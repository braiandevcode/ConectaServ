import { MdClose } from 'react-icons/md';
import './BtnClose.css';
import type { JSX } from 'react';
import useMain from '../../../../hooks/useMain';
import ButtonBase from '../../../ButtonBase';

// BOTON PARA CERRAR CUALQUIER MODAL
const BtnClose = (): JSX.Element => {
  const { closeModal} = useMain();

  return (
    <>
      <ButtonBase type='button' onClick={closeModal} variant='btn btn__close'>
        <MdClose size={20} />
      </ButtonBase>
    </>
  );
};

export default BtnClose;
