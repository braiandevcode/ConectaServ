import useRegisterPro from "../../../../../../hooks/useRegisterPro";
import useStepTwo from "../../../../../../hooks/useStepTwo";
import { EKeyDataByStep } from "../../../../../../types/enums";
import type { TStoredImage } from "../../../../../../types/typePersistanceDataImage";
import { renderFieldError, styleBorderFieldError } from "../../../../../../utils/formUtils";
import ExperienceImagesPreview from "../ExperienceImagePreview";
import ProfileImagePreview from "../ProfileImagePreview";

// ICONOS DE REACT ICONS
import { GiIdCard } from 'react-icons/gi';
import { FaFileLines } from 'react-icons/fa6';
import { IoImage } from 'react-icons/io5';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';

// CSS
import './StepTwo.css';
import useRegister from "../../../../../../hooks/useRegister";

// COMPONENTE PASO 2
const StepTwo = () =>{
  //DEL FORMSTATE TOMO EL VALOR ACTUAL QUE CONSUME DEL  ==> STEPDATA POR LO CUAL ES MOTIVO DE LA PERSISTENCIA
  const { stepData } = useRegister();
  const { formState } = useRegisterPro();
  const { handleImageProfileChange, handleImageExperiencesChange, handleDescriptionInput, handleDescriptionBlur } = useStepTwo();

  const profile:TStoredImage | null = stepData[EKeyDataByStep.TWO].imageProfile;
  const experiences: TStoredImage[] = stepData[EKeyDataByStep.TWO].imageExperiences;
  return (
    <>
      <div className='mb-2 c-flex c-flex-column gap-1'>
        <div className='c-flex c-flex-items-center gap-1 form-groupProfile__header'>
          <h3 className='form-groupSelectCategory__title'>
            <GiIdCard size={20}/>
            <span>Tu Perfil</span>
          </h3>
        </div>

        <div className='mb-2 c-flex c-flex-column c-flex-items-center gap-3 form-groupProfile__body'>
          {/* DESCRIPCIÓN PERFIL */}
          <div className='w-full c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-groupProfile__containerDescription'>
            <label htmlFor='descriptionUser' className='to-left c-flex c-flex-items-center gap-1/2 form-groupProfile__label'>
              <FaFileLines size={20} />
              <span>Descripción de perfil (Opcional)</span>
            </label>
            <textarea id='descriptionUser' name='descriptionUser' value={formState.descriptionUser.value as string} className={`w-full form-groupProfile__textarea ${styleBorderFieldError(formState, 'descriptionUser')}`} placeholder='Cuentales a la gente sobre ti...' spellCheck='true' lang='es' onChange={handleDescriptionInput} onBlur={handleDescriptionBlur} autoFocus></textarea>
            {renderFieldError(formState, 'descriptionUser')}
          </div>

          {/* FOTO PERFIL */}
          <div className={`c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-groupProfile__containerImageProfile`}>
            <h6 className='to-left c-flex c-flex-items-center gap-1/2 form-groupProfile__label'>
              <IoImage slope={20} />
              <span>Foto de perfil (Opcional)</span>
            </h6>
            <div className='c-flex c-flex-items-center c-flex-column gap-3/2 w-full cursor-pointer position-relative upload-area'>
              <label className='cursor-pointer'>
                <input type='file' name='imageProfile' className='upload-area__input' accept='image/jpg,image/jpeg,image/png,image/webp' onChange={handleImageProfileChange} />
                <div className='c-flex c-flex-items-center c-flex-column gap-3/2 form-groupProfile__drag'>
                  <FaCloudUploadAlt className="upload-area__icon" size={20} />
                  <small className='upload-area__text'>Toca o haz clic para seleccionar tu foto</small>
                  <small className='upload-area__note'>Formatos: JPG, PNG, JPEG O WEBP (Máx. 5MB)</small>
                </div>
              </label>

              <div className='form-groupProfile__previewImage c-flex c-flex-wrap gap-2'>{profile && <ProfileImagePreview />}</div>
              {formState.imageProfile.error && (
                <div>
                  <span className={`has-error ${formState.imageProfile.error === '__hidden__' ? 'hidden' : ''}`}>{formState.imageProfile.error !== '__hidden__' ? formState.imageProfile.error : ''}</span>
                </div>
              )}
            </div>
          </div>

          {/* IMÁGENES EXPERIENCIAS */}
          <div className='c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-professional__groupImagesExperiences'>
            <h6 className='to-left c-flex c-flex-items-center gap-1/2 form-groupProfile__label'>
              <IoMdImages size={20} />
              <span>Imágenes de experiencias (Opcional)</span>
            </h6>
            <div className='c-flex c-flex-items-center c-flex-column gap-3/2 w-full cursor-pointer upload-area'>
              <label className='cursor-pointer'>
                <input type='file' name='imageExperiences' className='upload-area__input' accept='image/jpg,image/jpeg,image/png,image/webp' multiple onChange={handleImageExperiencesChange} />
                <div className='c-flex c-flex-items-center c-flex-column gap-3/2 form-groupProfile__drag'>
                   <FaCloudUploadAlt className="upload-area__icon" size={20} />
                  <small className='upload-area__text'>Toca o haz clic para seleccionar imágenes</small>
                  <small className='upload-area__note'>Puedes subir hasta 10 imágenes (Máx. 5MB cada una)</small>
                  <small>Formatos: JPG, PNG, JPEG O WEBP</small>
                </div>
              </label>

              {experiences && experiences.length > 0 && <div className='form-groupProfile__previewMultipleImages c-flex c-flex-wrap gap-2'>{<ExperienceImagesPreview />}</div>}
              {formState.imageExperiences.error && (
                <div>
                  <span className={`has-error ${formState.imageExperiences.error === '__hidden__' ? 'hidden' : ''}`}>{formState.imageExperiences.error !== '__hidden__' ? formState.imageExperiences.error : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepTwo;
