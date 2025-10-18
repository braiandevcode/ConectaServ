import FieldsClientProvider from "../../../../context/register/registerClient/FieldsClientProvider";
import useRegisterClient from "../../../../hooks/useRegisterClient";
import BtnSubmit from "../../../BtnSubmit";
import FooterConditionsTerm from "../../FooterConditionsTerm";
import FieldsClient from "./FieldsClient";

// FORMULARIO DE CLIENTE
const FormClient = () => {
  const { isValid, onSubmitForm } = useRegisterClient(); //HOOK PARA ESTADOS DE REGISTRO CLIENTE
  return (
    <>
      <form className='register-client' onSubmit={onSubmitForm}>
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
            <BtnSubmit text="Enviar" disabled={!isValid} />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormClient;
