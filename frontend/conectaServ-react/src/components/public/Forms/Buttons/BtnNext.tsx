import type { iBtns } from "../../../../interfaces/iBtns";
import ButtonBase from "../../../ButtonBase";

// BOTON DE SIGUIENTE
const BtnNext = ({ children, variant, type, disabled, ...rest }: iBtns) => {
  return (
    <ButtonBase type={'button'} disabled={disabled} className={`c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer ${variant}`} {...rest}>
      {children}
    </ButtonBase>
  );
};
export default BtnNext;
