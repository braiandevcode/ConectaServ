import {ButtonFactory} from '../../../patterns/factory/ButtonFactory.js';
import ModalBase from '../entities/ModalBase.js';
import ModalBaseUI from '../ui/ModalBaseUI.js';
import ModalBaseDto from '../dto/ModalBaseDto.js';
import ButtonBaseDto from '../../../modules/buttons/dto/ButtonsBaseDto.js';
import {pathPages} from '../../../config/constant.js';
import ButtonBaseUI from '../../../modules/buttons/ui/ButtonBaseUI.js';

export default class ModalRoleSelector extends ModalBase {
  constructor(options: ModalBaseDto, ui: ModalBaseUI) {
    super(options, ui);
  }

  // METODO PARA CREAR TARJETA BOTON PARA CLIENTE
  private createClientButtonFragment(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const inner: HTMLDivElement = document.createElement('div');
    inner.classList.add('c-flex', 'c-flex-items-center', 'gap-1', 'modal-role__card-inner');

    const iconWrapper: HTMLDivElement = document.createElement('div');
    iconWrapper.classList.add('modal-role__icon-container');

    const icon: HTMLElement = document.createElement('div');
    icon.classList.add('fas', 'fa-user', 'modal-role__icon');

    const textWrapper: HTMLDivElement = document.createElement('div');
    textWrapper.classList.add('modal-role__text');

    const title = document.createElement('h4');
    title.classList.add('modal-role__card-title');
    title.textContent = 'Cliente';

    const desc: HTMLParagraphElement = document.createElement('p');
    desc.classList.add('modal-role__card-description');
    desc.textContent = 'Busca y contrata profesionales para tus necesidades';

    iconWrapper.appendChild(icon);
    textWrapper.append(title, desc);
    inner.append(iconWrapper, textWrapper);
    fragment.appendChild(inner);

    return fragment;
  }

  // METODO PARA CREAR TARJETA BOTON PARA PROFESIONAL
  private createProfessionalButtonFragment(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();

    const inner: HTMLDivElement = document.createElement('div');
    inner.classList.add('c-flex', 'c-flex-items-center', 'gap-1', 'modal-role__card-inner');

    const iconWrapper: HTMLDivElement = document.createElement('div');
    iconWrapper.classList.add('modal-role__icon-container');

    const icon: HTMLElement = document.createElement('div');
    icon.classList.add('fas', 'fa-briefcase', 'modal-role__icon');

    const textWrapper: HTMLDivElement = document.createElement('div');
    textWrapper.classList.add('modal-role__text');

    const title = document.createElement('h4');
    title.classList.add('modal-role__card-title');
    title.textContent = 'Profesional';

    const desc: HTMLParagraphElement = document.createElement('p');
    desc.classList.add('modal-role__card-description');
    desc.textContent = 'Ofrece tus servicios y encuentra nuevos clientes';

    iconWrapper.appendChild(icon);
    textWrapper.append(title, desc);
    inner.append(iconWrapper, textWrapper);
    fragment.appendChild(inner);

    return fragment;
  }

  public composeBaseContent(): this {
    const elements: HTMLElement[] = [];

    //HEADER DEL MODAL
    const header: HTMLDivElement = document.createElement('div');
    header.classList.add('modal-role__header', 'position-relative', 'c-flex', 'c-flex-items-center', 'gap-1', 'c-flex-justify-center', 'w-full');

    //TITULO
    const titleEl: HTMLHeadElement = document.createElement('h3');
    titleEl.classList.add('modal-role__title');
    this.options.setTextTitleElement(titleEl, this.options.title);

    //BOTON CERRAR
    const closeBtnDto: ButtonBaseDto = new ButtonBaseDto({
      disabled: false,
      type: 'button',
      'aria-label': 'Cerrar modal',
      iconBtnClasses: 'fas fa-times modal-role__close-icon',
      classesBtn: 'cursor-pointer position-absolute modal-role__close-btn',
      eventName: 'click',
      handler: () => this.hideAndRemove(),
      isLoading: false,
    });

    const instanceCloseBtn: ButtonBaseUI = ButtonFactory.createButton('custom', closeBtnDto);
    instanceCloseBtn.on(); //ESCUCHA EVENTO

    header.appendChild(titleEl);
    header.appendChild(instanceCloseBtn.getBtnElement());
    elements.push(header);

    // DESCRIPCION
    const desc: HTMLParagraphElement = document.createElement('p');
    desc.classList.add('modal-role__description');
    desc.textContent = 'Selecciona el tipo de cuenta que deseas crear:';
    elements.push(desc);

    // CARD WRAPPER
    const cardsWrapper: HTMLDivElement = document.createElement('div');
    cardsWrapper.classList.add('c-flex', 'c-flex-column', 'gap-1', 'modal-role__cards');

    // BOTÓN CLIENTE
    const clientBtnDto: ButtonBaseDto = new ButtonBaseDto({
      disabled: false,
      type: 'button',
      'aria-label': 'Elegir cliente',
      attrs: {'data-role': 'client'},
      classesBtn: 'cursor-pointer modal-role__card modal-role__card--cliente',
      eventName: 'click',
      handler: () => {
        console.log('Cliente seleccionado');
        this.hideAndRemove();
      },
      isLoading: false,
    });

    const clientBtn: ButtonBaseUI = ButtonFactory.createButton('custom', clientBtnDto);
    clientBtn.setCustomContentFragment(this.createClientButtonFragment());
    clientBtn.on(); //ESCUCHAR EVENTO

    // BOTÓN PROFESIONAL
    const proBtnDto = new ButtonBaseDto({
      disabled: false,
      type: 'button',
      'aria-label': 'Elegir profesional',
      attrs: {'data-role': 'professional'},
      classesBtn: 'cursor-pointer modal-role__card modal-role__card--profesional',
      eventName: 'click',
      handler: () => {
        location.href = pathPages.PATH_FORM_PROFESSIONAL; // ==> IR A PAGINA PROFESIONAL
        this.hideAndRemove();
      },
      isLoading: false,
    });

    proBtnDto.setCustomContentFragment(this.createProfessionalButtonFragment());
    const proBtn = ButtonFactory.createButton('custom', proBtnDto);
    proBtn.on(); //ESCUCHAR EVENTO

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
