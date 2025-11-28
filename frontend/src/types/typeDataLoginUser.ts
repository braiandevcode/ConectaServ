import type { TAuthLogin } from "./typeAuthLogin";

export type TDataLoginUser = Pick<TAuthLogin, 'password' | 'userName' | 'setError'>