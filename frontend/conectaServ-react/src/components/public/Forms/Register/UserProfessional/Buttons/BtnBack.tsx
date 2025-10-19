import { FaArrowAltCircleLeft } from 'react-icons/fa';
import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import type { iBtns } from '../../../../../../interfaces/iBtns';
import Button from '../../../../../Button';

// BOTON DE REGRESO
const BtnBack = ({ variant, type, disabled, ...rest }: iBtns) => {
  const { step, handleClickPrev } = useRegisterPro();
  return (
    <>
      {step > 1 && (
        <Button type='button' className='c-flex c-flex-self-start c-flex-items-center gap-1/2 cursor-pointer register__arrow-left' variant='btn' onClick={handleClickPrev} {...rest}>
          {<FaArrowAltCircleLeft />}
        </Button>
      )}
    </>
  );
};
export default BtnBack;
