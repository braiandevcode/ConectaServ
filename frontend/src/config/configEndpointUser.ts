import type { iEndPointUser } from '../interfaces/interfaces';
import { EEndpoint } from '../types/enums';
import { BASE_BACK_URL } from './configBaseBackUrl';

// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const endPointUser: iEndPointUser= {
  USER:`${BASE_BACK_URL}${EEndpoint.USER}`,
  USER_CODE_REQUEST:`${BASE_BACK_URL}${EEndpoint.USER_CODE_REQUEST}`,
  USER_VERIFY:`${BASE_BACK_URL}${EEndpoint.CODE_VERIFY}`,
  USER_CODE_DELETE:`${BASE_BACK_URL}${EEndpoint.USER_CODE_DELETE}`,
  USER_IDENTIFY: `${BASE_BACK_URL}${EEndpoint.USER_IDENTIFY}`,
  AUTH_LOGIN: `${BASE_BACK_URL}${EEndpoint.AUTH}` 
};
