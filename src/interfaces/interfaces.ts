import { TCategoryKey, TFormElement } from "../types/types";

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
    formContainerGroups: HTMLDivElement | null;
    step?: number;
    e: Event;
    form?: HTMLFormElement | null;
}

// TIPO DE INTERFACE PARA FUNCION DE TOGGLE DE AÑADIR/REMOVER CLASE EN ELEMENTO
export interface iToggleClassElement {
    container: HTMLElement | null;
    className: string[];
    isRemoveClass: boolean;
}

// TIPO DE INTERFACE PARA FUNCION REUTILIZABLE DE RADIO BUTTONS
export interface iRadioButton {
    inputs: NodeListOf<HTMLInputElement>;
    name: string;
    value?: string
}

// DATOS DEL REGISTRO DEL PROFESIONAL
export interface iDataByStep {
    "0": {
        fullName: string;
        username: string;
        email: string;
        location: string;
        terms: boolean;
    }
    "1": {
        fullName: string;
        username: string;
        email: string;
        location: string;
    };
    "2": {
        category: TCategoryKey; //SOLO CATEGORIA SELECCIONADA
    };
    "3": {
        service: string[];
        context?: string[]; // SOLO PARA CATEGORIAS "jardinaria" y "reparacion y mantenimiento"
        day: string[];
        hour: string[];
    };
    "4": {
        budgetSelected: string;
        budgetAmount: number;
        reinsert: string;
    };
    "5": {
        profileImage?: string;
        experienceImages?: string[];
        description?: string;
        terms: boolean;
    }
}

// INTERFACE PARA VALIDAR CAMPOS
export interface iFieldState {
    value: string;
    error: string;
    isValid: boolean;
}

export interface iFormStateValidation {
    // PASO 1 BASICO
    fullName: iFieldState;
    userName: iFieldState;
    email: iFieldState;
    location: iFieldState;
    password: iFieldState;
    confirmPassword: iFieldState;

    // PASO 2 CATEGORIA
    category: iFieldState;

    // PASO 3 DETALLES DE TRABAJOS
    "service[]": iFieldState;
    "context[]": iFieldState;
    "day[]": iFieldState;
    "hour[]": iFieldState;

    // PASO 4 (PRESUPUESTO SI INCLUYE SOLO VALIDAR EL CAMPO DEL MONTO)
    amountBudge: iFieldState;
    budgeSelected: iFieldState;
    reinsert: iFieldState;

    // PASO 5 PERFIL
    description: iFieldState;
    imageProfile: iFieldState;
    imageExperiences: iFieldState;
}


// INTERFAZ CLIENTE
export interface iClient {
    fullName: string,
    userName: string,
    email: string,
    location: string,
    password: string
}


export interface iNames {
    service: string;
    context: string;
    day: string;
    hour: string;
}

// INTERFACE PARA DEFINIR PARAMETROS EN FUNCION DE BOTON SIGUIENTE/ATRAS DEL REGISTRO
export interface iButtonsRegister {
    target: HTMLElement,
    section: HTMLDivElement | null,
    btnPrev: HTMLDivElement | null,
    selectCategory: HTMLSelectElement | null
}

// INTERFACE PARA DEFINIR PARAMETROS EN FUNCION DE BOTON SIGUIENTE/ATRAS DEL REGISTRO
export interface iButtonsRegister {
    target: HTMLElement,
    section: HTMLDivElement | null,
    btnPrev: HTMLDivElement | null,
    selectCategory: HTMLSelectElement | null
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
    isValidExperiences: boolean,
    isValidProfile: boolean,
    isValidDescription: boolean,
    isBudgeYes: boolean,
    isBudgeNo: boolean,
    isSelected: boolean,
    isValidBasic: boolean,
    isTerms: boolean,
    isValidCheckBoxesDetailsProfession: boolean,
    isValidBudgeAmount: boolean,
    errorAmount: string,
};

// INTERFAZ PARA  fieldsForms
export interface iFieldsForms {
    vNames: string[],
    formElement: HTMLFormElement,
    formatters: Record<string, (v: unknown) => string | number | string[]>,
    dataToSend: Record<string, string | number | string[]>
}

// INTERFACES PARA RUTAS DE LAS PAGINAS
export interface iPhatPages {
    PATH_FORM_CLIENT: string;
    PATH_FORM_PROFESSIONAL: string;
    PATH_TERMS: string;
    PATH_PRIVACY: string;
}

