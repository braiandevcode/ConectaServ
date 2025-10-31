import Button from '../../../../Button';
import type { iBtnSendCode } from '../../../../../interfaces/iBtnSendCode';

// CSS
import './BtnSendCode.css';

// BOTON PARA ENVIAR CODIGO DE VERIFICACION ==> BOTON DENOMINADO INTELIGENTE
const BtnSendCode = ({ handleSend, text, IconReact, iconProps, className, ...props }: iBtnSendCode) => {
  return (
    <>
      <Button type='button' variant='btn btn__info' className={className} onClick={handleSend} {...props}>
        {IconReact && <IconReact {...iconProps }/>}
        <span>{text}</span>
      </Button>
    </>
  );
};
export default BtnSendCode;
