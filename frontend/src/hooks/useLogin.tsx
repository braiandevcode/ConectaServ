import { useContext } from "react"
import LoginContext from "../context/login/LoginContext"
import type { TAuthLogin } from "../types/typeAuthLogin"

// HOOK QUE USA EL CONTEXT DE LOGIN
const useLogin = () => {
    const context = useContext<TAuthLogin>(LoginContext);
    if(!context){
        throw new Error('useLogin debe usarse dentro de LoginProvider');
    }

    return context;
}

export default useLogin;