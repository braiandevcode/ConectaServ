import type { TStepFourProps } from "./typePropsStepFour";

// TIPO PARA CONTEXTO DE PASO BASICO
export type TTypeContextBasic = Pick<TStepFourProps, 'handleChangeLocation' | 'handleConfirmPassword' | 'handleEmail' | 'handleFullName' | 'handlePassword' | 'handleUserName'>;
