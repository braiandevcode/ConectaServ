import { useContext } from 'react';
import type { TFormVerifyCode } from '../types/typeFormlVerifyCode';
import { FormVerifyEmailContext } from '../context/form/FormVerifyEmailContext';


const useFormVerifyEmailCode = () => {
  const context = useContext<TFormVerifyCode>(FormVerifyEmailContext);

  if (!context) {
    throw new Error('useFormVerifyEmailCode debe usarse dentro de unFormVerifyEmailProvider');
  }

  return context;
};

export default useFormVerifyEmailCode;
