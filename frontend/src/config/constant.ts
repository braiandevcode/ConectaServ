import { EEndpoint, EGroupCheckBox, EPathDomain, EPathPage, EPortServerDomain } from "../types/enums.js";
import { iAbreviationURL, iDataByStep, iDomainUrlPath, iFieldConfig, iInputFieldOptions, iNamesGroupsChecks, iPhatPages } from "../interfaces/interfaces";
import { TBasicFieldNames, TCategoryConfig, TCategoryKey, TFieldsNameValidate, TFieldState, TInputName, TOptionItem, TStatusByRegister } from "../types/types"; //IMPORTO  LOS MODULOS NECESARIOS DE TIPOS

// REPARACIÓN Y MANTENIMIENTO
export const REPAIR_AND_MAINTENANCE: TOptionItem[] = [
  { label: "Plomería", value: "plomeria" },
  { label: "Electricidad", value: "electricidad" },
  { label: "Pintura", value: "pintura" },
  { label: "Carpintería", value: "carpinteria" },
  { label: "Electrodomésticos", value: "electrodomesticos" },
  { label: "Aire acondicionado", value: "aire acondicionado" },
  { label: "Herrería", value: "herreria" },
  { label: "Construcción en seco", value: "construccion en seco" },
];

// MUDANZA Y TRANSPORTE
export const MOVING_AND_TRANSPORT: TOptionItem[] = [
  { label: "Mudanzas particulares", value: "mudanzas particulares" },
  { label: "Mudanzas comerciales", value: "mudanzas comerciales" },
  { label: "Mudanzas locales", value: "mudanzas locales" },
  { label: "Mudanzas larga distancia", value: "mudanzas larga distancia" },
  { label: "Fletes por hora/viaje", value: "fletes por hora/viaje" },
  { label: "Transporte de muebles", value: "transporte de muebles" },
  { label: "Transporte de electrodomésticos", value: "transporte de electrodomésticos" },
  { label: "Traslado de objetos frágiles", value: "traslado de objetos frágiles" },
];

// JARDINERÍA Y MANTENIMIENTO EXTERIOR
export const GARDENNING_AND_OUTDOOR_MAINTENANCE: TOptionItem[] = [
  { label: "Corte de pasto", value: "corte de pasto" },
  { label: "Poda de árboles", value: "poda de árboles" },
  { label: "Poda de arbustos", value: "poda de arbustos" },
  { label: "Desmalezado", value: "desmalezado" },
  { label: "Limpieza de jardín", value: "limpieza de jardín" },
  { label: "Fertilización/mantenimiento césped", value: "fertilización/mantenimiento césped" },
  { label: "Plantación/reparación césped", value: "plantación/reparación césped" },
];

// CONFIGURACION DE ATRIBUTOS PARA LOS CAMPOS DEL FORMULARIO DE REGISTRO
export const fieldConfigs: Record<TInputName, iFieldConfig> = {
  amountBudge: {
    id: "amountBudge",
    name: "amountBudge",
    placeholder: "$15000",
    type: "text",
    required: true,
    disabled: true,
    "aria-label": "Monto a pagar en pesos",
    autofocus: false,
    autocomplete: false,
    value: "",
  },
  descriptionUser: {
    name: "descriptionUser",
    id: "descriptionUser",
    autocomplete: false,
    placeholder: "Cuentales a tus clientes sobre tí...",
    "aria-label": "Descripcion",
    lang: "es",
    spellcheck: true,
    disabled: false,
    required: true,
    value: "",
  },
  fullName: {
    name: "fullName",
    type: "text",
    placeholder: "Roberto Bustos",
    spellcheck: "true",
    lang: "es",
    "aria-label": "Nombre completo",
    autofocus: true,
    required: true,
    autocomplete: false,
    id: "fullName",
    value: "",
  },
  userName: {
    id: "userName",
    name: "userName",
    type: "text",
    placeholder: "Test__",
    spellcheck: "true",
    lang: "es",
    "aria-label": "Nombre de usuario",
    autocomplete: false,
    required: true,
    value: "",
  },
  email: {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "prueba@ejemplo.com",
    required: true,
    autocomplete: true,
    "aria-label": "Correo electrónico",
    value: "",
  },
  password: {
    id: "password",
    required: true,
    name: "password",
    type: "password",
    "aria-label": "Contraseña",
    placeholder: "****************",
    autocomplete: false,
    value: "",
  },
  confirmPassword: {
    id: "confirmPassword",
    required: true,
    name: "confirmPassword",
    type: "password",
    "aria-label": "Confirmar contraseña",
    placeholder: "****************",
    autocomplete: false,
    value: "",
  },
};

// HABITOS/CONTEXTOS DE TRABAJOS
export const CONTEXTS: TOptionItem[] = [
  { label: "Hogar", value: "hogar" },
  { label: "Comercios", value: "comercios" },
  { label: "Oficina", value: "oficina" },
  { label: "Industria", value: "industria" },
];

// HABITOS/CONTEXTOS DE TRABAJOS
export const DATE_DAYS: TOptionItem[] = [
  { label: "Lunes", value: "lunes" },
  { label: "Martes", value: "martes" },
  { label: "Miércoles", value: "miércoles" },
  { label: "Jueves", value: "jueves" },
  { label: "Viernes", value: "viernes" },
  { label: "Sabado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
];

// HABITOS/CONTEXTOS DE TRABAJOS
export const DATE_HOUR: TOptionItem[] = [
  { label: "Mañana", value: "mañana" },
  { label: "Tarde", value: "tarde" },
  { label: "Noche", value: "noche" },
  { label: "Las 24hs", value: "las 24hs" },
];

//VALORES REALES DE CADA TYPE
export const TITLES_GROUP_CHECKS_MAP: Record<string, string> = {
  service: "Tus servicios",
  context: "Área de servicio",
  day: "Días",
  hour: "Horarios",
};

// CONFIGURACION PARA REGISTRO DE USUARIOS
export const formState: TStatusByRegister = {
  hasContext: false, //ESTADO GLOBAL SI TIENE EL GRUPO CONTEXTO O NO
  stepStatus: {}, //ESTADO GLOBAL DE PASOS,OBJETO QUE PUEDE MUTAR
  // ESTADO DE MAPEO DE VALIDACION DE PASOS OBJETO QUE PUEDEN MUTAR
  validationTypesByStep: {
    0: "client",
    1: "selectedCategoryAndCheckBoxes",
    2: "filesAndDescription",
    3: "radioBudgetFull",
    4: "text",
  },
  dataByStep: {} as Partial<iDataByStep>,
};

// CONFIGURACION DE SELECTS DE CATEGORIAS
export const categoryConfigs: Record<TCategoryKey, TCategoryConfig> = {
  "reparacion-mantenimiento": {
    hasContext: true,
    budget: true,
    options: [
      { vectorGroupItemCheck: REPAIR_AND_MAINTENANCE, type: "service" },
      { vectorGroupItemCheck: CONTEXTS, type: "context" },
      { vectorGroupItemCheck: DATE_DAYS, type: "day" },
      { vectorGroupItemCheck: DATE_HOUR, type: "hour" },
    ],
  },

  jardineria: {
    hasContext: true,
    budget: false,
    options: [
      { vectorGroupItemCheck: GARDENNING_AND_OUTDOOR_MAINTENANCE, type: "service" },
      { vectorGroupItemCheck: CONTEXTS, type: "context" },
      { vectorGroupItemCheck: DATE_DAYS, type: "day" },
      { vectorGroupItemCheck: DATE_HOUR, type: "hour" },
    ],
  },

  "mudanza-transporte": {
    hasContext: false,
    budget: false,
    options: [
      { vectorGroupItemCheck: MOVING_AND_TRANSPORT, type: "service" },
      { vectorGroupItemCheck: DATE_DAYS, type: "day" },
      { vectorGroupItemCheck: DATE_HOUR, type: "hour" },
    ],
  },
};

export const FIELDS_NAME_TO_VALIDATE = ["fullName", "userName", "email", "location", "password", "confirmPassword", "category", "service[]", "context[]", "day[]", "hour[]", "budgeSelected", "reinsert", "amountBudge", "descriptionUser", "imageProfile", "imageExperiences", "emailCode", "terms"] as const;

// LISTA INMUTABLE PARA TIPOS DE FORMULARIOS
export const TYPES_FORM = ["login", "verifyCode", "register"] as const;

// LISTA INMUTABLE PARA TIPOS DE PASOS
export const TYPES_STEP = ["stepRegister", "stepLayout", "stepNavigation"] as const;

// LISTA INMUTABLE PARA TIPOS DE PASOS EN FORMULARIO DE REGISTRO
export const TYPES_FORM_STEP = ["stepZero", "stepOne", "stepTwo", "stepLast", "stepBudgeThree"] as const;

// LISTA INPUTABLE DE PASOS QUE ESPECIFICAN LOS CAMPOS EXISTENTES A VALIDAR
export const FIELDS_STEP = ["client", "selectedCategoryAndCheckBoxes", "filesAndDescription", "radioBudgetFull", "text"] as const;

// LISTA INPUTABLE DE TIPOS DE MODALES
export const MODALS_TIYPE = ["loader", "success", "warn", "error", "login", "register", "codeVerify", "info"] as const;

// LISTA INMUTABLE DE NOMBRES DE CAMPOS "readonly" con as const
export const FIELDS_NAMES = ["fullName", "userName", "email", "password", "confirmPassword", "descriptionUser", "amountBudge"] as const;

//CONFIG GROUP CHECKBOX PROFESSIONAL
export const namesCheckBoxes: iNamesGroupsChecks = {
  service: EGroupCheckBox.SERVICE,
  context: EGroupCheckBox.CONTEXT,
  day: EGroupCheckBox.DAY,
  hour: EGroupCheckBox.HOUR,
};

// OBJETO QUE PERMITE ACTULIZAR LOS ESTADOS DE CAMPOS EN CADA PASO A LA ESTRATEGIA
// export const globalStateValidationStep: IStateGlobalValidationStep = {
//   isValidExperiences: false,
//   isValidProfile: false,
//   isValidDescription: false,
//   isBudgeYes: false,
//   isBudgeNo: false,
//   isSelected: false,
//   isSelectedLocation: false,
//   isValidBasic: false,
//   isTerms: false,
//   isValidCheckBoxesDetailsProfession: false,
//   isValidBudgeAmount: false,
// };

// VALIDAMOS SI ESTAMOS EN PRODUCCION O EN DESARROLLO
const isProduction = EPathDomain.HOST_EXTERNAL !== "";
const HOST: string = isProduction ? EPathDomain.HOST_EXTERNAL : EPathDomain.HOST_LOCAL;

// DEFINIMOS LA URL BASE PARA BACKEND Y FRONTEND
const BASE_BACK_URL = `${HOST}${EPortServerDomain.PORT_BACK}`;
const BASE_FRONT_URL = `${HOST}${EPortServerDomain.PORT_FRONT}`;

// ABREVIACIONES PARA ENDPOINTS ESPECIFICOS DEL BACKEND
const configurationAbreviationURL: iAbreviationURL = {
  BACK_ABREVIATION_CLIENT: `${BASE_BACK_URL}${EEndpoint.REGISTER_CLIENT}`,
  BACK_ABREVIATION_PRO: `${BASE_BACK_URL}${EEndpoint.REGISTER_PROFESSIONAL}`,
};

// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const domainURLPath: iDomainUrlPath = {
  URL_SERVER_CLIENT: configurationAbreviationURL.BACK_ABREVIATION_CLIENT,
  URL_SERVER_PROFESSIONAL: configurationAbreviationURL.BACK_ABREVIATION_PRO,
  URL_LOCAL_FRONT: BASE_FRONT_URL,
};

// RUTAS RELATIVAS DEL PROYECTO
export const pathPages: iPhatPages = {
  PATH_FORM_CLIENT: EPathPage.PATH_FORM_CLIENT,
  PATH_FORM_PROFESSIONAL: EPathPage.PATH_FORM_PROFESSIONAL,
  PATH_TERMS: EPathPage.PATH_TERMS,
  PATH_PRIVACY: EPathPage.PATH_PRIVACY,
};

export const fieldsBasic: TBasicFieldNames[] = ["fullName", "userName", "email", "password", "confirmPassword"];

// CREAR CONFIGURACION ACUMULANDO OBJETOS POR SU NAME
// CONFIGURACION PARA MENSAJES DE ERROR EN CAMPOS
export const formStateValidField: Record<TFieldsNameValidate, TFieldState> = FIELDS_NAME_TO_VALIDATE.reduce((acc, field) => {
  acc[field] = { value: "", error: "", isValid: false }; //EJ PRIMER ITERACION: => fullName: { value: "", error: "", isValid: false }
  return acc; //=> ACUMULADOR
}, {} as Record<TFieldsNameValidate, TFieldState>);
