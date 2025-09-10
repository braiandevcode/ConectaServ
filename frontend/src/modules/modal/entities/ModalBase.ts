//IMPORTACIONES

import { WaitOptions } from "../../../types/types";
import ModalBaseDto from "../dto/ModalBaseDto.js";
import  ModalBaseUI  from "../ui/ModalBaseUI.js";

// PLANTILLA DE MODALES BASE
export default abstract class ModalBase {
  protected appendElements: HTMLElement[];

  constructor(protected readonly options: ModalBaseDto, protected readonly ui: ModalBaseUI) {
    this.appendElements = [];
    this.ui.appendContent(this.appendElements); //RENDER INICIAL
  }
  

  // CREAR BOTONES
  public createButtons(): HTMLElement | null {
    return this.ui.createButtons(); // ==> RESPONSABLE UI
  }

  public getModalElement():HTMLDivElement{
    return this.ui._modal;
  }

  // AGREGAR ELEMENTOS DE MODAL
  public appendToModal(element: HTMLElement): void {
    this.appendElements.push(element); //AGREGAR AL ARRAY
    this.ui.appendElement(element);// AGREGAR ELEMENTO AL CONTENEDOR 
  }

  public add(): void {
    this.ui.addToDOM();
  }

  public remove(): void {
    this.ui.removeFromDOM();
  }

  public show(opts: { classRemoveWrapper?: string; classRemoveModal?: string } = {}): void {
    this.ui.show(opts.classRemoveWrapper, opts.classRemoveModal);
  }

  public hide(opts: { classAddWrapper?: string; classAddModal?: string } = {}): void {
    this.ui.hide(opts.classAddWrapper, opts.classAddModal);
  }

  public async delay(ms: number): Promise<void> {
    return this.ui.delay(ms);
  }

  public async waitWithPromise<T = void>({ ms, cb }: WaitOptions<T>): Promise<T | void> {
    return new Promise<T | void>((resolve) => {
      setTimeout(async () => {
        if (cb) {
          const result = await cb();
          resolve(result);
        } else {
          resolve();
        }
      }, ms);
    });
  }

  public async hideAndRemove(): Promise<void> {
    this.hide();
    await this.delay(500);
    this.remove();
  }

  public async addAndShow(): Promise<void> {    
    this.add();
    await this.delay(500);
    this.show();
  }

  public async showTemporaly(ms: number): Promise<void> {
    await this.addAndShow();
    await this.delay(ms);
    await this.hideAndRemove();
  }

  protected abstract composeBaseContent(): void;
}