import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';
import { iBuildStepUI } from '../../../interfaces/interfaces';
import { ButtonFactory } from '../../../patterns/factory/ButtonFactory.js';
import FormFieldFactory from '../../../patterns/factory/FormFieldFactory.js';
import { EDefaultSelected, EKeyDataByStep, ELocationKey, ENamesOfKeyLocalStorage } from '../../../types/enums.js';
import { TFormElement, TLocationKey } from '../../../types/types';
import { actionClassString } from '../../../ui/auxiliars.js';
import { attrFilled } from '../../../utils/domUtils.js';
import ButtonBaseDto from '../../buttons/dto/ButtonsBaseDto.js';
import InputFieldCheck from '../../fields/components/InputFieldCheck.js';
import SelectField from '../../fields/components/SelectField.js';
import FormRegister from '../controller/FormRegister.js';
import InputBuilder from './builder/InputBuilder.js';
import FormRegisterUI from './FormRegisterUI.js';
import { readExistingData } from '../../../utils/storageUtils.js';

// MODULO CLASE UI PARA ULTIMO PASO
export default class FormStepLastUI implements iBuildStepUI {
  private readonly inputsBuilder: InputBuilder;
  constructor(
    private readonly formRegister: FormRegister,
    inputBulider: InputBuilder,
  ) {
    this.inputsBuilder = inputBulider; // => INYECCION DE DEPENDENCIA
  }
  // CREACION DEL ULTIMO PASO
  public buildStep({ formRegisterUI }: { formRegisterUI: FormRegisterUI }): HTMLDivElement {
    //LLAMAR A DATOS DE PERSISTENCIA AQUI
    const existingData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);

    const stepLastData = existingData[EKeyDataByStep.FOUR] ?? {};

    // LEER PERSISTENCIA DE ATRIBUTO LOCATION PARA EL SELECT
    const persistedLocation = stepLastData.location ?? EDefaultSelected.SELECT_LOCATION;

    const $NEW_STEP: HTMLDivElement = document.createElement('div');

    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled($NEW_STEP, {
      class: 'c-flex c-flex-column gap-3/2 form-basic form-step',
      'data-step': `${this.formRegister.getStepForm()}`,
    });

    // HEADER
    const $HEADER_MAIN_STEP_LAST: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-column c-flex-justify-center gap-1/2 register-formProfessional__header', 'add', $HEADER_MAIN_STEP_LAST);

    const $INNER_HEADER: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-items-center gap-1 form-professional-groupSpeciality__header', 'add', $INNER_HEADER);

    const h3: HTMLHeadingElement = document.createElement('h3');
    actionClassString('c-flex c-flex-items-center gap-1/2 form-professional-groupSpeciality__title', 'add', h3);

    const icon: HTMLElement = document.createElement('i');
    actionClassString('fas fa-id-card', 'add', icon);

    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = 'Informacion basica';

    h3.append(icon, span);
    $INNER_HEADER.appendChild(h3);
    $HEADER_MAIN_STEP_LAST.appendChild($INNER_HEADER);
    $NEW_STEP.appendChild($HEADER_MAIN_STEP_LAST);

    // CAMPOS
    const fields: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-column gap-1 form-basic__fields', 'add', fields);

    const fullNameField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs('fullName'),
      iconClass: 'fas fa-user-check',
      textSpan: 'Nombre completo',
      formRegisterUI,
    });

    const emailField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs('email'),
      iconClass: 'fas fa-envelope',
      textSpan: 'Correo Electronico',
      formRegisterUI,
    });

    const userNameField: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs('userName'),
      iconClass: 'fas fa-user',
      textSpan: 'Nombre de usuario',
      formRegisterUI,
    });

    fields.append(fullNameField, userNameField, emailField);

    // LOCATION FIELD CONTAINER
    const $WRAPPER_LOCATION: HTMLDivElement = document.createElement('div');
    attrFilled($WRAPPER_LOCATION, {
      class: 'c-flex c-flex-column gap-1/2 form-basic__field form-basic__location',
      'data-message': 'location',
    });

    // CREAMOS EL ELEMENTO SELECT DE LOCALIDADES CON SU OPCIONES
    const selectLocationInstance: SelectField = FormFieldFactory.createFieldForm('select', {
      id: 'location',
      name: 'location',
      value: persistedLocation,
      disabled: false,
      required: false,
      'aria-label': 'selecciona una categoría',
      autofocus: false,
      items: [
        {
          value: EDefaultSelected.SELECT_LOCATION,
          text: EDefaultSelected.SELECT_LOCATION,
          disabled: true,
          selected: true,
        },
        { value: ELocationKey.OLAVARRIA, text: 'Olavarria', disabled: false, selected: false },
        { value: ELocationKey.AZUL, text: 'Azul', disabled: false, selected: false },
        { value: ELocationKey.TANDIL, text: 'Tandil', disabled: false, selected: false },
      ],
    });

    const $SELECT_LOCATION_ELEMENT = selectLocationInstance.render() as HTMLSelectElement;
    // INVOCO METODO AUXILIAR PARA AGREGAR CLASES
    actionClassString('to-left form-basic__location-selectLocationInstance', 'add', $SELECT_LOCATION_ELEMENT);

    const $LABEL_LOCATION_ELEMENT: HTMLLabelElement = document.createElement('label');
    $LABEL_LOCATION_ELEMENT.textContent = ''; // => LABEL VACIO
    // INVOCO METODO AUXILIAR AGREGANDO ATRIBUTOS
    attrFilled($LABEL_LOCATION_ELEMENT, {
      class: 'c-flex c-flex-items-center gap-1/2 form-basic__label',
      for: $SELECT_LOCATION_ELEMENT.id,
    });

    const $WRAPPER_LOCATION_SPAN_ICON: HTMLSpanElement = document.createElement('span');
    actionClassString('c-flex c-flex-items-center gap-1/2', 'add', $WRAPPER_LOCATION_SPAN_ICON);

    const $ICON_LOCATION_MAP_MARKER: HTMLElement = document.createElement('i');
    actionClassString('fas fa-map-marker-alt', 'add', $ICON_LOCATION_MAP_MARKER);

    const $SPAN_LOCATION_TEXT: HTMLSpanElement = document.createElement('span');
    $SPAN_LOCATION_TEXT.textContent = 'Ubicacion';

    const $SPAN_REQUIRED: HTMLSpanElement = document.createElement('span');
    actionClassString('span-required', 'add', $SPAN_REQUIRED);
    $SPAN_REQUIRED.textContent = '*';

    $WRAPPER_LOCATION_SPAN_ICON.append($ICON_LOCATION_MAP_MARKER, $SPAN_LOCATION_TEXT);
    $LABEL_LOCATION_ELEMENT.append($WRAPPER_LOCATION_SPAN_ICON, $SPAN_REQUIRED);

    const $WRAPPER_ERROR_LOCATION: HTMLDivElement = formRegisterUI.spanError({
      text: '',
      classessChild: 'has-error',
    });

    $WRAPPER_LOCATION.append($LABEL_LOCATION_ELEMENT, $SELECT_LOCATION_ELEMENT, $WRAPPER_ERROR_LOCATION);
    fields.appendChild($WRAPPER_LOCATION);

    // SUSCRIBIR INSTANCIA DEL SELECT A EVENTO ==> onChange
    selectLocationInstance.onChange((val) => {
      const currentLocation = val as TLocationKey;
      if (currentLocation) {
        this.formRegister.saveDataStepPersistence({
          step: this.formRegister.getStepForm(),
          elements: [selectLocationInstance.render() as TFormElement],
        });
      }
    });

    selectLocationInstance.triggerEvent('change');

    // PASSWORDS Y CONFIRMPASSWORD
    const fieldPassword: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs('password'),
      iconClass: 'fas fa-user-lock',
      textSpan: 'Contraseña',
      formRegisterUI,
    });

    const fieldConfirmPassword: HTMLDivElement = this.inputsBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs('confirmPassword'),
      iconClass: 'fas fa-user-lock',
      textSpan: 'Confirmar contraseña',
      formRegisterUI,
    });

    fields.append(fieldPassword, fieldConfirmPassword);

    $NEW_STEP.appendChild(fields);

    // TERMINOS Y CONDICIONES
    const termsWrapper: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-justify-center c-flex-basis-full gap-3/2 form-basic register-formProfessional__terms', 'add', termsWrapper);

    const termsInner: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-justify-center c-flex-items-center gap-1 register-formProfessional__checkbox', 'add', termsInner);

    // CAMPO DE MONTO DE PRESUPUESTO
    const input: InputFieldCheck = FormFieldFactory.createFieldForm('inputCheck', {
      id: 'terms',
      name: 'terms',
      type: 'checkbox',
      value: '',
      checked: false,
      required: true,
      disabled: false,
      autofocus: false,
    });

    // SUSCRIBO EVENTO CHANGE AL TERMS
    const termsInput = input.render() as HTMLInputElement;

    input.onChange((val) => {
      console.log('Valor terms:', val);
      this.formRegister.saveDataStepPersistence({ step: this.formRegister.getStepForm(), elements: [termsInput as TFormElement] });
    });

    const termsLabel: HTMLLabelElement = document.createElement('label');

    actionClassString('c-flex c-flex-items-center c-flex-justify-center register-formProfessional__checkbox-input', 'add', termsInput);

    actionClassString('register-formProfessional__checkbox-label', 'add', termsLabel);
    termsLabel.innerHTML = `Acepto los 
            <a href="../pages/termsAndConditions.html" class="register-formProfessional__link">Términos y Condiciones</a> y la 
            <a href="../pages/privacyPolicy.html" class="register-formProfessional__link">Política de Privacidad</a> de ConectaServ`;

    termsInner.append(termsInput, termsLabel);
    termsWrapper.appendChild(termsInner);
    $NEW_STEP.appendChild(termsWrapper);

    const $CONTAINER_BTN: HTMLDivElement = document.createElement('div');
    actionClassString('mb-2 c-flex c-flex-justify-end', 'add', $CONTAINER_BTN);

    const InstanceConfigBtnSubmit: ButtonBaseDto = new ButtonBaseDto({
      type: 'submit',
      btnText: 'Enviar',
      classesBtn: 'btn c-flex c-flex-justify-center c-flex-items-center gap-1/2 cursor-pointer container-btn__next',
      attrs: { 'data-step': this.formRegister.getStepForm() },
      iconBtnClasses: 'fas fa-user-plus',
      disabled: false,
      eventName: 'click',
      handler: () => {}, // EN ESTE PUNTO EL BOTON NO DEBE HACER NADA SE ENCARGA EL FORMULARIO
      isLoading: false,
    });

    // CREAR BOTON Y ESTABLECER CONFIGURACION
    const btnNextInstance: ButtonBaseUI = ButtonFactory.createButton('submit', InstanceConfigBtnSubmit);

    $CONTAINER_BTN.appendChild(btnNextInstance.getBtnElement()); // ==> AGREGA ELEMENTO

    $NEW_STEP.appendChild($CONTAINER_BTN);

    // EJECUTAR EVENTO POR CADA INSTANCIA DE INPUT
    this.inputsBuilder.getInstanceFields().forEach((instance) => {
      // RECORRE CADA INSTANCIA DE INPUT SUSCRIBIENDO A SU EVENTO "input"
      instance.onInput((val) => {
        console.dir(`campo: ${instance.getName()} valor: ${val}`);
        this.formRegister.saveDataStepPersistence({
          step: this.formRegister.getStepForm(),
          elements: [instance.render() as TFormElement],
        });
      });
    });

    return $NEW_STEP;
  }
}
