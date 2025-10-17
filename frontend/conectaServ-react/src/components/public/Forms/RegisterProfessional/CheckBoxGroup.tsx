import useRegisterPro from "../../../../hooks/useRegisterPro";
import useStepOne from "../../../../hooks/useStepOne";
import { EKeyDataByStep } from "../../../../types/enums";
import type { TOptionWork } from "../../../../types/typeOptionsWork";
import type { TWorkGroupOption } from "../../../../types/typeWorkGoupOptions";


// COMPONENTE PARA CREAR LOS GRUPOS DE CHECKBOXES
const CheckboxGroup = ({ type, icon, title, options }: TWorkGroupOption) => {
  const { stepData } = useRegisterPro(); // LEER DIRECTO DEL ESTADO GLOBAL
  const { handleCheckboxChange } = useStepOne(); // EVENTO DE CAMBIO

  // OBTENER LOS VALORES SELECCIONADOS DESDE STEPDATA
  const getSelectedValues = (type: TOptionWork): string[] => {
    return stepData[EKeyDataByStep.ONE][`${type}[]`] || [];
  };

  return (
    <>
      <div className='c-flex c-flex-items-center gap-1 form-professional-groupSpeciality__context-header'>
        <i className={`fas ${icon}`}></i>
        <h4 className='c-flex c-flex-items-center c-flex-justify-center gap-1/2 form-professional-groupSpeciality__label'>
          <span>{title}</span>
          <span className='span-required'>*</span>
        </h4>
      </div>

      {options.map((opt, i) => (
        <div className={`c-flex c-flex-items-center gap-1/2 ${type}`} key={`${type}-${i}`}>
          <input
            onChange={(e) => handleCheckboxChange(e, type)}
            checked={getSelectedValues(type).includes(opt.value)} //REFLEJAR EL ESTADO GLOBAL
            type='checkbox'
            name={`${type}[]`}
            id={`${type}-${i}`}
            value={opt.value}
            className={`c-flex c-flex-justify-center c-flex-items-center cursor-pointer ${type}__input`}
          />
          <label htmlFor={`${type}-${i}`} className={`${type}__label`}>
            {opt.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxGroup;
