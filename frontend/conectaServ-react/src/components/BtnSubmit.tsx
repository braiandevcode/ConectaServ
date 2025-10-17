import type { iBtns } from '../interfaces/iBtns';
import ButtonBase from './ButtonBase';

// BOTON PARA SUBMIT GENERAL
const BtnSubmit = ({ children, variant, type, disabled, ...rest}: iBtns) => {
  return (
    <ButtonBase type={'submit'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...rest}>
      {children}
    </ButtonBase>
  );
};
export default BtnSubmit;
