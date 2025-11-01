import { MdOutlineMailLock, MdReplay, MdSend } from 'react-icons/md';
import { type FC } from 'react';
import useFormVerifyEmailCode from '../../../../hooks/useFormVerifyEmailCode';
import BtnSubmit from '../../../BtnSubmit';
import { renderFieldError, styleBorderFieldError } from '../../../../utils/formUtils';
import LoaderBtn from '../../../LoaderBtn';
import useIdentifyEmail from '../../../../hooks/useIdentifyEmail';
import useUserApi from '../../../../hooks/useUserApi';
import type { TUser } from '../../../../types/typeUser';
import useRegister from '../../../../hooks/useRegister';
import { EModalGlobalType } from '../../../../types/enumGlobalModalType';
import useGlobalModal from '../../../../hooks/useGlobalModal';
import BtnSendCode from './Buttons/BtnSendCode';

// CSS
import './FormVerifyCode.css';

const NUM_DIGITS: number = 6; //GUARDAR EN MEMORIA VALOR DE DIGITOS
// COMPONENTE FORMULARIO DE VERIFICACION
const FormVerifyCode: FC = () => {
  // HOOK QUE USA CONTEXTO DEL FORMULARIO DE VERIFICACION
  const { otp, handleSubmit, expired, time, timerRef, setExpired, isSendingCode, runTimerExpiration, isVerifyingCode, handleChange, inputRefs, handleKeyDown, formState } = useFormVerifyEmailCode();
  const { setIsSendingIdentificationEmail } = useIdentifyEmail();
  const { openGlobalModal, showError } = useGlobalModal();
  const { resendEmail } = useRegister();
  const { getUsers, sendCodeToUserEmail } = useUserApi();

  // ENVIAR CODIGO
  const send = async (): Promise<void> => {
    try {
      const resultVerifyUser: TUser[] | undefined = await getUsers({ setIsSendingIdentificationEmail });

      if (!resultVerifyUser) return; //NO SEGUIR getUser YA MANEJA ENVIO DE LA INFO SEGUN EL PROBLEMA

      // SI HAY DATOS DE USUARIOS
      const emailExist: boolean = resultVerifyUser.some((d) => d.email === resendEmail.emailUser);
      // SI EL EMAIL NO EXISTE
      if (!emailExist) {
        await sendCodeToUserEmail({ emailUser: resendEmail.emailUser }); // ENVIAR
        if (timerRef.current) clearInterval(timerRef.current); //LIMPIAR EL VIEJO
        setExpired(false); // RESET ESTADO
        timerRef.current = runTimerExpiration(); // INICIAR Y GUARDAR NUEVO ID
      } else {
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        // SINO MENSAJE
        showError('Email existente', 'El correo ya existe.');
      }
    } catch (error) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO MENSAJE
      showError('Error inesperado', 'Intente de nuevo más tarde.');
      throw error;
    }
  };

  return (
    <form className='form c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={handleSubmit}>
      <div className='w-full c-flex c-flex-justify-center c-flex-items-center'>
        <h3 className='form__title c-flex c-flex-items-center gap-1/2'>
          <span className='form__text-expired'>Expira en:</span>
          <span>
            {time.min}:{time.sec < 10 ? `0${time.sec}` : time.sec}
          </span>
        </h3>
      </div>

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
      <div className='c-flex c-flex-items-center c-flex-justify-center gap-1'>
        {isVerifyingCode ? (
          <LoaderBtn />
        ) : (
          <>
            {/* BOTON DE VERIFICAR */}
            <BtnSubmit IconReact={MdSend} text={'Verificar'} variant='btn btn__submit' disabled={!formState.emailCode.isValid || expired} />
            {expired && (isSendingCode ? <LoaderBtn text='Reenviando' /> : <BtnSendCode className='btn__sendCode' IconReact={MdReplay} iconProps={{ size: 20 }} disabled={isVerifyingCode} handleSend={send} text='Reenviar' />)}
          </>
        )}
      </div>
    </form>
  );
};

export default FormVerifyCode;
