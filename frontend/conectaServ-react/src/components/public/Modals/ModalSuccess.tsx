import ModalMessage from './ModalMessage';
import { MdOutlineMailLock } from 'react-icons/md';

// MODAL SATISFACTORIO
const ModalSuccess = () => {
  return (
    <>
      <ModalMessage title='Registro con Exito!' subTitle='Se ha registrado satisfactoriamente' message='Este es un mensaje de exito de ejemplo, puedes cerrar.' iconReact={MdOutlineMailLock} />
    </>
  );
};

export default ModalSuccess;
