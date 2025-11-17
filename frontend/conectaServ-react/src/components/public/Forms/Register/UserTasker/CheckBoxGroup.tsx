import type { TWorkGroupOption } from '../../../../../types/typeWorkGoupOptions';
import CheckBox from './CheckBox';

// COMPONENTE PARA CREAR LOS GRUPOS DE CHECKBOXES
const CheckboxGroup = ({ type, icon, title, options, entitie }: TWorkGroupOption) => {
  const IconComponent = icon;
   return (
    <>
      <div className='c-flex c-flex-items-center gap-1 form-groupSpeciality__context-header'>
        <IconComponent size={25} color='green'/>
        <h4 className='c-flex c-flex-items-center c-flex-justify-center gap-1/2 form-groupSpeciality__label'>
          <span>{title}</span>
          <span className='span-required'>*</span>
        </h4>
      </div>
      {options.map((opt, i) => <CheckBox type={type} opt={opt} i={i} key={i} entitie={entitie}/> )}
    </>
  );
};

export default CheckboxGroup;
