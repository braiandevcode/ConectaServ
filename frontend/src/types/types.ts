// IMPORTACIONES
import FormValidationUI from '../modules/validators/ui/FormValidationUI.js';
import { FIELDS_NAME_TO_VALIDATE, FIELDS_NAMES, FIELDS_STEP, MODALS_TIYPE, TYPES_FORM, TYPES_FORM_STEP, TYPES_STEP } from '../config/constant.js';
import { iFormStateValidation, iInputFieldCheckOptions, iInputFieldOptions, iInputFileOptions, iSelectFieldOptions, iTextAreaFieldOptions } from '../interfaces/interfaces';
import { ECategoryKey, EFieldType, EKeyDataByStep, ELocationKey } from './enums.js';
import SelectFieldUI from '../modules/fields/ui/SelectFieldUI.js';
import InputFileUI from '../modules/fields/ui/InputFileUI.js';
import InputFieldUI from '../modules/fields/ui/InputFieldUI.js';
import TextAreaFieldUI from '../modules/fields/ui/TextAreaFieldUI.js';
import InputFieldCheckUI from '../modules/fields/ui/InputFieldCheckUI.js';
import SelectField from '../modules/fields/components/SelectField.js';
import InputField from '../modules/fields/components/InputField.js';
import InputFile from '../modules/fields/components/InputFile.js';
import TextAreaField from '../modules/fields/components/TextAreaField.js';
import InputFieldCheck from '../modules/fields/components/InputFieldCheck.js';
import FieldBase from '../modules/fields/entities/FieldBase.js';

// TIPADO PARA CADA PASOS DE FORMULARIO
export type TFormStep = {
  step: number;
  formSelector: string;
  btnSelector: string;
};

// TIPADO PARA TIPOS DE INSTANCIAS EN BOTONES
export type TInstanceOfButton = 'submit' | 'cancel' | 'reset' | 'custom' | 'next' | 'close' | 'prev';

// TIPADO PARA ATRIBUTO "type" EN BOTONES
export type TTypeBtn = 'button' | 'submit' | 'reset';

// TIPADO QUE ESPECIFICAN CADA PASO, SEGUN LAS VARIANTES DE TIPOS DE ENTRADA QUE SE ENCUENTRAN
export type TInputs = (typeof FIELDS_STEP)[number];

// TIPOS ACEPTABLES DE INPUTS EN CADA PASO
export type TElementStep = HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLDivElement | null;

// TIPADO PARA FUNCION QUE SOLO ESPERA CAMPOS DE ENTRADA DE INPUTS O SELECTS
export type TFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// HELPER TYPE
export type TWithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// TIPO DE OBJETO PARA CAMPOS DEL PASO 4
export type TToggleBudgetFieldsProps = {
  isBudgeYes: boolean;
  elementRadioReinsert?: NodeListOf<HTMLInputElement> | null;
  elementInputAmount: HTMLInputElement | null;
  elementBtn: HTMLButtonElement | null | undefined;
  fieldName: TFieldName;
  formValidationUI: FormValidationUI;
};

// TIPADO PARA LOS ITEMS DE CHECKBOX DE ELECCIONES POR CADA CATEGORIA
export type TOptionItem = {
  label: string;
  value: string;
};

// DATOS PRINCIPALES DE ESTADOS Y DATOS DE PERSISTENCIA DEL USUARIO
export type TStatusByRegister = {
  hasContext: boolean;
  stepStatus: Record<number, boolean>;
  validationTypesByStep: Record<number, TInputs>;
  dataByStep: Record<string, any>;
};
// TIPADO DE LOS NOMBRES DE LAS CATEGORIAS
export type TCategoryKey = ECategoryKey.REPAIR | ECategoryKey.GARDEN | ECategoryKey.MOVE;
export type TLocationKey = ELocationKey.OLAVARRIA | ELocationKey.AZUL | ELocationKey.TANDIL;
// TIPADO DE GRUPOS DE CHECKBOXES
export type TOptionTypeGroup = 'service' | 'context' | 'day' | 'hour';

// TIPOS DE INSTANCIAS DE MODALES
export type TModalType = (typeof MODALS_TIYPE)[number];
export type TFormRole = 'professional' | 'client';
export type TFormType = (typeof TYPES_FORM)[number];
export type TTypeStep = (typeof TYPES_STEP)[number];

// TIPO UNION
// export type TTypeFormRegisterStep = (typeof TYPES_FORM_STEP)[number];

export type TTypeFormRegisterStep = EKeyDataByStep;

export type TKeys = keyof typeof EKeyDataByStep;

// TIPADO PARA LOS GRUPOS DE UNA CATEGORIA Y LOS TIPOS
export type TCategoryOption = {
  vectorGroupItemCheck: TOptionItem[];
  type: TOptionTypeGroup;
};

// TIPADO PARA CONFIGURACION DE CATEGORIAS
export type TCategoryConfig = {
  hasContext: boolean;
  budget: boolean;
  options: TCategoryOption[];
};

// TIPADO NECESARIO PARA LA PARTE DE CREACION DE LOS GRUPOS DE CHECKBOXES
export type TOptionsCheckForm = {
  vectorGroupItemCheck: TOptionItem[];
  type: TOptionTypeGroup; //POR LAS DUDAS SI ALGO SE ROMPE PASARLO A ==> STRING
  container: HTMLElement | null;
  selectEl: HTMLSelectElement;
};

// ----------------TIPADOS PARA DIFERENTES VALIDACIONES DE CAMPOS---------------------//
export type TFieldName = keyof iFormStateValidation;

// TIPADO PARA OBJETO DE VALIDACION DE CAMPOS
export type TValidateFieldParams = {
  fieldName: TFieldName | string;
  value: string;
  values: string[];
  file: File | null;
  files: FileList | null;
};

// TIPADO PARA UUID
export type TIdString = `${string}-${string}-${string}-${string}-${string}`; //TIPO DE CADENA

// TIPADO PARA DATOS DE IMAGEN A PERSISTIR
export type TStoredImage = {
  name: string;
  type: string;
  size: number;
  idImage: TIdString;
  dataUrl?: string;
};

//---------------------CONFIGUARACION DE TIPADO PARA FORMULARIO DE REGISTRO------------------------//

// TIPO PARA ESTADO DEL CAMPO
export type TFieldState = {
  value: string | File | File[] | null;
  error: string;
  isValid: boolean;
};

export type TData = string | TIdString | string[] | number | boolean;

// SOLO PARA CAMPOS DE TEXTO DEL ULTIMO PASO
export type TBasicFieldNames = 'fullName' | 'userName' | 'email' | 'password' | 'confirmPassword';

export type TFieldType = `${EFieldType}`; //ESTO ASEGURA QUE TFieldType SEA EXACTAMENTE UNO DE LOS VALORES DEL ENUM (Y NO SUS CLAVES).

// TIPO SEGUN VALOR DE CADA CLAVE DE ENUM DE PASOS
export type TStep = `${EKeyDataByStep}`;

export type TInputName = (typeof FIELDS_NAMES)[number]; //MAPEO DE TIPO DE NAMES DE INPUT/TEXTAREA

export type TFieldsNameValidate = (typeof FIELDS_NAME_TO_VALIDATE)[number];

// TIPO PARA OBJETO GLOBAL CON SOLO VALORES BOOLEANOS
export type TBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never; //AQU SE HACE UNA OPERADOR TERNARIO DONDE EL VALOR DE LA "clave" SERA BOOLEANA O NEVER
}[keyof T]; //ESPECIFICANDO UN ARRAY DE PARES DEL OBJETO DINAMICO

// TIPO PARA OPCIONES DE ESPERA EN SETIMEOUT
export type WaitOptions<T> = {
  ms: number;
  cb?: () => T | Promise<T>;
};
export type TFieldOptionsMap = {
  select: iSelectFieldOptions;
  file: iInputFileOptions;
  input: iInputFieldOptions;
  textArea: iTextAreaFieldOptions;
  inputCheck: iInputFieldCheckOptions;
};

export type TFieldUIMap = {
  select: SelectFieldUI;
  file: InputFileUI;
  input: InputFieldUI;
  textArea: TextAreaFieldUI;
  inputCheck: InputFieldCheckUI;
};

export type TFieldValueMap = {
  select: string;
  input: string;
  file: FileList;
  inputCheck: string;
};

// CLASES CONCRETAS
export type TFieldConcreteMap = {
  select: SelectField;
  input: InputField;
  file: InputFile;
  textArea: TextAreaField;
  inputCheck: InputFieldCheck;
};

// RETORNOS GENERALES DE TIPO "FormFieldBase"
export type TFieldBaseMap = {
  select: FieldBase<string>;
  input: FieldBase<string>;
  file: FieldBase<FileList>;
  textArea: FieldBase<string>;
  fieldCheck: FieldBase<string>;
};

export type TTypeField = keyof TFieldOptionsMap;

// TIPAR PARA ATRIBUTOS ABIERTOS A CUALQUIER NOMBRE RESPETANDO SU TIPO DE CLAVE Y TIPO DE VALORES ADMITIDOS
export type TCustomAttributes = Record<string, string | number | boolean>;
