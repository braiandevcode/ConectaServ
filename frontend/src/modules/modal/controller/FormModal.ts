// IMPORTACIONES
import { TFormElement } from '../../../types/types';
import FormBaseDto from '../../form/dto/FormBaseDto.js';
import FormBase from '../../form/entities/FormBase.js';
import ModalBaseDto from '../dto/ModalBaseDto.js';

// ABSTRACCION PAR DIFERENTE MODALES DE FORMULARIOS
//(COMPORTAMIENTO Y CONSTRUCCIÓN DE MODAL + FORMBASICO)
export abstract class FormModal {
  protected _instanceFormBase: FormBase; //COMPONE A BASE DE FORMULARIOS

  constructor(
    private readonly modalDto: ModalBaseDto,
    private readonly formDto: FormBaseDto,
  ) {
    this._instanceFormBase = this.createFormBase(formDto);
  }

  // GETTERS CON "get" => DONDE NO REQUIERE FUNCIONALIDAD SOLO QUE ESTE PREPARADO PARA SER LLAMADO
  get Form(): HTMLFormElement {
    return this._instanceFormBase.getFormElement();
  }

  get Inputs(): TFormElement[] {
    return this._instanceFormBase.getInputs();
  }

  public getContainerForm(): HTMLElement | null {
    return this._instanceFormBase.getContainerForm();
  }

  get Labels(): HTMLLabelElement[] {
    return this._instanceFormBase.getLabels();
  }

  protected abstract createFormBase(config: FormBaseDto): FormBase;
}
