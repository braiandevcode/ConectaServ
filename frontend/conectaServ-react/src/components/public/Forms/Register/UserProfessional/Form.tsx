import useRegisterPro from "../../../../../hooks/useRegisterPro";
import AllStepsFormsRegisterPro from "./Steps/AllStepsFormRegisterPro";
import BtnsRegisterPro from "./Buttons/BtnsRegisterPro";
import { FaToolbox } from 'react-icons/fa6';
import { BsFillInfoSquareFill } from 'react-icons/bs';

// IMPORTS DE CSS
import '../../FormBase.css'
import './Form.css';

// FORMULARIO PROFESIONAL
const Form = () => {
  const { hasInteracted, valueSelected, onSubmitForm } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL
  return (
    <>
      <form className='form' encType='multipart/form-data' onSubmit={onSubmitForm}>
        <div className='c-flex c-flex-column c-flex-justify-center'>
          <h2 className='c-flex c-flex-wrap c-flex-items-center gap-1/2'>
            <div className='c-flex w-full c-flex-items-center gap-1/2'>
              <FaToolbox size={20} />
              <span>Informacion Profesional</span>
              {hasInteracted && valueSelected && <p className='form__headerCategory-title'>{valueSelected}</p>}
            </div>
          </h2>
          <div className='mb-1 c-flex c-flex-items-center gap-1/2 container-textInfo'>
            <BsFillInfoSquareFill size={20} />
            <small>
              Campos con (<span className='span-required'>*</span>) son obligatorios
            </small>
          </div>
        </div>
        <div className='c-flex c-flex-column gap-2 c-flex-justify-center mb-2'>{<AllStepsFormsRegisterPro />}</div>
        {hasInteracted && <BtnsRegisterPro />}
      </form>
    </>
  );
};

export default Form;