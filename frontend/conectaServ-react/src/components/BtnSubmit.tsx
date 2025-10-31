import type { iBtns } from '../interfaces/iBtns';
import Button from './Button';

// BOTON PARA SUBMIT GENERAL
const BtnSubmit = ({ variant, disabled, text, IconReact, iconProps, ...rest }: iBtns) => {
  return (
    <Button type={'submit'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...rest}>
      {IconReact && <IconReact {...iconProps} />}
      <span>{text}</span>
    </Button>
  );
};
export default BtnSubmit;
