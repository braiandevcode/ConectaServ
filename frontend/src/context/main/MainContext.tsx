import { createContext } from 'react';
import type { TMain } from '../../types/typeMain';

// CONTEXT MAIN
const defaultMainContext: TMain = {
  setLoading: () => false,
  setUserData: () => {},
  setIsLogout: () => {},
  handleClientClick: () => {},
  handleTaskerClick: () => {},
  setAccessToken: () => {},
  setIsAuth: () => {},
  setIsSessionChecked: () => {},
  setTaskerData: () => {},
  taskerData:[],
  userData:null,
  isLogout:false,
  isSessionChecked:false,
  accessToken:null,
  isAuth: false,
  loading: false,
  client: false,
};

const MainContext = createContext(defaultMainContext);
export default MainContext;
