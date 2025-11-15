import { useEffect, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import useRegisterPro from '../../../hooks/useRegisterTasker';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import EmailValidator from '../../../modules/validators/EmailValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import { EKeyDataByStep } from '../../../types/enums';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import { StepFourContext } from './StepFourContext';
import useRegister from '../../../hooks/useRegister';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TLocationKey } from '../../../types/typeLocation';
import type { TTypeContextBasic } from '../../../types/typeContextBasic';

const StepFourProvider = ({ children }: { children: ReactNode }) => {
  const fullNameValidator: FullNameValidator = new FullNameValidator();
  const userNameValidator: UserNameValidator = new UserNameValidator();
  const emailValidator: EmailValidator = new EmailValidator();
  const selectedCategoryValidator: SelectedValidator = new SelectedValidator();
  const passwordValidator: PasswordValidator = new PasswordValidator();
  const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();
  
  const { password, terms,  confirmPassword, isSuccefullyVerified, setPassword, setConfirmPassword, setInteractedPassword, setInteractedConfirmPassword } = useRegister(); //HOOK QUE USA CONTEXTO  A NIVEL REGISTRO GENERALES
  const { validateCurrentStep, setStepData, setIsStepValid, step, setFormState } = useRegisterPro(); // //HOOK QUE USA CONTEXTO A NIVEL REGISTRO PROFESIONAL

  //--------------------------------------------------------------EFECTOS PASO 4 -----------------------------------------------------------------------//

  // --------------------------------------------------- EFECTO VALIDACION DE PASO 4 --------------------------------------------------- //
  // EFECTO PARA VALIDACION DE CAMPOS PASO 2
  //ENCARGADO DE RECALCULAR LA VALIDEZ CADA VEZ QUE CAMBIAN LOS DATOS RELEVANTES.
  useEffect(() => {
    const isValid: boolean = validateCurrentStep();
    // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
    setIsStepValid(isValid);
  }, [step, terms, isSuccefullyVerified, password, confirmPassword]);

  //-----------------------------EVENTOS PASO 4-------------------------------------------------------//
  // NOMBRE COMPLETO
  const handleFullName = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const result: TFieldState = fullNameValidator.validate(value);
    setFormState((prev) => ({ ...prev, fullName: result }));

    // ACTUALIZAR ESTADO GLOBAL
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.FOUR]: {
        ...prev[EKeyDataByStep.FOUR],
        fullName: result.value as string,
      },
    }));
  };

  // NOMBRE DE USUARIO
  const handleUserName = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const result: TFieldState = userNameValidator.validate(value);
    setFormState((prev) => ({ ...prev, userName: result }));

    // ACTUALIZAR ESTADO GLOBAL
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.FOUR]: {
        ...prev[EKeyDataByStep.FOUR],
        userName: result.value as string,
      },
    }));
  };

  // CORREO ELECTRONICO
  const handleEmail = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const result: TFieldState = emailValidator.validate(value);
    setFormState((prev) => ({ ...prev, email: result }));

    // ACTUALIZAR ESTADO GLOBAL
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.FOUR]: {
        ...prev[EKeyDataByStep.FOUR],
        email: result.value as string,
      },
    }));
  };

  // SELECT DE LOCALIDAD
  const handleChangeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    const value: TLocationKey = e.target.value as TLocationKey;
    const result: TFieldState = selectedCategoryValidator.validate(value);
    setFormState((prev) => ({ ...prev, location: result }));

    // ACTUALIZAR ESTADO GLOBAL
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.FOUR]: {
        ...prev[EKeyDataByStep.FOUR],
        location: result.value as TLocationKey,
      },
    }));
  };

  // CONTRASEÑA
  const handlePassword = (e: FormEvent<HTMLInputElement>) => {
    setInteractedPassword(true);
    const value: string = e.currentTarget.value.trim();
    const result: TFieldState = passwordValidator.validate(value);
    setFormState((prev) => ({ ...prev, password: result }));
    setPassword(value);
  };

  // CONFIRMAR CONTRASEÑA
  const handleConfirmPassword = (e: FormEvent<HTMLInputElement>) => {
    setInteractedConfirmPassword(true);
    const value: string = e.currentTarget.value.trim();
    const result: TFieldState = confirmPasswordValidator.validate(value);
    // CASO CONCRETO DE VALIDACION
    // SI LAS CONTRASEÑAS NO COINCIDEN
    if (password.trim() !== value.trim()) {
      // AGREGAR A ESTADO GLOBAL DE VALIDACION EL MENSAJE ADECUADO EN CONFIRM PASSWORD
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          error: 'Los campos no coinciden',
          value,
          isValid: false,
        },
      }));
      setConfirmPassword(value);
      return; // ==> NO CONTINUAR EL FLUJO
    }

    // SI TODO VA BIEN
    setFormState((prev) => ({ ...prev, confirmPassword: result }));
    setConfirmPassword(value);
  };

  // VALORES PARA QUE CONSUME EL CONTEXTO EN PASO BASICO
  // SE NOMBRA COMO BASICO PORQUE SON EVENTOS DE LOS CAMPOS EN COMUN DE REGISTRO DE TASKERS Y REGISTRO DE CLIENTE COMUN Y ME PERMITE REUTILIDAD AL USAR TIPADO
  const contextValueStepBasic: TTypeContextBasic = {
    handleChangeLocation,
    handleConfirmPassword,
    handleEmail,
    handleFullName,
    handlePassword,
    handleUserName,
  };

  return <StepFourContext value={contextValueStepBasic}>{children}</StepFourContext>;
};

export default StepFourProvider;
