import { ButtonFactory } from "../../../patterns/factory/ButtonFactory.js";
import ModalBase from "../entities/ModalBase.js";
import ModalBaseUI  from "../ui/ModalBaseUI.js";
import ModalBaseDto from "../dto/ModalBaseDto.js";
import ButtonBaseDto from "../../../modules/buttons/dto/ButtonsBaseDto.js";
import { pathPages } from "../../../config/constant.js";

export default class ModalRoleSelector extends ModalBase {
  constructor(options: ModalBaseDto, ui: ModalBaseUI) {
    super(options, ui);
  }

  // METODO PARA CREAR TARJETA BOTON PARA CLIENTE
  private createClientButtonFragment(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    const inner = document.createElement("div");
    inner.classList.add(
      "c-flex",
      "c-flex-items-center",
      "gap-1",
      "modal-role__card-inner"
    );

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("modal-role__icon-container");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-user", "modal-role__icon");

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("modal-role__text");

    const title = document.createElement("h4");
    title.classList.add("modal-role__card-title");
    title.textContent = "Cliente";

    const desc = document.createElement("p");
    desc.classList.add("modal-role__card-description");
    desc.textContent = "Busca y contrata profesionales para tus necesidades";

    iconWrapper.appendChild(icon);
    textWrapper.append(title, desc);
    inner.append(iconWrapper, textWrapper);
    fragment.appendChild(inner);

    return fragment;
  }

  // METODO PARA CREAR TARJETA BOTON PARA PROFESIONAL
  private createProfessionalButtonFragment(): DocumentFragment {
    const fragment = document.createDocumentFragment();

    const inner = document.createElement("div");
    inner.classList.add(
      "c-flex",
      "c-flex-items-center",
      "gap-1",
      "modal-role__card-inner"
    );

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("modal-role__icon-container");

    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-briefcase", "modal-role__icon");

    const textWrapper = document.createElement("div");
    textWrapper.classList.add("modal-role__text");

    const title = document.createElement("h4");
    title.classList.add("modal-role__card-title");
    title.textContent = "Profesional";

    const desc = document.createElement("p");
    desc.classList.add("modal-role__card-description");
    desc.textContent = "Ofrece tus servicios y encuentra nuevos clientes";

    iconWrapper.appendChild(icon);
    textWrapper.append(title, desc);
    inner.append(iconWrapper, textWrapper);
    fragment.appendChild(inner);

    return fragment;
  }

  public composeBaseContent(): this {
    const elements: HTMLElement[] = [];

    //HEADER DEL MODAL
    const header = document.createElement("div");
    header.classList.add(
      "modal-role__header",
      "position-relative",
      "c-flex",
      "c-flex-items-center",
      "gap-1",
      "w-full"
    );

    //TITULO
    const titleEl = document.createElement("h3");
    titleEl.classList.add("modal-role__title");
    this.options.setTextTitleElement(titleEl, this.options.title);

    //BOTON CERRAR
    const closeBtnDto = new ButtonBaseDto({
      disabled: false,
      type: "button",
      "aria-label": "Cerrar modal",
      iconBtnClasses: "fas fa-times modal-role__close-icon",
      classesBtn: "cursor-pointer position-absolute modal-role__close-btn",
    });

    const closeBtn = ButtonFactory.createButton("custom", closeBtnDto);
    closeBtn.on("click", () => this.hideAndRemove());

    header.appendChild(titleEl);
    header.appendChild(closeBtn.getBtnElement());
    elements.push(header);

    // Descripción
    const desc = document.createElement("p");
    desc.classList.add("modal-role__description");
    desc.textContent = "Selecciona el tipo de cuenta que deseas crear:";
    elements.push(desc);

    // CARD WRAPPER
    const cardsWrapper = document.createElement("div");
    cardsWrapper.classList.add(
      "c-flex",
      "c-flex-column",
      "gap-1",
      "modal-role__cards"
    );

    // BOTÓN CLIENTE
    const clientBtnDto = new ButtonBaseDto({
      disabled: false,
      type: "button",
      "aria-label": "Elegir cliente",
      attrs: { "data-role": "client" },
      classesBtn: "cursor-pointer modal-role__card modal-role__card--cliente",
    });

    const clientBtn = ButtonFactory.createButton("custom", clientBtnDto);
    clientBtn.appendContent(this.createClientButtonFragment());
    clientBtn.on("click", () => {
      console.log("Cliente seleccionado");
      this.hideAndRemove();
    });

    // BOTÓN PROFESIONAL
    const proBtnDto = new ButtonBaseDto({
      disabled: false,
      type: "button",
      "aria-label": "Elegir profesional",
      attrs: { "data-role": "professional" },
      classesBtn:
        "cursor-pointer modal-role__card modal-role__card--profesional",
    });

    const proBtn = ButtonFactory.createButton("custom", proBtnDto);
    proBtn.appendContent(this.createProfessionalButtonFragment());
    proBtn.on("click", () => {
      location.href = pathPages.PATH_FORM_PROFESSIONAL; // ==> IR A PAGINA PROFESIONAL
      this.hideAndRemove();
    });

    cardsWrapper.append(clientBtn.getBtnElement(), proBtn.getBtnElement());
    elements.push(cardsWrapper);

    // AGREGAR AL MODAL
    for (const el of elements) {
      this.appendToModal(el);
    }

    return this;
  }

  public init(): this {
    this.composeBaseContent();
    return this;
  }
}
