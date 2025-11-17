import { useContext } from 'react';
import MainContext from '../context/main/MainContext';
import type { TMain } from '../types/typeMain';


// GANCHO DE ROL PERSONALIZADO
const useMain = () => {
  const context = useContext<TMain>(MainContext);
  if (!context) {
    throw new Error('useMain debe usarse dentro de un MainProvider');
  }
  return context;
};

export default useMain;