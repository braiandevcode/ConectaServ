import { FaHandsHelping} from 'react-icons/fa';
import { Link} from 'react-router';
import useHeader from '../../hooks/useHeader';

const Header = () => {
  const { ComponentToRender } = useHeader(); // CUSTOM HOOK DEL HEADER
  
  return (
    <header className='header mb-2'>
      <div className='header__container'>
        <div className='card-logo'>
          <Link to='/' className='card-logo__logo'>
            <div className='card-logo__icon'>
              <FaHandsHelping />
            </div>
            <span className='card-logo__text'>ConectaServ</span>
          </Link>
        </div>
        { (ComponentToRender && <ComponentToRender/>) }
      </div>
    </header>
  );
};

export default Header;
