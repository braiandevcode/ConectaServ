import { createContext, type Context } from "react";
import type { TIdentifyEmail } from "../../types/typeIdentifyEmail";
import { formStateIdentifyEmail } from "../../config/formStateIdentifyEmail";

const defaulFormIdentifyEmailtContext: TIdentifyEmail = {
    submitIdentifyEmail: async () => {},
    setEmailIdentify: () => {},
    setFormState: () => {},
    handleClickClientIdentifyEmail: () => {},
    handleClickTaskerIdentifyEmail: () => {},
    handleOnchangeIdentifyEmail: () => {},
    setIsExistEmail: () => {},
    setIsSendingIdentificationEmail: () => {},
    setIsSentIdentificationEmail: () => {},
    emailIdentify:'',
    formState: formStateIdentifyEmail,
    isExistEmail:false,
    isSendingIdentificationEmail: false,
    isSentIdentificationEmail:false
}

const FormIdentifyEmailContext:Context<TIdentifyEmail> = createContext(defaulFormIdentifyEmailtContext);

export default FormIdentifyEmailContext;