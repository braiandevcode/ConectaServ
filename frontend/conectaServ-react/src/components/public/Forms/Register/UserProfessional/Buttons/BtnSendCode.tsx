import { FiSend } from 'react-icons/fi';
import Button from '../../../../../Button';
import type { iBtnSendCode } from '../../../../../../interfaces/iBtnSendCode';

// CSS
import './BtnSendCode.css';
// BOTON PARA ENVIAR CODIGO DE VERIFICACION
const BtnSendCode = ({ sendCode, emailUser, text, formState}: iBtnSendCode) => {
  const send = async (): Promise<void> =>{
    await sendCode({ emailUser });
  }
  return (
    <>
      <Button type='button' variant='btn btn__info' onClick={send} disabled={!formState.email.isValid}>
        <span>{text}</span>
        <FiSend size={20} />
      </Button>
    </>
  );
};
export default BtnSendCode;
