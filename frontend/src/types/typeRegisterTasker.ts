import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import type { TStepOneProps } from './typePropsStepOne';
import type { TStepThreeProps } from './typePropsStepThree';
import type { TStepTwoProps } from './typePropsStepTwo';

// TIPOS DE ESTRUCTURA GENERAL DEL REGISTRO DEL PROFESIONAL
export type TRegisterTasker = Omit<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'> &
  Omit<TStepTwoProps, 'handleDescriptionInput' | 'loadImg' | 'setLoadImg' | 'setLoadImgExp' | 'loadImgExp'| 'handleDescriptionBlur' | 'handleImageExperiencesChange' | 'handleImageProfileChange'> &
  Omit<TStepThreeProps, 'handleBudgeAmount' | 'onChangeIsBudge' | 'onChangeIsReinsert'> & {
    validateCurrentStep: () => boolean;
    setHasInteracted: (hasInteracted: boolean) => void;
    setStep: (step: number) => void;
    handleClickNext: (e: MouseEvent<HTMLButtonElement>) => void;
    handleClickPrev: (e: MouseEvent<HTMLButtonElement>) => void;
    setIsLoaded:Dispatch<SetStateAction<boolean>>;
    hasInteracted: boolean;
    step: number;
    isLoaded:boolean,
  };
