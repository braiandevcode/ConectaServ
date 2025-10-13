import { EKeyDataByStep } from '../types/enums';
import type { TIdString, TRegisterPro, TStoredImage } from '../types/types';
import type { TSavedImage } from '../types/typeSavedImages';
import { fileToStoredImage } from './storageUtils';
// TIPADO INTERNO

type TSavedExperiences = Pick<TRegisterPro, 'setStepData'> & TSavedImage;

// FUNCION ASINCRONA PARA GUARDAR IMAGENES DE EXPERIENCIAS
const savedExperiences = async ({ formState, listFiles, setStepData }: TSavedExperiences) => {
  // ==> SI NO TENGO FORMSTATE O EL CAMPO NO ES VALIDO, NO SIGO
  if (!formState || !formState.imageExperiences?.isValid) return;

  // SI EL EL FILE EN RUNTIME ES DE FileList
  if (listFiles.current instanceof FileList) {
    const newImages: TStoredImage[] = await Promise.all(Array.from(listFiles.current).map((f) => fileToStoredImage(f)));

    // ==> ACTUALIZAR GLOBALMENTE
    setStepData((prev) => {
      const prevImages = prev[EKeyDataByStep.TWO]?.imageExperiences || [];

      // CREAR SET DE IDS EXISTENTES
      const existingIds: Set<TIdString> = new Set(prevImages.map((img) => img.idImage));

      // FILTRAR NUEVAS IMÁGENES NO DUPLICADAS
      const filteredNew: TStoredImage[] = newImages.filter((img) => !existingIds.has(img.idImage));

      // RETORNAR NUEVA ESTRUCTURA GLOBAL
      return {
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageExperiences: [...prevImages, ...filteredNew],
        },
      };
    });
  }
};

export default savedExperiences;
