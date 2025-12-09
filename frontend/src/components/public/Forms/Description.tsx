import { FaFileLines } from 'react-icons/fa6';
import { renderFieldError, styleBorderFieldError } from '../../../utils/formUtils';
import useTasker from '../../../hooks/useTasker';
import useTaskerDescriptionHandlers from '../../../hooks/useTaskerDescriptionHandlers';


// CSS
import './Description.css'

const Description = () => {
  const { formState, setIsStepValid, setStepData, edit } = useTasker(); //APROVECHO ESTADOS DE VALIDACION
  const { handleDescriptionBlur, handleDescriptionInput } = useTaskerDescriptionHandlers({ formState, setIsStepValid, setStepData });

  return (
    <div className='descriptionField w-full c-flex c-flex-items-center c-flex-column gap-1/2 w-full form-groupProfile__containerDescription'>
      <label htmlFor='description' className='to-left c-flex c-flex-items-center gap-1/2 form-groupProfile__label'>
        <FaFileLines size={20} />
        {edit ? <span>Editar Descripción</span> : <span>Descripción de perfil (Opcional)</span>}
      </label>
      <textarea id='description' name='description' value={formState.description.value as string} className={`w-full form-groupProfile__textarea ${styleBorderFieldError(formState, 'description')}`} placeholder='Cuentales a la gente sobre ti...' spellCheck='true' lang='es' onChange={handleDescriptionInput} onBlur={handleDescriptionBlur} autoFocus></textarea>
      {renderFieldError(formState, 'description')}
    </div>
  );
};

export default Description;
