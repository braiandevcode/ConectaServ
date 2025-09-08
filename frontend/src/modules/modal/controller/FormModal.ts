// IMPORTACIONES
import { iFormOptions, iModalOptions } from "../../interfaces/interfaces.js";
import CustomModal from "../../components/modal/CustomModal.js";
import { FormBase } from "./FormBase.js";
import { TFormElement } from "../../types/types.js";

// ABSTRACCION PAR DIFERENTE MODALES DE FORMULARIOS
//(COMPORTAMIENTO Y CONSTRUCCIÓN DE MODAL + FORMBASICO)
export abstract class FormModal extends CustomModal {
  protected _formBase: FormBase; //COMPONE A BASE DE FORMULARIOS

  constructor(options: iModalOptions) {
    super(options);
    if (!options.formConfig) throw new Error("Se necesita config de formulario en options");

    this._formBase = this.createFormBase(options.formConfig);
  }

  // GETTERS CON "get" => DONDE NO REQUIERE FUNCIONALIDAD SOLO QUE ESTE PREPARADO PARA SER LLAMADO
  get Form():HTMLFormElement {
    return this._formBase.getFormElement();
  }

  get Inputs(): TFormElement[] {
    return this._formBase.getInputsElement();
  }

  get containerForm():HTMLElement | null{
    if(this._formBase.getContainerForm()){
      return this._formBase.getContainerForm();
    }

    return null;
  }

  get Labels():HTMLLabelElement[] {
    return this._formBase.getLabelsElement();
  }

  get Options(): iFormOptions{
    return this.options;
  }

  protected abstract createFormBase(config: iFormOptions): FormBase;
}