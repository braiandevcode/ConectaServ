import { FaEnvelope } from 'react-icons/fa';
import useIdentifyEmail from '../../../hooks/useIdentifyEmail';
import { renderFieldError, styleBorderFieldError } from '../../../utils/formUtils';
import BtnSubmit from '../../BtnSubmit';
import LoaderBtn from '../../LoaderBtn';

// CSS
import './FormIdentifyEmail.css';
import { MdSend } from 'react-icons/md';

// FORMULARIO DE IDENTIFICACION DE EMAIL
const FormIdentyfyEmail = () => {
  const { formState, handleOnchangeIdentifyEmail, isSendingIdentificationEmail, submitIdentifyEmail} = useIdentifyEmail();

  return (
    <>
      <form className='form c-flex c-flex-column gap-1' onSubmit={submitIdentifyEmail}>
        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='emailIdentify' className='c-flex c-flex-items-center gap-1/2 form__label mb-1'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <FaEnvelope size={20} />
              <span>Correo Electronico</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <div className='w-full c-flex c-flex-column c-flex-items-center'>
            <input type='text' id='emailIdentify' className={`form__input mb-1 w-full ${styleBorderFieldError(formState, 'emailIdentify')}`} autoComplete='email' placeholder='test@example.com' value={formState.emailIdentify.value as string} onChange={handleOnchangeIdentifyEmail} required />
            <div className='w-full c-flex c-flex-items-center'>{renderFieldError(formState, 'emailIdentify')}</div>
          </div>
        </div>
        <div className='c-flex c-flex-items-center'>{isSendingIdentificationEmail ? <LoaderBtn /> : <BtnSubmit IconReact={MdSend} text={'Enviar'} variant='btn btn__submit' disabled={!formState.emailIdentify.isValid || isSendingIdentificationEmail} />}</div>
      </form>
    </>
  );
};

export default FormIdentyfyEmail;
