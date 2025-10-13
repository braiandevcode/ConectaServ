import { Link } from "react-router";
import useRegister from "../hooks/useRegister";

// COMPONENTE FOOTER DE FORMULARIO TERMINOS Y CONDICIONES 
const FooterConditionsTerm = () => {
  const { onChangeTerms } = useRegister(); //HOOK PASO 4
  return (
    <>
      <div className='c-flex c-flex-justify-center c-flex-basis-full gap-3/2 form-basic register-formProfessional__terms'>
        <div className='c-flex c-flex-justify-center c-flex-items-center gap-1 register-formProfessional__checkbox'>
          <input id='terms' name='terms' type='checkbox' className='c-flex c-flex-items-center c-flex-justify-center register-formProfessional__checkbox-input' onChange={onChangeTerms} required />
          <label htmlFor='terms' className='register-formProfessional__checkbox-label'>
            Acepto los
            <Link to='/register/terms' className='register-formProfessional__link'>
              Términos y Condiciones
            </Link>
            y la
            <Link to='/register/privacity' className='register-formProfessional__link'>
              Política de Privacidad
            </Link>
            de ConectaServ
          </label>
        </div>
      </div>
    </>
  );
};

export default FooterConditionsTerm;
