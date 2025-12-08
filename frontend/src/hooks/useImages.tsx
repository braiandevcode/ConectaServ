import { EKeyDataByStep } from '../types/enums';
import type { TImageData, TImageDataStored } from '../types/typeRegisterEndDto';
import type { TSavedImage } from '../types/typeSavedImages';
import type { TTasker } from '../types/typeTasker';
import type { TIdString } from '../types/typeUUID';
import { fileToStoredImage } from '../utils/storageUtils';

const useImages = () => {
  // TIPADO INTERNO
  type TSavedExperiences = Pick<TTasker, 'setStepData'> & TSavedImage;

  // TIPADO ENCADENANDO PROPIEDADES DE OTROS TIPOS EXISTENTES
  type TSavedProfile = Pick<TTasker, 'setStepData'> & TSavedImage;

  // FUNCION ASINCRONA PARA GUARDAR IMAGENES DE EXPERIENCIAS
  const savedExperiences = async ({ formState, listFiles, setStepData }: TSavedExperiences) => {
    console.log('Las Imagenes son validad?: ', formState.imageExperienceData?.isValid);

    // ==> SI NO TENGO FORMSTATE O EL CAMPO NO ES VALIDO, NO SIGO
    if (!formState || !formState.imageExperienceData?.isValid) return;

    // SI EL EL FILE EN RUNTIME ES DE FileList
    if (listFiles.current instanceof FileList) {
      const newImages: TImageData[] = await Promise.all(Array.from(listFiles.current).map(async (f) => await fileToStoredImage(f)));

      // ==> ACTUALIZAR GLOBALMENTE
      setStepData((prev) => {
        const prevImages = prev[EKeyDataByStep.TWO]?.imageExperienceData || [];

        // CREAR SET DE IDS EXISTENTES
        const existingIds: Set<TIdString> = new Set(prevImages.map((img) => img.idImage));

        // FILTRAR NUEVAS IMÁGENES NO DUPLICADAS
        const filteredNew: TImageData[] = newImages.filter((img) => !existingIds.has(img.idImage));

        // IGNORA dataUrl PARA EL ALMACENAMIENTO LOCAL
        const storedImages: TImageDataStored[] = filteredNew.map((img) => ({
          idImage: img.idImage,
          name: img.name,
          size: img.size,
          type: img.type,
        }));

        // RETORNAR NUEVA ESTRUCTURA GLOBAL
        return {
          ...prev,
          [EKeyDataByStep.TWO]: {
            ...prev[EKeyDataByStep.TWO],
            imageExperienceData: [...prevImages, ...storedImages],
          },
        };
      });
    }
  };

  // FUNCION ASINCRONA PARA GUARDAR DATOS DE PERFIL
  const savedProfile = async ({ formState, listFiles, setStepData }: TSavedProfile) => {
    // ==> SOLO CORRER SI EXISTE FILE VALIDO Y EL CAMPO ES VALIDO
    if (formState && formState.imageProfileData?.isValid) {
      if (!listFiles.current) return;

      // ==> VERIFICAR QUE SEA INSTANCIA DE File (EVITA QUE SE EJECUTE CUANDO RECARGO Y YA TENGO TStoredImage)
      if (listFiles.current instanceof File) {
        const newProfile: TImageData = await fileToStoredImage(listFiles.current); // ==> INVOCO FUNCION HELPER PARA PROCESAR DATOS DE IMAGEN ACTUAL

        // IGNORAR EL dataUrl
        const imageProfileData: TImageDataStored = {
          idImage: newProfile.idImage,
          name: newProfile.name,
          size: newProfile.size,
          type: newProfile.type,
        };

        // ==> GUARDAR IMAGEN COMPLETA EN ESTADO GLOBAL DE PASO 2
        setStepData((prev) => ({
          ...prev,
          [EKeyDataByStep.TWO]: {
            ...prev[EKeyDataByStep.TWO],
            imageProfileData: imageProfileData,
          },
        }));
      }
    }
  };

  return { savedExperiences, savedProfile  };
};

export default useImages;
