import { IoChatbubbles } from 'react-icons/io5';

import './NavLinkChats.css';
import { Link } from 'react-router';
import useMain from '../../../hooks/useMain';
import { ERoles } from '../../../types/enumRoles';
import scrolledTop from '../../../utils/scrollTop';
const NavLinkChats = () => {
  const { userData } = useMain();

  const role: string = userData?.isTasker ? ERoles.TASKER : ERoles.CLIENT;
  return (
    <>
      <Link to={`${role}/to/chats`} onClick={() => scrolledTop()}>
        <IoChatbubbles size={20} className='btn__chats cursor-pointer' />
      </Link>
    </>
  );
};

export default NavLinkChats;
