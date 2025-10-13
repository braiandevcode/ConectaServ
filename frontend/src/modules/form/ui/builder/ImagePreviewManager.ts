// IMPORTACIONES
import {TStoredImage} from '../../../../types/types';
import clearElementChild from '../../../../dom/clearElementChild.js';
import {EKeyDataByStep, ENamesOfKeyLocalStorage} from '../../../../types/enums.js';
import ButtonBaseDto from '../../../buttons/dto/ButtonsBaseDto.js';
import {ButtonFactory} from '../../../../patterns/factory/ButtonFactory.js';
import {fileToStoredImage} from '../../../../utils/domUtils.js';
import {getImageDataUrlFromIndexedDB, readExistingData} from '../../../../utils/storageUtils.js';
import ButtonBaseUI from '../../../../modules/buttons/ui/ButtonBaseUI.js';

// MANAGER PARA MANEJO DE PREVIEWS DE
// ADMINISTRADOR DE VISTAS PREVIAS DE IMAGENES
/*

  SU RESPONSABILIDAD CENTRALIZAR TODO LO RELACIONADO A:

    - PERSISTENCIA DE IMAGENES (LocalStorage / IndexedDB).

    - CREACION DE VISTAS PREVIAS (perfil o experiencias).

    - INTERACCION CON BOTONES BORRAR, ETC
*/

export default class ImagePreviewManager {

  // METODO PARA CREAR VISTA PREVIA DE DE VARIAS IMAGENES (experiencias)
  public async createExperienceImagesPreviews(container: HTMLElement, inputFiles: HTMLInputElement): Promise<void | null> {
    if (inputFiles?.files && (inputFiles.files.length as number) > 0) {
      const stepData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);
      const dataFile: TStoredImage[] = await Promise.all(Array.from(inputFiles.files).map((f) => fileToStoredImage(f)));

      stepData[EKeyDataByStep.TWO].imageExperiences = dataFile;
      localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify(stepData));
      await this.createImagesExperience(container, dataFile);
    }
  }

    // METODO PARA CREAR VISTA PREVIA DE UNA SOLA IMAGEN(perfil)
  public async createProfileImagePreview(container: HTMLElement, inputFile: HTMLInputElement): Promise<void> {
    if (inputFile?.files && (inputFile?.files.length as number) > 0) {
      const file = inputFile.files[0];
      const dataFile: TStoredImage = await fileToStoredImage(file);
      const stepData = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);
      stepData[EKeyDataByStep.TWO].imageProfile = dataFile;
      localStorage.setItem(ENamesOfKeyLocalStorage.STEP_DATA, JSON.stringify(stepData));
      await this.createImageProfile(container, dataFile);
    }
  }
  public async createImageProfile(container: HTMLElement, storedImage: TStoredImage | null): Promise<void | null> {
    clearElementChild({elements: [container]});
    if (!storedImage) return null;

    const result: Record<string, string> | null = await getImageDataUrlFromIndexedDB(storedImage.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

    if (!result) return null;

    const dataUrl: string = result.data;

    // CONFIGURACION BOTON
    const btnConfig: ButtonBaseDto = new ButtonBaseDto({
      disabled: false,
      type: 'button',
      'aria-label': 'Eliminar imagen',
      classesBtn: 'btn btn-trash position-absolute form-professional-groupProfile__btn-trash',
      iconBtnClasses: 'fa-solid fa-trash',
      attrs: {
        'data-image': `${storedImage.idImage}`,
      },
      eventName: 'click',
      handler: () => console.log('Imagen Eliminada'),
      isLoading: false,
    });
    // INSTANCIA POR FABRICA
    const btnTrash: ButtonBaseUI = ButtonFactory.createButton('custom', btnConfig);

    const btn: HTMLButtonElement = btnTrash.getBtnElement(); //ELEMENTO BOTON

    const img = document.createElement('img');
    img.setAttribute('src', dataUrl);
    img.setAttribute('alt', 'Vista previa del perfil');
    img.setAttribute('data-image', `${storedImage.idImage}`);

    img.classList.add('profile-image-preview');
    container.append(img, btn);
  }

  public async createImagesExperience(container: HTMLElement, storedImages: TStoredImage[] | null): Promise<void | null | Array<[]>> {
    clearElementChild({elements: [container]});
    if (!storedImages || storedImages.length === 0) return [];

    const $FRAGMENT = document.createDocumentFragment(); //FRAGMENT

    // ITERACION DE IMAGENES GUARDADAS EN INDEXED DB
    for (const storedImage of storedImages) {
      if (!storedImage) return null;
      const result: Record<string, string> | null = await getImageDataUrlFromIndexedDB(storedImage.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

      if (!result) return null;

      const dataUrl: string = result.data;

      const containerImage: HTMLDivElement = document.createElement('div');
      containerImage.classList.add('form-professional-groupProfile__multipleImages', 'c-flex', 'c-flex-wrap', 'gap-2', 'position-relative');
      containerImage.setAttribute('data-image', `${storedImage.idImage}`);

      // CONFIGURACION BOTON
      const btnConfig: ButtonBaseDto = new ButtonBaseDto({
        disabled: false,
        type: 'button',
        'aria-label': 'Eliminar imagen',
        classesBtn: 'btn btn-trash position-absolute form-professional-groupProfile__btn-trash',
        iconBtnClasses: 'fa-solid fa-trash',
        attrs: {
          'data-image': `${storedImage.idImage}`,
        },
        eventName: 'click',
        handler: () => console.log('Eliminar imagen'),
        isLoading: false,
      });
      const btnTrash: ButtonBaseUI = ButtonFactory.createButton('custom', btnConfig); //FABRICAR BOTON

      const btn: HTMLButtonElement = btnTrash.getBtnElement(); ///ELEMENTO

      const img = document.createElement('img');
      img.setAttribute('src', `${dataUrl}`);
      img.setAttribute('alt', 'Vista previa del experiencia');

      img.classList.add('experience-image-preview');

      containerImage.append(img, btn);
      $FRAGMENT.append(containerImage);
    }
    container.append($FRAGMENT);
  }
}
