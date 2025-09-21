import ButtonBaseDto from '../dto/ButtonsBaseDto.js';
import ButtonBase from '../entities/ButtonBase.js';

// CLASE CONCRETA => BOTON ESTANDAR
export class ButtonCustom extends ButtonBase {
  constructor(buttonBaseDto: ButtonBaseDto) {
    super(buttonBaseDto);
  }

  public override subscribe(btn: HTMLButtonElement): void {
    this.on(btn, 'click', () => console.log('siguiente'));

    this.on(btn, 'keydown', (e) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key === 'Enter') {
        console.log('Siguiente');
      }
    });
  }
}