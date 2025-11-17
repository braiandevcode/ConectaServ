// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iEndPointUser {
  USER:string;
  AUTH_LOGIN:string;
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

