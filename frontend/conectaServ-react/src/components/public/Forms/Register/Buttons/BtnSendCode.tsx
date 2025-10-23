import Button from '../../../../Button';
import type { iBtnSendCode } from '../../../../../interfaces/iBtnSendCode';

// CSS
import './BtnSendCode.css';
import useFormVerifyEmailCode from '../../../../../hooks/useFormVerifyEmailCode';
import { RiMailSendLine } from 'react-icons/ri';

// BOTON PARA ENVIAR CODIGO DE VERIFICACION
const BtnSendCode = ({ sendCode, emailUser, text, formState }: iBtnSendCode) => {
  const { isCodeSent, isCodeVerified,isSendingCode, isSuccefullyVerified } = useFormVerifyEmailCode();
  
  // CREO FUNCION ASINCRONA PARA ENVIAR CODIGO AL USUARIO
  const send = async (): Promise<void> => {
    await sendCode({ emailUser });
  };

  // SI LA VERIFICACION FUE COMPLETADA Y SATISFACTORIA
  const isVerifyComplete: boolean = isCodeSent && isCodeVerified && isSuccefullyVerified;

  const isDisabled:boolean = !formState.email.isValid || isSendingCode || isCodeSent || isVerifyComplete;
  return (
    <>
      <Button type='button' variant='btn btn__info' onClick={send} disabled={isDisabled}>
        <RiMailSendLine size={20}/>
        <span>{text}</span>
      </Button>
    </>
  );
};
export default BtnSendCode;
