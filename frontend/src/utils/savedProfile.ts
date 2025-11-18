import { fileToStoredImage } from './storageUtils';
import type { TSavedImage } from '../types/typeSavedImages';
import { EKeyDataByStep } from '../types/enums';
import type { TRegisterTasker } from '../types/typeRegisterTasker';

// TIPADO ENCADENANDO PROPIEDADES DE OTROS TIPOS EXISTENTES
type TSavedProfile = Pick<TRegisterTasker, 'setStepData'> & TSavedImage;

// FUNCION ASINCRONA PARA GUARDAR DATOS DE PERFIL
const savedProfile = async ({ formState, listFiles, setStepData }: TSavedProfile) => {
  // ==> SOLO CORRER SI EXISTE FILE VALIDO Y EL CAMPO ES VALIDO
  if (formState && formState.imageProfileData?.isValid) {
    if (!listFiles.current) return;

    // ==> VERIFICAR QUE SEA INSTANCIA DE File (EVITA QUE SE EJECUTE CUANDO RECARGO Y YA TENGO TStoredImage)
    if (listFiles.current instanceof File) {
      const newProfile = await fileToStoredImage(listFiles.current); // ==> INVOCO FUNCION HELPER PARA PROCESAR DATOS DE IMAGEN ACTUAL

      // ==> GUARDAR IMAGEN COMPLETA EN ESTADO GLOBAL DE PASO 2
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageProfileData: newProfile,
        },
      }));
    }
  }
};

export default savedProfile;

