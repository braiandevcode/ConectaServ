import { FormFactory } from "../../../patterns/factory/FormFactory.js";
import { FormModalController } from "../../controllers/FormModalController.js";
import FormBase from "../../../modules/entities/FormBase.js";
import { ModalBaseUI } from "../../modal/ui/ModalBaseUI.js";
import ModalBaseOptions from "../../../modules/dto/ModalBaseOptions.js";
import FormBaseOptions from "../../../modules/dto/FormBaseOptions.js";

// MODAL QUE EXTIENDE DE FormModalController Y QUE INSTANCIA AL VerifyCodeForm PARA INSERTAR EN MODAL
export default class VerifyEmailModal extends FormModalController {
  private codeVerificationPromise: Promise<void> | null = null;
  private resolveCodeVerification: (() => void) | null = null;

  constructor(modalOptions: ModalBaseOptions, uiModal: ModalBaseUI) {
    super(modalOptions, uiModal); //HEREDAMOS TODAS LAS PROPIEDADES ACCESIBLES DEL "CustomModal"
    this.setupVerificationPromise();
  }

  //METODO PUBLICO
  public async composeBaseContent(): Promise<this> {
    await this._formBase.init();
    return this;
  }

  private setupVerificationPromise(): void {
    this.codeVerificationPromise = new Promise<void>((resolve) => {
      this.resolveCodeVerification = resolve;
    });
  }

  public async insertFormIntoModal(): Promise<void> {
    await this._formBase.assembleForm(); // ahora sí accedes al método concreto
    this.appendToModal(this._form);
  }

  // ACA SE IMPLEMENTA CREACION DEL FORMULARIO
  public async createFormBase(config: FormBaseOptions): Promise<FormBase> {
    return await FormFactory.createForm("verifyCode", config);
  }

  // ESPERAR QUE EL CODIGO SE VERIFIQUE CORRECTAMENTE
  public async waitForCodeVerification(): Promise<void> {
    if (!this.codeVerificationPromise) {
      throw new Error("Promise no inicializada");
    }
    await this.codeVerificationPromise;
  }

  // AGREGA EL CODIGO Y ESPERA A QUE SE RESUELVA POR METODO "resolveCodeVerification"
  public setCodeAsVerified(): void {
    if (!this.resolveCodeVerification) {
      throw new Error("resolveCodeVerification no fue inicializada");
    }
    this.resolveCodeVerification();
  }

  public async init(): Promise<this> {
    await this.composeBaseContent(); //SOLO LLAMA A composeBaseContent QUE MANEJA EL init() DEL "formBase"
    return this;
  }
}
