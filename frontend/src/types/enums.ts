// TIPO DE CATEGORIAS VALIDAS
export enum ECategoryKey {
  REPAIR = 'reparacion-mantenimiento',
  GARDEN = 'jardineria',
  MOVE = 'mudanza-transporte',
  NONE = 'none',
}

export enum EYesOrNo {
  YES = 'yes',
  NO = 'no',
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
  SERVICE = 'service',
  WORK_AREA = 'workArea',
  DAY = 'day',
  HOUR = 'hour',
}

// ENUM PARA CADA ENTIDAD DE UN GRUPO DE DETALLES DE TRABAJO DEL TASKER
export enum EEntitiesGroup {
  SERVICE_DATA = 'serviceData',
  WORK_AREA_DATA = 'workAreaData',
  DAY_DATA = 'dayData',
  HOUR_DATA = 'hourData',
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
  IS_VERIFY_CODE = 'isVerified',
}

//ENUM PARA LA CONFIGURACION DE LAS RUTAS DE PETICIONES ENDPOINTS
export enum EEndpoint {
  USER = '/api/v1/users',
  USER_CODE_REQUEST = '/api/v1/code/request',
  USER_VERIFY = '/api/v1/users/verify',
  USER_CODE_DELETE = '/api/v1/code',
  USER_IDENTIFY = '/api/v1/users/identify',
  CODE_VERIFY = '/api/v1/code/verify',
  AUTH = '/api/v1/auth/login',
  AUTH_ME = '/api/v1/auth/me',
  REFRESH = '/api/v1/auth/refresh',
  LOGOUT = '/api/v1/auth/logout',
  ALL_TASKERS = '/api/v1/users/actives',
  IMAGE_PROFILE = '/api/v1/profile',
  IMAGES_EXP = '/api/v1/experiences',
  TASKER_INFO = '/api/v1/users/tasker',
}

// ENUM PARA CONFIGURAR LAS RUTAS DE LA PAGINA
export enum EPathPage {
  PATH_FORM_CLIENT = '/client/register',
  PATH_FORM_TASKER = '/tasker/register',
  PATH_TERMS_CLIENT = '/client/register/terms',
  PATH_PRIVACY_CLIENT = '/client/register/privacity',
  PATH_TERMS_TASKER = '/tasker/register/terms',
  PATH_PRIVACY_TASKER = '/tasker/register/privacity',
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
