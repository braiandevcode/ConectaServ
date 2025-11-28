import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import LoginContext from './LoginContext';
import type { TAuthLogin } from '../../types/typeAuthLogin';
import useMain from '../../hooks/useMain';
import { isLengthValid } from '../../utils/validateFieldUtils';
import useUserApi from '../../hooks/useUserApi';
import useGlobalModal from '../../hooks/useGlobalModal';
import type { TFormRole } from '../../types/typeFormRole';

// PROVEEDOR DE LOS ESTADOS, FUNCIONALIDAD Y LOGICA DEL LOGIN
const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { client, setAccessToken, setIsAuth } = useMain();
  const { isGlobalModalOpen } = useGlobalModal();
  const [error, setError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  // ESTADO INICIAL
  const initialRole: TFormRole | null = client === null ? null : client ? 'client' : 'tasker';

  const [role, setRole] = useState<TFormRole | null>(initialRole);

  const [isValid, setIsValid] = useState<boolean>(false);

  const { signIn } = useUserApi(); //HOOK DE PETICIONES API DE USUARIO
  
  useEffect(() => {
    if (isGlobalModalOpen) {
      setIsValid(validateFieldsLogin());
    }
  }, [validateFieldsLogin]);

  // OBSERVAR client
  useEffect(() => setRole(initialRole), [client]); // ==> CLIENT ES ESTADO EXTERNO

  // EVENTO DE CAMBIO EN PASSWORD
  const handlePassword = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setPassword(value);
    setIsValid(validateFieldsLogin) // ==> REVALIDAR EN CADA CAMBIO DE PASSWORD
  };

  // EVENTO DE CAMBIO EN USERNAME
  const handleUserName = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setUserName(value);
    setIsValid(validateFieldsLogin) // ==> REVALIDAR EN CADA CAMBIO DE USERNAME
  };

  // AUNQUE SE QUE NESTJS VALIDA ESTAS COSAS, YA CON ESO EVITO ENVIAR AL BACKEND DATOS ERRONEOS
  //DE ESTA MANERA NO GASTO RECURSOS DE PETICIONES INNECESARIAS AL BACKEND.
  function validateFieldsLogin() {
    // SE CONSIDERA VALIDO SI LOS VALORES DE LOS CAMPOS TIENEN UNA LONGITUD MAYOR A 2
    let isValid:boolean = isLengthValid({ text: password, num: 3 }) && isLengthValid({ text: userName, num: 3 });
    return isValid;
  }

  // SUBMIT PARA LOGIN
  const submitLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signIn({ password, userName, setError, setIsAuth, setAccessToken });
  };

  // OBJETO DE ESTADOS ACTUALIZADOS PARA EL CONTEXTO
  const valuesDefaultLoginAuth: TAuthLogin = {
    isValid,
    role,
    error,
    password,
    userName,
    validateFieldsLogin,
    submitLogin,
    setIsValid,
    handlePassword,
    handleUserName,
    setPassword,
    setUserName,
    setError,
  };

  return <LoginContext.Provider value={valuesDefaultLoginAuth}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
