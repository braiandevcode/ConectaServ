import type { iEndPointCloud } from '../interfaces/iEnpointCloud';
import { EEndpointCloud } from '../types/enums';

export const endpointCloud: iEndPointCloud = {
  HOST: `${EEndpointCloud.HOST}`,
  VERSION: `${EEndpointCloud.VERSION}`,
  CLOUD_NAME: `${EEndpointCloud.NAME_CLOUD}`,
  PATH_FOLDER: `${EEndpointCloud.PATH_FOLDER}`,
  DELETE_AVATAR_PREV: `${EEndpointCloud.DELETE_AVATAR_PREV}`,
  DELETE_AVATAR_EXPERIENCE_PREV: `${EEndpointCloud.DELETE_AVATAR_EXPERIENCE_PREV}`,  
};
