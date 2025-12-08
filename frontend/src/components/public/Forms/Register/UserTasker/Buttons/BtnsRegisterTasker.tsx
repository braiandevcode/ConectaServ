import useRegisterTasker from '../../../../../../hooks/useRegisterTasker';
import BtnNext from './BtnNext';
import LoaderBtn from '../../../../../LoaderBtn';
import BtnSubmit from '../../../../../BtnSubmit';
import useValidateStep from '../../../../../../hooks/useValidateStep';
import { MdSend } from 'react-icons/md';
import useTasker from '../../../../../../hooks/useTasker';

// BOTONES PARA RENDERIZAR EN REGISTRO DE PROFESIONAL
const BtnsRegisterTasker = () => {
  const { isLastStep } = useValidateStep(); //HOOK PARA VALIDAR PASO
  const { isSending, isStepValid } = useTasker(); //HOOK QUE USA CONTEXTO DE REGISTRO GENERAL
  const { handleClickNext} = useRegisterTasker(); //HOOK QUE USA CONTEXTO DE REGISTRO PROFESIONAL

  return (
    <>
      <div className='c-flex c-flex-justify-end'>
        {isLastStep ? isSending ? <LoaderBtn /> : <BtnSubmit IconReact={MdSend} iconProps={{ size: 20 }} variant='btn btn__submit' disabled={!isStepValid} text={'Enviar' } /> : <BtnNext handleNext={handleClickNext} variant='btn container-btn__next' disabled={!isStepValid} text={ 'Siguiente'} />}
      </div>
    </>
  );
};

export default BtnsRegisterTasker;
