// IMPORTACIONES
import { TCategoryOption, TOptionItem, TOptionsCheckForm, TOptionTypeGroup } from "../../../../types/types.js";
import clearElementChild from "../../../../dom/clearElementChild.js";
import FormFieldFactory from "../../../../patterns/factory/FormFieldFactory.js";
import { EGroupCheckBox, EKeyDataByStep, ENamesOfKeyLocalStorage } from "../../../../types/enums.js";
import { actionClassString } from "../../../../ui/auxiliars.js";
import InputFieldCheck from "../../../../modules/fields/components/InputFieldCheck.js";
import FormRegister from "../../../../modules/form/controller/FormRegister.js";
import { attrFilled, convertTextOfTypes } from "../../../../utils/domUtils.js";
import { readExistingData } from "../../../../utils/storageUtils.js";
import FormRegisterUI from "../FormRegisterUI.js";
import { ButtonNext } from "../../../../modules/buttons/components/ButtonNext.js";

// BUILDER PARA CREACIÓN Y MANEJO DE GRUPOS DE OPCIONES CHECKBOX/RADIO PARA FORMULARIO
export default class OptionGroupBuilder {
  private instancesFieldChecks: InputFieldCheck[];
  private checkBoxes: HTMLInputElement[];
  // CONSTRUCTOR
  constructor(private readonly formRegister: FormRegister) {
    this.instancesFieldChecks = [];
    this.checkBoxes = [];
  }
  // -------------------METODOS PRIVADOS--------------------------//

  // CONSTRUCCION CABECERA DE GRUPO DE CHECKSBOX
  private buildHeaderGroupCheckbox({ type }: { type: TOptionTypeGroup }): DocumentFragment {
    const $FRAGMENT: DocumentFragment = document.createDocumentFragment(); //CREAR EL FRAGMENT => RETORNARLO LUEGO

    // MAPEAR ICONOS POR SU TIPO
    const iconByType: Record<TOptionTypeGroup, string> = {
      service: "fa-tools",
      context: "fa-building",
      day: "fa-calendar-day",
      hour: "fa-clock",
    };

    // HEADER DEL GRUPO DE CHECKBOXES (SOLO UNA VEZ)
    const $DIV_HEADER: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1 form-professional-groupSpeciality__context-header", "add", $DIV_HEADER);

    const $ICON: HTMLElement = document.createElement("i");
    const iconName = iconByType[type as TOptionTypeGroup];
    actionClassString(`fas ${iconName}`, "add", $ICON);

    const $H4: HTMLHeadingElement = document.createElement("h4");
    actionClassString("c-flex c-flex-items-center c-flex-justify-center gap-1/2 form-professional-groupSpeciality__label", "add", $H4);

    const $SPAN_TITLE: HTMLSpanElement = document.createElement("span");
    $SPAN_TITLE.textContent = convertTextOfTypes({ textType: type });

    const $SPAN_REQUIRED: HTMLSpanElement = document.createElement("span");
    actionClassString("span-required", "add", $SPAN_REQUIRED);
    $SPAN_REQUIRED.textContent = "*";

    $H4.append($SPAN_TITLE, $SPAN_REQUIRED);
    $DIV_HEADER.append($ICON, $H4);
    $FRAGMENT.append($DIV_HEADER); // GUARDAMOS HEADER EN FRAGMENT
    return $FRAGMENT;
  }

  // CONSTRUCCION DE CUERPO CONTENEDOR Y GRUPOS DE CHECKBOXES
  private buildGroupChecksBoxes({ vectorGroupItemCheck, type }: { vectorGroupItemCheck: TOptionItem[]; type: TOptionTypeGroup }): DocumentFragment {
    // CREACION DE HEADER DEL GRUPO DE CHECKBOX CONTENIDO POR EL FRAGMENT
    const $FRAGMENT: DocumentFragment = this.buildHeaderGroupCheckbox({ type });

    // RECORRER VECTOR Y CREAR ELEMENTOS
    vectorGroupItemCheck.forEach((el, i) => {
      const $DIV_SERVICE: HTMLDivElement = document.createElement("div");

      // INPUT CHECKSBOX
      const inputCheck: InputFieldCheck = FormFieldFactory.createFieldForm("inputCheck", {
        type: "checkbox",
        name: `${type}[]`,
        disabled: false,
        required: true,
        id: `${type}-${i}`,
        value: el.value,
        checked: false,
      });

      inputCheck.setValue(el.value); //SETEAR AQUI EL VALUE QUE AUN NO EXISTE PARA QUE LO GUARDE LUEGO

      this.instancesFieldChecks.push(inputCheck);

      const $INPUT_CHECK = inputCheck.render() as HTMLInputElement;
      actionClassString(`c-flex c-flex-justify-center c-flex-items-center cursor-pointer ${type}__input`, "add", $INPUT_CHECK); //AGREGAMOS LAS CLASES
      this.checkBoxes.push($INPUT_CHECK); //AGREGAR A ARRAY DE INPUTS CHECKS EN THIS
      this.formRegister.addNewInput($INPUT_CHECK); //AGREGAR NUEVO INPUT AL FORMULARIO PRINCIPAL

      // RESTAURAR VALOR DESDE LOCALSTORAGE
      const stepOneData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA)[EKeyDataByStep.ONE] ?? {};
      const persistedValues = stepOneData[`${type}[]`] ?? [];

      // SI EL VALOR ESTA INCLUIDO EN LA PERSISTENCIA
      if (persistedValues.includes(el.value)) {
        inputCheck.checked(); //MARCA CHECK AL INPUT
        inputCheck.setValue(el.value);
      }

      $INPUT_CHECK.value = inputCheck.getValue() as string;

      const $LABEL_CHECK: HTMLLabelElement = document.createElement("label");
      this.formRegister.addNewLabel($LABEL_CHECK);

      // CREACION DE CHECKS DE CADA GRUPO
      actionClassString(`c-flex c-flex-items-center gap-1/2 ${type}`, "add", $DIV_SERVICE);

      // AUXILIAR PARA AGREGAR ATRIBUTOS
      attrFilled($LABEL_CHECK, {
        class: `${type}__label`,
        for: `${type}-${i}`,
      });

      $LABEL_CHECK.textContent = el.label;

      $DIV_SERVICE.append($INPUT_CHECK, $LABEL_CHECK);
      $FRAGMENT.appendChild($DIV_SERVICE); // GUARDAMOS EN FRAGMENT
    });
    return $FRAGMENT;
  }

  // --- METODO PRIVADO PARA RESTAURAR ESTADOS (FUNCIONA PARA RADIOS Y CHECKBOXES) ---
  private restore(persistedChecks: Record<string, string | string[]>, nameFilter?: string): void {
    // SI HAY FILTRO => TRABAJO SOLO CON RADIOS DE ESE NAME, SINO TODOS LOS CHECKBOXES
    const instances: InputFieldCheck[] = nameFilter ? (this.filterCheckByName(nameFilter) as InputFieldCheck[]) : this.getInstanceFieldChecks();

    // RECORRER INSTANCIAS
    for (const instance of instances) {
      // OBTENGO EL VALOR GUARDADO SEGUN EL NAME
      const persisted: string | string[] = persistedChecks[instance._name];
      if (!persisted) return; // SI NO HAY NADA GUARDADO, SIGO

      const inputValue = instance.getValue(); //GUARDAR EN MEMORIA VALUE DE INSTANCIA

      // SI ES ARRAY => CHECKBOXES, SI ES STRING => RADIO
      if (Array.isArray(persisted)) {
        const isChecked: boolean = persisted.includes(inputValue);
        instance.setValueAndTrigger(inputValue, isChecked);
      } else {
        const isChecked: boolean = persisted === inputValue; // => SI ES IGUAL

        // SI COINCIDE CON EL PRIMER NAME DEL RADIO EN CHECKED =====> SALIR DEL BUCLE
        if (isChecked) {
          instance.setValueAndTrigger(persisted, isChecked); // USAR EL PERSISTIDO
          break; //SALGO PARA EVITAR DUPLICACION DE EVENTO
        }
      }
    }
  }

  //--------------------------------------------METODOS PUBLICOS-------------------------------------------//

  //METODO DE CREACION GRUPO DE CHECKBOXES PASO UNO LUEGO DE SELECCIONAR CATEGORIA "reparacion-mantenimiento"
  public createGroupCheckBoxes({ options, wrapper, selectEl, formRegisterUI }: { options: TCategoryOption[]; wrapper: HTMLElement; selectEl: HTMLSelectElement; formRegisterUI: FormRegisterUI }): void {
    // CONTENEDOR PRINCIPAL DE SECCIONES

    clearElementChild({ elements: [wrapper] }); // ==> LIMIPIAR AL PRINCIPIO

    // --- CONTENEDOR PRINCIPAL ---
    const $MAIN: HTMLDivElement = document.createElement("div");
    // AUXILIAR PARA AGREGAR ATRIBUTOS AL MAIN
    attrFilled($MAIN, {
      class: "c-flex c-flex-column gap-1 form-professional-groupSpeciality form-step",
      "data-step": `${this.formRegister.getStepForm()}`,
      "data-checks": "groups",
    });

    // --- HEADER PRINCIPAL ---
    const $HEADER: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-items-center gap-1 form-professional-groupSpeciality__header", "add", $HEADER);

    const $H3 = document.createElement("h3");
    actionClassString("form-professional-groupSpeciality__title", "add", $H3);

    const $ICON = document.createElement("i");
    actionClassString("fas fa-id-card", "add", $ICON);

    const $SPAN_TITLE = document.createElement("span");
    $SPAN_TITLE.textContent = "Detalles de tu actividad";

    $H3.append($ICON, $SPAN_TITLE);
    $HEADER.appendChild($H3);

    // --- WRAPPERS INTERMEDIOS ---
    const $CHECKS_WRAPPER: HTMLDivElement = document.createElement("div");
    actionClassString("mb-2 c-flex gap-2 form-professional-groupSpeciality__checks-wrapper", "add", $CHECKS_WRAPPER);

    const $CONTAINER_SPECIALITY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1 form-professional-groupSpeciality__containerChecksSpecialitys", "add", $CONTAINER_SPECIALITY);

    const $SERVICES_BODY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1/2 form-professional-groupSpeciality__services-body", "add", $SERVICES_BODY);

    $CONTAINER_SPECIALITY.appendChild($SERVICES_BODY);

    const $CONTEXT_WRAPPER: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex gap-3 form-professional-groupSpeciality__checks-wrapper", "add", $CHECKS_WRAPPER);

    const $CONTEXTS_BODY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column c-flex-basis-full gap-1/2 form-professional-groupSpeciality__contexts-body", "add", $CONTEXTS_BODY);

    $CONTEXT_WRAPPER.appendChild($CONTEXTS_BODY);

    $CHECKS_WRAPPER.append($CONTAINER_SPECIALITY, $CONTEXT_WRAPPER);

    // --- HORARIOS ---
    const $DATES_CONTAINER: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1 form-professional-groupSpeciality__containerChecksDates", "add", $DATES_CONTAINER);

    const $DATES_BODY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex gap-3 form-professional-groupSpeciality__dates-body", "add", $DATES_BODY);

    const $DAYS_BODY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1/2 form-professional-groupSpeciality__days-body", "add", $DAYS_BODY);

    const $HOURS_BODY: HTMLDivElement = document.createElement("div");
    actionClassString("c-flex c-flex-column gap-1/2 form-professional-groupSpeciality__hours-body", "add", $HOURS_BODY);

    $DATES_BODY.append($DAYS_BODY, $HOURS_BODY);
    $DATES_CONTAINER.appendChild($DATES_BODY);

    // --- FOOTER CON BOTÓN ---
    const $FOOTER: HTMLDivElement = document.createElement("div");
    actionClassString("mb-2 c-flex c-flex-justify-end", "add", $FOOTER);

    const btnInstanceNext: ButtonNext = this.formRegister.createBtnNext(); //INSTANCIAR

    //SUSCRIBIR EVENTO DE CLICK AL BOTON
    this.formRegister.suscribeBtnNextClick({
      instanceBtn: btnInstanceNext,
      buildNewStep: () => formRegisterUI.getStepUI().buildStepTwo({ formRegister: this.formRegister, formRegisterUI }),
    });

    $FOOTER.appendChild(btnInstanceNext.getBtnElement()); // AGREGAR BOTON AL FOOTER

    // --- ARMAMOS TODO ---
    $MAIN.append($HEADER, $CHECKS_WRAPPER, $DATES_CONTAINER, $FOOTER);

    //FUER A DEL BUCLE
    wrapper.append($MAIN);

    // RECORRER LAS OPCIONES EN LA CONFIGURACION
    options.forEach(({ vectorGroupItemCheck, type }) => {
      // MAPEAMOS Y CREAMOS EN CADA VUELTA UN OBJETO QUE GUARDE LOS ELEMENTOS CONTENEDORES DE CADA GRUPO DE CHECKSBOX
      const containerMap: Record<TOptionTypeGroup, HTMLElement | null> = {
        service: $SERVICES_BODY,
        context: $CONTEXTS_BODY,
        day: $DAYS_BODY,
        hour: $HOURS_BODY,
      };

      // REFERENCIA DEL CONTENEDOR PRINCIPAL QUE CONTENGA LOS GRUPOS POR EL TIPO
      const $CONTAINER: HTMLElement | null = containerMap[type];
      if (!$CONTAINER) return;

      //LLAMAR A METODO DE CREACION DE CHECKS EN CADA VUELTA DEL BUCLE
      this.groupOptionsChecksForm({ vectorGroupItemCheck, type, container: $CONTAINER, selectEl });
    });
  }

  // METODO DE CREACION DE GRUPOS DE CHECKBOXES DINAMICOS
  public groupOptionsChecksForm({ vectorGroupItemCheck, type, container, selectEl }: TOptionsCheckForm): HTMLElement | null {
    if (!container) return null;

    // CREACION DE GRUPOS ==> FRAGMENT YA CONTIENE TODO
    const $FRAGMENT: DocumentFragment = this.buildGroupChecksBoxes({ vectorGroupItemCheck, type });

    // SUSCRIBIMOS AQUI TODOS LOS CHECKS POR GRUPO
    this.getInstanceFieldChecks().forEach((inputInstance) => {
      // SI NO ESTA SUSCRITO A EVENTO
      if (!inputInstance._hasSuscribeOnchange) {
        // POR CADA INSTANCIA DE CHECKBOX SUSCRIBIR
        inputInstance.onChange((val) => {
          const elementsToPersist = [selectEl, ...this.checkBoxes]; //=> ELEMENTOS A PERSISTIR EN STORAGES
          this.formRegister.saveDataStepPersistence({ step: 1, elements: elementsToPersist });
        });
      }
      inputInstance.suscribe(); //SUSCRIBE A EVENTO CHANGE
    });

    container?.append($FRAGMENT);

    return container;
  }

  // METODO QUE SE ENCARGA DE RESTAURAR LOS VALORES
  public restoredGroupChecked(): void {
    // --- LEER DATOS GUARDADOS EN LOCALSTORAGE ---
    const stepOneData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA)[EKeyDataByStep.ONE] ?? {}; // => PARSEA DEL STORAGE EL OBJETO DEL PASO 1

    //-------------------OBTENER LOS DATOS PERSISTIDOS DE LOS GRUPOS DE CHECKBOX O ARRAY VACIO------------//
    // MAPEAR LOS CHECKBOXES PERSISTIDOS POR TIPO
    const persistedChecks = {
      service: stepOneData[EGroupCheckBox.SERVICE] ?? [],
      context: stepOneData[EGroupCheckBox.CONTEXT] ?? [],
      day: stepOneData[EGroupCheckBox.DAY] ?? [],
      hour: stepOneData[EGroupCheckBox.HOUR] ?? [],
    };

    // RECORRER CADA CHECKBOX PARA RESTAURAR SU ESTADO SEGUN LOCALSTORAGE
    this.restore(persistedChecks);
  }

  // METODO QUE SE ENCARGA DE RESTAURAR LOS VALORES
  public restoredRadioChecked(name: string): void {
    // --- LEER DATOS GUARDADOS EN LOCALSTORAGE ---
    const stepThreeData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA)[EKeyDataByStep.THREE] ?? {};

    // --- OBTENER EL VALOR GUARDADO EN LOS RADIO DEL GRUPO SEGUN NAME---
    this.restore(stepThreeData, name);
  }

  // METODO PARA LIMPIAR GRUPOS DE CHECKBOX
  public resetGroupChecks(): void {
    //  DESMARCAR TODOS LOS CHECKS DEL WRAPPER
    this.getInstanceFieldChecks().forEach((input) => {
      input.disChecked(); //NO ME IMPORTA COMO => PASAME EL CHECKED A FALSE
    });

    //LIMPIAR STORAGE PARA ESTOS ARRAYS
    const stepOneData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA)[EKeyDataByStep.ONE] ?? {};
    stepOneData[EGroupCheckBox.SERVICE] = [];
    stepOneData[EGroupCheckBox.CONTEXT] = [];
    stepOneData[EGroupCheckBox.DAY] = [];
    stepOneData[EGroupCheckBox.HOUR] = [];

    //----------------GUARDAR NUEVAMENTE---------------------------//

    //1- INDICO A QUE CLAVE DE ALMACENAMIENTO GUARDAR EL OBJETO
    //2- PASO LA COPIA DE TODO EL OBJETO QUE EXISTIA
    //3- PISO LOS VALORES DEL OBJETO CON LOS NUEVOS VALORES MODIFICADOS
    //4- SERIALIZAR TODO A CADENA DE TEXTO
    localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify({ ...readExistingData(ENamesOfKeyLocalStorage.STEP_DATA), [EKeyDataByStep.ONE]: stepOneData }));
  }

  // VER ARRAY DE CHECKS
  public getInstanceFieldChecks(): InputFieldCheck[] {
    return this.instancesFieldChecks; //SIEMPRE ES UN ARRRAY
  }

  // VER ARRAY DE CHECKS
  public getInputsChecks(): HTMLInputElement[] {
    return this.checkBoxes; //SIEMPRE ES UN ARRRAY
  }

  // FILTRAR Y RETORNAR ARRAY POR SU NAME
  public filterCheckByName(name: string): InputFieldCheck[] {
    // APROVECHAMOS ARRAY DE INSTANCIAS Y FILTRAMOS POR SU NAME NUEVO ARRAY
    return this.getInstanceFieldChecks().filter((ir) => ir._name === name);
  }

  //OBJETIVO DEL METODO => REUTILIZAR LOGICA Y TRABAJAR SOBRE INSTANCIAS ACTUALES
  public getFieldCheckByName(name: string): InputFieldCheck {
    return this.getInstanceFieldChecks().find((field) => field.getName() === name) as InputFieldCheck;
  }

  // METODO DE CREACION DE RADIOS PRESUPUESTO
  public createRadioLabel({ value, labelText, checked, disabled, name, customClasses }: { value: string; labelText: string; checked: boolean; disabled: boolean; name: string; customClasses?: string[] }): HTMLLabelElement {
    // CREACION DE RADIO
    const inputInstance: InputFieldCheck = FormFieldFactory.createFieldForm("inputCheck", {
      name,
      type: "radio",
      required: false,
      checked,
      disabled,
      autofocus: false,
      value,
    });

    inputInstance.setValue(value);
    this.instancesFieldChecks.push(inputInstance); //AGREGAR A VECTOR DE INSTANCIACIONES

    const $INPUT_RADIO = inputInstance.render() as HTMLInputElement;
    actionClassString("c-flex c-flex-items-center c-flex-justify-center cursor-pointer radio-option__input", "add", $INPUT_RADIO);
    this.checkBoxes.push($INPUT_RADIO); //AGREGAR A VECTOR DE INPUT

    const $LABEL: HTMLLabelElement = document.createElement("label");

    $LABEL.classList.add(
      "c-flex",
      "c-flex-items-center",
      "gap-1/2",
      "cursor-pointer",
      "radio-option",
      ...(customClasses ?? []) // LA UNICA DIFERENCIA DE CLASES Y ESTILOS
    );

    this.formRegister.addNewInput($INPUT_RADIO);
    this.formRegister.addNewLabel($LABEL);

    const span = document.createElement("span");
    actionClassString("radio-option__label", "add", span);

    span.textContent = labelText;
    $LABEL.append($INPUT_RADIO, span);

    return $LABEL;
  }
}