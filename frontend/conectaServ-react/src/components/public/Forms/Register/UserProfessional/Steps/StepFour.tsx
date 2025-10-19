import useRegister from '../../../../../../hooks/useRegister';
import useRegisterPro from '../../../../../../hooks/useRegisterPro';
import useStepFour from '../../../../../../hooks/useStepFour';
import { ELocationKey } from '../../../../../../types/enums';
import { renderFieldError, styleBorderFieldError } from '../../../../../../utils/formUtils';

// ICONOS DE REACT
import { GiIdCard } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa6';
import { FaUserTag } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { TbPasswordUser } from 'react-icons/tb';

// COMPONENTE PASO 4
const  StepFour = () => {
  const {  formState } = useRegisterPro(); //HOOK REGISTRO PROFESIONAL
  const { password, interactedPassword, interactedConfirmPassword, confirmPassword } = useRegister() //HOOK DE ESTADOS DE REGISTROS EN COMUN
  const {handleFullName, handleUserName, handleChangeLocation, handleConfirmPassword, handleEmail, handlePassword } = useStepFour(); // HOOK PASO 4
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
            <input type='text' id='fullName' className={`form__input ${styleBorderFieldError(formState, 'fullName')}`} aria-label='Nombre completo' placeholder='Roberto Bustos' value={formState.fullName.value as string} onInput={handleFullName} required autoFocus />
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
            <input type='text' id='userName' className={`form__input ${styleBorderFieldError(formState, 'userName')}`} aria-label='Nombre de usuario' placeholder='Roberto_Bustos.45' value={formState.userName.value as string} onInput={handleUserName} required />
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
            <input type='text' id='email' className={`form__input ${styleBorderFieldError(formState, 'email')}`} aria-label='Correo electronico' placeholder='test@example.com' value={formState.email.value as string} onInput={handleEmail} required />
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
            <select id='location' className={`to-left form__location-select ${styleBorderFieldError(formState, 'location')}`} value={formState.location.value as string} onChange={handleChangeLocation} required>
              <option value={ELocationKey.NONE} disabled>
                Seleccione una ciudad
              </option>
              <option value={ELocationKey.OLAVARRIA}>Olavarria</option>
              <option value={ELocationKey.AZUL}>Azul</option>
              <option value={ELocationKey.TANDIL}>Tandil</option>
            </select>
            {renderFieldError(formState, 'location')}
          </div>

      
          <div className='c-flex c-flex-column gap-1/2 form__field'>
            <label htmlFor='password' className='c-flex c-flex-items-center gap-1/2 form__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <FaLock size={20} />
                <span>Contraseña</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='password' id='password' autoComplete='password' aria-label='password' className={`form__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} placeholder='***********' value={password} onInput={handlePassword} required />
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
            <input type='password' id='confirmPassword' autoComplete='confirmPassword' className={`form__input ${interactedConfirmPassword && styleBorderFieldError(formState, 'confirmPassword')}`} aria-label='confirmPassword' placeholder='***********' value={confirmPassword} onInput={handleConfirmPassword} required />
            {interactedConfirmPassword && renderFieldError(formState, 'confirmPassword')}
          </div>
        </div>
      </div>
    </>
  );
}

export default StepFour;