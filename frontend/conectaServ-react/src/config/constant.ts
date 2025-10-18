import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient.js';
import type { iFormStateValidationPro } from '../interfaces/iFormStateValidationPro.js';
import type { iEndPointRegister, iNamesGroupsChecks, iPhatPages } from '../interfaces/interfaces.js';
import { ECategoryKey, EDataClient, EEndpoint, EGroupCheckBox, EKeyDataByStep, ELocationKey, EPathPage } from '../types/enums.js';
import type { TCategoryKey } from '../types/typeCategory.js';
import type { TCategoryConfig } from '../types/typeConfigCategory.js';
import type { TDataClient } from '../types/typeDataClient.js';
import type { TOptionItem } from '../types/typeOptionItem.js';
import { type TBasicFieldNames } from '../types/types'; //IMPORTO  LOS MODULOS NECESARIOS DE TIPOS
import type { TStepData } from '../types/typeStepData.js';

// ICONOS DE REACT
import { FaTools } from 'react-icons/fa';
import { FaBuilding } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoMdClock } from 'react-icons/io';

// REPARACIÓN Y MANTENIMIENTO
export const REPAIR_AND_MAINTENANCE: TOptionItem[] = [
  { label: 'Plomería', value: 'plomeria' },
  { label: 'Electricidad', value: 'electricidad' },
  { label: 'Pintura', value: 'pintura' },
  { label: 'Carpintería', value: 'carpinteria' },
  { label: 'Electrodomésticos', value: 'electrodomesticos' },
  { label: 'Aire acondicionado', value: 'aire acondicionado' },
  { label: 'Herrería', value: 'herreria' },
  { label: 'Construcción en seco', value: 'construccion en seco' },
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
  { label: 'Traslado de objetos frágiles', value: 'traslado de objetos frágiles' },
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
  { label: 'Industria', value: 'industria' },
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

// CONFIGURACION DE SELECTS DE CATEGORIAS
export const categoryConfigs: Record<Exclude<TCategoryKey, 'none'>, TCategoryConfig> = {
  'reparacion-mantenimiento': {
    options: [
      { options: REPAIR_AND_MAINTENANCE, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: CONTEXTS, type: 'context', icon: FaBuilding, title: 'Habitos' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },

  jardineria: {
    options: [
      { options: GARDENNING_AND_OUTDOOR_MAINTENANCE, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: CONTEXTS, type: 'context', icon: FaBuilding, title: 'Habitos' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },

  'mudanza-transporte': {
    options: [
      { options: MOVING_AND_TRANSPORT, type: 'service', icon: FaTools, title: 'Servicios' },
      { options: DATE_DAYS, type: 'day', icon: FaCalendarDays, title: 'Días' },
      { options: DATE_HOUR, type: 'hour', icon: IoMdClock, title: 'Horarios' },
    ],
  },
};

//CONFIG GROUP CHECKBOX PROFESSIONAL
export const namesCheckBoxes: iNamesGroupsChecks = {
  service: EGroupCheckBox.SERVICE,
  context: EGroupCheckBox.CONTEXT,
  day: EGroupCheckBox.DAY,
  hour: EGroupCheckBox.HOUR,
};

// DEFINIMOS LA URL BASE PARA BACKEND
const BASE_BACK_URL = `${import.meta.env.VITE_HOST}${import.meta.env.VITE_PORT}`;

// OBJETO FINAL QUE EXPORTAMOS CON LAS URLS COMPLETAS
export const endPointRegister: iEndPointRegister = {
  ENDPOINT_REGISTER_CLIENT: `${BASE_BACK_URL}${EEndpoint.CLIENT}`,
  ENDPOINT_REGISTER_PROFESSIONAL: `${BASE_BACK_URL}${EEndpoint.PROFESSIONAL}`,
};

// RUTAS RELATIVAS DEL PROYECTO
export const pathPages: iPhatPages = {
  PATH_FORM_CLIENT: EPathPage.PATH_FORM_CLIENT,
  PATH_FORM_PROFESSIONAL: EPathPage.PATH_FORM_PROFESSIONAL,
  PATH_TERMS: EPathPage.PATH_TERMS,
  PATH_PRIVACY: EPathPage.PATH_PRIVACY,
};

export const fieldsBasic: TBasicFieldNames[] = ['fullName', 'userName', 'email', 'password', 'confirmPassword'];

// CONFIGURACION INICIAL VALIDACION DE CAMPOS EN REGISTRO CLIENTE
export const formStateValidFieldClient: iFormStateValidationClient = {
  fullName: { value: '', error: '', isValid: false },
  userName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  location: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  confirmPassword: { value: '', error: '', isValid: false },
};

// CONFIGURACION INICIAL PARA MENSAJES DE ERROR EN CAMPOS REGISTRO PROFESIONAL
export const formStateValidField: iFormStateValidationPro = {
  // PASO 4
  fullName: { value: '', error: '', isValid: false },
  userName: { value: '', error: '', isValid: false },
  email: { value: '', error: '', isValid: false },
  location: { value: '', error: '', isValid: false },
  password: { value: '', error: '', isValid: false },
  confirmPassword: { value: '', error: '', isValid: false },

  // PASO 1 CATEGORIA
  category: { value: '', error: '', isValid: false },
  'context[]': { value: '', error: '', isValid: false },
  'service[]': { value: '', error: '', isValid: false },
  'day[]': { value: '', error: '', isValid: false },
  'hour[]': { value: '', error: '', isValid: false },
  // PASO 2 PERFIL
  descriptionUser: { value: '', error: '', isValid: true },
  imageProfile: { value: null, error: '', isValid: true },
  imageExperiences: { value: null, error: '', isValid: true },

  // PASO 3 (PRESUPUESTO)
  amountBudge: { value: '', error: '', isValid: false },
  budgeSelected: { value: 'no', error: '', isValid: false },
  reinsert: { value: 'no', error: '', isValid: false },

  // PASO EXTRA
  emailCode: { value: '', error: '', isValid: false },
};

// VALORES POR DEFECTO DE DATOS DE CLIENTE
export const emptyDataClient: TDataClient = {
  [EDataClient.DATA]: {
    fullName: '',
    userName: '',
    email: '',
    location: ELocationKey.NONE,
  },
};

// VALORES POR DEFECTO DE DATOS DE PROFESIONAL
export const emptyStepData: TStepData = {
  [EKeyDataByStep.ONE]: {
    category: ECategoryKey.NONE,
    'service[]': [],
    'context[]': [],
    'day[]': [],
    'hour[]': [],
    valueSelected: '',
  },
  [EKeyDataByStep.TWO]: {
    descriptionUser: '',
    imageProfile: null,
    imageExperiences: [],
  },
  [EKeyDataByStep.THREE]: {
    budgeSelected: 'no',
    reinsert: 'no',
    amountBudge: 0,
  },
  [EKeyDataByStep.FOUR]: {
    fullName: '',
    userName: '',
    email: '',
    location: ELocationKey.NONE,
  },
};
