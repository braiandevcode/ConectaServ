import type { TAuthLogin } from "./typeAuthLogin";
import type { TMain } from "./typeMain";

export type TStateAuth = Pick<TMain, 'setIsAuth' | 'setAccessToken'> & Pick<TAuthLogin, 'setError'>