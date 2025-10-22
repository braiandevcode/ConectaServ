import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import type { iEmailUser } from '../../interfaces/iEmailUser';
import sendCodeToUserEmail from '../../utils/sendCodeToUserEmail';
import { FormVerifyEmailContext } from './FormVerifyEmailContext';
import useMain from '../../hooks/useMain';
import useGlobalModal from '../../hooks/useGlobalModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import type { iFomrValidationVerifyEmail } from '../../interfaces/iFormValidationVerifyEmail';
import CodeValidator from '../../modules/validators/CodeValidator';
import type { TFieldState } from '../../types/typeStateFields';

// PROVIDER DE MODAL DE VERIFICACION DE CODIGO DE EMAIL
const FormVerifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const codeValidator: CodeValidator = new CodeValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO

  const { setLoading } = useMain(); //HOOK NIVEL MAIN
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); // ==> HOOK NIVEL MODAL GENERAL
  const { openRegisterModal, closeRegisterModal, isRegisterModalOpen } = useRegisterModal();

  // ESTADO DE VERIFICACION DE CODIGO LEYENDO EN STORAGE
  const [codeStoredEmail, setCodeStoredEmail] = useState<string>(() => {
    const storedCodeEmail: string | null = localStorage.getItem(ENamesOfKeyLocalStorage.CODE);
    return storedCodeEmail ?? '';
  });

  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); // ESTADO PARA BANDERA DE SI SE ESTA ENVIANDO CODIGO O NO
  // const [inputCodeEmail, setInputCodeEmail] = useState<string>(''); //ESTADO DE EMAIL INGRESADO EN CAMPO

  const NUM_DIGITS: number = 6;

  // ESTADO INICIAL DE ARRAYS CON CADENAS VACIAS
  const [otp, setOtp] = useState<string[]>(Array(NUM_DIGITS).fill(''));

  const fullCode: string = otp.join(''); //GUARDAR LA CADENA UNIDA
  const initialFormVerifyEmailState: iFomrValidationVerifyEmail = {
    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailCode: codeValidator.validate(fullCode ?? ''),
  };
  const [formState, setFormState] = useState<iFomrValidationVerifyEmail>(initialFormVerifyEmailState);

  //-------ACTUALIZAR EN STORAGE CODIGO DE VERIFICACION-------------------//
  const updateCodeEmail = (newCode: string): void => {
    //ACTUALIZA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR
    localStorage.setItem(ENamesOfKeyLocalStorage.CODE, String(newCode));
    setCodeStoredEmail(newCode); // => ACTUALIZA EL ESTADO INTERNO DE REACT
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO O NO
  const updatedIsSendingCode = (isSendingCode: boolean): void => {
    console.log('Me debo cambiar de estado');
    setIsSendingCode(isSendingCode);
  };

  //EJECUTAR RESETEO CADA VEZ QUE MODAL SE ABRE O CIERRA
  useEffect(() => {
    // Si el modal está CERRADO o acaba de CERRARSE
    if (!isRegisterModalOpen) {
      // RESETAR ESTADO DE VALIDACION
      setFormState(initialFormVerifyEmailState);
    }
  }, [isRegisterModalOpen]); // DEPENDE DEL ESTADO DEL PADRE MODAL DE VERIFICACION

  // ACTUALIZAR EL ESTADO DE VALIDACION DEL CAMPO
  const updatedFormState = (value: string) => {
    const validate: TFieldState = codeValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailCode: validate }));
  };

  // FUNCION QUE SE ENCARGA DE MANDAR EL CODIGO AL USUARIO
  const sendCode = async ({ emailUser }: iEmailUser): Promise<void> => {
    // INVOCO FUNCION DE ENVIO
    await sendCodeToUserEmail({
      updatedIsSendingCode,
      emailUser,
      updateCodeEmail,
      showError,
      showSuccess,
      openGlobalModal,
      openVerifyEmailModal: openRegisterModal,
      setLoading,
    });
  };

  // --------------------EVENTOS-------------------------------//
  // EJEMPLO DE ENVIO DEL CODIGO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); //PREVENIR COMPORTAMIENTO POR DEFECTO

    console.log('Es Igual?: ', fullCode.trim() === codeStoredEmail.trim());

    // VERIFICAR LUEGO DEL SUBMIT QUE SEA ESTRICTAMENTE EL MISMO CODIGO
    if (fullCode.trim() === codeStoredEmail.trim()) {
      closeRegisterModal();
      showSuccess('¡Exito!', 'Código verificado correctamente');
      openGlobalModal(EModalGlobalType.MODAL_SUCCESS);
      updatedIsSendingCode(true); //EL CODIGO YA FUE ENVIADO
      setOtp(Array(NUM_DIGITS).fill(''));
    } else {
      closeRegisterModal();
      console.log('No es igual, entro  en error');
      updatedIsSendingCode(false);
      showError('Código incorrecto', 'El código ingresado no es valido, Intente nuevamente.');
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
      setOtp(Array(NUM_DIGITS).fill(''));
    }
  };

  const valuesFormVerifyEmailContext: TFormVerifyCode = {
    otp,
    setOtp,
    updatedFormState,
    formState,
    setFormState,
    codeStoredEmail,
    isSendingCode,
    sendCode,
    handleSubmit,
    setIsSendingCode,
    updateCodeEmail,
    updatedIsSendingCode,
  };

  return <FormVerifyEmailContext.Provider value={valuesFormVerifyEmailContext}>{children}</FormVerifyEmailContext.Provider>;
};

export default FormVerifyEmailProvider;
