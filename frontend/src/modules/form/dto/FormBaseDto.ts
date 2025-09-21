import {iFormOptions} from '../../../interfaces/interfaces';

// CLASE DE OPCIONES DE FORMULARIO
export default class FormBaseDto {
  constructor(private config: iFormOptions) {}

  // ----GETTERS Y SETTERS ACCESORIOS-----------//

  // MOSTRAR ATRIBUTOS DEL FORMULARIO
  public get _attributesForm(): Record<string, string> | undefined {
    return this.config.attributesForm;
  }

  // MOSTRAR CLASES DEL MISMO FORMULARIO
  public get _classListForm(): string | undefined {
    return this.config.classListForm;
  }

  // MOSTRAR CLASES DE PADRE CONTENEDORES O GRUPOS DE INPUTS
  public get _classGroupInputs(): string | undefined {
    return this.config.classGroupInputs;
  }

  //MOSTRAR PADRE PRINCIPAL DEL FORMULARIO QUE ES CREADO AL MOMENTO DE LA CREACION DEL FORMULARIO
  public get _containerMainForm(): HTMLElement | null {
    return this.config.containerMainForm ?? null;
  }

  //  MOSTRAR CLASES DEL PADRE DEL FORMULARIO
  public get _classContainerForm(): string | undefined {
    return this.config.classContainerForm;
  }

  // MOSTRAR SELECTOR A DONDE SE AGREGARIA TODO EL FRAGMENTO DE CREACION DEL FORMULARIO
  public get _containerSelector(): string {
    return this.config.containerSelector;
  }

  // ---------- SETTERS ----------
  // MODIFICAR OBJETO DE ATRIBUTOS AL FORMULARIO
  public set _attributesForm(attrs: Record<string, string> | undefined) {
    this.config.attributesForm = attrs;
  }

  // MODIFICAR CLASES AL FORMULARIO
  public set _classListForm(value: string | undefined) {
    this.config.classListForm = value;
  }

  // MODIFICAR CLASES AL GRUPO DE INPUTS
  public set _classGroupInputs(value: string | undefined) {
    this.config.classGroupInputs = value;
  }

  // MODIFICAR CLASES AL CONTENEDOR PADRE DEL FORMULARIO
  public set _classContainerForm(value: string | undefined) {
    this.config.classContainerForm = value;
  }

  // MODIFICAR CLASES DE SELECTOR DADO AL CONTENEDOR PADRE DIRECTO DEL FORMULARIO
  public set _containerSelector(value: string) {
    this.config.containerSelector = value;
  }
}
