import { TCategoryKey, TFormElement } from "../types/types";

// INTERFACE OBSERVER
export interface iOnchangeObserver {
    containerSelector: string; //SELECTOR DINAMICO DE REFERENCIA
    onChangeDOM: () => void; // METODO DE CAMBIOS EN EL DOM
}

// TIPO PARA FUNCION DE ESCUCHA DE EVENTO DE CAMBIO O EVENTO INPUT
export interface iListenerChangeOrInput {
    element: TFormElement;
    callback: () => void;
}

// INTERFACE CATEGORIA
export interface iFormSelectCategory {
    formContainerGroups: HTMLDivElement | null;
    formCategorySelected: HTMLSelectElement | null;
    groupServiceCheckbox: HTMLDivElement | null;
    groupDaysCheckbox: HTMLDivElement | null
    groupHoursCheckbox: HTMLDivElement | null;
    groupContextCheckbox: HTMLDivElement | null
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
        acceptedTerms: boolean;
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
        acceptedTerms: boolean;
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

    // PASO 2
    category: iFieldState;

    // PASO 4 (PRESUPUESTO SI INCLUYE SOLO VALIDAR EL CAMPO DEL MONTO)
    amountBudge: iFieldState;

    // PASO 5 PERFIL
    description: iFieldState;
    imageProfile: iFieldState;
    imageExperiences: iFieldState;
}
