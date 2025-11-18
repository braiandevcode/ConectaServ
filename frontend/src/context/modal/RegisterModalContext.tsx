import { createContext } from 'react';
import type { TRegisterModal } from '../../types/typeRegisterModal';

// ESTADO POR DEFECTO
const defaultRegisterModalContext: TRegisterModal = {
  setCurrentRegisterModal: () => {},
  setIsRegisterModalOpen: () => {},
  openRegisterModal: () => {},
  closeRegisterModal: () => {},
  currentRegisterModal: null,
  isRegisterModalOpen: false,
};

const RegisterModalContext = createContext<TRegisterModal>(defaultRegisterModalContext);

export default RegisterModalContext; //==> EXPORTAR POR DEFECTO
