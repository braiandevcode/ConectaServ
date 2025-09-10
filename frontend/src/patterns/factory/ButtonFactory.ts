// IMPORTACIONES
import { TInstanceOfButton } from '../../types/types.js';
import ButtonBaseDto from '../../modules/buttons/dto/ButtonsBaseDto.js';
import ButtonBase from '../../modules/buttons/entities/ButtonBase.js';
import { ButtonSubmit } from '../../modules/buttons/components/ButtonSubmit.js';
import { ButtonCustom } from '../../modules/buttons/components/ButtonCustom.js';
import { ButtonNext } from '../../modules/buttons/components/ButtonNext.js';
import { ButtonPrev } from '../../modules/buttons/components/ButtonPrev.js';
import ButtonBaseUI from '../../modules/buttons/ui/ButtonBaseUI.js';

export class ButtonFactory {
  static createButton(type: TInstanceOfButton,buttonBaseDto:ButtonBaseDto): ButtonBase {
    switch (type) {
      case 'submit':
        const buttonSubmitUI:ButtonBaseUI = new ButtonBaseUI(buttonBaseDto);
        return new ButtonSubmit(buttonSubmitUI).init();
     case "next":
      const buttonNextUI:ButtonBaseUI = new ButtonBaseUI(buttonBaseDto);
        return new ButtonNext(buttonNextUI).init();
      case 'prev':
        const buttonPrevUI:ButtonBaseUI = new ButtonBaseUI(buttonBaseDto);
        return new ButtonPrev(buttonPrevUI).init();
      case 'reset':
        // Aquí otro botón si tienes
        throw new Error('No implementado aún');
      case 'custom':
        const buttonCustomUI:ButtonBaseUI = new ButtonBaseUI(buttonBaseDto);
        return new ButtonCustom(buttonCustomUI).init();
      default:
        throw new Error(`Tipo de botón "${type}" no soportado.`);
    }
  }
}
