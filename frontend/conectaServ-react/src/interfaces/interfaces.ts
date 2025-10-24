export interface iNamesGroupsChecks {
  service: string;
  context: string;
  day: string;
  hour: string;
}

// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iEndPointRegister {
  ENDPOINT_REGISTER_CLIENT: string;
  ENDPOINT_REGISTER_PROFESSIONAL: string;
  ENDPOINT_REGISTER:string;
}

// INTERFACES PARA URL DE PETICIONES
export interface iPhatPages {
  PATH_FORM_CLIENT: string;
  PATH_FORM_PROFESSIONAL: string;
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

