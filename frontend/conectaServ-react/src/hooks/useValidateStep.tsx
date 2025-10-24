import type { iValidateLastStep } from '../interfaces/iValidateLastStep';
import useRegisterTasker from './useRegisterTasker';

// HOOK PARA VALIDAR PASOS

const useValidateStep = () => {
  const { step, hasBudge, isFieldsBasic } = useRegisterTasker(); // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isStepOne: boolean = step === 1;
  const isStepTwo: boolean = step === 2;
  const isStepThree: boolean = step === 3;
  const isStepFour: boolean = step === 4; // Bandera para RENDERIZAR el StepFour (Campos Finales).
  // Debe ser TRUE cuando el flujo alcanza el paso donde se muestran los campos finales (Paso 3 sin presupuesto O Paso 4 con presupuesto).
  // Se mantiene el nombre 'isLastStepFieldSBasic' pero su lógica ahora representa el momento de renderizar StepFour, no la condición de 'isFieldsBasic'.

  const shouldRenderStepFour: boolean = (isStepThree && !hasBudge) || (hasBudge && isStepFour);

  console.log('isFieldBasic: ', isFieldsBasic);
  console.log('isStepThree: ', isStepThree);
  console.log('isStepFour', isStepFour);
  console.log('hasBudge', hasBudge);

  console.log('shouldRenderStepFour', shouldRenderStepFour);
  const isBudge: boolean = step === 3 && hasBudge;

  // BANDERA PARA EL FOOTER (EL VERDADERO FINAL DEL FLUJO QUE DEPENDE DE TODAS LAS CONDICIONES).
  const isLastStep: boolean = 
    (!isFieldsBasic && !hasBudge && isStepTwo) || // ES EL PASO FINAL SI: NO REQUIERE CAMPOS BASICOS Y NO HAY PRESUPUESTO Y ESTAMOS EN EL PASO 2
    (isFieldsBasic && !hasBudge && isStepThree) || // ES EL PASO FINAL SI: REQUIERE CAMPOS BASICOS Y NO HAY PRESUPUESTO Y ESTAMOS EN EL PASO 3
    (isFieldsBasic && hasBudge && isStepFour); // ES EL PASO FINAL SI: REQUIERE CAMPOS BASICOS Y SÍ HAY PRESUPUESTO Y ESTAMOS EN EL PASO 4

  console.log(isLastStep);
  return {
    isLastStepFieldSBasic: shouldRenderStepFour,
    isBudge,
    isLastStep,
    isStepOne,
    isStepTwo,
    isStepFour,
    isStepThree,
  } as iValidateLastStep;
};

export default useValidateStep;
