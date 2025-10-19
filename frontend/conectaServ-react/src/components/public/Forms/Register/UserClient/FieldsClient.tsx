import useFieldsClient from "../../../../../hooks/useFieldsClient";
import useRegister from "../../../../../hooks/useRegister";
import useRegisterClient from "../../../../../hooks/useRegisterClient";
import { ELocationKey } from "../../../../../types/enums";
import { renderFieldError, styleBorderFieldError } from "../../../../../utils/formUtils";

import './FieldsClient.css';

// COMPONENTE PASO 4
const FieldsClient = () => {
  const { formState } = useRegisterClient(); //HOOK REGISTRO PROFESIONAL
  const { password, confirmPassword, interactedPassword, interactedConfirmPassword } = useRegister();
  const { handleFullName, handleUserName, handleChangeLocation, handleConfirmPassword, handleEmail, handlePassword } = useFieldsClient(); // HOOK PASO 4
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
          <input type='text' id='fullName' className={`form__input ${styleBorderFieldError(formState, 'fullName')}`} aria-label='Nombre completo' placeholder='Roberto Bustos' value={formState.fullName.value as string} onInput={handleFullName} required autoFocus />
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
          <input type='text' id='userName' className={`form__input ${styleBorderFieldError(formState, 'userName')}`} aria-label='Nombre de usuario' placeholder='Roberto_Bustos.45' value={formState.userName.value as string} onInput={handleUserName} required />
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
          <input type='text' id='email' className={`form__input ${styleBorderFieldError(formState, 'email')}`} aria-label='Correo electronico' placeholder='test@example.com' value={formState.email.value as string} onInput={handleEmail} required />
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
              <i className='fas fa-lock'></i>
              <span>Contraseña</span>
            </span>
            <span className='span-required'>*</span>
          </label>
          <input type='password' id='password' autoComplete='password' className={`form__input ${interactedPassword && styleBorderFieldError(formState, 'password')}`} aria-label='Contrasena' placeholder='***********' value={password} onInput={handlePassword} required />
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
          <input type='password' id='confirmPassword' autoComplete='confirmPassword' className={`form__input ${interactedConfirmPassword && styleBorderFieldError(formState, 'confirmPassword')}`} aria-label='Confirmar contrasena' placeholder='***********' value={confirmPassword} onInput={handleConfirmPassword} required />
          {interactedConfirmPassword && renderFieldError(formState, 'confirmPassword')}
        </div>
      </div>
    </>
  );
};

export default FieldsClient;
