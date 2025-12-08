import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { StepTwoContext } from './StepTwoContext';
import useRegisterTasker from '../../../hooks/useRegisterTasker';
// import { formatTextArea } from '../../../utils/parsedAndFormatValuesUtils';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import { deleteImageFromIndexedDB } from '../../../utils/storageUtils';
// import DescriptionValidator from '../../../modules/validators/DescriptionValidator';
import loadImage from '../../../utils/loadImage';
import loadImages from '../../../utils/loadImages';
import { verifyMetaDataImage } from '../../../utils/validateFieldUtils';
import type { TIdString } from '../../../types/typeUUID';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TTypeContextStepTwo } from '../../../types/typeContextStepTwo';
import ImageProfileValidator from '../../../modules/validators/ImageProfileValidator';
import ImageExperiencesValidator from '../../../modules/validators/ImageExperiencesValidator';
import type { TImageData, TImageDataStored } from '../../../types/typeRegisterEndDto';
import useImages from '../../../hooks/useImages';
import useGlobalModal from '../../../hooks/useGlobalModal';
import { EModalGlobalType } from '../../../types/enumGlobalModalType';
import useTasker from '../../../hooks/useTasker';

const StepTwoProvider = ({ children }: { children: React.ReactNode }) => {
  // const descriptionValidator: DescriptionValidator = new DescriptionValidator();
  const imageProfileDataValidator: ImageProfileValidator = new ImageProfileValidator();
  const imageExperienceDataValidator: ImageExperiencesValidator = new ImageExperiencesValidator();

  // CUSTOM HOOK DE TASKER GENERAL
  const { setStepData, stepData, formState, setFormState, setIsStepValid } = useTasker();

  // CUSTOM HOOK REGISTER PROFESIONAL
  const { validateCurrentStep, step } = useRegisterTasker();
  const { savedExperiences, savedProfile } = useImages();
  const { openGlobalModal, showError } = useGlobalModal();

  // -----------------------------------------------useRef------------------------------------------------------//
  const countImagesExp = useRef<number>(0); // ==> REF PARA ALMACENAR CANTIDAD DE IMAGENES ALMACENADA
  const listFiles = useRef<FileList | File | null>(null); // ==> REF PARA ALMACENAR ARCHIVO O ARCHIVOS DE IMAGENES ACTUALMENTE

  //ESTADOS INTERNOS SOLO DE PASO 2
  const [src, setSrc] = useState<string | null>(null); //ESTADO PARA SOURCE DE IMAGEN
  const [srcVector, setSrcVector] = useState<string[]>([]); //ESTADO PARA SOURCE DE IMAGENES

  const [loadImg, setLoadImg] = useState<boolean>(false);
  const [loadImgExp, setLoadImgExp] = useState<boolean>(false);
  // EFECTO PARA CARGAR IMAGEN DE PERFIL
  useEffect(() => {
    upLoadImgExp();
    setIsStepValid(validateCurrentStep()); // ==> REVALIDAR
    // CLEANUP AL DESMONTAR RESETEO
    return () => {
      countImagesExp.current = 0; // RESETEAR CONTADOR REF
      setSrcVector([]); // LIMPIAR ESTADO DE IMAGENES RENDERIZADAS
      setSrc(''); //RESETEAR AL DESMONTAR
    };
  }, [step, stepData[EKeyDataByStep.TWO].imageExperienceData]); // SOLO DEPENDE DE ESA PARTE

  useEffect(() => {
    uploadImgProfile();
    setIsStepValid(validateCurrentStep()); // ==> REVALIDAR
  }, [step, stepData[EKeyDataByStep.TWO].imageProfileData]);

  // ------------------------------------- EVENTOS------------------------------------------------//
  // HANDLER PARA ELIMINAR IMAGEN DE PERFIL PASO 2
  const onDeleteProfile = async () => {
    const storedImage: TImageDataStored | null = stepData[EKeyDataByStep.TWO].imageProfileData;
    if (storedImage) {
      // ==> ELIMINAR IMAGEN DE INDEXEDDB POR ID
      await deleteImageFromIndexedDB(storedImage.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

      // SETEAR ESTADO GLOBAL DE PASOS
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO], //COPIAR TODO LO PREVIO
          imageProfileData: null, //PISAR NCON UEVO VALOR A NULL
        },
      }));
    }
  };

  // HANDLER PARA ELIMINAR UNA EXPERIENCIA POR ID
  const onDeleteExperience = async (idImage: TIdString) => {
    // ==> ELIMINAR IMAGEN DE INDEXEDDB POR ID
    await deleteImageFromIndexedDB(idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

    // SETEAR ESTADO GLOBAL DE PASOS
    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.TWO]: {
        ...prev[EKeyDataByStep.TWO], //COPIAR TODO LO PREVIO
        imageExperienceData: prev[EKeyDataByStep.TWO].imageExperienceData.filter((img) => img.idImage !== idImage), //PISAR NCON UEVO VALOR A NULL
      },
    }));
  };

  // SUBIDA DE IMAGEN DE EXPERIENCIAS
  const upLoadImgExp = async () => {
    try {
      setLoadImgExp(true);
      //SI TODOS LOS OBJETOS DEL ARREGLO TIENEN DATOS
      const isEveryDataImageExp: boolean = stepData[EKeyDataByStep.TWO].imageExperienceData.every((imageObj) => verifyMetaDataImage(imageObj));
      // SI HAY DATOS EN TODOS LOS ELEMENTOS
      if (isEveryDataImageExp) {
        // CARGAR EL SOURCE DE CADA IMAGEN MEDIANTE FUNCION INVOCADA
        await loadImages({ setSrcVector, storedImages: stepData[EKeyDataByStep.TWO].imageExperienceData as TImageData[], countImagesExp }); // INVOCAR FUNCION ASINCRONA
      }
    } catch (error) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError('ERROR', 'Ocurrió un error inesperado, intente de nuevo más tarde.');
    } finally {
      setLoadImgExp(false);
    }
  };

  // SUBIDA DE IMAGEN DEL PEFIL
  const uploadImgProfile = async () => {
    try {
      setLoadImg(true);
      if (stepData[EKeyDataByStep.TWO].imageProfileData) {
        // CARGAR EL SOURCE DE IMAGEN MEDIANTE FUNCION INVOCADA
        await loadImage({ setSrc, storedImage: stepData[EKeyDataByStep.TWO].imageProfileData });
      }
    } catch (error) {
      openGlobalModal(EModalGlobalType.MODAL_ERROR);
      showError('ERROR', 'Ocurrió un error inesperado, intente de nuevo más tarde.');
    } finally {
      setLoadImg(false);
    }
  };

  // EVENTO ONCHANGE A PERFIL
  const handleImageProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      listFiles.current = e.target.files[0]; //ALMACENAR EL REF
    }

    if (!listFiles.current || !(listFiles.current instanceof File)) return; //==> SI NO EXISTE O NO ES UN FILE EN RUNTIME  NO SEGUIR

    const result: TFieldState = imageProfileDataValidator.validate(listFiles.current);
    setFormState((prevState) => ({ ...prevState, imageProfileData: result }));

    // SI NO ES VALIDO  EJECUTAR EL TIMEOUT Y ACTUALIZAR EL ERROR A "__hidden__" QUE INDICA QUE SE OCULTE
    if (!result.isValid) {
      // DESPUES DE 2 SEGUNDO Y MEDIO
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          imageProfileData: { ...result, error: '__hidden__' },
        }));
      }, 2500);
    }

    // SETEAR ESTADO GLOBAL DE PASOS
    savedProfile({
      formState: {
        ...formState, // LO VIEJO
        imageProfileData: result, //LO NUEVO
      },
      listFiles,
      setStepData,
    });

    // VALIDAR PASO
    setIsStepValid(result.isValid); // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
  };

  // EVENTO ONCHANGE A EXPERIENCIAS
  const handleImageExperiencesChange = (e: ChangeEvent<HTMLInputElement>) => {
    listFiles.current = e.target.files as FileList; // ==> GUARDO VALOR EN REFERENCIA
    const storedImages: TImageDataStored[] = stepData[EKeyDataByStep.TWO].imageExperienceData;

    // SUMO EL PESO TOTAL DE TODAS LAS IMAGENES EXISTENTES ==> TIPO ESPECIAL TStoredImage[]
    const existingTotalSize: number = storedImages?.reduce((acc, img) => acc + img.size, 0) ?? 0; // POR DEFAULT 0

    // VALIDO LAS NUEVAS IMAGENES PERO PASANDO TAMBIEN LO QUE YA EXISTIA
    const result: TFieldState = imageExperienceDataValidator.validate(listFiles.current, countImagesExp.current, existingTotalSize);

    // ACTUALIZO EL FORMSTATE SOLO PARA EL CAMPO "imageExperienceData"
    setFormState((prevState) => ({ ...prevState, ['imageExperienceData']: result }));

    // SI NO ES VALIDO  EJECUTAR EL TIMEOUT Y ACTUALIZAR EL ERROR A "__hidden__" QUE INDICA QUE SE OCULTE
    if (!result.isValid) {
      // DESPUES DE 2 SEGUNDO Y MEDIO
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          imageExperienceData: { ...result, error: '__hidden__' },
        }));
      }, 2500);
    }

    // ACTUALIZAR ESTADO EN REACT, NO ES INMEDIATO
    setFormState((prev) => ({
      ...prev,
      imageExperienceData: result,
    }));

    // ESTADO ACTUAL
    savedExperiences({
      formState: {
        ...formState, // LO ACTUAL
        imageExperienceData: result, //LO NUEVO
      },
      listFiles,
      setStepData,
    });
    setIsStepValid(result.isValid);
  };

  const contextValueStepTwo: TTypeContextStepTwo = {
    // handleDescriptionInput,
    handleImageProfileChange,
    handleImageExperiencesChange,
    // handleDescriptionBlur,
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
