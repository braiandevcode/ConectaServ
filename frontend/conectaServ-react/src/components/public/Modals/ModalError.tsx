import ModalMessage from './ModalMessage';
import { RiAlertFill } from 'react-icons/ri';

// MODAL SATISFACTORIO
const ModalError = () => {
  return (
    <>
      <ModalMessage iconBaseProps={{ color: '#d49f0dff', size:120 }} iconReact={RiAlertFill} />
    </>
  );
};

export default ModalError;