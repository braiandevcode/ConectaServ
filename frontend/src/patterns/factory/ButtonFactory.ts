// IMPORTACIONES
import { TInstanceOfButton } from '../../types/types.js';
import { ButtonCustom, ButtonNext, ButtonPrev, ButtonSubmit } from '../../modules/components/Buttons.js';
import ButtonBase  from '../../modules/entities/ButtonBase.js';
import ButtonBaseOptions from '../../modules/dto/ButtonBaseOptions.js';

export class ButtonFactory {
  static createButton(type: TInstanceOfButton, options: ButtonBaseOptions): ButtonBase {
    switch (type) {
      case 'submit':
        return new ButtonSubmit(options).init();
     case "next":
        return new ButtonNext(options).init();
      case 'prev':
        return new ButtonPrev(options).init();
      case 'reset':
        // Aquí otro botón si tienes
        throw new Error('No implementado aún');
      case 'custom':
        return new ButtonCustom(options).init();
      default:
        throw new Error(`Tipo de botón "${type}" no soportado.`);
    }
  }
}
