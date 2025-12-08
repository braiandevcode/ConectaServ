import { Link } from 'react-router';

// CSS
import './NavProfile.css';
import { FaUser } from 'react-icons/fa';

const NavProfile = () => {
  return (
    <>
      <div>
        <Link to={'/tasker/profile'} className='profile__link  c-flex c-flex-items-center gap-1/2'>
          <FaUser />
          Perfil
        </Link>
      </div>
    </>
  );
};

export default NavProfile;
