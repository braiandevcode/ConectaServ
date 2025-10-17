import useRegisterPro from '../../../../hooks/useRegisterPro';
import useRegister from '../../../../hooks/useRegister';
import VerifyEmailModal from '../../Modals/ModalVerifyEmail';
import Form from './Form';

// **MACHETE PARA RESPETAR Y ENTENDER REACT EN PROCESO DE DESARROLLO**//

/*
  - Context ==> DEFINE FORMA DEL VALOR
  - Provider ==> TIENE ESTADOS + LOGICA , PASA VALOR
  - useContext ==> CONSUME ESOS ESTADOS Y FUNCIONES
  - Hook personalizado (useX) ==> ENVUELVE useContext PARA ABSTRAER LOGICA DE CONSUMO Y MEJORAR REUSO Y LIMPIEZA DEL CODIGO
*/

// REGISTRO PROFESIONAL
export default function RegisterPro() {
  const { step, handleClickPrev } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL
  const { isSending } = useRegister();

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
            {<Form />}
          </div>
        </div>
      </div>

      {isSending && <VerifyEmailModal />}
    </>
  );
}
