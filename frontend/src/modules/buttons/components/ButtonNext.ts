import ButtonBaseDto from '../dto/ButtonsBaseDto.js';
import ButtonBase from '../entities/ButtonBase.js';

// CLASE CONCRETA => BOTON SIGUIENTE
export class ButtonNext extends ButtonBase {
  constructor(buttonBaseDto: ButtonBaseDto) {
    super(buttonBaseDto);
  }

  // USAR SI SE QUIERE SUSCRIBIR A MAS DE UN EVENTO
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
