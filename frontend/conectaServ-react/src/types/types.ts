// IMPORTACIONES
import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import type { iFormStateValidation, iFormStateValidationClient } from '../interfaces/interfaces.js';
import { ECategoryKey, EDataClient, EFieldType, EKeyDataByStep, ELocationKey } from './enums.js';
import type React from 'react';

// TIPADO PARA TIPOS DE INSTANCIAS EN BOTONES
export type TInstanceOfButton = 'submit' | 'cancel' | 'reset' | 'custom' | 'next' | 'close' | 'prev';

// TIPADO PARA ATRIBUTO "type" EN BOTONES
export type TTypeBtn = 'button' | 'submit' | 'reset';

// TIPADO PARA LOS ITEMS DE CHECKBOX DE ELECCIONES POR CADA CATEGORIA
export type TOptionItem = {
  label: string;
  value: string;
};

// TIPADO DE LOS NOMBRES DE LAS CATEGORIAS
export type TCategoryKey = ECategoryKey.REPAIR | ECategoryKey.GARDEN | ECategoryKey.MOVE | ECategoryKey.NONE;
export type TLocationKey = ELocationKey.OLAVARRIA | ELocationKey.AZUL | ELocationKey.TANDIL | ELocationKey.NONE;
// TIPADO DE GRUPOS DE CHECKBOXES
export type TOptionWork = 'service' | 'context' | 'day' | 'hour';

export type TFormRole = 'professional' | 'client';

// TIPADO PARA LOS GRUPOS DE UNA CATEGORIA Y LOS TIPOS
export type TWorkGroupOption = {
  options: TOptionItem[];
  icon: string;
  title: string;
  type: TOptionWork;
};

// TIPADO PARA CONFIGURACION DE CATEGORIAS
export type TCategoryConfig = {
  options: TWorkGroupOption[];
};

// TIPADO NECESARIO PARA LA PARTE DE CREACION DE LOS GRUPOS DE CHECKBOXES
export type TOptionsCheckForm = {
  options: TOptionItem[];
  type: TOptionWork; //POR LAS DUDAS SI ALGO SE ROMPE PASARLO A ==> STRING
  container: HTMLElement | null;
  selectEl: HTMLSelectElement;
};

// ----------------TIPADOS PARA DIFERENTES VALIDACIONES DE CAMPOS---------------------//
export type TFieldName = keyof iFormStateValidation;

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
  value: string | File | FileList | TYesOrNo | TStoredImage | TStoredImage[] | string[] | null;
  error: string;
  isValid: boolean;
};

export type TData = string | TIdString | string[] | number | boolean;

// SOLO PARA CAMPOS DE TEXTO DEL ULTIMO PASO
export type TBasicFieldNames = 'fullName' | 'userName' | 'email' | 'password' | 'confirmPassword';

export type TFieldType = `${EFieldType}`; //ESTO ASEGURA QUE TFieldType SEA EXACTAMENTE UNO DE LOS VALORES DEL ENUM (Y NO SUS CLAVES).

// TIPO SEGUN VALOR DE CADA CLAVE DE ENUM DE PASOS
export type TStep = `${EKeyDataByStep}`;
export type TYesOrNo = 'yes' | 'no'; //TIPO PARA RADIOS REINTEGRO Y PRESUPUESTO

// TIPO PASO 1  (para guardar en STEP_DATA en localStorage)
export type TStepOne = {
  category: TCategoryKey;
  'service[]': string[];
  'context[]'?: string[];
  'day[]': string[];
  'hour[]': string[];
  valueSelected: string;
};

// TIPO PASO 2 (para guardar en STEP_DATA en localStorage)
export type TStepTwo = {
  imageProfile: TStoredImage | null;
  imageExperiences: TStoredImage[];
  descriptionUser: string;
};

// TIPO PASO 3 (para guardar en STEP_DATA en localStorage)
export type TStepThree = {
  amountBudge: number;
  budgeSelected: TYesOrNo;
  reinsert: TYesOrNo;
};

// TIPO PASO 4 (para guardar en STEP_DATA en localStorage)
export type TStepBasic = {
  fullName: string;
  userName: string;
  email: string;
  location: TLocationKey;
};

// TIPADO PARA DATOS DE PROFESIONAL DEFINIDO AL SERVIDOR
export type TAplanar = Omit<TStepOne, 'valueSelected'> &
  TStepTwo &
  TYesOrNo &
  TStepThree &
  TStepBasic & {
    password: string;
  };

// TIPADO PARA DATOS DE PROFESIONAL DEFINIDO AL SERVIDOR
export type TAplanarCliente = TStepBasic & {
  password: string;
};

//TIPO PASO 1 PARA CONTEXTO
export type TStepOneProps = {
  handleChangeSelected: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>, type: TOptionWork) => void;
  setValueSelected: React.Dispatch<React.SetStateAction<string>>;
  setHasContext: (hasContext: boolean) => void;
  setHasBudge: (hasBudge: boolean) => void;
  titleRef: React.RefObject<HTMLSelectElement | null>;
  hasContext: boolean;
  hasBudge: boolean;
  isStepValid: boolean;
  valueSelected: string;
};

// TIPO PARA EL PASO 2 PARA CONTEXTO
export type TStepTwoProps = {
  isResetDetailsWork: boolean;
  setIsResetDetailsWork: (isResetDetailsWork: boolean) => void;
  handleDescriptionInput: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  handleImageProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageExperiencesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

// TIPO PASO 3 PARA CONTEXTO
export type TStepThreeProps = {
  setIsBudgeMountDisabled: (isBudgetDisabled: boolean) => void;
  setIsReinsertDisabled: (isReinsertDisabled: boolean) => void;
  onChangeIsReinsert: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeIsBudge: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBudgeAmount: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurAmount: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocusAmount: () => void;
  setAmountFieldFormat: React.Dispatch<React.SetStateAction<string>>;
  amountFieldFormat: string;
  isBudgeMountDisabled: boolean;
  isReinsertDisabled: boolean;
};

// TIPO PASO 4 PARA CONTEXTO
export type TStepFourProps = {
  handleFullName: (e: React.FormEvent<HTMLInputElement>) => void;
  handleUserName: (e: React.FormEvent<HTMLInputElement>) => void;
  handleEmail: (e: React.FormEvent<HTMLInputElement>) => void;
  handleChangeLocation: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePassword: (e: React.FormEvent<HTMLInputElement>) => void;
  handleConfirmPassword: (e: React.FormEvent<HTMLInputElement>) => void;
  // setStoredFullName: React.Dispatch<React.SetStateAction<string>>;
  // setStoredUserName: React.Dispatch<React.SetStateAction<string>>;
  // setStoredEmail: React.Dispatch<React.SetStateAction<string>>;
  // setStoredLocation: React.Dispatch<React.SetStateAction<TLocationKey>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  // storedEmail: string;
  // storedUserName: string;
  // storedLocation: ELocationKey;
  // storedFullName: string;
  confirmPassword: string;
  password: string;
};

// TIPO PARA IMAGEN VISTA PREVIA PERFIL CONTEXTO
export type TProfileImagePreviewProps = {
  src: string | null;
  onDeleteProfile: (id: TIdString) => void;
  setSrc: React.Dispatch<React.SetStateAction<string | null>>;
};

// TIPO PARA IMAGEN VISTA PREVIA EXPERIENCIAS CONTEXTO
export type TExperienceImagesPreviewProps = {
  setSrcVector: React.Dispatch<React.SetStateAction<string[]>>;
  srcVector: string[];
  onDeleteExperience: (id: TIdString) => void;
};

// TIPOS DE ESTRUCTURA GENERAL DEL REGISTRO DEL PROFESIONAL
export type TRegisterPro = Omit<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'> &
  Omit<TStepTwoProps, 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'> &
  Omit<TStepThreeProps, 'handleBudgeAmount' | 'onBlurAmount' | 'onChangeIsBudge' | 'onChangeIsReinsert' | 'onFocusAmount'> & {
    validateCurrentStep: () => boolean;
    setHasInteracted: (hasInteracted: boolean) => void;
    setStep: (step: number) => void;
    handleClickNext: (e: MouseEvent<HTMLButtonElement>) => void;
    handleClickPrev: (e: MouseEvent<HTMLButtonElement>) => void;
    onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
    setIsStepValid: (isStepValid: boolean) => void;
    setFormState: React.Dispatch<React.SetStateAction<iFormStateValidation>>;
    setIsParsed: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
    setStepData: React.Dispatch<React.SetStateAction<TStepData>>;
    stepData: TStepData;
    isParsed: boolean;
    isFocus: boolean;
    formState: iFormStateValidation;
    hasInteracted: boolean;
    step: number;
  };

export type TRegisterClient = {
  validateClient: () => boolean;
  setFormState: React.Dispatch<React.SetStateAction<iFormStateValidationClient>>;
  setDataClient: React.Dispatch<React.SetStateAction<TDataClient>>;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  formState: iFormStateValidationClient;
  dataClient: TDataClient;
  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TImage = {
  src: string;
  className: string;
  alt: string;
  attribute?: Record<string, string>;
};

// TIPO DE ESTRUCTURA PARA ROLE
export type TRole = {
  handleToggleModal: () => void;
  handleClientClick: () => void;
  handleProClick: () => void;
  setIsModalClosed: React.Dispatch<React.SetStateAction<boolean>>;
  isModalClosed: boolean;
  isShow: string;
  client: boolean | null;
};

export type TMain = TRole & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  isModalOpen:boolean; 
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TStepData = {
  [EKeyDataByStep.ONE]: TStepOne;
  [EKeyDataByStep.TWO]: TStepTwo;
  [EKeyDataByStep.THREE]?: TStepThree;
  [EKeyDataByStep.FOUR]: TStepBasic;
};

// ENUM PARA NOMBRE DE CLAVE EN STRORAGE DE DATOS DE CLIENTES
export type TDataClient = {
  [EDataClient.DATA]: TStepBasic;
};

// TIPADO GENERAL PARA FORMULARIOS
export type TRegister = Omit<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'> & {
  onChangeTerms: (e: React.ChangeEvent<HTMLInputElement>) => void;
  interactedPassword: boolean;
  setInteractedConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  interactedConfirmPassword: boolean;
  setInteractedPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  terms: boolean;
  isSending:boolean;
  codeEmail:string,
  setCodeEmail: React.Dispatch<React.SetStateAction<string>>
  setIsSending: React.Dispatch<React.SetStateAction<boolean>>;
};

// TIPADOS DE PASO AUXILIARES PARA ABREVIAR
export type TTypeContextStepOne = Pick<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'>;

export type TTypeContextStepTwo = TExperienceImagesPreviewProps & TProfileImagePreviewProps & Pick<TStepTwoProps, 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'>;

export type TTypeContextStepThree = Pick<TStepThreeProps, 'handleBudgeAmount' | 'onBlurAmount' | 'onChangeIsBudge' | 'onChangeIsReinsert' | 'onFocusAmount'>;

export type TTypeContextBasic = Pick<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'>;
