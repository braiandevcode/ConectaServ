import { iBtnIcon, iBtnText } from "../../../interfaces/interfaces";
import FormRegister from "../../form/controller/FormRegister.js";
import ButtonBaseDto from "../dto/ButtonsBaseDto.js";
import ButtonBase from "../entities/ButtonBase.js";
import ButtonBaseUI from "../ui/ButtonBaseUI.js";

// CLASE CONCRETA => BOTON SIGUIENTE
export class ButtonNext extends ButtonBase implements iBtnText, iBtnIcon {
  constructor(buttonBaseUI:ButtonBaseUI) {
    super(buttonBaseUI);
  }

  public setText(): void {
    this.applyBtnText(); //==> APLICAR TEXTO AL BOTON
  }

  public setIcon(): void {
    this.applyClassesIcon(); //==> APLICAR ICONO
  }

  // ACTUALIZAR DATA DE BOTNO NEXT
  // public updateAttributeDataStep({ formRegister }: { formRegister: FormRegister }): void {
  //   if (this.buttonElement.hasAttribute("data-step")) {
  //     this.buttonElement.dataset.step = String(formRegister.getStepForm()); //REASIGNAR VALOR DEL PASO
  //   }
  // }
}
