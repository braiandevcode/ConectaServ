import { categoryConfigs } from '../config/constant'; //DE LA CONSTANTE CONFIGURATIVA
import useRegisterPro from '../hooks/useRegisterPro';
import { EKeyDataByStep, type ECategoryKey } from '../types/enums';
import type { TCategoryConfig, TCategoryKey } from '../types/types'; // DE LOS TYPES PERSONALIZADOS
import CheckboxGroup from './CheckBoxGroup';

// COMPONENTE CONTENEDOR QUE CONTIENE TODOS LOS GRUPOS SEGUN CATEGORIA
const CheckboxGroupsContainer = () => {
 const { stepData } = useRegisterPro(); // ==> HOOK REGISTRO PROFESIONAL
  const config: TCategoryConfig = categoryConfigs[stepData[EKeyDataByStep.ONE].category as Exclude<TCategoryKey, ECategoryKey.NONE>];
  
  return (
    <div className='c-flex c-flex-column gap-1 form-professional-groupSpeciality'>
      {config &&
        config.options.map((groupOption) => (
          <div key={groupOption.type} className={`c-flex c-flex-column gap-1/2 form-professional-groupSpeciality__${groupOption.type}-body`}>
            <CheckboxGroup {...groupOption} />
          </div>
        ))}
    </div>
  );
};

export default CheckboxGroupsContainer;
