import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import LoginContext from './LoginContext';
import type { TAuthLogin } from '../../types/typeAuthLogin';
import useMain from '../../hooks/useMain';
import { isLengthValid } from '../../utils/validateFieldUtils';
import useUserApi from '../../hooks/useUserApi';
import useGlobalModal from '../../hooks/useGlobalModal';

// PROVEEDOR DE LOS ESTADOS, FUNCIONALIDAD Y LOGICA DEL LOGIN
const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { client } = useMain();
  const { isGlobalModalOpen } = useGlobalModal();
  const [error, setError] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const initialRole: 'client' | 'tasker' | null = client === null ? null : client ? 'client' : 'tasker';

  const [role, setRole] = useState<'client' | 'tasker' | null>(initialRole);

  const [isValid, setIsValid] = useState<boolean>(false);

  const { signInUser } = useUserApi();

  useEffect(() => {
    if (isGlobalModalOpen) {
      setIsValid(validateFieldsLogin());
    }
  }, [isGlobalModalOpen, validateFieldsLogin]);

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

  function validateFieldsLogin() {
    // SE CONSIDERA VALIDO SI LOS VALORES DE LOS CAMPOS TIENEN UNA LONGITUD MAYOR A 2
    let isValid = isLengthValid({ text: password, num: 3 }) && isLengthValid({ text: userName, num: 3 });
    return isValid;
  }

  // EVENTO DE CAMBIO EN PASSWORD
  const submitLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await signInUser({ password, userName, setError, setIsAuth })
  };

  // OBJETO DE ESTADOS ACTUALIZADOS PARA EL CONTEXTO
  const valuesDefaultLoginAuth: TAuthLogin = {
    isValid,
    role,
    error,
    isAuth,
    password,
    userName,
    validateFieldsLogin,
    submitLogin,
    setIsValid,
    handlePassword,
    handleUserName,
    setIsAuth,
    setPassword,
    setUserName,
    setError,
  };

  return <LoginContext.Provider value={valuesDefaultLoginAuth}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
