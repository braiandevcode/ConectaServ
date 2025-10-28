import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import LoginContext from './LoginContext';
import type { TAuthLogin } from '../../types/typeAuthLogin';
import useMain from '../../hooks/useMain';

// PROVEEDOR DE LOS ESTADOS, FUNCIONALIDAD Y LOGICA DEL LOGIN
const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { client } = useMain();
  const [error, setError] = useState<string>('');
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const initialRole: 'client' | 'tasker' | null = client === null ? null : client ? 'client' : 'tasker';

  const [role, setRole] = useState<'client' | 'tasker' | null>(initialRole);

  const [interactedPassword, setInteractedPassword] = useState<boolean>(false);

  // OBSERVAR client
  useEffect(() => {
    setRole(initialRole);
  }, [client]);

  // EVENTO DE CAMBIO EN PASSWORD
  const handlePassword = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setInteractedPassword(true);
    setPassword(value);
  };

  // EVENTO DE CAMBIO EN USERNAME
  const handleUserName = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setUserName(value);
  };

  // EVENTO DE CAMBIO EN PASSWORD
  const submitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
  };

  // OBJETO DE ESTADOS ACTUALIZADOS PARA EL CONTEXTO
  const valuesDefaultLoginAuth: TAuthLogin = {
    interactedPassword,
    role,
    error,
    isAuth,
    password,
    userName,
    submitLogin,
    setInteractedPassword,
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
