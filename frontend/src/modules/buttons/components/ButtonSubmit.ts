import { iBtnIcon, iBtnText } from "../../../interfaces/interfaces";
import ButtonBaseDto from "../dto/ButtonsBaseDto.js";
import ButtonBase from "../entities/ButtonBase.js";
import ButtonBaseUI from "../ui/ButtonBaseUI.js";

//CLASE CONCRETA => BOTON SUBMIT
export class ButtonSubmit extends ButtonBase implements iBtnText, iBtnIcon {
  constructor(buttonBaseUI: ButtonBaseUI) {
    super(buttonBaseUI);
  }

  public setText(): void {
    this.applyBtnText(); //==> APLICAR TEXTO AL BOTON
  }

  public setIcon(): void {
    this.applyClassesIcon(); //==> APLICAR ICONO
  }
}
