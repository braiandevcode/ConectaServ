import { RiMailSendLine } from 'react-icons/ri';
import useFieldsClient from '../../../../../hooks/useFieldsClient';
import useFormVerifyEmailCode from '../../../../../hooks/useFormVerifyEmailCode';
import useRegister from '../../../../../hooks/useRegister';
import useRegisterClient from '../../../../../hooks/useRegisterClient';
import { EDataClient, ELocationKey } from '../../../../../types/enums';
import { renderFieldError, styleBorderFieldError } from '../../../../../utils/formUtils';
import LoaderBtn from '../../../../LoaderBtn';
import BtnSendCode from '../Buttons/BtnSendCode';
import useUserApi from '../../../../../hooks/useUserApi';
import useIdentifyEmail from '../../../../../hooks/useIdentifyEmail';
import useGlobalModal from '../../../../../hooks/useGlobalModal';
import { EModalGlobalType } from '../../../../../types/enumGlobalModalType';
import type { iMessageResponseStatus } from '../../../../../interfaces/iMessageResponseStatusBack';

// CSS
import './FieldsClient.css';
import type { iMessageStatusToken } from '../../../../../interfaces/iMessageStatusToken';
import type { iStatusError } from '../../../../../interfaces/iSatatus';


// COMPONENTE PASO CAMPO BASICO CLIENTE
const FieldsClient = () => {
  const { password, isSending, confirmPassword, interactedPassword, interactedConfirmPassword, setResendEmail, isSuccefullyVerified} = useRegister(); //HOOK QUE USA CONTEXTO REGISTRO GENERALES
  const { isCodeSent, isSendingCode, updateTokenEmail} = useFormVerifyEmailCode(); //HOOK QUE USA CONTEXTO FORULARIO DE VERIFICAION DE EMAIL(ENGLOBA PARA AMBOS REGISTROS)
  const { formState, dataClient } = useRegisterClient(); //HOOK  QUE USA CONTEXTO REGISTRO CLIENTE
  const { handleFullName, handleUserName, handleChangeLocation, handleConfirmPassword, handleEmail, handlePassword } = useFieldsClient(); // HOOK QUE USA CONTEXTO DE LOS CAMPOS DEL FORMULARIO DE CLIENTE
  const { setIsSendingIdentificationEmail, emailIdentify } = useIdentifyEmail();
  const { sendCodeToUserEmail, getIdentifyEmail } = useUserApi()
  const { openGlobalModal, showError } = useGlobalModal();

  // ESTA DESHABILITADO SI:
  /*
    - NO ES VALIDO EL CAMPO DEL EMAIL O
    - SE ESTA ENVIANDO EL CODIGO O
    - SE ENVIO EL CODIGO O
    - SI LA VERIFICACION FUE SATISFACTORIA
  */

  const isDisabled: boolean = !formState.email.isValid || isSendingCode || isCodeSent || isSuccefullyVerified;


  // ENVIAR CODIGO (ESTE METODO SE DEBE CORREGIR YA QUE SE USA LA MISMA LOGICA EN VARIAS PARTES)
  const send = async (): Promise<void | null> => {
    try {
      const responseIdentify: iMessageResponseStatus | null= await getIdentifyEmail({ setIsSendingIdentificationEmail, emailIdentify });

      if(responseIdentify){
        // SI ES SUCCESS
        if (responseIdentify.success) {
          const resend:iMessageStatusToken | undefined = await sendCodeToUserEmail({ emailCode:  dataClient[EDataClient.DATA].email }); // ENVIAR
        
          // SI ES SUCCESS O NO HAY DATOS DE FECHA DE EXPIRACION
          // SI EL BACKEND RESPONDIO PERO LOS DATOS NO SON CORRECTOS
          if (!resend?.success || !resend?.expiresAt) {
            openGlobalModal(EModalGlobalType.MODAL_ERROR);
            showError('Error inesperado', 'Intente de nuevo más tarde.');
            return;
          }
          updateTokenEmail(resend.token, new Date(resend.expiresAt));
          setResendEmail({ emailCode: dataClient[EDataClient.DATA].email })
        } 
      }
    } catch (error) {
      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND

      //  SI EN ESTE PROCESO ES CONCLICT MOSTRAR MODAL
      if(err.statusCode === 409){
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        showError('Email ya registrado', 'El correo ya se encuentra registrado.');
        return;
      }

      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO MENSAJE
      showError('Error inesperado', 'Intente de nuevo más tarde.');
      throw err;
    }
  };

  // RENDER
  return (
    <>
      <div className='c-flex c-flex-column gap-1 form__fields'>
        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='fullName' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-user'></i>
              <span>Nombre completo</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <input type='text' id='fullName' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'fullName')}`} autoComplete='name' placeholder='Roberto Bustos' value={formState.fullName.value as string} onChange={handleFullName} required autoFocus />
          {renderFieldError(formState, 'fullName')}
        </div>

        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='userName' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-user-tag'></i>
              <span>Nombre de usuario</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <input type='text' id='userName' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'userName')}`} autoComplete='username' placeholder='Roberto_Bustos.45' value={formState.userName.value as string} onChange={handleUserName} required />
          {renderFieldError(formState, 'userName')}
        </div>

        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='email' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-envelope'></i>
              <span>Correo electronico</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <div className='c-flex c-flex-items-center gap-1'>
            <input type='text' id='email' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'email')}`} autoComplete='email' placeholder='test@example.com' value={formState.email.value as string} onChange={handleEmail} required />
            {isSendingCode ? <LoaderBtn /> : <BtnSendCode IconReact={RiMailSendLine} iconProps={{ size: 20 }} className='btn__sendCode' disabled={isDisabled} handleSend={send} text='Código' />}
          </div>
          {renderFieldError(formState, 'email')}
        </div>

        <div className='c-flex c-flex-column gap-1/2 form__field form__location'>
          <label htmlFor='location' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-map-marker-alt'></i>
              <span>Ubicacion</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <select id='cityName' disabled={isSending} className={`to-left form__location-select ${styleBorderFieldError(formState, 'cityName')}`} value={formState.cityName.value as string} onChange={handleChangeLocation} required>
            <option value={ELocationKey.NONE} disabled>
              Seleccione una ciudad
            </option>
            <option value={ELocationKey.OLAVARRIA}>Olavarria</option>
            <option value={ELocationKey.AZUL}>Azul</option>
            <option value={ELocationKey.TANDIL}>Tandil</option>
          </select>
          {renderFieldError(formState, 'cityName')}
        </div>

        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='password' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-lock'></i>
              <span>Contraseña</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <input type='password' id='password' disabled={isSending} autoComplete='new-password' className={`form__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} placeholder='***********' value={password} onChange={handlePassword} required />
          {interactedPassword && renderFieldError(formState, 'password')}
        </div>

        <div className='c-flex c-flex-column gap-1/2 form__field'>
          <label htmlFor='confirmPassword' className='c-flex c-flex-items-center gap-1/2 form__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-user-lock'></i>
              <span>Confirmar contraseña</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <input type='password' id='confirmPassword' disabled={isSending} autoComplete='new-password' className={`form__input ${interactedConfirmPassword && styleBorderFieldError(formState, 'confirmPassword')}`} aria-label='Confirmar contrasena' placeholder='***********' value={confirmPassword} onChange={handleConfirmPassword} required />
          {interactedConfirmPassword && renderFieldError(formState, 'confirmPassword')}
        </div>
      </div>
    </>
  );
};

export default FieldsClient;
