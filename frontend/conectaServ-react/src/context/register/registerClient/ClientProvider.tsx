import { useLocation, useNavigate } from 'react-router';
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
import useFormVerifyEmailCode from '../../../hooks/useFormVerifyEmailCode';
import Loader from '../../../components/Loader';
import { defaultDataClient } from '../../../config/defaultDataClient';

// INSTANCIO VALIDACIONES NECESARIAS
const fullNameValidator: FullNameValidator = new FullNameValidator();
const userNameValidator: UserNameValidator = new UserNameValidator();
const emailValidator: EmailValidator = new EmailValidator();
const passwordValidator: PasswordValidator = new PasswordValidator();
const confirmPasswordValidator: ConfirmPasswordValidator = new ConfirmPasswordValidator();
const selectedCategoryValidator: SelectedValidator = new SelectedValidator();

// PROVIDER ES QUIEN NOS PROVEE LOS ESTADOS Y FUNCIONES DE COMPONENTES
const ClientProvider = ({ children }: { children: ReactNode }) => {
  //--------------------------------------------------------------------HOOKS DE REACT--------------------------------------------------------------------//
  const location = useLocation(); //HOOK DE REACT LOCATION
  const navigate = useNavigate(); // HOOK DE REACT NAVIGATION
  const { terms, confirmPassword, password } = useRegister();
  const { isSuccefullyVerified } = useFormVerifyEmailCode(); //HOOK DE VERIFICACION DE CODIGO

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // ------------------------------------------------------------------------useState------------------------------------------------------------------------//

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

  // VALIDAR  CAMPOS POR PASOS
  const [isValid, setIsValid] = useState<boolean>(validateClient);
  // -------------------------------------------------------------useEffects-------------------------------------------------------------------------//

  // ----------------------------------------------------EFECTOS PARA ESTADOS GENERALES----------------------------------------------------------------------//

  // EFECTO PARA FORZAR A RENDERIZAR HOME
  useEffect(() => {
    // CUANDO PRESIONO ATRAS O ADELANTE EN FLECHAS DEL NAVEGADOR Y ESTA EN EL HOME,
    // QUE IGNORE EL HISTORIAL DEL NAVEGADOR
    // Y LO REDIRIGA A SI MISMA AL HOME '/'
    const handlePopState = () => navigate('/', { replace: true });

    // SI LA RUTA DEL PATH ES EL HOME
    if (location.pathname === '/') {
      const wrappedHandler = () => handlePopState(); // GUARDAR REFERENCIA PARA PODER REMOVERLA DESPUES
      window.addEventListener('popstate', wrappedHandler); //SUSCRIPCION DE EVENTO EN FLECHAS ATRAS/ADELANTE DEL NAVEGADOR

      //LIMPIAR Y EVITAR FUGAS DE MEMORIA.
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [location.pathname, navigate]); //==> DEPENDE DE CAMBIOS EN LOCATION Y NAVIGATE, HOOKS DE REACT

  // ------------------------------------------------------- EVENTOS --------------------------------------------------------------------//

  //------------------------------------------FUNCIONES MODULARES------------------------------------------------------//
  // ------------------------VALIDAR REGISTRO----------------------------------------//
  function validateClient(): boolean {
    let isValid: boolean = false;
    // ASEGURO QUE SEA ROL CLIENTE
    const { fullName, userName, email, location, password, confirmPassword } = formState;

    const isValidStep: boolean = fullName.isValid && userName.isValid && email.isValid && location.isValid && password.isValid && confirmPassword.isValid && terms && isSuccefullyVerified;
    isValid = isValidStep;
    return isValid;
  }

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
