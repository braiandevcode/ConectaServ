import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from 'react';
import { RegisterContext } from './RegisterContext';
import type { TRegister } from '../../types/typeRegister';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import { useLocation, useNavigate } from 'react-router';
import type { iEmailUser } from '../../interfaces/iEmailUser';
import type { iTimeExpire } from '../../interfaces/iTimeExpire';

// CONTEXTO DE ESTADOS GENERALES A FORMULARIOS
const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation(); //HOOK DE REACT LOCATION
  const navigate = useNavigate(); // HOOK DE REACT NAVIGATION

  //ESTADO DE TERMINOS Y CONDICIONES EN FALSE SIEMPRE
  const [terms, setTerms] = useState<boolean>(false);
  //BANDERA PARA SABER SI YA INTERACTUO O NO EN PASSWORD Y CONFIRMAR PASSWORD. UTIL PARA EVITAR ESTILOS INNECESARIOS AL MONTAR COMPONENTE
  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);
  const [interactedConfirmPassword, setInteractedConfirmPassword] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false); // ESTADO PARA BANDERA DE SI SE ESTA ENVIANDO
  const [password, setPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA PASSWORD
  const [confirmPassword, setConfirmPassword] = useState<string>(''); //ESTADO EN TIEMPO RUNTIME PARA CONFIRMPASSWORD

  const [resendEmail, setResendEmail] = useState<iEmailUser>({ emailCode: '' });

  const [expiresAt, setExpiresAt] = useState<number | null>(null);


  const [time, setTime] = useState<iTimeExpire>({ min: 0, sec: 0 }); // ==> ESTADO PARA EL TIEMPO ACTUAL DE EXPIRACION DEL CODIGO
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null); // ==> ID DE REFERENCIA PARA EL TIMMER

  // ESTADO LOCAL DE SI YA SE VERIFICO CORRECTAMENTE
  const [isSuccefullyVerified, setIsSuccefullyVerified] = useState<boolean>(() => {
    return localStorage.getItem(ENamesOfKeyLocalStorage.IS_VERIFY_CODE) === 'true';
  });
  
  //ONCHANGE TERMINOS Y CONDICIONES
  const onChangeTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setTerms(e.target.checked);
  };

  // EFECTO PARA FORZAR A RENDERIZAR HOME
  useEffect(() => {
    // CUANDO PRESIONO ATRAS O ADELANTE EN FLECHAS DEL NAVEGADOR Y ESTA EN EL HOME,
    // QUE IGNORE EL HISTORIAL DEL NAVEGADOR
    // Y LO REDIRIGA A SI MISMA AL HOME '/'
    const handlePopState = () => navigate('/', { replace: true });

    // SI LA RUTA DEL PATH ES EL HOME
    if (location.pathname === '/') {
      const wrappedHandler = () => handlePopState(); // GUARDAR REFERENCIA PARA PODER REMOVERLA DESPUES
      window.addEventListener('popstate', wrappedHandler); //SUSCRIPCION DE EVENTO EN FLECHAS ATRAS/ADELANTE DEL NAVEGADOR

      //LIMPIAR Y EVITAR FUGAS DE MEMORIA.
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [location.pathname, navigate]); //==> DEPENDE DE CAMBIOS EN LOCATION Y NAVIGATE, HOOKS DE REACT

  
  //VALORES DE ESTADOS QUE CONSUME EL CONTEXTO
  const contextValuesRegister: TRegister = {
    setIsSuccefullyVerified,
    setResendEmail,
    setInteractedConfirmPassword,
    setInteractedPassword,
    onChangeTerms,
    setTerms,
    setConfirmPassword,
    setPassword,
    setIsSending,
    expiresAt,
    setExpiresAt,
    setTime,
    time,
    timerRef,
    resendEmail,
    isSuccefullyVerified,
    isSending,
    confirmPassword,
    interactedConfirmPassword,
    password,
    terms,
    interactedPassword,
  };

  // RETORNAMOS EL PROVIDER  DE REGISTROS
  return <RegisterContext.Provider value={contextValuesRegister}>{children}</RegisterContext.Provider>;
};

export default RegisterProvider;
