import { addClassWithPromise } from "../../ui/auxiliars.js";
import ModalBase from "../../modules/entities/ModalBase.js";
import { ModalBaseUI } from "../../modules/modal/ui/ModalBaseUI.js";
import ModalBaseOptions from "../../modules/dto/ModalBaseOptions.js";

// SINGLETON => SE APLICA ESTE PATRON PORQUE SOLO DEBE EXISTIR UN UNICO LOADER COMPARTIDO EN TODA LA APP.
// NO ES NECESARIO CREAR NUEVAS INSTANCIAS, YA QUE SIEMPRE SE REUTILIZA EL MISMO MODAL CARGADOR.
// ESTA CLASE IMPLEMENTA ESE COMPORTAMIENTO CENTRALIZADO.
export class Loader extends ModalBase {
  private static instance: Loader | null = null;

  private constructor(options: ModalBaseOptions, modalBaseUI:ModalBaseUI) {
    super(options, modalBaseUI);
  }


  // METODO QUE AGREGA TRANSPARENCIA AL MODAL PARA EL LOADER
  private async makeTransparent({ className }: { className: string }): Promise<void> {
    const modal: HTMLDivElement | null = Loader.instance && Loader.instance.ui._modal; //SI EXISTE INSTANCIA GUARDAR SOLO EL MODAL EN VARIABLE MODAL
  
    if (Loader.instance && modal && modal.parentNode) {
      await addClassWithPromise(modal, className); //ESPERAR A QUE SE AGREGE
    }
  }

  // CREAMOS EL CONTENIDO DE LOADE QUE ESTARA DENTRO DEL MODAL
  public async composeBaseContent(): Promise<HTMLElement> {
    const container = document.createElement("div");
    container.classList.add("modal-spinner", "c-flex", "c-flex-items-center", "c-flex-justify-center");

    const spinner = document.createElement("div");
    spinner.classList.add("modal-spinner__spinner");

    container.appendChild(spinner);

    return container; //RETORNAR EL CONTENEDOR DE SPINER
  }

  //VER INSTANCIA UNICA
  public static async getInstance(options: ModalBaseOptions, modalBaseUI:ModalBaseUI): Promise<Loader> {
    if (!Loader.instance) {
      try {
        Loader.instance = new Loader(options, modalBaseUI);
        Loader.instance.add();
        const spinner = await Loader.instance.composeBaseContent();

        if (!spinner) {
          throw new Error("No se pudo crear spinner");
        }

        Loader.instance.appendToModal(spinner);
        await Loader.instance.delay(300);
        Loader.instance.show();
        await Loader.instance.makeTransparent({ className: "modal--ghost" });
      } catch (error) {
        console.error("Error al crear Loader:", error);
        Loader.instance = null;
        throw error;
      }
    }
    return Loader.instance;
  }

  // MOSTRAR EL LOADER
  public static async show(): Promise<void> {
    // BLOQUE TRY PARA LOADER
    try {
      // INSTANCIA DEL OBJETO DE CONFIGURACION
      const customModalOptions: ModalBaseOptions = new ModalBaseOptions({
        title: "Cargando...",
        classesContainerModal: "modal-wrapper--hide position-fixed c-flex c-flex-items-center c-flex-justify-center",
        classesModal: "c-flex c-flex-column c-flex-items-center c-flex-justify-center",
      });

      const loaderUi:ModalBaseUI = new ModalBaseUI(customModalOptions);
      // PASAR LA CONFIGURACION A LA INSTANCIA DEL LOADER
      const loader = await Loader.getInstance(customModalOptions, loaderUi);
      loader.show();
    } catch (err) {
      console.error("Error inesperado:", err);
      throw err;
    }
  }

  // OCULTAR LOADER
  public static async hide(): Promise<void> {
    if (Loader.instance) {
      await Loader.instance.hideAndRemove();
      Loader.instance = null;
    }
  }
}
