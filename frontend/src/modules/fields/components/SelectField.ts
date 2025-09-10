// IMPORTACIONES
import SelectFieldUI from "../ui/SelectFieldUI.js";
import { iSelectFieldOptions } from "../../../interfaces/interfaces";
import FieldBase from "../entities/FieldBase.js";
import FieldBaseDto from "../dto/FieldBaseDto.js";


// CAMPO SELECT QUE HEREDA DE BASE
export default class SelectField extends FieldBase<string> {
  private stateChange = false;

  constructor(options: FieldBaseDto<string, iSelectFieldOptions>, private readonly selectFieldUI: SelectFieldUI) {
    super(options);
    this.attachEvents(); // SOLO ACA AGREGAMOS EL LISTENER AL DOM  => TAN PRONTO SE CREA EL SelectField, EL LISTENER YA ESTA ACTIVO
  }

  //METODO PROTEGIDO PARA DISPARAR EVENTOS
  // NO CAMBIA NADA POR FUERA, SOLO REFLEJA EL ESTADO Y NOTIFICA A QUIEN SE SUSCRIBIO
  protected triggerEvent(eventName: keyof typeof this.eventHandlers) {
    if (eventName === "change" && this.selectFieldUI._element) {
      this.options._setValue = this.selectFieldUI.getValue();
      this.stateChange = true;
    }

    super.triggerEvent(eventName); //EJECUTAR EL HANDLER DE LA BASE
  }

  //REGISTRAR LISTENER EN ELEMENTO
  private attachEvents() {
    this.selectFieldUI._element.addEventListener("change", () => this.triggerEvent("change"));
  }


  // SU TRABAJO ES PERMITIR QUE ALGUIEN DE AFUERA CAMBIE SU VALOR Y, DE INMEDIATO DISPARA EL EVENTO COMO SI HUBIERA HABIDO UN CAMBIO REAL DEL USUARIO.
  public setValueAndTrigger(value: string): void {
    this.setValue(value);
    this.triggerEvent("change");
  }

  public get _disabled(): boolean {
    return this.options._currentDisabled;
  }

  // VER EL ESTADO BOOLEANO CHANGE
  public get _stateChange(): boolean {
    return this.stateChange;
  }

  // ----------------IMPLEMENTACIONES---------------------/

  public render(): HTMLElement {
    return this.selectFieldUI._element;
  }

  // VER VALOR ACTUAL DEL SELECT
  protected getValue(): string {
    return this.selectFieldUI.getValue(); //VER VALOR ACTUAL DE ELEMENTO
  }

  // SETEO EL VALOR Y LO ACTUALIZO EN EL DOM
  public setValue(value: string): void {
    this.options._setValue = value;
    this.selectFieldUI.setValue(); //=> NO ME IMPORTA COMO AÑADELO AL DOM
  }
}
