import ButtonBaseDto from '../dto/ButtonsBaseDto.js';
import ButtonBase from '../entities/ButtonBase.js';

//CLASE CONCRETA => BOTON SUBMIT
export class ButtonSubmit extends ButtonBase {
  constructor(buttonBaseDto: ButtonBaseDto) {
    super(buttonBaseDto);
  }

  public override subscribe(btn: HTMLButtonElement): void {
    this.on(btn, 'click', () => console.log('siguiente'));

    // EJEMPLO CON OTROS EVENTOS CONCRETOS AL BOTON
    this.on(btn, 'keydown', (e) => {
      const keyboardEvent = e as KeyboardEvent;
      if (keyboardEvent.key === 'Enter') {
        console.log('Siguiente');
      }
    });
  }
}
