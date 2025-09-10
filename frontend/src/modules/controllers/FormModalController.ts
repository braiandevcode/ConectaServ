// IMPORTACIONES
import { TFormElement } from "../../types/types.js";
import FormBaseDto from "../form/dto/FormBaseDto.js";
import FormBase from "../form/entities/FormBase.js";
import ModalBaseDto from "../modal/dto/ModalBaseDto.js";
import ModalBase from "../modal/entities/ModalBase.js";
import ModalBaseUI  from "../modal/ui/ModalBaseUI.js";

//ABSTRACCION => NO IMPORTA COMO
//CONTROLADOR QUE UNE LOGICA DE FORMULARIO + MODALES COMPORTAMIENTO Y CONSTRUCCIÓN DE MODAL + FORMBASICO
export abstract class FormModalController extends ModalBase {
  protected _formBase: FormBase; //COMPONE A BASE DE FORMULARIOS

  constructor(protected optionsModal: ModalBaseDto, protected uiModal:ModalBaseUI) {
    super(optionsModal, uiModal);
    this._formBase = this.createFormBase(this._options, optionsModal) as FormBase; //CASTEAMOS A "FormBase"
  }

  // GETTERS CON "get" => DONDE NO REQUIERE FUNCIONALIDAD SOLO QUE ESTE PREPARADO PARA SER LLAMADO PARA ACCESO A VALORES
  get _form(): HTMLFormElement {
    return this._formBase.getFormElement();
  }

  get _inputs(): TFormElement[] {
    return this._formBase.getInputs();
  }

  get _containerForm(): HTMLElement | null {
    if (!this._formBase.getParentForm()) return null;
    return this._formBase.getParentForm();
  }

  set _setLabel(label: HTMLLabelElement) {
    this._formBase.addNewLabel(label);
  }

  set _setInput(input: TFormElement) {
    this._formBase.addNewInput(input);
  }

  get _labels(): HTMLLabelElement[] {
    return this._formBase.getLabels();
  }

  get _options(): FormBaseDto {
    return this._formBase.options;
  }

  protected abstract createFormBase(configBaseForm: FormBaseDto, configBaseModal: ModalBaseDto): Promise<FormBase> | FormBase;

  //DELEGACION: OBLIGA A LA CLASE SUBCLASE CONCRETA A IMPLEMENTAR COMO INSERTAR EL FORMULARIO
  protected abstract insertFormIntoModal(): Promise<void>;
}