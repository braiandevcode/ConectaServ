// IMPORTACIONES
import {iFormStateValidation} from '../../../interfaces/interfaces';
import apiRequest from '../../../utils/apiRequest.js';
import {domainURLPath} from '../../../config/constant.js';
import {Loader} from '../../../patterns/singleton/Loader.js';
import {TFieldState} from '../../../types/types';
import VerifyCodeFormUI from '../ui/VerifyCodeFormUI.js';
import FormBase from '../entities/FormBase.js';
import FormBaseDto from '../dto/FormBaseDto.js';
import ModalBase from '../../modal/entities/ModalBase.js';
import {isValueField, validateWithRegex} from '../../../utils/domUtils.js';
import VerifyEmailModal from '../../../modules/modal/components/VerifyEmailModal.js';

// FORMULARIO PARA VERIFICAR CODIGO DE EMAIL
export default class VerifyCodeForm extends FormBase {
  private modal?: ModalBase;

  constructor(
    formOptions: FormBaseDto,
    private readonly ui: VerifyCodeFormUI,
  ) {
    super(formOptions, ui);

    // this.configForm = new FormOptions({ containerSelector: ".register-userProfessional__content", }); // => INSTANCIA
  }

  public setModal(modal: ModalBase) {
    this.modal = modal;
  }
  //METODO PARA CREAR EL FORMULARIO
  public async createForm(): Promise<HTMLFormElement> {
    await this.insertIntoForm();
    return this.getFormElement();
    // return await this.createFormVerifyCode(this.containerForm); //RETORNA EL FORMULARIO
  }

  //IMPLEMETAR EL CONTENIDO DE ESTE FORMULARIO
  public async insertIntoForm(): Promise<void> {
    this.ui.createFieldForm(this);
  }

  // AUXILIAR PARA VALIDAR EL CODIGO
  private validateCode = (userCode: string) => {
    if (!isValueField({text: userCode})) {
      return {
        value: userCode,
        error: 'Codigo requerido',
        isValid: false,
      } as TFieldState;
    }

    // SI NO ES UN NUMERO
    if (!validateWithRegex({pattern: /^[0-9]+$/, text: userCode})) {
      return {
        value: userCode,
        error: 'No valido, Debe ser un número',
        isValid: false,
      } as TFieldState;
    }

    // SI TIENE LA LONGITUD NO ES 6
    if (userCode.length !== 6) {
      return {
        value: userCode,
        error: 'El número debe tener 6 dígitos.',
        isValid: false,
      } as TFieldState;
    }

    // SINO
    return {
      value: userCode,
      error: '',
      isValid: true,
    } as TFieldState;
  };

  /**
   * OBTIENE EL VALOR ACTUAL DEL INPUT DE CODIGO, LO LIMPIA Y LO VALIDA.
   * UTIL PARA REUTILIZAR LA LOGICA TANTO AL ESCRIBIR COMO AL ENVIAR EL FORMULARIO.
   */
  protected getInputAndValidate(): {value: string; validate: TFieldState} {
    const input = this.form.querySelector<HTMLInputElement>('input[name="emailCode"]'); // REFERENCIAR POR NAME
    if (!input) throw new Error('Elemento input no encontrado'); // SI NO EXISTE ELEMENTO INPUT RETORNAR

    const userCode = input.value.trim(); //QUITAR ESPACIOS Y GUARDAR EN MEMORIA
    const validateValueCode = this.validateCode(userCode); //VALIDAR ENTRADA

    return {value: userCode, validate: validateValueCode};
  }

  // METODO QUE EN ESTE CONTEXTO SE ENCARGA DE ESPERAR EL BOOLEAN DE VALIDO
  private isCodeValid(code: string): boolean {
    const savedCode = localStorage.getItem('verificationCode');
    const {validate} = this.getInputAndValidate();
    const isValid: boolean = Boolean(savedCode) && validate.isValid && code === savedCode;
    return isValid;
  }

  // ----------------ESTADOS EN UI-------------------------------------------------//
  //UI DE EEVENTO INPUT
  private handleInputUI(input: HTMLInputElement): {isValid: boolean; code: string} {
    const code = input.value.trim();
    const {isValid, error} = this.validateCode(code);
    const parentInput = input.closest(`[data-message="${input.name}"]`);
    const span = parentInput?.querySelector<HTMLSpanElement>('.has-error');

    input.classList.toggle('is-valid', isValid);
    input.classList.toggle('is-invalid', !isValid);
    if (span) span.textContent = error;

    if (isValid) {
      // this.btnForm.getBtnSubmit().removeAttribute("disabled"); //==>>>> HABILITAR BOTON
      // this.btnForm.getBtnSubmit().classList.remove("form__btnSubmit--disabled"); // QUITAMOS CLASE A BOTON PARA DAR SU ESTILO NORMAL
    } else {
      //  this.btnForm.getBtnSubmit().setAttribute("disabled", "true");  //==>>>> DESHABILITAR BOTON
      //  this.btnForm.getBtnSubmit().classList.add("form__btnSubmit--disabled"); // AGREGAR CLASE A BOTON PARA OPACAR
    }

    return {
      isValid,
      code,
    } as {isValid: boolean; code: string};
  }

  //UI DE EVENTO SUBMIT
  private async handleSubmitUI(): Promise<void> {
    await Loader.show();
    const {value, validate} = this.getInputAndValidate();
    if (!validate || !validate.isValid) {
      //  this.btnForm.getBtnSubmit().setAttribute("disabled", "true");  //==>>>> DESHABILITAR BOTON
      //  this.btnForm.getBtnSubmit().classList.add("form__btnSubmit--disabled"); // AGREGAR CLASE A BOTON PARA OPACAR
      return;
    }

    const savedCode = localStorage.getItem('verificationCode');
    if (!savedCode) {
      throw new Error('Codigo no guardado');
    }

    if (!this.isCodeValid(value)) {
      await this.modal?.hideAndRemove();

      // CONFIGURACIONMODAL VERIFICACION => WARN
      // const configModalVerifyWarn: ModalBaseOptions = new ModalBaseOptions({
      //   title: "Código no válido",
      //   message: "Código incorrecto. Intenta nuevamente.",
      //   classesContainerModal: "modal-wrapper--hide position-fixed c-flex c-flex-items-center c-flex-justify-center",
      //   classesModal: "c-flex c-flex-column c-flex-items-center c-flex-justify-center",
      //   iconClass: "fa-solid fa-triangle-exclamation",
      // });

      // MOSTRAR WARN
      // const modal = await ModalFactory.createModal("warn", configModalVerifyWarn) as ModalBase;
      await this.modal?.showTemporaly(2500);
      await Loader.hide();
      return;
    }

    if (this.modal && this.modal instanceof VerifyEmailModal) {
      this.modal.setCodeAsVerified();
    }
  }

  // ESTE METODO NO CORRESPONDERIA A SER CREADO AQUI => CORREGUIR A FUTURO SU PROPIO CONTEXTO
  // METODO DE MODAL DE MENSAJE DE REGISTRO SATISFACTORIO
  public registerModalSuccess = async (): Promise<ModalBase> => {
    // let successModal: ModalBase;

    // BLOQUE TRY MARA SUCCES REGISTRO
    try {
      if (!this.modal) {
        throw new Error('No se pudo instanciar modal exito registro');
      }
      // CONFIGURACIONMODAL VERIFICACION => SUCCESS
      // const configModalVerifySuccess: ModalBaseOptions = new ModalBaseOptions({
      //   title: "!Registro exitoso!",
      //   message: "¡Tu cuenta fue registrada satisfactoriamente!",
      // });

      // // CREAR MODAL ESPECIFICO DE SASTIFACTORIO
      // successModal = await ModalFactory.success(configModalVerifySuccess) as ModalBase;

      // if (!successModal) {
      //   throw new Error("No se pudo instanciar modal exito registro");
      // }

      await this.modal?.showTemporaly(2500);

      // return successModal;

      return this.modal;
    } catch (err) {
      console.error('Error inesperado:', err);
      throw err;
    }
  };

  //METODO PARA CONTINUAR EL REGISTRO LUEGO DE SI TODO FUE BIEN EN VERIFICACION
  public async continueRegistration({combinedData}: {combinedData: Record<string, unknown>}): Promise<ModalBase> {
    try {
      // ENVIO DE LOS DATOS AL BACKEND
      const parsed = await apiRequest<iFormStateValidation>(`${domainURLPath.URL_SERVER_PROFESSIONAL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData), //SERIALIZAR
      });

      if (!parsed) {
        throw new Error('Error inesperado en proceso de registro');
      }

      //---------------MODAL DE AVISO DE EXITO-------------------//
      return await this.registerModalSuccess();
    } catch (err) {
      console.error('Error al insertar datos');
      throw err;
    }
  }

  // --------------------EVENTOS DE FORMULARIO-------------------------------------------------//

  // METODO EVENTO ENTRADA INPUT
  protected handleInput(): void {
    const input = this.form.querySelector<HTMLInputElement>('input[name="emailCode"]');
    if (!input) throw new Error('Elemento input no encontrado');

    input.addEventListener('input', () => {
      this.handleInputUI(input); //ACTUALIZA UI
    });
    input.dispatchEvent(new Event('input')); // inicializa el estado
  }

  // METODO EVENTO SUBMIT
  private async handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    await this.handleSubmitUI();
  }

  // EVENTOS DEL FORMULARIO DE VERIFICACION
  protected async attachFormEvents(): Promise<void> {
    this.handleInput();
    this.form.addEventListener('submit', this.handleSubmit.bind(this)); //UTILIZAR bind PORQUE QUIERO QUE ESPERE Y SEPA SU CONTEXTO
  }
}
