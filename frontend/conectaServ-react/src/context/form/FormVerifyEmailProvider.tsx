import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import { FormVerifyEmailContext } from './FormVerifyEmailContext';
import useGlobalModal from '../../hooks/useGlobalModal';
import useRegisterModal from '../../hooks/useRegisterModal';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import type { TFormVerifyCode } from '../../types/typeFormlVerifyCode';
import type { iFormValidationVerifyEmail } from '../../interfaces/iFormValidationVerifyEmail';
import CodeValidator from '../../modules/validators/CodeValidator';
import type { TFieldState } from '../../types/typeStateFields';
import { validateWithRegex } from '../../utils/validateFieldUtils';
import type { iTimeExpire } from '../../interfaces/iTimeExpire';
import useRegister from '../../hooks/useRegister';

// PROVIDER DE MODAL DE VERIFICACION DE CODIGO DE EMAIL
const FormVerifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const codeValidator: CodeValidator = new CodeValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO
  const { showError, showSuccess, openGlobalModal } = useGlobalModal(); // ==> HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { closeRegisterModal, isRegisterModalOpen } = useRegisterModal(); // ==> HOOK QUE USA EL CONTEXTO DE MODAL EN REGISTRO
  const { setIsSuccefullyVerified, isSuccefullyVerified } = useRegister();

  // ESTADO DE VERIFICACION DE CODIGO LEYENDO EN STORAGE
  const [codeStoredEmail, setCodeStoredEmail] = useState<string>(() => {
    const storedCodeEmail: string | null = localStorage.getItem(ENamesOfKeyLocalStorage.CODE);
    return storedCodeEmail ?? '';
  });

  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ESTA ENVIANDO EL CODIGO
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ENVIO EL CODIGO
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ESTA VERIFICANDO EL CODIGO
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE VERIFICO EL EMAIL MEDIANTE EL CODIGO

  // ESTADO DE BANDERA PARA DETERMINAR EXPIRACION DEL CODIGO
  const [expired, setExpired] = useState<boolean>(false);
  // ESTADO PARA EL TIEMPO ACTUAL DE EXPIRACION DEL CODIGO
  const [time, setTime] = useState<iTimeExpire>({ min: 0, sec: 0 });

  // ID DE REFERENCIA PARA EL TIMMER
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const NUM_DIGITS: number = 6;

  // ESTADO INICIAL DE ARRAYS CON CADENAS VACIAS
  const [otp, setOtp] = useState<string[]>(Array(NUM_DIGITS).fill(''));

  const fullCode: string = otp.join(''); //GUARDAR LA CADENA UNIDA

  // ESTADO INICIAL
  const initialFormVerifyEmailState: iFormValidationVerifyEmail = {
    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailCode: codeValidator.validate(fullCode ?? ''),
  };

  const [formState, setFormState] = useState<iFormValidationVerifyEmail>(initialFormVerifyEmailState);

  // DEFINIR UN ARRAY DE REFERENCIAS DE TIPO HTMLInputElement O null
  // AEGURAR QUE ESOS ELEMENTOS TENFRAN LA FUNCION FOCUS PARA EJECUTAR
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ---------------------------------------EFECTOS--------------------------------------------------------//
  //EJECUTAR RESETEO CADA VEZ QUE MODAL SE ABRE O CIERRA
  useEffect(() => {
    // SI EL MODAL ACABA DE ABRIRSE
    if (isRegisterModalOpen) {
      // DAR FOCO SI EL PRIMER CAMPO ESTA VACIO
      if (inputRefs.current[0] && otp[0] === '') {
        inputRefs.current[0].focus(); // ==> FOCUS
      }
    }

    // SI EL MODAL ESTA CERRADO O ACABA DE CERRARSE
    if (!isRegisterModalOpen) {
      // RESETAR ESTADO DE VALIDACION
      setFormState(initialFormVerifyEmailState);
    }
  }, [isRegisterModalOpen]); // DEPENDE DEL ESTADO DEL PADRE MODAL DE VERIFICACION

  // EFECTO PARA ALMACENAR BANDERA DE SI ESTA VERIFICADO O NO
  useEffect(() => {
    localStorage.setItem(ENamesOfKeyLocalStorage.IS_VERIFY_CODE, String(isSuccefullyVerified));
  }, [isSuccefullyVerified]); //==> DEPENDENCIA EXTERNA

  //------------------------------------EVENTOS------------------------------------------------//

  //HANDLER DE MANEJO DE DIGITO ==> MANEJO DE LOGICA otp
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
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

  // FUNCION PARA CORRER EL TIEMPO DE EXPIRACION
  const runTimerExpiration = (): ReturnType<typeof setInterval> => {
    // ESTE FORMATO DEBERIA MANDARME EL BACKEND: { code: "123456", expiresAt: "2025-10-30T15:30:00Z" }
    // SIMULAR DATOS DE CODIGO Y TIEMPO EN QUE LLEGA
    const duration: number = 2 * 60 * 1000;
    const expiresAt: number = Date.now() + duration; // SUMAMOS 2 MINUTOS EN MILISEGUNDOS PARA SIMULAR EXPIRACION
    // CREAMOS EL INTERVALO QUE SE EJECUTARA CADA SEGUNDO
    const timer: ReturnType<typeof setInterval> = setInterval(() => {
      const remaining: number = expiresAt - Date.now(); // CALCULAMOS MILISEGUNDOS RESTANTES

      if (remaining <= 0) {
        // SI EL TIEMPO SE TERMINO, MARCAMOS COMO EXPIRADO Y LIMPIAMOS EL INTERVALO
        setExpired(true);
        setTime({ min: 0, sec: 0 }); // OPCIONAL: MOSTRAR 0:0
        localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
        setOtp(Array(NUM_DIGITS).fill('')); // LIMPIAR INPUTS
        setFormState(initialFormVerifyEmailState); // RESETEAR VALIDACION
        clearInterval(timer);
        return;
      }

      // CONVERTIMOS LOS MILISEGUNDOS RESTANTES A MINUTOS Y SEGUNDOS
      const min: number = Math.floor(remaining / 1000 / 60); // MINUTOS COMPLETOS
      const sec: number = Math.floor((remaining / 1000) % 60); // SEGUNDOS RESTANTES

      setTime({ min, sec }); // ACTUALIZAMOS EL ESTADO PARA RENDERIZAR EL CRONOMETRO
    }, 1000);

    return timer;
  };

  //-------ACTUALIZAR EN STORAGE CODIGO DE VERIFICACION-------------------//
  const updateCodeEmail = (newCode: string): void => {
    //ACTUALIZA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR
    localStorage.setItem(ENamesOfKeyLocalStorage.CODE, String(newCode));
    setCodeStoredEmail(newCode); // => ACTUALIZA EL ESTADO LOCAL

    // SI HAY CARACTERES
    if (newCode.length > 0) {
      // LIMPIAR CUALQUIER TIMER VIEJO
      if (timerRef.current) clearInterval(timerRef.current);
      setExpired(false); //EXPIRADO EN FALSE
      timerRef.current = runTimerExpiration(); //CORRER EL TIEMPO
    } else {
      // SI HAY TIMER
      if (timerRef.current) {
        clearInterval(timerRef.current); //=> LIMPIAR
        timerRef.current = null; // ==> PASAR REF A NULL
      }
    }
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO AL EMAIL DEL USUARIO O NO
  const updatedIsSendingCode = (isSendingCode: boolean): void => {
    setIsSendingCode(isSendingCode);
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO AL EMAIL DEL USUARIO O NO
  const updatedIsSentCode = (isSentCode: boolean): void => {
    setIsCodeSent(isSentCode);
  };

  // ACTUALIZAR EL ESTADO DE VALIDACION DEL CAMPO
  const updatedFormState = (value: string) => {
    const validate: TFieldState = codeValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailCode: validate }));
  };

  const updatedIsSuccefullyVerified = (isVerifiedSuccess: boolean) => {
    setIsSuccefullyVerified(isVerifiedSuccess);
  };

  // --------------------EVENTOS-------------------------------//
  // HANDLER PARA ENVIO DE VERIFICACION DE CODIGO POR PARTE DEL USUARIO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); //PREVENIR COMPORTAMIENTO POR DEFECTO

    // "GUARDRAIL"
    if (expired) return; //SI NO ES VALIDO O EXPIRO NO ACCIONAR NADA

    setIsVerifyingCode(true); //PROCESO DE VERIFICACION DE CODIGO EN PROGRESO

    // ACA DEBERIA IR EL FETCH AN ENDPOINT DL BACKEND PARA GENERAR EL CODIGO Y QUE EL BACKEND SE ENCARGE DE GENERAR
    // Y VERIFICAR GUARDANDO SESSION TEMPORL DE USUARIO EN DB/CACHE
    // SIMULACION DE DELAY DE ENVIO
    setOtp(Array(NUM_DIGITS).fill('')); //LIMPIAR CAMPOS

    // SIMULACION DE ESPERA ==> LEYENDO Y ESPERANDO CONSULTA EN BACKEND Y DB
    setTimeout(() => {
      setIsVerifyingCode(false); // ==> LA VERIFICACION DEL CODIGO YA NO ESTA EN PROGRESO
      // VERIFICAR LUEGO DEL SUBMIT QUE SEA ESTRICTAMENTE EL MISMO CODIGO
      setIsCodeVerified(true); // INDICA QUE TERMINO LA VERIFICACION

      // updatedIsSuccefullyVerified(fullCode.trim() === codeStoredEmail.trim());

      if (fullCode.trim() === codeStoredEmail.trim()) {
        updatedIsSuccefullyVerified(true);
        showSuccess('¡Correo Verificado!', '¡Su correo fue verificado con exito!');
        openGlobalModal(EModalGlobalType.MODAL_SUCCESS);
      } else {
        updatedIsSuccefullyVerified(false);
        setIsCodeSent(false); //==> REINICIAR A FALSO SI EL ERROR ES INVALIDO
        showError('Código incorrecto', 'El código ingresado no es valido, Intente nuevamente.');
        openGlobalModal(EModalGlobalType.MODAL_ERROR);
        localStorage.removeItem(ENamesOfKeyLocalStorage.CODE);
      }
      closeRegisterModal(); //CERRAR MODAL ACTUAL AUTOMATICAMENTE LUEGO DEL EVENTO
    }, 3000);
  };

  const valuesFormVerifyEmailContext: TFormVerifyCode = {
    updatedIsSuccefullyVerified,
    setExpired,
    setTime,
    handleChange,
    handleKeyDown,
    setIsCodeSent,
    setIsCodeVerified,
    setIsVerifyingCode,
    setOtp,
    updatedFormState,
    setFormState,
    handleSubmit,
    setIsSendingCode,
    updateCodeEmail,
    updatedIsSendingCode,
    updatedIsSentCode,
    runTimerExpiration,
    timerRef,
    codeStoredEmail,
    formState,
    isCodeSent,
    isCodeVerified,
    isVerifyingCode,
    otp,
    isSendingCode,
    inputRefs,
    expired,
    time,
  };

  return <FormVerifyEmailContext.Provider value={valuesFormVerifyEmailContext}>{children}</FormVerifyEmailContext.Provider>;
};

export default FormVerifyEmailProvider;
