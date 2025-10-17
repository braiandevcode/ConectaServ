import { useEffect, type ReactNode } from 'react';
import Modal from 'react-modal';
import useMain from '../../../hooks/useMain';
import type { iModal } from '../../../interfaces/iModals';

// MODAL PARA VERIFICAR EMAIL ANTES DE REGISTRARSE
const ModalMessage = ({ title, iconReact, message, subTitle, sizeIconReact, icon }: iModal): ReactNode => {
  const { setIsModalOpen, closeModal, isModalOpen } = useMain(); //HOOK A NIVEL MAIN

  // SOLO POR EL MOMENTO PARA VER ESTILOS
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const IconComponent = iconReact; // ==> GUARDAR EL VALOR DEL COMPONENTE DE ICONO DE REACT

  //RENDERIZA MODAL DE VERIFICACION
  let iconElement: ReactNode;

  if (IconComponent) {
    // SI CONTIENE REACT ICONS: react-icons (prioridad)
    iconElement = (
      <div className='modal-icon'>
        <IconComponent size={sizeIconReact} />
      </div>
    );
  } else if (icon) {
    // SI CONTIENE ICONOS DE CLASES
    iconElement = (
      <div className='modal-icon'>
        <i className={icon}></i>
      </div>
    );
  }

  //SINO NO RENDERIZA NADA DE LOS ICONOS
  return (
    <Modal className='modal' isOpen={isModalOpen} onRequestClose={closeModal}>
      {/* <BtnClose /> */}
      {iconElement}
      <h2 className='modal-title'>{title}</h2>
      {subTitle && <h3 className='modal-subtitle'>{subTitle}</h3>}
      {message && <p className='modal-message'>{message}</p>}
    </Modal>
  );
};

export default ModalMessage;
