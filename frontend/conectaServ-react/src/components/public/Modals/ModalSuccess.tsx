import type { JSX } from 'react';
import ModalMessage from './ModalMessage';
import { FaCheckDouble } from 'react-icons/fa';

// MODAL SATISFACTORIO
const ModalSuccess = (): JSX.Element => {
  return (
    <>
      <ModalMessage iconBaseProps={{ color: 'green', size:120 }} iconReact={FaCheckDouble} />
    </>
  );
};

export default ModalSuccess;
