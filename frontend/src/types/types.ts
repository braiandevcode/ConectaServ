import { iFormStateValidation } from "../interfaces/interfaces";
import { ECategoryKey } from "./enums";

// TIPADO PARA CADA PASOS DE FORMULARIO
export type TFormStep = {
  step: number;
  formSelector: string;
  btnSelector: string;
}

// TIPADO QUE ESPECIFICAN COMBINACIONES O NO EN  CADA PASO, SEGUN LAS VARIANTES DE DE TIPOS DE ENTRADA QUE SE ENCUENTRAN
export type TInputs = 'client' | 'selectedCategoryAndCheckBoxes' | 'filesAndDescription' | 'radioBudgetFull' | 'text';

export type  TElementStep = HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLDivElement | null;

// TIPADO PARA FUNCION QUE SOLO ESPERA CAMPOS DE ENTRADA DE INPUTS O SELECTS
export type TFormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// TIPO DE OBJETO PARA CAMPOS DEL PASO 4
export type TToggleBudgetFieldsProps = {
  isBudgeYes:boolean;
  elementRadioReinsert?: NodeListOf<HTMLInputElement> | null;
  elementInputAmount: HTMLInputElement | null;
  elementBtn: HTMLButtonElement | null | undefined;
  fieldName: TFieldName;
};

// TIPADO PARA LOS ITEMS DE CHECKBOX DE ELECCIONES POR CADA CATEGORIA
export type TOptionItem = {
  label: string;
  value: string;
};

// DATOS PRINCIPALES DE ESTADOS Y DATOS DE PERSISTENCIA DEL USUARIO
export type TStatusByRegister = {
  hasContext: boolean,
  stepStatus: Record<number, boolean>,
  validationTypesByStep: Record<number, TInputs>
  dataByStep: Record<string, any>
}
// TIPADO DE LOS NOMBRES DE LAS CATEGORIAS
export type TCategoryKey = ECategoryKey.REPAIR | ECategoryKey.GARDEN | ECategoryKey.MOVE;

// TIPADO DE GRUPOS DE CHECKBOXES
export type TOptionTypeGroup = 'service' | 'context' | 'day' | 'hour';

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
  type: string;
  container: HTMLElement | null;
}


// ----------------TIPADOS PARA DIFERENTES VALIDACIONES DE CAMPOS---------------------//
export type TFieldName = keyof iFormStateValidation;

export type TValidateFieldParams = {
  fieldName: TFieldName | string;
  value: string;
  values:string[];
  file: File | null;
  files: FileList | null
};

//---------------------CONFIGUARACION DE TIPADO PARA PARAMETROS DE CALLBACK EN FORMULARIO DE REGISTRO------------------------//
// TIPADO PARA PROFESIONAL
export type TCbEventPropsRegistro = {
  step: number;
  e?: Event;
  form?: HTMLFormElement;
  context?: {
    btn?:HTMLButtonElement | null;
    budgeSelect?: HTMLInputElement;
    isValidFinal?: boolean;
    errorFinal?: string;
    listSectionProfile?: string[];
  };
};

// TIPADO CLIENTE
export type TCbEventPropsRegistroCliente = {
  target?: TFormElement;
  e?: Event;
  form?: HTMLFormElement;
  step?: number;
  context?: {
    btn?: HTMLButtonElement | null | undefined;
    isValidAll: boolean;
    checkboxChecked: boolean;
  };
};

export type TData = string | string[] | number | boolean;