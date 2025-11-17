import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import useRegister from './useRegister';

const useValidateClient = ({ formState }: { formState: iFormStateValidationClient }) => {
  const { terms, isSuccefullyVerified } = useRegister(); //HOOK QUE USA EL CONTEXTO DE REGISTRO GENERAL
  // ------------------------VALIDAR REGISTRO----------------------------------------//
  const validateClient = (): boolean => {
    let isValid: boolean = false;
    // ASEGURO QUE SEA ROL CLIENTE
    const { fullName, userName, email, cityName, password, confirmPassword } = formState;

    const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && cityName.isValid && password.isValid && confirmPassword.isValid && terms && isSuccefullyVerified;
    isValid = isValidStep;
    return isValid;
  }

  return { validateClient }
};

export default useValidateClient;
