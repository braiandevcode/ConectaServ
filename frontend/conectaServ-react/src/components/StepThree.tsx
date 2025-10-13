import useRegisterPro from '../hooks/useRegisterPro';
import useStepThree from '../hooks/useStepThree';
import { EKeyDataByStep } from '../types/enums';
import type { TYesOrNo } from '../types/types';
import { renderFieldError, styleBorderFieldError } from '../utils/formUtils';

export default function StepThree() {
  const { amountFieldFormat, stepData, formState, isBudgeMountDisabled, isReinsertDisabled } = useRegisterPro();
  const { onFocusAmount, onBlurAmount, onChangeIsReinsert, onChangeIsBudge, handleBudgeAmount } = useStepThree();

  const storedBudgeSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.budgeSelected ?? 'no';
  const storedReinsertSelected: TYesOrNo = stepData[EKeyDataByStep.THREE]?.reinsert ?? 'no';
  return (
    <>
      <div className='mb-2 c-flex c-flex-column gap-1 form-professional-groupBudget form-step'>
        <div className='c-flex c-flex-items-center gap-1 form-professional-groupBudget__header'>
          <h3 className='form-professional-groupBudget__title'>
            <i className='fas fa-id-card'></i>
            <span>Presupuesto</span>
          </h3>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column gap-1/2'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__label'>
              <i className='fas fa-circle-dollar-to-slot'></i>
              <span>¿Cobrás el presupuesto?</span>
            </h4>
            <div className='c-flex c-flex-items-center gap-1/2 container-textInfo'>
              <i className='fas fa-info-circle'></i>
              <small className='container-textInfo__message'>Acción no modificable</small>
            </div>
          </div>

          <div className='c-flex c-flex-items-center gap-1/2 radio-group'>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-professional-groupBudget__radioGroup radio-option'>
              <input type='radio' name='budgeSelected' value='yes' checked={storedBudgeSelected === 'yes'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-professional-groupBudget__radioGroup__input radio-option__input' onChange={onChangeIsBudge} />
              <span className='radio-option__label'>Sí</span>
            </label>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-professional-groupBudget__radioGroup radio-option'>
              <input type='radio' name='budgeSelected' value='no' checked={storedBudgeSelected === 'no'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-professional-groupBudget__radioGroup__input radio-option__input' onChange={onChangeIsBudge} />
              <span className='radio-option__label'>No</span>
            </label>
          </div>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column gap-1/2' data-message='amountBudge'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__label'>
              <i className='fas fa-receipt'></i>
              <span>Precio fijo del presupuesto</span>
              <small className='text-muted'>(solo números enteros, sin decimales ni símbolos)</small>
            </h4>

            <div className='c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__container-field'>
              <input type='text' name='amountBudge' placeholder='$15000' className={`w-1/2 form-professional-groupBudget__field ${amountFieldFormat !== '' && styleBorderFieldError(formState, 'amountBudge')}`} disabled={isBudgeMountDisabled} value={amountFieldFormat} onFocus={onFocusAmount} onInput={handleBudgeAmount} onBlur={onBlurAmount} />
            </div>

            {amountFieldFormat !== '' && renderFieldError(formState, 'amountBudge')}
          </div>
        </div>

        <div className='c-flex c-flex-column gap-2'>
          <div className='c-flex c-flex-column gap-1/2'>
            <h4 className='c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__label'>
              <i className='fas fa-undo'></i>
              <span>¿Reintegro si te eligen?</span>
            </h4>
            <div className='c-flex c-flex-items-center gap-1/2 container-textInfo'>
              <i className='fas fa-info-circle'></i>
              <small className='form-professionalBudget__info'>Acción no modificable</small>
            </div>
          </div>

          <div className='mb-2 c-flex c-flex-items-center gap-1/2 form-professional-groupBudget__radioGroup radio-group'>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-professional-groupBudget__radioOption radio-option'>
              <input type='radio' name='reinsert' value='yes' checked={storedReinsertSelected === 'yes'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-professional-groupBudget__radioOption__input radio-option__input' disabled={isReinsertDisabled} onChange={onChangeIsReinsert} />
              <span className='radio-option__label'>Sí</span>
            </label>
            <label className='c-flex c-flex-items-center gap-1/2 cursor-pointer form-professional-groupBudget__radioOption radio-option'>
              <input type='radio' name='reinsert' value='no' checked={storedReinsertSelected === 'no'} className='c-flex c-flex-items-center c-flex-justify-center cursor-pointer form-professional-groupBudget__radioOption__input radio-option__input' disabled={isReinsertDisabled} onChange={onChangeIsReinsert} />
              <span className='radio-option__label'>No</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
