import type { ButtonHTMLAttributes, ReactNode } from 'react';
import useRegisterPro from '../hooks/useRegisterPro';
import type React from 'react';

// INTERFACE PARA TODOS LOS BOTONES
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'btn' | 'btn container-btn__next';
}

const ButtonRegister = ({ children, variant, onClick, ...rest }: ButtonProps) => {
  const { isStepValid, handleClickNext, step, hasBudge } = useRegisterPro(); //HOOK PARA ESTADOS DE REGISTRO PROFESIONAL

  // ------------------------VARIABLES Y/O CONSTANTES---------------------------------------------//
  const isLastStep: boolean = (step === 3 && !hasBudge) || (hasBudge && step === 4); //EL ULTIMO PASO;

  let endOnClick = undefined;

  if (!isLastStep) {
    //SI NO ES EL ULTIMO PASO, EJECUTA LA FUNCION INTERNA, Y LUEGO LA EXTERNA SI EXISTE.
    endOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleClickNext(e);
      // SI onClick SE LLAMA
      if (onClick) {
        onClick(e);
      }
    };
  } else {
    // SI ES EL ULTIMO PASO Y ES SUBMIT, DEJAR EL QUE EL ONCLICK EXTERNO SE EJECUTE
    // ANTES QUE EL FORMULARIO HAGA SUBMIT
    endOnClick = onClick;
  }

  return (
    <>
      <button type={isLastStep ? 'submit' : 'button'} disabled={!isStepValid} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} onClick={endOnClick} {...rest}>
        {children}
      </button>
    </>
  );
};
export default ButtonRegister;
