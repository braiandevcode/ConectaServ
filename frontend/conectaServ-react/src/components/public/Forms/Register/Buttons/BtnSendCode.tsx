import Button from '../../../../Button';
import type { iBtnSendCode } from '../../../../../interfaces/iBtnSendCode';

// CSS
import './BtnSendCode.css';
import useFormVerifyEmailCode from '../../../../../hooks/useFormVerifyEmailCode';
import { RiMailSendLine } from 'react-icons/ri';

// BOTON PARA ENVIAR CODIGO DE VERIFICACION ==> BOTON DENOMINADO INTELIGENTE
const BtnSendCode = ({ sendCode, emailUser, text, formState }: iBtnSendCode) => {
  const { isCodeSent, isSendingCode, isSuccefullyVerified } = useFormVerifyEmailCode();

  // CREO FUNCION ASINCRONA PARA ENVIAR CODIGO AL USUARIO
  const send = async (): Promise<void> => {
    await sendCode({ emailUser });
  };

  // ESTA DESHABILITADO SI:
  /*
    - NO ES VALIDO EL CAMPO DEL EMAIL O
    - SE ESTA ENVIANDO EL CODIGO O
    - SE ENVIO EL CODIGO O
    - SI LA VERIFICACION FUE SATISFACTORIA
  */
  const isDisabled: boolean = !formState.email.isValid || isSendingCode || isCodeSent || isSuccefullyVerified;

  return (
    <>
      <Button type='button' variant='btn btn__info' onClick={send} disabled={isDisabled}>
        <RiMailSendLine size={20} />
        <span>{text}</span>
      </Button>
    </>
  );
};
export default BtnSendCode;
