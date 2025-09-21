import { TFieldType } from '../../../types/types';
import { iChange, iCheckbox, iInputType } from '../../../interfaces/interfaces';
import CheckboxdDto from '../dto/InputCheckboxDto.js';
import FieldBase from '../entities/FieldBase.js';
import InputFieldCheckUI from '../ui/InputFieldCheckUI.js';

/*
  EXPLICACION DEL MODELO:
  - checkboxdDto(PARA CADA HAMBITO SU CONFIGURACION) = única fuente de la verdad (estado real del campo).

  - InputFieldCheckUI(EJEMPLO DE UI DE INPUTS CHECK O RADIOS CONCRETAS REUTILIZABLES) = tonto renderizador (refleja lo que diga checkboxdDto, no toma decisiones).

  - InputFieldCheck(EJEMPLO DE LA LOGICA DE INPUTS CHECK O RADIOS CONCRETAS REUTILIZABLES) = el jefe que consulta/actualiza checkboxdDto y le dice a la UI: “refleja esto”.
*/

// CLASE PARA CAMPOS CHECKBOX/RADIO
export default class InputFieldCheck extends FieldBase<string> implements iChange<string>, iCheckbox, iInputType {
  protected _hasSubscribed: boolean;
  constructor(
    private readonly checkboxdDto: CheckboxdDto,
    private readonly inputFieldCheckUI: InputFieldCheckUI,
  ) {
    super(checkboxdDto);
    this._hasSubscribed = false;
    this.attachEvents();
  }

  private attachEvents() {
    this.inputFieldCheckUI._inputElement.addEventListener('change', () => this.triggerEvent('change'));
  }

  // VER SU CHECKED
  public checked(): void {
    this.inputFieldCheckUI.checked(); //NO ME IMPORTA COMO => RESPONSABLE DE UI CHECKEA EL INPUT
  }

  // MODIFICAR TIPO
  public setType(type: TFieldType): void {
    this.inputFieldCheckUI.setType(type); //NO ME IMPORTA COMO => AGREGA EL VALOR EN UI
  }

  // QUITAR CHECKED
  public disChecked(): void {
    this.inputFieldCheckUI.disChecked(); //NO ME IMPORTA COMO => RESPONSABLE DE UI DESCHECKEA EL INPUT
  }

  // DESHABILITAR INPUT
  public disabled(): void {
    this.inputFieldCheckUI.disabled(); //NO ME IMPORTA COMO => DESHABILITAR INPUT UI
  }

  // HABILITAR INPUT
  public enabled(): void {
    this.inputFieldCheckUI.enable(); //NO ME IMPORTA COMO => HABILITAR INPUT UI
  }

  //VER VALOR => VALUE DEL ELEMENTO
  public getValue(): string | null {
    return this.inputFieldCheckUI.getValue(); //NO ME IMPORTA COMO => VER VALOR DE INPUT
  }

  public getName(): string {
    return this.inputFieldCheckUI.getName();
  }

  //PERMITE CAMBIAR VALOR Y CHECKED DESDE FUERA
  public setValueAndTrigger(value: string, checked: boolean): void {
    this.setValue(value);
    checked ? this.checked() : this.disChecked();
    this.triggerEvent('change');
  }

  //SETEAR EL VALOR => VALUE DEL ELEMENTO
  public setValue(value: string): void {
    this.inputFieldCheckUI.setValue(value);
  }

  public suscribe(): void {
    this._hasSubscribed = true;
  }
  // METODO QUE RENDERIZA ELEMENTO LITERALMENTE
  public render(): HTMLElement {
    return this.inputFieldCheckUI._inputElement;
  }

  public get _name(): string {
    return this.checkboxdDto._name;
  }

  public get _hasSuscribeOnchange(): boolean {
    return this._hasSubscribed;
  }
}
