// IMPORTACIONES
import { iAttributesContentForm } from "../../../../interfaces/interfaces";
import FormRegisterUI from "../ui/FormRegisterUI.js";
import InputField from "../../components/InputField.js";
import FormFieldFactory from "../../../../patterns/factory/FormFieldFactory.js";
import { actionClassString } from "../../../../ui/auxiliars.js";
import { attrFilled } from "../../../../utils/domUtils.js";
import FormRegister from "../FormRegister";

// BUILDER PARA CREACIÓN DE CAMPOS DE FORMULARIO
export default class InputBuilder{
  private inputs: HTMLInputElement[];
  private instanceFields: InputField[];
  constructor(private readonly formRegister: FormRegister) {
    this.inputs = [];
    this.instanceFields = [];
  }
  //------------------METODOS PUBLICOS--------------------------------------//

  // METODO PARA CREACION DE CAMPO => text, password, email, tel etc...(EN CADA LLAMADA UNA NUEVA INSTANCIA Y CREACION DE CUERPO REUTILIZABLE)
  public createField({ attrsInput, iconClass, textSpan, formRegisterUI }: Pick<iAttributesContentForm, "attrsInput"> & { textSpan: string; iconClass: string, formRegisterUI:FormRegisterUI }): HTMLDivElement {
    const wrapper = document.createElement("div");

    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled(wrapper, {
      class:"c-flex c-flex-column gap-1/2 form-basic__field",
      "data-message": attrsInput.id,
    });
    
    //CREO Y CONFIGURO LA INSTANCIA DE ESTE MOMENTO
    const inputInstance: InputField = FormFieldFactory.createFieldForm("input", {
      id: attrsInput.id,
      name: attrsInput.name,
      type: attrsInput.type ?? "text",
      value: attrsInput.value ?? "",
      required: attrsInput.disabled ?? false,
      disabled: attrsInput.disabled ?? false,
      autocomplete: attrsInput.autocomplete,
      autofocus: attrsInput.autofocus,
      "aria-label": attrsInput["aria-label"],
      lang: attrsInput.lang,
      spellcheck: attrsInput.spellcheck ?? false,
      placeholder: attrsInput.placeholder,
    });

    this.instanceFields.push(inputInstance); //GUARDAR NUEVA INSSTANCIA EN ARRAY

    const $INPUT_ELEMENT = inputInstance.render() as HTMLInputElement;
    // AUXILIAR PARA AGREGAR CLASES EN STRING SEPARADOS POR ESPACIOS
    actionClassString("form-basic__input", "add", $INPUT_ELEMENT);
    this.inputs.push($INPUT_ELEMENT); //GUARDAR NUEVO ELEMENTO INPUT DE CAMPO EN ARRAY
    this.formRegister.addNewInput($INPUT_ELEMENT); //==> AGREGO NUEVO INPUT AL FORM

    const label: HTMLLabelElement = document.createElement("label");

    attrFilled(label, {
      class: "c-flex c-flex-items-center gap-1/2 form-basic__label",
      for:attrsInput.id,
    });
    this.formRegister.addNewLabel(label); //==> AGREGO NUEVO LABEL AL FORM

    const iconWrap = document.createElement("span");
    actionClassString("c-flex c-flex-items-center gap-1/2", "add", iconWrap);
  
    const icon = document.createElement("i");
    actionClassString(iconClass, "add", icon); //AGREGAR LAS CLASES DINAMICAMENTE PASAR COMO STRING

    const text = document.createElement("span");
    text.textContent = textSpan;

    const required = document.createElement("span");
    actionClassString("span-required", "add", required);
    required.textContent = "*";

    iconWrap.append(icon, text);
    label.append(iconWrap, required);

    const errorContainer:HTMLDivElement = formRegisterUI.spanError({ text: "", classesParent:"containerMsgError", classessChild: "has-error" });

    wrapper.append(label, $INPUT_ELEMENT, errorContainer);
    return wrapper;
  }

  // VER ARRAY CON TODOS LOS CAMPOS
  public getInputs(): HTMLInputElement[] {
    return this.inputs;
  }

  // VER ARRAY CON TODAS LAS INSTANCIAS
  public getInstanceFields(): InputField[] {
    return this.instanceFields;
  }

  // MOSTRAR INSTANCIA DEL FORMULARIO
  public getFormRegister():FormRegister{
    return this.formRegister;
  }

  //OBJETIVO DEL METODO => REUTILIZAR LOGICA Y TRABAJAR SOBRE INSTANCIAS ACTUALES
  public getFieldByName(name: string): InputField {
    return this.getInstanceFields().find((field) => field.getName() === name) as InputField;
  }
}