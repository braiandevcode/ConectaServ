import { useState, type FormEvent, type ReactNode } from 'react';
import FormIdentifyEmailContext from './FormIdentifyEmailContext';
import type { TIdentifyEmail } from '../../types/typeIdentifyEmail';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import useGlobalModal from '../../hooks/useGlobalModal';
import type { iFormStateValidationIdentifyEmail } from '../../interfaces/iFormStateIdentifyEmail';
import type { TFieldState } from '../../types/typeStateFields';
import EmailValidator from '../../modules/validators/EmailValidator';
import useMain from '../../hooks/useMain';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import { useNavigate } from 'react-router';
import type { TUser } from '../../types/typeUser';
import useUserApi from '../../hooks/useUserApi';

const emailValidator: EmailValidator = new EmailValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO

// PROVIDER PARA IDENTIFICACION DE EMAIL
const FormIdentifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const { openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { handleClientClick, handleTaskerClick } = useMain(); // HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { getIdentifyEmail } = useUserApi(); //HOOK PARA PETICIONES A DATOS DEL USUARIO

  const navigate = useNavigate();

  // ESTADO PARA VERIFICAR EXISTENIA DE AMIL ANTES DE REDIRIGIR A UN REGISTRO
  // ASEGURA DE QUE NO SE VUELVA A REGISTRAR UN MISMO USUARIO
  const [isExistEmail, setIsExistEmail] = useState<boolean>(false);

  //BANDERA DEL PROCESO DE ENVIANDO IDENTIFICACION
  const [isSendingIdentificationEmail, setIsSendingIdentificationEmail] = useState<boolean>(false);

  //BANDERA DEL PROCESO ENVIADO
  const [isSentIdentificationEmail, setIsSentIdentificationEmail] = useState<boolean>(false);

  const [emailIdentify, setEmailIdentify] = useState<string>(''); //ESTADO INICIAL DE EMAIL INGRESADO

  const initialFormIdentifyEmail: iFormStateValidationIdentifyEmail = {
    // ESTADOS DE ENTRADA EN VERIFICACION DE CODIGO
    emailIdentify: emailValidator.validate(emailIdentify ?? ''),
  };

  const [formState, setFormState] = useState<iFormStateValidationIdentifyEmail>(initialFormIdentifyEmail);

  // MOSTRAR MODAL CON FORMULARIO DE IDENTIFICACION DE EMAIL
  const handleClickClientIdentifyEmail = () => {
    handleClientClick(); //GUARDAR ROLE CLIENT
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL);
  };

  const handleClickTaskerIdentifyEmail = () => {
    handleTaskerClick(); //GUARDAR ROLE TASKER
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL);
  };

  // EVENTO DE ENTRADA DEL EMAIL
  const handleOnchangeIdentifyEmail = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validate: TFieldState = emailValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailIdentify: validate })); //SETEAR ESTADO DE VALIDACION DE LA ENTRADA
    setEmailIdentify(value); //SETEAR EL EMAIL INGRESADO
  };

  //EVENTO DE SUBMIT DE IDENTIFICACION AL BACKEND
  const submitIdentifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stored = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE);
    if (!stored) return; //ASEGURAR QUE EN STORAGE ESTE ALMACENADO EL ROLE

    // LLAMO AL METODO Y PASO EL ARGUMENTO ESPERADO INTERNAMENTE
    const result = (await getIdentifyEmail({ setIsSendingIdentificationEmail })) as TUser[];

    // SI LA SOLICITUD TRAE DATOS
    if (result && result.length > 0) {
      const findIndexEmailIdentify = result.findIndex((data) => data.email === emailIdentify);

      // SI ES DIFERENTE DE -1 LO ENCONTRO
      if (findIndexEmailIdentify !== -1) {
        openGlobalModal(EModalGlobalType.MODAL_LOGIN);
        setIsExistEmail(true);
      } else {
        navigate(`register/${stored}`); //SEGUN EL ROL GUARDADO NAVEGAR
        setIsExistEmail(false);
      }
    }
  };

  const valueIdentifyEmail: TIdentifyEmail = {
    isExistEmail,
    isSendingIdentificationEmail,
    isSentIdentificationEmail,
    emailIdentify,
    formState,
    submitIdentifyEmail,
    handleOnchangeIdentifyEmail,
    setEmailIdentify,
    setFormState,
    handleClickClientIdentifyEmail,
    handleClickTaskerIdentifyEmail,
    setIsExistEmail,
    setIsSendingIdentificationEmail,
    setIsSentIdentificationEmail,
  };
  return <FormIdentifyEmailContext.Provider value={valueIdentifyEmail}>{children}</FormIdentifyEmailContext.Provider>;
};

export default FormIdentifyEmailProvider;
