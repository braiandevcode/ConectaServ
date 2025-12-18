import { EKeyDataByStep } from '../types/enums';
import type { TImageDataStored } from '../types/typeRegisterEndDto';
import type { TSavedImage } from '../types/typeSavedImages';
import type { TTasker } from '../types/typeTasker';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';
const useImages = () => {
  // TIPADO INTERNO
  type TSavedExperiences = Pick<TTasker, 'setStepData'> & TSavedImage;

  type TSavedProfile = Pick<TTasker, 'setStepData'> & TSavedImage;

  // FUNCION PARA GUARDAR IMÁGENES DE EXPERIENCIAS
  const savedExperiences = async ({ formState, listFiles, setStepData }: TSavedExperiences): Promise<void> => {
    if (!formState?.imageExperienceData?.isValid || !listFiles.current || !(listFiles.current instanceof FileList)) return;

    console.log(listFiles.current);

    // CREAMOS UNA PROMESA EN PARALELO, HASTA QUE NO SE TERMINE NO SEGUIR
    const storedImages: TImageDataStored[] = (
      await Promise.all(
        Array.from(listFiles.current).map(async (file) => {
          console.log(file);

          const upload = await uploadImageToCloudinary(file, import.meta.env.VITE_CLOUDINARY_EXPERIENCES_PRESET);

          if (!upload) return null;

          return {
            idImage: crypto.randomUUID(),
            publicId: upload.public_id,
            url: upload.url,
            secureUrl: upload.secure_url,
            displayName: upload.display_name,
            bytes: upload.bytes,
            type: file.type,
            format: upload.format,
            resourceType: upload.resource_type,
            signature: upload.signature,
          } as TImageDataStored;
        }),
      )
    ).filter((img): img is TImageDataStored => img !== null);

    console.log(storedImages);

    setStepData((prev) => {
      const prevImages = prev[EKeyDataByStep.TWO]?.imageExperienceData || [];
      //EVITAR DUPLICADOS DE ID
      const existingIds = new Set(prevImages.map((img) => img.idImage));
      const filteredNew = storedImages.filter((img) => !existingIds.has(img.idImage));

      return {
        ...prev,
        [EKeyDataByStep.TWO]: {
          ...prev[EKeyDataByStep.TWO],
          imageExperienceData: [...prevImages, ...filteredNew],
        },
      };
    });
  };

  // FUNCION PARA GUARDAR IMAGEN DE PERFIL
  const savedProfile = async ({ formState, listFiles, setStepData }: TSavedProfile): Promise<void> => {
    if (!formState?.imageProfileData?.isValid || !listFiles.current || !(listFiles.current instanceof File)) return;

    const upload = await uploadImageToCloudinary(listFiles.current, import.meta.env.VITE_CLOUDINARY_AVATARS_PRESET);

    const imageProfileData: TImageDataStored = {
      idImage: crypto.randomUUID(),
      publicId: upload.public_id,
      url: upload.url,
      format: upload.format,
      secureUrl: upload.secure_url,
      resourceType: upload.resource_type,
      signature: upload.signature,
      type: listFiles.current.type,
      displayName: upload.display_name,
      bytes: upload.bytes,
    };

    console.log(imageProfileData);

    setStepData((prev) => ({
      ...prev,
      [EKeyDataByStep.TWO]: {
        ...prev[EKeyDataByStep.TWO],
        imageProfileData,
      },
    }));
  };

  return { savedExperiences, savedProfile };
};

export default useImages;
