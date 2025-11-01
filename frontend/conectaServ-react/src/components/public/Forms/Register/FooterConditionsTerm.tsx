import { Link } from 'react-router';
import useRegister from '../../../../hooks/useRegister';
import { EPathPage } from '../../../../types/enums';

// IMPORTACION DEL CSS
import './FooterConditionsTerm.css';

// COMPONENTE FOOTER DE FORMULARIO TERMINOS Y CONDICIONES
const FooterConditionsTerm = () => {
  const { onChangeTerms, isSending } = useRegister(); //HOOK REGISTRO GENERAL

  //RENDER DE TERMINOS Y CONDICIONES + CHECKS DE ACEPTAR O NO
  return (
    <>
      <div className='c-flex c-flex-justify-center c-flex-basis-full gap-3/2 form-basic form__terms'>
        <div className='c-flex c-flex-justify-center c-flex-items-center gap-1 form__checkbox'>
          <input id='terms' name='terms' disabled={isSending} type='checkbox' className='c-flex c-flex-items-center c-flex-justify-center form__checkbox-input' onChange={onChangeTerms} required />
          <label htmlFor='terms' className='form__checkbox-label'>
            Acepto los
            <Link to={EPathPage.PATH_TERMS} className='form__link'>
              Términos y Condiciones
            </Link>
            y la
            <Link to={EPathPage.PATH_PRIVACY} className='form__link'>
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
