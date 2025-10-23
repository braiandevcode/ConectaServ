import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import type { TStepOneProps } from './typePropsStepOne';
import type { TStepThreeProps } from './typePropsStepThree';
import type { TStepTwoProps } from './typePropsStepTwo';
import type { iFormStateValidationPro } from '../interfaces/iFormStateValidationPro';
import type { TStepData } from './typeStepData';

// TIPOS DE ESTRUCTURA GENERAL DEL REGISTRO DEL PROFESIONAL
export type TRegisterPro = Omit<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'> &
  Omit<TStepTwoProps, 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'> &
  Omit<TStepThreeProps, 'handleBudgeAmount' | 'onBlurAmount' | 'onChangeIsBudge' | 'onChangeIsReinsert' | 'onFocusAmount'> & {
    validateCurrentStep: () => boolean;
    setHasInteracted: (hasInteracted: boolean) => void;
    setStep: (step: number) => void;
    handleClickNext: (e: MouseEvent<HTMLButtonElement>) => void;
    handleClickPrev: (e: MouseEvent<HTMLButtonElement>) => void;
    // onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
    setIsStepValid: (isStepValid: boolean) => void;
    setFormState: Dispatch<SetStateAction<iFormStateValidationPro>>;
    setIsParsed: Dispatch<SetStateAction<boolean>>;
    setIsFocus: Dispatch<SetStateAction<boolean>>;
    setStepData: Dispatch<SetStateAction<TStepData>>;
    stepData: TStepData;
    isParsed: boolean;
    isFocus: boolean;
    formState: iFormStateValidationPro;
    hasInteracted: boolean;
    step: number;
    setIsLoaded:Dispatch<SetStateAction<boolean>>;
    isLoaded:boolean,
  };
