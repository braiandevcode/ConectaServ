import { useEffect, type ReactNode } from 'react';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import EmailValidator from '../../../modules/validators/EmailValidator';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import useRegisterClient from '../../../hooks/useRegisterClient';
import { EDataClient, ENamesOfKeyLocalStorage } from '../../../types/enums';
import { FieldsClientContext } from './FieldsClientContext';
import useRegister from '../../../hooks/useRegister';
import useMain from '../../../hooks/useMain';
import type { TLocationKey } from '../../../types/typeLocation';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TTypeContextBasic } from '../../../types/typeContextBasic';
import type { TUser } from '../../../types/typeUser';

const FieldsClientProvider = ({ children }: { children: ReactNode }) => {
  const fullNameValidator: FullNameValidator = new FullNameValidator();
  const userNameValidator: UserNameValidator = new UserNameValidator();
  const emailValidator: EmailValidator = new EmailValidator();
  const selectedCategoryValidator: SelectedValidator = new SelectedValidator();
  const passwordValidator: PasswordValidator = new PasswordValidator();
  const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();
  // HOOK REGISTRO CLIENTE
  const { formState, setIsValid, isValid, validateClient, setDataClient, setFormState, dataClient } = useRegisterClient(); //HOOK CONTEXTO REGISTRO DE CLIENTE
  const { terms, password, isSuccefullyVerified, confirmPassword, setInteractedConfirmPassword, setInteractedPassword, setPassword, setConfirmPassword } = useRegister(); //HOOK CONTEXTO DE REGISTRO GENERA
  const { client } = useMain(); //HOOK CONTEXTO MAIN
  
  // EFECTO PARA ALMACENAR DATOS DEL FORMULARIO EN STORAGE
  useEffect(() => {
    if (client === null) return; // ==> SI CLIENT ES NULL SIGNIFICA QUE NO SE ELIGIO NADA NO DEBE CARGARSE EL STORAGE
    localStorage.setItem(ENamesOfKeyLocalStorage.CLIENT_DATA, JSON.stringify(dataClient));
  }, [client, dataClient]); // ==> DEPENDENCIAS client Y dataClient


  // EFECTO QUE ACTUALIZA DATOS DE LOS CAMPOS EN STORAGE
  useEffect(() => {
    // NUEVO OBJETO CON VALORES NUEVOS
    const newData: Omit<TUser, 'password' | 'isVerified' | 'roleData' | 'taskerData'> = {
      fullName: formState.fullName.value as string,
      userName: formState.userName.value as string,
      email: formState.email.value as string,
      locationData: { cityName: formState.cityName.value as TLocationKey},
    };

    // ACTUALIZAR DATOS DE CLIENTE EN STORAGE
    setDataClient((prev) => ({
      [EDataClient.DATA]:{
        ...prev[EDataClient.DATA],
        ...newData
      }
    }));

    const isValid: boolean = validateClient();
    // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
    setIsValid(isValid);

    // DEPENDENCIAS SON EXTERAS AL COMPONENTE
  }, [terms, isValid, isSuccefullyVerified, formState.fullName, password, confirmPassword, formState.userName.value, formState.email.value, formState.cityName.value]);

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
    setFormState((prev) => ({ ...prev, cityName: validated }));
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

  // PASAR VALORES AL CONTEXTO
  const contextValueStepBasic: TTypeContextBasic = {
    handleChangeLocation,
    handleConfirmPassword,
    handleEmail,
    handleFullName,
    handlePassword,
    handleUserName,
  };

  return <FieldsClientContext value={contextValueStepBasic}>{children}</FieldsClientContext>;
};

export default FieldsClientProvider;
