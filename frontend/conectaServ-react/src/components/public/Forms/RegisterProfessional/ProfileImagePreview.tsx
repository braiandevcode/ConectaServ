import useRegisterPro from '../../../../hooks/useRegisterPro';
import useStepTwo from '../../../../hooks/useStepTwo';
import { EKeyDataByStep } from '../../../../types/enums';
import type { TStoredImage } from '../../../../types/typePersistanceDataImage';
import type { TIdString } from '../../../../types/typeUUID';
import BtnDeleteImage from '../Buttons/BtnDeleteImage';

const ProfileImagePreview = () => {
  const { stepData } = useRegisterPro(); //HOOK PERSONALIZADO PARA QUE EL CONTEXTO CONSUMA DATOS
  const { src, onDeleteProfile } = useStepTwo();
  if (!src) return; //SI NO HAY SRC NO SEGUIR
  const profile: TStoredImage | null = stepData[EKeyDataByStep.TWO].imageProfile;
  if (!profile) return; // ==> SI ES NULO NO SEGUIR
  const idImage: TIdString = profile.idImage;
  return (
    <div className='form-professional-groupProfile__previewImage position-relative'>
      <img src={src} alt='Vista previa del perfil' data-image={idImage} className='profile-image-preview' />
      <BtnDeleteImage variant='btn btn__close' id={idImage} onDelete={onDeleteProfile}/>
    </div>
  );
};

export default ProfileImagePreview;
