import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import type { TStepOneProps } from './typePropsStepOne';
import type { TStepThreeProps } from './typePropsStepThree';
import type { TStepTwoProps } from './typePropsStepTwo';
import type { TStepDataPro } from './typeStepData';
import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';

// TIPOS DE ESTRUCTURA GENERAL DEL REGISTRO DEL PROFESIONAL
export type TRegisterTasker = Omit<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'> &
  Omit<TStepTwoProps, 'handleDescriptionInput' | 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'> &
  Omit<TStepThreeProps, 'handleBudgeAmount' | 'onBlurAmount' | 'onChangeIsBudge' | 'onChangeIsReinsert' | 'onFocusAmount'> & {
    validateCurrentStep: () => boolean;
    setHasInteracted: (hasInteracted: boolean) => void;
    setStep: (step: number) => void;
    handleClickNext: (e: MouseEvent<HTMLButtonElement>) => void;
    handleClickPrev: (e: MouseEvent<HTMLButtonElement>) => void;
    setIsStepValid: (isStepValid: boolean) => void;
    setFormState: Dispatch<SetStateAction<iFormStateValidationTask>>;
    setIsParsed: Dispatch<SetStateAction<boolean>>;
    setIsFocus: Dispatch<SetStateAction<boolean>>;
    setStepData: Dispatch<SetStateAction<TStepDataPro>>;
    stepData: TStepDataPro;
    isParsed: boolean;
    isFocus: boolean;
    formState: iFormStateValidationTask;
    hasInteracted: boolean;
    step: number;
    setIsLoaded:Dispatch<SetStateAction<boolean>>;
    isLoaded:boolean,
  };
