import { MdOutlineMailLock } from 'react-icons/md';
import { useEffect, type FormEvent } from 'react';
import useVerifyEmailCode from '../../../../hooks/useVerifyEmailCode';
import BtnSubmit from '../../../BtnSubmit';
import type { TFieldState } from '../../../../types/typeStateFields';
import CodeValidator from '../../../../modules/validators/CodeValidator';
import useRegisterPro from '../../../../hooks/useRegisterPro';
import { renderFieldError, styleBorderFieldError } from '../../../../utils/formUtils';

// CSS
import './FormVerifyCode.css';
import useModal from '../../../../hooks/useModal';
import { ENamesOfKeyLocalStorage } from '../../../../types/enums';

// FORMULARIO DE CODIGO DE VERIFICACION
const FormVerifyCode = () => {
  const { setFormState, formState } = useRegisterPro(); // HOOK A NIVEL REGISTRO PROFESIONAL
  const { closeModal } = useModal();
  const { inputCodeEmail, setInputCodeEmail, handleSubmit, isSendingCode } = useVerifyEmailCode();

  const codeValidator: CodeValidator = new CodeValidator();
  // EVENTO INPUT Y VALIDACION DE ENTRADA
  const handleInputCodeVerify = (e: FormEvent<HTMLInputElement>): void => {
    const value: string = e.currentTarget.value;
    const validate: TFieldState = codeValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailCode: validate }));
    setInputCodeEmail(value);
  };

  // EFECTO PARA QUITAR MODAL DESPUES DE UN DELAY
  useEffect(() => {
    //SI SE ESTA ENVIANDO
    if (!isSendingCode)  return;
    
    // INICIAR TEMPORIZADOR
    const timerId = setTimeout(() => {
      closeModal();
      localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
    }, 3000);

    return () => {
      // LIMPIAR PARA EVITAR QUE SE EJECUTE LA ACCION
      clearTimeout(timerId);
    };
  }, [isSendingCode]);

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
          <input name='emailCode' id='emailCode' aria-label='Codigo de verificacion' autoFocus required type='text' className={`${styleBorderFieldError(formState, 'emailCode')}`} placeholder='Código de verificación' value={inputCodeEmail} onChange={handleInputCodeVerify} />
          {renderFieldError(formState, 'emailCode')}
        </div>
        <div className='c-flex c-flex-items-center c-flex-justify-center'>
          <BtnSubmit text='Verificar' variant='btn btn__submit' disabled={!formState.emailCode.isValid} />
        </div>
      </form>
    </>
  );
};

export default FormVerifyCode;
