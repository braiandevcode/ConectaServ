import { MdOutlineMailLock } from 'react-icons/md';
import BtnSubmit from '../../BtnSubmit';
// import { renderFieldError, styleBorderFieldError } from '../../../utils/formUtils';
import useVerifyEmailCode from '../../../hooks/useVerifyEmailCode';
// import useRegisterPro from '../../../hooks/useRegisterPro';
// import CodeValidator from '../../../modules/validators/CodeValidator';
import { useEffect, type FormEvent } from 'react';
// import type { TFieldState } from '../../../types/typeStateFields';

// CSS
import './FormVerifyCode.css';

const FormVerifyCode = () => {
  const { inputCodeEmail, setInputCodeEmail, handleSubmit } = useVerifyEmailCode();
  // const { formState } = useRegisterPro(); // HOOK A NIVEL REGISTRO PROFESIONAL

  // const codeValidator: CodeValidator = new CodeValidator();
  // EVENTO INPUT Y VALIDACION DE ENTRADA
  const handleInputCodeVerify = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    
    const value: string = e.currentTarget.value;
    console.log("inputCodeEmail: ", inputCodeEmail);
  
    // const validate: TFieldState = codeValidator.validate(value);
    // setFormState((prev) => ({ ...prev, emailCode: validate }));
    setInputCodeEmail(value);
    // console.log(formState.emailCode.value);
  };

  useEffect(() => {
    console.log('Me Monte en FORMULARIO DE VERIFICACION');
  }, []);

  return (
    <>
      <form className='c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={handleSubmit}>
        <div className='c-flex c-flex-column gap-1 form-basic__field'>
          <label htmlFor='emailCode' className='c-flex c-flex-column c-flex-items-center gap-1/2 form-basic__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <MdOutlineMailLock size={25} color='black' />
              <span>Verificación de Email</span>
            </span>
            <span className='span-required'>Ingresa el código que te enviamos por correo.</span>
          </label>
          <input name='emailCode' id='emailCode' autoFocus required type='text' placeholder='Código de verificación' value={inputCodeEmail} onChange={handleInputCodeVerify}  />
          {/* {renderFieldError(formState, 'emailCode')} */}
        </div>
        <div className='c-flex c-flex-items-center c-flex-justify-center'>
          <BtnSubmit text='Verificar' variant='btn btn__submit' />
        </div>
      </form>
    </>
  );
};

export default FormVerifyCode;
