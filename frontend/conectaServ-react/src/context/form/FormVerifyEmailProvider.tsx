import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
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
import { validateWithRegex } from '../../utils/validateFieldUtils';

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

  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);

  const [isSuccefullyVerified, setIsSuccefullyVerified] = useState<boolean>(false);

  const NUM_DIGITS: number = 6;

  // ESTADO INICIAL DE ARRAYS CON CADENAS VACIAS
  const [otp, setOtp] = useState<string[]>(Array(NUM_DIGITS).fill(''));

  const fullCode: string = otp.join(''); //GUARDAR LA CADENA UNIDA
  const initialFormVerifyEmailState: iFomrValidationVerifyEmail = {
    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailCode: codeValidator.validate(fullCode ?? ''),
  };

  const [formState, setFormState] = useState<iFomrValidationVerifyEmail>(initialFormVerifyEmailState);

  // DEFINIR UN ARRAY DE REFERENCIAS DE TIPO HTMLInputElement O null
  // AEGURAR QUE ESOS ELEMENTOS TENFRAN LA FUNCION FOCUS PARA EJECUTAR
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //HANDLER DE MANEJO DE DIGITO ==> MANEJO DE LOGICA opt
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value: string = e.currentTarget.value; //VALOR INGRESADO
    const length: number = inputRefs.current.length - 1; //==> GUARDAR EN MEMORIA LA LONGITUD DE REF RESTANDO UNO

    // PERMITIR UN SOLO DIGITO O VACIO SI SE BORRA
    if (!validateWithRegex({ pattern: /^[0-9]$/, text: value }) && value !== '') return; //==> SI NO ES VALIDO NO SEGUIR

    // ACTUALIZAR EL ARREGLO DE ESTADO opt
    const newOtp: string[] = [...otp]; //COPIAR TODO LO PREVIO
    newOtp[index] = value; // ==>AGREGAR EL NUEVO VALOR AL ARRAY SEGUN INDICE
    setOtp(newOtp); // ==> SETEAR EL ARRAY ACTUALIZADO

    // UNIR TODO Y VALIDAR CON join();
    const fullCode: string = newOtp.join('');
    updatedFormState(fullCode);

    // LOGICA DE FOCO AUTOMATICO ==> MOVERSE HACIA ADELANTE
    // SI EL VALOR ES DIFERENTE DE VACIO Y EL INDEX ES MENOR A LA LONGITUD
    if (value !== '' && index < length) {
      // GUARDAR EN MEMORIA EL CAMPO SIGUIENTE Y VERIFICAR SI EXISTE
      const nextInput: HTMLInputElement | null = inputRefs.current[index + 1];

      // SI EXISTE ELEMENTO INPUT
      if (nextInput) {
        nextInput.focus(); //HACER FOCO AUTOMATICO LLEVANDOTE AL SIGUIENTE INPUT
      }
    }
  };

  // HANDLER PARA BORRAR Y MOVER FOCO HACIA ATRAS
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    const key: string = e.key;
    //MOVER FOCO HACIA ATRAS AL PRECIONAR 'Backspace'(TECLA DE BORRAR) EN UN CAMPO VACIO
    // SI SE PRESIONABOTON DE BORRAR Y EL INDICE ES MAYOR A CERO Y EL CAMPO DEL INDICE ESTA VACIO
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      // GUARDAR REFERENCIA DE ELEMENTO PREVIO MEDIANTE LA REF DEL INICE RESTANDO 1
      const prevInput: HTMLInputElement | null = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // GUARDO EN MEMORIA BANDERA PARA SABER SI EL PRIMER CAMPO ESTA VACIO
  const isFirstFieldEmpty: boolean = otp[0] === '';

  // EFECTO PARA ENFOCAR EL PRIMER INPUT AL MONTRASE/REABRIR
  useEffect(() => {
    // ENFOCAR EL PRIMER INPUT SI ESTA DISPONIBLE
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); //FOCO EN EL PRIMER CAMPO
    }
  }, [isFirstFieldEmpty]); //SI EL PRIMER INPUT ESTA VACIO REENFOCAR

  //-------ACTUALIZAR EN STORAGE CODIGO DE VERIFICACION-------------------//
  const updateCodeEmail = (newCode: string): void => {
    //ACTUALIZA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR
    localStorage.setItem(ENamesOfKeyLocalStorage.CODE, String(newCode));
    setCodeStoredEmail(newCode); // => ACTUALIZA EL ESTADO INTERNO DE REACT
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO AL EMAIL DEL USUARIO O NO
  const updatedIsSendingCode = (isSendingCode: boolean): void => {
    setIsSendingCode(isSendingCode);
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO AL EMAIL DEL USUARIO O NO
  const updatedIsSentCode = (isSentCode: boolean): void => {
    setIsCodeSent(isSentCode);
  };

  //EJECUTAR RESETEO CADA VEZ QUE MODAL SE ABRE O CIERRA
  useEffect(() => {
    // SI EL MODAL ESTA CERRADO O ACABA DE CERRARSE
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
      updatedIsSentCode,
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
  // HANDLER PARA ENVIO DE VERIFICACION DE CODIGO POR PARTE DEL USUARIO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); //PREVENIR COMPORTAMIENTO POR DEFECTO
    setIsVerifyingCode(true); //PROCESO DE VERIFICACION DE CODIGO EN PROGRESO
    // ACA DEBERIA IR EL FETCH AN ENDPOINT DL BACKEND PARA GENERAR EL CODIGO Y QUE EL BACKEND SE ENCARGE DE GENERAR
    // Y VERIFICAR GUARDANDO SESSION TEMPORL DE USUARIO EN DB/CACHE
    
    // SIMULACION DE DELAY DE ENVIO
    setOtp(Array(NUM_DIGITS).fill('')); //LIMPIAR CAMPOS

    setTimeout(() => {
      setIsVerifyingCode(false); // ==> LA VERIFICACION DEL CODIGO YA NO ESTA EN PROGRESO
      // VERIFICAR LUEGO DEL SUBMIT QUE SEA ESTRICTAMENTE EL MISMO CODIGO
      setIsCodeVerified(true); // INDICA QUE TERMINO LA VERIFICACION
      setIsSuccefullyVerified(fullCode.trim() === codeStoredEmail.trim());
      if (fullCode.trim() === codeStoredEmail.trim()) {
        showSuccess('¡Exito!', 'Código verificado correctamente');
        openGlobalModal(EModalGlobalType.MODAL_SUCCESS);
      } else {
        setIsCodeSent(false); //== REINICIAR A FALSO SI EL ERROR ES INVALIDO
        showError('Código incorrecto', 'El código ingresado no es valido, Intente nuevamente.');
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
      }
      closeRegisterModal(); //CERRAR MODAL ACTUAL AUTOMATICAMENTE LUEGO DEL EVENTO
    }, 12000);
  };

  const valuesFormVerifyEmailContext: TFormVerifyCode = {
    handleChange,
    handleKeyDown,
    setIsSuccefullyVerified,
    setIsCodeSent,
    setIsCodeVerified,
    setIsVerifyingCode,
    setOtp,
    updatedFormState,
    setFormState,
    sendCode,
    handleSubmit,
    setIsSendingCode,
    updateCodeEmail,
    updatedIsSendingCode,
    isSuccefullyVerified,
    codeStoredEmail,
    formState,
    isCodeSent,
    isCodeVerified,
    isVerifyingCode,
    otp,
    isSendingCode,
    inputRefs,
  };

  return <FormVerifyEmailContext.Provider value={valuesFormVerifyEmailContext}>{children}</FormVerifyEmailContext.Provider>;
};

export default FormVerifyEmailProvider;
