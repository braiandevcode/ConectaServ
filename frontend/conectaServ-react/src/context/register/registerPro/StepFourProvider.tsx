import React, { useEffect, type ReactNode } from 'react';
import useRegisterPro from '../../../hooks/useRegisterPro';
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
  // HOOK REGISTRO PROFESIONAL
  const { validateCurrentStep, setIsStepValid, step, setStepData, setFormState } = useRegisterPro();
  const { password, terms, confirmPassword, setPassword, setConfirmPassword, setInteractedPassword, setInteractedConfirmPassword } = useRegister();

  //--------------------------------------------------------------EFECTOS PASO 4 -----------------------------------------------------------------------//

  // --------------------------------------------------- EFECTO VALIDACION DE PASO 4 --------------------------------------------------- //
  // EFECTO PARA VALIDACION DE CAMPOS PASO 2
  //ENCARGADO DE RECALCULAR LA VALIDEZ CADA VEZ QUE CAMBIAN LOS DATOS RELEVANTES.
  useEffect(() => {
    const isValid: boolean = validateCurrentStep();
    // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
    setIsStepValid(isValid);
  }, [step, terms, password, confirmPassword]);

  //-----------------------------EVENTOS PASO 4-------------------------------------------------------//
  // FULL NAME
  const handleFullName = (e: React.FormEvent<HTMLInputElement>) => {
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

  // USERNAME
  const handleUserName = (e: React.FormEvent<HTMLInputElement>) => {
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

  // EMAIL
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
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

  // LOCATION (select)
  const handleChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  // PASSWORD
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setInteractedPassword(true);
    const value: string = e.currentTarget.value.trim();
    const result: TFieldState = passwordValidator.validate(value);
    setFormState((prev) => ({ ...prev, password: result }));
    setPassword(value);
  };

  // CONFIRM PASSWORD
  const handleConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
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
