import { FaArrowAltCircleRight } from 'react-icons/fa';
import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import type { iBtns } from '../../../../../../interfaces/iBtns';
import Button from '../../../../../Button';

// BOTON DE SIGUIENTE
const BtnNext = ({ variant, text, type, disabled, ...rest }: iBtns) => {
  const { handleClickNext } = useRegisterPro();
  return (
    <Button onClick={handleClickNext} type={'button'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...rest}>
      <span>{text}</span>
      {<FaArrowAltCircleRight size={20} />}
    </Button>
  );
};
export default BtnNext;
