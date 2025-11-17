import type { ReactNode } from 'react';
import type { TOptionItem } from '../../../../../types/typeOptionItem';
import useStepOne from '../../../../../hooks/useStepOne';
import type { TWorkGroupOption } from '../../../../../types/typeWorkGoupOptions';
import type { TEntitie } from '../../../../../types/typeOptionsWork';
import { EEntitiesGroup, EKeyDataByStep } from '../../../../../types/enums';
import useRegisterTasker from '../../../../../hooks/useRegisterTasker';

// COMPONENTE DE CHECKS
const CheckBox = ({ opt, i, type, entitie }: { opt: TOptionItem; i: number, entitie:TEntitie } & Pick<TWorkGroupOption, 'type'>): ReactNode => {
  const { handleCheckboxChange } = useStepOne();//HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL PASO UNO
  const { stepData } = useRegisterTasker(); // //HOOK PERSONALIZADO QUE USA CONTEXTO  NIVEL REGISTRO PROFESIONAL
  // OBTENER LOS VALORES SELECCIONADOS DESDE STEPDATA
  const getSelectedValues = (entitie: TEntitie): string[] => { 
     let currentStoredValues: string[] = [];
    
        // const updatedValues: string[] = updater(currentStoredValues, checked, value);
    
        //  SEGUN ENTITIE PARA QUE TS RECONOZCA EL ACCESO ==> DENOMINADO NARROWING
        switch (entitie) {
          case EEntitiesGroup.SERVICE_DATA:
            currentStoredValues = stepData[EKeyDataByStep.ONE].serviceData.service;
            break;
          case EEntitiesGroup.WORK_AREA_DATA:
            currentStoredValues = stepData[EKeyDataByStep.ONE]?.workAreaData?.workArea ?? [];
            break;
          case EEntitiesGroup.DAY_DATA:
            currentStoredValues = stepData[EKeyDataByStep.ONE].dayData.day;
            break;
          case EEntitiesGroup.HOUR_DATA:
            currentStoredValues = stepData[EKeyDataByStep.ONE].hourData.hour;
            break;
        }
    
        return currentStoredValues;
        // return stepData[EKeyDataByStep.ONE][`${type}`] ?? [];
  };

  return (
    <>
      <div className={`c-flex c-flex-items-center gap-1/2 ${type}`} key={`${type}-${i}`}>
        <input
          onChange={(e) => handleCheckboxChange(e, entitie)}
          checked={getSelectedValues(entitie).includes(opt.value)} //REFLEJAR EL ESTADO GLOBAL
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