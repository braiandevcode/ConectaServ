//IMPORTACIONES
import { iBlur, iFocus, iInput } from '../../../interfaces/interfaces.js';
import InputFieldUI from '../ui/InputFieldUI.js';
import { TFormElement } from '../../../types/types.js';
import FieldBase from '../entities/FieldBase.js';
import InputFieldDto from '../dto/InputFieldDto.js';

// CLASE PARA CAMPOS
export default class InputField extends FieldBase<string> implements iInput<string>, iFocus, iBlur<string> {
  private isValid: boolean;
  constructor(
    fieldInputDto: InputFieldDto,
    private readonly inputFieldUI: InputFieldUI,
  ) {
    super(fieldInputDto);
    this.isValid = false;
    this.attachEvents(); // SOLO ACA AGREGAMOS EL LISTENER AL DOM
  }

  //-------------------METODOS PRIVADOS----------------------------------------//

  // METODO PARA SUSCRIBIR EVENTO INMEDIATAMENTE NI BIEN SE INSTANCIA CLASE
  private attachEvents() {
    this.inputFieldUI._inputElement.addEventListener('input', () => this.triggerEvent('input')); // ==> MUESTRA EL VALUE CORRECTO

    this.inputFieldUI._inputElement.addEventListener('focus', () => this.triggerEvent('focus'));
  }

  // CENTRALIZAR
  protected triggerEvent(eventName: keyof typeof this.eventHandlers) {
    // SI ES TIPO INPUT
    if (eventName === 'input') {
      const value = this.inputFieldUI._inputElement.value; //GUARDAR VALOR DE LEEMNTO
      this.setValue(value); // ACTUALIZAR DTO Y DOM
    }

    // SI ES TIPO INPUT
    if (eventName === 'focus') {
      this.inputFieldUI.isOnFocus(true); // ACTUALIZAR DTO Y DOM
      this.inputFieldUI._inputElement.focus(); //GUARDAR VALOR DE LEEMNTO
    }

    super.triggerEvent(eventName); // EJECUTAR EL HANDLER CON SU TIPO DE EVENTO
  }

  // DESHABILITAR INPUT
  public disabled(): void {
    this.inputFieldUI.disabled(); //=> DESHABILITAR INPUT UI
  }

  // HABILITAR INPUT
  public enabled(): void {
    this.inputFieldUI.enable(); //=> HABILITAR INPUT UI
  }

  //VER VALOR => VALUE DEL ELEMENTO
  public getValue(): string {
    return this.inputFieldUI.getValue(); //=> VER VALOR DE INPUT
  }

  public getName(): string {
    return this.inputFieldUI.getName(); //=> VER NAME DE INPUT
  }

  // SETEAR VALUE DE ELEMENTO
  public setValue(value: string): void {
    this.inputFieldUI.setValue(value); // ==> DTO PRIMERO
  }

  // SETEAR SI ES VALIDO
  public setIsValid(isValid: boolean): void {
    this.isValid = isValid;
  }

  public getIsValid(): boolean {
    return this.isValid;
  }

  // SETEAR Y EJECUTAR EVENTO
  public setValueAndTrigger(value: string): void {
    this.setValue(value);
    this.triggerEvent('input');
  }

  // SETEAR Y EJECUTAR EVENTO
  public setValueAndTriggerFocus(): void {
    this.triggerEvent('focus');
  }

  public render(): HTMLElement {
    return this.inputFieldUI._inputElement;
  }

  // MOSTRAR ERROR
  public showError(message: string): void {
    this.inputFieldUI.showError(this.render() as TFormElement, message); // => NO ME IMPORTA COMO, NECESITO MOSTRAR MI ERROR
  }

  // QUITAR ERROR
  public clearError(): void {
    this.inputFieldUI.clearError(this.render() as TFormElement); // => NO ME IMPORTA COMO, NECESITO MOSTRAR MI ERROR
  }

  // QUITAR O MOSTRAR ERROR MEDIANTE TOGGLE Y ESTILIZAR SU BORDE
  public errorToggle(message: string): void {
    // REFERNCIO AL ANCESTRO MAS CERCANO CON EL DATA Y SU VALOR
    const parent: HTMLDivElement | null = this.render().closest(`[data-message="${this.getName()}"]`);
    if (!parent) return; // => VERIFICO SI ES NULO

    // REFERENCIO SPAN POR CLASE UNIVESAL QUE DEBERIAN TENER TODOS LOS INPUTS => SINO NO FUNCIONA
    const span: HTMLSpanElement | null = parent.querySelector('.containerMsgError .has-error');

    // SI EL SPAN SE ENCUENTRA LLAMAR AL RESPONSABLE PARA MODIFICAR UI
    if (span) this.inputFieldUI.errorToggle(this.render() as TFormElement, this.isValid, span, message);
  }

  // ESTILIZAR EL BORDE
  public errorBorderStyleToggle(): void {
    this.inputFieldUI.errorBorderStyleToggle(this.render() as TFormElement, this.isValid);
  }

  // METODO PARA AGREGAR FOCUS
  public focusStyleBorder(): void {
    this.inputFieldUI.focusStyleBorder(this.render() as TFormElement); // => AÑADIR ESTILO DE FOCUS NEUTRAL
  }

  // ESTILIZAR EL BORDE
  public resetBorderStyle(): void {
    this.inputFieldUI.resetBorder(this.render() as TFormElement);
  }
}
