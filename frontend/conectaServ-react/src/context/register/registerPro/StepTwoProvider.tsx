import React, { useEffect, useRef, useState } from 'react';
import { StepTwoContext } from './StepTwoContext';
import useRegisterPro from '../../../hooks/useRegisterPro';
import { formatTextArea } from '../../../utils/parsedAndFormatValuesUtils';
import { EKeyDataByStep, ENamesOfKeyLocalStorage } from '../../../types/enums';
import { deleteImageFromIndexedDB } from '../../../utils/storageUtils';
import DescriptionValidator from '../../../modules/validators/DescriptionValidator';
import ImageProfileValidator from '../../../modules/validators/ImageProfileValidator';
import ImageExperiencesValidator from '../../../modules/validators/ImageExperiencesValidator';
import loadImage from '../../../utils/loadImage';
import loadImages from '../../../utils/loadImages';
import savedProfile from '../../../utils/savedProfile';
import { verifyMetaDataImage } from '../../../utils/validateFieldUtils';
import savedExperiences from '../../../utils/savedExperiences';
import type { TStoredImage } from '../../../types/typePersistanceDataImage';
import type { TIdString } from '../../../types/typeUUID';
import type { TFieldState } from '../../../types/typeStateFields';
import type { TTypeContextStepTwo } from '../../../types/typeContextStepTwo';

const StepTwoProvider = ({ children }: { children: React.ReactNode }) => {
  const descriptionValidator: DescriptionValidator = new DescriptionValidator();
  const imageProfileValidator: ImageProfileValidator = new ImageProfileValidator();
  const imageExperiencesValidator: ImageExperiencesValidator = new ImageExperiencesValidator();
  // HOOK REGISTER PROFESIONAL
  const { validateCurrentStep, formState, stepData, setFormState, setStepData, setIsStepValid, step, setIsParsed } = useRegisterPro();

  // -----------------------------------------------useRef------------------------------------------------------//
  const countImagesExp = useRef<number>(0); // ==> REF PARA ALMACENAR CANTIDAD DE IMAGENES ALMACENADA
  const listFiles = useRef<FileList | File | null>(null); // ==> REF PARA ALMACENAR ARCHIVO O ARCHIVOS DE IMAGENES ACTUALMENTE

  //ESTADOS INTERNOS SOLO DE PASO 2
  const [src, setSrc] = useState<string | null>(null); //ESTADO PARA SOURCE DE IMAGEN
  const [srcVector, setSrcVector] = useState<string[]>([]); //ESTADO PARA SOURCE DE IMAGENES

  // EFECTO PARA CARGAR IMAGEN DE PERFIL
  useEffect(() => {
     console.log('ME LLAMARON DE : StepTwoProvider');
    if (stepData[EKeyDataByStep.TWO].imageProfile) {
      // CARGAR EL SOURCE DE IMAGEN MEDIANTE FUNCION INVOCADA
      loadImage({ setSrc, storedImage: stepData[EKeyDataByStep.TWO].imageProfile });
    }

    const isEveryDataImageExp: boolean = stepData[EKeyDataByStep.TWO].imageExperiences.every((imageObj) => verifyMetaDataImage(imageObj)); //SI TODOS LOS OBJETOS DEL ARREGLO TIENEN DATOS

    // SI HAY DATOS EN TODOS LOS ELEMENTOS
    if (isEveryDataImageExp) {
      // CARGAR EL SOURCE DE CADA IMAGEN MEDIANTE FUNCION INVOCADA
      loadImages({ setSrcVector, storedImages: stepData[EKeyDataByStep.TWO].imageExperiences as TStoredImage[], countImagesExp }); // INVOCAR FUNCION ASINCRONA
    }

    setIsStepValid(validateCurrentStep()); // ==> REVALIDAR

    // CLEANUP AL DESMONTAR RESETEO
    return () => {
      countImagesExp.current = 0; // RESETEAR CONTADOR REF
      setSrcVector([]); // LIMPIAR ESTADO DE IMAGENES RENDERIZADAS
      setSrc(''); //RESETEAR AL DESMONTAR
    };
  }, [step, stepData[EKeyDataByStep.TWO].imageProfile, stepData[EKeyDataByStep.TWO].imageExperiences]); // SOLO DEPENDE DE ESA PARTE

  // ------------------------------------- EVENTOS------------------------------------------------//
  // HANDLER PARA ELIMINAR IMAGEN DE PERFIL PASO 2
  const onDeleteProfile = async () => {
    const storedImage: TStoredImage | null = stepData[EKeyDataByStep.TWO].imageProfile;
    if (storedImage) {
      // ==> ELIMINAR IMAGEN DE INDEXEDDB POR ID
      await deleteImageFromIndexedDB(storedImage.idImage, ENamesOfKeyLocalStorage.IMAGE_INDEXED_DB);

      // SETEAR ESTADO GLOBAL DE PASOS
      setStepData((prev) => ({
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO], //COPIAR TODO LO PREVIO
          imageProfile: null, //PISAR NCON UEVO VALOR A NULL
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
        imageExperiences: prev[EKeyDataByStep.TWO].imageExperiences.filter((img) => img.idImage !== idImage), //PISAR NCON UEVO VALOR A NULL
      },
    }));
  };

  // EVENTO INPUT A DESCRIPCION PASO 2
  const handleDescriptionInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setIsParsed(false); //EN CADA EVENTO DE INPUT EN DESCRIPCION SERA FALSE ==> NO SE PARSEA
    const value: string = (e.target as HTMLTextAreaElement).value;
    const result: TFieldState = descriptionValidator.validate(value); //==>  VALIDAR ENTRADA
    setFormState((prevState) => ({ ...prevState, descriptionUser: result })); //==> PASAR OBJETO(RESULTADO) DE VALIDACION AL formState.

    // GUARDAR EN STE DATA
    setStepData((prev) => ({
      ...prev, //==> COPIAR TODO LO PREVIO DEL OBJETO GLOBAL
      [EKeyDataByStep.TWO]: {
        // ==>  EN ATRIBUTO 2
        ...prev[EKeyDataByStep.TWO], // MANTENER EL RESTO DE LOS VALORES EXISTENTES EN SUBOBJETO
        descriptionUser: value, //ACTUALIZAR EL descriptionUser
      },
    }));

    setIsStepValid(result.isValid); //SETEAR AL MOMENTO ASEGURANDO LA UNICA FUENTE DE LA VERDAD
  };

  // EVENTO AL HACER BLUR EN DESCRIPCION
  const handleDescriptionBlur = () => {
    // SI EL ESTADO REAL ACTUAL ES VALIDO
    if (formState.descriptionUser.isValid) {
      setIsParsed(true); // ==> INDICAR PARSEO

      setStepData((prev) => ({
        ...prev, //==> COPIAR TODO LO PREVIO DEL OBJETO GLOBAL
        [EKeyDataByStep.TWO]: {
          // ==>  EN ATRIBUTO 2
          ...prev[EKeyDataByStep.TWO], // MANTENER EL RESTO DE LOS VALORES EXISTENTES EN SUBOBJETO PASO 2
          descriptionUser: formatTextArea(formState.descriptionUser.value as string), // ACTUALIZAR CON FORMATO
        },
      }));
    }
  };

  // EVENTO CHANGE A PERFIL
  const handleImageProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && e.target.files[0]) {
      listFiles.current = e.target.files[0]; //ALMACENAR EL REF
    }

    if (!listFiles.current || !(listFiles.current instanceof File)) return; //==> SI NO EXISTE O NO ES UN FILE EN RUNTIME  NO SEGUIR

    const result: TFieldState = imageProfileValidator.validate(listFiles.current);
    setFormState((prevState) => ({ ...prevState, imageProfile: result }));

    // SI NO ES VALIDO  EJECUTAR EL TIMEOUT Y ACTUALIZAR EL ERROR A "__hidden__" QUE INDICA QUE SE OCULTE
    if (!result.isValid) {
      // DESPUES DE 2 SEGUNDO Y MEDIO
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          imageProfile: { ...result, error: '__hidden__' },
        }));
      }, 2500);
    }

    // SETEAR ESTADO GLOBAL DE PASOS
    savedProfile({ formState, listFiles, setStepData }); //INVOCAR Y GUARDAR

    // VALIDAR PASO
    setIsStepValid(result.isValid); // GUARDO EL RESULTADO FINAL DE LA VALIDACION DEL PASO
  };

  // EVENTO ONCHANGE A EXPERIENCIAS PASO 2
  const handleImageExperiencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    listFiles.current = e.target.files as FileList; // ==> GUARDO VALOR EN REFERENCIA
    const storedImages: TStoredImage[] = stepData[EKeyDataByStep.TWO].imageExperiences;

    // SUMO EL PESO TOTAL DE TODAS LAS IMAGENES EXISTENTES ==> TIPO ESPECIAL TStoredImage[]
    const existingTotalSize: number = storedImages?.reduce((acc, img) => acc + img.size, 0) ?? 0; // POR DEFAULT 0

    // VALIDO LAS NUEVAS IMAGENES PERO PASANDO TAMBIEN LO QUE YA EXISTIA
    const result: TFieldState = imageExperiencesValidator.validate(listFiles.current, countImagesExp.current, existingTotalSize);

    // ACTUALIZO EL FORMSTATE SOLO PARA EL CAMPO "imageExperiences"
    setFormState((prevState) => ({ ...prevState, ['imageExperiences']: result }));

    // SI NO ES VALIDO  EJECUTAR EL TIMEOUT Y ACTUALIZAR EL ERROR A "__hidden__" QUE INDICA QUE SE OCULTE
    if (!result.isValid) {
      // DESPUES DE 2 SEGUNDO Y MEDIO
      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          imageExperiences: { ...result, error: '__hidden__' },
        }));
      }, 2500);
    }

    // SETEAR Y GUARDAR DATOS DE IMAGEN EN ESTADO GLOBAL DE PASOS
    savedExperiences({ formState, listFiles, setStepData }); //INVOCAR Y GUARDAR
    setIsStepValid(result.isValid);
  };

  const contextValueStepTwo: TTypeContextStepTwo = {
    handleDescriptionInput,
    handleImageExperiencesChange,
    handleImageProfileChange,
    handleDescriptionBlur,
    onDeleteExperience,
    onDeleteProfile,
    setSrc,
    setSrcVector,
    src,
    srcVector,
  };

  return <StepTwoContext.Provider value={contextValueStepTwo}>{children}</StepTwoContext.Provider>;
};

export default StepTwoProvider;
