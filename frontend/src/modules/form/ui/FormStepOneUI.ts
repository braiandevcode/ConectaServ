// IMPORTACIONES

import { categoryConfigs } from "../../../config/constant.js";
import { iBuildStepUI } from "../../../interfaces/interfaces";
import FormFieldFactory from "../../../patterns/factory/FormFieldFactory.js";
import { ECategoryKey, EDefaultSelected, EKeyDataByStep, ENamesOfKeyLocalStorage } from "../../../types/enums.js";
import { TCategoryKey } from "../../../types/types";
import { actionClassString } from "../../../ui/auxiliars.js";
import { attrFilled } from "../../../utils/domUtils.js";
import { readExistingData } from "../../../utils/storageUtils.js";
import SelectField from "../../fields/components/SelectField.js";
import FormRegister from "../controller/FormRegister.js";
import OptionGroupBuilder from "./builder/OptionGrouBuilder.js";
import FormRegisterUI from "./FormRegisterUI.js";

// MODULO CLASE UI PARA EL PASO 1
export default class FormStepOneUI implements iBuildStepUI {
  private readonly checkGroupsBuilder: OptionGroupBuilder;
  constructor(private readonly formRegister: FormRegister, checkGroupsBuilder: OptionGroupBuilder) {
    this.checkGroupsBuilder = checkGroupsBuilder;
  }

  // CREACION Y RENDERIZADO DE GRUPOS DE CHECKBOXES
  private renderCheckBoxes({ key, groupSelect, selectEl, formRegisterUI }: { key: TCategoryKey; groupSelect: HTMLDivElement; selectEl: HTMLSelectElement; formRegisterUI: FormRegisterUI }) {
    const config = categoryConfigs[key];
    if (!config) return;

    // BUSCAR O CREAR WRAPPER
    let wrapper = groupSelect.querySelector(".form-professional-groupSpeciality__wrapper") as HTMLElement;
    if (!wrapper) {
      wrapper = document.createElement("div");
      actionClassString("mb-2 w-full form-professional-groupSpeciality__wrapper", "add", wrapper);

      // INSERTAR COMO HERMANO DEL SELECT
      groupSelect.appendChild(wrapper);
    }

    // CREAR CHECKBOXES
    this.checkGroupsBuilder.createGroupCheckBoxes({ options: config.options, wrapper, selectEl, formRegisterUI });

    this.formRegister.setContext(config.hasContext);

    return wrapper;
  }

  // HANDLER DEL EVENTO DE CAMBIO DEL SELECT
  private handlerSelect({ value, groupSelect, $SELECT_ELEMENT, formRegisterUI }: { value: string; groupSelect: HTMLDivElement; $SELECT_ELEMENT: HTMLSelectElement; formRegisterUI: FormRegisterUI }): void {
    // LLAMAR A RENDER DE CHECKBOXES SEGUN LA CATEGORIA SELECCIONADA
    const wrapper = this.renderCheckBoxes({ key: value as TCategoryKey, groupSelect, selectEl: $SELECT_ELEMENT, formRegisterUI }) as HTMLElement;

    // SI NO SE PUDO CREAR EL WRAPPER, SALIR
    if (!wrapper) return; // ¿EL WRAPPER EXISTE? SI NO => TERMINAR FUNCION AQUI

    this.checkGroupsBuilder.restoredGroupChecked(); // RESTAURAR VALORES DE LOS CHECKS EN TRUE

    // if (value === ECategoryKey.REPAIR) {
    //   this.formRegister.setBudge(true); //SETEAR A TRUE ==> SIGNIFICA QUE EL PASO 3 ES PRESUPUESTO
    // } else {
    //   this.formRegister.setBudge(false); //SETEAR A FALSE ==> SIGNIFICA QUE EL PASO 3 ES EL ULTIMO
    // }

    // GUARDAR ESTADO ACTUAL DE SELECT Y CHECKBOXES EN LOCALSTORAGE
    this.formRegister.saveDataStepPersistence({ step: 1, elements: [$SELECT_ELEMENT, ...this.checkGroupsBuilder.getInputsChecks()] }); //SELECT Y RESTO DE CAMPOS DEL PASO 1
  }

  // CREACION DEL PASO 1
  public buildStep({ formRegisterUI }: { formRegisterUI: FormRegisterUI }): HTMLDivElement {
    //LLAMAR A DATOS DE PERSISTENCIA AQUI
    const existingData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);
    const stepOneData = existingData[EKeyDataByStep.ONE] ?? {};
    const persistedCategory = stepOneData.category ?? EDefaultSelected.SELECT_CATEGORY; //SI EL VALOR DE IZQUIERDA ES NULL O UNDEFINED TOMA EL DE LA DERECHA

    const wrapper = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1 form-professional__sections", "add", wrapper);

    // GRUPO: SELECCIONAR CATEGORIA //
    const groupSelect = document.createElement("div");

    // AUXILIAR PARA AÑADIR ATRIBUTOS
    attrFilled(groupSelect, {
      class: "c-flex c-flex-column gap-1 form-professional-groupSelectCategory form-step",
      "data-step": `${this.formRegister.getStepForm()}`,
      "data-message": "category",
      "data-inputSelectInstance": "category",
    });

    // HEADER
    const header = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1 form-professional-groupSelectCategory__header", "add", header);

    const title = document.createElement("h3");
    actionClassString("form-professional-groupSelectCategory__title", "add", title);

    const icon = document.createElement("i");
    actionClassString("fas fa-id-card", "add", icon);

    const titleText = document.createElement("span");
    titleText.textContent = "Seleccionar Categoría";

    title.append(icon, titleText);
    header.appendChild(title);

    // CREAMOS EL ELEMENTO SELECT CON SU OPCIONES
    const inputSelectInstance: SelectField = FormFieldFactory.createFieldForm("select", {
      id: "category",
      name: "category",
      value: persistedCategory,
      disabled: false,
      required: false,
      items: [
        { value: EDefaultSelected.SELECT_CATEGORY, text: EDefaultSelected.SELECT_CATEGORY, disabled: true, selected: true },
        { value: ECategoryKey.REPAIR, text: "Reparación y mantenimiento", disabled: false, selected: false },
        { value: ECategoryKey.MOVE, text: "Mudanza y Transporte", disabled: false, selected: false },
        { value: ECategoryKey.GARDEN, text: "Jardinería", disabled: false, selected: false },
      ],
    });

    const $SELECT_ELEMENT= inputSelectInstance.render() as HTMLSelectElement;
    const $LABLE_CATEGORY_ELEMENT:HTMLLabelElement = document.createElement("label");
    $LABLE_CATEGORY_ELEMENT.textContent = ""; /// => LABEL VACIO

    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled($LABLE_CATEGORY_ELEMENT, {
      class: "c-flex c-flex-items-centergap-1/2form-professional-groupSelectCategory__label",
      for: $SELECT_ELEMENT.id,
    });

    this.formRegister.addNewLabel($LABLE_CATEGORY_ELEMENT); // ==> SE AGREGA EL NUEVO LABEL AQUI
    this.formRegister.addNewInput($SELECT_ELEMENT); // ==> SE AGREGA EL NUEVO INPUT AQUI

    // AUXILIAR PARA AÑADIR CLASES NECESARIAS
    actionClassString("w-full form-professional-groupSelectCategory__select", "add", $SELECT_ELEMENT);

    //ESTRUCTURA INTERNA LABEL ICONOS + TEXTO
    const spanWrap = document.createElement("span");
    actionClassString("c-flex c-flex-items-center gap-1/2", "add", spanWrap);

    const iconLayer = document.createElement("i");
    actionClassString("fas fa-layer-group", "add", iconLayer);

    const labelText = document.createElement("span");
    labelText.textContent = "Elegir categoría";

    spanWrap.append(iconLayer, labelText);

    const spanRequired = document.createElement("span");
    actionClassString("span-required", "add", spanRequired);
    spanRequired.textContent = "*";

    $LABLE_CATEGORY_ELEMENT.append(spanWrap, spanRequired);

    // ERROR SPAN 1
    const errorDiv1 = formRegisterUI.spanError({ text: "", classessChild: "has-error" });
    groupSelect.append(header, $LABLE_CATEGORY_ELEMENT, $SELECT_ELEMENT, errorDiv1);

    // JUNTAR TODO EN EL WRAPPER
    //WRAPPER DEBE EXISTIR ANTES DE CREAR VISUALMENTE LOS CHECKSBOXES SI HABIA CATEGORIA SELECCIONADA EN ALMACENAMIENTO LOCAL
    wrapper.append(groupSelect);

    // CUANDO EL USUARIO CAMBIA DE CATEGORIA
    inputSelectInstance.onChange((value) => {
      const currentCategory = value as TCategoryKey;
      // SI LA CATEGORÍA PERSISTIDA != CATEGORÍA ACTUAL Y NO ES "Seleccione una categoria"
      if (persistedCategory && persistedCategory !== currentCategory) {
        // RESETEAR CHECKS
        this.checkGroupsBuilder.resetGroupChecks();
      }
      this.handlerSelect({ value, groupSelect, $SELECT_ELEMENT, formRegisterUI });
    }); //EJECUTAR EL HANDLER DEL ONCHANGE(LA CALLBACK)

    // DISPPARA EVENTO CON VALOR ACTUAL DEL SELECT AUTOMATICAMENTE EJECUTANDO EL HANDLER AL QUE SE SUSCRIBIÓ ANTES
    inputSelectInstance.setValueAndTrigger(persistedCategory);

    return wrapper;
  }
}
