import type { TGlobalModal } from "./typeGlobalModal";
import type { TMain } from "./typeMain";

export type TStateAuth = Pick<TMain, 'setIsAuth' | 'setAccessToken'> & Pick<TGlobalModal, 'setErrorText'>