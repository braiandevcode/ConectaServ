//---------------------------------ENUMS PARA EVITAR ERRORES Y PORQUE SE REUTILIZAN VARIA VECES-----------------------------------------
// TIPO DE CATEGORIAS VALIDAS
export enum ECategoryKey {
  REPAIR = "reparacion-mantenimiento",
  GARDEN = "jardineria",
  MOVE = "mudanza-transporte",
}

// INDICE DE PASOS
export enum EKeyDataByStep {
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
}

// NOMBRE DE CAMPOS DE LOS GRUPOS DE CHECKXBOXES (DETALLES DE PROFESION)
export enum EGroupCheckBox {
  SERVICE = "service[]",
  CONTEXT = "context[]",
  DAY = "day[]",
  HOUR = "hour[]",
}

// ENUM PARA VALORES POR DEFAULT DE SELECT
export enum EDefaultSelected {
  SELECT_LOCATION = "Seleccione una ciudad",
  SELECT_CATEGORY = "Seleccione una categoría",
}

// NOMBRE DE CLAVES PARA LOCALSTORAGE
export enum ENamesOfKeyLocalStorage {
  STEP_DATA = "stepData",
  CURRENT_STEP = "currentStep",
  IMAGE_INDEXED_DB = "my-image-db",
}

// ENUM PARA LA CONFIGURACION DE LAS RUTAS DE PETICIONES
export enum EEndpoint {
  REGISTER_PROFESSIONAL = '/professional',
  REGISTER_CLIENT = '/client',
}

// ENUM PARA LOS PUERTOS ACCESIBLE DE DOMINIOS
export enum EPortServerDomain{
  PORT_BACK='3000', // SRVIDOR BACKEND
  PORT_FRONT='5500' //FRONTEND
}

// ENUM PARA CONFIGURACION DE DOMINIOS
export enum EPathDomain{
  HOST_LOCAL= 'http://localhost:',
  HOST_EXTERNAL=''
}

// ENUM PARA CONFIGURAR LAS RUTAS DE LA PAGINA
export enum EPathPage {
  PATH_FORM_CLIENT = "/frontend/src/pages/register-client.html",
  PATH_FORM_PROFESSIONAL ="/frontend/src/pages/register-pro.html",
  PATH_TERMS = "/frontend/src/pages/termsAndConditions.html",
  PATH_PRIVACY = "/frontend/src/pages/privacyPolicy.html",
}

// ENUM PARA TIPOS DE INPUTS
export enum EFieldType {
  Button = "button",
  Checkbox = "checkbox",
  Color = "color",
  Date = "date",
  DateTimeLocal = "datetime-local",
  Email = "email",
  File = "file",
  Hidden = "hidden",
  Image = "image",
  Month = "month",
  Number = "number",
  Password = "password",
  Radio = "radio",
  Range = "range",
  Reset = "reset",
  Search = "search",
  Submit = "submit",
  Tel = "tel",
  Text = "text",
  Time = "time",
  Url = "url",
  Week = "week"
}
