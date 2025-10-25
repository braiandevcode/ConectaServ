//---------------------------------ENUMS PARA EVITAR ERRORES Y PORQUE SE REUTILIZAN VARIA VECES-----------------------------------------
// TIPO DE CATEGORIAS VALIDAS
export enum ECategoryKey {
  REPAIR = 'reparacion-mantenimiento',
  GARDEN = 'jardineria',
  MOVE = 'mudanza-transporte',
  NONE = 'none',
}

// TIPO DE LOCALIDADES VALIDAS
export enum ELocationKey {
  OLAVARRIA = 'olavarría',
  AZUL = 'azul',
  TANDIL = 'tandil',
  NONE = 'none',
}

// INDICE DE PASOS
export enum EKeyDataByStep {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
}

export enum EDataClient {
  DATA = 'data-client',
}

// NOMBRE DE CAMPOS DE LOS GRUPOS DE CHECKXBOXES (DETALLES DE PROFESION)
export enum EGroupCheckBox {
  SERVICE = 'service[]',
  CONTEXT = 'context[]',
  DAY = 'day[]',
  HOUR = 'hour[]',
}

// ENUM PARA VALORES POR DEFAULT DE SELECT
export enum EDefaultSelected {
  SELECT_LOCATION = 'Seleccione una ciudad',
  SELECT_CATEGORY = 'Seleccione una categoría',
}

// NOMBRE DE CLAVES PARA LOCALSTORAGE
export enum ENamesOfKeyLocalStorage {
  STEP_DATA = 'stepData',
  CLIENT_DATA = 'data-client',
  ROLE = 'role',
  CURRENT_STEP = 'currentStep',
  IMAGE_INDEXED_DB = 'images',
  INTERACTED = 'interacted',
  CODE = 'codeEmail',
  IS_VERIFY_CODE= 'isVerified'
}

// ENUM PARA LA CONFIGURACION DE LAS RUTAS DE PETICIONES
export enum EEndpoint {
  TASKER = '/tasker',
  CLIENT = '/client',
  REGISTER = '/users' // REGISTRO SEGUN ROLE
}

// ENUM PARA CONFIGURAR LAS RUTAS DE LA PAGINA
export enum EPathPage {
  PATH_FORM_CLIENT = '/register/client',
  PATH_FORM_TASKER = '/register/tasker',
  PATH_TERMS = '/register/terms',
  PATH_PRIVACY = '/register/privacity',
}

// ENUM PARA TIPOS DE INPUTS
export enum EFieldType {
  Button = 'button',
  Checkbox = 'checkbox',
  Color = 'color',
  Date = 'date',
  DateTimeLocal = 'datetime-local',
  Email = 'email',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Radio = 'radio',
  Range = 'range',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}
