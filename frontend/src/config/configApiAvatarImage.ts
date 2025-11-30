import type { iConfigApiAvatar } from '../interfaces/iConfigApiAvatar';

// CONFIGURACION DE API DE AVATAR POR DEFECTO
export const configApiAvatarImage: iConfigApiAvatar = {
  HOST: import.meta.env.VITE_API_AVATAR_HOST,
  QUERY_NAME: import.meta.env.VITE_QUERY_AVATAR_NAME,
  QUERY_BG_RANDOM: import.meta.env.VITE_QUERY_AVATAR_BG_RANDOM,
};
