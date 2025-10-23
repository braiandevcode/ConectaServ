import type { JSX } from 'react';
import ModalMessage from './ModalMessage';
import { FaCheckCircle } from 'react-icons/fa';

// MODAL SATISFACTORIO
const ModalSuccess = (): JSX.Element => {
  return (
    <>
      <ModalMessage iconBaseProps={{ color: 'green', size:80 }} iconReact={FaCheckCircle} />
    </>
  );
};

export default ModalSuccess;
