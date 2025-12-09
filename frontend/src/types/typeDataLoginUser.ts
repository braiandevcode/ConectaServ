import type { Dispatch, SetStateAction } from "react";
import type { TAuthLogin } from "./typeAuthLogin";
import type { TGlobalModal } from "./typeGlobalModal";

export type TDataLoginUser = Pick<TAuthLogin, 'userName'> & Pick<TGlobalModal, 'setErrorText'  | 'setPasswordLogin' | 'passwordLogin'> & {
    setIsSession:Dispatch<SetStateAction<boolean>>;
}