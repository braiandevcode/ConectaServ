import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

// CONTEXT MAIN
const defaultMainContext: TMain = {
  setLoading: () => false,
  handleClientClick: () => {},
  handleTaskerClick: () => {},
  loading: false,
  client: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
