import Form from './Form';
import BtnBack from './Buttons/BtnBack';
import useValidateStep from '../../../../../hooks/useValidateStep';

// CSS
import '../RegisterBase.css'; // ==> BASE PARA AMBOS RESGISTROS CON ESTILOS EN COMUN Y EVITAR REPETIR ESTILOS
import useRegisterTasker from '../../../../../hooks/useRegisterTasker';

// **MACHETE PARA RESPETAR Y ENTENDER REACT EN PROCESO DE DESARROLLO**//

/*
  - Context ==> DEFINE FORMA DEL VALOR
  - Provider ==> TIENE ESTADOS + LOGICA , PASA VALOR ACTUAL DE LOS ESTADOS
  - useContext ==> CONSUME ESOS ESTADOS Y FUNCIONES
  - Hook personalizado (useX) ==> ENVUELVE useContext PARA ABSTRAER LOGICA DE CONSUMO Y MEJORAR REUSO Y LIMPIEZA DEL CODIGO
*/

// COMPONENTE QUE CONTIENE REGISTRO PROFESIONAL
const RegisterTasker = () => {
  const { IsStepOneGreaterThhanZero  } = useValidateStep(); //HOOK QUE PERMITE VALIDAR PASOS Y EXTRAER LA BANDERA NECESARIA
  const { handleClickPrev } = useRegisterTasker();

  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register'>
        <div className='w-full register__container'>
          <div className='c-flex c-flex-column gap-1/2 register__content'>
            {IsStepOneGreaterThhanZero &&  <BtnBack handleBtnBack={handleClickPrev} />}
            <div className='w-full c-flex c-flex-items-center register__header'>
              <h1 className='w-full c-flex c-flex-items-center register__title'>
                <span>Crear Cuenta</span>
              </h1>
            </div>
            {<Form />}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterTasker;