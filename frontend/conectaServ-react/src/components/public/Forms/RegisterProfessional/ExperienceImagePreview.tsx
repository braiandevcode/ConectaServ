import useRegisterPro from "../../../../hooks/useRegisterPro";
import useStepTwo from "../../../../hooks/useStepTwo";
import { EKeyDataByStep } from "../../../../types/enums";
import type { TStoredImage } from "../../../../types/typePersistanceDataImage";

const ExperienceImagesPreview = () => {
  const { stepData } = useRegisterPro();
  const { srcVector, onDeleteExperience } = useStepTwo();

  // SI NO HAY IMAGENES PROCESADAS, NO RENDERIZAR
  if (!srcVector || srcVector.length === 0) return null;

  const storedImages:TStoredImage[] = stepData[EKeyDataByStep.TWO].imageExperiences;
  return (
    <div className='form-professional-groupProfile__previewMultipleImages c-flex c-flex-wrap gap-2'>
      {storedImages.length > 0 &&
        storedImages.map((img, index) => {
          return (
            <div key={img.idImage} data-image={img.idImage} className='form-professional-groupProfile__multipleImages c-flex c-flex-wrap gap-2 position-relative'>
              <img src={srcVector[index]} alt='Vista previa del perfil' className='profile-image-preview' />
              <button type='button' aria-label='Eliminar imagen' className='cursor-pointer btn btn-trash position-absolute form-professional-groupProfile__btn-trash' data-image={img.idImage} onClick={() => onDeleteExperience(img.idImage)}>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default ExperienceImagesPreview;
