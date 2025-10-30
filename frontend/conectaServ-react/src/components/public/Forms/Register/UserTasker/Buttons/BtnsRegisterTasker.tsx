import useRegisterTasker from '../../../../../../hooks/useRegisterTasker';
import BtnNext from './BtnNext';
import useSendData from '../../../../../../hooks/useSendDataRegister';
import useRegister from '../../../../../../hooks/useRegister';
import LoaderBtn from '../../../../../LoaderBtn';
import BtnSubmit from '../../../../../BtnSubmit';
import useValidateStep from '../../../../../../hooks/useValidateStep';

// BOTONES PARA RENDERIZAR EN REGISTRO DE PROFESIONAL
const BtnsRegisterTasker = () => {
  const { isLastStep } = useValidateStep(); //HOOK PARA VALIDAR PASO
  const { isSending } = useRegister(); //HOOK QUE USA CONTEXTO DE REGISTRO GENERAL
  const { isStepValid, handleClickNext } = useRegisterTasker(); //HOOK QUE USA CONTEXTO DE REGISTRO PROFESIONAL
  const { isReady } = useSendData(); //HOOK PARA ENVIO DE DATOS DE REGISTRO

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
            handleNext={handleClickNext}
            variant='btn container-btn__next'
            disabled={!isStepValid || !isReady}
            text={isReady ? 'Siguiente' : 'Cargando datos...'}
          />
        )}
      </div>
    </>
  );
};

export default BtnsRegisterTasker;
