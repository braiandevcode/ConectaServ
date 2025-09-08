import { iBuildStepUI } from "../../../../../interfaces/interfaces";
import { EDefaultSelected } from "../../../../../types/enums.js";
import { ButtonFactory } from "../../../../../patterns/factory/ButtonFactory.js";
import ButtonsOptions from "../../../../dto/ButtonBaseOptions.js";
import FormRegister from "../../FormRegister.js";
import InputBuilder from "../../builders/InputBuilder.js";
import FormRegisterUI from "../FormRegisterUI.js";
import FormFieldFactory from "../../../../../patterns/factory/FormFieldFactory.js";
import SelectField from "../../../../../modules/form/components/SelectField.js";
import InputFieldCheck from "modules/form/components/InputFieldCheck";
import { actionClassString } from "../../../../../ui/auxiliars.js";
import { attrFilled } from "../../../../../utils/domUtils.js";
import { TFormElement } from "../../../../../types/types";

// MODULO CLASE UI PARA ULTIMO PASO
export default class FormStepLastUI implements iBuildStepUI {
  private readonly inputsBuilder: InputBuilder;
  constructor(private readonly formRegister: FormRegister, inputBulider: InputBuilder) {
    this.inputsBuilder = inputBulider; // => INYECCION DE DEPENDENCIA
  }
  // CREACION DEL ULTIMO PASO
  public buildStep({formRegisterUI }: { formRegisterUI:FormRegisterUI }): HTMLDivElement {
    const $NEW_STEP: HTMLDivElement = document.createElement("div");

    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled($NEW_STEP, {
      class: "c-flex c-flex-column gap-3/2 form-basic form-$NEW_STEP",
      "data-$NEW_STEP": "3",
    });

    // HEADER
    const $HEADER_MAIN_STEP_LAST: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column c-flex-justify-center gap-1/2 register-formProfessional__header", "add", $HEADER_MAIN_STEP_LAST);

    const $INNER_HEADER: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1 form-professional-groupSpeciality__header", "add", $INNER_HEADER);

    const h3: HTMLHeadingElement = document.createElement("h3");
    actionClassString("c-flex c-flex-items-center gap-1/2 form-professional-groupSpeciality__title", "add", h3);

    const icon: HTMLElement = document.createElement("i");
    actionClassString("fas fa-id-card", "add", icon);

    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = "Informacion basica";

    h3.append(icon, span);
    $INNER_HEADER.appendChild(h3);
    $HEADER_MAIN_STEP_LAST.appendChild($INNER_HEADER);
    $NEW_STEP.appendChild($HEADER_MAIN_STEP_LAST);

    // CAMPOS
    const fields: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1 form-basic__fields", "add", fields);

    const fullNameField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("fullName"),
      iconClass: "fas fa-user-check",
      textSpan: "Nombre completo",
      formRegisterUI,
    });

    const emailField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("email"),
      iconClass: "fas fa-envelope",
      textSpan: "Correo Electronico",
      formRegisterUI,
    });

    const userNameField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("userName"),
      iconClass: "fas fa-user",
      textSpan: "Nombre de usuario",
      formRegisterUI,
    });

    fields.append(fullNameField, userNameField, emailField);

    // LOCATION FIELD CONTAINER
    const $WRAPPER_LOCATION: HTMLDivElement = document.createElement("div");
    attrFilled($WRAPPER_LOCATION, {
      class: "c-flex c-flex-column gap-1/2 form-basic__field form-basic__location",
      "data-message": "location",
    });

    // CREAMOS EL ELEMENTO SELECT DE LOCALIDADES CON SU OPCIONES
    const selectLocationInstance: SelectField = FormFieldFactory.createFieldForm("select", {
      id: "location",
      name: "location",
      value: EDefaultSelected.SELECT_LOCATION,
      disabled: false,
      required: false,
      "aria-label": "selecciona una categoría",
      items: [
        { value: EDefaultSelected.SELECT_LOCATION, text: EDefaultSelected.SELECT_LOCATION, disabled: true, selected: true },
        { value: "olavarria", text: "Olavarria", disabled: false, selected: false },
        { value: "azul", text: "Azul", disabled: false, selected: false },
        { value: "tandil", text: "Tandil", disabled: false, selected: false },
      ],
    });

    // SUSCRIBIR INSTANCIA DEL SELECT A EVENTO ==> onChange
    selectLocationInstance.onChange((val) => {
      this.formRegister.saveDataStepPersistence({ step: 3, elements: [selectLocationInstance.render() as TFormElement]})
    });

    const $SELECT_LOCATION_ELEMENT = selectLocationInstance.render() as HTMLSelectElement;
    // INVOCO METODO AUXILIAR PARA AGREGAR CLASES
    actionClassString("to-left form-basic__location-selectLocationInstance", "add", $SELECT_LOCATION_ELEMENT);

    const $LABEL_LOCATION_ELEMENT: HTMLLabelElement = document.createElement("label");
    $LABEL_LOCATION_ELEMENT.textContent = ""; // => LABEL VACIO
    // INVOCO METODO AUXILIAR AGREGANDO ATRIBUTOS
    attrFilled($LABEL_LOCATION_ELEMENT, {
      class: "c-flex c-flex-items-center gap-1/2 form-basic__label",
      for: $SELECT_LOCATION_ELEMENT.id,
    });

    const $WRAPPER_LOCATION_SPAN_ICON: HTMLSpanElement = document.createElement("span");
    actionClassString("c-flex c-flex-items-center gap-1/2", "add", $WRAPPER_LOCATION_SPAN_ICON);

    const $ICON_LOCATION_MAP_MARKER: HTMLElement = document.createElement("i");
    actionClassString("fas fa-map-marker-alt", "add", $ICON_LOCATION_MAP_MARKER);

    const $SPAN_LOCATION_TEXT: HTMLSpanElement = document.createElement("span");
    $SPAN_LOCATION_TEXT.textContent = "Ubicacion";

    const $SPAN_REQUIRED: HTMLSpanElement = document.createElement("span");
    actionClassString("span-required", "add", $SPAN_REQUIRED);
    $SPAN_REQUIRED.textContent = "*";

    $WRAPPER_LOCATION_SPAN_ICON.append($ICON_LOCATION_MAP_MARKER, $SPAN_LOCATION_TEXT);
    $LABEL_LOCATION_ELEMENT.append($WRAPPER_LOCATION_SPAN_ICON, $SPAN_REQUIRED);

    const $WRAPPER_ERROR_LOCATION: HTMLDivElement = formRegisterUI.spanError({ text: "", classessChild: "has-error" });

    $WRAPPER_LOCATION.append($LABEL_LOCATION_ELEMENT, $SELECT_LOCATION_ELEMENT, $WRAPPER_ERROR_LOCATION);
    fields.appendChild($WRAPPER_LOCATION);

    // PASSWORDS Y CONFIRMPASSWORD
    const fieldPassword: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("password"),
      iconClass: "fas fa-user-lock",
      textSpan: "Contraseña",
      formRegisterUI,
    });

    const fieldConfirmPassword: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("confirmPassword"),
      iconClass: "fas fa-user-lock",
      textSpan: "Confirmar contraseña",
      formRegisterUI,
    });

    fields.append(fieldPassword, fieldConfirmPassword);

    $NEW_STEP.appendChild(fields);

    // TERMINOS Y CONDICIONES
    const termsWrapper: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-justify-center c-flex-basis-full gap-3/2 form-basic register-formProfessional__terms", "add", termsWrapper);

    const termsInner: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-justify-center c-flex-items-center gap-1 register-formProfessional__checkbox", "add", termsInner);

    // CAMPO DE MONTO DE PRESUPUESTO
    const input: InputFieldCheck = FormFieldFactory.createFieldForm("inputCheck", {
      id: "terms",
      name: "terms",
      type: "checkbox",
      value: "",
      checked: false,
      required: false,
      disabled: false,
    });

    const termsInput = input.render() as HTMLInputElement;
    const termsLabel: HTMLLabelElement = document.createElement("label");

    actionClassString("c-flex c-flex-items-center c-flex-justify-center register-formProfessional__checkbox-input", "add", termsInput);

    actionClassString("register-formProfessional__checkbox-label", "add", termsLabel);
    termsLabel.innerHTML = `Acepto los 
            <a href="../pages/termsAndConditions.html" class="register-formProfessional__link">Términos y Condiciones</a> y la 
            <a href="../pages/privacyPolicy.html" class="register-formProfessional__link">Política de Privacidad</a> de ConectaServ`;

    termsInner.append(termsInput, termsLabel);
    termsWrapper.appendChild(termsInner);
    $NEW_STEP.appendChild(termsWrapper);

    const $CONTAINER_BTN: HTMLDivElement = document.createElement("div");
    actionClassString("mb-2 c-flex c-flex-justify-end", "add", $CONTAINER_BTN);

    const InstanceConfigBtnSubmit: ButtonsOptions = new ButtonsOptions({
      type: "submit",
      btnText: "Enviar",
      classesBtn: "btn c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer container-btn__next",
      attrs: { "data-$NEW_STEP": 3 },
      iconBtnClasses: "fas fa-user-plus",
      disabled: true,
    });
    // CREAR BOTON Y ESTABLECER CONFIGURACION
    const btnNextInstance = ButtonFactory.createButton("submit", InstanceConfigBtnSubmit);

    $CONTAINER_BTN.appendChild(btnNextInstance.getElement()); // ==> AGREGA ELEMENTO 

    $NEW_STEP.appendChild($CONTAINER_BTN);

    // EJECUTAR EVENTO DE INPUTS DE LAS INSTANCIAS
    this.inputsBuilder.getInstanceFields().forEach((instance) => {
      instance.onInput((val) => {
        console.log(val);
        this.formRegister.saveDataStepPersistence({ step: 3, elements:[instance.render() as TFormElement] });
      });
    });

    return $NEW_STEP;
  }
}
