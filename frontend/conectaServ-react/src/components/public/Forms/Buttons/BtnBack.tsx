import useRegisterPro from '../../../../hooks/useRegisterPro';
import type { iBtns } from '../../../../interfaces/iBtns';
import ButtonBase from '../../../ButtonBase';

// BOTON DE REGRESO
const BtnBack = ({ children, variant, type, disabled, ...rest }: iBtns) => {
  const { step, handleClickPrev } = useRegisterPro();
  return (
    <>
      {step > 1 && (
        <ButtonBase type='button' className='c-flex c-flex-self-start c-flex-items-center gap-1/2 cursor-pointer register-userProfessional__arrow-left' onClick={handleClickPrev} {...rest}>
          <i className='to-left fas fa-arrow-circle-left'></i>
        </ButtonBase>
      )}
    </>
  );
};
export default BtnBack;
