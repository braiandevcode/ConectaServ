import type { ReactNode } from 'react';
import type { TOptionItem } from '../../../../../types/typeOptionItem';
import useStepOne from '../../../../../hooks/useStepOne';
import type { TWorkGroupOption } from '../../../../../types/typeWorkGoupOptions';
import type { TOptionWork } from '../../../../../types/typeOptionsWork';
import { EKeyDataByStep } from '../../../../../types/enums';
import useRegisterTasker from '../../../../../hooks/useRegisterTasker';

// COMPONENTE DE CHECKS
const CheckBox = ({ opt, i, type }: { opt: TOptionItem; i: number } & Pick<TWorkGroupOption, 'type'>): ReactNode => {
  const { handleCheckboxChange } = useStepOne();//HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL PASO UNO
  const { stepData } = useRegisterTasker(); // //HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL REGISTRO PROFESIONAL
  // OBTENER LOS VALORES SELECCIONADOS DESDE STEPDATA
  const getSelectedValues = (type: TOptionWork): string[] => { 
    return stepData[EKeyDataByStep.ONE][`${type}[]`] ?? [];
  };

  return (
    <>
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
    </>
  );
};

export default CheckBox;