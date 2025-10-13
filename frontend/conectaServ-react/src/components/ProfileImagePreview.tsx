import useRegisterPro from '../hooks/useRegisterPro';
import useStepTwo from '../hooks/useStepTwo';
import { EKeyDataByStep } from '../types/enums';
import type { TIdString, TStoredImage } from '../types/types';

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
      <button type='button' aria-label='Eliminar imagen' className='cursor-pointer btn btn-trash position-absolute form-professional-groupProfile__btn-trash' data-image={idImage} onClick={() => onDeleteProfile(idImage)}>
        <i className='fa-solid fa-trash'></i>
      </button>
    </div>
  );
};

export default ProfileImagePreview;
