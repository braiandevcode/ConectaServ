import { useEffect, useRef, useState, type ChangeEvent, type ClipboardEvent, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
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
import useRegister from '../../hooks/useRegister';
import useUserApi from '../../hooks/useUserApi';
import type { iFormStateValidationClient } from '../../interfaces/iFormStateValidationClient';
import type { iFormStateValidationTask } from '../../interfaces/iFormStateValidationTask';

// PROVIDER DE MODAL DE VERIFICACION DE CODIGO DE EMAIL
const FormVerifyEmailProvider = ({ children }: { children: ReactNode }) => {
  //---------------------CONSTANTES GLOBALES--------------------------------//
  const NUM_DIGITS: number = 6; //CANTIDAS DE DIGITOS PARA EL OTP

  // -----------------------CUSTOM HOOKS-------------------------------//
  const codeValidator: CodeValidator = new CodeValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO
  const { showSuccess, openGlobalModal, setErrorText } = useGlobalModal(); // ==> HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { isRegisterModalOpen } = useRegisterModal(); // ==> HOOK QUE USA EL CONTEXTO DE MODAL EN REGISTRO
  const { setIsSuccefullyVerified, timerRef, setTime,isSuccefullyVerified } = useRegister(); // ==> HOOK QUE CONSUME EL CONTEXTO DE REGISTRO GENERAL
  const { userVerify} = useUserApi(); //CUSTOM HOOK API USUARIO

  // -----------------------ESTADOS LOCALES--------------------//
  const [token, setToken] = useState<string>('');  // ==> ESTADO DE TOKEN
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ESTA ENVIANDO EL CODIGO
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ENVIO EL CODIGO
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE ESTA VERIFICANDO EL CODIGO
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false); //==> ESTADO INICAL DE SI SE VERIFICO EL EMAIL MEDIANTE EL CODIGO
  const [expired, setExpired] = useState<boolean>(false); // ==> ESTADO DE BANDERA PARA DETERMINAR EXPIRACION DEL CODIGO
  const [otp, setOtp] = useState<string[]>(Array(NUM_DIGITS).fill(''));  // ==> ESTADO INICIAL DE ARRAYS CON CADENAS VACIAS. OTP: "One-Time Password"

  const fullCode: string = otp.join(''); // ==> GUARDAR LA CADENA UNIDA DE OTP

  // ESTADO INICIAL
  const initialFormVerifyEmailState: iFormValidationVerifyEmail = {
    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailCode: codeValidator.validate(fullCode ?? ''),
  };

  const [formState, setFormState] = useState<iFormValidationVerifyEmail>(initialFormVerifyEmailState);

  // --------------HOOKS DE REF------------------------------//
  // DEFINIR UN ARRAY DE REFERENCIAS DE TIPO HTMLInputElement O null
  // AEGURA QUE ESOS ELEMENTOS TENGAN LA FUNCION FOCUS PARA EJECUTAR EN CADA CAMPO
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  //-------FUNCIONES-------------------//
  const updateTokenEmail = (token: string, expiresAt:Date): void => {
    //ACTUALIZA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR
    setToken(token); // => ACTUALIZA EL ESTADO LOCAL
    // SI NO HAY TOKEN
    if (!token) {
      if (timerRef.current) {
        clearInterval(timerRef.current); //=> LIMPIAR
        timerRef.current = null; // ==> PASAR REF A NULL
      }
      return;
    };

    // LIMPIAR CUALQUIER TIMER VIEJO
    if (timerRef.current) clearInterval(timerRef.current);
    setExpired(false); //EXPIRADO EN FALSE
    timerRef.current = runTimerExpiration({ expiresAt }); //CORRER EL TIEMPO
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

  // ACTUALIZAR ESTADO DE VERIFICACION EXITOSA
  const updatedIsSuccefullyVerified = (isVerifiedSuccess: boolean) => {
    setIsSuccefullyVerified(isVerifiedSuccess); //VERIFICADO SATISFACTORIO
  };

  // FUNCION PARA CORRER EL TIEMPO DE EXPIRACION
  const runTimerExpiration = ({ expiresAt }: { expiresAt:Date }): ReturnType<typeof setInterval> => {
    // CREAMOS EL INTERVALO QUE SE EJECUTARA CADA SEGUNDO
    const timer: ReturnType<typeof setInterval> = setInterval(() => {      
      const remaining: number = expiresAt.getTime() - Date.now(); // CALCULAMOS MILISEGUNDOS RESTANTES

      if (remaining <= 0) {
        // SI EL TIEMPO SE TERMINO, MARCAMOS COMO EXPIRADO Y LIMPIAMOS EL INTERVALO
        setExpired(true);
        setTime({ min: 0, sec: 0 });
        setOtp(Array(NUM_DIGITS).fill('')); // LIMPIAR VALORES DE ESTADO
        setFormState(initialFormVerifyEmailState); // RESETEAR VALIDACION
        clearInterval(timer); // LIMPIAR INTERVALO
        return; //NO SEGUIR
      }

      // CONVERTIMOS LOS MILISEGUNDOS RESTANTES A MINUTOS Y SEGUNDOS
      const min: number = Math.floor(remaining / 1000 / 60); // MINUTOS COMPLETOS
      const sec: number = Math.floor((remaining / 1000) % 60); // SEGUNDOS RESTANTES

      setTime({ min, sec }); // ACTUALIZAMOS EL ESTADO PARA RENDERIZAR EL CRONOMETRO
    }, 1000);

    return timer;
  };

  // ---------------------------------------EFECTOS--------------------------------------------------------//
  // EFECTO QUE DEPENDIENDO DE SI EL MODAL ESTA CERRADO SE LIMPIA DEL STORAGE
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
  }, [isSuccefullyVerified, updatedIsSuccefullyVerified]); //==> DEPENDENCIA EXTERNA


  //------------------------------------EVENTOS------------------------------------------------//

  // EVENTO PARA PEGAR TEXTO
  const handlePaste = (e:ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault(); // EVITAR EL PASTE POR DEFECTO
    const pastedData:string = e.clipboardData.getData('Text').trim(); // TEXTO PEGADO SIN ESPACIOS

    // GUARDO EN MEMORIA Y SEPARO POR '' CONVIRTIENDO EL STRNG A UN ARREGLO PARA DESPUES TOMAR SOLO LOS PRIMEROS 6 DIGITOS
    const digits:string[] = pastedData.split('').slice(0, NUM_DIGITS); 

    // MAPEAR SIN ALTERAR POSICION NI VALORES ESPERADOS
    //EJ: [1,9,8,3,4,7] O ["L","5", "T", "G", "8", "1"] ESTE ULTIMO EN EL MAPEAO IGNORA LOS QUE NO SON NUMEROS REMPLAZANDO A VACIO
    const newOtp = digits.map(digit => validateWithRegex({ pattern: /^[0-9]$/, text: digit })  ? digit : '');
  
    setOtp(newOtp); //PASAR EL NUEVO ARRAY Y ACTUALIZAR ESTADO OTP 
    updatedFormState(newOtp.join('')); // ACTUALIZAR VALIDACION

    // ENFOQUE AUTOMÁTICO AL ULTIMO DIGITO PEGADO
    const lastIndex = digits.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  //HANDLER DE MANEJO DE DIGITO ==> MANEJO DE LOGICA otp
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const value: string = e.currentTarget.value; //VALOR INGRESADO
    const length: number = inputRefs.current.length - 1; //==> GUARDAR EN MEMORIA LA LONGITUD DE REF RESTANDO UNO (6 - 1 = 5)

    // PERMITIR UN SOLO DIGITO O VACIO SI SE BORRA
    if (!validateWithRegex({ pattern: /^[0-9]$/, text: value }) && value !== '') return; //==> SI NO ES VALIDO NO SEGUIR

    // ACTUALIZAR EL ARREGLO DE ESTADO otp
    const newOtp: string[] = [...otp]; //COPIAR TODO LO PREVIO ["","","","","",""]
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
        nextInput.focus(); //HACER FOCO AUTOMATICO AL SIGUIENTE INPUT
      }
    }
  };

  // HANDLER PARA BORRAR Y MOVER FOCO HACIA ATRAS
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number): void => {
    const key: string = e.key;
    //MOVER FOCO HACIA ATRAS AL PRECIONAR 'Backspace'(TECLA DE BORRAR) EN UN CAMPO VACIO
    // SI SE PRESIONA BOTON DE BORRAR Y EL INDICE ES MAYOR A CERO Y EL CAMPO DEL INDICE ESTA VACIO
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      // GUARDAR REFERENCIA DE ELEMENTO PREVIO MEDIANTE LA REF DEL INICE RESTANDO 1
      const prevInput: HTMLInputElement | null = inputRefs.current[index - 1];
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // HANDLER PARA ENVIO DE VERIFICACION DE CODIGO POR PARTE DEL USUARIO
  const handleSubmit = async <T extends iFormStateValidationClient | iFormStateValidationTask>(e: FormEvent<HTMLFormElement>, formState:T, fieldName: keyof T): Promise<void> => {
    e.preventDefault(); //PREVENIR COMPORTAMIENTO POR DEFECTO
    // "GUARDRAIL"
    if (expired) return; //SI EXPIRO NO ACCIONAR NADA
    const fieldState = formState[fieldName] as TFieldState; //SEGUN EL NAME DE LA INTERFACE
    
    // COMENZAR VERIFICACION
    const result = await userVerify({ 
      email:(fieldState.value as string), 
      token, 
      code:fullCode, 
      setErrorText,
      setIsCodeSent,
      updatedIsSuccefullyVerified,
      setIsVerifyingCode 
    });

    setOtp(Array(NUM_DIGITS).fill('')); //LIMPIAR CAMPOS
    setIsVerifyingCode(false); // ==> LA VERIFICACION DEL CODIGO YA NO ESTA EN PROGRESO
    setIsCodeVerified(true); // INDICA QUE TERMINO LA VERIFICACION
    
    if (result?.success) {
      updatedIsSuccefullyVerified(true);
      showSuccess('¡Correo Verificado!', '¡Su correo fue verificado con exito!');
      openGlobalModal(EModalGlobalType.MODAL_SUCCESS);
    } 
  };

  const valuesFormVerifyEmailContext: TFormVerifyCode = {
    updatedIsSuccefullyVerified,
    setExpired,
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
    updateTokenEmail,
    updatedIsSendingCode,
    updatedIsSentCode,
    runTimerExpiration,
    setToken,
    handlePaste,
    token,
    formState,
    isCodeSent,
    isCodeVerified,
    isVerifyingCode,
    otp,
    isSendingCode,
    inputRefs,
    expired,
  };

  return <FormVerifyEmailContext.Provider value={valuesFormVerifyEmailContext}>{children}</FormVerifyEmailContext.Provider>;
};

export default FormVerifyEmailProvider;
