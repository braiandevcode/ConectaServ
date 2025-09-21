// IMPORTACIONES

import ButtonBaseDto from '../../../modules/buttons/dto/ButtonsBaseDto.js';
import {iModalOptions} from '../../../interfaces/interfaces';
import {actionClassString} from '../../../ui/auxiliars.js';

// CLASE DE OPCIONES DE MODALES DTO
export default class ModalBaseDto {
  private btnsBaseDto: ButtonBaseDto[];
  constructor(private readonly config: iModalOptions) {
    this.btnsBaseDto = [];
  }

  // METODO PRIVADO PARA AGREGAR CLASES
  /*
    keyof iModalOptions ASEGURA QUE configKey SEA SOLO UNA PROPIEDAD EXISTENTE DE config.
    ESTA PRACTICA AYUDA A NO PONER "any" COMO TIPO
  */
  private addClassIfExists(element: HTMLElement, configKey: keyof iModalOptions, newClass: string | undefined): void {
    if (!newClass) {
      console.warn('La clase debe especificarse para su uso');
      return;
    }
    if (configKey && this.config[configKey]) {
      actionClassString(newClass, 'add', element);
    }
  }

  // METODO PRIVADO PARA AÑADIR TEXTOS A ELEMENTOS EN MODALES
  private addTextIfExists(element: HTMLElement, configKey: keyof Pick<iModalOptions, 'message' | 'title'>, text: string | undefined): void {
    if (!text) return;
    if (configKey && this.config[configKey]) {
      element.textContent = text;
    }
  }

  // METODOS GETTER Y SETTERS COMO ACCIONES
  public getMessage(): string {
    if (!this.config.message) return '';
    return this.config.message;
  }

  // METODO PARA AÑADIR CLASES AL MODAL
  public setClassModal(newClassModal: string | undefined, modalElement: HTMLElement): void {
    this.addClassIfExists(modalElement, 'classesModal', newClassModal); // PRIMER ARGUMENTO => CLSASES POR STRING SEPARADAS POR ESPACIOS ("c-flex c-flex-justify-center etc.")
  }

  // METODO PARA AÑADIR CLASES AL CONTENEDOR DEL  MODAL
  public setClassContainerModal(newClassContainerModal: string | undefined, containerElement: HTMLElement): void {
    this.addClassIfExists(containerElement, 'classesContainerModal', newClassContainerModal);
  }

  // METODO PARA AÑADIR CLASES AL ELEMENTO ICONO
  public setClassIcon(newClassIcon: string | undefined, iconElement: HTMLElement): void {
    this.addClassIfExists(iconElement, 'iconClass', newClassIcon);
  }

  // AGREGAR TEXTO AL TITULO DEL MODAL
  public setTextTitleElement(element: HTMLElement, text: string): void {
    this.addTextIfExists(element, 'title', text);
  }

  // METODO PARA AGREGAR EL TEXTO AL ELEMENTO DE PARRAFO(MENSAJE INFORMATIVO)
  public setTextMessageElement(element: HTMLElement, text: string): void {
    this.addTextIfExists(element, 'title', text);
  }

  public addButtonBaseDto(instanceBtnDto: ButtonBaseDto): void {
    this.btnsBaseDto.push(instanceBtnDto);
  }
  // GETTERS Y SETTERS COMO PORPIEDADES DE ACCESO
  //   VER TITULO
  public get title(): string {
    return this.config.title;
  }

  // VER LISTA DE BOTONES
  public get _btnsBaseDto(): Array<ButtonBaseDto> {
    return this.btnsBaseDto ?? [];
  }

  //   VER CLASES DE ICONO
  public get iconClass(): string | undefined {
    return this.config.iconClass;
  }

  // VER CLASES DE TARJETA MODAL
  public get modalClass(): string | undefined {
    return this.config.classesModal;
  }

  // VER CLASES DEL CONTENEDOR PADRE DEL ICONO
  public get parentContainerIconClass(): string | undefined {
    return this.config.parentContainerIconClass;
  }

  //
  public get parentModalClass(): string | undefined {
    return this.config.classesContainerModal;
  }

  public get containerModal(): HTMLElement | null {
    return this.config.container ?? null;
  }
}
