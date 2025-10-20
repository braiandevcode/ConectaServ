import { useState, type FormEvent, type ReactNode } from 'react';
import { ENamesOfKeyLocalStorage } from '../../../types/enums';
import type { iEmailUser } from '../../../interfaces/iEmailUser';
import sendCodeToUser from '../../../utils/sendCode';
import useMain from '../../../hooks/useMain';
import { ModalVerifyContext } from './ModalVerifyContext';
import type { TModalVerifyCode } from '../../../types/typeModalVerifyCode';
import { EModalType } from '../../../types/enumModalTypes';
// import useSendData from '../../../hooks/useSendData';

// PROVIDER DE MODAL DE VERIFICACION DE CODIGO DE EMAIL
const ModalVerifyEmailProvider = ({ children }: { children: ReactNode }) => {
  const { showError, showSuccess, openModal } = useMain(); // ==> HOOK NIVEL MAIN
  //   const { submitNewData } = useSendData(); // HOOK PARA VERIFICACION DE CODIGO Y ENVIO DE LOS DATOS

  // ESTADO DE VERIFICACION DE CODIGO LEYENDO EN STORAGE
  const [codeStoredEmail, setCodeStoredEmail] = useState<string>(() => {
    const storedCodeEmail: string | null = localStorage.getItem(ENamesOfKeyLocalStorage.CODE);
    return storedCodeEmail ?? '';
  });

  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); // ESTADO PARA BANDERA DE SI SE ESTA ENVIANDO CODIGO O NO
  const [inputCodeEmail, setInputCodeEmail] = useState<string>(''); //ESTADO DE EMAIL INGRESADO EN CAMPO

  //-------ACTUALIZAR EN STORAGE CODIGO DE VERIFICACION-------------------//
  const updateCodeEmail = (newCode: string): void => {
    //ACTUALIZA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR
    localStorage.setItem(ENamesOfKeyLocalStorage.CODE, String(newCode));
    setCodeStoredEmail(newCode); // => ACTUALIZA EL ESTADO INTERNO DE REACT
  };

  // FUNCION PARA ACTUALIZAR BANDERA DE SI SE ESTA ENVIANDO CODIGO O NO
  const updatedIsSendingCode = (isSendingCode: boolean): void => {
    setIsSendingCode(isSendingCode);
  };

  // FUNCION QUE SE ENCARGA DE MANDAR EL CODIGO AL USUARIO
  const sendCode = async ({ emailUser }: iEmailUser): Promise<void> => {
    // INVOCO FUNCION DE ENVIO
    await sendCodeToUser({
      updatedIsSendingCode,
      emailUser,
      updateCodeEmail,
      showError,
      showSuccess,
      openModal,
    });
  };

  // --------------------EVENTOS-------------------------------//

  // EJEMPLO DE ENVIO DEL CODIGO
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // VERIFICAR LUEGO DEL SUBMIT QUE SEA ESTRICTAMENTE EL MISMO CODIGO
    if (inputCodeEmail.trim() === codeStoredEmail.trim()) {
      showSuccess('Código verificado correctamente', '¡Exito!');
      openModal(EModalType.MODAL_SUCCESS);
      // await submitNewData(); // ==> SI EL CODIGO ES CORRECTO COMPLETAR REGISTRO
    } else {
      showError('El código ingresado no es valido, Intente nuevamente.', 'Código incorrecto');
      openModal(EModalType.MODAL_ERROR);
    }
  };

  const valuesModalVerifyContext: TModalVerifyCode = {
    handleSubmit,
    codeStoredEmail,
    inputCodeEmail,
    isSendingCode,
    sendCode,
    setInputCodeEmail,
    setIsSendingCode,
    updateCodeEmail,
    updatedIsSendingCode,
  };

  return <ModalVerifyContext.Provider value={valuesModalVerifyContext}>{children}</ModalVerifyContext.Provider>;
};

export default ModalVerifyEmailProvider;
