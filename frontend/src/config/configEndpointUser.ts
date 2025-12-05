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
  AUTH_LOGIN: `${BASE_BACK_URL}${EEndpoint.AUTH}`,
  AUTH_ME:`${BASE_BACK_URL}${EEndpoint.AUTH_ME}`,
  ALL_TASKERS: `${BASE_BACK_URL}${EEndpoint.ALL_TASKERS}`,
  REFRESH:`${BASE_BACK_URL}${EEndpoint.REFRESH}`,
  LOGOUT:`${BASE_BACK_URL}${EEndpoint.LOGOUT}`,
  IMAGE_PROFILE: `${BASE_BACK_URL}${EEndpoint.IMAGE_PROFILE}`,
  IMAGES_EXP: `${BASE_BACK_URL}${EEndpoint.IMAGES_EXP}`,
  TASKER_INFO:`${BASE_BACK_URL}${EEndpoint.TASKER_INFO}`,
};
