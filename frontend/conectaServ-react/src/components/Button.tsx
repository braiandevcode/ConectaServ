import type { iBtns } from '../interfaces/iBtns';

// PLANTILLA PARA BOTONES DE APP
const Button = ({ children, variant, type, disabled, className, ...rest }: iBtns) => {
  // CLASE BASE
  const baseClasses:string = 'c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer';

  //LAS PROPS QUE NO EXISTEN SON CADENA VACIA
  const currentClasses:string = `${baseClasses} ${className || ''} ${variant || ''}`;
  return (
    <button type={type} className={currentClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
