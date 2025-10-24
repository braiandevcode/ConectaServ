import { useState, type ReactNode } from "react"
import LoginContext from "./LoginContext";
import type { TAuthLogin } from "../../types/typeAuthLogin";

// PROVEEDOR DE LOS ESTADOS, FUNCIONALIDAD Y LOGICA DEL LOGIN
const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    // OBJETO DE ESTADOS ACTUALIZADOS PARA EL CONTEXTO
    const valuesDefaultLoginAuth: TAuthLogin ={
        error,
        isAuth,
        password,
        userName,
        setIsAuth,
        setPassword,
        setUserName,
        setError,
    }

    return <LoginContext.Provider value={valuesDefaultLoginAuth}>{children}</LoginContext.Provider>
}

export default LoginProvider;