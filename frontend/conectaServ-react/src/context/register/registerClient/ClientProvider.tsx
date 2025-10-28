import ConfirmPasswordValidator from '../../../modules/validators/ConfirmPasswordValidator';
import EmailValidator from '../../../modules/validators/EmailValidator';
import FullNameValidator from '../../../modules/validators/FullNameValidator';
import PasswordValidator from '../../../modules/validators/PasswordValidator';
import UserNameValidator from '../../../modules/validators/UserNameValidator';
import { ClientContext } from './ClientContext';
import { useEffect, useState, type ReactNode } from 'react';
import { readExistingData } from '../../../utils/storageUtils';
import { EDataClient, ENamesOfKeyLocalStorage } from '../../../types/enums';
import SelectedValidator from '../../../modules/validators/SelectedValidator';
import useRegister from '../../../hooks/useRegister';
import type { TDataClient } from '../../../types/typeDataClient';
import type { iFormStateValidationClient } from '../../../interfaces/iFormStateValidationClient';
import type { TRegisterClient } from '../../../types/typeRegisterClient';
import Loader from '../../../components/Loader';
import { defaultDataClient } from '../../../config/defaultDataClient';
import useValidateClient from '../../../hooks/useValidateClient';

// INSTANCIO VALIDACIONES NECESARIAS
const fullNameValidator: FullNameValidator = new FullNameValidator();
const userNameValidator: UserNameValidator = new UserNameValidator();
const emailValidator: EmailValidator = new EmailValidator();
const passwordValidator: PasswordValidator = new PasswordValidator();
const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();
const selectedCategoryValidator: SelectedValidator = new SelectedValidator();

// PROVIDER ES QUIEN NOS PROVEE LOS ESTADOS Y FUNCIONES DE COMPONENTES
const ClientProvider = ({ children }: { children: ReactNode }) => {
  // ------------------------------------------------------------------------ESTADOS------------------------------------------------------------------------//
  const { confirmPassword, password } = useRegister();

  const [isLoaded, setIsLoaded] = useState(false);

  const stored = readExistingData(ENamesOfKeyLocalStorage.CLIENT_DATA) ?? {}; //LEEO Y PARSEO OBJETO GENERAL DE PASOS

  // OBJETO GENERAL DE PASOS CON VALORES POR DEFECTO Y PARA ALMACENAR EN STROAGE
  const [dataClient, setDataClient] = useState<TDataClient>(() => {
    return {
      [EDataClient.DATA]: {
        ...defaultDataClient[EDataClient.DATA], //VALOR POR DEFECTO
        ...stored[EDataClient.DATA], // PISADO PODR EL VALOR EN STORAGE
      },
    };
  });

  // OBJETO INICIAL DE VALIDACIONES QUE LEERA LOS DATOS EN ALMACEN LOCAL Y VALIDARA O DEJAR VALORES POR DEFECTO
  const initialFormState: iFormStateValidationClient = {
    //DATOS INICIALES
    fullName: fullNameValidator.validate(dataClient[EDataClient.DATA].fullName ?? ''),
    userName: userNameValidator.validate(dataClient[EDataClient.DATA].userName ?? ''),
    email: emailValidator.validate(dataClient[EDataClient.DATA].email ?? ''),
    location: selectedCategoryValidator.validate(dataClient[EDataClient.DATA].location ?? ''),
    password: passwordValidator.validate(password ?? ''),
    confirmPassword: confirmPasswordValidator.validate(confirmPassword ?? ''),
  };

  // ESTADO DE VALIDACIONES EN TODO EL FORMULARIO ==> INICIALIZA CON ==> initialFormState
  const [formState, setFormState] = useState<iFormStateValidationClient>(initialFormState);

  // GANCHO DE VALIDACION COMPLETA DEL FORMLUARIO
  const { validateClient } = useValidateClient({ formState });

  // VALIDAR  CAMPOS POR PASOS
  const [isValid, setIsValid] = useState<boolean>(validateClient);

  //---------------------------------- useeffects----------------------------------------//
  useEffect(() => {
    setIsLoaded(true); //TODO CARGADO A TRUE
  }, []);

  // ------------------------------------------------------- EVENTOS --------------------------------------------------------------------//

  //-----------------------------OBJETO DE CONTEXTO---------------------------------//
  const contextClientValue: TRegisterClient = {
    isLoaded,
    setIsLoaded,
    isValid,
    dataClient,
    formState,
    setIsValid,
    setDataClient,
    setFormState,
    validateClient,
  };

  //RETORNO PROVEEDOR
  return <ClientContext.Provider value={contextClientValue}>{isLoaded ? children : <Loader />}</ClientContext.Provider>;
};

export default ClientProvider;
