// IMPORTACIONES

import { iBuildStepUI } from "../../../interfaces/interfaces";
import { ValidatorFactory } from "../../../patterns/factory/ValidatorFactory.js";
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from "../../../types/enums.js";
import { TFieldState } from "../../../types/types.js";
import { actionClassString } from "../../../ui/auxiliars.js";
import { attrFilled } from "../../../utils/domUtils.js";
import { readExistingData } from "../../../utils/storageUtils.js";
import { ButtonNext } from "../../buttons/components/ButtonNext.js";
import InputField from "../../fields/components/InputField.js";
import InputFieldCheck from "../../fields/components/InputFieldCheck.js";
import FormRegister from "../controller/FormRegister.js";
import InputBuilder from "./builder/InputBuilder.js";
import OptionGroupBuilder from "./builder/OptionGrouBuilder.js";
import FormRegisterUI from "./FormRegisterUI.js";
import FormStepUI from "./FormStepUI.js";


// MODULO CLASE UI PARA CONSTRUCCION DEL PASO PRESUPUESTO
export default class FormStepThreeUI implements iBuildStepUI {
  private readonly optionGroupBuilder: OptionGroupBuilder;
  private readonly inputBuilder: InputBuilder;
  private readonly formRegister: FormRegister;
  constructor(inputBuilder: InputBuilder, optionGroupBuilder: OptionGroupBuilder) {
    this.optionGroupBuilder = optionGroupBuilder;
    this.inputBuilder = inputBuilder;
    this.formRegister = this.inputBuilder.getFormRegister();
  }

  // CREACION DEL PASO PRESUPUESTO ==> PASO 3 SIEMPRE QUE EXISTA
  public buildStep({ formRegisterUI }: { formRegisterUI: FormRegisterUI; formStepUI?: FormStepUI }): HTMLDivElement {
    const $NEW_STEP: HTMLDivElement = document.createElement("div"); // ==> NUEVO PASO
    // AGREGAR  ATRIBUTOS A CONTENEDOR DE NUEVO PASO
    attrFilled($NEW_STEP, {
      class: "mb-2 c-flex c-flex-column gap-1 form-professional-groupBudget form-step",
      "data-step": `${this.formRegister.getStepForm()}`,
    });

    const $HEADER_STEP: HTMLDivElement = this.budgeHeaderMainStep(); //CREACION DE CABECERA PRINCIPAL DE PRESUPUESTO

    $NEW_STEP.appendChild($HEADER_STEP);

    const $HEADER_GROUP_RADIO_BUDGE: HTMLDivElement = this.buildHeaderTitleRadioBudge(); //CREACION CABECERA RADIOS GRUPO PRESUPUESTO

    const $RADIO_GROUP_BUDGE: HTMLDivElement = document.createElement("div"); // CREAR GRUPO RADIOS PRESUPUESTO
    actionClassString("c-flex c-flex-items-center gap-1/2 radio-group", "add", $RADIO_GROUP_BUDGE);

    // PRESUPUESTO EN SI
    const $RADIO_BUDGE_YES: HTMLLabelElement = this.optionGroupBuilder.createRadioLabel({
      value: "yes",
      labelText: "Sí",
      checked: false,
      disabled: false,
      name: "budgeSelected",
      customClasses: ["form-professional-groupBudget__radioGroup"],
    });

    // PRESUPUESTO EN NO
    const $RADIO_BUDGE_NO:HTMLLabelElement = this.optionGroupBuilder.createRadioLabel({
      value: "no",
      labelText: "No",
      checked: true,
      disabled: false,
      name: "budgeSelected",
      customClasses: ["form-professional-groupBudget__radioGroup"],
    });

    // AGREGAR RADIO AL GRUPO 1
    $RADIO_GROUP_BUDGE.append($RADIO_BUDGE_YES, $RADIO_BUDGE_NO);

    $HEADER_GROUP_RADIO_BUDGE.appendChild($RADIO_GROUP_BUDGE);
    $NEW_STEP.appendChild($HEADER_GROUP_RADIO_BUDGE);

    // CUERPO COMPLETO QUE CONTIENE AL CAMPO DE MONTO DE PRESUPUESTO
    const $BODY_INPUT_AMOUNT_BUDGE: HTMLDivElement = this.inputBuilder.createField({
      attrsInput: this.formRegister.addAttributesInputs("amountBudge"), //TRAEMOS SU CONFIG DEFAULT DE ARCHIVO CONSTANTS
      iconClass: "fas fa-dollar-sign",
      textSpan: "Precio fijo del presupuesto",
      formRegisterUI,
    });

    $NEW_STEP.appendChild($BODY_INPUT_AMOUNT_BUDGE);
    const $HEADER_GROUP_RADIO_REINSERT: HTMLDivElement = this.buildHeaderTitleRadioReinsert(); //CREACION CABECERA RADIOS GRUPO REINGRESO

    const $RADIO_GROUP_REINSERT: HTMLDivElement = document.createElement("div");
    actionClassString("mb-2 c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__radioGroup radio-group", "add",$RADIO_GROUP_REINSERT)
  
    // REEMBOLSO NO
    const $RADIO_REINSERT_NO = this.optionGroupBuilder.createRadioLabel({
      value: "no",
      labelText: "No",
      checked: true,
      disabled: true,
      name: "reinsert",
      customClasses: ["form-professional-groupBudget__radioOption"],
    });

    // REMBOLSO SI
    const $RADIO_REINSERT_YES = this.optionGroupBuilder.createRadioLabel({
      value: "yes",
      labelText: "Sí",
      checked: false,
      disabled: true,
      name: "reinsert",
      customClasses: ["form-professional-groupBudget__radioOption"],
    });

    // APROVECHAMOS FILTROS POR SU NAME NUEVO ARRAY
    const filterByNameOfBudge: InputFieldCheck[] = this.optionGroupBuilder.filterCheckByName("budgeSelected"); // => INSTANCIAS CON BUDGE
    const filterByNameOfReinsert: InputFieldCheck[] = this.optionGroupBuilder.filterCheckByName("reinsert"); // => INSTANCIAS CON REINSERT

    const inputAmountInstance = this.inputBuilder.getFieldByName("amountBudge") as InputField; //INSTANCIA POR SU NAME

    // SUSCRIBIR EVENTO INPUT
    inputAmountInstance.onInput((val) => this.handlerBudgeAmount(val, inputAmountInstance));

    // AGREGAR INPUTS RADIOS CON SUS VALUES Y BOOLEAN
    $RADIO_GROUP_REINSERT.append($RADIO_REINSERT_YES, $RADIO_REINSERT_NO);

    $HEADER_GROUP_RADIO_REINSERT.appendChild($RADIO_GROUP_REINSERT);
    $NEW_STEP.appendChild($HEADER_GROUP_RADIO_REINSERT);

    const $CONTAINER_BTN: HTMLDivElement = document.createElement("div");
    actionClassString("mb-2 c-flex c-flex-justify-end", "add", $CONTAINER_BTN);

    const createBtnInstanceNext: ButtonNext = this.formRegister.createBtnNext(); //INSTANCIAR

    //SUSCRIBIR
    this.formRegister.suscribeBtnNextClick({
      instanceBtn: createBtnInstanceNext,
      buildNewStep: () => formRegisterUI.getStepUI().buildStepLast({ formRegister: this.formRegister, formRegisterUI }),
    });

    // POR SU NAME RECORRER PRESUPUESTO
    filterByNameOfBudge.forEach((irBudge) => {
      // SUSCRIBIMOS A LAS INSTANCIAS SU ONCHANGE
      irBudge.onChange((val) => {
        this.handlerSelectBudge(val, inputAmountInstance, createBtnInstanceNext);
        this.formRegister.saveDataStepPersistence({ step: 3, elements: [irBudge.render() as HTMLInputElement, ...this.optionGroupBuilder.getInputsChecks()] });
      });
    });

    // POR SU NAME RECORRER REINTEGRO
    filterByNameOfReinsert.forEach((ir) => {
      // SUSCRIBIMOS A LAS INSTANCIAS SU ONCHANGE
      ir.onChange((val) => {
        this.formRegister.saveDataStepPersistence({ step: 3, elements: [ir.render() as HTMLInputElement, ...this.optionGroupBuilder.getInputsChecks()] });
      });
    });

    // EJECUTAR RESTAURACION DE VALORES EN RADIOS DEL ALMACENAMIENTO LOCAL MEDIANTE EL NAME
    this.optionGroupBuilder.restoredRadioChecked("budgeSelected");

    $CONTAINER_BTN.appendChild(createBtnInstanceNext.getBtnElement()); //AGREGAR BOTONAL CONTENEDOR DE BOTON

    $NEW_STEP.appendChild($CONTAINER_BTN); // AGREGAR CONTENEDOR BOTON AL NUEVO PASO CREADO ==> $NEW_STEP
    return $NEW_STEP;
  }

  //-------------------------------METODOS PRIVADOS--------------------------------//
  //CREACION CABECERA PASO PRINCIPAL
  private budgeHeaderMainStep(): HTMLDivElement {
    const $HEADER_STEP: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1 form-professional-groupBudget__header", "add", $HEADER_STEP);
   
    const $TITLE_HEADER_MAIN = document.createElement("h3");
    actionClassString("form-professional-groupBudget__title", "add", $TITLE_HEADER_MAIN)

    const $ICON_ID_CARD = document.createElement("i");
    actionClassString("fas fa-id-card", "add", $ICON_ID_CARD);
    $ICON_ID_CARD.classList.add("fas", "fa-id-card");

    const spanTitle = document.createElement("span");
    spanTitle.textContent = "Presupuesto";

    $TITLE_HEADER_MAIN.append($ICON_ID_CARD, spanTitle);
    $HEADER_STEP.appendChild($TITLE_HEADER_MAIN);
    return $HEADER_STEP;
  }

  //CREACION CABECERA RADIOS GRUPO PRESUPUESTO
  private buildHeaderTitleRadioBudge(): HTMLDivElement {
    const $HEADER_GROUP_RADIO_BUDGE: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-2", "add", $HEADER_GROUP_RADIO_BUDGE);

    const $CONTAINER_MAIN_TITLE_HEADER_RADIO_BUDGE: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1/2", "add", $CONTAINER_MAIN_TITLE_HEADER_RADIO_BUDGE);

    const $H4_TITLE_MAIN_HEADER_BUDGE = document.createElement("h4");
    actionClassString("c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__label", "add", $H4_TITLE_MAIN_HEADER_BUDGE);

    const $ICON_DOLLAR = document.createElement("i");
    actionClassString("fas fa-circle-dollar-to-slot", "add", $ICON_DOLLAR);

    const $SPAN_H4_TITLE_MAIN_HEADER_BUDGE = document.createElement("span");
    $SPAN_H4_TITLE_MAIN_HEADER_BUDGE.textContent = "¿Cobrás el presupuesto?";

    $H4_TITLE_MAIN_HEADER_BUDGE.append($ICON_DOLLAR, $SPAN_H4_TITLE_MAIN_HEADER_BUDGE);
    $CONTAINER_MAIN_TITLE_HEADER_RADIO_BUDGE.appendChild($H4_TITLE_MAIN_HEADER_BUDGE);

    const $CONTAINER_INFO: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1/2 container-textInfo", "add", $CONTAINER_INFO);

    const $ICON_INFO = document.createElement("i");
    $ICON_INFO.classList.add("fas", "fa-info-circle");

    const $SMALL_INFO = document.createElement("small");
    actionClassString("container-textInfo__message", "add", $SMALL_INFO);
    $SMALL_INFO.textContent = "Acción no modificable";

    $CONTAINER_INFO.append($ICON_INFO, $SMALL_INFO);
    $CONTAINER_MAIN_TITLE_HEADER_RADIO_BUDGE.append($CONTAINER_INFO);
    $HEADER_GROUP_RADIO_BUDGE.append($CONTAINER_MAIN_TITLE_HEADER_RADIO_BUDGE);

    return $HEADER_GROUP_RADIO_BUDGE;
  }

  //CREACION CABECERA RADIOS GRUPO REINGRESO
  private buildHeaderTitleRadioReinsert(): HTMLDivElement {
    const $HEADER_GROUP_RADIO_REINSERT: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-2", "add", $HEADER_GROUP_RADIO_REINSERT);

    const $CONTAINER_MAIN_TITLE_HEADER_RADIO_REINSERT: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1/2", "add", $CONTAINER_MAIN_TITLE_HEADER_RADIO_REINSERT);

    const $H4_MAIN_TITLE_HEADER_RADIO_REINSERT = document.createElement("h4");
    actionClassString("c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__label", "add", $H4_MAIN_TITLE_HEADER_RADIO_REINSERT);

    const $ICON_UNDO = document.createElement("i");
    actionClassString("fas fa-undo", "add", $ICON_UNDO);

    const $SMALL_UNDO= document.createElement("span");
    $SMALL_UNDO.textContent = "¿Reintegro si te eligen?";

    $H4_MAIN_TITLE_HEADER_RADIO_REINSERT.append($ICON_UNDO, $SMALL_UNDO);
    $CONTAINER_MAIN_TITLE_HEADER_RADIO_REINSERT.appendChild($H4_MAIN_TITLE_HEADER_RADIO_REINSERT);

    const $CONTAINER_INFO: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1/2 container-textInfo", "add", $CONTAINER_INFO);

    const $ICON_INFO_CIRCLE = document.createElement("i");
    actionClassString("fas fa-info-circle", "add", $ICON_INFO_CIRCLE);

    const $SMALL_INFO_CIRCLE = document.createElement("small");
    actionClassString("form-professionalBudget__info", "add", $SMALL_INFO_CIRCLE);
    $SMALL_INFO_CIRCLE.textContent = "Acción no modificable";

    $CONTAINER_INFO.append($ICON_INFO_CIRCLE, $SMALL_INFO_CIRCLE);
    $CONTAINER_MAIN_TITLE_HEADER_RADIO_REINSERT.appendChild($CONTAINER_INFO);
    $HEADER_GROUP_RADIO_REINSERT.appendChild($CONTAINER_MAIN_TITLE_HEADER_RADIO_REINSERT);

    return $HEADER_GROUP_RADIO_REINSERT;
  }

  // HANDLER DE SELECCION DE PRESUPUESTO
  private handlerSelectBudge(val: string, instanceAmount: InputField, btn: ButtonNext): void {
    const stepThreeData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA)[EKeyDataByStep.THREE] ?? {};
    const persistedAmount = stepThreeData.amountBudge ?? 0; //MONTO DE ALMACENAMIENTO LOCAL O CERO
    if (val === "yes") {
      this.optionGroupBuilder.restoredRadioChecked("reinsert");
      instanceAmount.enabled(); //=> HABILITAR BOTON
      // SI EL MONTO PERSISTIDO ES > 0
      if (persistedAmount > 0) {
        instanceAmount.setValueAndTrigger(persistedAmount);
        instanceAmount.errorBorderStyleToggle(); //MARCAR SIEMPRE BORDE AL ESTAR EN YES
      } else {
        instanceAmount.setValue(""); //==> SETEAR A VACIO
        instanceAmount.setValueAndTrigger(instanceAmount.getValue()); //GUARDAR SU VALOR NUEVO Y EJECUTAR EVENTO EN EL QUE ESTA SUSCRIPTO
      }
      btn.disable(); //DESHABILITAR BOTON
    } else {
      instanceAmount.setValue(""); //VACIAR CAMPO
      instanceAmount.setValueAndTrigger(instanceAmount.getValue());
      instanceAmount.disabled(); // DESHABILITAR CAMPO DE MONTO
      instanceAmount.resetBorderStyle(); //=> RESETEAR BORDES
      instanceAmount.clearError(); // => QUITAR TEXTO DE ERROR
      btn.enable(); // HABILITAR BOTON

      // TRAER ARRAY QUE COINCIDA CON EL NAME QUE SE LE PASA
      const vectorRadiosReinsertByName: InputFieldCheck[] = this.optionGroupBuilder.filterCheckByName("reinsert");
      const reinsertNo: InputFieldCheck | undefined = vectorRadiosReinsertByName.find((r) => r.getValue() === "no");

      if (reinsertNo) reinsertNo.setValueAndTrigger("no", true); //EJECUTAR SU EVENTO SIN INTERACCION DEL USUARIO

      stepThreeData.amountBudge = 0; //PISAMOS NUEVO VALOR RESETEANDOLO A CERO
      // GUARDAR NUEVAMENTE
      this.formRegister.saveDataStepPersistence({ step: 3, elements: [instanceAmount.render() as HTMLInputElement, ...this.optionGroupBuilder.getInputsChecks()] });
    }
  }

  // HANDLER DE CAMPO DEL MONTO
  private handlerBudgeAmount(val: string, inputAmountInstance: InputField): void {
    // VALIDAR ACA SOLO ESTE CAMPO
    const result: { validate: TFieldState } | null = ValidatorFactory.validateField({
      fieldName: inputAmountInstance.getName() as string,
      file: null,
      files: null,
      value: val,
      values: [],
    });

    // SI RESULT NO ES NULO
    if (result) {
      inputAmountInstance.setIsValid(result.validate.isValid); //SETEAR EL NUEVO VALOR DE SI ES VALIDO O NO

      // SI EL VALUE DEL MONTO ES DIFERENTE DE STRING VACIO MOSTRAR MENSAJE ERROR
      if (inputAmountInstance.getValue() !== "") {
        inputAmountInstance.errorToggle(result.validate.error); //MOSTRAR ERROR
      }

      // TRAER ARRAY QUE COINCIDA CON EL NAME QUE SE LE PASA
      const vectorRadiosReinsertByName: InputFieldCheck[] = this.optionGroupBuilder.filterCheckByName("reinsert");

      // SI EL RESULTADO ES VALIDO
      if (result.validate.isValid) {
        vectorRadiosReinsertByName.forEach((r) => r.enabled()); //=> RECORRE LOS RADIOS Y LOS HABILITA
      } else {
        vectorRadiosReinsertByName.forEach((r) => r.disabled()); //=> RECORRER LOS RADIOS Y LOS DESHABILITA
      }
      this.formRegister.saveDataStepPersistence({ step: 3, elements: [inputAmountInstance.render() as HTMLInputElement, ...this.optionGroupBuilder.getInputsChecks()] });
    }
  }
}
