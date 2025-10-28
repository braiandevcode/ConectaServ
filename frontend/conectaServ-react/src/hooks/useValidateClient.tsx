import type { iFormStateValidationClient } from '../interfaces/iFormStateValidationClient';
import useFormVerifyEmailCode from './useFormVerifyEmailCode';
import useRegister from './useRegister';

const useValidateClient = ({ formState }: { formState: iFormStateValidationClient }) => {
  const { terms } = useRegister();
  const { isSuccefullyVerified } = useFormVerifyEmailCode(); //HOOK DE VERIFICACION DE CODIGO

  // ------------------------VALIDAR REGISTRO----------------------------------------//
  const validateClient = (): boolean => {
    let isValid: boolean = false;
    // ASEGURO QUE SEA ROL CLIENTE
    const { fullName, userName, email, location, password, confirmPassword } = formState;

    const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSuccefullyVerified;
    isValid = isValidStep;
    return isValid;
  }

  return { validateClient }
};

export default useValidateClient;
