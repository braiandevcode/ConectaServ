import type { iValidateLastStep } from '../interfaces/iValidateLastStep';
import useRegisterTasker from './useRegisterTasker';

// HOOK PARA VALIDAR PASO ACTUAL EN REGISTRO DE TASKER
const useValidateStep = () => {
  const { step, hasBudge, isFieldsBasic } = useRegisterTasker(); // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isStepOne: boolean = step === 1;

  const IsStepOneGreaterThhanZero:boolean = step > 1;
  const isStepTwo: boolean = step === 2;
  const isStepThree: boolean = step === 3;
  const isStepFour: boolean = step === 4; 
  
  const shouldRenderStepFour: boolean = (isStepThree && !hasBudge) || (hasBudge && isStepFour);

  const isBudge: boolean = step === 3 && hasBudge;

  // BANDERA PARA EL FOOTER (EL VERDADERO FINAL DEL FLUJO QUE DEPENDE DE TODAS LAS CONDICIONES).
  const isLastStep: boolean = 
    (!isFieldsBasic && !hasBudge && isStepTwo) || // ES EL PASO FINAL SI: NO REQUIERE CAMPOS BASICOS Y NO HAY PRESUPUESTO Y ESTAMOS EN EL PASO 2
    (isFieldsBasic && !hasBudge && isStepThree) || // ES EL PASO FINAL SI: REQUIERE CAMPOS BASICOS Y NO HAY PRESUPUESTO Y ESTAMOS EN EL PASO 3
    (isFieldsBasic && hasBudge && isStepFour); // ES EL PASO FINAL SI: REQUIERE CAMPOS BASICOS Y SÍ HAY PRESUPUESTO Y ESTAMOS EN EL PASO 4

  return {
    isLastStepFieldSBasic: shouldRenderStepFour,
    IsStepOneGreaterThhanZero,
    isBudge,
    isLastStep,
    isStepOne,
    isStepTwo,
    isStepFour,
    isStepThree,
  } as iValidateLastStep;
};

export default useValidateStep;
