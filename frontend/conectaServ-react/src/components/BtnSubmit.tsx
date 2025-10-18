import { MdSend } from 'react-icons/md';
import type { iBtns } from '../interfaces/iBtns';
import Button from './Button';


// BOTON PARA SUBMIT GENERAL
const BtnSubmit = ({ variant, disabled, text, ...rest }: iBtns) => {
  return (
    <Button type={'submit'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...rest}>
      {<MdSend />}
      <span>{text}</span>
    </Button>
  );
};
export default BtnSubmit;
