import type { MouseEvent } from 'react';
import type { iBtns } from '../interfaces/iBtns';

const ButtonBase = ({ children, variant = 'btn', type, handler, disabled = false, ...rest }: iBtns) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (handler) handler(e);
  };

  return (
    <button
      type={type}
      className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
