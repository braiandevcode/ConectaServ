import { type JSX, type ReactNode } from 'react';
import type { iModalInfo } from '../../../interfaces/iModalInfo';
import BtnClose from './Buttons/BtnClose';
import useGlobalModal from '../../../hooks/useGlobalModal';

// CSS
import './ModalMessage.css';

// MODAL PARA MENSAJES DE EXITO O ERROR ==> PENSAFO PARA MENSAJES COMUNES DE INFORMACION AL USUARIO
const ModalMessage = ({ iconReact, iconBaseProps, oncloseModal }: iModalInfo): ReactNode => {
  const { messageState } = useGlobalModal(); //HOOK A NIVEL MAIN

  const IconComponent = iconReact; // ==> GUARDAR EL VALOR DEL COMPONENTE DE ICONO DE REACT

  //RENDERIZA MODAL DE VERIFICACION
  let iconElement: JSX.Element | null = null;

  if (IconComponent) {
    // SI CONTIENE REACT ICONS: react-icons (prioridad)
    iconElement = (
      <div className='modal-icon'>
        <IconComponent {...iconBaseProps} />
      </div>
    );
  }

  //SINO NO RENDERIZA NADA DE LOS ICONOS
  return (
    <>
      <BtnClose onCloseModal={oncloseModal}  className='btn__closeMessage position-absolute to-right cursor-pointer' />
      <div className='w-full c-flex c-flex-column c-flex-items-center gap-1/2'>
        <h2 className='modal-title'>{messageState.title}</h2>
        {iconElement}
        {messageState.text && <p className='modal-message text-center'>{messageState.text}</p>}
      </div>
    </>
  );
};

export default ModalMessage;
