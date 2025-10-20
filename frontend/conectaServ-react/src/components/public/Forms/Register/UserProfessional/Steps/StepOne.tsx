import useRegister from "../../../../../../hooks/useRegister";
import useRegisterPro from "../../../../../../hooks/useRegisterPro";
import useStepOne from "../../../../../../hooks/useStepOne";
import { ECategoryKey, EKeyDataByStep } from "../../../../../../types/enums";
import { renderFieldError, styleBorderFieldError } from "../../../../../../utils/formUtils";
import CheckboxGroupsContainer from "../CheckBoxGroupContainer";

import './StepOne.css'; // CSS

// ICONOS DE REACT ICONS
import { GiIdCard } from 'react-icons/gi';
import { IoLayers } from 'react-icons/io5';
export default function StepOne() {
  const { stepData } = useRegister();
  const { formState, hasInteracted } = useRegisterPro();
  const { handleChangeSelected, titleRef } = useStepOne();
  return (
    <>
      <div className='c-flex c-flex-column gap-1 form__sections'>
        <div data-select='category' className='c-flex c-flex-column gap-1 form-groupSelectCategory'>
          <div className='c-flex c-flex-items-center gap-1 form-groupSelectCategory__header'>
            <h3 className='c-flex c-flex-items-center gap-1/2 form-groupSelectCategory__title'>
              <GiIdCard size={20}/>
              <span>Categorías</span>
            </h3>
          </div>

          <label htmlFor='category' className='c-flex c-flex-items-center gap-1/2'>
            <span className='c-flex c-flex-items-center gap-1/2'>
              <IoLayers size={20} />
              <span>Elija una opción</span>
            </span>
            <span className='span-required'>*</span>
          </label>

          {/* SELECT PRINCIPAL DE CATEGORIA */}
          <select ref={titleRef} value={stepData[EKeyDataByStep.ONE].category} onChange={handleChangeSelected} id='category' className={`w-full form-groupSelectCategory__select ${styleBorderFieldError(formState, 'category')}`} name='category'>
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
