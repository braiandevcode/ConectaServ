import type { TStepOneProps } from "./typePropsStepOne";

// TIPO ESPECIFICO PARA CONTEXTO DEL PASO 1 IGNORANDO DEMAS VALORES
export type TTypeContextStepOne = Pick<TStepOneProps, 'handleChangeSelected' | 'handleCheckboxChange' | 'titleRef'>;