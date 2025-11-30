import { FaHandsHelping } from 'react-icons/fa';
import { Link } from 'react-router';
import useHeader from '../../hooks/useHeader';

// CSS
import './Header.css';
const Header = () => {
  const { ComponentToRender } = useHeader(); // CUSTOM HOOK DEL HEADER

  return (
    <header className='w-full header mb-2'>
      <div className='header__content c-flex c-flex-items-center c-flex-justify-between'>
        <div className='card-logo'>
          <Link to='/' className='card-logo__logo'>
            <div className='card-logo__icon'>
              <FaHandsHelping />
            </div>
            <span className='card-logo__text'>ConectaServ</span>
          </Link>
        </div>
        {ComponentToRender && (
          <div className='c-flex c-flex-items-center gap-1'>
            <ComponentToRender />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
