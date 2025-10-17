import useRegisterPro from "../../../../hooks/useRegisterPro";
import AllStepsFormsRegisterPro from "./Steps/AllStepsFormRegisterPro";
import BtnsRegisterPro from "../Buttons/BtnsRegisterPro";

// FORMULARIO PROFESIONAL
const Form = () => {
  const { hasInteracted, valueSelected, onSubmitForm } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL
  return (
    <>
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
        <div className='c-flex c-flex-column gap-2 c-flex-justify-center form-professional mb-2'>{<AllStepsFormsRegisterPro />}</div>
        {hasInteracted && <BtnsRegisterPro />}
      </form>
    </>
  );
};

export default Form;