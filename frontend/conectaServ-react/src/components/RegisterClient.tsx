import FieldsClientProvider from '../context/register/registerClient/FieldsClientProvider';
import useRegisterClient from '../hooks/useRegisterClient';
import FieldsClient from './FieldsClient';
import FooterConditionsTerm from './FooterConditionsTerm';

export default function RegisterClient() {
  const { isValid, onSubmitForm } = useRegisterClient(); //HOOK PARA ESTADOS DE REGISTRO CLIENTE
  return (
    <>
      <div className='w-full c-flex c-flex-justify-center centered register-userClient'>
        <div className='w-full register-userClient__container'>
          <div className='c-flex c-flex-column gap-1/2 register-userClient__content'>
            <div className='w-full c-flex c-flex-items-center register-userClient__header'>
              <h1 className='w-full c-flex c-flex-items-center register-userClient__title'>
                <span>Registro Cliente</span>
              </h1>
            </div>
            <form className='register-client'  onSubmit={onSubmitForm}>
              <div className='c-flex c-flex-column c-flex-justify-center register-formClient__header'>
                <h2 className='c-flex c-flex-wrap c-flex-items-center gap-1/2 form-basic__subtitle'>
                  <div className='c-flex w-full c-flex-items-center gap-1/2'>
                    <i className='fas fa-solid fa-user-circle'></i>
                    <span>Crear Cuenta</span>
                  </div>
                </h2>
                <div className='mb-1 c-flex c-flex-items-center gap-1/2 container-textInfo'>
                  <i className='fas fa-info-circle'></i>
                  <small>
                    Campos con (<span className='span-required'>*</span>) son obligatorios
                  </small>
                </div>
              </div>

              <div className='c-flex c-flex-column gap-3/2 form-basic'>
                <div className='c-flex c-flex-column c-flex-justify-center gap-1/2 register-formClient__header'>
                  <div className='c-flex c-flex-items-center gap-1 form-client-groupSpeciality__header'>
                    <h3 className='form-client-groupSpeciality__title'>
                      <i className='fas fa-id-card'></i>
                      <span>Información básica</span>
                    </h3>
                  </div>
                </div>

                <div className='c-flex c-flex-column gap-2 c-flex-justify-center form-professional'>
                  {/* LLAMO AL MISMO COMPONENTE + PROVIDER DE PASO BASICO PARA MANTENER LA LOGICA */}
                  <FieldsClientProvider>
                    <FieldsClient />
                  </FieldsClientProvider>
                  <FooterConditionsTerm />
                </div>
                <div className='c-flex c-flex-justify-end'>
                  <button type='submit' disabled={!isValid} className='c-flex-justify-center gap-1/2 cursor-pointer btn container-btn__next' data-step='0'>
                    <span>Enviar</span>
                    <i className='fa-solid fa-user-plus'></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
