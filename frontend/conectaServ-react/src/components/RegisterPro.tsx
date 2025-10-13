import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import useRegisterPro from '../hooks/useRegisterPro';
import StepOneProvider from '../context/register/registerPro/StepOneProvider';
import StepTwoProvider from '../context/register/registerPro/StepTwoProvider';
import StepThreeProvider from '../context/register/registerPro/StepThreeProvider';
import StepFourProvider from '../context/register/registerPro/StepFourProvider';
import StepFour from './StepFour';
import FooterConditionsTerm from './FooterConditionsTerm';
import useRegister from '../hooks/useRegister';
import VerifyEmailModal from './VerifyEmailModal';

// **MACHETE PARA RESPETAR Y ENTENDER REACT EN PROCESO DE DESARROLLO**//

/*
  - Context ==> DEFINE FORMA DEL VALOR
  - Provider ==> TIENE ESTADOS + LOGICA , PASA VALOR
  - useContext ==> CONSUME ESOS ESTADOS Y FUNCIONES
  - Hook personalizado (useX) ==> ENVUELVE useContext PARA ABSTRAER LOGICA DE CONSUMO Y MEJORAR REUSO Y LIMPIEZA DEL CODIGO
*/

// FORMULARIO PROFESIONAL
export default function RegisterPro() {
  const { isStepValid, hasInteracted, handleClickNext, valueSelected, step, onSubmitForm, hasBudge, handleClickPrev } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL
  const { isSending } = useRegister();
  // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isLastStep: boolean = (step === 3 && !hasBudge) || step === 4; //MOMENTO PARA MOSTRAR EL ULTIMO PASO;
  const isBudge: boolean = step === 3 && hasBudge;

  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register-userProfessional'>
        <div className='w-full register-userProfessional__container'>
          <div className='c-flex c-flex-column gap-1/2 register-userProfessional__content'>
            {step > 1 && (
              <button type='button' className='c-flex c-flex-self-start c-flex-items-center gap-1/2 cursor-pointer register-userProfessional__arrow-left' onClick={handleClickPrev}>
                <i className='to-left fas fa-arrow-circle-left'></i>
              </button>
            )}
            <div className='w-full c-flex c-flex-items-center register-userProfessional__header'>
              <h1 className='w-full c-flex c-flex-items-center register-userProfessional__title'>
                <span>Crear Cuenta</span>
              </h1>
            </div>
            <form className='register-professional' encType='multipart/form-data' onSubmit={onSubmitForm}>
              <div className='c-flex c-flex-column c-flex-justify-center register-formProfessional__header'>
                <h2 className='c-flex c-flex-wrap c-flex-items-center gap-1/2 form-basic__subtitle'>
                  <div className='c-flex w-full c-flex-items-center gap-1/2'>
                    <i className='fas fa-solid fa-toolbox'></i>
                    <span>Informacion Profesional</span>
                    {hasInteracted && valueSelected && <p className='register-formProfessional__header__category-title'>{valueSelected}</p>}
                  </div>
                </h2>
                <div className='mb-1 c-flex c-flex-items-center gap-1/2 container-textInfo'>
                  <i className='fas fa-info-circle'></i>
                  <small>
                    Campos con (<span className='span-required'>*</span>) son obligatorios
                  </small>
                </div>
              </div>
              <div className='c-flex c-flex-column gap-2 c-flex-justify-center form-professional mb-2'>
                {step === 1 && (
                  <StepOneProvider>
                    <StepOne />
                  </StepOneProvider>
                )}
                {step === 2 && (
                  <StepTwoProvider>
                    <StepTwo />
                  </StepTwoProvider>
                )}
                {isBudge && (
                  <StepThreeProvider>
                    <StepThree />
                  </StepThreeProvider>
                )}
                {isLastStep && (
                  <StepFourProvider>
                    <StepFour />
                  </StepFourProvider>
                )}
                {isLastStep && <FooterConditionsTerm />}
              </div>
              {hasInteracted && (
                <div className='mb-2 c-flex c-flex-justify-end'>
                  <button type={isLastStep ? 'submit' : 'button'} disabled={!isStepValid} className='c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer btn container-btn__next' onClick={isLastStep ? undefined : handleClickNext}>
                    {isLastStep ? <span>Enviar</span> : <span>Siguiente</span>}
                    <i className={isLastStep ? 'fas fa-solid fa-user-plus' : 'fas fa-arrow-circle-right'}></i>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {isSending && <VerifyEmailModal />}
    </>
  );
}
