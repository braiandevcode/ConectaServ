import { iFormOptions } from "../../interfaces/interfaces";

// CLASE DE OPCIONES DE FORMULARIO
export default class FormBaseDto {
  constructor(private config: iFormOptions) {}

  // ---------- GETTERS ----------
  public get _attributesForm(): Record<string, string> | undefined {
    return this.config.attributesForm;
  }

  public get _classListForm(): string | undefined {
    return this.config.classListForm;
  }

  public get _classGroupInputs(): string | undefined {
    return this.config.classGroupInputs;
  }

  public get _containerMainForm(): HTMLElement | null {
    return this.config.containerMainForm ?? null;
  }

  public get _classContainerForm(): string | undefined {
    return this.config.classContainerForm;
  }

  public get _containerSelector(): string {
    return this.config.containerSelector;
  }

  // ---------- SETTERS ----------
  public set _attributesForm(attrs: Record<string, string> | undefined) {
    this.config.attributesForm = attrs;
  }

  public set _classListForm(value: string | undefined) {
    this.config.classListForm = value;
  }

  public set _classGroupInputs(value: string | undefined) {
    this.config.classGroupInputs = value;
  }

  public set _classContainerForm(value: string | undefined) {
    this.config.classContainerForm = value;
  }

  public set _containerSelector(value: string) {
    this.config.containerSelector = value;
  }
}
