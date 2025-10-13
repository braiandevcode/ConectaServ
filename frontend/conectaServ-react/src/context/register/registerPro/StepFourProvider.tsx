import React, { useEffect, type ReactNode } from 'react';
import useRegisterPro from '../../../hooks/useRegisterPro';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import type { TFieldState, TLocationKey, TStepBasic, TTypeContextBasic } from '../../../types/types';
import EmailValidator from '../../../modules/validators/EmailValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import { EKeyDataByStep } from '../../../types/enums';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import { StepFourContext } from './StepFourContext';
import useRegister from '../../../hooks/useRegister';

const StepFourProvider = ({ children }: { children: ReactNode }) => {
  const fullNameValidator: FullNameValidator = new FullNameValidator();
  const userNameValidator: UserNameValidator = new UserNameValidator();
  const emailValidator: EmailValidator = new EmailValidator();
  const selectedCategoryValidator: SelectedValidator = new SelectedValidator();
  const passwordValidator: PasswordValidator = new PasswordValidator();
  const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();
  // HOOK REGISTRO PROFESIONAL
  const { hasBudge, isStepValid, validateCurrentStep, setIsStepValid, step, formState, hasInteracted, setStepData, setFormState } = useRegisterPro();
  const { password, confirmPassword, terms, setPassword, setConfirmPassword, setInteractedPassword, setInteractedConfirmPassword } = useRegister();

  //--------------------------------------------------------------EFECTOS PASO 4 -----------------------------------------------------------------------//

  // --------------------------------------------------- EFECTO VALIDACION DE PASO 4 --------------------------------------------------- //
  useEffect(() => {
    if (!hasInteracted) return; // ==> SI NO HAY INTERACCION SALIR

    // 1- SI EL ROL ES CLIENTE ==> TRUE O
    // 2- SI TIENE PRESUPUESTO Y ES IGUAL A 4 ==> TRUE O
    // 3- SI NO TIENE PRESUPUESTO Y EL PASO ES 3 ==> TRUE

    // OBJETO DEL PASO 4 (NUNCA PERSISTIR PASSWORDS)
    if ((hasBudge && step === 4) || (!hasBudge && step === 3)) {
      const newStepFour: TStepBasic = {
        fullName: formState.fullName.value as string,
        userName: formState.userName.value as string,
        email: formState.email.value as string,
        location: formState.location.value as TLocationKey,
      };

      // ACTUALIZAR ESTADO GLOBAL
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.FOUR]: newStepFour,
      }));
    }
  }, [step, terms, formState.fullName, password, confirmPassword, formState.userName.value, formState.email.value, formState.location.value]);

  // EFECTO PARA VALIDACION DE CAMPOS PASO 2
  //ENCARGADO DE RECALCULAR LA VALIDEZ CADA VEZ QUE CAMBIAN LOS DATOS RELEVANTES.
  useEffect(() => {
    // SI EL PASO ACTUAL NO ES EL 2, NO HAGO NADA
    if (step !== 4) return;
    const isValid: boolean = validateCurrentStep();
    // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
    setIsStepValid(isValid);
  }, [step, terms, password, confirmPassword, isStepValid]);

  //-----------------------------EVENTOS PASO 4-------------------------------------------------------//
  // FULL NAME
  const handleFullName = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validated: TFieldState = fullNameValidator.validate(value);
    setFormState((prev) => ({ ...prev, fullName: validated }));
  };

  // USERNAME
  const handleUserName = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validated: TFieldState = userNameValidator.validate(value);
    setFormState((prev) => ({ ...prev, userName: validated }));
  };

  // EMAIL
  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validated: TFieldState = emailValidator.validate(value);
    setFormState((prev) => ({ ...prev, email: validated }));
  };

  // LOCATION (select)
  const handleChangeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: TLocationKey = e.target.value as TLocationKey;
    const validated: TFieldState = selectedCategoryValidator.validate(value);
    setFormState((prev) => ({ ...prev, location: validated }));
  };

  // PASSWORD
  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setInteractedPassword(true);
    const value: string = e.currentTarget.value.trim();
    const validated: TFieldState = passwordValidator.validate(value);
    setFormState((prev) => ({ ...prev, password: validated }));
    setPassword(value);
  };

  // CONFIRM PASSWORD
  const handleConfirmPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setInteractedConfirmPassword(true);
    const value: string = e.currentTarget.value.trim();
    const validated: TFieldState = confirmPasswordValidator.validate(value);
    // CASO CONCRETO DE VALIDACION
    // SI LAS CONTRASEÑAS NO COINCIDEN
    if (password.trim() !== value.trim()) {
      // AÑADIRE A ESTADO GLOBAL DE VALIDACION EL MENSAJE ADECUADO EN CONFIRM PASSWORD
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
    setFormState((prev) => ({ ...prev, confirmPassword: validated }));
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
