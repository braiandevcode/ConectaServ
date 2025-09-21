// IMPORTACIONES
import { iMessageErrorField } from '../../../interfaces/interfaces.js';
import { actionClassString } from '../../../ui/auxiliars.js';
import { attrFilled } from '../../../utils/domUtils.js';
import FormBaseDto from '../dto/FormBaseDto.js';

// ============================
// CLASE DE UI PARA TODOS LOS  FORMULARIOS EN COMUN SIN OBLIGAR A TENER QUE IMPLEMENTAR SI O SI LOS METODOS,
// SOLO EN CASOS QUE SE NECESITE USAR UN METODO YA IMPLEMENTADO EN COMUN (POR ESO NO ES ABSTRACTA)
// ============================
export default class FormBaseUI {
  private readonly form: HTMLFormElement;
  private selector: string;
  private isContainerForm: boolean;
  constructor(private readonly formBaseDto: FormBaseDto) {
    this.isContainerForm = false; // ==> POR DEFECTO FALSE
    this.selector = ''; //INICIALIZAMOS VACIO

    this.form = document.createElement('form'); //CREAR ETIQUETA FORM

    // SI EN EL DTO SE LE APLICA EL CONTENEDOR PRINCIPAL DEL FORM
    if (this.formBaseDto._containerMainForm) {
      this.formBaseDto._containerMainForm.appendChild(this.form); //AGREGARLE EL FORMULARIO
      this.isContainerForm = true; // ==> ESTABLECER EN TRUE SI TIENE UN PADRE ESPECIFICO
    }
  }

  // METODO PRIVADO PARA EMPEZAR CONSTRUCCION DEL FORMULARIO
  public buildFormContainer(containerForm: HTMLElement): void {
    // SI NO SE AGREGO ATRIBUTO O LA LONGITUD DEL ARRAY DE PARES CLAVE-VALOR ES CERO
    if (!this.formBaseDto._attributesForm || Object.keys(this.formBaseDto._attributesForm).length === 0) {
      throw new Error('El formulario debe tener al menos un atributo de referencia unica.');
    }

    if (this.formBaseDto._attributesForm) {
      const attrs: Record<string, string> = this.formBaseDto._attributesForm; //GUARDAR EN VARIABLE EL OBJETO DE ATRIBUTOS DEL ELEMENTO FORMULARIO

      //SI INCLUYE ALGUNOS DE ESTOS ATRIBUTOS IDENTIFICATORIOS
      const hasReference: boolean = ['id', 'name', 'data-id', 'data-form-id'].some((key) => Object.hasOwn(attrs, key));

      // SI NO INCLUYE
      if (!hasReference) {
        throw new Error("El formulario necesita un atributo identificador unico como 'id', 'name' o 'data-*'.");
      }

      //SI INCLUYE RECORRER LOS QUE SE AGREGARON PARA AÑADIRLO AL FORM
      attrFilled(this.form, attrs); //AGREGAR ATRIBUTOS DINAMICOS DE FORMUARIO SIN REPETIR setAttribute()
    }

    // SI HAY CLASES AGREGADAS NUEVAS EN CONTENDOR DEL FORMULARIO
    if (this.formBaseDto._classContainerForm) actionClassString(this.formBaseDto._classContainerForm, 'add', containerForm);

    // SI HAY CLASES AGREGADAS NUEVAS EN EL FORMULARIO
    if (this.formBaseDto._classListForm) actionClassString(this.formBaseDto._classListForm, 'add', this.form);

    // USAR EL CONTENEDOR SI EXISTE O EL BODY POR DEFECTO
    const parentContainer = this.formBaseDto._containerSelector ? (document.querySelector(this.formBaseDto._containerSelector) as HTMLDivElement) : null;
    const container = parentContainer ?? document.body;

    // SI ES TRUE Y SI FORMULARIO TIENE PADRE DIRECTO
    if (this.isContainerForm && this.formBaseDto._containerMainForm) {
      if (this.formBaseDto._containerMainForm.firstElementChild) {
        this.formBaseDto._containerMainForm.removeChild(this.formBaseDto._containerMainForm.firstElementChild);
      }
      container.appendChild(this.formBaseDto._containerMainForm);
    } else {
      container.appendChild(this.form);
    }
  }

  // METODO PARA CREACION DE ELEMENTOS PARA MENSAJES DE ERROR DE ENTRADAS EN CAMPOS => NORMALMENTE SE PONE EN UN SPAN DEBAJO DEL INPUT
  public spanError({ text, classesParent, classessChild }: iMessageErrorField): HTMLDivElement {
    const errorSpan = document.createElement('div');
    const spanError = document.createElement('span');

    // SI SE AÑADEN CLASES A PADRE DEL SPAN
    if (classesParent) actionClassString(classesParent, 'add', errorSpan);

    // SI SE AÑADEN CLASES AL SPAN
    if (classessChild) actionClassString(classessChild, 'add', spanError);

    spanError.textContent = text; //AGREGAR EL TEXTO

    errorSpan.appendChild(spanError);
    return errorSpan;
  }

  // AGREGAR CLASE AL FORMULARIO
  public addClassListForm(): void {
    if (this.formBaseDto._classListForm) {
      actionClassString(this.formBaseDto._classListForm, 'add', this.form);
    }
  }

  // REEMPLAZAR TODAS LAS CLASES POR LA CADENA UEVA QUE SE LE PASE
  public setClassListForm(): void {
    if (this.formBaseDto._classListForm) {
      actionClassString(this.formBaseDto._classListForm, 'replace', this.form);
    }
  }

  // REMOVER CLASES AL FORMULARIO
  public removeClassListForm(): void {
    if (this.formBaseDto._classListForm) {
      actionClassString(this.formBaseDto._classListForm, 'remove', this.form);
    }
  }

  // CAMBIAR BOOLEAN DE SI TIENE O NO PADRE
  public setIsContainerMain(isContainer: boolean): void {
    this.isContainerForm = isContainer;
  }

  public getIsContainerMain(): boolean {
    return this.isContainerForm;
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
  public getClosestSelectorForm(): HTMLElement | null {
    return this.form.closest(this.getSelector()); //LEER SELECTOR QUE SE LE PASE
  }

  public getParentForm(): HTMLElement | null {
    return this.isContainerForm ? (this.formBaseDto._containerMainForm ?? null) : null;
  }

  public getFormElement(): HTMLFormElement {
    return this.form;
  }
}
