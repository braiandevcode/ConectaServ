import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import BtnNext from './BtnNext';
import useSendData from '../../../../../../hooks/useSendData';
import useRegister from '../../../../../../hooks/useRegister';
import LoaderBtn from '../../../../../LoaderBtn';
import BtnSubmit from '../../../../../BtnSubmit';

// BOTONES PARA RENDERIZAR EN REGISTRO DE PROFESIONAL
const BtnsRegisterPro = () => {
  const { isSending } = useRegister();
  const { isStepValid, step, hasBudge } = useRegisterPro(); //HOOK QUE USA CONTEXTO DE REGISTRO PROFESIONAL
  const { isReady } = useSendData();
  // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isLastStep: boolean = (step === 3 && !hasBudge) || (hasBudge && step === 4); //EL ULTIMO PASO;
  return (
    <>
      <div className='c-flex c-flex-justify-end'>
        {isLastStep ? (
          isSending ? (
            <LoaderBtn />
            ) : (
            <BtnSubmit
              variant='btn btn__submit'
              disabled={!isStepValid || !isReady}
              text={isReady ? 'Enviar' : 'Cargando datos...'}
            />
          )
        ) : (
          <BtnNext
            variant='btn container-btn__next'
            disabled={!isStepValid || !isReady}
            text={isReady ? 'Siguiente' : 'Cargando datos...'}
          />
        )}
      </div>
    </>
  );
};

export default BtnsRegisterPro;
