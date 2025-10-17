import useRegister from '../../../../../hooks/useRegister';
import useRegisterPro from '../../../../../hooks/useRegisterPro';
import useStepFour from '../../../../../hooks/useStepFour';
import { ELocationKey } from '../../../../../types/enums';
import { renderFieldError, styleBorderFieldError } from '../../../../../utils/formUtils';

// COMPONENTE PASO 4
const  StepFour = () => {
  const {  formState } = useRegisterPro(); //HOOK REGISTRO PROFESIONAL
  const { password, interactedPassword, interactedConfirmPassword, confirmPassword } = useRegister() //HOOK DE ESTADOS DE REGISTROS EN COMUN
  const {handleFullName, handleUserName, handleChangeLocation, handleConfirmPassword, handleEmail, handlePassword } = useStepFour(); // HOOK PASO 4
  return (
    <>
      <div className='c-flex c-flex-column gap-3/2 form-basic form-step'>
        <div className='c-flex c-flex-column c-flex-justify-center gap-1/2 register-formProfessional__header'>
          <div className='c-flex c-flex-items-center gap-1/2 form-professional-groupSpeciality__header'>
            <h3 className='form-professional-groupSpeciality__title c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-id-card'></i>
              <span>Informacion basica</span>
            </h3>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-1 form-basic__fields'>
          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='fullName' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-user'></i>
                <span>Nombre completo</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='text' id='fullName' className={`form-basic__input ${styleBorderFieldError(formState, 'fullName')}`} aria-label='Nombre completo' placeholder='Roberto Bustos' value={formState.fullName.value as string} onInput={handleFullName} required autoFocus />
            {renderFieldError(formState, 'fullName')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='userName' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-user-tag'></i>
                <span>Nombre de usuario</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='text' id='userName' className={`form-basic__input ${styleBorderFieldError(formState, 'userName')}`} aria-label='Nombre de usuario' placeholder='Roberto_Bustos.45' value={formState.userName.value as string} onInput={handleUserName} required />
            {renderFieldError(formState, 'userName')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='email' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-envelope'></i>
                <span>Correo electronico</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='text' id='email' className={`form-basic__input ${styleBorderFieldError(formState, 'email')}`} aria-label='Correo electronico' placeholder='test@example.com' value={formState.email.value as string} onInput={handleEmail} required />
            {renderFieldError(formState, 'email')}
          </div>

  
          <div className='c-flex c-flex-column gap-1/2 form-basic__field form-basic__location'>
            <label htmlFor='location' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-map-marker-alt'></i>
                <span>Ubicacion</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <select id='location' className={`to-left form-basic__location-select ${styleBorderFieldError(formState, 'location')}`} value={formState.location.value as string} onChange={handleChangeLocation} required>
              <option value={ELocationKey.NONE} disabled>
                Seleccione una ciudad
              </option>
              <option value={ELocationKey.OLAVARRIA}>Olavarria</option>
              <option value={ELocationKey.AZUL}>Azul</option>
              <option value={ELocationKey.TANDIL}>Tandil</option>
            </select>
            {renderFieldError(formState, 'location')}
          </div>

      
          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='password' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-lock'></i>
                <span>Contraseña</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='password' id='password' autoComplete='password' aria-label='password' className={`form-basic__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} placeholder='***********' value={password} onInput={handlePassword} required />
            {interactedPassword && renderFieldError(formState, 'password')}
          </div>

          <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
            <label htmlFor='confirmPassword' className='c-flex c-flex-items-center gap-1/2 form-basic__label'>
              <span className='c-flex c-flex-items-center gap-1/2'>
                <i className='fas fa-user-lock'></i>
                <span>Confirmar contraseña</span>
              </span>
              <span className='span-required'>*</span>
            </label>
            <input type='password' id='confirmPassword' autoComplete='confirmPassword' className={`form-basic__input ${interactedConfirmPassword && styleBorderFieldError(formState, 'confirmPassword')}`} aria-label='confirmPassword' placeholder='***********' value={confirmPassword} onInput={handleConfirmPassword} required />
            {interactedConfirmPassword && renderFieldError(formState, 'confirmPassword')}
          </div>
        </div>
      </div>
    </>
  );
}

export default StepFour;