// IMPORTACIONES
import { TFormElement } from "../../../types/types";
import FormBaseDto from "../dto/FormBaseDto.js";
import FormBaseUI from "../ui/FormBaseUI.js";

// =============================
// CLASE ABSTRACTA BASE DE FORM
// =============================
export default abstract class FormBase {
  // ESTADOS SOLO LECTURA
  protected form: HTMLFormElement;
  protected readonly inputs: TFormElement[]; // READONLY
  protected readonly labels: HTMLLabelElement[]; // READONLY
  private _isSending: boolean; // SI ESTA ENVIANDO

  constructor(protected readonly formOptions: FormBaseDto, protected readonly formBaseUI: FormBaseUI) {
    this.inputs = [];
    this.labels = [];
    this.form = this.formBaseUI.getFormElement(); // ASIGNO EN ATRIBUTO EL FORM QUE VIENE DE UI FORM
    this._isSending = false;
  }
  /*
   SI EL OBJETIVO ES QUE PAREZCA UNA ACCION CON NOMBRE CLARO =>  USAR METODO (setX()).
  */
  // -------------------------METODOS GETTERS------------------------------------------//
  // MOSTRAR PADRE DIRECTO DEL FORMULARIO
  public getParentForm(): HTMLElement | null {
    return this.formBaseUI.getParentForm();
  }

  // MOSTRAR ELEMENTO FORMULARIO
  public getFormElement(): HTMLFormElement {
    return this.form; // USO EL FORM LOCAL QUE YA GUARDA LO QUE VIENE DEL  ==> "formBaseUI"
  }

  // REFERENCIAR Y RETORNAR PADRE DIRECTO DEL FORMULARIO
  public getClosest(): HTMLElement | null {
    return this.formBaseUI.getClosestSelectorForm();
  }

  // METODO PARA AÑADIR CLASES AL ELEMENTO FORMULARIO
  public setClassListForm(classes: string) {
    this.options._classListForm = classes;
  }

  // AGREGAR CLASE AL FORMULARIO
  public addClassListForm(): void {
    this.formBaseUI.addClassListForm(); // ==> RESPETANDO EL PRINCIPIO DE RESPONSABILIDAD, NO ME IMPORTA COMO AGREGALO EN LA UI
  }

  // REEMPLAZAR CLASES
  public replaceClassListForm(): void {
    this.formBaseUI.setClassListForm(); // ==> RESPETANDO EL PRINCIPIO DE RESPONSABILIDAD, NO ME IMPORTA COMO AGREGALO EN LA UI
  }

  // REMOVER CLASES DEL FORM
  public removeClassListForm(): void {
    this.formBaseUI.removeClassListForm();
  }

  // DEFINIR EL SELECTOR PARA REFERENCIAR CLOSEST DEL FORM
  public setSelectorForClosest(selector: string) {
    this.formBaseUI.setSelector(selector);
  }

  public getSlectorByClosestForm(): string {
    return this.formBaseUI.getSelector();
  }

  // MOSTRAR PADRE DEL FORMULARIO
  public getContainerForm():HTMLElement | null{
    if(this.form.parentElement){
      return this.form.parentElement
    }
    return null;
  };

  public getLabels(): HTMLLabelElement[] {
    if (this.labels.length === 0) return [];
    const isNotUndefined: boolean = this.labels.every((l) => l !== undefined); //VERIFICAR QUE NO HAYA INDEFINIDOS EN NINGUNO
    if (!isNotUndefined) return []; //RETORNAR VACIO EN CASO QUE EXISTA UN UNDEFINED
    return this.labels; //RETORNAR LABELS
  }

  public getInputs(): TFormElement[] {
    if (this.inputs.length === 0) return [];
    const isNotUndefined: boolean = this.inputs.every((l) => l !== undefined); //VERIFICAR QUE NO HAYA INDEFINIDOS EN NINGUNO
    if (!isNotUndefined) return []; //RETORNAR VACIO EN CASO QUE EXISTA UN UNDEFINED
    return this.inputs; //RETORNAR INPUTS
  }

  // METODO PARA AAGREGAR INPUT NUEVO AL ARRAY
  public addNewInput(input: TFormElement): void {
    this.inputs.push(input); // => SE ACEPTAN ENTRADAS => HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  }

  // METODO PARA AAGREGAR LABEL NUEVO AL ARRAY
  public addNewLabel(label: HTMLLabelElement): void {
    this.labels.push(label);
  }

  public async assembleForm(): Promise<void> {
    await this.insertIntoForm();
  }

  /*
  SI EL OBJETIVO ES QUE PAREZCA ESTADO INTERNO => USAR ACCESOR (get/set).  
  */
  //SET COMO PROPIEDADES ACCESORAS
  public get isSending(): boolean {
    return this._isSending;
  }

  public set isSending(value: boolean) {
    this._isSending = value;
  }

  // MOSTRAR OPCIONES ESTABLECIDAS
  public get options(): FormBaseDto {
    return this.formOptions;
  }

  // -------------------------METODOS ABSTRACTOS------------------------------------------//
  // protected abstract getInputAndValidate({ fieldName, value, values, file, files }: Partial<TValidateFieldParams>): { value?: string; validate: TFieldState } | null;
  protected abstract attachFormEvents(): Promise<void>;
  protected abstract insertIntoForm(): Promise<void>;
  public abstract createForm(): Promise<HTMLFormElement> | HTMLFormElement;

  // -------------------------METODO INICIALIZADOR------------------------------------------//
  public async init(): Promise<this> {
    this.formBaseUI.buildFormContainer(this.form);
    await this.createForm();
    await this.attachFormEvents();
    return this;
  }
}
