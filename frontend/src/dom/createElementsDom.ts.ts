// CADA CONSTANTE QUE EMPIEZA CON "$" EN MI CODIGO ESPECIFICA QUE ES UNA REFERENCIA A ELEMENTOS DEL DOM.
// SI NO LO TIENE SIMPLEMENTE NO ES UNA REFERENCIA DEL DOM SON VARIABLES COMUNES DEL PROGRAMA.
import clearElementChild from "./clearElementChild.js";

// DOCUMENT
const D: Document = document; //ABREVIAR NOMBRE DE DOCUMENT

// FUNCION PARA CREAR EL TITULO DE CATEGORIA SEGUN ELECCION
export const createTitleCategorySelected = (): void => {
  const $CATEGORY_SPECIALITY_FORM: HTMLSelectElement | null = D.querySelector('.form-professional-groupSelectCategory__select');  //SELECT DE CATEGORIAS
  const $HEAD_SUBTITLE_MAIN: HTMLDivElement | null = D.querySelector('.form-basic__subtitle'); // CABECERA DEL SUBTITULO PRINCIPAL
  if (!$HEAD_SUBTITLE_MAIN) return;

  if ($HEAD_SUBTITLE_MAIN.children.length > 1) {
    $HEAD_SUBTITLE_MAIN.removeChild($HEAD_SUBTITLE_MAIN.lastElementChild as Node)  //QUITAR ULTIMO NODO DEL CONTENEDOR
  }

  const titleCategory: HTMLElement = D.createElement('h3');
  titleCategory.classList.add('c-flex', 'mb-1/2', 'mt-1/2', 'c-flex-justify-center', 'w-full', 'form-basic__title-category');

  const selectedCategory = $CATEGORY_SPECIALITY_FORM?.selectedOptions[0]?.textContent?.trim();

  if (titleCategory && selectedCategory) {
    titleCategory.textContent = `${selectedCategory}`;
    $HEAD_SUBTITLE_MAIN?.append(titleCategory);
  }
};

// FUNCION PARA CREAR SECCION PASO PRESUPUESTO
export const createStepBudget = (): void => {
  const $CONTAINER: HTMLElement | null = D.querySelector('.form-professional');
  if (!$CONTAINER) return;

  deleteStepBudget({ container: $CONTAINER }); //ELIMINAR TODO ANTES

  const $STEP_PROFILE: HTMLElement | null = $CONTAINER.querySelector('.form-professional-groupProfile');
  if (!$STEP_PROFILE) return;

  const newStep = D.createElement('div');
  newStep.classList.add('mb-2', 'c-flex', 'c-flex-column', 'gap-1', 'form-professional-groupBudget', 'form-step', 'form-step--hidden');
  newStep.setAttribute('data-step', '4');
  newStep.textContent = "";

  const headerDiv = D.createElement("div");
  headerDiv.classList.add('c-flex', 'c-flex-items-center', 'gap-1', 'form-professional-groupBudget__header');

  const h3 = D.createElement("h3");
  h3.classList.add('form-professional-groupBudget__title');

  const iconIdCard = D.createElement("i");
  iconIdCard.classList.add('fas', 'fa-id-card');

  const spanTitle = D.createElement("span");
  spanTitle.textContent = "Presupuesto";

  h3.append(iconIdCard, spanTitle);
  headerDiv.appendChild(h3);
  newStep.appendChild(headerDiv);

  const cont2 = D.createElement("div");
  cont2.classList.add('c-flex', 'c-flex-column', 'gap-2');

  const cont2_1 = D.createElement("div");
  cont2_1.classList.add('c-flex', 'c-flex-column', 'gap-1/2');

  const h4_1 = D.createElement("h4");
  h4_1.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'form-professional-groupBudget__label');

  const iconDollar = D.createElement("i");
  iconDollar.classList.add('fas', 'fa-circle-dollar-to-slot');

  const spanH4_1 = D.createElement("span");
  spanH4_1.textContent = "¿Cobrás el presupuesto?";

  h4_1.append(iconDollar, spanH4_1);
  cont2_1.appendChild(h4_1);

  const infoDiv = D.createElement("div");
  infoDiv.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'container-textInfo');

  const iconInfo = D.createElement("i");
  iconInfo.classList.add('fas', 'fa-info-circle');

  const smallInfo = D.createElement("small");
  smallInfo.classList.add('container-textInfo__message');
  smallInfo.textContent = "Acción no modificable";

  infoDiv.append(iconInfo, smallInfo);
  cont2_1.append(infoDiv);
  cont2.append(cont2_1);

  const radioGroup1 = D.createElement("div"); // CREAR GRUPO 1
  radioGroup1.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'radio-group'); // AGREGAR CLASES

  // FUNCION QUE CREA RADIO LABELS
  const createRadioLabel = (value: string, labelText: string, checked = false, disabled = false) => {
    const label = D.createElement("label");
    label.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'cursor-pointer', 'form-professional-groupBudget__radioGroup', 'radio-option');

    const input = D.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "budgeSelected");
    input.setAttribute("value", value);
    input.classList.add('c-flex', 'c-flex-items-center', 'c-flex-justify-center', 'cursor-pointer', 'form-professional-groupBudget__radioGroup__input', 'radio-option__input');
    if (checked) input.setAttribute("checked", "true");
    if (disabled) input.setAttribute("disabled", "true");

    const span = D.createElement("span");
    span.classList.add("radio-option__label");
    span.textContent = labelText;

    label.append(input, span);
    return label;
  };

  // AGREGAR RADIO AL GRUPO 1
  radioGroup1.append(
    createRadioLabel("yes", "Sí"),
    createRadioLabel("no", "No", true)
  );

  cont2.appendChild(radioGroup1);
  newStep.appendChild(cont2);

  const cont3 = D.createElement("div");
  cont3.classList.add('c-flex', 'c-flex-column', 'gap-2');

  const cont3_1 = D.createElement("div");
  cont3_1.classList.add('c-flex', 'c-flex-column', 'gap-1/2');
  cont3_1.setAttribute('data-message', "amountBudge"); //APLICAR EL DATA-SET CON EL VALOR DEL NAME

  const h4_3 = D.createElement("h4");
  h4_3.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'form-professional-groupBudget__label');

  const iconReceipt = D.createElement("i");
  iconReceipt.classList.add('fas', 'fa-receipt');

  const spanH4_3 = D.createElement("span");
  spanH4_3.textContent = "Precio fijo del presupuesto";

  h4_3.append(iconReceipt, spanH4_3);

  const inputContainer = D.createElement("div");
  inputContainer.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'form-professional-groupBudget__container-field');

  const containerMsgError = D.createElement('div');
  const spanError = D.createElement("span");
  spanError.classList.add('has-error') //AÑADIRLE UNA CLASE
  containerMsgError.classList.add('containerMsgError', 'mt-1/2', 'mb-1/2');
  containerMsgError.append(spanError); //AGREGAR SPAN DE ERROR A SU CONTENEDOR

  const iconDollarSign = D.createElement("i");
  iconDollarSign.classList.add('fas', 'fa-dollar-sign');

  const inputAmount = D.createElement("input");
  inputAmount.setAttribute("type", "text");
  inputAmount.setAttribute("name", "amountBudge");
  inputAmount.setAttribute("placeholder", "$15000");
  inputAmount.classList.add('w-1/2', 'form-professional-groupBudget__field');
  inputAmount.setAttribute("disabled", "true");


  inputContainer.append(iconDollarSign, inputAmount);
  cont3_1.append(h4_3, inputContainer, containerMsgError);
  cont3.append(cont3_1);
  newStep.appendChild(cont3);

  const cont4 = D.createElement("div");
  cont4.classList.add('c-flex', 'c-flex-column', 'gap-2');

  const cont4_1 = D.createElement("div");
  cont4_1.classList.add('c-flex', 'c-flex-column', 'gap-1/2');

  const h4_4 = D.createElement("h4");
  h4_4.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'form-professional-groupBudget__label');

  const iconUndo = D.createElement("i");
  iconUndo.classList.add('fas', 'fa-undo');

  const spanH4_4 = D.createElement("span");
  spanH4_4.textContent = "¿Reintegro si te eligen?";

  h4_4.append(iconUndo, spanH4_4);
  cont4_1.appendChild(h4_4);

  const infoDiv4 = D.createElement("div");
  infoDiv4.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'container-textInfo');

  const iconInfo4 = D.createElement("i");
  iconInfo4.classList.add('fas', 'fa-info-circle');

  const smallInfo4 = D.createElement("small");
  smallInfo4.classList.add('form-professionalBudget__info');
  smallInfo4.textContent = "Acción no modificable";

  infoDiv4.append(iconInfo4, smallInfo4);
  cont4_1.appendChild(infoDiv4);
  cont4.appendChild(cont4_1);

  const radioGroup2 = D.createElement("div");
  radioGroup2.classList.add('mb-2', 'c-flex', 'c-flex-items-center', 'gap-1/2', 'form-professional-groupBudget__radioGroup', 'radio-group');

  const createRadioReinsertLabel = (value: string, labelText: string, checked = false, disabled = true) => {
    const label = D.createElement("label");
    label.classList.add('c-flex', 'c-flex-items-center', 'gap-1/2', 'cursor-pointer', 'form-professional-groupBudget__radioOption', 'radio-option');

    const input = D.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "reinsert");
    input.setAttribute("value", value);
    if (disabled) input.setAttribute("disabled", "true");
    if (checked) input.setAttribute("checked", "true");
    input.classList.add('c-flex', 'c-flex-items-center', 'c-flex-justify-center', 'cursor-pointer', 'form-professional-groupBudget__radioOption__input', 'radio-option__input');

    const span = D.createElement("span");
    span.classList.add("radio-option__label");
    span.textContent = labelText;

    label.append(input, span);
    return label;
  };

  // AGREGAR INPUTS RADIOS CON SUS VALUES Y BOOLEAN
  radioGroup2.append(
    createRadioReinsertLabel("yes", "Sí"),
    createRadioReinsertLabel("no", "No", true)
  );

  cont4.appendChild(radioGroup2);
  newStep.appendChild(cont4);

  const cont5 = D.createElement("div");
  cont5.classList.add('mb-2', 'c-flex', 'c-flex-justify-end');

  const buttonNext = D.createElement("button");
  buttonNext.setAttribute("type", "button");
  buttonNext.setAttribute("data-step", "4");
  buttonNext.classList.add('c-flex', 'c-flex-justify-center', 'c-flex-items-center', 'gap-1/2', 'cursor-pointer', 'btn', 'container-btn__next');
  buttonNext.setAttribute("disabled", "true");

  const spanBtn = D.createElement("span");
  spanBtn.textContent = "Siguiente";

  const iconArrow = D.createElement("i");
  iconArrow.classList.add('fas', 'fa-arrow-circle-right');

  buttonNext.append(spanBtn, iconArrow);
  cont5.appendChild(buttonNext);
  newStep.appendChild(cont5);

  if ($STEP_PROFILE && $STEP_PROFILE.parentElement) {
    $STEP_PROFILE.parentElement.insertBefore(newStep, $STEP_PROFILE);
  }

  updateStepBudget({ container: $CONTAINER }); //ACTUALIZAR 
};

// FUNCION PARA ELIMINAR ELEMENTO CONTENEDOR DE PRESUPUESTO
export const deleteStepBudget = ({ container }: { container: HTMLElement | null }): void => {
  if (!container) return;
  const $STEP_BUDGET = container.querySelector<HTMLElement>('.form-professional-groupBudget.form-step');
  if ($STEP_BUDGET && $STEP_BUDGET.dataset.step === "4") {
    $STEP_BUDGET.remove();
    updateStepBudget({ container }); //ACTUALIZAR
  }
};

// FUNCION PARA ACTUALIZAR LOS DATA STEP AL CREAR Y ELIMINAR PASO 4 PRSUPUESTO
export const updateStepBudget = ({ container }: { container: HTMLElement }): void => {
  if (!container) return;

  const internalSteps = container.querySelectorAll('.form-step') as NodeListOf<HTMLElement>;

  internalSteps.forEach((step, index) => {
    const stepNum = index + 2;
    step.setAttribute("data-step", `${stepNum}`);

    const btn = step.querySelector<HTMLButtonElement>('.container-btn__next[data-step]');
    if (btn) btn.setAttribute("data-step", `${stepNum}`);
  });
};



// Función para crear vista previa de una sola imagen (perfil)
export const createProfileImagePreview = (container: HTMLElement, inputFile: HTMLInputElement) => {
  if (inputFile?.files && inputFile?.files.length as number > 0) {
    clearElementChild({ elements: [container] });
    const file = inputFile.files[0];
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      const previewSrc = ev.target?.result as string;
      const img = document.createElement('img');
      img.src = previewSrc;
      img.alt = 'Vista previa del perfil';
      img.classList.add('profile-image-preview');
      container.append(img);
    };
    reader.readAsDataURL(file);
  }
};

// Función para crear vista previa de varias imágenes (experiencias)
export const createExperienceImagesPreviews = (container: HTMLElement, inputFiles: HTMLInputElement) => {
  if (inputFiles?.files && inputFiles.files.length as number > 0) {
    clearElementChild({ elements: [container] });
    Array.from(inputFiles.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const previewSrc = ev.target?.result as string;
        if (!previewSrc) return;
        const img = document.createElement('img');
        img.src = previewSrc;
        img.classList.add('experience-image-preview');
        container.append(img);
      };
      reader.readAsDataURL(file);
    });
  }
};