import FormFieldFactory from "../../../patterns/factory/FormFieldFactory.js";
import FormBaseOptions from "../../../modules/dto/FormBaseOptions.js";
import InputField from "../components/InputField.js";
import VerifyCodeForm from "../verifyCode/VerifyCodeForm.js";
import FormBaseUI from "./FormBaseUI.js";

// CLASE QUE SE ENCARGA DE CREACION Y/O LA UI EN FORMULARIO DE CODIGO DE VERIFICACION DE CORREO
export default class VerifyCodeFormUI extends FormBaseUI {
  constructor(options: FormBaseOptions) {
    super(options);
  }

  // CREAR CAMPO FORMULARIO VERIFICACION DE CODIGO
  public createFieldForm(formCode: VerifyCodeForm): void {
    const group = document.createElement("div"); //CONTENEDOR DE LABEL E INPUTS
    const containerSpan: HTMLDivElement = document.createElement("div");
    const span: HTMLSpanElement = document.createElement("span");
    span.classList.add("has-error");

    group.classList.add("c-flex", "c-flex-column", "gap-1/2");

    // INSTANCIA DE INPUT
    const inputEmail: InputField = FormFieldFactory.createFieldForm("input",{
      id: "emailCode",
      type: "text",
      placeholder: "Codigo",
      autocomplete:false,
      name: "emailCode",
      disabled:false,
      required:true,
      value:"",
    });

    const input = inputEmail.render() as HTMLInputElement;

    const label:HTMLLabelElement = document.createElement('label');

    label.textContent = "Código de verificación"

    formCode.addNewInput(input);
    formCode.addNewLabel(label);

    group.setAttribute("data-message", String(input.name)); //SE LE ASIGNA MISMO VALOR DE NAME
    containerSpan.appendChild(span);

    group.append(label, input, containerSpan);
  }
}
