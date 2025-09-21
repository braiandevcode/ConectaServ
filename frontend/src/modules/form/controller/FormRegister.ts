import { capitalizeWords, normalizeSpaces, parseMontoToNumber } from '../../../ui/auxiliars.js';
import { EDefaultSelected, EGroupCheckBox, EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums.js';
import { iFieldConfig } from '../../../interfaces/interfaces.js';
import { TFormElement, TInputName, TLocationKey } from '../../../types/types.js';
import { fieldConfigs, formState } from '../../../config/constant.js';
import FormBase from '../entities/FormBase.js';
import FormRegisterUI from '../ui/FormRegisterUI.js';
import FormBaseDto from '../dto/FormBaseDto.js';
import { formatTextArea } from '../../../utils/domUtils.js';
import { readExistingData } from '../../../utils/storageUtils.js';
import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';

// FORMULARIO DE REGISTRO
export default class FormRegister extends FormBase {
  private hasContext: boolean;
  private hasBudge: boolean;
  private bodyForm: HTMLDivElement;
  private formRegisterUI: FormRegisterUI;

  constructor(formBaseOptions: FormBaseDto, formRegisterUI: FormRegisterUI) {
    super(formBaseOptions, formRegisterUI);
    this.formRegisterUI = formRegisterUI;
    this.hasContext = false;
    this.hasBudge = false;
    this.bodyForm = this.formRegisterUI.buildBody(); //CONSTRUCCION Y ASIGNACION DEL CUERPO PRINCIPAL DENTRO DEL FORMULARIO
  }

  // CREAR EL FORM Y RETORNAR
  public createForm(): HTMLFormElement {
    this.insertIntoForm();
    return this.form;
  }

  // IMPLEMENTACION DE CONTENIDO DEL FORMULARIO
  protected async insertIntoForm(): Promise<void> {
    const formHeader: HTMLDivElement = this.formRegisterUI.buildHeader();
    const stepOne: HTMLDivElement = await this.formRegisterUI.getStepUI().buildStep({ formRegister: this, formRegisterUI: this.formRegisterUI });

    this.bodyForm.append(stepOne);

    this.form.append(formHeader, this.bodyForm);
  }

  // METODO PARA AGREGAR CONFIGURACION DE ATRIBUTOS EN INPUTS EN REGISTRO
  public addAttributesInputs(id: TInputName): iFieldConfig {
    // RETORNAR CADA UNO DE LOS OBJETO CON SUS ATRIBUTOS
    return {
      ...fieldConfigs[id],
    };
  }

  // ------------------VALIDACION DE CADA PASO EN TODOS LOS CAMPOS DEL FORMULARIO---------------------//
  // FUNCION PARA GUARDAR DATOS Y HACER LA PERSISTENCIA
  public async saveDataStepPersistence({ step, elements }: { step: number; elements: TFormElement[] }): Promise<void> {
    const STEP_DATA_KEY = ENamesOfKeyLocalStorage.STEP_DATA; //GUARDA EN VARIABLE EL STEP DATA

    const existingData = readExistingData(STEP_DATA_KEY); //PARSEA Y LEE EL LOCALSTORAGE DEL STEP DATA
    const stepKeyNumber: string = String(step); // => EL PASO DE NUMERO CONVERTIRLO  A STRING

    //DATOS PREVIOS DEL MISMO PASO
    const prevStepData = existingData[stepKeyNumber] ?? {};

    let stepData: Record<string, unknown> = {}; //OBJETO EN MEMORIA

    switch (stepKeyNumber) {
      // case EKeyDataByStep.ZERO: {
      //   const fullNameInput = elements.find((el) => el.name === 'fullName');
      //   const usernameInput = elements.find((el) => el.name === 'userName');
      //   const emailInput = elements.find((el) => el.name === 'email');
      //   const locationInput = elements.find((el) => el.name === 'location');
      //   const acceptedTermsInput = elements.find((el) => el.name === 'terms') as HTMLInputElement | undefined;

      //   stepData = {
      //     fullName: capitalizeWords(normalizeSpaces(fullNameInput?.value || '')),
      //     userName: usernameInput?.value || '',
      //     email: emailInput?.value.toLowerCase() || '',
      //     location: capitalizeWords(locationInput?.value || ''),
      //     terms: acceptedTermsInput?.checked || false,
      //   };
      //   break;
      // }
      case EKeyDataByStep.ONE: {
        const categoryInput = elements.find((el) => el.name === 'category');
        const serviceValues = elements.filter((el) => el.name === EGroupCheckBox.SERVICE && (el as HTMLInputElement).checked).map((el) => el.value);
        const contextValues = elements.filter((el) => el.name === EGroupCheckBox.CONTEXT && (el as HTMLInputElement).checked).map((el) => el.value);
        const dayValues = elements.filter((el) => el.name === EGroupCheckBox.DAY && (el as HTMLInputElement).checked).map((el) => el.value);
        const hourValues = elements.filter((el) => el.name === EGroupCheckBox.HOUR && (el as HTMLInputElement).checked).map((el) => el.value);

        stepData = {
          category: categoryInput?.value ?? EDefaultSelected.SELECT_CATEGORY,
          'service[]': serviceValues,
          ...(this.hasContext ? { 'context[]': contextValues } : {}),
          'day[]': dayValues,
          'hour[]': hourValues,
        };
        break;
      }
      case EKeyDataByStep.TWO: {
        const descriptionInput = (elements.find((el) => el.name === 'descriptionUser') as HTMLTextAreaElement) ?? '';
        stepData = {
          ...prevStepData,
          imageProfile: prevStepData.imageProfile ?? null,
          imageExperiences: prevStepData.imageExperiences ?? [],
          descriptionUser: formatTextArea(descriptionInput?.value ?? ''),
        };
        break;
      }
      case EKeyDataByStep.THREE: {
        const budgetSelectedInput = elements.find((el) => el.name === 'budgeSelected' && (el as HTMLInputElement).checked);
        const budgetAmountInput = elements.find((el) => el.name === 'amountBudge');
        const reinsertInput = elements.find((el) => el.name === 'reinsert' && (el as HTMLInputElement).checked);

        stepData = {
          ...prevStepData,
          budgeSelected: budgetSelectedInput?.value ?? prevStepData.budgeSelected ?? 'no',
          amountBudge: budgetAmountInput ? parseMontoToNumber(budgetAmountInput.value) : (prevStepData.amountBudge ?? 0),
          reinsert: reinsertInput?.value ?? prevStepData.reinsert ?? 'no',
        };
        break;
      }
      case EKeyDataByStep.FOUR: {
        const acceptedTermsInput = elements.find((el) => el.name === 'terms') as HTMLInputElement | null;
        const fullNameInput = elements.find((el) => el.name === 'fullName');
        const usernameInput = elements.find((el) => el.name === 'userName');
        const emailInput = elements.find((el) => el.name === 'email');
        const locationInput = elements.find((el) => el.name === 'location');

        stepData = {
          ...prevStepData,
          ...(fullNameInput && {
            fullName: capitalizeWords(normalizeSpaces(fullNameInput.value)),
          }),
          ...(usernameInput && {
            userName: usernameInput.value,
          }),
          ...(emailInput && {
            email: emailInput.value.toLowerCase(),
          }),
          ...(locationInput && {
            location: capitalizeWords(locationInput.value as TLocationKey) ?? EDefaultSelected.SELECT_LOCATION,
          }),
          ...(acceptedTermsInput && {
            terms: acceptedTermsInput.checked,
          }),
        };

        break;
      }
      default:
        return;
    }

    // ACTUALIZAR ESTRUCTURAS
    existingData[stepKeyNumber] = stepData;
    formState.dataByStep = existingData;
    localStorage.setItem(STEP_DATA_KEY, JSON.stringify(formState.dataByStep));
  }

  // ALMACENAR PASO ACTUAL
  public saveCurrentStep(): void {
    localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify(this.getStepForm()));
  }

  public incrementStep(): void {
    this.formRegisterUI.getStepUI().incrementStep(); //INCREMENTAR PASO
  }

  public decrementStep(): void {
    this.formRegisterUI.getStepUI().decrementStep(); //DECREMENTAR PASO
  }

  //---------------------------------GETTERS Y SETTERS---------------------------------------------//
  // VER CONTENEDOR DEL FORM
  public getBodyForm(): HTMLDivElement {
    return this.bodyForm;
  }

  // MOSTRAR ELEMENTO DE FORMULARIO
  public getStepForm(): number {
    return this.formRegisterUI.getStepUI().getStep();
  }

  // MODIFICAR BOOLEANO DE SI TIENE GRUPOS DE CHECKS CONTEXTO(HABITOS DE TRABAJOS DEL TAKER) O NO
  public setContext(context: boolean): void {
    this.hasContext = context;
  }

  // MODIFICAR BOOLEANO DE SI HAY PASO PRESUPUESTO O NO
  public setBudge(budge: boolean): void {
    this.hasContext = budge;
  }

  // MODIFICAR PASO DEL REGISTRO
  public setStep(step: number): void {
    return this.formRegisterUI.getStepUI().setStep(step);
  }

  // CREAR BOTON  SIGUIENTE
  public createBtnNext(): ButtonBaseUI {
    return this.formRegisterUI.createBtnNext({ formRegister: this, formRegisterUI: this.formRegisterUI }); //RETORNAR INSTANCIA BOTON SIGUIENTE
  }

  // CREAR BOTON PREVIO
  public createBtnPrev(): ButtonBaseUI {
    return this.formRegisterUI.createBtnPrev({ formRegister: this, formRegisterUI: this.formRegisterUI }); //RETORNAR INSTANCIA BOTON SIGUIENTE
  }

  // ELIMINAR BOTON PREVIO
  public destroyBtnPrev(): void {
    this.formRegisterUI.destroyBtnPrev(); //REMOVER ELEMENTO
  }

  // -----------USANDO PROPIEDADES ACCESORIAS-----------------------//

  // VER ELEMENTO FORM
  public get _formElement(): HTMLFormElement {
    return this.form;
  }

  public get _hasContext(): boolean {
    return this.hasContext;
  }

  public get _hasBudge(): boolean {
    return this.hasBudge;
  }

  // IMPLEMENTACION DE EVENTOS DEL FORMULARIO
  public async attachFormEvents(): Promise<void> {
    this._formElement.addEventListener('submit', (e: SubmitEvent) => {
      e.preventDefault();
      console.log('Hello');
      console.log(this.getStepForm());
    });
  }
}
