import { MdOutlineMailLock, MdReplay, MdSend } from 'react-icons/md';
import { type FC, type FormEvent } from 'react';
import useFormVerifyEmailCode from '../../../../hooks/useFormVerifyEmailCode';
import BtnSubmit from '../../../BtnSubmit';
import { renderFieldError, styleBorderFieldError } from '../../../../utils/formUtils';
import LoaderBtn from '../../../LoaderBtn';
import useIdentifyEmail from '../../../../hooks/useIdentifyEmail';
import useUserApi from '../../../../hooks/useUserApi';
import useRegister from '../../../../hooks/useTasker';
import { EModalGlobalType } from '../../../../types/enumGlobalModalType';
import useGlobalModal from '../../../../hooks/useGlobalModal';
import BtnSendCode from './Buttons/BtnSendCode';

import type { iMessageStatusToken } from '../../../../interfaces/iMessageStatusToken';
import useMain from '../../../../hooks/useMain';
import useRegisterClient from '../../../../hooks/useRegisterClient';
import type { iStatusError } from '../../../../interfaces/iSatatus';
import type { iMessageResponseStatus } from '../../../../interfaces/iMessageResponseStatusBack';
import useTasker from '../../../../hooks/useTasker';
// CSS
import './FormVerifyCode.css';

const NUM_DIGITS: number = 6; //GUARDAR EN MEMORIA VALOR DE DIGITOS
// COMPONENTE FORMULARIO DE VERIFICACION

// ESTE COMPONENTE ES DEMACIADO INTELIGENTE ==> A FUTURO ACOMODAR
const FormVerifyCode: FC = () => {
  // HOOK QUE USA CONTEXTO DEL FORMULARIO DE VERIFICACION
  const { otp, handleSubmit, expired, updateTokenEmail,handlePaste, isSendingCode,  isVerifyingCode, handleChange, inputRefs, handleKeyDown, formState } = useFormVerifyEmailCode();
  const { setIsSendingIdentificationEmail } = useIdentifyEmail();
  const { openGlobalModal, showError } = useGlobalModal();
  const { resendEmail, time } = useRegister();
  const { getIdentifyEmail, sendCodeToUserEmail } = useUserApi();
  const { formState:formStateClient } = useRegisterClient();
  const {formState: formStateTasker} = useTasker();
 
  const { client } = useMain()

  // ENVIAR CODIGO
  const send = async (): Promise<void> => {
    try {
      const responseIdentify:iMessageResponseStatus | null= await getIdentifyEmail({ setIsSendingIdentificationEmail, emailIdentify: (formState.emailCode.value as string)});

      if(responseIdentify){
        // SI EL EMAIL NO EXISTE ES 200
        if (responseIdentify.success) {
          const resend: iMessageStatusToken | undefined = await sendCodeToUserEmail({ emailCode: resendEmail.emailCode }); // ENVIAR
          
          // SI NO VIENE EL MENSAJE DE RESPUESTA O NO ES SUCCESS O NO HAY DATOS DE FECHA DE EXPIRACION
          if(!resend || (!resend.token && !resend.success) || !resend.expiresAt){
            openGlobalModal(EModalGlobalType.MODAL_ERROR);
            showError('Error inesperado', 'Intente de nuevo más tarde.');
            return;
          }
  
          updateTokenEmail(resend.token, new Date(resend.expiresAt));
        } 
      }
      
    } catch (error) {
      const err = error as iStatusError;

      // CONFLICTO EMAIL YA EXISTE
      if(err.status === 409){
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        // SINO MENSAJE
        showError('Email existente', 'El correo ya existe.');
      }

      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO MENSAJE
      showError('Error inesperado', 'Intente de nuevo más tarde.');
      throw err;
    }
  };

  const submitCodeVerify = async (e:FormEvent<HTMLFormElement>) =>{
    const stateForm = client === null ? null : client  ? formStateClient : formStateTasker;
    if(!stateForm) return;
    await handleSubmit(e, stateForm, 'email');
  }

  return (
    <form className='form c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={submitCodeVerify}>
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
              key={index - 1} //[1,2,3,4,5,6] ==> COMO EL PRIMER VALOR DE INDEX ES 1 PARA QUE ARRNQUE EN CERO RESTAMOS 1
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
              id={`code-input-${index}`}
              name={`code-input-${index}`} // AGREGAR EL NAME DE CADA CAMPO
              type='text'
              maxLength={1} //ACEPTAR SOLO 1 DIGITO
              pattern='[0-9]' // ASEGURA PATRON NUMERICO              
              value={otp[index] ?? ''} // VALOR DE ESTADO DEL ARRAY "otp"
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
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
