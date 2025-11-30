import type { Dispatch, SetStateAction } from "react";

// INTERFACE PARA DATOS DE VERIFICACION
export interface iDataVerifyCode{ 
    email:string; 
    code:string; 
    token:string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setIsCodeSent:Dispatch<SetStateAction<boolean>>;
    setIsVerifyingCode: Dispatch<SetStateAction<boolean>>;
    updatedIsSuccefullyVerified: (isVerifiedSuccess: boolean) => void;
}