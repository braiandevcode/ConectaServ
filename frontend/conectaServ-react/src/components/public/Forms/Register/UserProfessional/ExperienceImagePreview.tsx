import useRegisterPro from '../../../../../hooks/useRegisterPro';
import useStepTwo from '../../../../../hooks/useStepTwo';
import { EKeyDataByStep } from '../../../../../types/enums';
import type { TStoredImage } from '../../../../../types/typePersistanceDataImage';
import BtnDeleteImage from './Buttons/BtnDeleteImage';

// CSS
import './ExperienceImagePreview.css';

// COMPONENTE PARA IMAGENES PREVIAS DE EXPERIENCIAS
const ExperienceImagesPreview = () => {
  const { stepData } = useRegisterPro(); //HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL REGISTRO PROFESIONAL
  const { srcVector, onDeleteExperience } = useStepTwo(); //HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL PASO DOS

  // SI NO HAY IMAGENES PROCESADAS, NO RENDERIZAR
  if (!srcVector || srcVector.length === 0) return null;

  const storedImages: TStoredImage[] = stepData[EKeyDataByStep.TWO].imageExperiences;
  return (
    <>
      {storedImages.length > 0 &&
        storedImages.map((img, index) => {
          return (
            <div key={img.idImage} data-image={img.idImage} className='form-groupProfile__multipleImages c-flex c-flex-wrap gap-2 position-relative'>
              <img src={srcVector[index]} alt='Vista previa del perfil' className='profile-image-preview' />
              <BtnDeleteImage variant='btn btn__close' id={img.idImage} onDelete={onDeleteExperience}/>
            </div>
          );
        })}
    </>
  );
};

export default ExperienceImagesPreview;
