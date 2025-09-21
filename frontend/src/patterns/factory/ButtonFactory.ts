// IMPORTACIONES
import {TInstanceOfButton} from '../../types/types.js';
import ButtonBaseDto from '../../modules/buttons/dto/ButtonsBaseDto.js';
import {ButtonSubmit} from '../../modules/buttons/components/ButtonSubmit.js';
import {ButtonCustom} from '../../modules/buttons/components/ButtonCustom.js';
import {ButtonNext} from '../../modules/buttons/components/ButtonNext.js';
import {ButtonPrev} from '../../modules/buttons/components/ButtonPrev.js';
import ButtonBaseUI from '../../modules/buttons/ui/ButtonBaseUI.js';

export class ButtonFactory {
  static createButton(type: TInstanceOfButton, buttonBaseDto: ButtonBaseDto): ButtonBaseUI {
    switch (type) {
      case 'submit': {
        const btnSubmit = new ButtonSubmit(buttonBaseDto);
        return new ButtonBaseUI(btnSubmit).render();
      }
      case 'next': {
        const btnNext = new ButtonNext(buttonBaseDto);
        return new ButtonBaseUI(btnNext).render();
      }
      case 'prev': {
        const btnPrev = new ButtonPrev(buttonBaseDto);
        return new ButtonBaseUI(btnPrev).render();
      }
      case 'custom': {
        const btnCustom = new ButtonCustom(buttonBaseDto);
        return new ButtonBaseUI(btnCustom).render();
      }
      default:
        throw new Error(`Tipo de botón "${type}" no soportado.`);
    }
  }
}
