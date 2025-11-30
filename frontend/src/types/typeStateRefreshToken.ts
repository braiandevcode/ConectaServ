import type { TStateAuth } from "./typeStateAuth";

export type TStateRefreshToken= Pick<TStateAuth, 'setIsAuth' | 'setAccessToken'>;