import { type FormEvent, type ReactNode } from 'react';
import Modal from 'react-modal';
import useMain from '../../../hooks/useMain';
import useRegisterPro from '../../../hooks/useRegisterPro';
import useRegister from '../../../hooks/useRegister';
import { renderFieldError, styleBorderFieldError } from '../../../utils/formUtils';
import useVerifyCodeEmail from '../../../hooks/useVerifyCodeEmail';
import CodeValidator from '../../../modules/validators/CodeValidator';
import { MdOutlineMailLock } from 'react-icons/md';
import BtnClose from './Buttons/BtnClose';
import type { TFieldState } from '../../../types/typeStateFields';

// IMPORTACION DEL CSS DE MODAL
import './VerifyEmailModal.css';
import ButtonBase from '../../ButtonBase';

Modal.setAppElement('#root'); // SOLO UNA VEZ EN TODO EL PROYECTO

// MODAL PARA VERIFICAR EMAIL ANTES DE REGISTRARSE
const ModalVerifyEmail = (): ReactNode => {
  const codeValidator: CodeValidator = new CodeValidator();
  const { closeModal, isModalOpen } = useMain(); //HOOK A NIVEL MAIN
  const { inputCodeEmail, setInputCodeEmail, codeEmail } = useRegister(); // HOOK A NIVEL REGISTRO GENERAL
  const { formState, setFormState } = useRegisterPro(); // HOOK A NIVEL REGISTRO PROFESIONAL
  const { submitNewData } = useVerifyCodeEmail(); // HOOK PARA VERIFICACION DE CODIGO Y ENVIO DE LOS DATOS

  // EVENTO INPUT Y VALIDACION DE ENTRADA
  const handleInputCodeVerify = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setInputCodeEmail(value);
    const validate: TFieldState = codeValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailCode: validate }));
  };

  // EJEMPLO DE ENVIO DEL CODIGO
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VERIFICAR LUEGO DEL SUBMIT QUE SEA ESTRICTAMENTE EL MISMO
    if (inputCodeEmail.trim() === codeEmail.trim()) {
      // setSuccess('✅ Código verificado correctamente');
      // setError('');
      await submitNewData(); // ==> SI EL CODIGO ES CORRECTO COMPLETAR REGISTRO
    } else {
      // setError('❌ Código incorrecto');
      // setSuccess('');
    }
  };
  //RENDERIZA MODAL DE VERIFICACION
  return (
    <>
      {isModalOpen && (
        <Modal className='modal' isOpen={isModalOpen} onRequestClose={closeModal}>
          <form className='c-flex c-flex-column c-flex-items-center c-flex-justify-center gap-2' onSubmit={handleSubmit}>
            <div className='c-flex c-flex-column gap-1/2 form-basic__field'>
              <label htmlFor='emailCode' className='c-flex c-flex-column c-flex-items-center gap-1/2 form-basic__label'>
                <span className='c-flex c-flex-items-center gap-1/2'>
                  <span>
                    <MdOutlineMailLock /> Verificación de Email
                  </span>
                </span>
                <span className='span-required'>Ingresa el código que te enviamos por correo.</span>
              </label>
              <input name='emailCode' type='text' placeholder='Código de verificación' value={inputCodeEmail} onInput={handleInputCodeVerify} className={styleBorderFieldError(formState, 'emailCode')} />
              {renderFieldError(formState, 'emailCode')}
            </div>
            <div className='c-flex c-flex-items-center gap-1'>
              <ButtonBase variant='btn container-btn__next' type='submit'>
                Verificar
              </ButtonBase>
              {/* <Button onClick={closeModal} variant='btn container-btn__next' type='button'>
                Cerrar
              </Button> */}
              <BtnClose />
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ModalVerifyEmail;
