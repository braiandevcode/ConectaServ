import { FaArrowAltCircleLeft } from 'react-icons/fa';
import Button from '../../../../../Button';

// CSS
import './BtnBack.css';
import type { iBtnBack } from '../../../../../../interfaces/iBtnBack';

// BOTON DE REGRESO "TONTO"
const BtnBack = ({ handleBtnBack, ...props }: iBtnBack) => {
  return (
    <>
      <div className='c-flex c-flex-items-center'>
        <Button type='button' className='register__arrow-left c-flex c-flex-items-center cursor-pointer' onClick={handleBtnBack} {...props}>
          {<FaArrowAltCircleLeft />}
        </Button>
      </div>
    </>
  );
};
export default BtnBack;
