import { FaArrowAltCircleRight } from 'react-icons/fa';
import Button from '../../../../../Button';

// CSS
import './BtnNext.css';
import type { iBtnNext } from '../../../../../../interfaces/iBtnNext';

// BOTON DE SIGUIENTE
const BtnNext = ({ handleNext, variant, text, type, disabled, ...props }: iBtnNext) => {
  return (
    <Button onClick={handleNext} type={'button'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...props}>
      <span>{text}</span>
      {<FaArrowAltCircleRight size={20} />}
    </Button>
  );
};
export default BtnNext;
