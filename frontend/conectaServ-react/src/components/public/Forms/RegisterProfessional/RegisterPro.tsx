import useRegister from '../../../../hooks/useRegister';
import VerifyEmailModal from '../../Modals/ModalVerifyEmail';
import Form from './Form';
import BtnBack from '../Buttons/BtnBack';

// **MACHETE PARA RESPETAR Y ENTENDER REACT EN PROCESO DE DESARROLLO**//

/*
  - Context ==> DEFINE FORMA DEL VALOR
  - Provider ==> TIENE ESTADOS + LOGICA , PASA VALOR
  - useContext ==> CONSUME ESOS ESTADOS Y FUNCIONES
  - Hook personalizado (useX) ==> ENVUELVE useContext PARA ABSTRAER LOGICA DE CONSUMO Y MEJORAR REUSO Y LIMPIEZA DEL CODIGO
*/

// REGISTRO PROFESIONAL
export default function RegisterPro() {
  const { isSending } = useRegister();

  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register-userProfessional'>
        <div className='w-full register-userProfessional__container'>
          <div className='c-flex c-flex-column gap-1/2 register-userProfessional__content'>
            {<BtnBack />}
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
