import useRegisterTasker from '../../../../../hooks/useRegisterTasker';
import useStepTwo from '../../../../../hooks/useStepTwo';
import { EKeyDataByStep } from '../../../../../types/enums';
import type { TImageDataStored } from '../../../../../types/typeRegisterEndDto';
import type { TIdString } from '../../../../../types/typeUUID';
import BtnDeleteImage from './Buttons/BtnDeleteImage';

// CSS
import './ProfileImagePreview.css';

// COMPONENTE DE VISTA PREVIA PERFIL
const ProfileImagePreview = () => {
  const { stepData } = useRegisterTasker(); //HOOK PERSONALIZADO QUE USA CONTEXTO NIVEL PASO DOS
  const { src, onDeleteProfile } = useStepTwo();
  if (!src) return; //SI NO HAY SRC NO SEGUIR
  const profile: TImageDataStored | null = stepData[EKeyDataByStep.TWO].imageProfileData;
  if (!profile) return; // ==> SI ES NULO NO SEGUIR
  const idImage: TIdString = profile.idImage;
  return (
    <>
      <img src={src} alt='Vista previa del perfil' data-image={idImage} className='profile-image-preview' />
      <BtnDeleteImage variant='btn btn__close' id={idImage} onDelete={onDeleteProfile}/>
    </>
  );
};

export default ProfileImagePreview;
