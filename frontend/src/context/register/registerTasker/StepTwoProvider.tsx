import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { StepTwoContext } from './StepTwoContext';
import useRegisterTasker from '../../../hooks/useRegisterTasker';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TTypeContextStepTwo } from '../../../types/typeContextStepTwo';
import ImageProfileValidator from '../../../modules/validators/ImageProfileValidator';
import ImageExperiencesValidator from '../../../modules/validators/ImageExperiencesValidator';
import useImages from '../../../hooks/useImages';
import useTasker from '../../../hooks/useTasker';
import { readExistingData } from '../../../utils/storageUtils';
import apiRequest from '../../../utils/apiRequestUtils';
import type { TImageDataStored } from '../../../types/typeRegisterEndDto';
import { BASE_BACK_URL } from '../../../config/configBaseBackUrl';
import { endpointCloud } from '../../../config/configEnpointCloud';

const StepTwoProvider = ({ children }: { children: React.ReactNode }) => {
  const { DELETE_AVATAR_PREV, DELETE_AVATAR_EXPERIENCE_PREV  } = endpointCloud;
  const imageProfileDataValidator: ImageProfileValidator = new ImageProfileValidator();
  const imageExperienceDataValidator: ImageExperiencesValidator = new ImageExperiencesValidator();

  // CUSTOM HOOK DE TASKER GENERAL
  const { setStepData, stepData, formState, setFormState, setIsStepValid } = useTasker();

  // CUSTOM HOOK REGISTER PROFESIONAL
  const { validateCurrentStep, step } = useRegisterTasker();
  const { savedExperiences, savedProfile } = useImages();

  // -----------------------------------------------useRef------------------------------------------------------//
  const countImagesExp = useRef<number>(0);
  const listFiles = useRef<FileList | File | null>(null);

  // ESTADOS INTERNOS SOLO DE PASO 2
  const [src, setSrc] = useState<string | null>(null);
  const [srcVector, setSrcVector] = useState<string[]>([]);
  const [loadImg, setLoadImg] = useState<boolean>(false);
  const [loadImgExp, setLoadImgExp] = useState<boolean>(false);

  // EFECTO PARA CARGAR IMAGEN DE EXPERIENCIAS
  useEffect(() => {
    console.log('ME DEBERIA EJECUTAR AHORA EN EFECTO DE MONTAJE DE EXPERIENCIAS');

    const images = stepData[EKeyDataByStep.TWO].imageExperienceData;

    if (!images || images.length === 0) {
      setSrcVector([]);
      return;
    }

    setSrcVector(images.map((img) => img.secureUrl));
    setIsStepValid(validateCurrentStep());
  }, [step, stepData[EKeyDataByStep.TWO].imageExperienceData]);

  // EFECTO PARA CARGAR IMAGEN DE PERFIL
  useEffect(() => {
    console.log('ME DEBERIA EJECUTAR AHORA EN EFECTO DE MONTAJE DE PERFIL');

    const img = stepData[EKeyDataByStep.TWO].imageProfileData;
    if (!img?.secureUrl) {
      setSrc(null);
      return;
    }
    setSrc(img.secureUrl);
    setIsStepValid(validateCurrentStep());
  }, [step, stepData[EKeyDataByStep.TWO].imageProfileData]);

  // ------------------------------------- EVENTOS------------------------------------------------//
  // ELIMINAR DEL STORAGE Y CLOUDINARY LA IMAGEN PREVIA DE PERFIL
  const onDeleteProfile = async (): Promise<void> => {
    try {
      await apiRequest(`${BASE_BACK_URL}/${DELETE_AVATAR_PREV}/${stepData[EKeyDataByStep.TWO].imageProfileData?.publicId}`, {
        method:'DELETE',
      });
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageProfileData: null,
        },
      }));
      setSrc(null); // LIMPIAR PREVIEW
    } catch (error) {
      console.warn(error);
    }
  };

  // ELIMINAR DEL STORAGE Y CLOUDINARY LA IMAGEN PREVIA DE EXPERIENCIA
  const onDeleteExperience = async (publicId: string): Promise<void> => {
    try {
      const imageToDelete: TImageDataStored | undefined= stepData[EKeyDataByStep.TWO].imageExperienceData.find((img) => img.publicId === publicId);

      if (!imageToDelete) return;

      // BORRAR EN CLOUDINARY (BACKEND)
      await apiRequest(`${BASE_BACK_URL}/${DELETE_AVATAR_EXPERIENCE_PREV}/${imageToDelete.publicId}`, {
        method:'DELETE',
      });

      // FILTRAR EL ESTADO
      const newExperiences = stepData[EKeyDataByStep.TWO].imageExperienceData.filter((img) => img.publicId !== publicId);

      // ACTUALIZAR TODO
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageExperienceData: newExperiences,
        },
      }));

      //VISTA PREVIA
      setSrcVector((prev) => prev.filter((_, i) => stepData[EKeyDataByStep.TWO].imageExperienceData[i].publicId !== publicId));

      // LOCALSTORAGE
      const existing = readExistingData(ENamesOfKeyLocalStorage.STEP_DATA);
      const existingStepTwo = existing[EKeyDataByStep.TWO] || {};

      localStorage.setItem(
        ENamesOfKeyLocalStorage.STEP_DATA,
        JSON.stringify({
          ...existing,
          [EKeyDataByStep.TWO]: {
            ...existingStepTwo,
            imageExperienceData: newExperiences,
          },
        }),
      );
    } catch (error) {
      console.warn(error);
    }
  };

  // EVENTO ONCHANGE A PERFIL
  const handleImageProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    listFiles.current = file;

    const result: TFieldState = imageProfileDataValidator.validate(file);
    setFormState((prevState) => ({ ...prevState, imageProfileData: result }));

    // SI NO ES VALIDO
    if (!result.isValid) {
      // TIEMPO DE DELAY
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          imageProfileData: { ...result, error: '__hidden__' },
        }));
      }, 2500);
      return;
    }

    // SINO GUARDAR
    savedProfile({
      formState: {
        ...formState,
        imageProfileData: result,
      },
      listFiles,
      setStepData,
    });

    setIsStepValid(result.isValid);
    setSrc(URL.createObjectURL(file)); // PREVIEW DIRECTO
  };

  // EVENTO ONCHANGE A EXPERIENCIAS
  const handleImageExperiencesChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files: FileList | null = e.target.files; //GUARDO EN CONSTANTE LOS ARCHIVOS
    if (!files) return; //RETORNAR Y NO SEGUIR
    listFiles.current = files;

    const result: TFieldState = imageExperienceDataValidator.validate(files, countImagesExp.current, 0);

    if (!result.isValid) {
      setFormState((prev) => ({ ...prev, imageExperienceData: result }));
      return;
    }

    await savedExperiences({
      formState: { ...formState, imageExperienceData: result },
      listFiles,
      setStepData,
    });

    setIsStepValid(result.isValid);

    const urls: string[] = Array.from(files).map((f) => URL.createObjectURL(f));

    setSrcVector(urls);
    countImagesExp.current = files.length;
  };

  const contextValueStepTwo: TTypeContextStepTwo = {
    handleImageProfileChange,
    handleImageExperiencesChange,
    onDeleteExperience,
    onDeleteProfile,
    setSrc,
    setSrcVector,
    setLoadImgExp,
    setLoadImg,
    loadImgExp,
    loadImg,
    src,
    srcVector,
  };

  return <StepTwoContext.Provider value={contextValueStepTwo}>{children}</StepTwoContext.Provider>;
};

export default StepTwoProvider;
