import ModalMessage from './ModalMessage';
import { BiSolidErrorAlt } from 'react-icons/bi';

// MODAL SATISFACTORIO
const ModalError = () => {
  return (
    <>
      <ModalMessage  iconBaseProps={{ color: 'red', size:20 }} iconReact={BiSolidErrorAlt} />
    </>
  );
};

export default ModalError;