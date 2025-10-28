import { MdOutlineMailLock } from 'react-icons/md';
import { type FC } from 'react';
import useFormVerifyEmailCode from '../../../../hooks/useFormVerifyEmailCode';
import BtnSubmit from '../../../BtnSubmit';
import { renderFieldError, styleBorderFieldError } from '../../../../utils/formUtils';

// CSS
import './FormVerifyCode.css';
import LoaderBtn from '../../../LoaderBtn';
// import useRegisterModal from '../../../../hooks/useRegisterModal';

const NUM_DIGITS: number = 6; //GUARDAR EN MEMORIA VALOR DE DIGITOS
// COMPONENTE FORMULARIO DE VERIFICACION
const FormVerifyCode: FC = () => {
  // HOOK QUE USA CONTEXTO DEL FORMULARIO DE VERIFICACION
  const { otp, handleSubmit, isVerifyingCode, handleChange, inputRefs, handleKeyDown, formState } = useFormVerifyEmailCode();

  return (
    <form className='c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={handleSubmit}>
      <div className='container-fields c-flex c-flex-column gap-1 form-basic__field'>
        <label htmlFor='emailCode' className='c-flex c-flex-column c-flex-items-center gap-1/2 form-basic__label'>
          <span className='c-flex c-flex-items-center gap-1/2'>
            <MdOutlineMailLock size={25} color='black' />
            <span>Verificación de Email</span>
          </span>
          <span className='span-required'>Ingresa el código que te enviamos por correo.</span>
        </label>

        <div className='otp-container c-flex c-flex-justify-center gap-1/2'>
          {[...Array(NUM_DIGITS)].map((_, index) => (
            <input
              key={index - 1}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              id={`code-input-${index}`}
              name={`code-input-${index}`} // AGREGAR EL NAME DE CADA CAMPO
              type='text'
              maxLength={1} //ACEPTAR SOLO 1 DIGITO
              pattern='[0-9]' // ASEGURA PATRON NUMERICO
              // USAR EL VALOR DEL ARRAY "opt"
              value={otp[index] ?? ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`Dígito ${index + 1} del código de verificación`}
              //  ESTILO DE VALIDACION (ESTADO GENERAL DE 'emailCode')
              className={`${styleBorderFieldError(formState, 'emailCode')} otp-input`}
              disabled={isVerifyingCode} // DESHABILITAR SI EL CODIGO SE ESTA ENVIANDO
              autoComplete='off' //EVITAR AUTOCOMPLETADOS
            />
          ))}
        </div>
        {renderFieldError(formState, 'emailCode')}
      </div>
      <div className='c-flex c-flex-items-center c-flex-justify-center'>{isVerifyingCode ? <LoaderBtn /> : <BtnSubmit text={'Verificar'} variant='btn btn__submit' disabled={!formState.emailCode.isValid || isVerifyingCode} />}</div>
    </form>
  );
};

export default FormVerifyCode;
