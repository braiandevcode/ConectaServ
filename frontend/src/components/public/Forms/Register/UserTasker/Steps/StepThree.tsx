import useRegisterTasker from '../../../../../../hooks/useRegisterTasker';
import useStepThree from '../../../../../../hooks/useStepThree';
import { EKeyDataByStep } from '../../../../../../types/enums';
import type { TYesOrNo } from '../../../../../../types/typeRadioYesOrNo';
import { renderFieldError, styleBorderFieldError } from '../../../../../../utils/formUtils';

// ICONOS DE REACT ICONS
import { GiIdCard } from 'react-icons/gi';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { IoArrowUndoCircle } from 'react-icons/io5';

export default function StepThree() {
  const { amountFieldFormat, formState, isBudgeMountDisabled, isReinsertDisabled, stepData } = useRegisterTasker(); //HOOK QUE USA CONTEXTO NIVEL REGISTRO PROFESIONAL
  const { onFocusAmount, onBlurAmount, onChangeIsReinsert, onChangeIsBudge, handleBudgeAmount } = useStepThree(); //HOOK QUE USA CONTEXTO NIVEL PASO 3 DEL FORMULARIO
  const storedBudgeSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.budgeSelected ?? 'no';
  const storedReinsertSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.reinsert ?? 'no';
  return (
    <>
      <div className='mb-2 c-flex c-flex-column gap-1'>
        <div className='c-flex c-flex-items-center gap-1 form-groupBudget__header'>
          <h3 className='form-groupBudget__title'>
            <GiIdCard size={20} />
            <span>Presupuesto</span>
          </h3>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column gap-1/2'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-groupBudget__label'>
              <FaCircleDollarToSlot size={20} />
              <span>¿Cobrás el presupuesto?</span>
            </h4>
            <div className='c-flex c-flex-items-center gap-1/2 container-textInfo'>
              <BsFillInfoSquareFill size={20} />
              <small className='container-textInfo__message'>Acción no modificable</small>
            </div>
          </div>

          <div className='c-flex c-flex-items-center gap-1/2 radio-group'>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-groupBudget__radioGroup radio-option'>
              <input type='radio' name='budgeSelected' value='yes' checked={storedBudgeSelected === 'yes'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-groupBudget__radioGroup__input radio-option__input' onChange={onChangeIsBudge} />
              <span className='radio-option__label'>Sí</span>
            </label>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-groupBudget__radioGroup radio-option'>
              <input type='radio' name='budgeSelected' value='no' checked={storedBudgeSelected === 'no'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-groupBudget__radioGroup__input radio-option__input' onChange={onChangeIsBudge} />
              <span className='radio-option__label'>No</span>
            </label>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column' data-message='amountBudge'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-groupBudget__label'>
              <div className='c-flex c-flex-column c-flex-items- gap-1/2'>
                <div className='c-flex-self-start c-flex c-flex-items-center gap-1/2'>
                  <RiMoneyDollarCircleFill size={20} />
                  <span>Precio fijo del presupuesto</span>
                </div>
                <small className='text-muted'>(solo números enteros, sin decimales ni símbolos)</small>
              </div>
            </h4>

            <div className='c-flex c-flex-column gap-1/2'>
              <input type='text' name='amountBudge' placeholder='$15000' className={`w-1/2 form-groupBudget__field ${amountFieldFormat !== '' && styleBorderFieldError(formState, 'amountBudge')}`} disabled={isBudgeMountDisabled} value={amountFieldFormat} onFocus={onFocusAmount} onChange={handleBudgeAmount} onBlur={onBlurAmount} />
              {amountFieldFormat !== '' && renderFieldError(formState, 'amountBudge')}
            </div>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column gap-1/2'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-groupBudget__label'>
              <IoArrowUndoCircle size={20} />
              <span>¿Reintegro si te eligen?</span>
            </h4>
            <div className='c-flex c-flex-items-center gap-1/2 container-textInfo'>
              <BsFillInfoSquareFill size={20} />
              <small className='form-professionalBudget__info'>Acción no modificable</small>
            </div>
          </div>

          <div className='mb-2 c-flex c-flex-items-center gap-1/2 form-groupBudget__radioGroup radio-group'>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-groupBudget__radioOption radio-option'>
              <input type='radio' name='reinsert' value='yes' checked={storedReinsertSelected === 'yes'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-groupBudget__radioOption__input radio-option__input' disabled={isReinsertDisabled} onChange={onChangeIsReinsert} />
              <span className='radio-option__label'>Sí</span>
            </label>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-groupBudget__radioOption radio-option'>
              <input type='radio' name='reinsert' value='no' checked={storedReinsertSelected === 'no'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-groupBudget__radioOption__input radio-option__input' disabled={isReinsertDisabled} onChange={onChangeIsReinsert} />
              <span className='radio-option__label'>No</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
