import type { TAuthLogin } from "./typeAuthLogin";

export type TStateLogin= Pick<TAuthLogin, 'setError' | 'setIsAuth'>