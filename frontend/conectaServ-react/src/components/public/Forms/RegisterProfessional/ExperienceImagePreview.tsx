import useRegisterPro from '../../../../hooks/useRegisterPro';
import useStepTwo from '../../../../hooks/useStepTwo';
import { EKeyDataByStep } from '../../../../types/enums';
import type { TStoredImage } from '../../../../types/typePersistanceDataImage';
import BtnDeleteImage from '../Buttons/BtnDeleteImage';

const ExperienceImagesPreview = () => {
  const { stepData } = useRegisterPro();
  const { srcVector, onDeleteExperience } = useStepTwo();

  // SI NO HAY IMAGENES PROCESADAS, NO RENDERIZAR
  if (!srcVector || srcVector.length === 0) return null;

  const storedImages: TStoredImage[] = stepData[EKeyDataByStep.TWO].imageExperiences;
  return (
    <div className='form-professional-groupProfile__previewMultipleImages c-flex c-flex-wrap gap-2'>
      {storedImages.length > 0 &&
        storedImages.map((img, index) => {
          return (
            <div key={img.idImage} data-image={img.idImage} className='form-professional-groupProfile__multipleImages c-flex c-flex-wrap gap-2 position-relative'>
              <img src={srcVector[index]} alt='Vista previa del perfil' className='profile-image-preview' />
              <BtnDeleteImage variant='btn btn__close' id={img.idImage} onDelete={onDeleteExperience}/>
            </div>
          );
        })}
    </div>
  );
};

export default ExperienceImagesPreview;
