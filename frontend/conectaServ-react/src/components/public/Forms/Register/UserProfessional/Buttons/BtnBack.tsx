import { FaArrowAltCircleLeft } from 'react-icons/fa';
import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import type { iBtns } from '../../../../../../interfaces/iBtns';
import Button from '../../../../../Button';

// CSS
import './BtnBack.css';

// BOTON DE REGRESO
const BtnBack = ({ variant, type, disabled, ...rest }: iBtns) => {
  const { step, handleClickPrev } = useRegisterPro();
  return (
    <>
      {step > 1 && (
        <div className='c-flex c-flex-items-center'>
          <Button type='button' className='register__arrow-left c-flex c-flex-items-center cursor-pointer' onClick={handleClickPrev} {...rest}>
            {<FaArrowAltCircleLeft />}
          </Button>
        </div>
      )}
    </>
  );
};
export default BtnBack;
