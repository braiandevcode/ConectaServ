import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

// CONTEXT MAIN
const defaultMainContext: TMain = {
  setLoading: () => false,
  isLogout:false,
  setIsLogout: () => {},
  handleClientClick: () => {},
  handleTaskerClick: () => {},
  setAccessToken: () => {},
  setIsAuth: () => {},
  setIsSessionChecked: () => {},
  isSessionChecked:false,
  accessToken:null,
  isAuth: false,
  loading: false,
  client: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
