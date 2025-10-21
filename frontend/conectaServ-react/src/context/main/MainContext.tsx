import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

const defaultMainContext: TMain = {
  setLoading: () => false,
  handleClientClick: () => {},
  handleProClick: () => {},
  loading: false,
  client: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
