import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react';
import LoginContext from './LoginContext';
import type { TAuthLogin } from '../../types/typeAuthLogin';
import useMain from '../../hooks/useMain';
import { isLengthValid } from '../../utils/validateFieldUtils';
import useUserApi from '../../hooks/useUserApi';
import useGlobalModal from '../../hooks/useGlobalModal';
import type { TFormRole } from '../../types/typeFormRole';

// PROVEEDOR DE LOS ESTADOS, FUNCIONALIDAD Y LOGICA DEL LOGIN
const LoginProvider = ({ children }: { children: ReactNode }) => {
  // ---------CUSTOM HOOKS--------------------//
  const { setErrorText, passwordLogin, setPasswordLogin } = useGlobalModal();
  const { client, setAccessToken, setIsAuth } = useMain();
  const { isGlobalModalOpen } = useGlobalModal();

  // -------------------------ESTADOS--------------------------//
  const [userName, setUserName] = useState<string>(''); //ESTADO DEL CAMPO DE USUARIO
  const [interactedSession, setInteractedSession] = useState<boolean>(false);
  // GUARDAR ESTADO INICIAL
  const initialRole: TFormRole | null = client === null ? null : client ? 'client' : 'tasker';
  const [role, setRole] = useState<TFormRole | null>(initialRole); //ESTADO DE ROL ELEGIDO
 
  const [isValid, setIsValid] = useState<boolean>(false); //ESTAADO DE VALIDACION

  const { signIn } = useUserApi(); //HOOK DE PETICIONES API DE USUARIO

  //FUNCION MEMOIZADA NO SE RECREA EN CADA RENDER
  const validateFieldsLogin = useCallback(() => {
    // AUNQUE SE QUE NESTJS VALIDA ESTAS COSAS,
    // YA CON ESTO EVITO ENVIAR AL BACKEND DATOS ERRONEOS
    return isLengthValid({ text: passwordLogin, num: 3 }) && isLengthValid({ text: userName, num: 3 });
  }, [passwordLogin, userName]); //DEPENDENCIAS

  //-------------------- EFECTOS---------------------------------//
  useEffect(() => {
    if (isGlobalModalOpen) {
      setIsValid(validateFieldsLogin());
    }
  }, [isGlobalModalOpen, validateFieldsLogin]);

  // OBSERVAR client
  useEffect(() => setRole(initialRole), [client]); // ==> CLIENT ES ESTADO EXTERNO

  // ---------------------FUNCIONES----------------------------------------//
  // EVENTO DE CAMBIO EN PASSWORD
  const handlePassword = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setPasswordLogin(value);
    setIsValid(validateFieldsLogin); // ==> REVALIDAR EN CADA CAMBIO DE PASSWORD
  };

  // EVENTO DE CAMBIO EN USERNAME
  const handleUserName = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setUserName(value);
    setIsValid(validateFieldsLogin); // ==> REVALIDAR EN CADA CAMBIO DE USERNAME
  };

  // SUBMIT PARA LOGIN
  const submitLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setInteractedSession(true);
    await signIn({ passwordLogin, setPasswordLogin, userName, setErrorText, setIsAuth, setAccessToken });
  };

  // OBJETO DE ESTADOS ACTUALIZADOS PARA EL CONTEXTO
  const valuesDefaultLoginAuth: TAuthLogin = {
    isValid,
    role,
    userName,
    interactedSession,
    setInteractedSession,
    validateFieldsLogin,
    submitLogin,
    setIsValid,
    handlePassword,
    handleUserName,
    setUserName,
  };

  return <LoginContext.Provider value={valuesDefaultLoginAuth}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
