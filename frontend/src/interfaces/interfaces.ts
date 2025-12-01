// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iEndPointUser {
  USER:string;
  USER_IDENTIFY:string;
  AUTH_LOGIN:string;
  USER_VERIFY:string;
  USER_CODE_REQUEST:string;
  USER_CODE_DELETE:string;
  REFRESH:string;
  LOGOUT:string;
  AUTH_ME:string;
  ALL_TASKERS:string;
  IMAGE_PROFILE:string;
  IMAGES_EXP:string;
}

// INTERFACES PARA URL DE PETICIONES
export interface iPhatPages {
  PATH_FORM_CLIENT: string;
  PATH_FORM_TASKER: string;
  PATH_TERMS: string;
  PATH_PRIVACY: string;
}

// INTERFACES ESPECÍFICAS
export interface iOptionsItems {
  value: string;
  text: string;
  disabled: boolean;
  selected: boolean;
}

