// IMPORTACIONES

import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';
import { iBuildStepUI } from '../../../interfaces/interfaces';
import FormFieldFactory from '../../../patterns/factory/FormFieldFactory.js';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums.js';
import { actionClassString } from '../../../ui/auxiliars.js';
import { attrFilled } from '../../../utils/domUtils.js';
import { readExistingData } from '../../../utils/storageUtils.js';
import InputFile from '../../fields/components/InputFile.js';
import TextAreaField from '../../fields/components/TextAreaField.js';
import FormRegister from '../controller/FormRegister.js';
import ImagePreviewManager from './builder/ImagePreviewManager.js';
import FormRegisterUI from './FormRegisterUI.js';
import FormStepUI from '../../../modules/step/ui/FormStepUI.js';

// MODULO CLASE UI PARA EL PASO 2
export default class FormStepTwoUI implements iBuildStepUI {
  constructor(private readonly formRegister: FormRegister) {}

  // CREACION DEL PASO 2
  public async buildStep({ formRegisterUI }: { formRegisterUI: FormRegisterUI; formStepUI?: FormStepUI }): Promise<HTMLDivElement> {
    //LLAMAR A DATOS DE PERSISTENCIA AQUI
    const existingData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);
    const stepTwoData = existingData[EKeyDataByStep.TWO] ?? {};
    const persistedDescription = stepTwoData.descriptionUser ?? ''; //SI EL VALOR DE IZQUIERDA ES NULL O UNDEFINED TOMA EL DE LA DERECHA
    const persistedProfile = stepTwoData.imageProfile ?? null; //SI EL VALOR DE IZQUIERDA ES NULL O UNDEFINED TOMA EL DE LA
    const persistedExp = stepTwoData.imageExperiences ?? []; //SI EL VALOR DE IZQUIERDA ES NULL O UNDEFINED TOMA EL DE LA

    const $NEW_STEP: HTMLDivElement = document.createElement('div'); // ==> NUEVO PASO

    // AGREGO ATRIBUTOS CON AUXILIAR
    attrFilled($NEW_STEP, {
      class: 'mb-2 c-flex c-flex-column gap-1 form-professional-groupProfile form-step',
      'data-step': `${this.formRegister.getStepForm()}`,
    });

    // HEADER
    const $HEADER: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-items-center gap-1 form-professional-groupProfile__header', 'add', $HEADER);

    const $H3 = document.createElement('h3');
    actionClassString('form-professional-groupSelectCategory__title', 'add', $H3);

    const $ICON: HTMLElement = document.createElement('i');
    actionClassString('fas fa-id-card', 'add', $ICON);

    const title = document.createElement('span');
    title.textContent = 'Tu Perfil';

    $H3.append($ICON, title);
    $HEADER.appendChild($H3);
    $NEW_STEP.appendChild($HEADER);

    // BODY
    const $BODY: HTMLDivElement = document.createElement('div');
    actionClassString('mb-2 c-flex c-flex-column c-flex-items-center gap-3 form-professional-groupProfile__body', 'add', $BODY);

    // DESCRIPCION
    const $DESC_WRAPPER: HTMLDivElement = document.createElement('div');
    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled($DESC_WRAPPER, {
      class: 'w-full c-flex c-flex-items-center c-flex-column gap-1/2 form-professional-groupProfile__containerDescription',
      'data-message': 'descriptionUser',
    });

    //INSTANCIA DE CAMPO DESCRIPCION
    const textareaInstance: TextAreaField = FormFieldFactory.createFieldForm('textArea', {
      id: 'descriptionUser',
      name: 'descriptionUser',
      cols: 0,
      rows: 0,
      disabled: false,
      'aria-label': 'Cuentales a la gente sobre ti',
      required: true,
      value: persistedDescription,
      autofocus: false,
      autocomplete: false,
      placeholder: 'Cuentales a la gente sobre ti...',
      spellcheck: true,
      lang: 'es',
    });

    // SUCRIBIR TEXTAREA A EVENTO INPUT
    textareaInstance.onInput((value) => {
      // GUARDAR EL VALOR EN LOCALSTORAGE PARA EL PASO 2
      this.formRegister.saveDataStepPersistence({
        step: this.formRegister.getStepForm(), // INDICA EL PASO ACTUAL
        elements: [textareaInstance.render() as HTMLTextAreaElement], // PASA EL ELEMENTO A PERSISTIR
      });
    });

    textareaInstance.setValueAndTrigger(persistedDescription); // SETEAR EN EL DOM

    const $TEXAREA_DESC_ELEMENT = textareaInstance.render() as HTMLTextAreaElement; // REFERENCIAR ELEMENTO POR RENDER

    const $LABEL_DESC: HTMLLabelElement = document.createElement('label'); //LABEL DESCRIPCION

    // GREGAR ATRIBUTOS AL LABEL DE DESCRIPCION MEDIANTE EL AUXILIAR
    attrFilled($LABEL_DESC, {
      class: 'to-left c-flex c-flex-items-center gap-1/2 form-professional-groupProfile__label',
      for: $TEXAREA_DESC_ELEMENT.id,
    });

    this.formRegister.addNewLabel($LABEL_DESC); //==> AGREGAR NUEVO LABEL AL FORM
    this.formRegister.addNewInput($TEXAREA_DESC_ELEMENT); // ==> AGREGAR NUEVO INPUT AL FORM

    // ICONO
    const $ICON_DESC = document.createElement('i'); //CREAR ELEMENTO ICONO
    actionClassString('fas fa-file-lines', 'add', $ICON_DESC);

    const $SPAN_DESC: HTMLSpanElement = document.createElement('span');
    $SPAN_DESC.textContent = 'Descripción de perfil (Opcional)'; //TEXTO DE SPAN

    $LABEL_DESC.append($ICON_DESC, $SPAN_DESC); //AGREGAR ICONO Y SPAN
    actionClassString('w-full form-professional-groupProfile__textarea', 'add', $TEXAREA_DESC_ELEMENT);

    // ERROR SPAN 1
    const $SPAN_ERROR_1 = formRegisterUI.spanError({ text: '', classessChild: 'has-error' });

    $DESC_WRAPPER.append($LABEL_DESC, $TEXAREA_DESC_ELEMENT, $SPAN_ERROR_1);

    //IMAGEN DE PERFIL
    const $PROFILE_IMAGE_WRAPPER: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-professional-groupProfile__containerImageProfile', 'add', $PROFILE_IMAGE_WRAPPER);

    const $H6_PROFILE = document.createElement('h6');
    actionClassString('to-left c-flex c-flex-items-center gap-1/2 form-professional-groupProfile__label', 'add', $H6_PROFILE);

    const $ICON_PROFILE = document.createElement('i');
    actionClassString('fas fa-id-badge', 'add', $ICON_PROFILE);

    const spanProfile = document.createElement('span');
    spanProfile.textContent = 'Foto de perfil (Opcional)';

    $H6_PROFILE.append($ICON_PROFILE, spanProfile);

    // AREA DE CARGA DE IMAGEN DE PERFIL
    const $UPLOAD_AREA_PROFILE: HTMLDivElement = document.createElement('div');
    // AUXILIAR PARA AGREGAR ATRIBUTOS
    attrFilled($UPLOAD_AREA_PROFILE, {
      class: 'c-flex c-flex-items-center c-flex-column gap-3/2 w-full cursor-pointer position-relative upload-area',
      'data-type': 'single',
      'data-message': 'imageProfile',
    });

    // CAMPO IMAGEN PERFIL
    const inputProfileInstance: InputFile = FormFieldFactory.createFieldForm('file', {
      id: 'imageProfile',
      name: 'imageProfile',
      type: 'file',
      disabled: false,
      required: true,
      accept: 'image/jpg,image/jpeg,image/png,image/webp',
      multiple: false,
      value: '',
      autofocus: false,
    });
    // SUSCRIVIR A EVENTO CHANGE EN NUEVA INSTANCIA DE PERFIL
    inputProfileInstance.onChange(async (files) => {
      if (!files || files.length === 0) return; // SI NO HAY ARCHIVOS ==> NO HACER NADA
      const previewManager = new ImagePreviewManager(); //INSTANCIAMOS ADMIN
      await previewManager.createProfileImagePreview($PREVIEW_IMAGE, $INPUT_UPLOAD_PROFILE); //CREAR Y MOSTRAR EN UI IMAGEN PREVIA

      // GUARDAR EN STORAGE
      this.formRegister.saveDataStepPersistence({ step: this.formRegister.getStepForm(), elements: [$INPUT_UPLOAD_PROFILE, textareaInstance.render() as HTMLTextAreaElement] });
    });

    inputProfileInstance.setValueAndTrigger(persistedProfile); //AUTO EJECUTAR CHANGE Y SETEAR

    const $INPUT_UPLOAD_PROFILE = inputProfileInstance.render() as HTMLInputElement;
    actionClassString('upload-area__input', 'add', $INPUT_UPLOAD_PROFILE);

    const $LABEL_UPLOAD_PROFILE: HTMLLabelElement = document.createElement('label');
    actionClassString('cursor-pointer', 'add', $LABEL_UPLOAD_PROFILE);

    this.formRegister.addNewLabel($LABEL_UPLOAD_PROFILE); //==> AGREGAR NUEVO LABEL AL FORM
    this.formRegister.addNewInput($INPUT_UPLOAD_PROFILE); // ==> AGREGAR NUEVO INPUT AL FORM

    const $DRAG_PROFILE: HTMLDivElement = document.createElement('div');
    $DRAG_PROFILE.classList.add('c-flex', 'c-flex-items-center', 'c-flex-column', 'gap-3/2', 'form-professional-groupProfile__drag');

    $DRAG_PROFILE.innerHTML = `<i class="upload-area__icon mb-1/2 fas fa-cloud-upload-alt"></i>
             <small class="upload-area__text" data-device="desktop">Toca o Arrastra tu imagen aquí</small>
             <small class="upload-area__text upload-area__text--hidde" data-device="mobile">Toca o haz click para seleccionar tu imagen</small>
             <small class="upload-area__note">Formatos: JPG, PNG, JPEG O WEBP (Máx. 5MB)</small>
       `;

    $LABEL_UPLOAD_PROFILE.append($INPUT_UPLOAD_PROFILE, $DRAG_PROFILE); //AGREGAR CONTENIDOS AL LABEL

    const $PREVIEW_IMAGE: HTMLDivElement = document.createElement('div');
    actionClassString('form-professional-groupProfile__previewImage c-flex c-flex-wrap gap-2 position-relative', 'add', $PREVIEW_IMAGE);

    // SI HAY DATOS DE IMAGEN DE PERFIL
    if (persistedProfile) {
      const previewManager = new ImagePreviewManager(); // ==> CREAR INSTANCIA DE NUEVA IMAGEN AQUI
      await previewManager.createImageProfile($PREVIEW_IMAGE, persistedProfile); // CREA PREVIEW DESDE INDEXEDDB
    }

    // ERROR SPAN 2
    const $SPAN_ERROR_2 = formRegisterUI.spanError({ text: '', classessChild: 'has-error' });

    $UPLOAD_AREA_PROFILE.append($LABEL_UPLOAD_PROFILE, $PREVIEW_IMAGE, $SPAN_ERROR_2);
    $PROFILE_IMAGE_WRAPPER.append($H6_PROFILE, $UPLOAD_AREA_PROFILE);

    // IMAGENES DE EXPERIENCIAS
    const $WRAPPER_IMAGE_EXP: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-professional__groupImagesExperiences', 'add', $WRAPPER_IMAGE_EXP);

    const $H6_EXP = document.createElement('h6');
    actionClassString('to-left c-flex c-flex-items-center gap-1/2 form-professional-groupProfile__label', 'add', $H6_EXP);

    const $ICON_EXP = document.createElement('i');
    actionClassString('fas fa-images', 'add', $ICON_EXP);

    const spanExp = document.createElement('span');
    spanExp.textContent = 'Imágenes de experiencias (Opcional)';

    $H6_EXP.append($ICON_EXP, spanExp);

    const $UPLOAD_AREA_EXP: HTMLDivElement = document.createElement('div');
    attrFilled($UPLOAD_AREA_EXP, {
      class: 'c-flex c-flex-items-center c-flex-column gap-3/2 w-full cursor-pointer upload-area',
      'data-type': 'multiple',
      'data-message': 'imageExperiences',
    });

    // CAMPO DE IMAGENES EXPERIENCIAS
    const inputExpInstance: InputFile = FormFieldFactory.createFieldForm('file', {
      id: 'imageExperiences',
      name: 'imageExperiences',
      type: 'file',
      disabled: false,
      required: true,
      accept: 'image/jpg,image/jpeg,image/png,image/webp',
      multiple: true,
      value: '',
      autofocus: false,
    });
    // SUSCRIBIR A EVENTO CHANGE A CAMPO DE IMAGENES DE EXPERIENCIAS
    inputExpInstance.onChange(async (files) => {
      if (!files || files.length === 0) return; // ==> SI NO HAY ARCHIVOS NO HACER NADA

      const previewManager = new ImagePreviewManager(); //INSTANCIAMOS NUEVA IMAGEN
      await previewManager.createExperienceImagesPreviews($PREVIEW_EXP, $INPUT_UPLOAD_EXP); // CREAR Y MOSTRAR IMAGEN PREVIA EN UI

      // GUARDAR EN LOCALSTORAGE
      this.formRegister.saveDataStepPersistence({ step: this.formRegister.getStepForm(), elements: [$INPUT_UPLOAD_EXP, textareaInstance.render() as HTMLTextAreaElement] });
    });

    inputExpInstance.setValueAndTrigger(persistedExp); // AUTOEJECUTAR EVENTO CON SU HANDLER SUSCRITO DE LA INSTANCIA

    const $INPUT_UPLOAD_EXP = inputExpInstance.render() as HTMLInputElement;
    actionClassString('upload-area__input', 'add', $INPUT_UPLOAD_EXP);

    const $LABEL_UPLOAD_EXP: HTMLLabelElement = document.createElement('label');
    actionClassString('cursor-pointer', 'add', $LABEL_UPLOAD_EXP);

    this.formRegister.addNewLabel($LABEL_UPLOAD_EXP); //==> AGREGAR NUEVO LABEL AL FORM
    this.formRegister.addNewInput($INPUT_UPLOAD_EXP); // ==> AGREGAR NUEVO INPUT AL FORM

    const $DRAG_EXP: HTMLDivElement = document.createElement('div');
    actionClassString('c-flex c-flex-items-center c-flex-column gap-3/2 form-professional-groupProfile__drag', 'add', $DRAG_EXP);
    $DRAG_EXP.classList.add('c-flex', 'c-flex-items-center', 'c-flex-column', 'gap-3/2', 'form-professional-groupProfile__drag');
    $DRAG_EXP.innerHTML = `
             <i class="upload-area__icon mb-1/2 fas fa-cloud-upload-alt"></i>
             <small class="upload-area__text" data-device="desktop">Toca o Arrastra imagenes aquí</small>
             <small class="upload-area__text upload-area__text--hidde" data-device="mobile">Toca o haz click para seleccionar imagenes</small>
             <small class="upload-area__note">Puedes subir hasta 10 imágenes (Máx. 5MB cada una)</small>
             <small>Formatos: JPG, PNG, JPEG O WEBP</small>
         `;

    $LABEL_UPLOAD_EXP.append($INPUT_UPLOAD_EXP, $DRAG_EXP);
    const $PREVIEW_EXP: HTMLDivElement = document.createElement('div');
    actionClassString('form-professional-groupProfile__previewMultipleImages c-flex c-flex-wrap gap-2', 'add', $PREVIEW_EXP);

    // SI HAY DATOS DE IMAGEN DE EXPERIENCIA
    if (persistedExp) {
      const previewManager = new ImagePreviewManager();
      await previewManager.createImagesExperience($PREVIEW_EXP, persistedExp); // CREA PREVIEW DESDE INDEXEDDB
    }

    // ERROR SPAN 3
    const $SPAN_ERROR_3 = formRegisterUI.spanError({ text: '', classessChild: 'has-error' });

    $UPLOAD_AREA_EXP.append($LABEL_UPLOAD_EXP, $PREVIEW_EXP, $SPAN_ERROR_3);
    $WRAPPER_IMAGE_EXP.append($H6_EXP, $UPLOAD_AREA_EXP);

    const $CONTAINER_BTN: HTMLDivElement = document.createElement('div');
    actionClassString('mb-2 c-flex w-full c-flex-justify-end', 'add', $CONTAINER_BTN);

    const btnInstanceNext: ButtonBaseUI = this.formRegister.createBtnNext(); //INSTANCIAR BOTON NEXT

    $CONTAINER_BTN.appendChild(btnInstanceNext.getBtnElement()); //GUARDAR ELEMENTO EN CONTENEDOR

    // ENSAMBLAR
    $BODY.append($DESC_WRAPPER, $PROFILE_IMAGE_WRAPPER, $WRAPPER_IMAGE_EXP, $CONTAINER_BTN);
    $NEW_STEP.append($BODY);

    return $NEW_STEP;
  }
}
