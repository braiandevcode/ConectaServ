// IMPORTACIONES
import FormRegisterUI from "modules/form/register/ui/FormRegisterUI.js";
import FormRegister from "../modules/form/register/FormRegister.js";
import { EDefaultSelected, EKeyDataByStep } from "../types/enums.js";
import { TCategoryKey, TFieldState, TFieldType, TFormElement, TTypeBtn, TWithOptional } from "../types/types";
import FormStepUI from "modules/form/register/ui/stepsUI/FormStepUI.js";

// INTERFACE OBSERVER
export interface iOnchangeObserver {
  containerSelector: string; //SELECTOR DINAMICO DE REFERENCIA
  onChangeDOM: () => void; // METODO DE CAMBIOS EN EL DOM
}

// TIPO PARA FUNCION DE ESCUCHA DE EVENTO DE CAMBIO O EVENTO INPUT
export interface iListenerChangeOrInput {
  element: HTMLFormElement | TFormElement;
  callback: (event: Event) => void;
}

// INTERFACE CATEGORIA
export interface iFormSelectCategory {
  formContainerGroups: HTMLDivElement;
  step?: number;
  target?: HTMLElement;
  e?: Event;
}

// TIPO DE INTERFACE PARA FUNCION DE TOGGLE DE AÑADIR/REMOVER CLASE EN ELEMENTO
export interface iToggleClassElement {
  container: HTMLElement | null;
  className: string;
  isRemoveClass: boolean;
}

// TIPO DE INTERFACE PARA FUNCION REUTILIZABLE DE RADIO BUTTONS
export interface iRadioButton {
  inputs: NodeListOf<HTMLInputElement>;
  name: string;
  value?: string;
}

// DATOS DEL REGISTRO DEL PROFESIONAL
export interface iDataByStep {
  [EKeyDataByStep.ZERO]: {
    fullName: string;
    username: string;
    email: string;
    location: string;
    terms: boolean;
  };
  [EKeyDataByStep.ONE]: {
    category: TCategoryKey; //SOLO CATEGORIA SELECCIONADA
    service: string[];
    context?: string[]; // SOLO PARA CATEGORIAS "jardinaria" y "reparacion y mantenimiento"
    day: string[];
    hour: string[];
  };

  [EKeyDataByStep.TWO]: {
    profileImage?: string;
    experienceImages?: string[];
    description?: string;
  };

  [EKeyDataByStep.THREE]: {
    budgetSelected: string;
    budgetAmount: number;
    reinsert: string;
  };
  [EKeyDataByStep.FOUR]: {
    fullName: string;
    username: string;
    email: string;
    location: string;
    terms: boolean;
  };
}

export interface iFormStateValidation {
  // PASO 0, 3 o 4 BASICO
  fullName: TFieldState;
  userName: TFieldState;
  email: TFieldState;
  location: TFieldState;
  password: TFieldState;
  confirmPassword: TFieldState;

  // PASO 1 CATEGORIA
  category: TFieldState;
  "service[]": TFieldState;
  "context[]": TFieldState;
  "day[]": TFieldState;
  "hour[]": TFieldState;

  // PASO 2 PERFIL
  descriptionUser: TFieldState;
  imageProfile: TFieldState;
  imageExperiences: TFieldState;

  // PASO 3 (PRESUPUESTO SI INCLUYE SOLO VALIDAR EL CAMPO DEL MONTO)
  amountBudge: TFieldState;
  budgeSelected: TFieldState;
  reinsert: TFieldState;

  emailCode: TFieldState;
}

// INTERFAZ CLIENTE
export interface iClient {
  fullName: string;
  userName: string;
  email: string;
  location: string;
  password: string;
}

export interface iNamesGroupsChecks {
  service: string;
  context: string;
  day: string;
  hour: string;
}

// INTERFACE PARA DEFINIR PARAMETROS EN FUNCION DE BOTON SIGUIENTE/ATRAS DEL REGISTRO
export interface iButtonsRegister {
  target: HTMLElement;
  section: HTMLDivElement | null;
  btnPrev: HTMLDivElement | null;
  selectCategory: HTMLSelectElement | null;
}

// INTERFACE PARA DEFINIR PARAMETROS EN FUNCION DE BOTON SIGUIENTE/ATRAS DEL REGISTRO
export interface iButtonsRegister {
  target: HTMLElement;
  section: HTMLDivElement | null;
  btnPrev: HTMLDivElement | null;
  selectCategory: HTMLSelectElement | null;
}

// BASE COMÚN PARA TODAS LAS CALLBACKS DE EVENTOS DE FORMULARIOS
export interface iCbEventBaseProps {
  step?: number;
  e?: Event;
  form?: HTMLFormElement;
  context?: Record<string, any>; // CAMPOS ADICIONALES POR FORMULARIO
}

// INTERFAZ GENÉRICA PARA FUNCIONES DE EVENTOS (REUTILIZABLE SEGUN FORMULARIO)
export interface iFormEventHandler<T extends iCbEventBaseProps> {
  cbEvent: (props: T) => void;
  form: HTMLFormElement | null;
  btn?: HTMLButtonElement | null;
  step?: number;
}

// INTERFACE DE VALIDACION DE PERFIL
export interface IStateGlobalValidationStep {
  isValidExperiences: boolean;
  isValidProfile: boolean;
  isValidDescription: boolean;
  isBudgeYes: boolean;
  isBudgeNo: boolean;
  isSelected: boolean;
  isSelectedLocation: boolean;
  isValidBasic: boolean;
  isTerms: boolean;
  isValidCheckBoxesDetailsProfession: boolean;
  isValidBudgeAmount: boolean;
}

// INTERFAZ PARA  fieldsForms
export interface iFieldsForms {
  vNames: string[];
  formElement: HTMLFormElement;
  formatters: Record<string, (value: string | string[] | File[]) => string | number | string[]>;
  dataToSend: Record<string, string | number | string[]>;
}

// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iDomainUrlPath {
  URL_SERVER_CLIENT: string;
  URL_SERVER_PROFESSIONAL: string;
  URL_LOCAL_FRONT: string;
}

export interface iAbreviationURL {
  BACK_ABREVIATION_CLIENT: string;
  BACK_ABREVIATION_PRO: string;
}

// INTERFACES PARA URL DE PETICIONES
export interface iPhatPages {
  PATH_FORM_CLIENT: string;
  PATH_FORM_PROFESSIONAL: string;
  PATH_TERMS: string;
  PATH_PRIVACY: string;
}

// INTERFAZ ESPECIFICA PARA LOS SELECTED DEL FORMULARIO EN VALIDACIONES SIMILARES CON DIFERENTE VALUES Y MENSAJES
export interface IDefaultSelectedOnError {
  default: EDefaultSelected;
  error: "";
}

// INTERFACE ESPECIFICA PARA BOTON/ES DE MODALES
export interface iOptionsBtnsModals {
  text?: string;
  iconClass?: string;
  onClick?: (e?: MouseEvent | TouchEvent) => void | boolean | Promise<boolean> | Promise<void>;
  classesBtn?: string;
  classesParentButton?: string;
}

// OPCIONES DEL MODAL DE TIPO FORMULARIO
export interface iFormOptions {
  attributesForm?: Record<string, string>;
  containerMainForm?: HTMLElement,
  classListForm?: string;
  classGroupInputs?: string; //CLASES OPCIONALES PARA LOS CONTENEDORES (GRUPO) DE LOS INPUTS
  classContainerForm?: string;
  containerSelector: string;
}

export interface iMessageErrorField {
  text: string;
  classesParent?: string;
  classessChild?: string;
}

// CONTRATO DE INTERFACE DE CLASE "CustomModal" => TODOS OPCIONALES MENOS TITLE
export interface iModalOptions {
  title: string; // TITULO DEL MODAL
  message?: string; // MENSAJE DEL MODAL
  buttons?: Array<iOptionsBtnsModals>;
  iconClass?: string; // ICONO GRANDE CENTRADO EN MODAL
  parentContainerIconClass?: string;
  classesModal?: string;
  classesContainerModal?: string;
  container?: HTMLElement | null; // CONTENEDOR OPCIONAL DONDE SE INSERTA EL MODAL
}

// INTERFACE PARA ATRIBUTOS TIPICOS DE FORMULARIOS
export interface iAttributesContentForm {
  attrsInput: iFieldConfig;
  elementType?: "input" | "select" | "textarea"; //PARA TIPO DE ELEMENTO, FORMA MAS DECLARATIVA Y CLARA DE ANALIZAR QUE SE TIPO DE ELEMENTO CREARÁ.PD: instanceof SOLO SIRVE PARA ANALIZAR EN TIEMPO DE EJECUCIÓN NO DE CREACION.
  selectOptions?: { value: string; text: string; disabled?: boolean; selected?: boolean }[];
  attributesForm?: Record<string, string>;
}

// INTERFACE PARA OPCIONES DE UN BOTON
export interface iBtn {
  disabled: boolean;

  "aria-label"?: string;

  /**
   * ATRIBUTOS HTML ADICIONALES PARA EL BOTON.
   * EJEMPLO: { 'data-step': 2, disabled: true }
   */
  attrs?: Record<string, string | number | boolean>;

  /**
   * CLASES CSS PARA EL ICONO DENTRO DEL BOTON.
   */
  iconBtnClasses?: string;

  /**
   * CLASES CSS PARA EL PROPIO BOTON.
   */
  classesBtn?: string;

  /**
   *TEXTO DEL BOTON (OPCIONAL).
   */
  btnText?: string;

  /**
   * TIPO BOTON HTML.
   */
  type: TTypeBtn;
}

// INTERFACE PARA CONSTRUCCION DE PASOS
// export interface iBuildStepUI {
//   buildStep<T extends { formRegisterUI: FormRegisterUI }>(
//     param: T
//   ): HTMLDivElement | void | Promise<HTMLElement | void>;
// }

export interface iBuildStepUI {
  buildStep(
    param: { formRegisterUI: FormRegisterUI; }
  ): HTMLDivElement | void | Promise<HTMLElement | void>;
}
// INTERFAZ PARA CONSTRUIR EL DOM DE FORMULARIO
export interface iBuildFormUI {
  buildForm(): void;
}

// INTERFAZ BASE
export interface iBaseFieldOptions {
  name: string;
  id?: string;
  value: string;
  required: boolean;
  disabled: boolean;
  autofocus?: boolean;
}

// INTERFACE PARA BOTONES QUE NECESITEN IMPLEMENTAR SU TEXTO
export interface iBtnText {
  setText(text: string): void;
}

// INTERFACE PARA BOTONES QUE NECESITEN IMPLEMENTAR SU ICONO
export interface iBtnIcon {
  setIcon(iconClass: string): void;
}

export interface iTextField {
  "aria-label"?: string;
  spellcheck?: boolean | "true" | "false";
  lang?: string;
  autocomplete: boolean;
}

export interface iFieldConfig {
  id: string;
  name: string;
  value: string;
  type?: TFieldType; // text, email, password, etc.
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  spellcheck?: boolean | "true" | "false";
  lang?: string;
  autocomplete: boolean;
  "aria-label"?: string;
}

// INTERFACES ESPECÍFICAS
// PARA SELECTS
export interface iSelectFieldOptions extends iBaseFieldOptions {
  // ATRIBUTOS PARA LOS OPTIONS
  items: { value: string; text: string; disabled?: boolean; selected?: boolean }[];
  "aria-label"?: string;
}

// PARA CAMPOS NORMALES text, password etc.
export interface iInputFieldOptions extends iBaseFieldOptions, iTextField {
  type: TFieldType;
  placeholder?: string;
}

export interface iInputFieldCheckOptions extends TWithOptional<iBaseFieldOptions, "id" | "autofocus"> {
  checked: boolean;
  type: string;
}

// PARA CAMPOS DE ARCHIVOS
export interface iInputFileOptions extends iBaseFieldOptions {
  accept?: string;
  multiple?: boolean;
  type: TFieldType;
}

export interface iTextAreaFieldOptions extends iBaseFieldOptions, iTextField {
  rows: number;
  cols: number;
  placeholder?: string;
  textContent?: string;
}

// PARA CAMPOS DE ARCHIVOS
export interface iTextAreaFileOptions extends iBaseFieldOptions {
  accept?: string;
  multiple?: boolean;
  type: TFieldType;
  placeholder: string;
}

// INTERFACE PARA RETORNO DE VALIDACIONES EN CAMPOS
export interface iValidateField {
  validateField(value: string): TFieldState;
}

export interface IValidator {
  validate(value?: string | File | FileList | null): TFieldState;
}