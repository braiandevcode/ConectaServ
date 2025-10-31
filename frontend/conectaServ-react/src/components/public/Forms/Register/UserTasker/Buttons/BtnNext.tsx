import { FaArrowAltCircleRight } from 'react-icons/fa';
import Button from '../../../../../Button';

// CSS
import './BtnNext.css';
import type { iBtnNext } from '../../../../../../interfaces/iBtnNext';

// BOTON DE SIGUIENTE
const BtnNext = ({ handleNext, variant, text, type, disabled, className,...props }: iBtnNext) => {
  return (
    <Button onClick={handleNext} type={'button'} variant='btn btn__info' disabled={disabled} className={className} {...props}>
      <span>{text}</span>
      {<FaArrowAltCircleRight size={20} />}
    </Button>
  );
};
export default BtnNext;
