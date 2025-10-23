import { categoryConfigs } from '../../../../../config/constant'; //DE LA CONSTANTE CONFIGURATIVA
import useRegisterPro from '../../../../../hooks/useRegisterPro';
import { EKeyDataByStep, type ECategoryKey } from '../../../../../types/enums';
import type { TCategoryKey } from '../../../../../types/typeCategory';
import type { TCategoryConfig } from '../../../../../types/typeConfigCategory';
import CheckboxGroup from './CheckBoxGroup';

// COMPONENTE CONTENEDOR QUE CONTIENE TODOS LOS GRUPOS SEGUN CATEGORIA
const CheckboxGroupsContainer = () => {
  const { stepData } = useRegisterPro(); // ==> //HOOK PERSONALIZADO QUE USA CONTEXTO NIVEL REGISTRO PROFESIONAL

  // EXCLUYO AL NONE EN TIPADO
  const config: TCategoryConfig = categoryConfigs[stepData[EKeyDataByStep.ONE].category as Exclude<TCategoryKey, ECategoryKey.NONE>];

  return (
    <div className='c-flex c-flex-column gap-1 form-groupSpeciality'>
      {config &&
        config.options.map((groupOption) => (
          <div key={groupOption.type} className={`c-flex c-flex-column gap-1/2 form-groupSpeciality__${groupOption.type}-body`}>
            <CheckboxGroup {...groupOption} />
          </div>
        ))}
    </div>
  );
};

export default CheckboxGroupsContainer;
