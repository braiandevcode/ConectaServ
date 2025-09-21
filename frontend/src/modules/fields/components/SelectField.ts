// IMPORTACIONES
import SelectFieldUI from '../ui/SelectFieldUI.js';
import { iChange } from '../../../interfaces/interfaces';
import FieldBase from '../entities/FieldBase.js';
import SelectFieldDto from '../dto/SelectFieldDto.js';

// CAMPO SELECT QUE HEREDA DE BASE
export default class SelectField extends FieldBase<string> implements iChange<string> {
  private stateChange = false;

  constructor(
    private selectFieldDto: SelectFieldDto,
    private readonly selectFieldUI: SelectFieldUI,
  ) {
    super(selectFieldDto);
    this.attachEvents(); // SOLO ACA AGREGAMOS EL LISTENER AL DOM  => TAN PRONTO SE CREA EL SelectField, EL LISTENER YA ESTA ACTIVO
  }

  //METODO PROTEGIDO PARA DISPARAR EVENTOS
  // NO CAMBIA NADA POR FUERA, SOLO REFLEJA EL ESTADO Y NOTIFICA A QUIEN SE SUSCRIBIO
  public triggerEvent(eventName: keyof typeof this.eventHandlers) {
    // SI EL EVENTO ES CHANGE Y ELEMENTO EXISTE
    if (eventName === 'change' && this.selectFieldUI._element) {
      this.selectFieldUI.setValue(this.selectFieldUI._element.value); //SETEAR
      this.stateChange = true;
    }

    super.triggerEvent(eventName); //EJECUTAR EL HANDLER DE LA BASE
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.render().addEventListener('change', () => this.triggerEvent('change'));
  }

  // ----------------IMPLEMENTACIONES---------------------/
  public render(): HTMLElement {
    return this.selectFieldUI._element;
  }

  // VER VALOR ACTUAL DEL SELECT
  public getValue(): string {
    return this.selectFieldDto._value as string; //VER VALOR ACTUAL DE SELECT
  }

  // SETEO EL VALOR Y LO ACTUALIZO EN EL DOM
  public setValue(value: string): void {
    this.selectFieldUI.setValue(value); //=> NO ME IMPORTA COMO AÑADELO AL DOM
  }

  public get _disabled(): boolean {
    return this.selectFieldDto._currentDisabled;
  }

  // VER EL ESTADO BOOLEANO CHANGE
  public get _stateChange(): boolean {
    return this.stateChange;
  }
}
