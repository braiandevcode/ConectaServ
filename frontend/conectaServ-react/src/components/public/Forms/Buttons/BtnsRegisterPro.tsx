import useRegisterPro from '../../../../hooks/useRegisterPro';
import BtnNext from './BtnNext';
import BtnSubmit from '../../../BtnSubmit';

const BtnsRegisterPro = () => {
  const { isStepValid, step, hasBudge } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL

  // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isLastStep: boolean = (step === 3 && !hasBudge) || (hasBudge && step === 4); //EL ULTIMO PASO;
  return (
    <>
      <div className='mb-2 c-flex c-flex-justify-end'>{isLastStep ? <BtnSubmit variant='btn container-btn__next' disabled={!isStepValid} text='Enviar' /> : <BtnNext variant='btn container-btn__next' disabled={!isStepValid}  text='Siguiente'/>}</div>
    </>
  );
};

export default BtnsRegisterPro;
