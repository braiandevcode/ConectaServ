import { useState, type FormEvent, type ReactNode } from 'react';
import type { TIdentifyEmail } from '../../types/typeIdentifyEmail';
import { EModalGlobalType } from '../../types/enumGlobalModalType';
import useGlobalModal from '../../hooks/useGlobalModal';
import type { iFormStateValidationIdentifyEmail } from '../../interfaces/iFormStateIdentifyEmail';
import type { TFieldState } from '../../types/typeStateFields';
import EmailValidator from '../../modules/validators/EmailValidator';
import useMain from '../../hooks/useMain';
import { useNavigate } from 'react-router';
import useUserApi from '../../hooks/useUserApi';
import FormIdentifyEmailContext from './FormIdentifyEmailContext';
import { clearPersistence } from '../../utils/storageUtils';
import type { iMessageResponseStatus } from '../../interfaces/iMessageResponseStatusBack';
import type { iStatusError } from '../../interfaces/iSatatus';
import scrolledTop from '../../utils/scrollTop';

const emailValidator: EmailValidator = new EmailValidator(); // ==> INSTANCIA DE VALIDACION DE ENTRADA DE CODIGO

// PROVIDER PARA IDENTIFICACION DE EMAIL
const FormIdentifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const { openGlobalModal, showError } = useGlobalModal(); //HOOK QUE USA EL CONTEXTO DE MODAL GLOBAL
  const { handleClientClick, handleTaskerClick, client } = useMain(); // HOOK QUE USA EL CONTEXTO DE MAIN PRINCIPAL
  const { getIdentifyEmail } = useUserApi(); //HOOK PARA PETICIONES A DATOS DEL USUARIO

  const navigate = useNavigate();

  // ESTADO PARA VERIFICAR EXISTENIA DE EMAIL ANTES DE REDIRIGIR A UN REGISTRO
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

  const cleanInputEmail = async () => {
    // await clearPersistence(); //LIMPIO TODO LO QUE REFIERA A ALMACENAMIENTO LOCAL DE REGISTRO
    // COMO FUENTE DE VERDAD DE VALOR DEL INPUT LIMPIAR
    setFormState((prev) => ({ ...prev, emailIdentify: { error: '', value: '', isValid: false } }));
    setEmailIdentify('');
  }

  // MOSTRAR MODAL CON FORMULARIO DE IDENTIFICACION DE EMAIL
  const handleClickClientIdentifyEmail = () => {
    handleClientClick(); //GUARDAR ROLE CLIENT
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL, cleanInputEmail);
  };

  const handleClickTaskerIdentifyEmail = () => {
    handleTaskerClick(); //GUARDAR ROLE TASKER
    openGlobalModal(EModalGlobalType.MODAL_IDENTIFY_EMAIL, cleanInputEmail);
  };

  // EVENTO DE ENTRADA DEL EMAIL
  const handleOnchangeIdentifyEmail = (e: FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    const validate: TFieldState = emailValidator.validate(value);
    setFormState((prev) => ({ ...prev, emailIdentify: validate })); //SETEAR ESTADO DE VALIDACION DE LA ENTRADA
    setEmailIdentify(value); //SETEAR EL EMAIL INGRESADO
  };
  
  //EVENTO DE SUBMIT DE IDENTIFICACION AL BACKEND
  const submitIdentifyEmail = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const role: 'client' | 'tasker' | null = client === null ? null : client ? 'client' :'tasker';
    try {
      setFormState((prev) => ({ ...prev, emailIdentify: { error: '', value: '', isValid: false } }));
      // LLAMO AL METODO Y PASO EL ARGUMENTO ESPERADO INTERNAMENTE
      const result: iMessageResponseStatus | null = await getIdentifyEmail({ setIsSendingIdentificationEmail, emailIdentify: (formState.emailIdentify.value as string) });
    
      if(result){
        // SI ES 200 NO EXISTE PASAR AL REGISTRO
        if(result.success){
          navigate(`${role}/register`); //SEGUN EL ROL GUARDADO NAVEGAR
          setIsExistEmail(false);
          scrolledTop();
          return;
        }
      }
      
    } catch (error) {
      const err = error as iStatusError; //FIRMA PERSONALIZADA PARA LOS ESTADOS DEL BACKEND
      
      // SI YA EXISTE MANDAR AL LOGIN
      if(err.status === 409){     
        openGlobalModal(EModalGlobalType.MODAL_LOGIN);
        setIsExistEmail(true);
        return;
      }

      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      await clearPersistence(); //ASEGURO LIMIAR STORAGE
      showError('Error inesperado', 'Intente de nuevo más tarde.');
      throw err;
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
