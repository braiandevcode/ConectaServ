import { useContext } from 'react';
import { TaskerContext  } from '../context/register/TaskerContext';
import type { TTasker} from '../types/typeTasker';

const useTasker = () => {
  const context = useContext<TTasker>(TaskerContext);
  if (!context) {
    throw new Error('useTasker debe usarse dentro de un TaskerProvider');
  }
  return context;
};

export default useTasker