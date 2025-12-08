import useRegister from '../../../../../../hooks/useTasker';
import useStepFour from '../../../../../../hooks/useStepFour';
import { EKeyDataByStep, ELocationKey } from '../../../../../../types/enums';
import { renderFieldError, styleBorderFieldError } from '../../../../../../utils/formUtils';
import BtnSendCode from '../../Buttons/BtnSendCode';
import useVerifyEmailCode from '../../../../../../hooks/useFormVerifyEmailCode';
import LoaderBtn from '../../../../../LoaderBtn';

// ICONOS DE REACT
import { GiIdCard } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa6';
import { FaUserTag } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { TbPasswordUser } from 'react-icons/tb';
import { RiMailSendLine } from 'react-icons/ri';
import useIdentifyEmail from '../../../../../../hooks/useIdentifyEmail';
import useUserApi from '../../../../../../hooks/useUserApi';
import useGlobalModal from '../../../../../../hooks/useGlobalModal';
import { EModalGlobalType } from '../../../../../../types/enumGlobalModalType';
import type { iMessageStatusToken } from '../../../../../../interfaces/iMessageStatusToken';
import type { iMessageResponseStatus } from '../../../../../../interfaces/iMessageResponseStatusBack';
import type { iStatusError } from '../../../../../../interfaces/iSatatus';
import useTasker from '../../../../../../hooks/useTasker';

// COMPONENTE PASO 4
const StepFour = () => {
  const { formState, stepData } = useTasker(); //HOOK REGISTRO PROFESIONAL
  const { isSendingCode, isCodeSent, updateTokenEmail} = useVerifyEmailCode(); //HOOK QUE USA CONTEXTO VERIFICACION DE EMAIL
  const { password, isSending, isSuccefullyVerified, interactedPassword, interactedConfirmPassword, confirmPassword, setResendEmail } = useRegister(); //HOOK DE ESTADOS DE REGISTROS EN COMUN
  const { handleFullName, handleUserName, handleChangeLocation, handleConfirmPassword, handleEmail, handlePassword } = useStepFour(); // HOOK PASO 4
  const { setIsSendingIdentificationEmail } = useIdentifyEmail();
  const { sendCodeToUserEmail, getIdentifyEmail } = useUserApi();
  const { openGlobalModal, showError } = useGlobalModal();

  // ENVIAR CODIGO
  const send = async (): Promise<void | null> => {
    try {
      const responseIdentify: iMessageResponseStatus | null = await getIdentifyEmail({ setIsSendingIdentificationEmail, emailIdentify: (formState.email.value as string) });

      if(responseIdentify){
        // SI EL EMAIL NO EXISTE ES 200
        if (responseIdentify.success) {
          await sendCodeToUserEmail({ emailCode: stepData[EKeyDataByStep.FOUR].email }); // ENVIAR
            const resend: iMessageStatusToken | undefined = await sendCodeToUserEmail({ emailCode:  stepData[EKeyDataByStep.FOUR].email }); // ENVIAR
                  
            // SI NO VIENE EL MENSAJE DE RESPUESTA O NO ES SUCCESS O NO HAY DATOS DE FECHA DE EXPIRACION
            if(!resend || !resend.success || !resend.expiresAt){
              openGlobalModal(EModalGlobalType.MODAL_ERROR);
              showError('Error inesperado', 'Intente de nuevo más tarde.');
              return;
            }
            updateTokenEmail(resend.token, new Date(resend.expiresAt));
            setResendEmail({ emailCode: stepData[EKeyDataByStep.FOUR].email });
        } 
      }

    } catch (error) {

      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND
      
      //  SI EN ESTE PROCESO ES CONCLICT MOSTRAR MODAL
      if(err.status === 409){
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        showError('Usuario existente', 'El correo ya se encuentra registrado.');
        return;
      }

      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      // SINO MENSAJE
      showError('Error inesperado', 'Intente de nuevo más tarde.');
      throw err;
    }
  };

  // ESTA DESHABILITADO SI:
  /*
    - NO ES VALIDO EL CAMPO DEL EMAIL O
    - SE ESTA ENVIANDO EL CODIGO O
    - SE ENVIO EL CODIGO O
    - SI LA VERIFICACION FUE SATISFACTORIA
  */
  const isDisabled: boolean = !formState.email.isValid || isSendingCode || isCodeSent || isSuccefullyVerified;

  // RENDER
  return (
    <>
      <div className='c-flex c-flex-column gap-3/2'>
        <div className='c-flex c-flex-column c-flex-justify-center gap-1/2 form__header'>
          <div className='c-flex c-flex-items-center gap-1/2 form-groupSpeciality__header'>
            <h3 className='form-groupSpeciality__title c-flex c-flex-items-center gap-1/2'>
              <GiIdCard size={20} />
              <span>Informacion basica</span>
            </h3>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-1 form__fields'>
          <div className='c-flex c-flex-column gap-1/2 form__field'>
            <label htmlFor='fullName' className='c-flex c-flex-items-center gap-1/2 form__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <FaUser size={20} />
                <span>Nombre completo</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='text' id='fullName' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'fullName')}`} aria-label='Nombre completo' placeholder='Roberto Bustos' autoComplete='name' value={formState.fullName.value as string} onChange={handleFullName} required autoFocus />
            {renderFieldError(formState, 'fullName')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form__field'>
            <label htmlFor='userName' className='c-flex c-flex-items-center gap-1/2 form__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <FaUserTag size={20} />
                <span>Nombre de usuario</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='text' id='userName' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'userName')}`} aria-label='Nombre de usuario' placeholder='Roberto_Bustos.45' autoComplete='username' value={formState.userName.value as string} onChange={handleUserName} required />
            {renderFieldError(formState, 'userName')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='email' className='c-flex c-flex-items-center gap-1/2 form__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <FaEnvelope size={20} />
                <span>Correo electronico</span>
              </span>
              <span className='span-required'>*</span>
            </label>

            <div className='c-flex c-flex-items-center gap-1'>
              <input type='text' id='email' disabled={isSending} className={`form__input ${styleBorderFieldError(formState, 'email')}`} aria-label='Correo electronico' autoComplete='email' placeholder='test@example.com' value={formState.email.value as string} onChange={handleEmail} required />
              {isSendingCode ? <LoaderBtn /> : <BtnSendCode IconReact={RiMailSendLine} className='btn__sendCode' disabled={isDisabled} iconProps={{ size: 20 }} handleSend={send} text='Código' />}
            </div>
            {renderFieldError(formState, 'email')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form__field form__location'>
            <label htmlFor='location' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <FaMapMarkerAlt size={20} />
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
                <FaLock size={20} />
                <span>Contraseña</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='password' id='password' disabled={isSending} autoComplete='new-password' aria-label='password' className={`form__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} placeholder='***********' value={password} onChange={handlePassword} required />
            {interactedPassword && renderFieldError(formState, 'password')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form__field'>
            <label htmlFor='confirmPassword' className='c-flex c-flex-items-center gap-1/2 form__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <TbPasswordUser size={20} />
                <span>Confirmar contraseña</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='password' id='confirmPassword' disabled={isSending} autoComplete='new-password' className={`form__input ${interactedConfirmPassword && styleBorderFieldError(formState, 'confirmPassword')}`} aria-label='confirmPassword' placeholder='***********' value={confirmPassword} onChange={handleConfirmPassword} required />
            {interactedConfirmPassword && renderFieldError(formState, 'confirmPassword')}
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFour;
