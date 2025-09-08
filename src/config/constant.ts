import { EGroupCheckBox } from "../types/enums.js";
import { iDataByStep, iFormStateValidation, iNames, iPhatPages, IStateGlobalValidationStep } from "../interfaces/interfaces.js";
import { TCategoryConfig, TCategoryKey, TOptionItem, TStatusByRegister } from "../types/types.js"; //IMPORTO  LOS MODULOS NECESARIOS DE TIPOS

// REPARACIÓN Y MANTENIMIENTO
export const REPAIR_AND_MAINTENANCE: TOptionItem[] = [
  { label: 'Plomería', value: 'plomeria' },
  { label: 'Electricidad', value: 'electricidad' },
  { label: 'Pintura', value: 'pintura' },
  { label: 'Carpintería', value: 'carpinteria' },
  { label: 'Electrodomésticos', value: 'electrodomesticos' },
  { label: 'Aire acondicionado', value: 'aire acondicionado' },
  { label: 'Herrería', value: 'herreria' },
  { label: 'Construcción en seco', value: 'construccion en seco' }
];

// MUDANZA Y TRANSPORTE
export const MOVING_AND_TRANSPORT: TOptionItem[] = [
  { label: 'Mudanzas particulares', value: 'mudanzas particulares' },
  { label: 'Mudanzas comerciales', value: 'mudanzas comerciales' },
  { label: 'Mudanzas locales', value: 'mudanzas locales' },
  { label: 'Mudanzas larga distancia', value: 'mudanzas larga distancia' },
  { label: 'Fletes por hora/viaje', value: 'fletes por hora/viaje' },
  { label: 'Transporte de muebles', value: 'transporte de muebles' },
  { label: 'Transporte de electrodomésticos', value: 'transporte de electrodomésticos' },
  { label: 'Traslado de objetos frágiles', value: 'traslado de objetos frágiles' }
];

// JARDINERÍA Y MANTENIMIENTO EXTERIOR
export const GARDENNING_AND_OUTDOOR_MAINTENANCE: TOptionItem[] = [
  { label: 'Corte de pasto', value: 'corte de pasto' },
  { label: 'Poda de árboles', value: 'poda de árboles' },
  { label: 'Poda de arbustos', value: 'poda de arbustos' },
  { label: 'Desmalezado', value: 'desmalezado' },
  { label: 'Limpieza de jardín', value: 'limpieza de jardín' },
  { label: 'Fertilización/mantenimiento césped', value: 'fertilización/mantenimiento césped' },
  { label: 'Plantación/reparación césped', value: 'plantación/reparación césped' },
];

// HABITOS/CONTEXTOS DE TRABAJOS
export const CONTEXTS: TOptionItem[] = [
  { label: 'Hogar', value: 'hogar' },
  { label: 'Comercios', value: 'comercios' },
  { label: 'Oficina', value: 'oficina' },
  { label: 'Industria', value: 'industria' }
];

// HABITOS/CONTEXTOS DE TRABAJOS
export const DATE_DAYS: TOptionItem[] = [
  { label: 'Lunes', value: 'lunes' },
  { label: 'Martes', value: 'martes' },
  { label: 'Miércoles', value: 'miércoles' },
  { label: 'Jueves', value: 'jueves' },
  { label: 'Viernes', value: 'viernes' },
  { label: 'Sabado', value: 'sabado' },
  { label: 'Domingo', value: 'domingo' },
];

// HABITOS/CONTEXTOS DE TRABAJOS
export const DATE_HOUR: TOptionItem[] = [
  { label: 'Mañana', value: 'mañana' },
  { label: 'Tarde', value: 'tarde' },
  { label: 'Noche', value: 'noche' },
  { label: 'Las 24hs', value: 'las 24hs' },
];

//VALORES REALES DE CADA TYPE
export const TITLES_GROUP_CHECKS_MAP: Record<string, string> = {
  service: 'Tus servicios',
  context: 'Área de servicio',
  day: 'Días',
  hour: 'Horarios',
};

// CONFIGURACION PARA REGISTRO DE USUARIOS
export const formState: TStatusByRegister = {
  hasContext: false, //ESTADO GLOBAL SI TIENE EL GRUPO CONTEXTO O NO
  stepStatus: {}, //ESTADO GLOBAL DE PASOS,OBJETO QUE PUEDE MUTAR
  // ESTADO DE MAPEO DE VALIDACION DE PASOS OBJETO QUE PUEDEN MUTAR
  validationTypesByStep: {
    0: 'client',
    1: 'selectedCategoryAndCheckBoxes',
    2: 'filesAndDescription',
    3: 'radioBudgetFull',
    4: 'text',
  },
  dataByStep: {} as Partial<iDataByStep>
};

// CONFIGURACION DE SELECTS DE CATEGORIAS
export const categoryConfigs: Record<TCategoryKey, TCategoryConfig> = {
  'reparacion-mantenimiento': {
    hasContext: true,
    budget: true,
    options: [
      { vectorGroupItemCheck: REPAIR_AND_MAINTENANCE, type: 'service' },
      { vectorGroupItemCheck: CONTEXTS, type: 'context' },
      { vectorGroupItemCheck: DATE_DAYS, type: 'day' },
      { vectorGroupItemCheck: DATE_HOUR, type: 'hour' },
    ]
  },

  'jardineria': {
    hasContext: true,
    budget: false,
    options: [
      { vectorGroupItemCheck: GARDENNING_AND_OUTDOOR_MAINTENANCE, type: 'service' },
      { vectorGroupItemCheck: CONTEXTS, type: 'context' },
      { vectorGroupItemCheck: DATE_DAYS, type: 'day' },
      { vectorGroupItemCheck: DATE_HOUR, type: 'hour' },
    ]
  },

  'mudanza-transporte': {
    hasContext: false,
    budget: false,
    options: [
      { vectorGroupItemCheck: MOVING_AND_TRANSPORT, type: 'service' },
      { vectorGroupItemCheck: DATE_DAYS, type: 'day' },
      { vectorGroupItemCheck: DATE_HOUR, type: 'hour' },
    ]
  }
};

// CONFIGURACION PARA MENSAJES DE ERROR EN CAMPOS
export const formStateValidField: iFormStateValidation = {
  fullName: {
    value: "",
    error: "",
    isValid: false,
  },
  userName: {
    value: "",
    error: "",
    isValid: false,
  },
  email: {
    value: "",
    error: "",
    isValid: false,
  },
  location: {
    value: "",
    error: "",
    isValid: false,
  },
  password: {
    value: "",
    error: "",
    isValid: false,
  },
  confirmPassword: {
    value: "",
    error: "",
    isValid: false,
  },
  category: {
    value: "",
    error: "",
    isValid: false,
  },
  "service[]": {
    value: "",
    error: "",
    isValid: false,
  },
  "context[]": {
    value: "",
    error: "",
    isValid: false,
  },
  "day[]": {
    value: "",
    error: "",
    isValid: false,
  },
  "hour[]": {
    value: "",
    error: "",
    isValid: false,
  },
  budgeSelected: {
    value: "",
    error: "",
    isValid: false,
  },
  reinsert: {
    value: "",
    error: "",
    isValid: false,
  },
  amountBudge: {
    value: "",
    error: "",
    isValid: false,
  },
  descriptionUser: {
    value: "",
    error: "",
    isValid: false,
  },
  imageProfile: {
    value: "",
    error: "",
    isValid: false,
  },
  imageExperiences: {
    value: "",
    error: "",
    isValid: false,
  }
}

//CONFIG GROUP CHECKBOX PROFESSIONAL
export const namesCheckBoxes: iNames = {
  service: EGroupCheckBox.SERVICE,
  context: EGroupCheckBox.CONTEXT,
  day: EGroupCheckBox.DAY,
  hour: EGroupCheckBox.HOUR
};

// OBJETO QUE PERMITE ACTULIZAR LOS ESTADOS DE CAMPOS EN CADA PASO A LA ESTRATEGIA
export const globalStateValidationStep: IStateGlobalValidationStep = {
  isValidExperiences: false,
  isValidProfile: false,
  isValidDescription: false,
  isBudgeYes: false,
  isBudgeNo: false,
  isSelected: false,
  isValidBasic: false,
  isTerms: false,
  isValidCheckBoxesDetailsProfession: false,
  isValidBudgeAmount: false,
  errorAmount: '',
};

export const pathPages: iPhatPages = {
  PATH_FORM_CLIENT: '/src/pages/register-client.html',
  PATH_FORM_PROFESSIONAL: '/src/pages/register-pro.html',
  PATH_TERMS: '/src/pages/termsAndConditions.html',
  PATH_PRIVACY: '/src/pages/privacyPolicy.html',
}

