import Button from '../../../../Button';
import type { iBtnSendCode } from '../../../../../interfaces/iBtnSendCode';

// CSS
import './BtnSendCode.css';
import useFormVerifyEmailCode from '../../../../../hooks/useFormVerifyEmailCode';
import { RiMailSendLine } from 'react-icons/ri';

// BOTON PARA ENVIAR CODIGO DE VERIFICACION ==> BOTON DENOMINADO INTELIGENTE
const BtnSendCode = ({ handleSend, text, formState, ...props }: iBtnSendCode) => {
  const { isCodeSent, isSendingCode, isSuccefullyVerified } = useFormVerifyEmailCode();
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
      <Button type='button' variant='btn btn__info' onClick={handleSend} disabled={isDisabled} {...props}>
        <RiMailSendLine size={20} />
        <span>{text}</span>
      </Button>
    </>
  );
};
export default BtnSendCode;
