import type { iFormStateValidationTask } from '../interfaces/iFormStateValidationTask';
import { ECategoryKey } from '../types/enums';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import useRegister from './useRegister';

// GANCHO PARA VALIDAR POR PASOS EN REGISTRO DE TASKER
const useValidateTasker = ({ step, formState, hasInteracted, hasContext, hasBudge }: { step: number; hasBudge:boolean; hasContext: boolean; formState: iFormStateValidationTask; hasInteracted: boolean }) => {
  const { isSuccefullyVerified } = useFormVerifyEmailCode(); //HOOK DE VERIFICACION DE CODIGO
  const { terms } = useRegister(); //HOOK QUE USA CONTEXTO NIVEL REGISTRO
  // ------------------------FUNCION PARA VALIDAR SEGUN EL PASO----------------------------------------//
  const validateCurrentStep = (): boolean => {
    let isValid: boolean = false; //VARIABLE EN SCOPE LOCAL

    // VERIFICAR EL PASO
    switch (step) {
      case 1: {
        // VERIFICAR QUE HAYA AL MENOS UN CHECK EN CADA GRUPO
        const hasServices: boolean = (formState['service[]'].value as string[]).length > 0;
        const hasDays: boolean = (formState['day[]'].value as string[]).length > 0;
        const hasHours: boolean = (formState['hour[]'].value as string[]).length > 0;
        const hasContexts: boolean = !hasContext || (formState['context[]'].value as string[]).length > 0; //TRUE SI hasContext ES FALSO O HAY LONGITUD

        // SI TODO ESTA COMPLETO EN PASO 1, SE CONSIDERA VALIDO
        isValid = hasInteracted && formState.category.value !== ECategoryKey.NONE && hasServices && hasDays && hasHours && hasContexts;
        return isValid;
      }
      case 2: {
        // REVISO SI EL USUARIO INTERACTUO EN ALGUNO DE LOS CAMPOS OPCIONALES
        // CONSIDERO INTERACTUACION SI:
        // - ESCRIBIO ALGO EN DESCRIPTIONUSER
        // - SUBIO UNA IMAGEN DE PERFIL
        // - SUBIO ALGUNA IMAGEN DE EXPERIENCIAS
        const interacted: boolean = Boolean(formState.descriptionUser.value) || Boolean(formState.imageProfile.value) || Boolean(formState.imageExperiences);

        // REVISO SI ALGUNO DE LOS CAMPOS OPCIONALES ES VALIDO
        const descriptionIsValid: boolean = formState.descriptionUser.isValid;

        // DEFINO LA LOGICA DE VALIDACION DEL PASO:
        // SI NO HUBO INTERACCION, EL PASO ES VALIDO
        // SI HUBO INTERACCION, AL MENOS UNO DEBE SER VALIDO
        isValid = !interacted || (interacted && descriptionIsValid);

        return isValid;
      }
      case 3: {
        // ASEGURAR QUE SIEMPRE TENGA EL "hasBudge" EN TRUE
        if (hasBudge) {
          const currentAmount: number = (formState.amountBudge.value as string).trim() !== '' ? parseInt(formState.amountBudge.value as string) : 0;
          if (formState.budgeSelected.value === 'yes') {
            // SI ELIGE "SÍ", DEBE SER UN MONTO VÁLIDO
            isValid = formState.amountBudge.isValid;
          } else if (formState.budgeSelected.value === 'no') {
            const hasNotAmount: boolean = currentAmount === 0;
            isValid = hasNotAmount;
          } else {
            isValid = false;
          }
        } else {
          const { fullName, userName, email, location, password, confirmPassword } = formState;
          const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSuccefullyVerified;

          isValid = isValidStep;
          return isValid;
        }
        return isValid;
      }
      case 4: {
        const { fullName, userName, email, location, password, confirmPassword } = formState;

        const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSuccefullyVerified;
        isValid = isValidStep;
        return isValid;
      }
      default: {
        return false;
      }
    }
  };

  return { validateCurrentStep }
};

export default useValidateTasker;
