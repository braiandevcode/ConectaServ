import { EKeyDataByStep } from '../types/enums';
import type { TImageData } from '../types/typeRegisterEndDto';
import type { TRegisterTasker } from '../types/typeRegisterTasker';
import type { TSavedImage } from '../types/typeSavedImages';
import type { TIdString } from '../types/typeUUID';
import { fileToStoredImage } from './storageUtils';
// TIPADO INTERNO
type TSavedExperiences = Pick<TRegisterTasker, 'setStepData'> & TSavedImage;

// FUNCION ASINCRONA PARA GUARDAR IMAGENES DE EXPERIENCIAS
const savedExperiences = async ({ formState, listFiles, setStepData }: TSavedExperiences) => {
  // ==> SI NO TENGO FORMSTATE O EL CAMPO NO ES VALIDO, NO SIGO
  if (!formState || !formState.imageExperienceData?.isValid) return;

  // SI EL EL FILE EN RUNTIME ES DE FileList
  if (listFiles.current instanceof FileList) {
    const newImages: TImageData[] = await Promise.all(Array.from(listFiles.current).map((f) => fileToStoredImage(f)));

    // ==> ACTUALIZAR GLOBALMENTE
    setStepData((prev) => {
      const prevImages = prev[EKeyDataByStep.TWO]?.imageExperienceData || [];

      // CREAR SET DE IDS EXISTENTES
      const existingIds: Set<TIdString> = new Set(prevImages.map((img) => img.idImage));

      // FILTRAR NUEVAS IMÁGENES NO DUPLICADAS
      const filteredNew: TImageData[] = newImages.filter((img) => !existingIds.has(img.idImage));

      // RETORNAR NUEVA ESTRUCTURA GLOBAL
      return {
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageExperienceData: [...prevImages, ...filteredNew],
        },
      };
    });
  }
};

export default savedExperiences;
