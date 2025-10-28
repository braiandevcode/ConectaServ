import { useState, type FormEvent, type ReactNode } from 'react';
import FormIdentifyEmailContext from './formIdentifyEmailContext';
import type { TIdentifyEmail } from '../../types/typeIdentifyEmail';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import useGlobalModal from '../../hooks/useGlobalModal';
import type { iFormStateValidationIdentifyEmail } from '../../interfaces/iFormStateIdentifyEmail';
import type { TFieldState } from '../../types/typeStateFields';
import EmailValidator from '../../modules/validators/EmailValidator';
import useMain from '../../hooks/useMain';
import { ENamesOfKeyLocalStorage } from '../../types/enums';
import { useNavigate } from 'react-router';
const emailValidator: EmailValidator = new EmailValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO
const FormIdentifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const { openGlobalModal } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { handleClientClick, handleTaskerClick, setLoading } = useMain();

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
    handleClientClick();
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL);
  };

  const handleClickTaskerIdentifyEmail = () => {
    handleTaskerClick();
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL);
  };

  // EVENTO DE ENTRADA DEL EMAIL
  const handleOnchangeIdentifyEmail = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validate: TFieldState = emailValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailIdentify: validate })); //SETEAR ESTADO DE VALIDACION DE LA ENTRADA
    setEmailIdentify(value);
  };

  // LEER TABLA USERS PARA OBTENER EL EMAIL SI EXISTE
  const getIdentifyEmail = async () => {
    try {
      setLoading(true);
      setIsSendingIdentificationEmail(true);
      //ESTE ENDPOINT PODRIA PARAMETRIZARSE CON user/:email(para solo filtrar el email y no traer todo)
      const getEmailUser = await fetch('http://localhost:3000/user');
      if (!getEmailUser.ok) {
        throw new Error('Error al hacer la solicitud');
      }
      const result = await getEmailUser.json();
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); //LOADING
      setIsSendingIdentificationEmail(false); //ENVIANDO
    }
  };

  //EVENTO DE SUBMIT DE IDENTIFICACION AL BACKEND
  const submitIdentifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stored = localStorage.getItem(ENamesOfKeyLocalStorage.ROLE);
    if (!stored) return; //ASEGURAR QUE EN STORAGE ESTE ALMACENADO EL ROLE

    const result: any[] = await getIdentifyEmail();
    if (result) {
      const findIndexEmailIdentify = result.findIndex((data) => data.email === emailIdentify);

      // SI ES DIFERENTE DE -1 LO ENCONTRO
      if (findIndexEmailIdentify !== -1) {
        openGlobalModal(EModalGlobalType.MODAL_LOGIN)
        setIsExistEmail(true);
      } else {
        navigate(`register/${stored}`); //SEGUN EL ROL GUARDADO NAVEGAR
        setIsExistEmail(false);
      }
    }
  };

  const valueIdentifyEmail: TIdentifyEmail = {
    submitIdentifyEmail,
    isExistEmail,
    isSendingIdentificationEmail,
    isSentIdentificationEmail,
    emailIdentify,
    formState,
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
