import useRegisterPro from '../hooks/useRegisterPro';
import useStepOne from '../hooks/useStepOne';
import { ECategoryKey, EKeyDataByStep } from '../types/enums';
import { renderFieldError, styleBorderFieldError } from '../utils/formUtils';
import CheckboxGroupsContainer from './CheckBoxGroupContainer';
export default function StepOne() {
  const { formState, stepData, hasInteracted } = useRegisterPro();
  const { handleChangeSelected, titleRef } = useStepOne();
  return (
    <>
      <div className='c-flex c-flex-column gap-1 form-professional__sections'>
        <div data-select='category' className='c-flex c-flex-column gap-1 form-professional-groupSelectCategory form-step'>
          <div className='c-flex c-flex-items-center gap-1 form-professional-groupSelectCategory__header'>
            <h3 className='c-flex c-flex-items-center gap-1/2 form-professional-groupSelectCategory__title'>
              <i className='fas fa-id-card'></i>
              <span>Categorías</span>
            </h3>
          </div>

          <label htmlFor='category' className='c-flex c-flex-items-center gap-1/2 form-professional-groupSelectCategory__label'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <i className='fas fa-layer-group'></i>
              <span>Elija una opción</span>
            </span>
            <span className='span-required'>*</span>
          </label>

          {/* SELECT PRINCIPAL DE CATEGORIA */}
          <select ref={titleRef} value={stepData[EKeyDataByStep.ONE].category} onChange={handleChangeSelected} id='category' className={`w-full form-professional-groupSelectCategory__select ${styleBorderFieldError(formState, 'category')}`} name='category'>
            <option value={ECategoryKey.NONE} disabled>
              Seleccione una categoría
            </option>
            <option value={ECategoryKey.REPAIR}>Reparación y mantenimiento</option>
            <option value={ECategoryKey.MOVE}>Mudanza y Transporte</option>
            <option value={ECategoryKey.GARDEN}>Jardinería</option>
          </select>
          {renderFieldError(formState, 'category')}
        </div>

        {/* MOSTRAR GRUPOS DE CHECKBOXES SI SE ELIGIO UNA CATEGORIA VALIDA */}
        {hasInteracted && <CheckboxGroupsContainer />}
      </div>
    </>
  );
}
