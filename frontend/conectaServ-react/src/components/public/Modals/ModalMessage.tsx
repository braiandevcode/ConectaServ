import { type JSX, type ReactNode } from 'react';
import useMain from '../../../hooks/useMain';
import type { iModalInfo } from '../../../interfaces/iModalInfo';
import BtnClose from './Buttons/BtnClose';

// MODAL PARA VERIFICAR EMAIL ANTES DE REGISTRARSE
const ModalMessage = ({ iconReact, iconBaseProps }: iModalInfo): ReactNode => {
  const { messageState } = useMain(); //HOOK A NIVEL MAIN

  // SOLO POR EL MOMENTO PARA VER ESTILOS
  // useEffect(() => {
  //   setIsModalOpen(true);
  // }, []);

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
      <BtnClose />
      {iconElement}
      <h2 className='modal-title'>{messageState.title}</h2>
      {messageState.text && <p className='modal-message'>{messageState.text}</p>}
    </>
  );
};

export default ModalMessage;
