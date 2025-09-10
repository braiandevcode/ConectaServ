// IMPORTACIONES
import { iMessageErrorField } from "../../../interfaces/interfaces.js";
import { actionClassString } from "../../../ui/auxiliars.js";
import { attrFilled } from "../../../utils/domUtils.js";
import FormBaseDto from "../dto/FormBaseDto.js";

// ============================
// CLASE DE UI PARA TODOS LOS  FORMULARIOS EN COMUN SIN OBLIGAR A TENER QUE IMPLEMENTAR SI O SI LOS METODOS,
// SOLO EN CASOS QUE SE NECESITE USAR UN METODO YA IMPLEMENTADO EN COMUN (POR ESO NO ES ABSTRACTA)
// ============================
export default class FormBaseUI {
  private readonly form: HTMLFormElement;
  private selector: string;
  private isContainerForm: boolean;
  constructor(private readonly options: FormBaseDto) {
    this.isContainerForm = false; // ==> POR DEFECTO FALSE
    this.selector = "";

    this.form = document.createElement("form");
    if (this.options._containerMainForm) {
      this.options._containerMainForm.append(this.form);
      this.isContainerForm = true; // ==> ESTABLECER EN TRUE SI TIENE UN PARE ESPECIFICO
    }
  }

  // METODO PRIVADO PARA EMPEZAR CONSTRUCCION DEL FORMULARIO
  public buildFormContainer(containerForm: HTMLElement): void {
    // SI NO SE AGREGO ATRIBUTO O LA LONGITUD DEL ARRAY DE PARES CLAVE-VALOR ES CERO
    if (!this.options._attributesForm || Object.keys(this.options._attributesForm).length === 0) {
      throw new Error("El formulario debe tener al menos un atributo de referencia unica.");
    }

    if (this.options._attributesForm) {
      const attrs: Record<string, string> = this.options._attributesForm; //GUARDAR EN VARIABLE EL OBJETO DE ATRIBUTOS DEL ELEMENTO FORMULARIO

      //SI INCLUYE ALGUNOS DE ESTOS ATRIBUTOS IDENTIFICATORIOS
      const hasReference: boolean = ["id", "name", "data-id", "data-form-id"].some((key) => Object.hasOwn(attrs, key));

      // SI NO INCLUYE
      if (!hasReference) {
        throw new Error("El formulario necesita un atributo identificador unico como 'id', 'name' o 'data-*'.");
      }

      //SI INCLUYE RECORRER LOS QUE SE AGREGARON PARA AÑADIRLO AL FORM
      attrFilled(this.form, attrs); //AGREGAR ATRIBUTOS DINAMICOS DE FORMUARIO SIN REPETIR setAttribute()
    }

    // SI HAY CLASES AGREGADAS NUEVAS EN CONTENDOR DEL FORMULARIO
    if (this.options._classContainerForm) actionClassString(this.options._classContainerForm, "add", containerForm);

    // SI HAY CLASES AGREGADAS NUEVAS EN EL FORMULARIO
    if (this.options._classListForm) actionClassString(this.options._classListForm, "add", this.form);

    // USAR EL CONTENEDOR SI EXISTE O EL BODY POR DEFECTO
    const parentContainer = this.options._containerSelector ? (document.querySelector(this.options._containerSelector) as HTMLDivElement) : null;
    const container = parentContainer ?? document.body;

    // SI ES TRUE Y SI FORMULARIO TIENE PADRE DIRECTO
    if (this.isContainerForm && this.options._containerMainForm) {
      if (this.options._containerMainForm.firstElementChild) {
        this.options._containerMainForm.removeChild(this.options._containerMainForm.firstElementChild);
      }
      container.appendChild(this.options._containerMainForm);
    } else {
      container.appendChild(this.form);
    }
  }

  // METODO PARA CREACION DE ELEMENTOS PARA MENSAJES DE ERROR DE ENTRADAS EN CAMPOS => NORMALMENTE SE PONE EN UN SPAN DEBAJO DEL INPUT
  public spanError({ text, classesParent, classessChild }: iMessageErrorField): HTMLDivElement {
    const errorSpan = document.createElement("div");
    const spanError = document.createElement("span");

    // SI SE AÑADEN CLASES A PADRE DEL SPAN
    if (classesParent) actionClassString(classesParent, "add", errorSpan);

    // SI SE AÑADEN CLASES AL SPAN
    if (classessChild) actionClassString(classessChild, "add", spanError);

    spanError.textContent = text; //AGREGAR EL TEXTO

    errorSpan.appendChild(spanError);
    return errorSpan;
  }

  // AGREGAR CLASE AL FORMULARIO
  public addClassListForm(): void {
    if (this.options._classListForm) {
      actionClassString(this.options._classListForm, "add", this.form);
    }
  }

  // REEMPLAZAR TODAS LAS CLASES POR LA CADENA UEVA QUE SE LE PASE
  public setClassListForm(): void {
    if (this.options._classListForm) {
      actionClassString(this.options._classListForm, "replace", this.form);
    }
  }

  // REMOVER CLASES AL FORMULARIO
  public removeClassListForm(): void {
    if (this.options._classListForm) {
      actionClassString(this.options._classListForm, "remove", this.form);
    }
  }

  // // METODO UTIL PARA SETEAR EL SELECTRO ANTES DE PASAR AL CLOSEST
  public setSelector(selector: string): void {
    this.selector = selector;
  }

  // METODO UTIL PARA VER UN SELECTOR ESPECIFICO PARA EL CLOSEST
  public getSelector(): string {
    return this.selector;
  }

  // METODO PARA VER ANCESTRO MAS CERCANO DE SER NECESARIO
  public getClosestSelectorForm(): HTMLElement | null{
    return this.form.closest(this.getSelector());
  }

  public getParentForm(): HTMLElement | null {
    return this.isContainerForm ? this.options._containerMainForm ?? null : null;
  }

  public getFormElement(): HTMLFormElement {
    return this.form;
  }
}