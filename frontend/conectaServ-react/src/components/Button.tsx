import type { iBtns } from '../interfaces/iBtns';

// PLANTILLA PARA BOTONES DE APP
const Button= ({ children, variant, type, disabled = false, ...rest }: iBtns) => {
  return (
    <button
      type={type}
      className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
